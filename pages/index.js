import Navbar from "../components/navbar";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import axios, { Axios } from "axios";
import querystring from "querystring";
const randomstring = require("randomstring");
import Image from 'next/image';
import User from "../models/User";
import UserBallot from "../models/UserBallot";
import TeamData from "../models/TeamData";
import { connectMongo } from "../utils/connect";
import Link from 'next/link';

const DURATION = "permanent";
const SCOPE = "identity";

//const REDIRECT_URI = process.env.REDIRECT_URI;
const REDIRECT_URI = "http://cbbpoll.net/profile";

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
  let pollDate = new Date('31 October 2022 14:00 UTC');
  let today = new Date();
  //let today = new Date('31 October 2022 14:00 UTC');

  let userpoll = props.userpoll;
  let pollVoters = props.pollVoters;
  let provisionalVoters = props.provisionalVoters;
  let modlist = ['broadwaystarVGC', 'SleveMcDichael4', 'DEP61'];

  let tableData = <tr>
                    <th>Rank</th>
                    <th>Change</th>
                    <th>Team (#1 Votes)</th>
                    <th>Points</th>
                  </tr>;

  let othersReceivingVotes = '';

  let rowArray = [];           
  for(let i = 0; i < userpoll.length; i++){
    if(userpoll[i].rank <= 25){
      if(userpoll[i].firstPlaceVotes > 0){
        rowArray.push(
          <tr>
            <td>
              {userpoll[i].rank}
            </td>
            <td>
              <Image src={userpoll[i].url} width={100} height={100}></Image> {userpoll[i].teamName} ({userpoll[i].firstPlaceVotes})
            </td>
            <td>
              -
            </td>
            <td>
              {userpoll[i].points}
            </td>
          </tr>
        );
      }
      else{
        rowArray.push(
          <tr>
            <td>
              {userpoll[i].rank}
            </td>
            <td>
            <Image src={userpoll[i].url} width={50} height={50}></Image> {userpoll[i].teamName}
            </td>
            <td>
              -
            </td>
            <td>
              {userpoll[i].points}
            </td>
          </tr>
        );
      }
    }
    else{
      if(i < userpoll.length - 1 ){
        othersReceivingVotes = othersReceivingVotes + userpoll[i].teamName + " " + userpoll[i].points + ", "
      }
      else{
        othersReceivingVotes = othersReceivingVotes + userpoll[i].teamName + " " + userpoll[i].points
      }
    }
  }

  console.log(tableData);

  let pollVoterArray = [];
  for(let i = 0; i < pollVoters.length; i++){
    if(i !== pollVoters.length - 1){
      pollVoterArray.push(
                          <Link href={`/ballots/${pollVoters[i].ballotId}`}>
                            <span>                              
                              <a> <Image src={pollVoters[i].url} width={25} height={25}></Image> {pollVoters[i].username}, </a>                               
                            </span>
                          </Link>

      );
    }
    else{
      pollVoterArray.push(      
        <Link href={`/ballots/${pollVoters[i].ballotId}`}>
          <span>
            <a><Image src={pollVoters[i].url} width={25} height={25}></Image>  {pollVoters[i].username}</a>          
          </span>
        </Link>);
    }
  }

  let provisionalVoterArray = [];
  for(let i = 0; i < provisionalVoters.length; i++){
    if(i !== pollVoters.length - 1){
      provisionalVoterArray.push(
                                <Link href={`/ballots/${pollVoters[i].ballotId}`}>
                                  <span>
                                    <a><Image src={provisionalVoters[i].url} width={25} height={25}></Image> {provisionalVoters[i].username}, </a>
                                  </span>
                                </Link>

      );
    }
    else{
      provisionalVoterArray.push(   
        <Link href={`/ballots/${pollVoters[i].ballotId}`}>
          <span>
            <a><Image src={provisionalVoters[i].url} width={25} height={25}></Image>  {provisionalVoters[i].username} </a>
          </span>
        </Link>);
    }
  }

  // if(modlist.includes(props.user.name)){
  //   return(    
  //     <div className="homepage">
  //     <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={props.user.name}></Navbar>

  //     <div className="content">  
  //       <div id="ballotBox">
  //             <h3>Become a poll voter!</h3>
  //             <h3>Apply now {props.user.name}!</h3>
  //           <a href={'/application'}>
  //             <button>Apply Now!</button>          
  //           </a>
  //           <h3>Applications close Friday, October 28, at 11:59pm EDT</h3>
  //       </div>
  //       <div id="pollTable">
  //         <h1>Preseason Poll</h1>
  //         <table>
  //           <tbody>
  //             <tr>
  //               <th>Rank</th>
  //               <th>Team (#1 Votes)</th>
  //               <th>Change</th>
  //               <th>Points</th>
  //             </tr>
  //             {rowArray.map(row => row)}
  //           </tbody>
  //         </table>
  //         <span className="boldText">Others Receiving Votes:</span> {othersReceivingVotes}
  //         <h2>Official Ballots</h2>
  //         {pollVoterArray.map(voter => voter)}
  //         <h2>Provisional Ballots</h2>
  //         {provisionalVoterArray.map(voter => voter)}
  //       </div>
  //     </div>  

  //   </div>
  // );
  // }
  if(today < pollDate){
    return props.user ? (    
      <div className="homepage">
        
        <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={props.user.name}></Navbar>
  
        <div className="content">  
          <div id="ballotBox">
                <h3>Become a poll voter!</h3>
                <h3>Apply now {props.user.name}!</h3>
              <a href={'/application'}>
                <button>Apply Now!</button>          
              </a>
              <h3>Applications close Friday, October 28, at 11:59pm EDT</h3>
          </div>
        </div>  
  
      </div>
    ) :  (    
      <div className="homepage">
        
        <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png"></Navbar>
        <div className="content">  
          <div id="ballotBox">
                <h3>Become a poll voter!</h3>
                <h3>Sign in to apply!</h3>
              <a href={URL}>
                <button>Sign in with Reddit</button>          
              </a>
              <h3>Applications close Friday, October 28, at 11:59pm EDT</h3>
          </div>
        </div>  
      </div>
    );
  }
  else if(today >= pollDate || modlist.includes(props.user.name)){
    return props.user ? (    
      <div className="homepage">
        
        <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={props.user.name}></Navbar>
  
        <div className="content">  
          <div id="ballotBox">
                <h3>Become a poll voter!</h3>
                <h3>Apply now {props.user.name}!</h3>
              <a href={'/application'}>
                <button>Apply Now!</button>          
              </a>
              <h3>Applications close Friday, October 28, at 11:59pm EDT</h3>
          </div>
          <div id="pollTable">
            <h1>Preseason Poll</h1>
            <table>
              <tbody>
                <tr>
                  <th>Rank</th>
                  <th>Team (#1 Votes)</th>
                  <th>Change</th>
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
                <h3>Become a poll voter!</h3>
                <h3>Sign in to apply!</h3>
              <a href={URL}>
                <button>Sign in with Reddit</button>          
              </a>
              <h3>Applications close Friday, October 28, at 11:59pm EDT</h3>
          </div>
          <div id="pollTable">
            <h1>Preseason Poll</h1>
            <table>
              <tbody>
                <tr>
                  <th>Rank</th>
                  <th>Change</th>
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
  const refresh_token = getCookie("refresh_token", { req, res });
  const access_token = getCookie("access_token", { req, res });

  if(query.state === RANDOM_STRING){
    console.log('test');
  }

  if (refresh_token) {
    if (access_token) {
      const user = await getUser(access_token);
      const userpoll = await getUserpoll();
      const pollVoters = await getBallots(true);
      const provisionalVoters = await getBallots(false);
      return { props: { user, userpoll, pollVoters, provisionalVoters } };
    } else {
      const token = await getToken({
        refresh_token: refresh_token,
        grant_type: "refresh_token",
      });
      console.log('token:', token);
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
      const userpoll = await getUserpoll();
      const pollVoters = await getBallots(true);
      const provisionalVoters = await getBallots(false);
      return { props: { user, userpoll, pollVoters, provisionalVoters } };
    }
  } else if (query.code && query.state === RANDOM_STRING) {
    try {
      console.log('else if');
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
      const userpoll = await getUserpoll();
      const pollVoters = await getBallots(true);
      const provisionalVoters = await getBallots(false);
      return { props: { user, userpoll, pollVoters, provisionalVoters } };
    } catch (e) {
      console.log(e);
      return { props: { user: null } };
    }
  } else {
    console.log('else');
    const userpoll = await getUserpoll();
    const pollVoters = await getBallots(true);
    const provisionalVoters = await getBallots(false);
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

const getUserList = async (pollVoter) => {
  console.log('CONNECTING TO MONGO');
  await connectMongo();
  console.log('CONNECTED TO MONGO');

  console.log('FETCHING APP');
  const users = await User.find({pollVoter: pollVoter});
  const userList = JSON.parse(JSON.stringify(users));
  console.log('userList:', userList);
  console.log('FETCHED APP');
  let userArray = [];
  for(let i = 0; i < userList.length; i++){
    userArray.push(userList[i].name);
  }
  return userArray;
}

const getUserInfo = async (username) =>{
  console.log('CONNECTING TO MONGO')
  await connectMongo();
  console.log('CONNECTED TO MONGO')

  console.log('FETCHING DOCUMENT');
  const user = await User.find({name: username});
  console.log('FETCHED DOCUMENT');
  return user;
}

const getBallots = async (pollVoter) => {
  console.log('pollVoter:', pollVoter);
  let users = await getUserList(pollVoter);
  console.log('user list:', users);
  
  if(pollVoter){

  }
  else if(!pollVoter){
    console.log('pollVoter:', pollVoter);
    console.log('false');
    console.log('user list:', users);
  }
  
  console.log('CONNECTING TO MONGO');
  await connectMongo();
  console.log('CONNECTED TO MONGO')

  console.log('FETCHING DOCUMENT');
  const ballots = await UserBallot.find({user: {$in: users}});
  console.log('FETCHED DOCUMENT');
  
  let voters = [];
  for(let i = 0; i < ballots.length; i++){
    let user = await getUserInfo(ballots[i].user);
    let team = await getTeam(user[0].primaryTeam);
    let url = team.url;
    voters.push({
      username: ballots[i].user,
      ballotId: ballots[i]._id.toString(),
      url: team.url
    })
  }
  console.log('voters:', voters);
  return voters;
}

async function getTeam(id){
  console.log('CONNECTING TO MONGO')
  await connectMongo();
  console.log('CONNECTED TO MONGO')
  console.log('FETCHING DOCUMENT');
  const teamData = await TeamData.findOne({_id: id});
  console.log('FETCHED DOCUMENT');

  return teamData;
}


const getUserpoll = async () => {
  let userArray = await getUserList(true);

  console.log('CONNECTING TO MONGO');
  await connectMongo();
  console.log('CONNECTED TO MONGO');

  console.log('FETCHING APP');
  const ballots = await UserBallot.find({week: "Pre-Season", user: {$in: userArray} });
  const ballotList = JSON.parse(JSON.stringify(ballots));
  console.log('FETCHED APP');

  let numberOne = {};
  let pointTotals = {};
  for(let i = 0; i < ballotList.length; i++){
    if(numberOne[ballotList[i].one.id] == null){
      numberOne[ballotList[i].one.id] = 0;
    }
    numberOne[ballotList[i].one.id]++;

    pointTotals[ballotList[i].one.id] = getPoints(pointTotals, ballotList[i].one.id, ballotList[i].one.points);
    pointTotals[ballotList[i].two.id] = getPoints(pointTotals, ballotList[i].two.id, ballotList[i].two.points);
    pointTotals[ballotList[i].three.id] = getPoints(pointTotals, ballotList[i].three.id, ballotList[i].three.points);
    pointTotals[ballotList[i].four.id] = getPoints(pointTotals, ballotList[i].four.id, ballotList[i].four.points);
    pointTotals[ballotList[i].five.id] = getPoints(pointTotals, ballotList[i].five.id, ballotList[i].five.points);
    pointTotals[ballotList[i].six.id] = getPoints(pointTotals, ballotList[i].six.id, ballotList[i].six.points);
    pointTotals[ballotList[i].seven.id] = getPoints(pointTotals, ballotList[i].seven.id, ballotList[i].seven.points);
    pointTotals[ballotList[i].eight.id] = getPoints(pointTotals, ballotList[i].eight.id, ballotList[i].eight.points);
    pointTotals[ballotList[i].nine.id] = getPoints(pointTotals, ballotList[i].nine.id, ballotList[i].nine.points);
    pointTotals[ballotList[i].ten.id] = getPoints(pointTotals, ballotList[i].ten.id, ballotList[i].ten.points);
    pointTotals[ballotList[i].eleven.id] = getPoints(pointTotals, ballotList[i].eleven.id, ballotList[i].eleven.points);
    pointTotals[ballotList[i].twelve.id] = getPoints(pointTotals, ballotList[i].twelve.id, ballotList[i].twelve.points);
    pointTotals[ballotList[i].thirteen.id] = getPoints(pointTotals, ballotList[i].thirteen.id, ballotList[i].thirteen.points);
    pointTotals[ballotList[i].fourteen.id] = getPoints(pointTotals, ballotList[i].fourteen.id, ballotList[i].fourteen.points);
    pointTotals[ballotList[i].fifteen.id] = getPoints(pointTotals, ballotList[i].fifteen.id, ballotList[i].fifteen.points);
    pointTotals[ballotList[i].sixteen.id] = getPoints(pointTotals, ballotList[i].sixteen.id, ballotList[i].sixteen.points);
    pointTotals[ballotList[i].seventeen.id] = getPoints(pointTotals, ballotList[i].seventeen.id, ballotList[i].seventeen.points);
    pointTotals[ballotList[i].eighteen.id] = getPoints(pointTotals, ballotList[i].eighteen.id, ballotList[i].eighteen.points);
    pointTotals[ballotList[i].nineteen.id] = getPoints(pointTotals, ballotList[i].nineteen.id, ballotList[i].nineteen.points);
    pointTotals[ballotList[i].twenty.id] = getPoints(pointTotals, ballotList[i].twenty.id, ballotList[i].twenty.points);
    pointTotals[ballotList[i].twentyOne.id] = getPoints(pointTotals, ballotList[i].twentyOne.id, ballotList[i].twentyOne.points);
    pointTotals[ballotList[i].twentyTwo.id] = getPoints(pointTotals, ballotList[i].twentyTwo.id, ballotList[i].twentyTwo.points);
    pointTotals[ballotList[i].twentyThree.id] = getPoints(pointTotals, ballotList[i].twentyThree.id, ballotList[i].twentyThree.points);
    pointTotals[ballotList[i].twentyFour.id] = getPoints(pointTotals, ballotList[i].twentyFour.id, ballotList[i].twentyFour.points);
    pointTotals[ballotList[i].twentyFive.id] = getPoints(pointTotals, ballotList[i].twentyFive.id, ballotList[i].twentyFive.points);
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
      points: pointTotalSort[i][1],
      firstPlaceVotes: getFirstPlaceVotes(pointTotalSort[i][0]),
      url: team.url
    });
  }

  let userpollData = {
    week: "Pre-Season",
    season: "2022-2023",
    poll: userpoll 
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

  return userpoll;
} 

