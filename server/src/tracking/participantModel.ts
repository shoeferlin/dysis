import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema(
    {
      name: {type: String, required: true, unique: true},
      agreedToStudyTerms: {type: Boolean},
      installationDate: {type: Number},
      totalUsageTime: {type: Number, default: 0}
      },
    {
      timestamps: true,
    },
);


mongoose.set('toJSON', {virtuals: true});

const participantModel = mongoose.model('participant', participantSchema);

export default participantModel;
