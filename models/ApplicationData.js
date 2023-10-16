import {Schema, model, models} from 'mongoose';

const Teams = new Schema({
  id: {type: Number, required: true},
  name: {type: String, required: true}
});

const ApplicationDataSchema = new Schema({
  user: {type: String, required: true},
  favoriteTeam: {type: Number, required: true},
  favoriteTeam2: {type: Number, required: false},
  favoriteTeam3: {type: Number, required: false},
  checkbox1: Boolean,
  checkbox2: Boolean,
  checkbox3: Boolean,
  checkbox4: Boolean,
  checkbox5: Boolean,
  checkbox6: Boolean,
  checkbox7: Boolean,
  checkbox8: Boolean,
  checkbox9: Boolean,
  checkbox10: Boolean,
  checkbox11: Boolean,
  checkbox12: Boolean,
  approach: String,
  extra: String,
  participationRequirement: {type: Boolean, required: true},
  biasRequirement: {type: Boolean, required: true},
  memeRequirement: {type: Boolean, required: true},
  season: {type:Number, required:true}
});

const ApplicationData = models.ApplicationData || model('ApplicationData', ApplicationDataSchema);

export default ApplicationData;
