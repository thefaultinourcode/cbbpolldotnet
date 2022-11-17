import { connectMongo } from "./connect";
import User from "../models/User";
import TeamData from "../models/TeamData";
import UserBallot from "../models/UserBallot";

export const getUserInfo = async (username) =>{
    await connectMongo();
    const user = await User.findOne({name: username});
    return user;
}

export async function getTeam(id){
    await connectMongo();
    const teamData = await TeamData.findOne({_id: id});
    return teamData;
  }
  
export const getProfileBallots = async (user) => {
    await connectMongo();
    const profileBallots = await UserBallot.find({user: user});
    return profileBallots;
}


export const getTeams = async () => {
    try{
        await connectMongo();

        const teams = await TeamData.find({});
        const allTeams = JSON.parse(JSON.stringify(teams));
        return allTeams;

    }
    catch(error){
        console.log(error);
        return{
            notFound: true
        }
    }
}