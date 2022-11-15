'use strict';

import mongoose from './db';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  imageUrl: String,
  title: String,
  description: String,
  attendees: [String],
  timestamp: String,
  location: String,
  creator: String,
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
