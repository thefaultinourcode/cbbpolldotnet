import { connectMongo } from "../../utils/connect";
//import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async function addUser(req, res){
    const {name, primaryTeam, secondaryTeam, tertiaryTeam, pollVoter } = req.body;
    console.log('CONNECTING TO MONGO')
    await connectMongo();
    console.log('CONNECTED TO MONGO')

    console.log('CREATING DOCUMENT');
    const user = await User.create(req.body);
    console.log('CREATED DOCUMENT');

    res.json({ user });
}