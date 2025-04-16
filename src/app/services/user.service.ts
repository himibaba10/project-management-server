import config from "../config";
import { TUser } from "../interfaces/user.interface";
import User from "../models/user.model";
import generateRefreshToken from "../utils/generateRefreshToken";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail";

const getUsersFromDB = async (currentUser: TUser) => {
  try {
    // Get all users from database except the current user
    const users = await User.find({ email: { $ne: currentUser.email } });

    return users;
  } catch (error: any) {
    throw error;
  }
};

const createUserToDB = async (payload: TUser) => {
  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = payload;

  if (!firstName || !email || !password) {
    throw new Error("All fields are required");
  }

  try {
    const user = await User.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
    });

    //   generateAuthToken is created using mongoose schema.methods and this function works with created instances
    const token = user.generateAuthToken();

    return { user, token };
  } catch (error: any) {
    if (error.code === 11000) {
      const error = new Error("Email already exists");
      (error as any).status = 409;
      throw error;
    }
    throw error;
  }
};

const loginUserFromDB = async (payload: Partial<TUser>) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Checks if the password is correct
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = user.generateAuthToken();
  const refreshToken = generateRefreshToken({ _id: user._id as string });

  // Making the user document as plain object
  const userData = user.toObject();
  delete (userData as { password?: string }).password; // Remove the password field from the object

  return { user: userData, token, refreshToken };
};

const updateUserFromDB = async (payload: Partial<TUser> & { user: string }) => {
  const user = await User.findById(payload.user).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (payload.fullName?.firstName)
    user.fullName.firstName = payload.fullName.firstName;
  if (payload.fullName?.lastName)
    user.fullName.lastName = payload.fullName.lastName;
  if (payload.email) user.email = payload.email;
  if (payload.password) user.password = payload.password;

  const token = user.generateAuthToken();

  // Making the user document as plain object
  const userData = user.toObject();
  delete (userData as { password?: string }).password; // Remove the password field from the object

  await user.save();

  return { userData, token };
};

const resetPasswordFromDB = async (newPassword: string, token: string) => {
  try {
    if (!newPassword || !token) {
      const error = new Error("All fields are required");
      (error as any).status = 400;
      throw error;
    }

    const decoded = await jwt.verify(token, config.JWT_SECRET!);

    if (!decoded) {
      const error = new Error("Invalid token");
      (error as any).status = 400;
      throw error;
    }

    const user = await User.findById((decoded as any)._id);

    if (!user) {
      const error = new Error("Invalid credentials");
      (error as any).status = 404;
      throw error;
    }

    user.password = newPassword;
    await user.save();
  } catch (error) {
    throw error;
  }
};

const forgetPasswordFromDB = async (email: string) => {
  try {
    if (!email) {
      const error = new Error("Email is required");
      (error as any).status = 400;
      throw error;
    }

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Invalid credentials");
      (error as any).status = 404;
      throw error;
    }

    const token = user.generateAuthToken();
    const link = `${config.FRONTEND_URL}/reset-password/${token}`; // This link should be sent to the user's email

    const message = `<p>Click on the link to reset your password: ${link}</p>`;

    await sendMail(email, "Reset Password", message);
  } catch (error) {
    throw error;
  }
};

export const userServices = {
  getUsersFromDB,
  createUserToDB,
  loginUserFromDB,
  updateUserFromDB,
  resetPasswordFromDB,
  forgetPasswordFromDB,
};
