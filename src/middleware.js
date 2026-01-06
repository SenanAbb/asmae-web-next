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
  const adminWithLocaleMatch = pathname.match(/^\/(fr|en|es)\/admin(\/.*)?$/);

  // Rutas de admin (permitir que vengan con prefijo de locale y normalizar)
  const isAdminPath = pathname.startsWith('/admin') || Boolean(adminWithLocaleMatch);

  if (!isAdminPath) {
    return intlMiddleware(req);
  }

  // Si viene con locale, redirigir a la ruta sin locale
  if (adminWithLocaleMatch) {
    const rest = adminWithLocaleMatch[2] || '';
    return NextResponse.redirect(new URL(`/admin${rest}`, req.url));
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

// Ensure middleware runs for all routes (including /admin) but skip assets/APIs.
// Explicitly include admin paths in case glob filtering changes.
export const config = {
  matcher: [
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    '/admin/:path*',
    '/:locale(fr|en|es)/admin/:path*',
  ],
};
