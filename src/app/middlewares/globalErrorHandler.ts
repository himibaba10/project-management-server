import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(err.status || 500)
    .json({ success: false, errors: { common: { msg: err.message } } });
};

export default globalErrorHandler;
