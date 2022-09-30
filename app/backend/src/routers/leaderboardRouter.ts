import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoardController';
// import loginMiddleware from '../middlewares/loginMiddleware';
// import auth from '../middlewares/auth';

const router = Router();
const leaderController = new LeaderBoardController();

router.get('/home', leaderController.getAll);
router.get('/away', leaderController.getAllAway);

export default router;
