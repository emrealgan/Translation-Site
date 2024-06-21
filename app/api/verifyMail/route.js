import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const RESEND_FROM = 'onboarding@resend.dev'; // Use a verified sender email address

const verificationCodes = {}; // Temporary storage for the verification codes

// Function to generate a random 4-digit code
function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number
}

export async function POST(req) {
  const body = await req.json();
  const { mail } = body;

  if (!mail) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const code = generateVerificationCode();
  verificationCodes[mail] = code;

  const emailData = {
    from: RESEND_FROM,
    to: mail,
    subject: 'Verification Code',
    html: `<p>Your verification code is: <strong>${code}</strong></p>`, // Use HTML to bold the code
  };

  try {
    const response = await resend.emails.send(emailData);

    if (response.success) {
      return NextResponse.json({ success: true });
    } 
    else {
      console.error('Failed to send email:', response.error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } 
  catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
