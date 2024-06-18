import mongoose, { Schema } from "mongoose";

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
  translatedText: [{
    originalText: { type: String, required: true },
    translatedText: { type: String, required: true },
    sourceLanguage: { type: String, required: true },
    targetLanguage: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }]
})

const User = mongoose.models.User || mongoose.model('User', dataSchema);
export default User;

