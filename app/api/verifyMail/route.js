import sgMail from '@sendgrid/mail';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const verificationCodes = {}; // Bu kodlar geçici olarak burada tutuluyor.

export async function POST(req) {
  const body = await req.json();  
  const { mail } = body;  

  const code = uuidv4();
  verificationCodes[mail] = code;

  const msg = {
    to: mail,
    from: 'alganemre.8@gmail.com', // SendGrid'de doğrulanmış bir e-posta adresi kullanın
    subject: 'Verification Code',
    text: `Your verification code is: ${code}`,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  try {
    await sgMail.send(msg);
    return NextResponse.json({ exists: true });
  } 
  catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email' });
  }
}
