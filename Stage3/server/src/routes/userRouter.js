import { Router } from 'express';
import userController from '../controller/userController.js';

const userRouter = Router();
userRouter.post('/create', userController.createUser);

export default userRouter;