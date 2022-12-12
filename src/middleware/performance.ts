
import { NextFunction, Request, Response, } from 'express';

const START = 'start';
const END = 'end';

export const Marks = { START, END };

export default function addPerformance (
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  performance.mark(START);
  next();
  performance.mark(END);
  performance.measure('full-api-time', START, END);
};
