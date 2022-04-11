const { Router } = require('express');
const UserController = require('../controller/userController');

const userRouter = new Router();

userRouter.get('/get/:paramValue', UserController.getUser);
userRouter.get('/get-many', UserController.getUsers);
userRouter.post('/create', UserController.createUser);
userRouter.put('/edit/:id', UserController.editUser);
userRouter.delete('/delete/:id', UserController.deleteUser);

module.exports = userRouter;
