import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
	name: String,
	primaryTeam: String,
	secondaryTeam: String,
	tertiaryTeam: String,
	pollVoter: Boolean,
});

const User = models.User || model('User', UserSchema);

export default User;
