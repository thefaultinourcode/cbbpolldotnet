import React from "react";
import axios, { Axios } from "axios";
import querystring from "querystring";
import { connectMongo } from "../utils/connect";
import UserBallot from "../models/UserBallot";
import Application from "../models/ApplicationData";
import Navbar from "../components/navbar";
import TeamData from "../models/TeamData";
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Home from './index'
//import {Routes, Route, useNavigate} from 'react-router-dom';

import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
//import { get } from "http";



export default function Submit(props){
    let reasons = [];
    if(props.app){
        if(props.app.checkbox1){
            reasons.push('I rarely go to games, and instead focus on TV broadcasts and streams.');
        }
        if(props.app.checkbox2){
            reasons.push('I try to go to a few games each year.');
        }
        if(props.app.checkbox3){
            reasons.push("I go to either my team's game or some other game most or all weeks.");
        }
        if(props.app.checkbox4){
            reasons.push('I pick a few games each week to watch intently.');
        }
        if(props.app.checkbox5){
            reasons.push('I try to follow everything going on using multiple TVs and/or monitors.');   
        }
        if(props.app.checkbox6){
            reasons.push('I tend to focus on watching my team and/or games that could effect their standing.');  
        }
        if(props.app.checkbox7){
            reasons.push('I tend to focus on watching match-ups between highly ranked teams.');  
        }
        if(props.app.checkbox8){
            reasons.push("I tend to focus on watching match-ups in my team's conference.");  
        }
        if(props.app.checkbox9){
            reasons.push('I tend to focus on watching match-ups between closely matched teams regardless of ranking.');  
        }
        if(props.app.checkbox10){
            reasons.push('I watch the weeknight games regardless of the teams playing.');  
        }
        if(props.app.checkbox11){
            reasons.push('I gamble or participate in contests trying to predict the outcome of games and follow my progress as games go on.');  
        }
        if(props.app.checkbox12){
            reasons.push('My experience as a basketball player, coach, or referee tends to guide my focus.');  
        }
    }


    // let favoriteTeam = getTeam(props.app.favoriteTeam);
    // console.log(getTeam(props.app.favoriteTeam));
    return props.user ? (
        <div>
            <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={props.user.name}></Navbar>

            <h1>Application Submitted!</h1>
            <h2>{props.user.name}&apos;s Application</h2>
            <p>Favorite Team: {props.favTeam}</p>
            <p>Secondary Team: {props.favTeam2}</p>
            <p>Tertiary Team: {props.favTeam3}</p>

            <h3>In which of the following ways do you inform your opinion of basketball teams?</h3>
            <ul>
                {reasons.map(reason => {
                    return (
                        <li key={reason}>{reason}</li>
                    );
                })}
            </ul>

            <h3>Approach</h3>
            <p>{props.app.approach}</p>
            <h3>Extra</h3>
            <p>{props.app.extra}</p>


            <h2>{props.user.name}&apos;s Preseason ballot</h2>
            <br/>
            <table className="userTable">
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Reason</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td><Image src={props.urlOne} width={25} height={25} alt={props.rankOne}></Image> <span className="boldText">{props.rankOne}</span> </td>
                        <td>{props.ballot.one.reasoning}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><Image src={props.urlTwo} width={25} height={25} alt={props.rankTwo}></Image> <span className="boldText">{props.rankTwo}</span> </td>
                        <td>{props.ballot.two.reasoning}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td><Image src={props.urlThree} width={25} height={25} alt={props.rankThree}></Image> <span className="boldText">{props.rankThree}</span> </td>
                        <td>{props.ballot.three.reasoning}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td><Image src={props.urlFour} width={25} height={25} alt={props.rankFour}></Image> <span className="boldText">{props.rankFour}</span> </td>
                        <td>{props.ballot.four.reasoning}</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td><Image src={props.urlFive} width={25} height={25} alt={props.rankFive}></Image> <span className="boldText">{props.rankFive}</span> </td>
                        <td>{props.ballot.five.reasoning}</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td><Image src={props.urlSix} width={25} height={25} alt={props.rankSix}></Image> <span className="boldText">{props.rankSix}</span> </td>
                        <td>{props.ballot.six.reasoning}</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td><Image src={props.urlSeven} width={25} height={25} alt={props.rankSeven}></Image> <span className="boldText">{props.rankSeven}</span> </td>
                        <td>{props.ballot.seven.reasoning}</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td><Image src={props.urlEight} width={25} height={25} alt={props.rankEight}></Image> <span className="boldText">{props.rankEight}</span> </td>
                        <td>{props.ballot.eight.reasoning}</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td><Image src={props.urlNine} width={25} height={25} alt={props.rankNine}></Image> <span className="boldText">{props.rankNine}</span> </td>
                        <td>{props.ballot.nine.reasoning}</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td><Image src={props.urlTen} width={25} height={25} alt={props.rankTen}></Image> <span className="boldText">{props.rankTen}</span> </td>
                        <td>{props.ballot.ten.reasoning}</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td><Image src={props.urlEleven} width={25} height={25} alt={props.rankEleven}></Image> <span className="boldText">{props.rankEleven}</span> </td>
                        <td>{props.ballot.eleven.reasoning}</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td><Image src={props.urlTwelve} width={25} height={25} alt={props.rankTwelve}></Image> <span className="boldText">{props.rankTwelve}</span> </td>
                        <td>{props.ballot.twelve.reasoning}</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td><Image src={props.urlThirteen} width={25} height={25} alt={props.rankThirteen}></Image> <span className="boldText">{props.rankThirteen}</span> </td>
                        <td>{props.ballot.thirteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td><Image src={props.urlFourteen} width={25} height={25} alt={props.rankFourteen}></Image> <span className="boldText">{props.rankFourteen}</span> </td>
                        <td>{props.ballot.fourteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td><Image src={props.urlFifteen} width={25} height={25} alt={props.rankFifteen}></Image> <span className="boldText">{props.rankFifteen}</span> </td>
                        <td>{props.ballot.fifteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>16</td>
                        <td><Image src={props.urlSixteen} width={25} height={25} alt={props.rankSixteen}></Image> <span className="boldText">{props.rankSixteen}</span> </td>
                        <td>{props.ballot.sixteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>17</td>
                        <td><Image src={props.urlSeventeen} width={25} height={25} alt={props.rankSeventeen}></Image> <span className="boldText">{props.rankSeventeen}</span> </td>
                        <td>{props.ballot.seventeen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>18</td>
                        <td><Image src={props.urlEighteen} width={25} height={25} alt={props.rankEighteen}></Image> <span className="boldText">{props.rankEighteen}</span> </td>
                        <td>{props.ballot.eighteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>19</td>
                        <td><Image src={props.urlNineteen} width={25} height={25} alt={props.rankNineteen}></Image> <span className="boldText">{props.rankNineteen}</span> </td>
                        <td>{props.ballot.nineteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>20</td>
                        <td><Image src={props.urlTwenty} width={25} height={25} alt={props.rankTwenty}></Image> <span className="boldText">{props.rankTwenty}</span> </td>
                        <td>{props.ballot.twenty.reasoning}</td>
                    </tr>
                    <tr>
                        <td>21</td>
                        <td><Image src={props.urlTwentyOne} width={25} height={25} alt={props.rankTwentyOne}></Image> <span className="boldText">{props.rankTwentyOne}</span> </td>
                        <td>{props.ballot.twentyOne.reasoning}</td>
                    </tr>
                    <tr>
                        <td>22</td>
                        <td><Image src={props.urlTwentyTwo} width={25} height={25} alt={props.rankTwentyTwo}></Image> <span className="boldText">{props.rankTwentyTwo}</span> </td>
                        <td>{props.ballot.twentyTwo.reasoning}</td>
                    </tr>
                    <tr>
                        <td>23</td>
                        <td><Image src={props.urlTwentyThree} width={25} height={25} alt={props.rankTwentyThree}></Image> <span className="boldText">{props.rankTwentyThree}</span> </td>
                        <td>{props.ballot.twentyThree.reasoning}</td>
                    </tr>
                    <tr>
                        <td>24</td>
                        <td><Image src={props.urlTwentyFour} width={25} height={25} alt={props.rankTwentyFour}></Image> <span className="boldText">{props.rankTwentyFour}</span> </td>
                        <td>{props.ballot.twentyFour.reasoning}</td>
                    </tr>
                    <tr>
                        <td>25</td>
                        <td><Image src={props.urlTwentyFive} width={25} height={25} alt={props.rankTwentyFive}></Image> <span className="boldText">{props.rankTwentyFive}</span> </td>
                        <td>{props.ballot.twentyFive.reasoning}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Overall Rationale</h3>
            <p>{props.ballot.overallReasoning}</p>
            
            <div className="submitBallot">
                <Link href='/application'>
                    <button type='button'>Edit</button> 
                </Link> 
            </div>
        </div>
    )
    :
    (
        <div>
            <Home></Home>
            {/* <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png"></Navbar>
            <p>Please login</p> */}
        </div>
    );
}

const REDIRECT_URI = "http://localhost:3000/profile";
const RANDOM_STRING = "randomstringhere";
const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

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
    //   let app = await getApp(user);
    //   console.log('app:', app);
    //   let ballot = await getBallot(user);
    //   let favTeam = await getTeamProp(app.favoriteTeam);

    //   return { props: { user, app, ballot, favTeam } };
        let info = await getData(user);
        return info;
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
    //   let app = await getApp(user);
    //   console.log('app:', app);
    //   let ballot = await getBallot(user);
    //   let favTeam = await getTeamProp(app.favoriteTeam);
    //   //let favTeam = await t1.json();
    //   return { props: { user, app, ballot, favTeam} };
        let info = await getData(user);
        return info;
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
    //   let app = await getApp(user);
    //   console.log('app:', app);
    //   let ballot = await getBallot(user);
    //   let favTeam = await getTeamProp(app.favoriteTeam);
    //   //let favTeam = await t1.json();
    //   return { props: { user, app, ballot, favTeam } };
        let info = await getData(user);
        return info;
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
  const data = await axios.get("https://oauth.reddit.com/api/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
      content_type: "application/json",
    },
  });

  return data.data;
};

const getApp = async (user) => {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('FETCHING APP');
    const app = await Application.findOne({'user': user.name});
    const userApp = JSON.parse(JSON.stringify(app));
    console.log('FETCHED APP');
    return userApp;
}

const getBallot = async (user) => {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('FETCHING BALLOT');
    const ballot = await UserBallot.findOne({'user': user.name, 'week': "Pre-Season"});
    const userBallot = JSON.parse(JSON.stringify(ballot));
    console.log('FETCHED BALLOT');
    return userBallot;
}

const getTeamProp = async (teamId, prop) => {
    let teamObj = await TeamData.findOne({_id: teamId});
    if(teamObj){
        let parsedTeamObj = JSON.parse(JSON.stringify(teamObj));
        if(prop === 'name'){
            parsedTeamObj = parsedTeamObj.name;
        }
        else if(prop === 'shortName'){
            parsedTeamObj = parsedTeamObj.shortName;
        }
        else if(prop === 'url'){
            parsedTeamObj = parsedTeamObj.url;
        }
        else{
            return null;
        }
        
        return parsedTeamObj;
    }
    else {
        return null;
    }
}

const getData = async (user) => {
    let app = await getApp(user);
    console.log('app:', app);
    let ballot = await getBallot(user);
    let favTeam = await getTeamProp(app.favoriteTeam, "shortName");
    let favTeam2 = await getTeamProp(app.favoriteTeam2, "shortName");
    let favTeam3 = await getTeamProp(app.favoriteTeam3, "shortName");

    let rankOne = await getTeamProp(ballot.one.id, "shortName");
    let urlOne = await getTeamProp(ballot.one.id, "url");

    let rankTwo = await getTeamProp(ballot.two.id, "shortName");
    let urlTwo = await getTeamProp(ballot.two.id, "url");

    let rankThree = await getTeamProp(ballot.three.id, "shortName");
    let urlThree = await getTeamProp(ballot.three.id, "url");

    let rankFour = await getTeamProp(ballot.four.id, "shortName");
    let urlFour = await getTeamProp(ballot.four.id, "url");

    let rankFive = await getTeamProp(ballot.five.id, "shortName");
    let urlFive = await getTeamProp(ballot.five.id, "url"); 

    let rankSix = await getTeamProp(ballot.six.id, "shortName");
    let urlSix = await getTeamProp(ballot.six.id, "url"); 

    let rankSeven = await getTeamProp(ballot.seven.id, "shortName");
    let urlSeven = await getTeamProp(ballot.seven.id, "url");

    let rankEight = await getTeamProp(ballot.eight.id, "shortName");
    let urlEight = await getTeamProp(ballot.eight.id, "url");

    let rankNine = await getTeamProp(ballot.nine.id, "shortName");
    let urlNine = await getTeamProp(ballot.nine.id, "url");

    let rankTen = await getTeamProp(ballot.ten.id, "shortName");
    let urlTen = await getTeamProp(ballot.ten.id, "url");

    let rankEleven = await getTeamProp(ballot.eleven.id, "shortName");
    let urlEleven = await getTeamProp(ballot.eleven.id, "url");

    let rankTwelve = await getTeamProp(ballot.twelve.id, "shortName");
    let urlTwelve = await getTeamProp(ballot.twelve.id, "url");

    let rankThirteen = await getTeamProp(ballot.thirteen.id, "shortName");
    let urlThirteen = await getTeamProp(ballot.thirteen.id, "url");

    let rankFourteen = await getTeamProp(ballot.fourteen.id, "shortName");
    let urlFourteen = await getTeamProp(ballot.fourteen.id, "url");

    let rankFifteen = await getTeamProp(ballot.fifteen.id, "shortName");
    let urlFifteen = await getTeamProp(ballot.fifteen.id, "url");

    let rankSixteen = await getTeamProp(ballot.sixteen.id, "shortName");
    let urlSixteen = await getTeamProp(ballot.sixteen.id, "url");

    let rankSeventeen = await getTeamProp(ballot.seventeen.id, "shortName");
    let urlSeventeen = await getTeamProp(ballot.seventeen.id, "url");

    let rankEighteen = await getTeamProp(ballot.eighteen.id, "shortName");
    let urlEighteen = await getTeamProp(ballot.eighteen.id, "url");

    let rankNineteen = await getTeamProp(ballot.nineteen.id, "shortName");
    let urlNineteen = await getTeamProp(ballot.nineteen.id, "url");

    let rankTwenty = await getTeamProp(ballot.twenty.id, "shortName");
    let urlTwenty = await getTeamProp(ballot.twenty.id, "url");

    let rankTwentyOne = await getTeamProp(ballot.twentyOne.id, "shortName");
    let urlTwentyOne = await getTeamProp(ballot.twentyOne.id, "url");

    let rankTwentyTwo = await getTeamProp(ballot.twentyTwo.id, "shortName");
    let urlTwentyTwo = await getTeamProp(ballot.twentyTwo.id, "url");

    let rankTwentyThree = await getTeamProp(ballot.twentyThree.id, "shortName");
    let urlTwentyThree = await getTeamProp(ballot.twentyThree.id, "url");

    let rankTwentyFour = await getTeamProp(ballot.twentyFour.id, "shortName");
    let urlTwentyFour = await getTeamProp(ballot.twentyFour.id, "url");

    let rankTwentyFive = await getTeamProp(ballot.twentyFive.id, "shortName");
    let urlTwentyFive = await getTeamProp(ballot.twentyFive.id, "url");

    return { props: { user, app, ballot, favTeam, favTeam2, favTeam3, rankOne, urlOne, rankTwo, urlTwo, rankThree, urlThree,
                        rankFour, urlFour, rankFive, urlFive, rankSix, urlSix, rankSeven, urlSeven, rankEight, urlEight, rankNine,
                        urlNine, rankTen, urlTen, rankEleven, urlEleven, rankTwelve, urlTwelve, rankThirteen, urlThirteen, rankFourteen,
                        urlFourteen, rankFifteen, urlFifteen, rankSixteen, urlSixteen, rankSeventeen, urlSeventeen, rankEighteen, 
                        urlEighteen, rankNineteen, urlNineteen, rankTwenty, urlTwenty, rankTwentyOne, urlTwentyOne, rankTwentyTwo,
                        urlTwentyTwo, rankTwentyThree, urlTwentyThree, rankTwentyFour, urlTwentyFour, rankTwentyFive, urlTwentyFive
                    } };    
}

