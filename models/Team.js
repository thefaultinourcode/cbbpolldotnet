import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
	name: String,
	nickname: String,
});

module.exports = mongoose.models.Team || mongoose.model('Team', TeamSchema);
