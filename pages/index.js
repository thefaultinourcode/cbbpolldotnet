import Navbar from "../components/navbar";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import axios, { Axios } from "axios";
import querystring from "querystring";
const randomstring = require("randomstring");
import Image from 'next/image';
import User from "../models/User";
import UserBallot from "../models/UserBallot";
import TeamData from "../models/TeamData";
//import Userpoll from "../models/Userpoll";
import TeamRow from "../components/pollrow";
import { connectMongo } from "../utils/connect";
import Link from 'next/link';
import { getCloseDate, getWeek, getPriorWeek, getSeasonCheckDate } from "../utils/getDates";

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

  let pollDate = getCloseDate();
  let today = new Date();
  //let today = new Date('1 May 2023 16:00 UTC');

  let season = 2024;
  let week;
  if(today >= pollDate){
    console.log('top pre-season');
    week = getWeek();
  }
  else{
    console.log('top post-season');
    week = getPriorWeek();
  }

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
  for(let i=0; i < userpoll.length; i++){
	console.log('name:', userpoll[i].teamName);
  }


  if(props.userpoll.new){
    let userpollData = {
      week: "Pre-Season",
      season: 2023,
      poll: userpoll 
    }
    addPoll(userpollData); 
  }
  else{
    console.log('no userplol');
  }

  let pollVoters = props.pollVoters;
  let provisionalVoters = props.provisionalVoters;
  let modlist = ['broadwaystarVGC', 'SleveMcDichael4', 'DEP61'];

  let tableData = <tr>
                    <th>Rank</th>
                    <th>Team (#1 Votes)</th>
                    <th>Points</th>
                  </tr>;

  let othersReceivingVotes = '';

  let rowArray = [];      
       
  for(let i = 0; i < userpoll.length; i++){
    if(userpoll[i].rank <= 25){      
      rowArray.push(<TeamRow rank={userpoll[i].rank} url={userpoll[i].url} teamName={userpoll[i].teamName} firstPlaceVotes={userpoll[i].firstPlaceVotes} points={userpoll[i].points}></TeamRow>)
    }
    else{
      if(i < userpoll.length - 1 ){
        othersReceivingVotes = othersReceivingVotes + userpoll[i].shortName + " " + userpoll[i].points + ", "
      }
      else{
        othersReceivingVotes = othersReceivingVotes + userpoll[i].shortName + " " + userpoll[i].points
      }
    }
  }

  let pollVoterArray = [];
  for(let i = 0; i < pollVoters.length; i++){
    if(i !== pollVoters.length - 1){
      pollVoterArray.push(                       
                            <span>  
                              <Image src={pollVoters[i].url} width={25} height={25}></Image>                            
                              <Link href={`/ballots/${week}/${pollVoters[i].ballotId}`}>{pollVoters[i].username}</Link>,                              
                            </span>
      );
    }
    else{
      pollVoterArray.push(      
          <span>
            <Image src={pollVoters[i].url} width={25} height={25}></Image>
            <Link href={`/ballots/${week}/${pollVoters[i].ballotId}`}>{pollVoters[i].username}</Link>          
          </span>
        );
    }
  }

  let provisionalVoterArray = [];
  for(let i = 0; i < provisionalVoters.length; i++){
    if(i !== pollVoters.length - 1){
      provisionalVoterArray.push(                            
                                  <span>
                                    <Image src={provisionalVoters[i].url} width={25} height={25}></Image>
                                    <Link href={`/ballots/${week}/${provisionalVoters[i].ballotId}`}>{provisionalVoters[i].username}</Link>,
                                  </span>
                                

      );
    }
    else{
      provisionalVoterArray.push(   
          <span>
            <Image src={provisionalVoters[i].url} width={25} height={25}></Image>  
            <Link href={`/ballots/${week}/${provisionalVoters[i].ballotId}`}>{provisionalVoters[i].username}</Link>
          </span>
       );
    }
  }

  let userCheck;
  if(props.user){
    userCheck = props.user.name;
  }
  else{
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
  const data = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    querystring.stringify(body),
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString("base64")}`,
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );
  return data.data;
};

export const getServerSideProps = async ({ query, req, res }) => {
  
  let pollDate = getCloseDate();
  let today = new Date();
  //let today = new Date('1 May 2023 16:00 UTC');
  let week;
  let season = 2024;
  if(today > pollDate){
    week = getWeek();
  }
  else{
    week = getPriorWeek();
  }

  const refresh_token = getCookie("refresh_token", { req, res });
  const access_token = getCookie("access_token", { req, res });

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
      const userpoll = await getUserpoll(week, pollDate);
      const pollVoters = await getBallots(true, pollDate);
      const provisionalVoters = await getBallots(false, pollDate);
      return { props: { user, userpoll, pollVoters, provisionalVoters } };
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
  const data = await axios.get("https://oauth.reddit.com/api/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
      content_type: "application/json",
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

const getUserInfo = async (username,) =>{
  await connectMongo();

  const user = await User.find({name: username});
  return user;
}

const getBallots = async (official, pollDate) => {
  //let users = await getUserList(pollVoter);

  await connectMongo();


  let today = new Date();
  //let today = new Date('1 May 2023 16:00 UTC');
  let week, date, ballots;
  date = getSeasonCheckDate();
  if(today > pollDate){
    week = getWeek();
  }
  else{
    week = getPriorWeek();
  }

  ballots = await UserBallot.find({official: official, week: week, date: {$gte: date}});

  //const ballots = await UserBallot.find({official: official, week: week, season: {$gte: date}});

  let voters = [];
  for(let i = 0; i < ballots.length; i++){
    let user = await getUserInfo(ballots[i].user);
    console.log('user:', user);
    let team = await getTeam(user[0].primaryTeam);
    let url = team.url;
    voters.push({
      username: ballots[i].user,
      ballotId: ballots[i]._id.toString(),
      url: url
    })
  }
  return voters;
}

async function getTeam(id){
  await connectMongo();

  const teamData = await TeamData.findOne({_id: id});

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

	//
    //let userArray = await getUserList(true);

      await connectMongo();

      //let pollDate = new Date('3 October 2023 14:00 UTC');
      //let pollDate = new Date('26 October 2023 14:00 UTC');
      let today = new Date();
      //let today = new Date('1 May 2023 16:00 UTC');
      let date = getSeasonCheckDate(); 
      let ballots;

      if(today >= pollDate){
        ballots = await UserBallot.find({official: true, week: week, date: {$gte:date} });
      }
      else{
        ballots = await UserBallot.find({official: true, week: week, date: {$gte:date} });
      }
  
    const ballotList = JSON.parse(JSON.stringify(ballots));

    for(let i = 0; i < ballots.length; i++){
      //console.log('user:', ballots[i].user);
    }

    let numberOne = {};
    let pointTotals = {};
    for(let i = 0; i < ballotList.length; i++){
        
    //   if(week === "Pre-Season"){
    //     if(numberOne[ballotList[i]['one'].id] == null){
    //       numberOne[ballotList[i]['one'].id] = 0;
    //     }
    //     numberOne[ballotList[i]['one'].id]++;
    
    //     pointTotals[ballotList[i]['one'].id] = getPoints(pointTotals, ballotList[i]['one'].id, ballotList[i]['one'].points);
    //     pointTotals[ballotList[i]['two'].id] = getPoints(pointTotals, ballotList[i]['two'].id, ballotList[i]['two'].points);
    //     pointTotals[ballotList[i]['three'].id] = getPoints(pointTotals, ballotList[i]['three'].id, ballotList[i]['three'].points);
    //     pointTotals[ballotList[i]['four'].id] = getPoints(pointTotals, ballotList[i]['four'].id, ballotList[i]['four'].points);
    //     pointTotals[ballotList[i]['five'].id] = getPoints(pointTotals, ballotList[i]['five'].id, ballotList[i]['five'].points);
    //     pointTotals[ballotList[i]['six'].id] = getPoints(pointTotals, ballotList[i]['six'].id, ballotList[i]['six'].points);
    //     pointTotals[ballotList[i]['seven'].id] = getPoints(pointTotals, ballotList[i]['seven'].id, ballotList[i]['seven'].points);
    //     pointTotals[ballotList[i]['eight'].id] = getPoints(pointTotals, ballotList[i]['eight'].id, ballotList[i]['eight'].points);
    //     pointTotals[ballotList[i]['nine'].id] = getPoints(pointTotals, ballotList[i]['nine'].id, ballotList[i]['nine'].points);
    //     pointTotals[ballotList[i]['ten'].id] = getPoints(pointTotals, ballotList[i]['ten'].id, ballotList[i]['ten'].points);
    //     pointTotals[ballotList[i]['eleven'].id] = getPoints(pointTotals, ballotList[i]['eleven'].id, ballotList[i]['eleven'].points);
    //     pointTotals[ballotList[i]['twelve'].id] = getPoints(pointTotals, ballotList[i]['twelve'].id, ballotList[i]['twelve'].points);
    //     pointTotals[ballotList[i]['thirteen'].id] = getPoints(pointTotals, ballotList[i]['thirteen'].id, ballotList[i]['thirteen'].points);
    //     pointTotals[ballotList[i]['fourteen'].id] = getPoints(pointTotals, ballotList[i]['fourteen'].id, ballotList[i]['fourteen'].points);
    //     pointTotals[ballotList[i]['fifteen'].id] = getPoints(pointTotals, ballotList[i]['fifteen'].id, ballotList[i]['fifteen'].points);
    //     pointTotals[ballotList[i]['sixteen'].id] = getPoints(pointTotals, ballotList[i]['sixteen'].id, ballotList[i]['sixteen'].points);
    //     pointTotals[ballotList[i]['seventeen'].id] = getPoints(pointTotals, ballotList[i]['seventeen'].id, ballotList[i]['seventeen'].points);
    //     pointTotals[ballotList[i]['eighteen'].id] = getPoints(pointTotals, ballotList[i]['eighteen'].id, ballotList[i]['eighteen'].points);
    //     pointTotals[ballotList[i]['nineteen'].id] = getPoints(pointTotals, ballotList[i]['nineteen'].id, ballotList[i]['nineteen'].points);
    //     pointTotals[ballotList[i]['twenty'].id] = getPoints(pointTotals, ballotList[i]['twenty'].id, ballotList[i]['twenty'].points);
    //     pointTotals[ballotList[i]['twentyOne'].id] = getPoints(pointTotals, ballotList[i]['twentyOne'].id, ballotList[i]['twentyOne'].points);
    //     pointTotals[ballotList[i]['twentyTwo'].id] = getPoints(pointTotals, ballotList[i]['twentyTwo'].id, ballotList[i]['twentyTwo'].points);
    //     pointTotals[ballotList[i]['twentyThree'].id] = getPoints(pointTotals, ballotList[i]['twentyThree'].id, ballotList[i]['twentyThree'].points);
    //     pointTotals[ballotList[i]['twentyFour'].id] = getPoints(pointTotals, ballotList[i]['twentyFour'].id, ballotList[i]['twentyFour'].points);
    //     pointTotals[ballotList[i]['twentyFive'].id] = getPoints(pointTotals, ballotList[i]['twentyFive'].id, ballotList[i]['twentyFive'].points);
    //   }
      //else{
        if(numberOne[ballotList[i][1].id] == null){
          numberOne[ballotList[i][1].id] = 0;
        }
        numberOne[ballotList[i][1].id]++;
    
		for(let j = 1; j <= 25; j++){
			pointTotals[ballotList[i][j].id] = getPoints(pointTotals, ballotList[i][j].id, ballotList[i][j].points);
		}

        // pointTotals[ballotList[i][1].id] = getPoints(pointTotals, ballotList[i][1].id, ballotList[i][1].points);
        // pointTotals[ballotList[i][2].id] = getPoints(pointTotals, ballotList[i][2].id, ballotList[i][2].points);
        // pointTotals[ballotList[i][3].id] = getPoints(pointTotals, ballotList[i][3].id, ballotList[i][3].points);
        // pointTotals[ballotList[i][4].id] = getPoints(pointTotals, ballotList[i][4].id, ballotList[i][4].points);
        // pointTotals[ballotList[i][5].id] = getPoints(pointTotals, ballotList[i][5].id, ballotList[i][5].points);
        // pointTotals[ballotList[i][6].id] = getPoints(pointTotals, ballotList[i][6].id, ballotList[i][6].points);
        // pointTotals[ballotList[i][7].id] = getPoints(pointTotals, ballotList[i][7].id, ballotList[i][7].points);
        // pointTotals[ballotList[i][8].id] = getPoints(pointTotals, ballotList[i][8].id, ballotList[i][8].points);
        // pointTotals[ballotList[i][9].id] = getPoints(pointTotals, ballotList[i][9].id, ballotList[i][9].points);
        // pointTotals[ballotList[i][10].id] = getPoints(pointTotals, ballotList[i][10].id, ballotList[i][10].points);
        // pointTotals[ballotList[i][11].id] = getPoints(pointTotals, ballotList[i][11].id, ballotList[i][11].points);
        // pointTotals[ballotList[i][12].id] = getPoints(pointTotals, ballotList[i][12].id, ballotList[i][12].points);
        // pointTotals[ballotList[i][13].id] = getPoints(pointTotals, ballotList[i][13].id, ballotList[i][13].points);
        // pointTotals[ballotList[i][14].id] = getPoints(pointTotals, ballotList[i][14].id, ballotList[i][14].points);
        // pointTotals[ballotList[i][15].id] = getPoints(pointTotals, ballotList[i][15].id, ballotList[i][15].points);
        // pointTotals[ballotList[i][16].id] = getPoints(pointTotals, ballotList[i][16].id, ballotList[i][16].points);
        // pointTotals[ballotList[i][17].id] = getPoints(pointTotals, ballotList[i][17].id, ballotList[i][17].points);
        // pointTotals[ballotList[i][18].id] = getPoints(pointTotals, ballotList[i][18].id, ballotList[i][18].points);
        // pointTotals[ballotList[i][19].id] = getPoints(pointTotals, ballotList[i][19].id, ballotList[i][19].points);
        // pointTotals[ballotList[i][20].id] = getPoints(pointTotals, ballotList[i][20].id, ballotList[i][20].points);
        // pointTotals[ballotList[i][21].id] = getPoints(pointTotals, ballotList[i][21].id, ballotList[i][21].points);
        // pointTotals[ballotList[i][22].id] = getPoints(pointTotals, ballotList[i][22].id, ballotList[i][22].points);
        // pointTotals[ballotList[i][23].id] = getPoints(pointTotals, ballotList[i][23].id, ballotList[i][23].points);
        // pointTotals[ballotList[i][24].id] = getPoints(pointTotals, ballotList[i][24].id, ballotList[i][24].points);
        // pointTotals[ballotList[i][25].id] = getPoints(pointTotals, ballotList[i][25].id, ballotList[i][25].points);
      //}    
  }
  
    function getPoints(obj, id, points){
      if(obj[id] == null){
        obj[id] = 0;
      }
      obj[id] += points;
      return obj[id];
    }
  
    let pointTotalSort = Object.entries(pointTotals).sort((a,b) => b[1] - a[1]);
  
    let rank;
    for (let i = 0; i < pointTotalSort.length; i++){
      if(i === 0){
        rank = 1;
        pointTotalSort[i].push(rank);
      }
      else{
        if(pointTotalSort[i][1] === pointTotalSort[i-1][1]){
          pointTotalSort[i].push(rank);
          rank++;
        }
        else{
          rank++;
          pointTotalSort[i].push(rank);
        }
  
      }
    }
  
    let userpoll = [];
  
  
    for(let i = 0; i < pointTotalSort.length; i++){
      let team = await getTeam(pointTotalSort[i][0]);
      let fullName = concatName(team.shortName, team.nickname);
  
      userpoll.push({
        rank: pointTotalSort[i][2],
        teamId: pointTotalSort[i][0],
        teamName: fullName,
        shortName: team.shortName,
        points: pointTotalSort[i][1],
        firstPlaceVotes: getFirstPlaceVotes(pointTotalSort[i][0]),
        url: team.url
      });
    }
  
    function concatName(shortName, nickname){
      return shortName + " " + nickname;
    }
  
    function getFirstPlaceVotes(id){
      if(numberOne[id]==null){
        return 0;
      }
      else{
        return numberOne[id];
      }
    }

    let userpollData = {
      week: "Pre-Season",
      season: "2023",
      poll: userpoll,
      new: true
    }

    return userpoll;
  //}
} 