import mongoose from 'mongoose';

export async function POST(req) {
  
  const body = await req.json();  
  const { email, password } = body;  

  try {
    await mongoose.connect(process.env.MONGO_URL);
 
    const User = mongoose.model('User');
    const existingUser = await User.findOne({ mail: email });
    console.log(existingUser)
    if (existingUser) {
      await mongoose.disconnect(); // Disconnect from MongoDB
      return Response.json({ message: 'Error: Email already exists' }), { status: 500 };
    }
    const newUser = new User({
      mail: email,
      password: password
    });

    const result = await newUser.save(); 
      
    await mongoose.disconnect(); // Disconnect from MongoDB
    return Response.json({ message: 'User added successfully', data: result });
    
  }
  catch (error) {
    console.error('Error registering user:', error);
    return Response.json({ message: 'Error adding user' });
  }
}   

