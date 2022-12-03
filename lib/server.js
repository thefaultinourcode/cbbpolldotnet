import { connectMongo } from "../utils/connect";
import User from "../models/User";
import UserBallot from "../models/UserBallot";
import TeamData from "../models/TeamData";

export const getUserList = async (pollVoter) => {
	await connectMongo();

	const users = await User.find({ pollVoter: pollVoter });
	const userList = JSON.parse(JSON.stringify(users));
	let userArray = [];
	for (let i = 0; i < userList.length; i++) {
		userArray.push(userList[i].name);
	}
	return userArray;
};

export const getUserInfo = async (username) => {
	await connectMongo();

	const user = await User.find({ name: username });
	return user;
};

export const getBallots = async (pollVoter) => {
	let users = await getUserList(pollVoter);

	await connectMongo();

	let pollDate = new Date("21 November 2022 15:00 UTC");
	let today = new Date();
	//let today = new Date('3 May 2023 15:00 UTC');
	let week;
	if (today > pollDate) {
		week = 3;
	} else {
		week = 2;
	}

	const ballots = await UserBallot.find({ user: { $in: users }, week: week });

	let voters = [];
	for (let i = 0; i < ballots.length; i++) {
		let user = await getUserInfo(ballots[i].user);
		let team = await getTeam(user[0].primaryTeam);
		let url = team.url;
		voters.push({
			username: ballots[i].user,
			ballotId: ballots[i]._id.toString(),
			url: url,
		});
	}
	return voters;
};

export async function getTeam(id) {
	await connectMongo();

	const teamData = await TeamData.findOne({ _id: id });

	return teamData;
}

