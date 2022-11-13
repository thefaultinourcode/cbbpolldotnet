import connectMongo from "./connectMongo";
import SeasonDates from "../models/SeasonDates";

export const getHomePageDates = async (season) => {

    await connectMongo();

    const dates = await SeasonDates.findOne({'season': {season}});
    const seasonDates = JSON.parse(JSON.stringify(dates));
    

    return seasonDates;
} 

const getSeason = () => {

}