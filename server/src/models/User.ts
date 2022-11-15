'use strict';

import mongoose from './db';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  uid: String,
  profileImageUrl: String,
});

const User = mongoose.model('User', userSchema);

export default User;
