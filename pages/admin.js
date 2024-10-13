import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import React from 'react';
import axios, { Axios } from 'axios';
import querystring from 'querystring';
import { connectMongo } from '../utils/connect';
import Application from '../models/ApplicationData';
import User from '../models/User';
import Link from 'next/link';

export default function Admin(props) {
	let modlist = ['broadwaystarVGC', 'SleveMcDichael4', 'DEP61'];

	let apps = props.apps;
	let users = props.users;

	let usersApplied = [];
	apps.map((element) => usersApplied.push(element.user));

	let usersInDB = [];
	users.map((element) => usersInDB.push(element.name));

	async function handleSubmit(e) {
		e.preventDefault();
		console.log('e:', e);
		let seasonDates = {
			season: e.target.season.value,
			preseasonDates: {
				open: e.target.preseasonOpen.value,
				close: e.target.preseasonClose.value,
			},
			seasonDates: {
				open: e.target.seasonOpen.value,
				close: e.target.seasonClose.value,
			},
			postseasonDates: {
				open: e.target.postseasonOpen.value,
				close: e.target.postseasonClose.value,
			},
		};

		console.log('seasonDates:', seasonDates);

		const res = await fetch('/api/addSeasonDates', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(seasonDates),
		});

		const data = await res.json();
	}

	async function handleClick(e) {
		let date = '2023-10-01';
		console.log(e.target.getAttribute('data-username'));
		let username = e.target.getAttribute('data-username');

		let approved, official;
		if (e.target.id === 'approve') {
			console.log('approved');
			approved = true;
			official = true;
		} else if (e.target.id === 'deny') {
			console.log('deny');
			approved = false;
			official = false;
		}

		let foundApp = apps.find((element) => element.user === username);
		console.log(foundApp);

		let user = {
			name: username,
			primaryTeam: foundApp.favoriteTeam,
			secondaryTeam: foundApp.favoriteTeam2,
			tertiaryTeam: foundApp.favoriteTeam3,
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

        let preSeasonDeadline =  new Date('25 October 2024 14:00 UTC');
        let today = new Date();

		if (preSeasonDeadline > today) {
			const res2 = await fetch('/api/changeBallotOfficial', {
				method: 'Post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(ballotUpdate),
			});
			const data2 = await res2.json();
		}

		//implement a better solution later
		window.location.reload(false);
	}

    //
    async function handleReset(e){
      if(confirm("Selecting this button will reset every user's poll voter status. THIS CANNOT BE UNDONE. Do you want to proceed?")){
        console.log('users will be reset');
        const res = await fetch('/api/changeUserStatus',{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
        });

        let date = '2024-10-1';
        let obj = {date: date}
        
       
        const res2 = await fetch('/api/changeBallotStatus',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj)
        });
        

			//implement a better solution later
			window.location.reload(false);
		} else {
			console.log('users will not be reset');
			return;
		}
	}

	if (modlist.includes(props.user.name)) {
		for (const app of apps) {
			let foundUser = users.find((element) => element.name === app.user);
			if (foundUser != null) {
				if (foundUser.pollVoter) {
					app.pollVoter = 'yes';
				} else {
					app.pollVoter = 'no';
				}
			} else {
				app.pollVoter = 'Not in DB';
			}
		}

		return (
			<div>
				<h1>{props.user.name} is an admin</h1>
				<h2>
					<Link href="/admin/preview">Preview</Link>
				</h2>
				<br />
				<h2>Set Season Dates</h2>
				<form id="seasonDates" onSubmit={handleSubmit}>
					<label>
						Season: <input id="season" type="text"></input>
					</label>
					<br />
					<br />
					<label>
						Pre-Season Poll Opening: <input id="preseasonOpen" type="date"></input>
					</label>
					<label>
						Pre-Season Poll Closing: <input id="preseasonClose" type="date"></input>
					</label>
					<br />
					<br />
					<label>
						Season Poll Opening: <input id="seasonOpen" type="date"></input>
					</label>
					<label>
						Season Poll Closing: <input id="seasonClose" type="date"></input>
					</label>
					<br />
					<br />
					<label>
						Post-Season Poll Opening: <input id="postseasonOpen" type="date"></input>
					</label>
					<label>
						Post-Season Poll Closing: <input id="postseasonClose" type="date"></input>
					</label>
					<br />
					<button type="submit">Submit</button>
				</form>

				<h2>Approve Voters</h2>
				<table>
					<tbody>
						<tr>
							<th>Username</th>
							<th>Link</th>
							<th>Approved?</th>
							<th>Approve/Deny</th>
						</tr>
						{apps.map((object) => (
							<tr key={object.user}>
								<td>{object.user}</td>
								<td>
									<Link href={`/apps/${object.user}`}>
										<a>{object.user}</a>
									</Link>
								</td>
								<td>{object.pollVoter}</td>
								<td>
									<button onClick={handleClick} id="approve" data-username={object.user}>
										Approve
									</button>
									<button onClick={handleClick} id="deny" data-username={object.user}>
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

//const REDIRECT_URI = "http://localhost:3000/profile";
const REDIRECT_URI = 'http://cbbpoll.net/profile';

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

	if (refresh_token) {
		if (access_token) {
			const user = await getUser(access_token);
			let apps = await getApps();
			let users = await getUsers();
			return { props: { user, apps, users } };
		} else {
			const token = await getToken({
				refresh_token: refresh_token,
				grant_type: 'refresh_token',
			});
			console.log('token:', token);
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
			return { props: { user, apps, users } };
		}
	} else if (query.code && query.state === RANDOM_STRING) {
		try {
			console.log('else if');
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
			return { props: { user, apps, users } };
		} catch (e) {
			console.log(e);
			return { props: { user: null, apps: null, users: null } };
		}
	} else {
		console.log('else');
		return { props: { user: null, apps: null, users: null } };
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
    const app = await Application.find({season:2025});
    const userApp = JSON.parse(JSON.stringify(app));
    console.log('userApp:', userApp);
    console.log('FETCHED APP');
    return userApp;
  }

const getUsers = async () => {
	console.log('CONNECTING TO MONGO');
	await connectMongo();
	console.log('CONNECTED TO MONGO');

	console.log('FETCHING APP');
	const users = await User.find({});
	const userList = JSON.parse(JSON.stringify(users));
	console.log('userList:', userList);
	console.log('FETCHED APP');
	return userList;
};
