import { Router } from 'express';
import UserController from '../controller/userController.js';

const userRouter = Router();

userRouter.get('/get/:paramValue', UserController.getUser);
userRouter.get('/get-many', UserController.getUsers);
userRouter.post('/create', UserController.createUser);
userRouter.delete('/delete/:id', UserController.deleteUser);

export default userRouter;