import { connectMongo } from "../../utils/connect";
import SeasonDates from "../../models/SeasonDates";

export default async function addBallot(req, res){
    const {season, preseasonDates, seasonDates, postseasonDates} = req.body;
    await connectMongo();
    const {seasonDatesObj} = req.body;
    let query = {season: season};
    
    const response = await SeasonDates.findOneAndUpdate(query, {$set: req.body}, {upsert: true, strict: false});

    res.json({ response });
}