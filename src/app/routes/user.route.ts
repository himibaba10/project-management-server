import { Router } from "express";

import { userControllers } from "../controllers/user.controller";
import auth from "../middlewares/auth";
import userConstants from "../constants/user.constant";

const userRouter = Router();

userRouter.post(
  "/register",
  userConstants.validateUserRegistration,
  userControllers.registerUser
);

userRouter.post(
  "/login",
  userConstants.validateUserLogin,
  userControllers.loginUser
);

userRouter.get("/profile", auth.authUser, userControllers.getUserProfile);

userRouter.put(
  "/profile",
  auth.authUser,
  userConstants.validateUserUpdate,
  userControllers.updateUserProfile
);

userRouter.post("/logout", auth.authUser, userControllers.logoutUser);

// Generate refresh token
userRouter.post("/refresh-token", userControllers.getRefreshToken);

export default userRouter;
