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
  translatedText: {
    type: Object,
    required: false,
    trim: false
  }
})
const User = mongoose.models.Mutercim || mongoose.model('Mutercim', dataSchema);
export default User;

