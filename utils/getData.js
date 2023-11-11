import { connectMongo } from './connect';
import User from '../models/User';
import TeamData from '../models/TeamData';
import UserBallot from '../models/UserBallot';

export const getUserInfo = async (username) => {
	await connectMongo();
	const user = await User.findOne({ name: username });
	return user;
};

export async function getTeam(id) {
	await connectMongo();
	const teamData = await TeamData.findOne({ _id: id });
	return teamData;
}

export const getProfileBallots = async (user) => {
	await connectMongo();
	const profileBallots = await UserBallot.find({ user: user });
	return profileBallots;
};

export const getTeams = async () => {
	try {
		await connectMongo();

		const teams = await TeamData.find({});
		const allTeams = JSON.parse(JSON.stringify(teams));
		return allTeams;
	} catch (error) {
		console.log(error);
		return {
			notFound: true,
		};
	}
};

export const getPollVoters = async () => {
	await connectMongo();

	const pollVoters = await User.find({ pollVoters: true });
	const parsedVoters = JSON.parse(JSON.stringify(pollVoters));
	return parsedVoters;
};

export const getHistoricalBallots = async (official, week, season) => {
	let startYear = season - 1;

	let startDate = startYear + '-10-01';
	let endDate = season + '-05-01';

	await connectMongo();

	let ballots;
	if (week === 'Pre-Season' || week === 2) {
		ballots = await UserBallot.find({ official: official, week: week, date: { $gte: startDate, $lt: endDate } });
	} else {
		ballots = await UserBallot.find({ official: official, week: week, season: { $gte: startDate, $lt: endDate } });
	}

	let voters = [];

	for (let i = 0; i < ballots.length; i++) {
		let user = await getUserInfo(ballots[i].user);
		console.log(ballots[i]);
		console.log('user:', user);
		if (user === null) {
			continue;
		}
		let team = await getTeam(user.primaryTeam);
		let url = team.url;
		voters.push({
			username: ballots[i].user,
			ballotId: ballots[i]._id.toString(),
			url: url,
		});
	}
	return voters;
};
