import { connectMongo } from "../../utils/connect";
import dbConnect from "../../lib/dbConnect";
import TeamData from "../../models/TeamData";

export default async function addTeam(req, res){
    const {_id, name, shortName, nickname, codes, conference, allTimeApVotes, url } = req.body;
    console.log('CONNECTING TO MONGO')
    await connectMongo();
    console.log('CONNECTED TO MONGO')

    console.log('CREATING DOCUMENT');
    const teamData = await TeamData.create(req.body);
    console.log('CREATED DOCUMENT');

    res.json({ teamData });
}