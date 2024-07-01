import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

export async function POST(req) {
  const body = await req.json();
  const { mail } = body;

  if (!mail) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const code = generateVerificationCode();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: mail,
    subject: 'Verification Code',
    html: `<p>Your verification code is: <strong>${code}</strong></p>`, 
  };

  try {
    const response = await transporter.sendMail(mailOptions);

    if (response.accepted.length > 0) {
      return NextResponse.json({ success: true });
    } 
    else {
      console.error('Failed to send email:', response);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } 
  catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}


