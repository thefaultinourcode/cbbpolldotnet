import dbConnect from '../../lib/dbConnect';
import Team from '../../models/Team';

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const teams = await Team.find({});
				res.status(200).json({ success: true, data: teams });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const team = await Team.create(req.body);
				res.status(201).json({ success: true, data: team });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
