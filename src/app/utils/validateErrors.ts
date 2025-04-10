import { Request, Response } from "express";
import { validationResult, ValidationError } from "express-validator";

const validateErrors = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsObj: Record<string, { msg: string }> = {};
    errors.array().forEach((err: any) => {
      // used split because don't need fullName.firstName but just need firtname
      errorsObj[err.path.split(".")[1] || err.path] = { msg: err.msg };
    });
    res.status(400).json({ success: false, errors: errorsObj });
    return true;
  }

  return false;
};

export default validateErrors;
