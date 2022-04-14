const { Router } = require('express');
const UserGroupController = require('../controller/userGroupController');

const userGroupRouter = new Router();

userGroupRouter.get('/get-groups/:userId', UserGroupController.getUserGroups);
userGroupRouter.get('/get-users/:groupId', UserGroupController.getGroupUsers);
userGroupRouter.post('/add-user', UserGroupController.addUserToGroup);
userGroupRouter.delete('/delete-user', UserGroupController.deleteUserFromGroup);

module.exports = userGroupRouter;
