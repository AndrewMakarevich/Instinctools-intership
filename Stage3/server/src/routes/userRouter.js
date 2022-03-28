import { Router } from 'express';
import UserController from '../controller/userController.js';

const userRouter = Router();

userRouter.get('/get/:paramValue', UserController.getUser);
userRouter.post('/create', UserController.createUser);

export default userRouter;