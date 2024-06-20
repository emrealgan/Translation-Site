// import sgMail from '@sendgrid/mail';
// import { v4 as uuidv4 } from 'uuid';
// import { NextResponse } from 'next/server';

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const verificationCodes = {}; // Bu kodlar geçici olarak burada tutuluyor.

// export async function POST(req) {
//   const body = await req.json();  
//   const { mail } = body;  

//   const code = uuidv4();
//   verificationCodes[mail] = code;

//   const msg = {
//     to: mail,
//     from: 'alganemre.8@gmail.com', // SendGrid'de doğrulanmış bir e-posta adresi kullanın
//     subject: 'Verification Code',
//     text: `Your verification code is: ${code}`,
//     // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   };

//   try {
//     await sgMail.send(msg);
//     return NextResponse.json({ exists: true });
//   } 
//   catch (error) {
//     console.error('Failed to send email:', error);
//     return NextResponse.json({ error: 'Failed to send email' });
//   }
// }

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

const ELASTIC_EMAIL_API_KEY = process.env.ELASTIC_EMAIL_API_KEY;
const ELASTIC_EMAIL_FROM = 'alganemre.8@gmail.com'; // Use a verified sender email address

const verificationCodes = {}; // Temporary storage for the verification codes

export async function POST(req) {
  const body = await req.json();
  const { mail } = body;

  if (!mail) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const code = uuidv4();
  verificationCodes[mail] = code;

  const emailData = {
    apikey: ELASTIC_EMAIL_API_KEY,
    from: ELASTIC_EMAIL_FROM,
    to: mail,
    subject: 'Verification Code',
    bodyText: `Your verification code is: ${code}`,
  };

  try {
    const response = await axios.post('https://api.elasticemail.com/v2/email/send', null, {
      params: emailData,
    });

    if (response.data.success) {
      return NextResponse.json({ success: true });
    } else {
      console.error('Failed to send email:', response.data.error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

