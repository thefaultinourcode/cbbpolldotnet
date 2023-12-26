import dbConnect from '../../lib/dbConnect';
import TeamData from '../../models/TeamData';
let mongoose = require('mongoose');
import { connectMongo } from '../../utils/connect';

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();
	switch (method) {
		case 'GET':
			try {
				const teamsData = await TeamData.find({});
				console.log('teamsData:', teamsData);
				res.status(200).json({ success: true, data: teamsData });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const team = await TeamData.create(req.body);
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
