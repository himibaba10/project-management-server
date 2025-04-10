import { body } from "express-validator";

const validateUserRegistration = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("Email is required"),
  body("fullName.firstName")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters")
    .notEmpty()
    .withMessage("First name is required"),
  body("fullName.lastName")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .notEmpty()
    .withMessage("Password is required"),
];

const validateUserUpdate = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("Email is required"),
  body("fullName.firstName")
    .optional()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters")
    .notEmpty()
    .withMessage("First name is required"),
  body("fullName.lastName")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .notEmpty()
    .withMessage("Password is required"),
];

const validateUserLogin = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const userConstants = {
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
};
export default userConstants;
