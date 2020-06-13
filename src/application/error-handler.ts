import { Request, Response, NextFunction } from "express";
import { isCelebrate } from "celebrate";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "http-status-codes"
import { Translation } from "./helpers/translation";


const isProduction = (err: Error) => (process.env.NODE_ENV === "production" ? undefined : err.stack);
 
export const celebrateToValidationError = (errors: any): { [key: string]: Translation } => {
  const errorsArray: any = errors.joi.details.map((error: { path: string[]; type: string }) => {
    const key = error.path.join(".");
    const translationId = `validation.${error.type}`;
 
    return {
      [key]: new Translation(translationId, {
        field: key,
      }),
    };
  });
 
  return Object.assign.apply({}, errorsArray);
};
 
export const errorHandler = () => (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line
  next: NextFunction,
) => {
  const body = { ...req.body };
  delete body.password;
  console.error(
    JSON.stringify({
      logType: "ERROR",
      error: err,
      stack: (err as any).innerStack || err.stack,
      url: req.baseUrl + req.url,
      body,
    }),
  );
  
  if (isCelebrate(err)) {
    try {
      return res.status(BAD_REQUEST).json({
        error: celebrateToValidationError(err),
      });
    } catch (e) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        error: new Translation("error.validation.parse"),
      });
    }
  }
 
  return res.status(INTERNAL_SERVER_ERROR).json({
    error: new Translation("error.unknown"),
    stack: isProduction(err),
  });
};