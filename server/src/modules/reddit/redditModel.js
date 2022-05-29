import mongoose from 'mongoose';

const redditSchema = new mongoose.Schema({
  username: {type: String, required: true},
  liwcAnalytical: {type: String},
});

export default mongoose.model('reddit', redditSchema);
