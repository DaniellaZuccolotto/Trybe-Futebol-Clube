import { Router } from 'express';
import TeamController from '../controllers/teamController';
// import teamMiddleware from '../middlewares/teamMiddleware';
// import auth from '../middlewares/auth';

const router = Router();
const teamController = new TeamController();

router.get('/', teamController.getAll);
router.get('/:id', teamController.getById);

export default router;
