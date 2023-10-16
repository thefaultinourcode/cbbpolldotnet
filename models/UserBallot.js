import {Schema, model, models} from 'mongoose';

const BallotFieldSchema = new Schema({
  id: {type: Number, required: true},
  name: {type: String, required: true},
  points: {type: Number, required: true},
  reasoning: {type: String, required: false}  
});

const UserBallotSchema = new Schema({
  date: {type: Date, required: true},
  week: {type: String, required: true},
  user: {type: String, required: true},
  official: {type:Boolean, required:true},
  '1': {type: BallotFieldSchema, required: true},
  2: {type: BallotFieldSchema, required: true},
  3: {type: BallotFieldSchema, required: true},
  4: {type: BallotFieldSchema, required: true},
  5: {type: BallotFieldSchema, required: true},
  6: {type: BallotFieldSchema, required: true},
  7: {type: BallotFieldSchema, required: true},
  8: {type: BallotFieldSchema, required: true},
  9: {type: BallotFieldSchema, required: true},
  10: {type: BallotFieldSchema, required: true},
  11: {type: BallotFieldSchema, required: true},
  12: {type: BallotFieldSchema, required: true},
  13: {type: BallotFieldSchema, required: true},
  14: {type: BallotFieldSchema, required: true},
  15: {type: BallotFieldSchema, required: true},
  16: {type: BallotFieldSchema, required: true},
  17: {type: BallotFieldSchema, required: true},
  18: {type: BallotFieldSchema, required: true},
  19: {type: BallotFieldSchema, required: true},
  20: {type: BallotFieldSchema, required: true},
  21: {type: BallotFieldSchema, required: true},
  22: {type: BallotFieldSchema, required: true},
  23: {type: BallotFieldSchema, required: true},
  24: {type: BallotFieldSchema, required: true},
  25: {type: BallotFieldSchema, required: true},
  overallReasoning: String
});

const UserBallot = models.UserBallot || model('UserBallot', UserBallotSchema);

export default UserBallot;
