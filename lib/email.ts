import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  service: string;
  revisions: string;
  notes: string;
  referenceLinks: string;
  amountUsd: string;
  files: { name: string; url: string }[];
}

export async function sendOrderNotification(data: OrderEmailData) {
  const fileListHtml = data.files
    .map(
      (f) =>
        `<li style="margin-bottom:6px;"><a href="${f.url}" style="color:#F2A93B;">${f.name}</a></li>`,
    )
    .join('');

  const html = `
    <div style="font-family:sans-serif;background:#0E0D0C;color:#F4EEE1;padding:32px;">
      <h2 style="color:#F2A93B;margin-bottom:4px;">New order received</h2>
      <p style="opacity:0.7;margin-top:0;">${data.service} — $${data.amountUsd}</p>

      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <tr><td style="padding:4px 0;opacity:0.6;">Customer</td><td>${data.customerName}</td></tr>
        <tr><td style="padding:4px 0;opacity:0.6;">Email</td><td>${data.customerEmail}</td></tr>
        <tr><td style="padding:4px 0;opacity:0.6;">Revisions included</td><td>${data.revisions}</td></tr>
        <tr><td style="padding:4px 0;opacity:0.6;">Reference links</td><td>${data.referenceLinks || '—'}</td></tr>
      </table>

      <p style="opacity:0.6;margin-bottom:4px;">Notes from customer</p>
      <p style="background:#17140F;padding:12px;border-radius:6px;">${data.notes || '—'}</p>

      <p style="opacity:0.6;margin:20px 0 4px;">Files</p>
      <ul style="padding-left:18px;">${fileListHtml}</ul>
    </div>
  `;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'orders@yourdomain.com',
    to: process.env.NOTIFY_EMAIL || 'Kalebmay18@gmail.com',
    replyTo: data.customerEmail,
    subject: `New order — ${data.service} — ${data.customerName}`,
    html,
  });
}

interface CustomerEmailData {
  customerName: string;
  customerEmail: string;
  service: string;
  revisions: string;
  amountUsd: string;
  fileCount: number;
}

export async function sendCustomerConfirmation(data: CustomerEmailData) {
  const html = `
    <div style="font-family:sans-serif;background:#0E0D0C;color:#F4EEE1;padding:32px;">
      <h2 style="color:#F2A93B;margin-bottom:4px;">Order received</h2>
      <p style="opacity:0.7;margin-top:0;">Thanks, ${data.customerName} — we've got your files.</p>

      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <tr><td style="padding:4px 0;opacity:0.6;">Service</td><td>${data.service}</td></tr>
        <tr><td style="padding:4px 0;opacity:0.6;">Files received</td><td>${data.fileCount}</td></tr>
        <tr><td style="padding:4px 0;opacity:0.6;">Revisions included</td><td>${data.revisions}</td></tr>
        <tr><td style="padding:4px 0;opacity:0.6;">Amount charged</td><td>$${data.amountUsd}</td></tr>
      </table>

      <p style="opacity:0.8;">
        We'll reply to this email once your ${data.service.toLowerCase()} is ready for review.
        Just reply here any time if you want to add notes or reference tracks.
      </p>
    </div>
  `;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'orders@yourdomain.com',
    to: data.customerEmail,
    replyTo: process.env.NOTIFY_EMAIL || 'Kalebmay18@gmail.com',
    subject: `We've got your track — ${data.service}`,
    html,
  });
}
