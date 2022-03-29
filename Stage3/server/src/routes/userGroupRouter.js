import { Router } from 'express';
import UserGroupController from '../controller/userGroupController';

const userGroupRouter = Router();

userGroupRouter.post('/add', UserGroupController.addUserToGroup);

export default userGroupRouter;