import { NextFunction, Request, Response } from "express";
import { userServices } from "../services/user.service";
import validateErrors from "../utils/validateErrors";
import jwt from "jsonwebtoken";
import config from "../config";
import generateAccessToken from "../utils/generateAccessToken";
import generateRefreshToken from "../utils/generateRefreshToken";
import BlacklistedToken from "../models/blacklistedToken.model";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userServices.getUsersFromDB((req as any).user);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error: any) {
    next({ status: error.status, message: error.message });
  }
};

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (validateErrors(req, res)) return;

  try {
    const { user, token } = await userServices.createUserToDB(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { user, token },
    });
  } catch (error: any) {
    next({ status: error.status, message: error.message });
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  if (validateErrors(req, res)) return;

  try {
    const { user, token, refreshToken } = await userServices.loginUserFromDB(
      req.body
    );

    // Set the access token in a browser cookie
    res.cookie("token", token);

    // Set the refresh token in an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { user, token },
    });
  } catch (error: any) {
    next({ status: error.status, message: error.message });
  }
};

const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: (req as any).user,
    });
  } catch (error: any) {
    next({ status: error.status, message: error.message });
  }
};

const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (validateErrors(req, res)) return;
  try {
    req.body.user = (req as any).user;

    const updatedUser = await userServices.updateUserFromDB(req.body);

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    next({ status: error.status, message: error.message });
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (token) {
      await BlacklistedToken.create({
        token,
      });
    }

    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error: any) {
    next({ status: error.status, message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userServices.deleteUserFromDB(req.params.userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    next({ status: error.status, message: error.message });
  }
};

const getRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      const error = new Error("Refresh token is required");
      (error as any).status = 404;
      throw error;
    }

    const decoded = await jwt.verify(
      refreshToken,
      config.JWT_REFRESH_TOKEN_SECRET!
    );

    const accessToken = await generateAccessToken({
      _id: (decoded as any)._id,
    });

    const newRefreshToken = await generateRefreshToken({
      _id: (decoded as any)._id,
    });

    res.status(200).json({
      success: true,
      message: "Refresh token generated successfully",
      data: { token: accessToken, refreshToken: newRefreshToken },
    });
  } catch (error: any) {
    next({ status: error.status, message: error.message });
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newPassword } = req.body;
    const token =
      req.body.token ||
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    await userServices.resetPasswordFromDB(newPassword, token);

    res.status(200).json({
      success: true,
      message: "Password reset was successful",
    });
  } catch (error: any) {
    next({ status: error.status, message: error.message });
  }
};

const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    await userServices.forgetPasswordFromDB(email);

    res.status(200).json({
      success: true,
      message: "Forgot password link sent to your email",
    });
  } catch (error: any) {
    next({ status: error.status, message: error.message });
  }
};

export const userControllers = {
  getUsers,
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
  deleteUser,
  getRefreshToken,
  resetPassword,
  forgetPassword,
};
