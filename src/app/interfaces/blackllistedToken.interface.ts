import { Date } from "mongoose";

export type TBlacklistedToken = {
  token: string;
  expiresAt: Date;
};
