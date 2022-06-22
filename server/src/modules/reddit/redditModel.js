import mongoose from 'mongoose';

const redditSchema = new mongoose.Schema(
    {
      identifier: {type: String, required: true, unique: true},
      liwcAnalytical: {type: Number},
      liwcEmotionalTone: {type: Number},
      analytics: {
        perspective: {
          toxicity: {type: Number},
        },
      },
      metrics: {
        totalSubmissions: {type: Number},
        totalComments: {type: Number},
        medianScoreComments: {type: Number},
        medianScoreSubmissions: {type: Number},
        averageScoreComments: {type: Number},
        averageScoreSubmissions: {type: Number},
      },
      context: {
        subredditsForSubmissions: [{subreddit: String, count: Number}],
        subredditsForComments: [{subreddit: String, count: Number}],
        subreddits: [{subreddit: String, count: Number}],
      },
    },
    {
      timestamps: true,
    },
);

const redditModel = mongoose.model('reddit', redditSchema);
export default redditModel;
