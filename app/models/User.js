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
    required: false,
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

const OAuthSchema = new Schema({
  mail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  translatedText: [{
    originalText: { type: String, required: true },
    translatedText: { type: String, required: true },
    sourceLanguage: { type: String, required: true },
    targetLanguage: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }]
})

const userOAuth = mongoose.models.userOAuth || mongoose.model('userOAuth', OAuthSchema);
export {User, userOAuth} 

