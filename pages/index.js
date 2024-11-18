import Navbar from '../components/navbar';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import axios, { Axios } from 'axios';
import querystring from 'querystring';
const randomstring = require('randomstring');
import Image from 'next/image';
import User from '../models/User';
import UserBallot from '../models/UserBallot';
import TeamData from '../models/TeamData';
//import Userpoll from "../models/Userpoll";
import TeamRow from '../components/pollrow';
import { connectMongo } from '../utils/connect';
import Link from 'next/link';
import { getCloseDate, getWeek, getPriorWeek, getSeasonCheckDate } from '../utils/getDates';

const DURATION = 'permanent';
const SCOPE = 'identity';

//const REDIRECT_URI = process.env.REDIRECT_URI;
const REDIRECT_URI = 'http://cbbpoll.net/profile';

const RANDOM_STRING = 'randomstringhere'; //randomstring.generate();
const RESPONSE_TYPE = 'code';
const CLIENT_ID = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

const URL = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`;

//get the official poll voters
//get their ballots
//extract each team and their points
//add the points up for each team
//display

export default function Home(props) {
	let pollDate = getCloseDate();
	let today = new Date();
	//let today = new Date('1 May 2023 16:00 UTC');

	let week;
	if (today >= pollDate) {
		week = getWeek();
	} else {
		week = getPriorWeek();
	}

	//TEMP FIX
	// let tmpDate = new Date('28 October 2024 14:00 UTC');
	// if(today >= tmpDate){
	// 	week = 'Pre-Season';
	// }
	// else{
	// 	week = 'Post-Season';
	// }

	// async function addPoll(userpollData){
	//   const res = await fetch('/api/addPoll',{
	//     method: 'POST',
	//     headers: {
	//     'Content-Type': 'application/json',
	//     },
	//     body: JSON.stringify(
	//         userpollData
	//     ),
	//   });

	// const data = await res.json();
	// }

	let userpoll = props.userpoll;
	for (let i = 0; i < userpoll.length; i++) {
		console.log('name:', userpoll[i].teamName);
	}

	if (props.userpoll.new) {
		let userpollData = {
			week: 'Pre-Season',
			season: 2023,
			poll: userpoll,
		};
		addPoll(userpollData);
	} else {
		console.log('no userplol');
	}

	let pollVoters = props.pollVoters;
	let provisionalVoters = props.provisionalVoters;
	let modlist = ['broadwaystarVGC', 'SleveMcDichael4', 'DEP61'];

	let tableData = (
		<tr>
			<th>Rank</th>
			<th>Team (#1 Votes)</th>
			<th>Points</th>
			<th>Change from Last Week</th>
		</tr>
	);

	let othersReceivingVotes = '';

	let rowArray = [];

	for (let i = 0; i < userpoll.length; i++) {
		if (userpoll[i].rank <= 25) {
			rowArray.push(<TeamRow rank={userpoll[i].rank} url={userpoll[i].url} teamName={userpoll[i].teamName} firstPlaceVotes={userpoll[i].firstPlaceVotes} points={userpoll[i].points} delta={userpoll[i].delta}></TeamRow>);
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
				<span>
					<Image src={pollVoters[i].url} width={25} height={25}></Image>
					<Link href={`/ballots/${week}/${pollVoters[i].ballotId}`}>{pollVoters[i].username}</Link>,
				</span>
			);
		} else {
			pollVoterArray.push(
				<span>
					<Image src={pollVoters[i].url} width={25} height={25}></Image>
					<Link href={`/ballots/${week}/${pollVoters[i].ballotId}`}>{pollVoters[i].username}</Link>
				</span>
			);
		}
	}

	console.log('pollVoterArray:', pollVoterArray);
	let provisionalVoterArray = [];
	for (let i = 0; i < provisionalVoters.length; i++) {
		if (i !== pollVoters.length - 1) {
			provisionalVoterArray.push(
				<span>
					<Image src={provisionalVoters[i].url} width={25} height={25}></Image>
					<Link href={`/ballots/${week}/${provisionalVoters[i].ballotId}`}>{provisionalVoters[i].username}</Link>,
				</span>
			);
		} else {
			provisionalVoterArray.push(
				<span>
					<Image src={provisionalVoters[i].url} width={25} height={25}></Image>
					<Link href={`/ballots/${week}/${provisionalVoters[i].ballotId}`}>{provisionalVoters[i].username}</Link>
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



  if(today >= pollDate || modlist.includes(userCheck)){
    return props.user ? (    
      <div className="homepage">
        
        <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={props.user.name}></Navbar>
  
        <div className="content">  
          <div id="ballotBox">
                <h3>Apply!</h3>
              <a href={'/applicationV2'}>
                <button>APPLY</button>          
              </a>
              <h3>Applications close October 25th at 11:59pm Eastern</h3>
          </div>
          <br/>
          <br/>
          <div id="pollTable">
            <h1>Week {week} Poll</h1>
            <table>
              <tbody>
                <tr>
                  <th>Rank</th>
                  <th>Team (#1 Votes)</th>
                  <th>Points</th>
                </tr>
                {rowArray.map(row => row)}
              </tbody>
            </table>
            <span className="boldText">Others Receiving Votes:</span> {othersReceivingVotes}
            <h2>Official Ballots</h2>
            {pollVoterArray.map(voter => voter)}
            <h2>Provisional Ballots</h2>
            {provisionalVoterArray.map(voter => voter)}
          </div>
        </div>  
  
      </div>
    ) :  (    
      <div className="homepage">
        
        <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png"></Navbar>
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
                {rowArray.map(row => row)}              
              </tbody>
            </table>    
            <span className="boldText">Others Receiving Votes:</span> {othersReceivingVotes}
            <h2>Official Ballots</h2>
            {pollVoterArray.map(voter => voter)}
            <h2>Provisional Ballots</h2>
            {provisionalVoterArray.map(voter => voter)}    
          </div>
        </div>  
      </div>
    );
  }
  else if(today < pollDate){
    return props.user ? (    
      <div className="homepage">
        
        <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={props.user.name}></Navbar>
  
        <div className="content">  
        <div id="ballotBox">
                <h3>Apply!</h3>
              <a href={'/applicationV2'}>
                <button>APPLY</button>          
              </a>
              <h3>Applications close October 25th at 11:59pm Eastern</h3>
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
                {rowArray.map(row => row)}
              </tbody>
            </table>
            <span className="boldText">Others Receiving Votes:</span> {othersReceivingVotes}
            <h2>Official Ballots</h2>
            {pollVoterArray.map(voter => voter)}
            <h2>Provisional Ballots</h2>
            {provisionalVoterArray.map(voter => voter)}
          </div>
      </div>
    ) :  (    
      <div className="homepage">
        
        <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png"></Navbar>
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
                {rowArray.map(row => row)}
              </tbody>
            </table>
            <span className="boldText">Others Receiving Votes:</span> {othersReceivingVotes}
            <h2>Official Ballots</h2>
            {pollVoterArray.map(voter => voter)}
            <h2>Provisional Ballots</h2>
            {provisionalVoterArray.map(voter => voter)}
          </div>
        </div>  
      </div>
    );
  }

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
	let pollDate = getCloseDate();
	let today = new Date();
	//let today = new Date('1 May 2023 16:00 UTC');
	let week;
	if (today > pollDate) {
		week = getWeek();
	} else {
		week = getPriorWeek();
	}

	const refresh_token = getCookie('refresh_token', { req, res });
	const access_token = getCookie('access_token', { req, res });

	if (refresh_token) {
		if (access_token) {
			const user = await getUser(access_token);
			const userpoll = await getUserpoll(week, pollDate);
			const pollVoters = await getBallots(true, pollDate);
			const provisionalVoters = await getBallots(false, pollDate);
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
			const userpoll = await getUserpoll(week, pollDate);
			const pollVoters = await getBallots(true, pollDate);
			const provisionalVoters = await getBallots(false, pollDate);
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
			const userpoll = await getUserpoll(week, pollDate);
			const pollVoters = await getBallots(true, pollDate);
			const provisionalVoters = await getBallots(false, pollDate);
			return { props: { user, userpoll, pollVoters, provisionalVoters } };
		} catch (e) {
			console.log(e);
			return { props: { user: null } };
		}
	} else {
		const userpoll = await getUserpoll(week, pollDate);
		const pollVoters = await getBallots(true, pollDate);
		const provisionalVoters = await getBallots(false, pollDate);
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

// const getUserList = async (pollVoter) => {
//   await connectMongo();

//   const users = await User.find({pollVoter: pollVoter});
//   const userList = JSON.parse(JSON.stringify(users));
//   let userArray = [];
//   for(let i = 0; i < userList.length; i++){
//     userArray.push(userList[i].name);
//   }
//   return userArray;
// }

const getUserInfo = async (username) => {
	await connectMongo();

	const user = await User.find({ name: username });
	return user;
};

const getBallots = async (official, pollDate) => {
	//let users = await getUserList(pollVoter);

	await connectMongo();

	let today = new Date();
	//let today = new Date('1 May 2023 16:00 UTC');
	let week, date, ballots;
	date = getSeasonCheckDate();
	if (today > pollDate) {
		week = getWeek();
	} else {
		week = getPriorWeek();
	}

	ballots = await UserBallot.find({ official: official, week: week, date: { $gte: date } });

	//const ballots = await UserBallot.find({official: official, week: week, season: {$gte: date}});

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

const getUserpoll = async (week, pollDate) => {

	function getPoints(obj, id, points) {
		if (obj[id] == null) {
			obj[id] = 0;
		}
		obj[id] += points;
		return obj[id];
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

	function computeTeamDeltas(currentPoll, previousPoll) {

		for (let i = 0; i < currentPoll.length; i++) {
			let rankDifference = 0;
			//TODO- find a more efficient search here
			for (let j = 0; j < previousPoll.length; j++) {
				if (previousPoll[j].teamId == currentPoll[i].teamId) {
					rankDifference = previousPoll[j].rank - currentPoll[i].rank
					break;
				}
			}
			currentPoll[i].delta = rankDifference;
		}
	}

	await connectMongo();

	//let pollDate = new Date('3 October 2023 14:00 UTC');
	//let pollDate = new Date('26 October 2023 14:00 UTC');
	let today = new Date();
	//let today = new Date('1 May 2023 16:00 UTC');
	let date = getSeasonCheckDate();
	let lastWeek = getPriorWeek();
  
	//FIX
  	//TEMP
  	// date = new Date('October 1 2023');

	// let tmpDate = new Date('28 October 2024 14:00 UTC');
	// if(today >= tmpDate){
	// 	date = new Date('October 1 2024');
	// }
	
	let ballots;
	let lastWeekBallots;

	if (today >= pollDate) {
		ballots = await UserBallot.find({ official: true, week: week, date: { $gte: date } });
	} else {
		ballots = await UserBallot.find({ official: true, week: week, date: { $gte: date } });
	}

	lastWeekBallots = await UserBallot.find({ official: true, week: lastWeek, date: { $lte: today } });
	const ballotListCurrent = JSON.parse(JSON.stringify(ballots));
	const lastWeekBallotsList =  JSON.parse(JSON.stringify(lastWeekBallots));


	async function getUserPollFromBallots(ballotList) {

		let numberOne = {};
		let pointTotals = {};
		for (let i = 0; i < ballotList.length; i++) {
			if (numberOne[ballotList[i][1].id] == null) {
				numberOne[ballotList[i][1].id] = 0;
			}
			numberOne[ballotList[i][1].id]++;
	
			for (let j = 1; j <= 25; j++) {
				pointTotals[ballotList[i][j].id] = getPoints(pointTotals, ballotList[i][j].id, ballotList[i][j].points);
			}
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
		return userpoll;

	}

	//Here, we want to just match the current week's rankings against the last week
	currentUserPoll = getUserPollFromBallots(ballotListCurrent);
	lastWeekUserPoll = getUserPollFromBallots(lastWeekBallotsList);
	computeTeamDeltas(currentPoll,lastWeekUserPoll);

	return currentUserPoll


	// for (let i = 0; i < ballots.length; i++) {
	// 	//console.log('user:', ballots[i].user);
	// }




	// let userpollData = {
	// 	week: 'Pre-Season',
	// 	season: '2023',
	// 	poll: userpoll,
	// 	new: true,
	// };

	//}
};
