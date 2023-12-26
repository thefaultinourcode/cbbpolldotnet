import { connectMongo } from '../../utils/connect';
import Userpoll from '../../models/Userpoll';

export default async function addPoll(req, res) {
	const { week, season, userpoll } = req.body;

	await connectMongo();

	const response = await Userpoll.create(req.body);

	res.json({ response });
}
