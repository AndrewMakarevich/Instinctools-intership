import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    match: [/^[a-zA-Z0-9\.,-]{4,20}$/, "Username does't match required pattern"]
  },

  firstName: {
    type: String,
    match: [/^[a-zA-Z]+\s?[a-zA-Z]+$/, "First name does't match required pattern"],
    minlength: [2, 'First name is too short'],
    maxlength: [20, 'First name is too long']
  },

  lastName: {
    type: String,
    match: [/^[a-zA-Z]+$/, "Last name does't match required pattern"],
    minlength: [2, 'Last name is too short'],
    maxlength: [20, 'Last name is too long']
  },

  email: {
    type: String,
    unique: true,
    match: [/^[a-zA-Z0-9!#$%&'\*\+\-\/=?^_`{}|]{1,65}@([a-zA-Z0-9]+.){1,2}[a-zA-Z]{2,14}$/]
  }
});

// UserSchema.indexes({ username: 1, email: 1 }, { unique: true });

const GroupSchema = new Schema({
  groupName: {
    type: String,
    unique: true,
    match: [/^[a-zA-Z0-9.-]{4,20}$/, "Group's name doesn't match required pattern"]
  },

  groupTitle: {
    type: String,
    match: [/^[a-zA-Z0-9.-]{6,20}$/, "Group's title doesn't match required pattern"]
  },
});

const UsersGroupsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },

  groupId: {
    type: Schema.Types.ObjectId
  }
});

export const UserModel = model('User', UserSchema);
export const GroupModel = model('Group', GroupSchema);
export const UsersGroupsModel = model('UsersGroups', UsersGroupsSchema);
