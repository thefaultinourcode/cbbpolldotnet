import { connectMongo } from '../../utils/connect';
import User from '../../models/User';

export default async function addUser(req, res) {
	const { name, primaryTeam, secondaryTeam, tertiaryTeam, pollVoter } = req.body;
	console.log('CONNECTING TO MONGO');
	await connectMongo();
	console.log('CONNECTED TO MONGO');

	let query = { name: name };

	console.log('CREATING DOCUMENT');
	const response = await User.findOneAndUpdate(query, { $set: req.body }, { upsert: true });
	console.log('CREATED DOCUMENT');

	res.json({ response });
}
