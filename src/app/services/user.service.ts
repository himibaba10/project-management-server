import { TUser } from "../interfaces/user.interface";
import User from "../models/user.model";
import generateRefreshToken from "../utils/generateRefreshToken";

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

export const userServices = {
  createUserToDB,
  loginUserFromDB,
  updateUserFromDB,
};
