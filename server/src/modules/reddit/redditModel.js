import mongoose from 'mongoose';

const redditSchema = new mongoose.Schema(
    {
      identifier: {type: String, required: true, unique: true},
      liwcAnalytical: {type: String},
    },
    {
      timestamps: true,
    },
);

const redditModel = mongoose.model('reddit', redditSchema);
export default redditModel;
