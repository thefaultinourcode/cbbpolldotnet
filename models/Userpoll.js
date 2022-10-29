import {Schema, model, models} from 'mongoose';

const UserpollSchema = new Schema({
  week: String,
  season: String,
  poll: Array
});

const Userpoll = models.Userpoll || model('Userpoll', UserpollSchema);

export default Userpoll;
