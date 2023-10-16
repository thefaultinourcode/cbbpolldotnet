import { connectMongo } from "../../utils/connect";
import User from "../../models/User";

export default async function changeUserStatus(req, res){
    console.log('CONNECTING TO MONGO')
    await connectMongo();
    console.log('CONNECTED TO MONGO')

    console.log('CREATING DOCUMENT');
    const response = await User.updateMany({}, {pollVoter: false});
    console.log('CREATED DOCUMENT');

    res.json({ response });
}