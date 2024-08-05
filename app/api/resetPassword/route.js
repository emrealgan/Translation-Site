"use server"
import { connectDB, disconnectDB } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { User } from '@/app/models/User';
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

export async function POST(req) {
  const body = await req.json();
  const { mail, password } = body;

  try {
    await connectDB();
    const existingUser = await User.findOne({ mail: mail });

    if (existingUser) {
      // Hash the new password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password
      existingUser.password = hashedPassword;
      await existingUser.save();

      await disconnectDB();

      return NextResponse.json({ success: true });
    } 
    else {
      await disconnectDB();
      return NextResponse.json({ success: false, error: 'User not found' });
    }
  } 
  catch (error) {
    await disconnectDB();
    return NextResponse.json({ success: false, error: error.message });
  }
}
