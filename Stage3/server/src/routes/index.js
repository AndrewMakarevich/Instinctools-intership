const { Router } = require('express');
const groupRouter = require('./groupRouter.js');
const userGroupRouter = require('./userGroupRouter.js');
const userRouter = require('./userRouter.js');

const mainRouter = new Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/group', groupRouter);
mainRouter.use('/user-group', userGroupRouter);

module.exports = mainRouter;