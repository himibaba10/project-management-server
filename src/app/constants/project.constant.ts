import { body } from "express-validator";

const validateCreateTask = [
  body("name").trim().notEmpty().withMessage("Task name is required"),
  body("description").optional().trim(),
  body("status")
    .optional()
    .isIn(["to-do", "in-progress", "completed"])
    .withMessage("Invalid status"),
  body("dueDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid due date"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),
];

const validateUpdateTask = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Task name cannot be empty"),
  body("description").optional().trim(),
  body("status")
    .optional()
    .isIn(["to-do", "in-progress", "completed"])
    .withMessage("Invalid task status"),
  body("dueDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid due date"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority level"),
];

const validateCreateProject = [
  body("title").trim().notEmpty().withMessage("Project title is required"),
  body("description").optional().trim(),
  body("status")
    .optional()
    .isIn(["active", "archived"])
    .withMessage("Invalid project status"),
];

const validateUpdateProject = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty"),
  body("description").optional().trim(),
  body("status")
    .optional()
    .isIn(["active", "archived"])
    .withMessage("Invalid project status"),
];

const projectConstants = {
  validateCreateTask,
  validateUpdateTask,
  validateCreateProject,
  validateUpdateProject,
};
export default projectConstants;
