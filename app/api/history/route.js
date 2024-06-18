import { connectDB, disconnectDB } from '@/app/lib/db';
import User from '@/app/models/User';

export async function POST(req) {
  const body = await req.json();  
  const { mail } = body;  

  try {
    await connectDB();
    const user = await User.findOne({ mail: mail });
    await disconnectDB();

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify({ history: user.translatedText }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } 
  catch (error) {
    console.error('Error fetching history:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
