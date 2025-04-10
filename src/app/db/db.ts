import mongoose from "mongoose";
import config from "../config/index";

const connectToDB = async () => {
  try {
    await mongoose.connect(config.DB_CONNECT as string);
    console.log("Database connection established");
  } catch (error) {
    console.error("Database connection failed:", error);

    process.exit(1); //Exit process if db connection fails
  }
};

export default connectToDB;
