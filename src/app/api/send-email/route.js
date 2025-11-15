import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidFromAddress(val) {
  if (!val || typeof val !== 'string') return false;
  const emailOnly = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameAndEmail = /^[^<>]+<[^\s@]+@[^\s@]+\.[^\s@]+>$/;
  return emailOnly.test(val.trim()) || nameAndEmail.test(val.trim());
}

export async function GET() {
  return NextResponse.json(
    { ok: true, route: '/api/send-email', method: 'GET' },
    { status: 200 }
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, lastname, phone, email, message } = body || {};

    if (!name || !lastname || !phone || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const to = process.env.CONTACT_TO_EMAIL;
    if (!to) {
      return NextResponse.json(
        { error: 'CONTACT_TO_EMAIL not configured' },
        { status: 500 }
      );
    }

    const subject = `Nouvelle demande depuis le formulaire de contact – ${name} ${lastname}`;

    const text =
      `Vous avez reçu une nouvelle demande via le formulaire de contact de votre site web.` +
      `Nom: ${name} ${lastname}\n` +
      `Email: ${email}\n` +
      `Téléphone : ${phone}\n\n` +
      `Message:\n${message}\n` +
      `Ce message a été envoyé automatiquement depuis le formulaire de contact du site web.`;

    const siteUrl = process.env.SITE_URL || '';
    const logoUrl = siteUrl ? `${siteUrl}/images/logo-color.webp` : '';
    const html = `
      <div style="background:#f6f8fa;padding:24px;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 2px 12px rgba(0,0,0,0.05);">
          <div style="height:6px;background:linear-gradient(90deg,#2d6a4f 0%,#52b788 100%)"></div>
          <div style="padding:24px 24px 0 24px;text-align:center;">
            ${
              logoUrl
                ? `<img src="${logoUrl}" alt="Logo" style="height:48px;object-fit:contain;margin-bottom:8px;" />`
                : ''
            }
            <h1 style="margin:8px 0 0 0;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif;font-size:20px;line-height:1.4;color:#0f172a;">Nouvelle demande depuis le formulaire de contact</h1>
            <p style="margin:6px 0 0 0;color:#475569;font-size:14px;">Vous avez reçu une nouvelle demande via le formulaire de contact de votre site web.</p>
          </div>
          <div style="padding:24px;">
            <table style="width:100%;border-collapse:separate;border-spacing:0 10px;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif;color:#0f172a;">
              <tr>
                <td style="width:160px;font-weight:600;color:#334155;">Nom</td>
                <td style="color:#0f172a;">${name} ${lastname}</td>
              </tr>
              <tr>
                <td style="width:160px;font-weight:600;color:#334155;">Email</td>
                <td style="color:#0f172a;">${email}</td>
              </tr>
              <tr>
                <td style="width:160px;font-weight:600;color:#334155;">Téléphone</td>
                <td style="color:#0f172a;">${phone}</td>
              </tr>
            </table>
            <div style="margin-top:16px;padding:16px;border:1px solid #e5e7eb;border-radius:10px;background:#fafafa;">
              <div style="font-weight:600;color:#334155;margin-bottom:8px;">Message</div>
              <div style="white-space:pre-wrap;color:#0f172a;line-height:1.6;">${message}</div>
            </div>
          </div>
          <div style="padding:16px 24px;border-top:1px solid #e5e7eb;background:#fcfcfd;color:#64748b;font-size:12px;text-align:center;">
            <div style="margin-bottom:4px;">Ce message a été envoyé automatiquement depuis le formulaire de contact du site web.</div>
            <div>© ${new Date().getFullYear()} AVZWeb</div>
          </div>
        </div>
      </div>
    `;

    const envFrom = `AVZWeb <${process.env.EMAIL_DOMAIN}>`;
    const defaultFrom = 'Website <onboarding@resend.dev>';
    const from = isValidFromAddress(envFrom) ? envFrom : defaultFrom;

    const result = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
    });

    if (result?.error) {
      const msg = result.error?.message || 'Resend error';
      if (process.env.NODE_ENV !== 'production') {
        console.error('Resend send error:', result.error);
      }
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('POST /api/send-email error:', err);
      return NextResponse.json(
        {
          error: 'Unexpected server error',
          detail: String(err?.message || err),
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
