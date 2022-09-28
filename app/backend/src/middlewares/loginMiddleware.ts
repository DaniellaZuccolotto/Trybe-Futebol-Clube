import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces/IUser';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body as ILogin;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !(email.match(emailRegex))) {
    return next({ code: 400, message: '"email" is required' });
  }
  if (!password || password.length <= 6) {
    return next({ code: 400, message: '"password" is required' });
  }
  next();
};
