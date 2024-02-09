import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import React from "react";
import axios, { Axios } from "axios";
import querystring from "querystring";
import { connectMongo } from "../../utils/connect";
import Application from "../../models/ApplicationData";
import User from "../../models/User";
import Link from 'next/link'


export default function SetDates(props){
    let modlist = ['broadwaystarVGC', 'SleveMcDichael4', 'DEP61'];
    
    let apps = props.apps;
    let users = props.users;

    let usersApplied = [];
    apps.map(element => usersApplied.push(element.user));

    let usersInDB = [];
    users.map(element => usersInDB.push(element.name));

    async function handleSubmit(e){
      e.preventDefault();
      let seasonDates = {
        season: e.target.season.value,
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
                  <label>Season: <input id="season" type="text"></input></label>
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
  
    if (refresh_token) {
      if (access_token) {
        const user = await getUser(access_token);
        let apps = await getApps();
        let users = await getUsers();
        return { props: { user, apps, users } };
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
        return { props: { user, apps, users } };
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
        return { props: { user, apps, users } };
      } catch (e) {
        console.log(e);
        return { props: { user: null, apps:null, users: null } };
      }
    } else {
      console.log('else');
      return { props: { user: null, apps: null, users: null }};
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