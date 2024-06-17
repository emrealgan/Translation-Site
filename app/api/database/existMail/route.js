import { connectDB, disconnectDB } from '@/app/lib/db';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import User from '@/app/models/User';
export async function POST(req) {
  
  const body = await req.json();  
  const { email } = body;  

  try {
    await connectDB()
 
    // const User = mongoose.models.User;
    const existingUser = await User.findOne({ mail: email });
    if (existingUser) {
      await disconnectDB()
      return NextResponse.json({ user: existingUser });
    } 
    else {
      await disconnectDB()
      return NextResponse.json({ user: null });
    } 
  }
  catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ message: 'Error adding user' });
  }
}   

