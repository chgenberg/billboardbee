import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Återställ ditt lösenord',
    html: `
      <h1>Återställ ditt lösenord</h1>
      <p>Klicka på länken nedan för att återställa ditt lösenord:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>Länken är giltig i 24 timmar.</p>
      <p>Om du inte begärde en återställning av lösenordet, kan du ignorera detta mail.</p>
    `,
  });
} 