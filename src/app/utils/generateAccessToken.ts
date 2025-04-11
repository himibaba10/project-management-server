import jwt from "jsonwebtoken";
import config from "../config";
import { Document } from "mongoose";

const generateAccessToken = function (userId: { _id: string }): string {
  try {
    const token = jwt.sign(userId, config.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return token;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default generateAccessToken;
