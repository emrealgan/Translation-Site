import mongoose from "mongoose";

export default async function connectDB(){
  // if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    console.error("Error connecting to Mongoose:", error);
  }
};

