import TeamRow from "../components/teamrow";
import React from "react";
import axios, { Axios } from "axios";
import querystring from "querystring";
import { connectMongo } from "../utils/connect";
import UserBallot from "../models/UserBallot";
import Link from 'next/link';

import Navbar from "../components/navbar";
import TeamData from "../models/TeamData";
// import Image from 'next/image';

import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

const DURATION = "permanent";
const SCOPE = "identity";
const RESPONSE_TYPE = "code";


const REDIRECT_URI = process.env.REDIRECT_URI;
//const REDIRECT_URI = "http://cbbpoll.net/profile";

const RANDOM_STRING = "randomstringhere";
const CLIENT_ID = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;



const URL = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`;


export default function BallotView(props){    
    if(!props.user){
        return(
            <div>
                <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png"></Navbar>
                <h1>Please login</h1>
            </div>
        )
    }

    console.log('ballot:', props.ballot);
    console.log('urls:', props.urls);

    let teams = [];
    for(let i = 1; i <=25; i++){
        teams.push(<TeamRow rank={i} reasoning={props.ballot[i].reasoning} name={props.ballot[i].name} url={props.urls[i]}></TeamRow>)
    }

    return(
        <div>
            <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={props.user.name}></Navbar>
            <h1>{props.user.name}&apos;s Ballot</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Reasoning</th>
                    </tr>
                    {teams.map((row) => row)}
                </tbody>
            </table>
            <h2>Overall Rationale</h2>
            {props.ballot.overallReasoning}
            <div className="submitBallot">
                <Link href='/ballotBox'>
                    <button type='button'>Edit</button> 
                </Link> 
            </div>
        </div>
        
    );

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
      //   let app = await getApp(user);
      //   console.log('app:', app);
        let ballot = await getBallot(user);
        let urls = await getURLs(ballot);
      //   let favTeam = await getTeamProp(app.favoriteTeam);
  
      //   return { props: { user, app, ballot, favTeam } };
          //let info = await getData(user);
          return {props: {user:user, ballot: ballot, urls: urls}};
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
        //let info = await getData(user);
        let ballot = await getBallot(user);
        return {props: {user:user, ballot: ballot, urls: urls}};
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
        let ballot = await getBallot(user);
      //   let favTeam = await getTeamProp(app.favoriteTeam);
      //   //let favTeam = await t1.json();
      //   return { props: { user, app, ballot, favTeam } };
          //let info = await getData(user);
          return {props: {user:user, ballot: ballot, urls: urls}};
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

  const getBallot = async (user) => {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('FETCHING BALLOT');
    const ballot = await UserBallot.findOne({'user': user.name, 'week': 2});
    const userBallot = JSON.parse(JSON.stringify(ballot));
    console.log('FETCHED BALLOT');
    return userBallot;
}

const getURLs = async (ballot) => {
    let urls = {};
    for(let i = 1; i <= 25; i++){
        let team = await TeamData.findOne({_id: ballot[i].id});
        let url = team.url;
        urls[i] = url;
    }
    console.log('urls:', urls);

    return urls;
}