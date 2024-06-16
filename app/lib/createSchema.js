import mongoose from "mongoose";
import { Schema } from "mongoose";

const dataSchema = new Schema({
  id: {
    type: Number,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  surname: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  mail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})
export const myModel = mongoose.model('Data', dataSchema); 
