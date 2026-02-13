import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import React from "react";
import axios, { Axios } from "axios";
import querystring from "querystring";
import { connectMongo } from "../../utils/connect";
import Application from "../../models/ApplicationData";
import User from "../../models/User";
import {DateTime, Interval} from 'luxon';

export default function SetDates(props){
    let modlist = ['broadwaystarVGC', 'SleveMcDichael4'];
    
    let apps = props.apps;
    let users = props.users;

    let usersApplied = [];
    apps.map(element => usersApplied.push(element.user));

    let usersInDB = [];
    users.map(element => usersInDB.push(element.name));


    //applications should open on Friday at 11:59pm Eastern
    //applications should close on Friday

    //pre-season poll should post on Monday

    //Weekly ballots should open on Saturday
    //Weekly ballots should close on Monday
    //Weekly polls should post on Monday

    //Post season ballots should open on ?Tuesday?
    //Post season ballots should post on ?Monday?


    function processInput(dateInput, flag){
      const dateObj = formatDate(dateInput, flag);
      const day = getWeekday(dateObj);
    }

    function getWeekday(dateObj){
      const day = DateTime.fromObject(dateObj, { zone: 'America/New_York'});
      return day.weekdayLong;
    }

    function formatDate(date, flag){
      let numbers = date.split('-');
      let dateObj = {
        year:Number(numbers[0]),
        month:Number(numbers[1]),
        day:Number(numbers[2])
      }

      if(flag==="preseason"){
        dateObj["hour"] = 23;
        dateObj["minute"] = 59;
      }
      else if(flag==="open"){
        dateObj["hour"] = 10;
        dateObj["minute"] = 0;
      }
      else if(flag==="close"){
        dateObj["hour"] = 9;
        dateObj["minute"] = 59;
      }

      return dateObj;
    }

    //TODO: Add input validation for ease of use
    async function handleSubmit(e){
      e.preventDefault();
      let validInput = true;
      
      const zone = { zone: 'America/New_York'};

      const preseasonOpen = e.target.preseasonOpen.value;
      let preseasonOpenObj = formatDate(preseasonOpen,"preseason");
      console.log('preseasonOpenObj:', preseasonOpenObj);
      let preseasonOpenDay = getWeekday(preseasonOpenObj);
      console.log('preseasonOpenDay:', preseasonOpenDay);
      if(preseasonOpenDay !== 'Friday'){
        alert('Applications must open on a Friday');
        validInput = false;
      }

      const preseasonClose = e.target.preseasonClose.value;
      let preCloseObj = formatDate(preseasonClose,"preseason");
      console.log("preCloseObj:", preCloseObj);
      const preseasonCloseDay = getWeekday(preCloseObj);
      if(preseasonCloseDay !== 'Friday'){
        alert('Applications must close on a Friday');
        validInput = false;
      }
      const formatOpen = formatDate(preseasonClose,"open");
      const showPreseasonPoll = DateTime.fromObject(formatOpen,{ zone: 'America/New_York'}).plus({days:3});
      console.log('postPreseasonPoll:', showPreseasonPoll);
      console.log(showPreseasonPoll.toLocaleString(DateTime.DATETIME_FULL))

      const seasonOpen = e.target.seasonOpen.value;
      let seasonOpenObj = formatDate(seasonOpen,"open");
      console.log("seasonObjectObj:", seasonOpenObj);
      const seasonOpenDay = getWeekday(seasonOpenObj);

      if(seasonOpenDay !== 'Monday'){
        alert('The regular season must start on a Monday.');
        validInput = false;
      }
      
      const seasonClose = e.target.seasonClose.value;
      let seasonCloseObj = formatDate(seasonClose,"close");
      console.log("seasonCloseObj:", seasonCloseObj);
      const seasonCloseDay = getWeekday(seasonCloseObj);
      if(seasonCloseDay !== 'Sunday'){
        alert('The regular season must end on a Sunday');
      }

      const postSeasonOpen = e.target.postseasonOpen.value;
      const postSeasonOpenObj = formatDate(postSeasonOpen,"open");
      console.log("postSeasonOpenObj:", postSeasonOpenObj);
      const postSeasonOpenDay = getWeekday(postSeasonOpenObj);
      if(postSeasonOpenDay !== 'Tuesday'){
        alert('The post-season poll must open on a Tuesday');
      }

      const postSeasonClose = e.target.postseasonClose.value;
      const postSeasonCloseObj = formatDate(postSeasonClose,"close");
      console.log("postSeasonCloseObj:", postSeasonCloseObj);
      const postSeasonCloseDay = getWeekday(postSeasonCloseObj);
      if(postSeasonCloseDay !== 'Thursday'){
        alert('The post-season poll must close on a Thursday.');
      }

      let postseasonInterval = Interval.fromDateTimes(DateTime.fromObject(postSeasonOpenObj, zone),
    DateTime.fromObject(postSeasonCloseObj, zone));
    console.log('postseason interval:', postseasonInterval);
    console.log('interval:', postseasonInterval.length("hours"));
    if(postseasonInterval.length("hours") > 48){
      alert('The post-season interval must be 48 hours');
    }

      if(validInput){
      let seasonDates = {
        season: props.season,
        preseasonDates: {
          open: e.target.preseasonOpen.value,
          close: e.target.preseasonClose.value
        },
        seasonDates: {
          open: e.target.seasonOpen.value,
          close: e.target.seasonClose.value
        },
        postseasonDates: {
          open: e.target.postseasonOpen.value,
          close: e.target.postseasonClose.value
        }
      }

      console.log('seasonDates:', seasonDates);

      //data structure that has open date, close date, and week
      //go from start to end

      const res = await fetch('/api/addSeasonDates',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            seasonDates
        ),
      });

      const data = await res.json();
      }
      

    }

    if(modlist.includes(props.user.name)){
        
        for(const app of apps){
            let foundUser = users.find(element => element.name === app.user);
            if(foundUser != null){
                if(foundUser.pollVoter){
                    app.pollVoter = "yes";
                }
                else{
                    app.pollVoter = "no";
                }
            }
            else{
                app.pollVoter = "Not in DB";
            }
    
        }

        return(
            <div>
                <br/>
                <h1>Set Season Dates</h1>
                <form id="seasonDates" onSubmit={handleSubmit}>
                  <label>Season: {props.season}</label>
                  <br/>
                  <br/>
                  <label>Pre-Season Poll Opening: <input id="preseasonOpen" type="date"></input></label>
                  <label>Pre-Season Poll Closing: <input id="preseasonClose" type="date"></input></label>
                  <br/>
                  <br/>
                  <label>Season Poll Opening: <input id="seasonOpen" type="date"></input></label>
                  <label>Season Poll Closing: <input id="seasonClose" type="date"></input></label>
                  <br/>
                  <br/>
                  <label>Post-Season Poll Opening: <input id="postseasonOpen" type="date"></input></label>
                  <label>Post-Season Poll Closing: <input id="postseasonClose" type="date"></input></label>
                  <br/>
                  <button type="submit">Submit</button>
                </form>
            </div>  
        );   
    }
    else{
        return(
            <div>
                <h1>{props.user.name} is not an admin</h1>
            </div>
        );
    }

}

