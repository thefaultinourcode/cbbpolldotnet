import { connectMongo } from "../../utils/connect";
import UserBallot from "../../models/UserBallot";

export default async function changeUserStatus(req, res){
    const {user, date, official} = req.body;
    console.log('CONNECTING TO MONGO')
    await connectMongo();
    console.log('CONNECTED TO MONGO')

    console.log('CREATING DOCUMENT');
    const response = await UserBallot.updateOne({user:user, date:{$gte:date}}, {official: official});
    console.log('CREATED DOCUMENT');

    res.json({ response });
}