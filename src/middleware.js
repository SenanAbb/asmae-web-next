import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

function decodeJwtPayload(token) {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function hasValidAuthCookie(req) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return false;
  const payload = decodeJwtPayload(token);
  if (!payload) return false;
  if (typeof payload.exp !== 'number') return true;
  return payload.exp * 1000 > Date.now();
}

export default function middleware(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Rutas de admin fuera de locales (no usar next-intl)
  const isAdminPath = pathname.startsWith('/admin');

  if (!isAdminPath) {
    return intlMiddleware(req);
  }

  const authenticated = hasValidAuthCookie(req);

  // Si entra a /admin -> redirigir según auth
  if (pathname === '/admin' || pathname === '/admin/') {
    if (!authenticated) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  // Si ya está autenticado, /admin/login debe ir a /admin/dashboard
  if (pathname === '/admin/login') {
    if (authenticated) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }
    return NextResponse.next();
  }

  // Proteger dashboard y cualquier otra subruta admin (excepto login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!authenticated) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
