import { NextFunction, Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoardService';
import LeaderBoardAwayService from '../services/leaderBoardAwayService';

// interface NewRequest extends Request {
//   userRole?: string,
// }

export default class LeaderBoardController {
  private leaderService: LeaderBoardService;
  private leaderAwayService: LeaderBoardAwayService;

  constructor() {
    this.leaderService = new LeaderBoardService();
    this.leaderAwayService = new LeaderBoardAwayService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { code, data, message } = await this.leaderService.getAll();
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json(data);
  };

  getAllAway = async (req: Request, res: Response, next: NextFunction) => {
    const { code, data, message } = await this.leaderAwayService.getAllAway();
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json(data);
  };
}
