import mongoose from "mongoose";

export async function connectDB() {

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo Connection successfully established.");
  }
  catch (error) {
    console.error("Error connecting to Mongoose:", error);
  }
};
