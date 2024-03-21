import Navbar from '../components/navbar';
import React from 'react';
import axios, { Axios } from 'axios';
import querystring from 'querystring';
import {inDevEnvironment} from '../lib/isDevEnv'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

export default function About(props) {
	return props.user ? (
		<div>
			<Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={props.user.name}></Navbar>
			<h1>About the r/CollegeBasketball Userpoll</h1>
			<p>
				Welcome to the new and improved r/CollegeBasketball User Poll! This poll indicates the relative rankings of the top 25 NCAA Division I men&apos;s basketball teams as viewed by a representative sample of the r/CollegeBasketball community.
				The moderators of this subreddit have run this poll on a weekly basis since 2012-13.
			</p>
			<h2> How does it work? </h2>
			<p>
				Each weekend during the regular season, as well as once during the preseason and once following the conclusion of the NCAA Tournament, everyone on a panel of about 100-120 official voters submits their own individual ballots, ranking who
				they believe to be the best teams in NCAA Division I men&apos;s basketball from 1 to 25. On each individual ballot, the #1 team gets 25 points, the #2 team gets 24 points, and so on and so forth, down to 1 point for the #25 team. The scores
				for each team from every ballot are totaled up to form the consensus r/CollegeBasketball Top 25. This scoring is identical to other polls of this variety, namely the Associated Press Top 25 and the USA TODAY Sports Coaches Poll.
			</p>
			<h2> Voting guidelines</h2>
			The following are the voting and ethics guidelines that voters are asked to follow.
			<ul>
				<li>
					Rank the teams according to <b>your honest perception</b> of their strength, however you choose to measure it. Blatant bias for or against any teams, conferences, players, or coaches will likely be challenged and may lead to dismissal
					from the official voting panel.
				</li>
				<li>
					<b>You should be able to defend your ballot</b> with reasoned arguments for why each team deserves their spot among the top 25 teams in the sport. Unlike in years prior, obvious meme votes are explicitly prohibited, even in the #25
					spot. That said, if your honest perception is, say, that mid-majors are unfairly overlooked by the national media, placing well-performing mid-majors on your ballot is acceptable and encouraged.
				</li>
				<li>
					<b>There is no &quot;correct&quot; way to vote.</b> Some voters are all in on metrics, while others focus more heavily on results, and yet others like the eye test. Some voters treat the poll as a weekly power ranking, while others use
					it to rank the teams they think are most likely to win it all at the end of the season. None of these methods are inherently right or wrong, and the poll would be very homogeneous and boring if every voter thought the same way.
				</li>
				<li>
					<b>Use nuance</b> in your methodology. Was Kansas missing a key player in a key game? Was the result of that Houston/Alabama game heavily influenced by some poor officiating in the final minute? Was Michigan just absolutely,
					unsustainably shooting the lights out to beat Ohio State? These things happen every week. Use them! You don&apos;t have to pretend that who won and who lost are the only things that matter at the end of the day.
				</li>
				<li>
					Try not to overvalue head-to-head results. The better team doesn&apos;t win every game; if they did, no teams would ever split a season series. It&apos;s acceptable to rank a team ahead of a team that&apos;s beaten them. By February,
					it&apos;ll be inescapable.
				</li>
				<li>Consider location. A close road loss can be just as indicative of team strength as a close home win. Most metrics and oddsmakers give the average home team an edge of 2-3 points.</li>
			</ul>
			<h2> Other matters of philosophy </h2>
			<h4>I have an algorithm for ranking teams that I would like to use as my ballot. Is that okay?</h4>
			<p>
				No. Unlike our friends at r/CFB, our poll is strictly for humans. It&apos;s meant to work by aggregating the beliefs of a number of individuals, each with their own unique perspective. You may use your algorithm as a tool to inform your
				rankings, but some human thought must go into interpreting the results before you decide whom to rank where. &quot;My algorithm says UNC would beat the Portland Trail Blazers on a neutral court&quot; will not be considered a valid response
				if someone challenges your rankings.
			</p>
			<h4>Which teams are eligible for this poll?</h4>
			<p>
				This poll ranks the top 25 NCAA Division I men&apos;s basketball teams. That includes teams that are ineligible for the postseason. It does not include teams that are not in Division I, regardless of whether you think, say, Northwest
				Missouri State would play well enough to earn a top-25 ranking if they played at the D1 level.
			</p>
			<h4>How should teams be ranked in the preseason and early in the season, when there isn&apos;t much useful information to work with?</h4>
			<p>
				Use all resources available to you when ranking teams. Consider returning players, the quality of the incoming class, and transfers who have joined and left the team. Consider players you believe are primed to have breakout seasons and
				coaches you believe can coach their teams to success. Feel free to refer to third-party rankings and reporting to get yourself up to speed on what happened in the offseason, but don&apos;t copy ESPN&apos;s Way Too Early Top 25
				note-for-note.
			</p>
			<h4>Should teams always drop in my rankings after they lose?</h4>
			<p>
				No! This is usually what happens in the AP Poll, but we&apos;re better than that. If #23 Minnesota loses on the road to #11 Wisconsin...I mean, what did you expect? You will definitely not be removed from the official voting panel for
				raising #20 Colorado after a close loss to #2 UCLA.
			</p>
			<h4>Speaking of the AP Poll: should we consider them at all in our rankings?</h4>
			<p>No. You couldn&apos;t if you tried; our poll releases first.</p>
			<h2> Other frequently asked questions</h2>
			<h4>Who makes up the official voting panel?</h4>
			<p>
				The official voting panel is composed of college basketball fans active on the r/CollegeBasketball subreddit, the r/CollegeBasketball Discord server, or both. It is selected by a few of the subreddit&apos;s moderators. We, the poll
				administrators, do our best to ensure a reasonable distribution of voters between teams and conferences.
			</p>
			<h4>How can I become a voter?</h4>
			<p>Log in to this site with your Reddit credentials.</p>
			<p>
				If you&apos;re reading this in the preseason, submit an application to be an official voter and fill out the attached preseason ballot. The poll administrators will review your application and can accept or decline it at our own discretion.
				If accepted, your preseason ballot and future ballots you submit will count in calculating the consensus r/CollegeBasketball Top 25. If declined, your ballot will still be publicly available as a provisional ballot.
			</p>
			<p>
				If you&apos;re reading this in the regular season, submit a provisional ballot this week and keep submitting provisional ballots to display interest in joining the official voting panel. We replace inactive official voters with active
				provisional voters on a regular basis, so if you&apos;re frequently submitting sensible ballots, you&apos;ll likely be added eventually.
			</p>
			<h4>Wait, you can be removed from the official voting panel due to inactivity?</h4>
			<p>
				Yes. Each official voter can miss up to three ballots every season. After that, barring extenuating circumstances, they will be considered inactive and removed from the official voting panel. Official voters who know they will miss an
				extended period of time and wish to remain on the panel should message the moderators of r/CollegeBasketball ahead of time so the poll administrators can consider giving them some leeway.
			</p>
			<br />
			<blockquote>
				I have a feeling if we could get 50 hoops experts together each week during the season and poll them on who they thought the best team was, we’d get a better power ranking than any computer could produce. If we could free them from the
				shackles of modern-day voting tendencies, the wisdom of the crowd would provide some very useful information.
			</blockquote>
			—Ken Pomeroy, <a href="https://kenpom.com/blog/the-preseason-ap-poll-is-great/">&quot;The pre-season AP Poll is great&quot;</a>
		</div>
	) : (
		<div>
			<Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png"></Navbar>
			<h1>About the r/CollegeBasketball User Poll</h1>
			<p>
				Welcome to the new and improved r/CollegeBasketball User Poll! This poll indicates the relative rankings of the top 25 NCAA Division I men&apos;s basketball teams as viewed by a representative sample of the r/CollegeBasketball community.
				The moderators of this subreddit have run this poll on a weekly basis since 2012-13.
			</p>
			<h2> How does it work? </h2>
			<p>
				Each weekend during the regular season, as well as once during the preseason and once following the conclusion of the NCAA Tournament, everyone on a panel of about 100-120 official voters submits their own individual ballots, ranking who
				they believe to be the best teams in NCAA Division I men&apos;s basketball from 1 to 25. On each individual ballot, the #1 team gets 25 points, the #2 team gets 24 points, and so on and so forth, down to 1 point for the #25 team. The scores
				for each team from every ballot are totaled up to form the consensus r/CollegeBasketball Top 25. This scoring is identical to other polls of this variety, namely the Associated Press Top 25 and the USA TODAY Sports Coaches Poll.
			</p>
			<h2> Voting guidelines</h2>
			The following are the voting and ethics guidelines that voters are asked to follow.
			<ul>
				<li>
					Rank the teams according to <b>your honest perception</b> of their strength, however you choose to measure it. Blatant bias for or against any teams, conferences, players, or coaches will likely be challenged and may lead to dismissal
					from the official voting panel.
				</li>
				<li>
					<b>You should be able to defend your ballot</b> with reasoned arguments for why each team deserves their spot among the top 25 teams in the sport. Unlike in years prior, obvious meme votes are explicitly prohibited, even in the #25
					spot. That said, if your honest perception is, say, that mid-majors are unfairly overlooked by the national media, placing well-performing mid-majors on your ballot is acceptable and encouraged.
				</li>
				<li>
					<b>There is no &quot;correct&quot; way to vote.</b> Some voters are all in on metrics, while others focus more heavily on results, and yet others like the eye test. Some voters treat the poll as a weekly power ranking, while others use
					it to rank the teams they think are most likely to win it all at the end of the season. None of these methods are inherently right or wrong, and the poll would be very homogeneous and boring if every voter thought the same way.
				</li>
				<li>
					<b>Use nuance</b> in your methodology. Was Kansas missing a key player in a key game? Was the result of that Houston/Alabama game heavily influenced by some poor officiating in the final minute? Was Michigan just absolutely,
					unsustainably shooting the lights out to beat Ohio State? These things happen every week. Use them! You don&apos;t have to pretend that who won and who lost are the only things that matter at the end of the day.
				</li>
				<li>
					Try not to overvalue head-to-head results. The better team doesn&apos;t win every game; if they did, no teams would ever split a season series. It&apos;s acceptable to rank a team ahead of a team that&apos;s beaten them. By February,
					it&apos;ll be inescapable.
				</li>
				<li>Consider location. A close road loss can be just as indicative of team strength as a close home win. Most metrics and oddsmakers give the average home team an edge of 2-3 points.</li>
			</ul>
			<h2> Other matters of philosophy </h2>
			<h4>I have an algorithm for ranking teams that I would like to use as my ballot. Is that okay?</h4>
			<p>
				No. Unlike our friends at r/CFB, our poll is strictly for humans. It&apos;s meant to work by aggregating the beliefs of a number of individuals, each with their own unique perspective. You may use your algorithm as a tool to inform your
				rankings, but some human thought must go into interpreting the results before you decide whom to rank where. &quot;My algorithm says UNC would beat the Portland Trail Blazers on a neutral court&quot; will not be considered a valid response
				if someone challenges your rankings.
			</p>
			<h4>Which teams are eligible for this poll?</h4>
			<p>
				This poll ranks the top 25 NCAA Division I men&apos;s basketball teams. That includes teams that are ineligible for the postseason. It does not include teams that are not in Division I, regardless of whether you think, say, Northwest
				Missouri State would play well enough to earn a top-25 ranking if they played at the D1 level.
			</p>
			<h4>How should teams be ranked in the preseason and early in the season, when there isn&apos;t much useful information to work with?</h4>
			<p>
				Use all resources available to you when ranking teams. Consider returning players, the quality of the incoming class, and transfers who have joined and left the team. Consider players you believe are primed to have breakout seasons and
				coaches you believe can coach their teams to success. Feel free to refer to third-party rankings and reporting to get yourself up to speed on what happened in the offseason, but don&apos;t copy ESPN&apos;s Way Too Early Top 25
				note-for-note.
			</p>
			<h4>Should teams always drop in my rankings after they lose?</h4>
			<p>
				No! This is usually what happens in the AP Poll, but we&apos;re better than that. If #23 Minnesota loses on the road to #11 Wisconsin...I mean, what did you expect? You will definitely not be removed from the official voting panel for
				raising #20 Colorado after a close loss to #2 UCLA.
			</p>
			<h4>Speaking of the AP Poll: should we consider them at all in our rankings?</h4>
			<p>No. You couldn&apos;t if you tried; our poll releases first.</p>
			<h2> Other frequently asked questions</h2>
			<h4>Who makes up the official voting panel?</h4>
			<p>
				The official voting panel is composed of college basketball fans active on the r/CollegeBasketball subreddit, the r/CollegeBasketball Discord server, or both. It is selected by a few of the subreddit&apos;s moderators. We, the poll
				administrators, do our best to ensure a reasonable distribution of voters between teams and conferences.
			</p>
			<h4>How can I become a voter?</h4>
			<p>Log in to this site with your Reddit credentials.</p>
			<p>
				If you&apos;re reading this in the preseason, submit an application to be an official voter and fill out the attached preseason ballot. The poll administrators will review your application and can accept or decline it at our own discretion.
				If accepted, your preseason ballot and future ballots you submit will count in calculating the consensus r/CollegeBasketball Top 25. If declined, your ballot will still be publicly available as a provisional ballot.
			</p>
			<p>
				If you&apos;re reading this in the regular season, submit a provisional ballot this week and keep submitting provisional ballots to display interest in joining the official voting panel. We replace inactive official voters with active
				provisional voters on a regular basis, so if you&apos;re frequently submitting sensible ballots, you&apos;ll likely be added eventually.
			</p>
			<h4>Wait, you can be removed from the official voting panel due to inactivity?</h4>
			<p>
				Yes. Each official voter can miss up to three ballots every season. After that, barring extenuating circumstances, they will be considered inactive and removed from the official voting panel. Official voters who know they will miss an
				extended period of time and wish to remain on the panel should message the moderators of r/CollegeBasketball ahead of time so the poll administrators can consider giving them some leeway.
			</p>
			<br />
			<blockquote>
				I have a feeling if we could get 50 hoops experts together each week during the season and poll them on who they thought the best team was, we’d get a better power ranking than any computer could produce. If we could free them from the
				shackles of modern-day voting tendencies, the wisdom of the crowd would provide some very useful information.
			</blockquote>
			—Ken Pomeroy, <a href="https://kenpom.com/blog/the-preseason-ap-poll-is-great/">&quot;The pre-season AP Poll is great&quot;</a>
		</div>
	);
}

const REDIRECT_URI = inDevEnvironment ? "http://localhost:3000/profile" :'http://cbbpoll.net/profile';
const RANDOM_STRING = 'randomstringhere';
const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
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
			return { props: { user } };
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
			return { props: { user } };
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
			return { props: { user } };
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
