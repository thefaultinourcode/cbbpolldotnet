import { connectMongo } from '../../utils/connect';
import ApplicationData from '../../models/ApplicationData';

export default async function getApp(req, res) {
	//const {_id, name, shortName, nickname, codes, conference, allTimeApVotes } = req.body;
	console.log('CONNECTING TO MONGO');
	await connectMongo();
	console.log('CONNECTED TO MONGO');

	console.log('FETCHING DOCUMENT');
	const application = await ApplicationData.find({});
	console.log('FETCHED DOCUMENT');

	res.json({ application });
}