export const getUserpoll = async (week) => {
	// async function findPoll(){
	//   let poll = await Userpoll.exists({week: "Pre-Season", season: "2022-2023"});
	//   console.log('poll:', poll);
	//   return poll;
	// }

	// let poll = await findPoll();
	// console.log(poll);

	// if(poll){
	//   console.log('if poll then...');
	//   let week = "Pre-Season";
	//   let season = "2022-2023";
	//   let userpoll = await getPoll(week, season);
	//   return userpoll;
	// }
	//else{
	// console.log('else poll then...');

	let userArray = await getUserList(true);

	await connectMongo();

	const ballots = await UserBallot.find({ user: { $in: userArray }, week: week });
	const ballotList = JSON.parse(JSON.stringify(ballots));

	console.log("ballotlist", ballotList);

	console.log("BALLOT KEYS", Object.keys(ballotList[0]));

	const teamsVotedFor = [];

	//get all teams voted for
	ballotList.forEach((ballot) => {
		for (let i = 1; i <= 25; i++) {
			teamsVotedFor.push(ballot[i].id);
		}
	});

	//remove duplicates
	const uniqueTeams = [...new Set(teamsVotedFor)];

	console.log("uniqueTeams", uniqueTeams);

	const totalPointsForTeam = [];
	const firstPlaceVotes = [];

	//aggregate points for each team
	ballotList.forEach((ballot) => {
		let fpTeamIndex = firstPlaceVotes.findIndex((fpTeam) => fpTeam.team === ballot["1"].id);

		if (fpTeamIndex !== -1) {
			firstPlaceVotes[fpTeamIndex].votes++;
		} else {
			firstPlaceVotes.push({ team: ballot["1"].id, votes: 1 });
		}

		uniqueTeams.forEach((team) => {
			let points = 0;
			for (let i = 1; i <= 25; i++) {
				if (ballot[i].id === team) {
					points += ballot[i].points;
				}
			}

			console.log(team);
			console.log(totalPointsForTeam);
			let teamIndex = totalPointsForTeam.findIndex((obj) => obj.team == team);

			console.log("teamIndex", teamIndex);

			if (teamIndex !== -1) {
				totalPointsForTeam[teamIndex].points += points;
			} else {
				totalPointsForTeam.push({ team: team, points: points });
			}
		});
	});

	//function to sort array of objects by points
	const compare = (a, b) => {
		if (a.points < b.points) {
			return 1;
		}
		if (a.points > b.points) {
			return -1;
		}
		return 0;
	};

	//sort array of objects by points
	totalPointsForTeam.sort(compare);

	console.log("total point for team", totalPointsForTeam);
	console.log("first place votes", firstPlaceVotes);

	let userpoll = totalPointsForTeam.map(async (team, i) => {
		const teamData = await getTeam(team.team);
		const fullName = concatName(teamData.shortName, teamData.nickname);
		const firstPlaceVoteIndex = firstPlaceVotes.findIndex((fpTeam) => fpTeam.team === team.team);

		return {
			rank: i + 1,
			teamId: team.team,
			teamName: fullName,
			shortName: teamData.shortName,
			points: team.points,
			firstPlaceVotes: firstPlaceVoteIndex !== -1 ? firstPlaceVotes[firstPlaceVoteIndex].votes : 0,
			url: teamData.url,
		};
	});

	userpoll = await Promise.all(userpoll);

	function concatName(shortName, nickname) {
		return shortName + " " + nickname;
	}

	// let numberOne = {};
	// let pointTotals = {};
	// for (let i = 0; i < ballotList.length; i++) {
	// 	if (week === "Pre-Season") {
	// 		if (numberOne[ballotList[i]["one"].id] == null) {
	// 			numberOne[ballotList[i]["one"].id] = 0;
	// 		}
	// 		numberOne[ballotList[i]["one"].id]++;

	// 		pointTotals[ballotList[i]["one"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["one"].id,
	// 			ballotList[i]["one"].points
	// 		);
	// 		pointTotals[ballotList[i]["two"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["two"].id,
	// 			ballotList[i]["two"].points
	// 		);
	// 		pointTotals[ballotList[i]["three"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["three"].id,
	// 			ballotList[i]["three"].points
	// 		);
	// 		pointTotals[ballotList[i]["four"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["four"].id,
	// 			ballotList[i]["four"].points
	// 		);
	// 		pointTotals[ballotList[i]["five"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["five"].id,
	// 			ballotList[i]["five"].points
	// 		);
	// 		pointTotals[ballotList[i]["six"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["six"].id,
	// 			ballotList[i]["six"].points
	// 		);
	// 		pointTotals[ballotList[i]["seven"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["seven"].id,
	// 			ballotList[i]["seven"].points
	// 		);
	// 		pointTotals[ballotList[i]["eight"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["eight"].id,
	// 			ballotList[i]["eight"].points
	// 		);
	// 		pointTotals[ballotList[i]["nine"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["nine"].id,
	// 			ballotList[i]["nine"].points
	// 		);
	// 		pointTotals[ballotList[i]["ten"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["ten"].id,
	// 			ballotList[i]["ten"].points
	// 		);
	// 		pointTotals[ballotList[i]["eleven"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["eleven"].id,
	// 			ballotList[i]["eleven"].points
	// 		);
	// 		pointTotals[ballotList[i]["twelve"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["twelve"].id,
	// 			ballotList[i]["twelve"].points
	// 		);
	// 		pointTotals[ballotList[i]["thirteen"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["thirteen"].id,
	// 			ballotList[i]["thirteen"].points
	// 		);
	// 		pointTotals[ballotList[i]["fourteen"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["fourteen"].id,
	// 			ballotList[i]["fourteen"].points
	// 		);
	// 		pointTotals[ballotList[i]["fifteen"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["fifteen"].id,
	// 			ballotList[i]["fifteen"].points
	// 		);
	// 		pointTotals[ballotList[i]["sixteen"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["sixteen"].id,
	// 			ballotList[i]["sixteen"].points
	// 		);
	// 		pointTotals[ballotList[i]["seventeen"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["seventeen"].id,
	// 			ballotList[i]["seventeen"].points
	// 		);
	// 		pointTotals[ballotList[i]["eighteen"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["eighteen"].id,
	// 			ballotList[i]["eighteen"].points
	// 		);
	// 		pointTotals[ballotList[i]["nineteen"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["nineteen"].id,
	// 			ballotList[i]["nineteen"].points
	// 		);
	// 		pointTotals[ballotList[i]["twenty"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["twenty"].id,
	// 			ballotList[i]["twenty"].points
	// 		);
	// 		pointTotals[ballotList[i]["twentyOne"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["twentyOne"].id,
	// 			ballotList[i]["twentyOne"].points
	// 		);
	// 		pointTotals[ballotList[i]["twentyTwo"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["twentyTwo"].id,
	// 			ballotList[i]["twentyTwo"].points
	// 		);
	// 		pointTotals[ballotList[i]["twentyThree"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["twentyThree"].id,
	// 			ballotList[i]["twentyThree"].points
	// 		);
	// 		pointTotals[ballotList[i]["twentyFour"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["twentyFour"].id,
	// 			ballotList[i]["twentyFour"].points
	// 		);
	// 		pointTotals[ballotList[i]["twentyFive"].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i]["twentyFive"].id,
	// 			ballotList[i]["twentyFive"].points
	// 		);
	// 	} else {
	// 		if (numberOne[ballotList[i][1].id] == null) {
	// 			numberOne[ballotList[i][1].id] = 0;
	// 		}
	// 		numberOne[ballotList[i][1].id]++;

	// 		pointTotals[ballotList[i][1].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][1].id,
	// 			ballotList[i][1].points
	// 		);
	// 		pointTotals[ballotList[i][2].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][2].id,
	// 			ballotList[i][2].points
	// 		);
	// 		pointTotals[ballotList[i][3].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][3].id,
	// 			ballotList[i][3].points
	// 		);
	// 		pointTotals[ballotList[i][4].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][4].id,
	// 			ballotList[i][4].points
	// 		);
	// 		pointTotals[ballotList[i][5].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][5].id,
	// 			ballotList[i][5].points
	// 		);
	// 		pointTotals[ballotList[i][6].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][6].id,
	// 			ballotList[i][6].points
	// 		);
	// 		pointTotals[ballotList[i][7].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][7].id,
	// 			ballotList[i][7].points
	// 		);
	// 		pointTotals[ballotList[i][8].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][8].id,
	// 			ballotList[i][8].points
	// 		);
	// 		pointTotals[ballotList[i][9].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][9].id,
	// 			ballotList[i][9].points
	// 		);
	// 		pointTotals[ballotList[i][10].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][10].id,
	// 			ballotList[i][10].points
	// 		);
	// 		pointTotals[ballotList[i][11].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][11].id,
	// 			ballotList[i][11].points
	// 		);
	// 		pointTotals[ballotList[i][12].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][12].id,
	// 			ballotList[i][12].points
	// 		);
	// 		pointTotals[ballotList[i][13].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][13].id,
	// 			ballotList[i][13].points
	// 		);
	// 		pointTotals[ballotList[i][14].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][14].id,
	// 			ballotList[i][14].points
	// 		);
	// 		pointTotals[ballotList[i][15].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][15].id,
	// 			ballotList[i][15].points
	// 		);
	// 		pointTotals[ballotList[i][16].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][16].id,
	// 			ballotList[i][16].points
	// 		);
	// 		pointTotals[ballotList[i][17].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][17].id,
	// 			ballotList[i][17].points
	// 		);
	// 		pointTotals[ballotList[i][18].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][18].id,
	// 			ballotList[i][18].points
	// 		);
	// 		pointTotals[ballotList[i][19].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][19].id,
	// 			ballotList[i][19].points
	// 		);
	// 		pointTotals[ballotList[i][20].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][20].id,
	// 			ballotList[i][20].points
	// 		);
	// 		pointTotals[ballotList[i][21].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][21].id,
	// 			ballotList[i][21].points
	// 		);
	// 		pointTotals[ballotList[i][22].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][22].id,
	// 			ballotList[i][22].points
	// 		);
	// 		pointTotals[ballotList[i][23].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][23].id,
	// 			ballotList[i][23].points
	// 		);
	// 		pointTotals[ballotList[i][24].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][24].id,
	// 			ballotList[i][24].points
	// 		);
	// 		pointTotals[ballotList[i][25].id] = getPoints(
	// 			pointTotals,
	// 			ballotList[i][25].id,
	// 			ballotList[i][25].points
	// 		);
	// 	}
	// }

	// function getPoints(obj, id, points) {
	// 	if (obj[id] == null) {
	// 		obj[id] = 0;
	// 	}
	// 	obj[id] += points;
	// 	return obj[id];
	// }

	// let pointTotalSort = Object.entries(pointTotals).sort((a, b) => b[1] - a[1]);

	// let rank;
	// for (let i = 0; i < pointTotalSort.length; i++) {
	// 	if (i === 0) {
	// 		rank = 1;
	// 		pointTotalSort[i].push(rank);
	// 	} else {
	// 		if (pointTotalSort[i][1] === pointTotalSort[i - 1][1]) {
	// 			pointTotalSort[i].push(rank);
	// 			rank++;
	// 		} else {
	// 			rank++;
	// 			pointTotalSort[i].push(rank);
	// 		}
	// 	}
	// }

	// let userpoll2 = [];

	// for (let i = 0; i < pointTotalSort.length; i++) {
	// 	let team = await getTeam(pointTotalSort[i][0]);
	// 	let fullName = concatName(team.shortName, team.nickname);

	// 	userpoll2.push({
	// 		rank: pointTotalSort[i][2],
	// 		teamId: pointTotalSort[i][0],
	// 		teamName: fullName,
	// 		shortName: team.shortName,
	// 		points: pointTotalSort[i][1],
	// 		firstPlaceVotes: getFirstPlaceVotes(pointTotalSort[i][0]),
	// 		url: team.url,
	// 	});
	// }

	// function getFirstPlaceVotes(id) {
	// 	if (numberOne[id] == null) {
	// 		return 0;
	// 	} else {
	// 		return numberOne[id];
	// 	}
	// }

	// let userpollData = {
	// 	week: "Pre-Season",
	// 	season: "2023",
	// 	poll: userpoll2,
	// 	new: true,
	// };

	// console.log("userpollData:", userpollData);

	console.log("new userpollData: ", userpoll);

	return userpoll;
	//}
};
