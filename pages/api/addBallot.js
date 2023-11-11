import { connectMongo } from '../../utils/connect';
import UserBallot from '../../models/UserBallot';

export default async function addBallot(req, res) {
	// const {date, week, user, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve,
	//     thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty, twentyOne, twentyTwo,
	//     twentyThree, twentyFour, twentyFive, overallReasoning} = req.body;
	const { date, week, user } = req.body;

	console.log('CONNECTING TO MONGO');
	await connectMongo();
	console.log('CONNECTED TO MONGO');

	console.log('CREATING DOCUMENT');
	const { userBallot } = req.body;

	//dynamically change this date
	//get season function
	let seasonDate = new Date('2023-10-01');
	let query = { week: week, user: user, date: { $gte: seasonDate } };

	const response = await UserBallot.findOneAndUpdate(query, { $set: req.body }, { upsert: true, strict: false });
	console.log('CREATED DOCUMENT');

	res.json({ response });
}
