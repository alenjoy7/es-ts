import { ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

type SchemaObject = {
  body?: ZodSchema<any>;
  query?: ZodSchema<any>;
  params?: ZodSchema<any>;
};

export function validate(schemas: SchemaObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: 400,
          message: "Validation Failed",
          code: "VALIDATION_ERROR",
          details: error.errors?.map((e) => ({
            field: e.path.join("."),
            message: e.message,
            code: e.code,
          })),
        });
      } else {
        res.status(500).json({
          status: 400,
          message: "Internal Server Error",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }
  };
}
