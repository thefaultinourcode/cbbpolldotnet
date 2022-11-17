import connectMongo from "./connectMongo";
import SeasonDates from "../models/SeasonDates";

export const getHomePageDates = async (season) => {

    await connectMongo();

    const dates = await SeasonDates.findOne({'season': {season}});
    const seasonDates = JSON.parse(JSON.stringify(dates));

    return seasonDates;
} 

const getWeek = () => {

}

export const getSeason = () => {
    let today = new Date();
    let month = today.getMonth();

    let season;
    if(month < 9){
        season = today.getFullYear();
    }
    else{
        season = today.getFullYear() + 1;
    }

    return season;
}