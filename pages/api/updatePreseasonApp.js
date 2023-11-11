import { connectMongo } from '../../utils/connect';
import ApplicationData from '../../models/ApplicationData';

export default async function updatePSApp(req, res) {
	// const {user, favoriteTeam, favoriteTeam2, favoriteTeam3, checkbox1, checkbox2, checkbox3, checkbox4, checkbox5, checkbox6,
	//        checkbox7, checkbox8, checkbox9, checkbox10, checkbox11, checkbox12, approach, extra, participationRequirement,
	//        biasRequirement, memeRequirement, season } = req.body;
	console.log('req.body:', req.body);
	console.log('CONNECTING TO MONGO');
	await connectMongo();
	console.log('CONNECTED TO MONGO');

	console.log('CREATING DOCUMENT');
	//pass in correct data
	const application = await ApplicationData.findOneAndUpdate({ user: 'username', date: { $gte: '2023-10-01' } }, { official: true });
	console.log('CREATED DOCUMENT');

	res.json({ application });
}
