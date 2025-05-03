import { model, Schema } from "mongoose";
import { TBlacklistedToken } from "../interfaces/blackllistedToken.interface";

const blacklistedTokenSchema = new Schema<TBlacklistedToken>(
  {
    token: {
      type: String,
    },
    //This field will delete the document after 7 days
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //7 days from today
      index: { expires: 0 },
    },
  },
  { timestamps: true }
);

const BlacklistedToken = model<TBlacklistedToken>(
  "BlacklistedToken",
  blacklistedTokenSchema
);

export default BlacklistedToken;
