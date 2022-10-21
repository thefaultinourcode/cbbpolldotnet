import {Schema, model, models} from 'mongoose';

const BallotFieldSchema = new Schema({
  id: {type: Number, required: true},
  name: {type: String, required: true},
  reasoning: {type: String, required: false},
  points: {type: Number, required: true}  
});

const UserBallotSchema = new Schema({
  date: {type: Date, required: true},
  week: {type: String, required: true},
  user: {type: String, required: true},
  one: {type: BallotFieldSchema, required: true},
  two: {type: BallotFieldSchema, required: true},
  three: {type: BallotFieldSchema, required: true},
  four: {type: BallotFieldSchema, required: true},
  five: {type: BallotFieldSchema, required: true},
  six: {type: BallotFieldSchema, required: true},
  seven: {type: BallotFieldSchema, required: true},
  eight: {type: BallotFieldSchema, required: true},
  nine: {type: BallotFieldSchema, required: true},
  ten: {type: BallotFieldSchema, required: true},
  eleven: {type: BallotFieldSchema, required: true},
  twelve: {type: BallotFieldSchema, required: true},
  thirteen: {type: BallotFieldSchema, required: true},
  fourteen: {type: BallotFieldSchema, required: true},
  fifteen: {type: BallotFieldSchema, required: true},
  sixteen: {type: BallotFieldSchema, required: true},
  seventeen: {type: BallotFieldSchema, required: true},
  eighteen: {type: BallotFieldSchema, required: true},
  nineteen: {type: BallotFieldSchema, required: true},
  twenty: {type: BallotFieldSchema, required: true},
  twentyOne: {type: BallotFieldSchema, required: true},
  twentyTwo: {type: BallotFieldSchema, required: true},
  twentyThree: {type: BallotFieldSchema, required: true},
  twentyFour: {type: BallotFieldSchema, required: true},
  twentyFive: {type: BallotFieldSchema, required: true},
  overallReasoning: String
});

const UserBallot = models.UserBallot || model('UserBallot', UserBallotSchema);

export default UserBallot;
