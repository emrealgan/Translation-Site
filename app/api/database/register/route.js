import { connectDB, disconnectDB } from '@/app/lib/db';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import User from '@/app/models/User';
export async function POST(req) {
  
  const body = await req.json();  
  const { email, password } = body;  

  try {
    await connectDB()
 
    // const User = mongoose.models.User;
    const newUser = new User({
      mail: email,
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

