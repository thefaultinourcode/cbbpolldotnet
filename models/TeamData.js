import { Schema, model, models } from 'mongoose';

const TeamDataSchema = new Schema({
	_id: Number,
	name: String,
	shortName: String,
	nickname: String,
	codes: [String],
	conference: String,
	allTimeApVotes: Number,
	url: String,
});

const TeamData = models.TeamData || model('TeamData', TeamDataSchema);

export default TeamData;
