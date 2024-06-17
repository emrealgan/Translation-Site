import mongoose from "mongoose";
import { Schema } from "mongoose";

export default async function connectDB() {

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo Connection successfully established.");
    return;
  }
  catch (error) {
    console.error("Error connecting to Mongoose:", error);
    return;
  }
};

const dataSchema = new Schema({
  mail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
    
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  translatedText: {
    type: Object,
    required: false,
    trim: false
  }
})
export const UserModel =  mongoose.model('User', dataSchema);
