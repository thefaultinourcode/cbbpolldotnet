import React, { useDebugValue, useState, useRef, setState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import querystring from 'querystring';
//import Link from "next/link";
import Navbar from '../components/navbar';

import { inDevEnvironment } from '../lib/isDevEnv';
// import { connectMongo } from "../utils/connect";
// import User from "../models/User";
import Link from 'next/link';
import TeamDropdown from '../components/teamdropdown';
import { getTeams, getUserInfo, getBallots } from '../utils/getData';

import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

//import mongoose from "mongoose";

export default function Profile({ user, teams, userprofile, userBallots }) {
	let modlist = ['broadwaystarVGC', 'SleveMcDichael4', 'DEP61'];

	console.log('userprofile:', userprofile);

	let favoriteTeam, favoriteTeam2, favoriteTeam3;
	if (userprofile) {
		favoriteTeam = parseInt(userprofile.primaryTeam);
		favoriteTeam2 = parseInt(userprofile.secondaryTeam);
		favoriteTeam3 = parseInt(userprofile.tertiaryTeam);
	} else {
		favoriteTeam = null;
		favoriteTeam2 = null;
		favoriteTeam3 = null;
	}
	const [primaryTeamValue, setPrimaryTeamValue] = useState(favoriteTeam);

	const [secondaryTeamValue, setSecondaryTeamValue] = useState(favoriteTeam2);

	const [tertiaryTeamValue, setTertiaryTeamValue] = useState(favoriteTeam3);

	const handleChange = (e) => {
		setPrimaryTeamValue(e.value);
	};

	const handleChange2 = (e) => {
		setSecondaryTeamValue(e.value);
	};

	const handleChange3 = (e) => {
		setTertiaryTeamValue(e.value);
	};

	let teamdropdowns;
	if (userprofile == null) {
		teamdropdowns = (
			<div>
				<TeamDropdown teams={teams} id="favoriteTeam" change={handleChange}></TeamDropdown>
				<h2>Secondary Team</h2>
				<TeamDropdown teams={teams} id="favoriteTeam2" change={handleChange2}></TeamDropdown>
				<h2>Tertiary Team</h2>
				<TeamDropdown teams={teams} id="favoriteTeam3" change={handleChange3}></TeamDropdown>
			</div>
		);
	} else {
		teamdropdowns = (
			<div>
				<TeamDropdown teams={teams} id="favoriteTeam" change={handleChange} presetTeam={favoriteTeam}></TeamDropdown>
				<h2>Secondary Team</h2>
				<TeamDropdown teams={teams} id="favoriteTeam2" change={handleChange2} presetTeam={favoriteTeam2}></TeamDropdown>
				<h2>Tertiary Team</h2>
				<TeamDropdown teams={teams} id="favoriteTeam3" change={handleChange3} presetTeam={favoriteTeam3}></TeamDropdown>
			</div>
		);
	}
	let notVoterMessage;
	if (user) {
		if (!user.pollVoter) {
			notVoterMessage = <div>You are not yet a voter, please submit a ballot to be considered provisional</div>;
		} else {
			notVoterMessage = <div> </div>;
		}
	} else {
		notVoterMessage = <div>You are not an official cbbpoll user yet, please select your favorite teams</div>;
	}
	let ballotsForUser = [];
	if (userBallots) {
		for (let i = 0; i < userBallots.length; i++) {
			ballotsForUser.push(
				<div>
					<Link href={`/ballots/${userBallots[i].week}/${userBallots[i]._id.toString()}`}>
						<span>
							<a> Ballot for week {userBallots[i].week}</a>
						</span>
					</Link>
				</div>,
			);
		}
	}

	const validTeams = (primaryTeam, secondaryTeam, tertiaryTeam) => {
		let valid = true;
		if (primaryTeam == null) {
			valid = false;
			alert('Please enter a primary team affiliation.');
		} else if (primaryTeam == secondaryTeam || primaryTeam == tertiaryTeam || (!(secondaryTeam == null) && secondaryTeam == tertiaryTeam)) {
			valid = false;
			console.log('secondaryTeam:', secondaryTeam);
			alert('Please only select a team once.');
		} else if (secondaryTeam == null && !(tertiaryTeam == null)) {
			valid = false;
			alert('Please enter a secondary team before a tertiary team');
		}
		return valid;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		let valid = validTeams(primaryTeamValue, secondaryTeamValue, tertiaryTeamValue);

		if (!valid) {
			return;
		}

		let user = {
			name: event.target.user.value,
			primaryTeam: primaryTeamValue,
			secondaryTeam: secondaryTeamValue,
			tertiaryTeam: tertiaryTeamValue,
		};

		if (!userprofile) {
			user.pollVoter = false;
		}
		console.log(event.target.user.value);
		console.log('user data:', user);

		const res = await fetch('/api/addUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		const data = await res.json();
	};

	// let favoriteTeam = 1;
	// let favoriteTeam2 = 2;
	// let favoriteTeam3 = 3;

	return user != null ? (
		<>
			<Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={user.name}></Navbar>
			<div className="profile">
				<h1>
					{/* <img src={user.snoovatar_img} width="50" height="64"/>  */}
					Welcome {user.name}
				</h1>
				<form onSubmit={handleSubmit}>
					<h2>Set Team Affiliations</h2>
					<input type="textbox" id="user" value={user.name} hidden readOnly></input>
					<h2>Primary Team</h2>
					{teamdropdowns}
					<button type="submit">Submit</button>
				</form>
				<div>
					<h2>Official voter profiles coming soon!</h2>
					{/* <h2>Official voter profiles coming soon! Apply <a href='./application'>here</a> to be an official voter.</h2> */}
				</div>
				{notVoterMessage}

				<div>
					{(() => {
						if (modlist.includes(user.name))
							return (
								<div>
									<Link href="/admin">Go to Admin View</Link>
								</div>
							);
					})()}
				</div>
				<div>{ballotsForUser.map((ballot) => ballot)}</div>
				{/* <a href='./voterForm'>Poll</a>
        <a href='./application'>Poll Vote Application</a>
        <Link href={{
          pathname: "voterForm",
          query: {user: user.name}
        }}>
          Test
        </Link> */}
			</div>
		</>
	) : (
		<div>
			<Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png"></Navbar>
			<p>Please login</p>
		</div>
	);
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
	let teams = await getTeams();
	teams = JSON.stringify(teams);

	const refresh_token = getCookie('refresh_token', { req, res });
	const access_token = getCookie('access_token', { req, res });

	if (query.state === RANDOM_STRING) {
		console.log('test');
	}

	if (refresh_token) {
		if (access_token) {
			const user = await getUser(access_token);
			let userprofile = await getUserInfo(user.name);
			let userBallots = await getBallots(user);
			userprofile = JSON.parse(JSON.stringify(userprofile));
			return { props: { user, teams, userprofile, userBallots } };
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
			let userprofile = await getUserInfo(user.name);
			userprofile = JSON.parse(JSON.stringify(userprofile));
			let userBallots = await getBallots(user);
			return { props: { user, teams, userprofile, userBallots } };
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
			let userprofile = await getUserInfo(user.name);
			userprofile = JSON.parse(JSON.stringify(userprofile));
			let userBallots = await getBallots(user);
			return { props: { user, teams, userprofile, userBallots } };
		} catch (e) {
			console.log(e);
			return { props: { user: null } };
		}
	} else {
		console.log('else');
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

// const insertUser = async (user) => {
//   console.log('CONNECTING TO MONGO')
//   await connectMongo();
//   console.log('CONNECTED TO MONGO')

//   let userRecord = await User.findOne({'user': user.name});

//   if(userRecord === null){
//     console.log('user is empty');
//     console.log('CREATING DOCUMENT');
//     console.log(userRecord)
//     const document = await User.create({'name': user.name, 'pollVoter': false});
//     console.log('CREATED DOCUMENT');
//   }
// }
