import { Router } from 'express';
import groupRouter from './groupRouter.js';
import userGroupRouter from './userGroupRouter.js';
import userRouter from './userRouter.js';

const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/group', groupRouter);
mainRouter.use('/user-group', userGroupRouter);

export default mainRouter;