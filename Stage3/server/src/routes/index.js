import { Router } from 'express';
import groupRouter from './groupRouter.js';
import userRouter from './userRouter.js';

const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/group', groupRouter);

export default mainRouter;