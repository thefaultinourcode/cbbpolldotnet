import { connectMongo } from "../../utils/connect";
// import Userpoll from "../../models/Userpoll";
import Poll from "../../components/poll";

export default async function addPoll(req, res){
    //const {week, season, userpoll } = req.body;
    const{ballots, week} = req.body;


    await connectMongo();

    const response = await Poll.create(req.body);

    res.json({ response });
}