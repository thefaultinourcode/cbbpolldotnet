import { connectMongo } from "../../utils/connect";
import UserBallot from "../../models/UserBallot";

export default async function changeUserStatus(req, res){
    console.log('CONNECTING TO MONGO')
    await connectMongo();
    console.log('CONNECTED TO MONGO')

    console.log('CREATING DOCUMENT');
    const response = await UserBallot.updateMany({}, {official: false});
    console.log('CREATED DOCUMENT');

    res.json({ response });
}