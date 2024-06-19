import { connectDB, disconnectDB } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import User from '@/app/models/User';

export async function POST(req) {  
  const body = await req.json();  
  const { mail, password } = body;  

  try {
    await connectDB()
 
    const newUser = new User({
      mail: mail,
      password: password
    });
    const result = await newUser.save(); 
    
    await disconnectDB()
    return NextResponse.json({ message: 'User added successfully', data: result });
    
  }
  catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ message: 'Error adding user' });
  }
}   

