import jwt from "jsonwebtoken";
import config from "../config";

const generateRefreshToken = function (userId: { _id: string }): string {
  try {
    const token = jwt.sign(userId, config.JWT_REFRESH_TOKEN_SECRET as string, {
      expiresIn: "7d",
    });
    return token;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default generateRefreshToken;
