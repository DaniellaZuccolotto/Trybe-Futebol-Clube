import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoardController';
// import loginMiddleware from '../middlewares/loginMiddleware';
// import auth from '../middlewares/auth';

const router = Router();
const leaderController = new LeaderBoardController();

router.get('/home', leaderController.getAll);

export default router;
