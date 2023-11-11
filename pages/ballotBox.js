import { connectMongo } from '../utils/connect';
import Ballot from '../components/ballot';
import TeamData from '../models/TeamData';
import UserBallot from '../models/UserBallot';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import axios, { Axios } from 'axios';
import Navbar from '../components/navbar';
import React, { useDebugValue, useState, useRef, setState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserInfo } from '../utils/getData';
// import { getSeason } from '../utils/getDates';
import Link from 'next/link';
import { getOpenDate, getCloseDate, getWeek, getSeasonCheckDate } from '../utils/getDates';

export default function BallotBox(props) {
	const router = useRouter();
	let today = new Date();
	//let today = new Date(2022, 10, 13, 10, 59);
	//let openDate = new Date(Date.UTC(2023, 3, 4, 17));
	//let closeDate = new Date(Date.UTC(2023, 3, 6, 20, 59));
	let openDate = getOpenDate();
	let closeDate = getCloseDate();

	console.log(props.userprofile);
	const [ballot, setBallot] = useState({
		date: today,
		week: getWeek(),
		user: props.user.name,
	});

	const [errorBallot, setErrorBallot] = useState();

	let validatedUser;
	if (props.userprofile) {
		validatedUser = true;
	} else {
		validatedUser = false;
	}

	if (!props.user) {
		return (
			<div>
				<h1>Please login to vote.</h1>
			</div>
		);
	}

	if (!validatedUser) {
		return (
			<div>
				<Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={props.user.name}></Navbar>
				<h1>Please set your team affiliation.</h1>
				Set your team affiliation on your{' '}
				<Link href="/profile">
					<a>profile</a>
				</Link>
				.
			</div>
		);
	}
	console.log('validatedUser:', validatedUser);

	if (props.user == null) {
		return <h1>Please login</h1>;
	}

	let prevBallot = props.ballot;
	if (prevBallot) {
		console.log('hereistest');
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		//setBallot(function update(){});

		let ballotObj = {};
		if (props.ballot) {
			for (let i = 1; i <= 25; i++) {
				let reasoning = 'reasoning' + i;
				props.ballot[i].reasoning = event.target[reasoning].value;
			}

			props.ballot.overallReasoning = event.target.overallReasoning.value;
		} else {
			ballotObj.user = ballot.user;
			ballotObj.week = ballot.week;
			ballotObj.date = ballot.date;
			ballotObj.official = props.userprofile.pollVoter;
			for (let i = 1; i <= 25; i++) {
				let reasoning = 'reasoning' + i;
				console.log('ballot[i]:', ballot[i]);
				ballotObj[i] = ballot[i];
				ballotObj[i].reasoning = event.target[reasoning].value;
			}

			ballotObj.overallReasoning = event.target.overallReasoning.value;
		}

		test(event);

		if (props.ballot) {
			ballotObj = props.ballot;
		}

		let validBallot = validateBallot(ballotObj);

		if (!validBallot) {
			return;
		}

		const res = await fetch('/api/addBallot', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(ballotObj),
		});

		console.log('res:', res);

		const data = await res.json();

		router.push({ pathname: '/ballotview' });
	};

	const validateBallot = (ballot) => {
		let errorMsg = '';
		let teams = [];
		let validBallot = true;

		for (let i = 1; i <= 25; i++) {
			if (ballot[i] == undefined) {
				errorMsg = 'No ranking can be left blank. Please select a team for each rank, 1-25.';
				setErrorBallot(errorMsg);
				validBallot = false;
				return validBallot;
			}
			teams.push(ballot[i].id);
		}
		console.log(teams);

		const ballotSet = new Set();
		teams.forEach((item) => ballotSet.add(item));
		console.log('length:', ballotSet.size);
		if (ballotSet.size !== 25) {
			console.log('repeats');
			errorMsg = 'No team can be selected twice on the ballot. Please select 25 unique teams.';
			validBallot = false;
			setErrorBallot(errorMsg);
			return validBallot;
		}

		return validBallot;
	};

	const test = (event) => {
		setBallot({
			...ballot,
			1: { ...ballot[1], reasoning: event.target.reasoning1.value },
			2: { ...ballot[2], reasoning: event.target.reasoning2.value },
			3: { ...ballot[3], reasoning: event.target.reasoning3.value },
			4: { ...ballot[4], reasoning: event.target.reasoning4.value },
			5: { ...ballot[5], reasoning: event.target.reasoning5.value },
			6: { ...ballot[6], reasoning: event.target.reasoning6.value },
			7: { ...ballot[7], reasoning: event.target.reasoning7.value },
			8: { ...ballot[8], reasoning: event.target.reasoning8.value },
			9: { ...ballot[9], reasoning: event.target.reasoning9.value },
			10: { ...ballot[10], reasoning: event.target.reasoning10.value },
			11: { ...ballot[11], reasoning: event.target.reasoning11.value },
			12: { ...ballot[12], reasoning: event.target.reasoning12.value },
			13: { ...ballot[13], reasoning: event.target.reasoning13.value },
			14: { ...ballot[14], reasoning: event.target.reasoning14.value },
			15: { ...ballot[15], reasoning: event.target.reasoning15.value },
			16: { ...ballot[16], reasoning: event.target.reasoning16.value },
			17: { ...ballot[17], reasoning: event.target.reasoning17.value },
			18: { ...ballot[18], reasoning: event.target.reasoning18.value },
			19: { ...ballot[19], reasoning: event.target.reasoning19.value },
			20: { ...ballot[20], reasoning: event.target.reasoning20.value },
			21: { ...ballot[21], reasoning: event.target.reasoning21.value },
			22: { ...ballot[22], reasoning: event.target.reasoning22.value },
			23: { ...ballot[23], reasoning: event.target.reasoning23.value },
			24: { ...ballot[24], reasoning: event.target.reasoning24.value },
			25: { ...ballot[25], reasoning: event.target.reasoning25.value },
			overallReasoning: event.target.overallReasoning.value,
		});
	};

	const updateBallot = (e) => {
		//     setBallot({...ballot,
		//         1: {id: prevBallot[1].id,
		//             name: prevBallot[1].name,
		//             reasoning: prevBallot[1].reasoning,
		//             points: prevBallot[1].points
		//         },
		//         2: {id: prevBallot[2].id,
		//             name: prevBallot[2].name,
		//             reasoning: prevBallot[2].reasoning,
		//             points: prevBallot[2].points
		//         },
		//         3: {id: prevBallot[3].id,
		//             name: prevBallot[3].name,
		//             reasoning: prevBallot[3].reasoning,
		//             points: prevBallot[3].points
		//         },
		//         4: {id: prevBallot[4].id,
		//             name: prevBallot[4].name,
		//             reasoning: prevBallot[4].reasoning,
		//             points: prevBallot[4].points
		//         },
		//         5: {id: prevBallot[5].id,
		//             name: prevBallot[5].name,
		//             reasoning: prevBallot[5].reasoning,
		//             points: prevBallot[5].points
		//         },
		//         6: {id: prevBallot[6].id,
		//             name: prevBallot[6].name,
		//             reasoning: prevBallot[6].reasoning,
		//             points: prevBallot[6].points
		//         },
		//         7: {id: prevBallot[7].id,
		//             name: prevBallot[7].name,
		//             reasoning: prevBallot[7].reasoning,
		//             points: prevBallot[7].points
		//         },
		//         8: {id: prevBallot[8].id,
		//             name: prevBallot[8].name,
		//             reasoning: prevBallot[8].reasoning,
		//             points: prevBallot[8].points
		//         },
		//         9: {id: prevBallot[9].id,
		//             name: prevBallot[9].name,
		//             reasoning: prevBallot[9].reasoning,
		//             points: prevBallot[9].points
		//         },
		//         10: {id: prevBallot[10].id,
		//             name: prevBallot[10].name,
		//             reasoning: prevBallot[10].reasoning,
		//             points: prevBallot[10].points
		//         },
		//         11: {id: prevBallot[11].id,
		//             name: prevBallot[11].name,
		//             reasoning: prevBallot[11].reasoning,
		//             points: prevBallot[11].points
		//         },
		//         12: {id: prevBallot[12].id,
		//             name: prevBallot[12].name,
		//             reasoning: prevBallot[12].reasoning,
		//             points: prevBallot[12].points
		//         },
		//         13: {id: prevBallot[13].id,
		//             name: prevBallot[13].name,
		//             reasoning: prevBallot[13].reasoning,
		//             points: prevBallot[13].points
		//         },
		//         14: {id: prevBallot[14].id,
		//             name: prevBallot[14].name,
		//             reasoning: prevBallot[14].reasoning,
		//             points: prevBallot[14].points
		//         },
		//         15: {id: prevBallot[15].id,
		//             name: prevBallot[15].name,
		//             reasoning: prevBallot[15].reasoning,
		//             points: prevBallot[15].points
		//         },
		//         16: {id: prevBallot[16].id,
		//             name: prevBallot[16].name,
		//             reasoning: prevBallot[16].reasoning,
		//             points: prevBallot[16].points
		//         },
		//         17: {id: prevBallot[17].id,
		//             name: prevBallot[17].name,
		//             reasoning: prevBallot[17].reasoning,
		//             points: prevBallot[17].points
		//         },
		//         18: {id: prevBallot[18].id,
		//             name: prevBallot[18].name,
		//             reasoning: prevBallot[18].reasoning,
		//             points: prevBallot[18].points
		//         },
		//         19: {id: prevBallot[19].id,
		//             name: prevBallot[19].name,
		//             reasoning: prevBallot[19].reasoning,
		//             points: prevBallot[19].points
		//         },
		//         20: {id: prevBallot[20].id,
		//             name: prevBallot[20].name,
		//             reasoning: prevBallot[20].reasoning,
		//             points: prevBallot[20].points
		//         },
		//         21: {id: prevBallot[21].id,
		//             name: prevBallot[21].name,
		//             reasoning: prevBallot[21].reasoning,
		//             points: prevBallot[21].points
		//         },
		//         22: {id: prevBallot[22].id,
		//             name: prevBallot[22].name,
		//             reasoning: prevBallot[22].reasoning,
		//             points: prevBallot[22].points
		//         },
		//         23: {id: prevBallot[23].id,
		//             name: prevBallot[23].name,
		//             reasoning: prevBallot[23].reasoning,
		//             points: prevBallot[23].points
		//         },
		//         24: {id: prevBallot[24].id,
		//             name: prevBallot[24].name,
		//             reasoning: prevBallot[24].reasoning,
		//             points: prevBallot[24].points
		//         },
		//         25: {id: prevBallot[25].id,
		//             name: prevBallot[25].name,
		//             reasoning: prevBallot[25].reasoning,
		//             points: prevBallot[25].points
		//         },
		//         overallReasoning: prevBallot.overallReasoning
		// });

		if (props.ballot) {
			props.ballot[e.rank].id = e.value;
			props.ballot[e.rank].name = e.shortName;
			props.ballot[e.rank].points = 26 - e.rank;
		}

		setBallot({
			...ballot,
			[e.rank]: {
				id: e.value,
				name: e.shortName,
				points: 26 - e.rank,
			},
		});
	};

	const updateReasoning = (e) => {
		console.log('update reasoning e:', e);
		setBallot({ ...ballot });
	};

	let ballotComp, textarea;
	if (props.ballot) {
		//setBallot(props.ballot);
		console.log('true');
		ballotComp = <Ballot teams={props.teams} update={updateBallot} reasoning={updateReasoning} ballot={props.ballot}></Ballot>;
		textarea = <textarea rows="5" cols="150" id="overallReasoning" className="overallRationale" maxLength={2000} defaultValue={props.ballot.overallReasoning}></textarea>;
	} else {
		console.log('false');
		ballotComp = <Ballot teams={props.teams} update={updateBallot} reasoning={updateReasoning}></Ballot>;
		textarea = <textarea rows="5" cols="150" id="overallReasoning" className="overallRationale" maxLength={2000}></textarea>;
	}

	if (today > openDate && today < closeDate) {
		return (
			<div>
				<Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={props.user.name}></Navbar>
				<br></br>
				<form onSubmit={handleSubmit}>
					{ballotComp}
					<div className="errorMsg">{errorBallot}</div>
					{textarea}
					<div className="submitBallot">
						<button type="submit">Submit</button>
					</div>
				</form>
			</div>
		);
	} else {
		return (
			<div>
				<Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={props.user.name}></Navbar>
				<h1>Poll has closed</h1>
			</div>
		);
	}
}

