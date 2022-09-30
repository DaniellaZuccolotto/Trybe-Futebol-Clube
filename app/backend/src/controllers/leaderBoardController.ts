import { NextFunction, Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoardService';

// interface NewRequest extends Request {
//   userRole?: string,
// }

export default class LeaderBoardController {
  private leaderService: LeaderBoardService;

  constructor() {
    this.leaderService = new LeaderBoardService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { code, data, message } = await this.leaderService.getAll();
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json(data);
  };
}
