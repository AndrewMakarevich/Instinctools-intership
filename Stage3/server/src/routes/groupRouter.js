import { Router } from 'express';
import GroupController from '../controller/groupController';

const groupRouter = Router();

groupRouter.get('/get/:paramValue', GroupController.getGroup);
groupRouter.get('/get-many', GroupController.getGroups);
groupRouter.post('/create', GroupController.createGroup);
groupRouter.delete('/delete/:id', GroupController.deleteGroup);

export default groupRouter;