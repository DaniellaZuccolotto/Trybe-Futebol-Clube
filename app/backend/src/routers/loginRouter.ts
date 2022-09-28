import { Router } from 'express';
import LoginController from '../controllers/loginController';
import loginMiddleware from '../middlewares/loginMiddleware';
import auth from '../middlewares/auth';

const router = Router();
const loginController = new LoginController();

router.post('/', loginMiddleware, loginController.login);
router.get('/validate', auth, loginController.validate);

export default router;
