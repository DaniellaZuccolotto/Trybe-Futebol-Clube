import { NextFunction, Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoardService';
import LeaderBoardAwayService from '../services/leaderBoardAwayService';
import LeaderBoardAllService from '../services/leaderBoardAllService';

// interface NewRequest extends Request {
//   userRole?: string,
// }

export default class LeaderBoardController {
  private leaderService = new LeaderBoardService();
  private leaderAwayService = new LeaderBoardAwayService();
  private leaderAllService = new LeaderBoardAllService();

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

  getLeaderBoard = async (req: Request, res: Response) => {
    const { code, data } = await this.leaderAllService.getLeaderBoard();
    return res.status(code).json(data);
  };
}
