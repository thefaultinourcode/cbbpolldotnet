import React from "react";
import axios, { Axios } from "axios";
import querystring from "querystring";
//import Link from "next/link";
import Navbar from "./components/navbar";
import { connectMongo } from "../utils/connect";
import User from "../models/User";

import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

export default function Profile({ user }) {
  return user !== "Sign In" ? (
    <>
      <Navbar cbbLogo="/../public/img/CBBlogo2.png" homefieldLogo="/../public/img/SponsoredByHomefield.png" user={user.name}></Navbar>
      <div className="profile">
      
        <h1>
          {/* <img src={user.snoovatar_img} width="50" height="64"/>  */}
          Welcome {user.name} 
        </h1>
        
        <div>
          <h2>Official voter profiles coming soon! Apply <a href='./application'>here</a> to be an official voter.</h2>
        </div>
        {/* <a href='./voterForm'>Poll</a>
        <a href='./application'>Poll Vote Application</a>
        <Link href={{
          pathname: "voterForm",
          query: {user: user.name}
        }}>
          Test
        </Link> */}
      </div>
    </>
  ) : (
    <div>
        <Navbar cbbLogo="/../public/img/CBBlogo2.png" homefieldLogo="/../public/img/SponsoredByHomefield.png"></Navbar>
        <p>Please login</p>
    </div>

  );
}

const REDIRECT_URI = "http://localhost:3000/profile";
//const REDIRECT_URI = "http://cbbpolldotnet.vercel.app/profile";
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
      insertUser(user);
      return { props: { user } };
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
      insertUser(user);
      return { props: { user } };
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
      insertUser(user);
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
  const data = await axios.get("https://oauth.reddit.com/api/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
      content_type: "application/json",
    },
  });

  return data.data;
};

const insertUser = async (user) => {
  console.log('CONNECTING TO MONGO')
  await connectMongo();
  console.log('CONNECTED TO MONGO')

  let userRecord = await User.findOne({'user': user.name});

  if(userRecord === null){
    console.log('user is empty');
    console.log('CREATING DOCUMENT');
    console.log(userRecord)
    const document = await User.create({'name': user.name, 'pollVoter': false});
    console.log('CREATED DOCUMENT');
  }
}