import { connectMongo } from '../../utils/connect';
import TeamData from '../../models/TeamData';

export default async function getTeam(req, res) {
	//const {_id, name, shortName, nickname, codes, conference, allTimeApVotes } = req.body;
	console.log('CONNECTING TO MONGO');
	await connectMongo();
	console.log('CONNECTED TO MONGO');

	console.log('FETCHING DOCUMENT');
	const teamData = await TeamData.find({});
	console.log('FETCHED DOCUMENT');

	res.json({ teamData });
}
