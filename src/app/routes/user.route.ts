import { Router } from "express";

import { userControllers } from "../controllers/user.controller";
import auth from "../middlewares/auth";
import userConstants from "../constants/user.constant";
import authLogin from "../middlewares/authLogin";

const userRouter = Router();

// =========== Routes for admins ===========

userRouter.get("/", auth.authUser("admin"), userControllers.getUsers);

userRouter.delete(
  "/:userId",
  auth.authUser("admin"),
  userControllers.deleteUser
);

// =========== Routes for users ===========

userRouter.post(
  "/register",
  userConstants.validateUserRegistration,
  userControllers.registerUser
);

userRouter.post(
  "/login",
  authLogin,
  userConstants.validateUserLogin,
  userControllers.loginUser
);

userRouter.get("/profile", auth.authUser(), userControllers.getUserProfile);

userRouter.put(
  "/profile",
  auth.authUser(),
  userConstants.validateUserUpdate,
  userControllers.updateUserProfile
);

userRouter.post("/logout", auth.authUser(), userControllers.logoutUser);

// Generate refresh token
userRouter.post("/refresh-token", userControllers.getRefreshToken);

userRouter.post("/reset-password", userControllers.resetPassword);

userRouter.post("/forget-password", userControllers.forgetPassword);

export default userRouter;
