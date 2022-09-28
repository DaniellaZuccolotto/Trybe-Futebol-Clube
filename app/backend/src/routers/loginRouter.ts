import { Router } from 'express';
import LoginController from '../controllers/loginController';
import loginMiddleware from '../middlewares/loginMiddleware';

const router = Router();
const loginController = new LoginController();

router.post('/', loginMiddleware, loginController.login);

export default router;
