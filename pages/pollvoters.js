import { getPollVoters, getTeam } from '../utils/getData';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import axios, { Axios } from 'axios';
import querystring from 'querystring';
import Navbar from '../components/navbar';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default function PollVoters(props) {
	console.log(props.pollData);
	let pollData = props.pollData;

	let navbar;
	if (props.user) {
		navbar = <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={props.user.name}></Navbar>;
	} else {
		navbar = <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png"></Navbar>;
	}

	pollData.sort((a, b) => (a.conference > b.conference ? 1 : -1));
	console.log('pollData:', pollData);

	let data = [];

	for (let i = 0; i < pollData.length; i++) {
		console.log('user:', pollData[i].name + ' conference:', pollData[i].conference);
		data.push();
	}

	return (
		<div>
			{navbar}
			<h1>Official Poll Voters</h1>
		</div>
	);
}

export const getServerSideProps = async ({ query, req, res }) => {
	const refresh_token = getCookie('refresh_token', { req, res });
	const access_token = getCookie('access_token', { req, res });

	if (refresh_token) {
		if (access_token) {
			// const user = await getUser(access_token);
			// let profile = await getUserInfo(query.userprofile);
			// profile = JSON.parse(JSON.stringify(profile));
			// let primaryTeam = await getTeam(profile.primaryTeam);
			// primaryTeam = JSON.parse(JSON.stringify(primaryTeam));
			// console.log('profile:', profile);
			let propData = await getPropData(access_token, query.userprofile);
			return { props: propData };
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
			// let profile = await getUserInfo(query.userprofile);
			// profile = JSON.parse(JSON.stringify(profile));
			// let primaryTeam = await getTeam(profile.primaryTeam);
			// primaryTeam = JSON.parse(JSON.stringify(primaryTeam));
			let propData = await getPropData(access_token, query.userprofile);
			return { props: propData };
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
			// const user = await getUser(token.access_token);
			// let profile = await getUserInfo(query.userprofile);
			// profile = JSON.parse(JSON.stringify(profile));
			// let primaryTeam = await getTeam(profile.primaryTeam);
			// primaryTeam = JSON.parse(JSON.stringify(primaryTeam));

			let propData = await getPropData(access_token, query.userprofile);
			return { props: propData };
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

const getPropData = async (access_token) => {
	const user = await getUser(access_token);
	const pollVoters = await getPollVoters();

	let pollData = [];

	for (let i = 0; i < pollVoters.length; i++) {
		let team = await getTeam(pollVoters[i].primaryTeam);
		pollData.push({ name: pollVoters[i].name, url: team.url, conference: team.conference });
	}

	return { user, pollData };
};
