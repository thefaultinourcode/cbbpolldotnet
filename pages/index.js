//import Navbar from "../components/navbar";
import { getCookie, getCookies, setCookie } from "cookies-next";
import Image from "next/image";
import TeamRow from "../components/pollrow";
import Link from "next/link";
//import { useQuery } from "@tanstack/react-query";

import { getBallots, getUserpoll, checkPoll, addPoll, getUserpollTest, getPoll } from "../lib/server";
import { getUser, getToken, userQuery } from "../lib/client";
//import addPoll from "./api/addPoll";
//import { getPoll } from "../utils/getData";

const DURATION = "permanent";
const SCOPE = "identity";

const REDIRECT_URI = process.env.REDIRECT_URI;
//const REDIRECT_URI = "http://cbbpoll.net/profile";

const RANDOM_STRING = "randomstringhere"; //randomstring.generate();
const RESPONSE_TYPE = "code";
const CLIENT_ID = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

const URL = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`;

//get the official poll voters
//get their ballots
//extract each team and their points
//add the points up for each team
//display

export default function Home(props) {
	let pollDate = new Date("7 January 2023 15:00 UTC");
	let today = new Date();
	//let today = new Date('1 May 2023 16:00 UTC');
	let season = 2023;
  let week;
	if (today > pollDate) {
		// week = 2;
		week = 3;
	} else {
		// week = "Pre-Season";
		week = 2;
	}

	const cookies = getCookies();

	// console.log("getting cookies", cookies);

	// console.log("week:", week);

	// console.log("index props", props);

	// async function addPoll(userpollData) {
	// 	const res = await fetch("/api/addPoll", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(userpollData),
	// 	});

	// 	const data = await res.json();
	// }

	let userpoll = props.userpoll;

	// let week = props.userpoll.week;
	// let season = props.userpoll.season;
	//console.log('userpoll:', userpoll);

  console.log('props', props);

  console.log(props.pollVoters);

  let officialBallots= [];
  for(let i = 0; i < props.pollVoters.length; i++){
    console.log(props.pollVoters[i].ballotId);
    officialBallots.push(props.pollVoters[i].ballotId);
  }
  console.log('officialBallots:', officialBallots);

	if (!props.pollExists) {
		//console.log('userpoll');
		let userpollData = {
			ballots: officialBallots,
      		week: week,
			season: season			
		};
    console.log('userplolData:', userpollData);
		//addPoll(userpollData);
	} else {
		console.log("no userplol");
	}

	let pollVoters = props.pollVoters;
	let provisionalVoters = props.provisionalVoters;
	let modlist = ["broadwaystarVGC", "SleveMcDichael4", "DEP61"];

	let tableData = (
		<tr>
			<th>Rank</th>
			<th>Team (#1 Votes)</th>
			<th>Points</th>
		</tr>
	);

	let othersReceivingVotes = "";

	let rowArray = [];

	for (let i = 0; i < userpoll.length; i++) {
		if (userpoll[i].rank <= 25) {
			rowArray.push(
				<TeamRow
					rank={userpoll[i].rank}
					url={userpoll[i].url}
					teamName={userpoll[i].teamName}
					firstPlaceVotes={userpoll[i].firstPlaceVotes}
					points={userpoll[i].points}
				></TeamRow>
			);
		} else {
			if (i < userpoll.length - 1) {
				othersReceivingVotes =
					othersReceivingVotes + userpoll[i].shortName + " " + userpoll[i].points + ", ";
			} else {
				othersReceivingVotes =
					othersReceivingVotes + userpoll[i].shortName + " " + userpoll[i].points;
			}
		}
	}

	let pollVoterArray = [];
	for (let i = 0; i < pollVoters.length; i++) {
		if (i !== pollVoters.length - 1) {
			pollVoterArray.push(
				<span>
					<Image
						src={pollVoters[i].url}
						width={25}
						height={25}
						alt="User's Affiliated Team Logo"
					></Image>
					<Link href={`/ballots/${week}/${pollVoters[i].ballotId}`}>{pollVoters[i].username}</Link>,
				</span>
			);
		} else {
			pollVoterArray.push(
				<span>
					<Image
						src={pollVoters[i].url}
						width={25}
						height={25}
						alt="User's Affiliated Team Logo"
					></Image>
					<Link href={`/ballots/${week}/${pollVoters[i].ballotId}`}>{pollVoters[i].username}</Link>
				</span>
			);
		}
	}

	let provisionalVoterArray = [];
	for (let i = 0; i < provisionalVoters.length; i++) {
		if (i !== pollVoters.length - 1) {
			provisionalVoterArray.push(
				<span>
					<Image
						src={provisionalVoters[i].url}
						width={25}
						height={25}
						alt="Provisional User's Affiliated Team Logo"
					></Image>
					<Link href={`/ballots/${week}/${provisionalVoters[i].ballotId}`}>
						{provisionalVoters[i].username}
					</Link>
					,
				</span>
			);
		} else {
			provisionalVoterArray.push(
				<span>
					<Image
						src={provisionalVoters[i].url}
						width={25}
						height={25}
						alt="Provisional User's Affiliated Team Logo"
					></Image>
					<Link href={`/ballots/${week}/${provisionalVoters[i].ballotId}`}>
						{provisionalVoters[i].username}
					</Link>
				</span>
			);
		}
	}

	let userCheck;
	if (props.user) {
		userCheck = props.user.name;
	} else {
		userCheck = false;
	}

	if (today >= pollDate || modlist.includes(userCheck)) {
		return props.user ? (
			<div className="flex flex-col">
				<div className="bg-[#efa94d] text-center h-fit text-xl font-bold p-2 rounded-2xl flex flex-col gap-4">
					<h3>Vote for Week 3!</h3>
					<a href={"/ballotBox"}>
						<button>VOTE NOW</button>
					</a>
					<h3>Polls close at 9:59 EST every Monday</h3>
				</div>
				<div className="text-center w-full">
					<h1 className="text-4xl font-bold mt-16">Week {week} Poll</h1>
					<table className="mt-3">
						<tbody>
							<tr>
								<th>Rank</th>
								<th>Team (#1 Votes)</th>
								<th>Points</th>
							</tr>
							{rowArray.map((row) => row)}
						</tbody>
					</table>
					<span className="boldText">Others Receiving Votes:</span> {othersReceivingVotes}
					<h2>Official Ballots</h2>
					{pollVoterArray.map((voter) => voter)}
					<h2>Provisional Ballots</h2>
					{provisionalVoterArray.map((voter) => voter)}
				</div>
			</div>
		) : (
			<div className="homepage">
				<div className="content">
					<div id="ballotBox">
						<h3>Vote in the poll!</h3>
						<h3>Sign in!</h3>
						<a href={URL}>
							<button>Sign in with Reddit</button>
						</a>
						<h3>Voting opens at 10AM EST every Saturday</h3>
					</div>
					<div id="pollTable">
						<h1>Week {week} Poll</h1>
						<table>
							<tbody>
								<tr>
									<th>Rank</th>
									<th>Team (#1 Votes)</th>
									<th>Points</th>
								</tr>
								{rowArray.map((row) => row)}
							</tbody>
						</table>
						<span className="boldText">Others Receiving Votes:</span> {othersReceivingVotes}
						<h2>Official Ballots</h2>
						{pollVoterArray.map((voter) => voter)}
						<h2>Provisional Ballots</h2>
						{provisionalVoterArray.map((voter) => voter)}
					</div>
				</div>
			</div>
		);
	} 
	else if (today < pollDate) {
		return props.user ? (
			<div className="homepage">
				<div className="content">
					<div id="ballotBox">
						<h3>Vote for Week 2!</h3>
						<a href={"/ballotBox"}>
							<button>VOTE NOW</button>
						</a>
						<br />
						<h3>Voting closes every Monday at 9:59am EST</h3>
					</div>
				</div>
				<div id="pollTable">
					<h1>Week {week} Poll</h1>
					<table>
						<tbody>
							<tr>
								<th>Rank</th>
								<th>Team (#1 Votes)</th>
								<th>Points</th>
							</tr>
							{rowArray.map((row) => row)}
						</tbody>
					</table>
					<span className="boldText">Others Receiving Votes:</span> {othersReceivingVotes}
					<h2>Official Ballots</h2>
					{pollVoterArray.map((voter) => voter)}
					<h2>Provisional Ballots</h2>
					{provisionalVoterArray.map((voter) => voter)}
				</div>
			</div>
		) : (
			<div className="homepage">
				<div className="content">
					<div id="ballotBox">
						<h3>Vote in the poll!</h3>
						<h3>Sign in!</h3>
						<a href={URL}>
							<button>Sign in with Reddit</button>
						</a>
						<h3>Voting opens at 10AM EST every Saturday</h3>
					</div>
					<div id="pollTable">
						<h1>Week {week} Poll</h1>
						<table>
							<tbody>
								<tr>
									<th>Rank</th>
									<th>Team (#1 Votes)</th>
									<th>Points</th>
								</tr>
								{rowArray.map((row) => row)}
							</tbody>
						</table>
						<span className="boldText">Others Receiving Votes:</span> {othersReceivingVotes}
						<h2>Official Ballots</h2>
						{pollVoterArray.map((voter) => voter)}
						<h2>Provisional Ballots</h2>
						{provisionalVoterArray.map((voter) => voter)}
					</div>
				</div>
			</div>
		);
	}
}

// export const checkWeek = async (week) => {

// }

export const getServerSideProps = async ({ query, req, res }) => {

  let pollDate = new Date("7 January 2023 15:00 UTC");
	//let today = new Date('3 May 2023 15:00 UTC');
	let today = new Date();
	let week;
  let season = 2023;
	if (today > pollDate) {
		week = 3;
	} else {
		week = 2;
	}

  //add poll down here

  const pollVoters = await getBallots(true);

  let pollExists = await checkPoll(week, season);
  if(pollExists){

  }
  else{

  }

//   let poll = await getPoll(week);
//   console.log('poll fetched:', poll);
//   let pollExists;
//   if(poll.length === 0){
//     pollExists = false;
//   }
//   else{
//     pollExists = true;
//   }


  let officialBallots = [];
  let poll;
  if(!pollExists){
    for(let i = 0; i < pollVoters.length; i++){
      console.log(pollVoters[i].ballotId);
      officialBallots.push(pollVoters[i].ballotId);
    }
    console.log('officialBallots:', officialBallots);

    const pollData = {
      week: week,
      season, season,
      ballots: officialBallots
    };
    console.log('pollData:', pollData);
	await addPoll(pollData);
	poll = pollData;
  }
  else{
	poll = await getPoll(week);
  }

  
  const userplol = await getUserpollTest(poll);

  console.log('userplol:', userplol);


	const refresh_token = getCookie("refresh_token", { req, res });
	const access_token = getCookie("access_token", { req, res });

	if (refresh_token) {
		if (access_token) {
			const user = await getUser(access_token);
			const userpoll = await getUserpoll(week);
			
			const provisionalVoters = await getBallots(false);
			return { props: { userpoll, pollVoters, provisionalVoters, pollExists } };
		} else {
			const token = await getToken({
				refresh_token: refresh_token,
				grant_type: "refresh_token",
			});
			setCookie("refresh_token", token.refresh_token, {
				req,
				res,
				maxAge: 60 * 60,
			});
			setCookie("access_token", token.access_token, {
				req,
				res,
				maxAge: 60 * 60 * 24,
			});
			const user = await getUser(token.access_token);
			const userpoll = await getUserpoll(week);
			//const pollVoters = await getBallots(true);
			const provisionalVoters = await getBallots(false);
			return { props: { userpoll, pollVoters, provisionalVoters, pollExists } };
		}
	} else if (query.code && query.state === RANDOM_STRING) {
		try {
			const token = await getToken({
				code: query.code,
				grant_type: "authorization_code",
				redirect_uri: REDIRECT_URI,
			});
			setCookie("refresh_token", token.refresh_token, {
				req,
				res,
				maxAge: 60 * 60,
			});
			setCookie("access_token", token.access_token, {
				req,
				res,
				maxAge: 60 * 60 * 24,
			});
			const user = await getUser(token.access_token);
			const userpoll = await getUserpoll(week);
			//const pollVoters = await getBallots(true);
			const provisionalVoters = await getBallots(false);
			return { props: { userpoll, pollVoters, provisionalVoters, pollExists } };
		} catch (e) {
			console.log(e);
			return { props: { user: null } };
		}
	} else {
		const userpoll = await getUserpoll(week);
		//const pollVoters = await getBallots(true);
		const provisionalVoters = await getBallots(false);
		return { props: { userpoll, pollVoters, provisionalVoters, pollExists } };
	}
};