export const getServerSideProps = async ({ query, req, res }) => {
	let teams = await getTeams();
	teams = JSON.stringify(teams);

	const refresh_token = getCookie('refresh_token', { req, res });
	const access_token = getCookie('access_token', { req, res });

	if (refresh_token) {
		if (access_token) {
			const user = await getUser(access_token);
			let ballot = await getBallot(user);
			let userprofile = await getUserInfo(user.name);
			userprofile = JSON.parse(JSON.stringify(userprofile));
			return { props: { user, teams, ballot, userprofile } };
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
			let ballot = await getBallot(user);
			let userprofile = await getUserInfo(user.name);
			userprofile = JSON.parse(JSON.stringify(userprofile));
			return { props: { user, teams, ballot, userprofile } };
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
			let ballot = await getBallot(user);
			let userprofile = await getUserInfo(user.name);
			userprofile = JSON.parse(JSON.stringify(userprofile));
			return { props: { user, teams, ballot, userprofile } };
		} catch (e) {
			console.log(e);
			return { props: { user: null } };
		}
	} else {
		return { props: { user: null } };
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

const getTeams = async () => {
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

const getBallot = async (user) => {
	await connectMongo();

	let seasonDate = getSeasonCheckDate();
	console.log('seasonDate:', seasonDate);

	let week = getWeek();

	const ballot = await UserBallot.findOne({ user: user.name, week: week, date: { $gte: seasonDate } });
	const userBallot = JSON.parse(JSON.stringify(ballot));
	console.log('userBallot:', userBallot);

	return userBallot;
};
