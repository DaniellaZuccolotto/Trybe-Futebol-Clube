import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/teamService';

// interface NewRequest extends Request {
//   userRole?: string,
// }

export default class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { code, data, message } = await this.teamService.getAll();
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json(data);
  };

  // validate = async (req: Request, res: Response) => {
  //   const { userRole } = req as NewRequest;
  //   return res.status(200).json({ role: userRole });
  // };
}
