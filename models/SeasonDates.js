import {Schema, model, models} from 'mongoose';

const SeasonItemSchema = new Schema({
  open: Date,
  close: Date
});

const SeasonDatesSchema = new Schema({
  season: String,
  preseasonDates: {type: SeasonItemSchema},
  seasonDates: {type: SeasonItemSchema},
  postseasonDates: {type: SeasonItemSchema}
});

const SeasonDates = models.SeasonDates || model('SeasonDates', SeasonDatesSchema);

export default SeasonDates;
