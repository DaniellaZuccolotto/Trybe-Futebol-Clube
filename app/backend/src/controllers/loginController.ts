import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces/IUser';
import LoginService from '../services/loginService';

export default class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as ILogin;
    const { code, data, message } = await this.loginService.login(user);
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json({ token: data });
  };
}
