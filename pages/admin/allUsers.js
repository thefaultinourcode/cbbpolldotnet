import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import React from 'react';
import axios, { Axios } from 'axios';
import querystring from 'querystring';
import { connectMongo } from '../../utils/connect';
import { inDevEnvironment } from '../../lib/isDevEnv';
import Application from '../../models/ApplicationData';
import User from '../../models/User';
import UserBallot from '../../models/UserBallot';
import Link from 'next/link';
import { getSeasonCheckDate } from '../../utils/getDates';

export default function Admin(props) {
	let modlist = ['broadwaystarVGC', 'SleveMcDichael4', 'DEP61'];

	let apps = props.apps;
	let users = props.users;
	let ballotObj = props.ballotObj;
	console.log('ballotObj:', ballotObj);

	let usersApplied = [];
	apps.map((element) => usersApplied.push(element.user));

	let usersInDB = [];
	users.map((element) => usersInDB.push(element.name));

	async function handleClick(e) {
		let date = '2023-10-01';
		console.log(e.target.getAttribute('data-username'));
		let username = e.target.getAttribute('data-username');

		let approved, official;
		if (e.target.id === 'approve') {
			approved = true;
			official = true;
		} else if (e.target.id === 'deny') {
			approved = false;
			official = false;
		}

		let foundUser = users.find((element) => element.name === username);

		let user = {
			name: username,
			primaryTeam: foundUser.primaryTeam,
			secondaryTeam: foundUser.secondaryTeam,
			tertiaryTeam: foundUser.tertiaryTeam,
			pollVoter: approved,
		};

		let ballotUpdate = {
			user: username,
			date: date,
			official: official,
		};

		const res = await fetch('/api/addUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		const data = await res.json();

		//implement a better solution later
		window.location.reload(false);
	}

	async function handleReset(e) {
		if (confirm("Selecting this button will reset every user's poll voter status. THIS CANNOT BE UNDONE. Do you want to proceed?")) {
			console.log('users will be reset');
			const res = await fetch('/api/changeUserStatus', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			let date = '2023-10-1';
			let obj = { date: date };

			const res2 = await fetch('/api/changeBallotStatus', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(obj),
			});

			//implement a better solution later
			window.location.reload(false);
		} else {
			console.log('users will not be reset');
			return;
		}
	}

	if (modlist.includes(props.user.name)) {
		let provisionalUsers = [];

		for (const user of users) {
			//if(!user.pollVoter){
			if (user.pollVoter) {
				user.pollVoterValue = 'yes';
			} else {
				user.pollVoterValue = 'no';
			}
			console.log('name:', user.name);
			console.log('obj:', ballotObj[user.name]);
			if (ballotObj[user.name] == undefined) {
				ballotObj[user.name] = {
					provisionalBallots2024: 0,
					provisionalBallotsAllTime: 0,
					officialBallots2024: 0,
					officialBallotsAllTime: 0,
				};
			}
			user.provCount = ballotObj[user.name]['provisionalBallots2024'];
			user.provCountAllTime = ballotObj[user.name]['provisionalBallotsAllTime'];
			user.offCount = ballotObj[user.name]['officialBallots2024'];
			user.offCountAllTime = ballotObj[user.name]['officialBallotsAllTime'];
			//}
		}

		users.sort((c1, c2) => {
			return c2.provCount - c1.provCount;
		});

		console.log(props.ballotObj);
		console.log('McDichael:', props.ballotObj['SleveMcDichael4']);
		console.log('go_uw:', props.ballotObj['go_uw']);
		console.log('Ac:', props.ballotObj['Ac91722']);

		return (
			<div>
				<h2>Approve Voters</h2>
				<table>
					<tbody>
						<tr>
							<th>Username</th>
							<th>Approved?</th>
							<th>Provisional Ballots 2024</th>
							<th>Provisional Ballots All Time</th>
							<th>Official Ballots 2024</th>
							<th>Official Ballots All Time</th>
							<th>Approve/Deny</th>
						</tr>
						{users.map((object) => (
							<tr key={object.name}>
								<td>
									<Link href={`/users/${object.name}`}>{object.name}</Link>
								</td>
								<td>{object.pollVoterValue}</td>
								<td>{object.provCount}</td>
								<td>{object.provCountAllTime}</td>
								<td>{object.offCount}</td>
								<td>{object.offCountAllTime}</td>
								<td>
									<button onClick={handleClick} id="approve" data-username={object.name}>
										Approve
									</button>
									<button onClick={handleClick} id="deny" data-username={object.name}>
										Deny
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<button onClick={handleReset}>Reset Voter Status</button>
			</div>
		);
	} else {
		return (
			<div>
				<h1>{props.user.name} is not an admin</h1>
			</div>
		);
	}
}

const REDIRECT_URI = inDevEnvironment ? 'http://localhost:3000/profile' : 'http://cbbpoll.net/profile';
const RANDOM_STRING = 'randomstringhere';
const CLIENT_ID = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

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
	const refresh_token = getCookie('refresh_token', { req, res });
	const access_token = getCookie('access_token', { req, res });

	if (query.state === RANDOM_STRING) {
		console.log('test');
	}

	const ballots = await getBallots();
	const ballotObj = countBallots(ballots);
	if (refresh_token) {
		if (access_token) {
			const user = await getUser(access_token);
			let apps = await getApps();
			let users = await getUsers();
			return { props: { user, apps, users, ballotObj } };
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
			let apps = await getApps();
			let users = await getUsers();
			return { props: { user, apps, users, ballotObj } };
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
			let apps = await getApps();
			let users = await getUsers();
			return { props: { user, apps, users, ballotObj } };
		} catch (e) {
			console.log(e);
			return { props: { user: null, apps: null, users: null, ballotObj: null } };
		}
	} else {
		return { props: { user: null, apps: null, users: null, ballotObj: null } };
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

const getApps = async () => {
	console.log('CONNECTING TO MONGO');
	await connectMongo();
	console.log('CONNECTED TO MONGO');

	console.log('FETCHING APP');
	const app = await Application.find({ season: 2024 });
	const userApp = JSON.parse(JSON.stringify(app));
	console.log('FETCHED APP');
	return userApp;
};

const getUsers = async () => {
	console.log('CONNECTING TO MONGO');
	await connectMongo();
	console.log('CONNECTED TO MONGO');

	console.log('FETCHING APP');
	const users = await User.find({});
	const userList = JSON.parse(JSON.stringify(users));
	console.log('FETCHED APP');
	return userList;
};

const getBallots = async () => {
	const ballots = await UserBallot.find();

	console.log('ballots.length:', ballots.length);

	return ballots;
};

const countBallots = (ballots) => {
	let ballotObject = {};
	for (let i = 0; i < ballots.length; i++) {
		if (!ballotObject.hasOwnProperty(ballots[i].user)) {
			ballotObject[ballots[i].user] = {
				provisionalBallots2024: 0,
				provisionalBallotsAllTime: 0,
				officialBallots2024: 0,
				officialBallotsAllTime: 0,
			};
		}

		let date = getSeasonCheckDate();
		if (ballots[i]['official'] === false) {
			if (ballots[i].date > date) {
				ballotObject[ballots[i].user]['provisionalBallots2024']++;
			}
			ballotObject[ballots[i].user]['provisionalBallotsAllTime']++;
		} else if (ballots[i]['official'] === true) {
			if (ballots[i].date > date) {
				ballotObject[ballots[i].user]['officialBallots2024']++;
			}
			ballotObject[ballots[i].user]['officialBallotsAllTime']++;
		}
	}

	return ballotObject;
};
