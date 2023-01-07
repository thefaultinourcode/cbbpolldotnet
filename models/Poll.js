import {Schema, model, models} from 'mongoose';

const PollSchema = new Schema({
  ballots: [String],
  week: String,
  season: Number
});

const Poll = models.Poll || model('Poll', PollSchema);

export default Poll;
