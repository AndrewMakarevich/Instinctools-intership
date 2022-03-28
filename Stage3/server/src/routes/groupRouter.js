import { Router } from 'express';
import GroupController from '../controller/groupController';

const groupRouter = Router();

groupRouter.get('/get/:paramValue', GroupController.getGroup);
groupRouter.post('/create', GroupController.createGroup);

export default groupRouter;