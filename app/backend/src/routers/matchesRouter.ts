import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
// import teamMiddleware from '../middlewares/teamMiddleware';
import auth from '../middlewares/auth';

const router = Router();
const matchesController = new MatchesController();

router.get('/', matchesController.getAll);
router.post('/', auth, matchesController.create);
router.patch('/:id/finish', auth, matchesController.finish);
router.patch('/:id', matchesController.update);

export default router;
