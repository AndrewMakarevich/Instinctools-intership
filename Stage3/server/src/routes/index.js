import { Router } from 'express';
import userRouter from './userRouter.js';

const mainRouter = Router();
mainRouter.use('/user', userRouter);

export default mainRouter;