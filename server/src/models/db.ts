'use-strict';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const uri =
  process.env.CONNECTION_DB !== undefined
    ? process.env.CONNECTION_DB
    : 'mongodb://127.0.0.1:27017/eventsdatabase';

mongoose.connect(uri).catch((error) => console.log(error));

export default mongoose;
