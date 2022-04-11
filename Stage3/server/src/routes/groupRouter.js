const { Router } = require('express');
const GroupController = require('../controller/groupController');

const groupRouter = new Router();

groupRouter.get('/get/:paramValue', GroupController.getGroup);
groupRouter.get('/get-many', GroupController.getGroups);
groupRouter.post('/create', GroupController.createGroup);
groupRouter.put('/edit/:id', GroupController.editGroup);
groupRouter.delete('/delete/:id', GroupController.deleteGroup);

module.exports = groupRouter;
