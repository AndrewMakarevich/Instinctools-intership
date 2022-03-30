import { Router } from 'express';
import UserGroupController from '../controller/userGroupController';

const userGroupRouter = Router();

userGroupRouter.post('/add-user', UserGroupController.addUserToGroup);
userGroupRouter.delete('/delete-user', UserGroupController.deleteUserFromGroup);

export default userGroupRouter;