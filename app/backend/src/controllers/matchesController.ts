import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/matchesService';

// interface NewRequest extends Request {
//   userRole?: string,
// }

export default class MatchesController {
  private matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { code, data, message } = await this.matchesService.getAll();
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json(data);
  };

  // getById = async (req: Request, res: Response, next: NextFunction) => {
  //   const { id } = req.params;
  //   const { code, data, message } = await this.teamService.getById(Number(id));
  //   if (message) {
  //     return next({ code, message });
  //   }
  //   return res.status(code).json(data);
  // };

  // validate = async (req: Request, res: Response) => {
  //   const { userRole } = req as NewRequest;
  //   return res.status(200).json({ role: userRole });
  // };
}
