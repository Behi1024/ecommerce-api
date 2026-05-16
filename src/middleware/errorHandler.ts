import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.issues.map((issue) => issue.message),
    });
  }

  return res.status(500).json({
    message: "Something went wrong",
  });
};
