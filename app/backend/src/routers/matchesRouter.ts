import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
// import teamMiddleware from '../middlewares/teamMiddleware';
// import auth from '../middlewares/auth';

const router = Router();
const matchesController = new MatchesController();

router.get('/', matchesController.getAll);
// router.get('/:id', matchesController.getById);

export default router;