const REDIRECT_URI = "http://localhost:3000/profile";
//const REDIRECT_URI = "http://cbbpoll.net/profile";

const RANDOM_STRING = "randomstringhere";
const CLIENT_ID = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID;
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
  
    const season = getSeason();

    if (refresh_token) {
      if (access_token) {
        const user = await getUser(access_token);
        let apps = await getApps();
        let users = await getUsers();
        return { props: { user, apps, users, season } };
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
        let apps = await getApps();
        let users = await getUsers();
        return { props: { user, apps, users, season } };
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
        let apps = await getApps();
        let users = await getUsers();
        return { props: { user, apps, users, season } };
      } catch (e) {
        console.log(e);
        return { props: { user: null, apps:null, users: null, season } };
      }
    } else {
      console.log('else');
      return { props: { user: null, apps: null, users: null, season }};
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
  
  const getApps = async () => {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('FETCHING APP');
    const app = await Application.find({season:2024});
    const userApp = JSON.parse(JSON.stringify(app));
    console.log('userApp:', userApp);
    console.log('FETCHED APP');
    return userApp;
  }

  const getUsers = async () => {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('FETCHING APP');
    const users = await User.find({});
    const userList = JSON.parse(JSON.stringify(users));
    console.log('userList:', userList);
    console.log('FETCHED APP');
    return userList;
  }

  const getSeason = () => {
    const today = new Date();

    let season;

    if(today.getMonth() >= 9){
      season = today.getFullYear() + 1;
    }
    else{
      season = today.getFullYear();
    }

    return season;
  }