const { Router } = require('express');
const groupRouter = require('./groupRouter');
const userGroupRouter = require('./userGroupRouter');
const userRouter = require('./userRouter');

const mainRouter = new Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/group', groupRouter);
mainRouter.use('/user-group', userGroupRouter);

module.exports = mainRouter;
