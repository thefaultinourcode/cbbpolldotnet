import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import axios, { Axios } from 'axios';
import querystring from 'querystring';
const randomstring = require('randomstring');
import Image from 'next/image';
import User from '../../models/User';
import UserBallot from '../../models/UserBallot';
import TeamData from '../../models/TeamData';
//import Userpoll from "../models/Userpoll";
import { connectMongo } from '../../utils/connect';
// import { getHomePageDates } from "../utils/getDates";
import Link from 'next/link';
import Poll from '../../components/poll';
import { getSeasonCheckDate, getWeek } from '../../utils/getDates';
import { inDevEnvironment } from '../../lib/isDevEnv';
const DURATION = 'permanent';
const SCOPE = 'identity';

//const REDIRECT_URI = process.env.REDIRECT_URI;
const REDIRECT_URI = inDevEnvironment ? "http://localhost:3000/profile" : 'http://cbbpoll.net/profile';

const RANDOM_STRING = 'randomstringhere'; //randomstring.generate();
const RESPONSE_TYPE = 'code';
const CLIENT_ID = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

const URL = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`;

export default function Preview(props) {
	let title;
	let modlist = ['broadwaystarVGC', 'SleveMcDichael4', 'DEP61'];
	let week = getWeek();

	if (!modlist.includes(props.user.name)) {
		return (
			<div>
				<h1>You do not have permission to view this page.</h1>
			</div>
		);
	}

	if (week === 'Pre-Season' || week === 'Post-Season') {
		title = <h1>{week} Results</h1>;
	} else {
		title = <h1>Week {week} Results</h1>;
	}

	let userpoll = props.userpoll;
	let pollVoters = props.pollVoters;
	let provisionalVoters = props.provisionalVoters;
	console.log('props.userpoll:', props.userpoll);

	let table = [];
	let othersReceivingVotes = '';

	for (let i = 0; i < userpoll.length; i++) {
		if (userpoll[i].rank <= 25) {
			table.push(userpoll[i]);
		} else {
			if (i < userpoll.length - 1) {
				othersReceivingVotes = othersReceivingVotes + userpoll[i].shortName + ' ' + userpoll[i].points + ', ';
			} else {
				othersReceivingVotes = othersReceivingVotes + userpoll[i].shortName + ' ' + userpoll[i].points;
			}
		}
	}

	let pollVoterArray = [];
	for (let i = 0; i < pollVoters.length; i++) {
		if (i !== pollVoters.length - 1) {
			pollVoterArray.push(
				<Link href={`/ballots/${week}/${pollVoters[i].ballotId}`}>
					<span>
						<a>
							{' '}
							<Image src={pollVoters[i].url} width={25} height={25}></Image> {pollVoters[i].username},{' '}
						</a>
					</span>
				</Link>
			);
		} else {
			pollVoterArray.push(
				<Link href={`/ballots/${week}/${pollVoters[i].ballotId}`}>
					<span>
						<a>
							<Image src={pollVoters[i].url} width={25} height={25}></Image> {pollVoters[i].username}
						</a>
					</span>
				</Link>
			);
		}
	}

	let provisionalVoterArray = [];
	for (let i = 0; i < provisionalVoters.length; i++) {
		if (i !== pollVoters.length - 1) {
			provisionalVoterArray.push(
				<Link href={`/ballots/${week}/${provisionalVoters[i].ballotId}`}>
					<span>
						<a>
							<Image src={provisionalVoters[i].url} width={25} height={25}></Image> {provisionalVoters[i].username},{' '}
						</a>
					</span>
				</Link>
			);
		} else {
			provisionalVoterArray.push(
				<Link href={`/ballots/${week}/${provisionalVoters[i].ballotId}`}>
					<span>
						<a>
							<Image src={provisionalVoters[i].url} width={25} height={25}></Image> {provisionalVoters[i].username}{' '}
						</a>
					</span>
				</Link>
			);
		}
	}

	return (
		<div>
			{title}
			<Poll teams={table}></Poll>
			<span className="boldText">Others Receiving Votes: </span>
			{othersReceivingVotes}
			<h2>Poll Voters</h2>
			{pollVoterArray.map((voter) => voter)}
			<h2>Provisional Voters</h2>
			{provisionalVoterArray.map((voter) => voter)}
		</div>
	);
}

const getToken = async (body) => {
	const data = await axios.post('https://www.reddit.com/api/v1/access_token', querystring.stringify(body), {
		headers: {
			Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
			'content-type': 'application/x-www-form-urlencoded',
		},
	});
	return data.data;
};

export const getServerSideProps = async ({ query, req, res }) => {
	let week = getWeek();

	const refresh_token = getCookie('refresh_token', { req, res });
	const access_token = getCookie('access_token', { req, res });

	if (refresh_token) {
		if (access_token) {
			const user = await getUser(access_token);
			const userpoll = await getUserpoll(week);
			const pollVoters = await getBallots(true, week);
			const provisionalVoters = await getBallots(false, week);
			return { props: { user, userpoll, pollVoters, provisionalVoters } };
		} else {
			const token = await getToken({
				refresh_token: refresh_token,
				grant_type: 'refresh_token',
			});
			setCookie('refresh_token', token.refresh_token, {
				req,
				res,
				maxAge: 60 * 60,
			});
			setCookie('access_token', token.access_token, {
				req,
				res,
				maxAge: 60 * 60 * 24,
			});
			const user = await getUser(token.access_token);
			const userpoll = await getUserpoll(week);
			const pollVoters = await getBallots(true, week);
			const provisionalVoters = await getBallots(false, week);
			return { props: { user, userpoll, pollVoters, provisionalVoters } };
		}
	} else if (query.code && query.state === RANDOM_STRING) {
		try {
			const token = await getToken({
				code: query.code,
				grant_type: 'authorization_code',
				redirect_uri: REDIRECT_URI,
			});
			setCookie('refresh_token', token.refresh_token, {
				req,
				res,
				maxAge: 60 * 60,
			});
			setCookie('access_token', token.access_token, {
				req,
				res,
				maxAge: 60 * 60 * 24,
			});
			const user = await getUser(token.access_token);
			const userpoll = await getUserpoll(week);
			const pollVoters = await getBallots(true, week);
			const provisionalVoters = await getBallots(false, week);
			return { props: { user, userpoll, pollVoters, provisionalVoters } };
		} catch (e) {
			console.log(e);
			return { props: { user: null } };
		}
	} else {
		const userpoll = await getUserpoll(week);
		const pollVoters = await getBallots(true, week);
		const provisionalVoters = await getBallots(false, week);
		return { props: { user: null, userpoll, pollVoters, provisionalVoters } };
	}
};

const getUser = async (access_token) => {
	const data = await axios.get('https://oauth.reddit.com/api/v1/me', {
		headers: {
			Authorization: `Bearer ${access_token}`,
			content_type: 'application/json',
		},
	});

	return data.data;
};

const getUserList = async (pollVoter) => {
	await connectMongo();

	const users = await User.find({ pollVoter: pollVoter });
	const userList = JSON.parse(JSON.stringify(users));
	let userArray = [];
	for (let i = 0; i < userList.length; i++) {
		userArray.push(userList[i].name);
	}
	return userArray;
};

const getUserInfo = async (username) => {
	await connectMongo();

	const user = await User.find({ name: username });
	return user;
};

const getBallots = async (pollVoter, week) => {
	let users = await getUserList(pollVoter);

	await connectMongo();

	let date = getSeasonCheckDate();
	const ballots = await UserBallot.find({ user: { $in: users }, week: week, date: { $gte: date } });

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

async function getTeam(id) {
	await connectMongo();

	const teamData = await TeamData.findOne({ _id: id });

	return teamData;
}

// const getPoll = async (week, season) => {
//   await connectMongo();
//   const poll = await Userpoll.findOne({week: week, season: season});
//   const userpoll = JSON.parse(JSON.stringify(poll));
//   console.log('userpoll:', userpoll);
//   return userpoll;
// }

const getUserpoll = async (week) => {
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

	let date = getSeasonCheckDate();
	const ballots = await UserBallot.find({ user: { $in: userArray }, week: week, date: { $gte: date } });
	const ballotList = JSON.parse(JSON.stringify(ballots));

	let numberOne = {};
	let pointTotals = {};
	for (let i = 0; i < ballotList.length; i++) {
		if (numberOne[ballotList[i][1].id] == null) {
			numberOne[ballotList[i][1].id] = 0;
		}
		numberOne[ballotList[i][1].id]++;

		pointTotals[ballotList[i][1].id] = getPoints(pointTotals, ballotList[i][1].id, ballotList[i][1].points);
		pointTotals[ballotList[i][2].id] = getPoints(pointTotals, ballotList[i][2].id, ballotList[i][2].points);
		pointTotals[ballotList[i][3].id] = getPoints(pointTotals, ballotList[i][3].id, ballotList[i][3].points);
		pointTotals[ballotList[i][4].id] = getPoints(pointTotals, ballotList[i][4].id, ballotList[i][4].points);
		pointTotals[ballotList[i][5].id] = getPoints(pointTotals, ballotList[i][5].id, ballotList[i][5].points);
		pointTotals[ballotList[i][6].id] = getPoints(pointTotals, ballotList[i][6].id, ballotList[i][6].points);
		pointTotals[ballotList[i][7].id] = getPoints(pointTotals, ballotList[i][7].id, ballotList[i][7].points);
		pointTotals[ballotList[i][8].id] = getPoints(pointTotals, ballotList[i][8].id, ballotList[i][8].points);
		pointTotals[ballotList[i][9].id] = getPoints(pointTotals, ballotList[i][9].id, ballotList[i][9].points);
		pointTotals[ballotList[i][10].id] = getPoints(pointTotals, ballotList[i][10].id, ballotList[i][10].points);
		pointTotals[ballotList[i][11].id] = getPoints(pointTotals, ballotList[i][11].id, ballotList[i][11].points);
		pointTotals[ballotList[i][12].id] = getPoints(pointTotals, ballotList[i][12].id, ballotList[i][12].points);
		pointTotals[ballotList[i][13].id] = getPoints(pointTotals, ballotList[i][13].id, ballotList[i][13].points);
		pointTotals[ballotList[i][14].id] = getPoints(pointTotals, ballotList[i][14].id, ballotList[i][14].points);
		pointTotals[ballotList[i][15].id] = getPoints(pointTotals, ballotList[i][15].id, ballotList[i][15].points);
		pointTotals[ballotList[i][16].id] = getPoints(pointTotals, ballotList[i][16].id, ballotList[i][16].points);
		pointTotals[ballotList[i][17].id] = getPoints(pointTotals, ballotList[i][17].id, ballotList[i][17].points);
		pointTotals[ballotList[i][18].id] = getPoints(pointTotals, ballotList[i][18].id, ballotList[i][18].points);
		pointTotals[ballotList[i][19].id] = getPoints(pointTotals, ballotList[i][19].id, ballotList[i][19].points);
		pointTotals[ballotList[i][20].id] = getPoints(pointTotals, ballotList[i][20].id, ballotList[i][20].points);
		pointTotals[ballotList[i][21].id] = getPoints(pointTotals, ballotList[i][21].id, ballotList[i][21].points);
		pointTotals[ballotList[i][22].id] = getPoints(pointTotals, ballotList[i][22].id, ballotList[i][22].points);
		pointTotals[ballotList[i][23].id] = getPoints(pointTotals, ballotList[i][23].id, ballotList[i][23].points);
		pointTotals[ballotList[i][24].id] = getPoints(pointTotals, ballotList[i][24].id, ballotList[i][24].points);
		pointTotals[ballotList[i][25].id] = getPoints(pointTotals, ballotList[i][25].id, ballotList[i][25].points);
	}

	function getPoints(obj, id, points) {
		if (obj[id] == null) {
			obj[id] = 0;
		}
		obj[id] += points;
		return obj[id];
	}

	let pointTotalSort = Object.entries(pointTotals).sort((a, b) => b[1] - a[1]);

	let rank;
	for (let i = 0; i < pointTotalSort.length; i++) {
		if (i === 0) {
			rank = 1;
			pointTotalSort[i].push(rank);
		} else {
			if (pointTotalSort[i][1] === pointTotalSort[i - 1][1]) {
				pointTotalSort[i].push(rank);
				rank++;
			} else {
				rank++;
				pointTotalSort[i].push(rank);
			}
		}
	}

	let userpoll = [];

	for (let i = 0; i < pointTotalSort.length; i++) {
		let team = await getTeam(pointTotalSort[i][0]);
		let fullName = concatName(team.shortName, team.nickname);

		userpoll.push({
			rank: pointTotalSort[i][2],
			teamId: pointTotalSort[i][0],
			teamName: fullName,
			shortName: team.shortName,
			points: pointTotalSort[i][1],
			firstPlaceVotes: getFirstPlaceVotes(pointTotalSort[i][0]),
			url: team.url,
		});
	}

	function concatName(shortName, nickname) {
		return shortName + ' ' + nickname;
	}

	function getFirstPlaceVotes(id) {
		if (numberOne[id] == null) {
			return 0;
		} else {
			return numberOne[id];
		}
	}

	let userpollData = {
		week: 'Pre-Season',
		season: '2023',
		poll: userpoll,
		new: true,
	};

	console.log('userpollData:', userpollData);

	return userpoll;
	//}
};
