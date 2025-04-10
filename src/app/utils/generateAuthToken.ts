import jwt from "jsonwebtoken";
import config from "../config";
import { Document } from "mongoose";

const generateAuthToken = function (this: Document): string {
  try {
    const token = jwt.sign({ _id: this._id }, config.JWT_SECRET as string, {
      expiresIn: "24h",
    });
    return token;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default generateAuthToken;
