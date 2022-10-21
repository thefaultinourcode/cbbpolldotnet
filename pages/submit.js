import React from "react";
import axios, { Axios } from "axios";
import querystring from "querystring";
import { connectMongo } from "../utils/connect";
import UserBallot from "../models/UserBallot";
import Application from "../models/ApplicationData";
import Navbar from "./components/navbar";
import TeamData from "../models/TeamData";

import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
//import { get } from "http";

export default function Submit(props){



    let reasons = [];
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

    // let favoriteTeam = getTeam(props.app.favoriteTeam);
    // console.log(getTeam(props.app.favoriteTeam));
    return(
        <div>
            <Navbar cbbLogo="/../public/img/CBBlogo2.png" homefieldLogo="/../public/img/SponsoredByHomefield.png" user={props.user.name}></Navbar>

            <h1>Application Submitted!</h1>
            <h2>{props.user.name}'s Application</h2>
            <p>Favorite Team: {props.favTeam}</p>
            <p>Secondary Team: {props.favTeam2}</p>
            <p>Tertiary Team: {props.favTeam3}</p>

            <h3>In which of the following ways do you inform your opinion of basketball teams?</h3>
            <ul>
                {reasons.map(reason => {
                    return (
                        <li>{reason}</li>
                    );
                })}
            </ul>

            <h3>Approach</h3>
            <p>{props.app.approach}</p>
            <h3>Extra</h3>
            <p>{props.app.extra}</p>


            <h2>{props.user.name}'s Preseason ballot</h2>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Reasoning</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>{props.ballot.one.name}</td>
                        <td>{props.ballot.one.reasoning}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>{props.ballot.two.name}</td>
                        <td>{props.ballot.two.reasoning}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>{props.ballot.three.name}</td>
                        <td>{props.ballot.three.reasoning}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>{props.ballot.four.name}</td>
                        <td>{props.ballot.four.reasoning}</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>{props.ballot.five.name}</td>
                        <td>{props.ballot.five.reasoning}</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>{props.ballot.six.name}</td>
                        <td>{props.ballot.six.reasoning}</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>{props.ballot.seven.name}</td>
                        <td>{props.ballot.seven.reasoning}</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>{props.ballot.eight.name}</td>
                        <td>{props.ballot.eight.reasoning}</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>{props.ballot.nine.name}</td>
                        <td>{props.ballot.nine.reasoning}</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>{props.ballot.ten.name}</td>
                        <td>{props.ballot.ten.reasoning}</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>{props.ballot.eleven.name}</td>
                        <td>{props.ballot.eleven.reasoning}</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>{props.ballot.twelve.name}</td>
                        <td>{props.ballot.twelve.reasoning}</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>{props.ballot.thirteen.name}</td>
                        <td>{props.ballot.thirteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td>{props.ballot.fourteen.name}</td>
                        <td>{props.ballot.fourteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td>{props.ballot.fifteen.name}</td>
                        <td>{props.ballot.fifteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>16</td>
                        <td>{props.ballot.sixteen.name}</td>
                        <td>{props.ballot.sixteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>17</td>
                        <td>{props.ballot.seventeen.name}</td>
                        <td>{props.ballot.seventeen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>18</td>
                        <td>{props.ballot.eighteen.name}</td>
                        <td>{props.ballot.eighteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>19</td>
                        <td>{props.ballot.nineteen.name}</td>
                        <td>{props.ballot.nineteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>20</td>
                        <td>{props.ballot.twenty.name}</td>
                        <td>{props.ballot.twenty.reasoning}</td>
                    </tr>
                    <tr>
                        <td>21</td>
                        <td>{props.ballot.twentyOne.name}</td>
                        <td>{props.ballot.twentyOne.reasoning}</td>
                    </tr>
                    <tr>
                        <td>22</td>
                        <td>{props.ballot.twentyTwo.name}</td>
                        <td>{props.ballot.twentyTwo.reasoning}</td>
                    </tr>
                    <tr>
                        <td>23</td>
                        <td>{props.ballot.twentyThree.name}</td>
                        <td>{props.ballot.twentyThree.reasoning}</td>
                    </tr>
                    <tr>
                        <td>24</td>
                        <td>{props.ballot.twentyFour.name}</td>
                        <td>{props.ballot.twentyFour.reasoning}</td>
                    </tr>
                    <tr>
                        <td>25</td>
                        <td>{props.ballot.twentyFive.name}</td>
                        <td>{props.ballot.twentyFive.reasoning}</td>
                    </tr>
                </tbody>
            </table>
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
    //   let favTeam = await getTeamName(app.favoriteTeam);

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
    //   let favTeam = await getTeamName(app.favoriteTeam);
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
    //   let favTeam = await getTeamName(app.favoriteTeam);
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

const getTeamName = async (teamId) => {
    let teamObj = await TeamData.findOne({_id: teamId});
    if(teamObj){
        let parsedTeamObj = JSON.parse(JSON.stringify(teamObj));
        parsedTeamObj = parsedTeamObj.name;
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
    let favTeam = await getTeamName(app.favoriteTeam);
    let favTeam2 = await getTeamName(app.favoriteTeam2);
    let favTeam3 = await getTeamName(app.favoriteTeam3);

    return { props: { user, app, ballot, favTeam, favTeam2, favTeam3 } };    
}