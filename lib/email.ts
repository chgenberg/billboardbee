import nodemailer from 'nodemailer';

// Skapa en transporter med Mailtrap-inställningar
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verifiera transporter-inställningar
transporter.verify(function (error, success) {
  if (error) {
    console.error('SMTP-verifieringsfel:', error);
  } else {
    console.log('SMTP-server är redo att ta emot meddelanden');
  }
});

// Skicka verifieringsmail
export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Verifiera din e-postadress',
    html: `
      <h1>Välkommen till Billboard Bee!</h1>
      <p>Klicka på länken nedan för att verifiera din e-postadress:</p>
      <a href="${verificationUrl}">Verifiera e-postadress</a>
      <p>Om du inte skapade ett konto, kan du ignorera detta mail.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw new Error('Kunde inte skicka verifieringsmail');
  }
}

// Skicka lösenordsåterställningsmail
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: '"Billboard Bee" <noreply@billboardbee.com>',
    to: email,
    subject: 'Återställ ditt lösenord',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Återställ ditt lösenord</h2>
        <p>Du har begärt att återställa ditt lösenord. Klicka på länken nedan för att välja ett nytt lösenord:</p>
        <p>
          <a href="${resetUrl}" 
             style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            Återställ lösenord
          </a>
        </p>
        <p>Om knappen inte fungerar, kopiera och klistra in följande länk i din webbläsare:</p>
        <p>${resetUrl}</p>
        <p>Länken är giltig i 24 timmar.</p>
        <p>Om du inte begärde en lösenordsåterställning, kan du ignorera detta mail.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Fel vid skickande av återställningsmail:', error);
    throw new Error('Kunde inte skicka återställningsmail');
  }
} 