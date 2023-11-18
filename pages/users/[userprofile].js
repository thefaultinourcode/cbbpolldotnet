import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import axios, { Axios } from "axios";
import querystring from "querystring";
import Navbar from "../../components/navbar";
import { useRouter } from 'next/router';
import { getUserInfo, getTeam, getProfileBallots } from "../../utils/getData";
import Link from 'next/link';
import Image from 'next/image';
import { getCloseDate, getSeasonCheckDate, getWeek, getPriorWeek } from "../../utils/getDates";

export default function UserProfile (props){
    //this gets an object with the username passed into the URL
    //profile.userprofile has the username
    const router = useRouter();
    let profile = router.query;
    //username passed in from reddit account
    let user;
    if(props.user){
      user = props.user.name;
    }
    else{
      user = null;
    }
    console.log(props);


    //profileData - Object
        // name: String,
        // primaryTeam: String,
        // secondaryTeam: String,
        // tertiaryTeam: String,
        // pollVoter: Boolean
    let profileData = props.profile;

    //TeamData - Object
        //  _id: Number,
        //   name: String,
        //   shortName: String,
        //   nickname: String,
        //   codes: [String],
        //   conference: String,
        //   allTimeApVotes: Number,
        //   url: String
    let primaryTeam = props.primaryTeam;
    let secondaryTeam = props.secondaryTeam;
    let tertiaryTeam = props.tertiaryTeam;

    // // This object is tricky - ask Leah for help if you need more detail
        // _id: String,
        // user: String,
        // week: String,
    let ballots = props.profileBallots;

    //rework this into something better
    let ballots2023 = [];
    let ballots2024 = [];
    for(let i = 0; i < ballots.length; i++){
      if(!ballots[i].hasOwnProperty('season')){
        let pollDate = new Date(ballots[i].date);
        let seasonDate = getSeasonCheckDate();
        if(pollDate > seasonDate){
          ballots2024.push(ballots[i])
        }
        else{
          ballots2023.push(ballots[i]);
        }
      }
      else{
        ballots2023.push(ballots[i]);
      }
    }
  

    //this iterates through the list of ballots and creates am array of link components that can be passed to the webpage
    //this can be expanded to include more tags for the styling that you want
    let ballotArray2023 = [];
    let ballotLength2023 = ballots2023.length;
    
    for(let i = 0; i < ballotLength2023; i++ ){
      let link = <tr key={ballots2023[i]._id} className="ballotCell"><td><Link href={`/ballots/${ballots2023[i].week}/${ballots2023[i]._id}`}><a>Week {ballots2023[i].week}</a></Link></td></tr>
      ballotArray2023.push(link);
    }

    
    let ballotArray2024 = [];
    let ballotLength2024;

    //display new week

    //get the date when the ballot is supposed to display
    //get the current date
    //display latest week if current
    //hide if poll is still open



    //update
    let week;
    let displayDate = getCloseDate();
    let today = new Date();

    let display;
    if(today >= displayDate){
      week = getWeek();
      display = true;
    }
    else{
      week = getPriorWeek();
      display = false;
    }


    // ballotLength = ballots.length;
    //find a more efficient way to do this
    if(!display){
      let week = getWeek();
      for(let i = 0; i < ballots2024.length; i++){
        if(ballots2024[i].week == week){
          let index = ballots2024.indexOf(ballots2024[i]);
          if(index > -1){
            ballots2024.splice(index,1);
          }
        }
      }
    }
    
    for(let i = 0; i < ballots2024.length; i++ ){
        let link = <tr key={ballots2024[i]._id} className="ballotCell"><td><Link href={`/ballots/${ballots2024[i].week}/${ballots2024[i]._id}`}><a>Week {ballots2024[i].week}</a></Link></td></tr>
        ballotArray2024.push(link);
    }

    let navbar;
    if(user){
        navbar = <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={user}></Navbar> 
    }
    else{
        navbar = <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png"></Navbar>
    }
    let verified;
    if(profileData.pollVoter){
      verified=<Image src="/static/OfficialVoterCheckmark.png" alt="Official Voter Checkmark" width={40} height={40}></Image>
    }
    else{
      verified='';
    }

    let alsoSupports;
    if(secondaryTeam && tertiaryTeam){
      alsoSupports = <h2>Also supports: <Image src={secondaryTeam.url} width={30} height={30}></Image> <Image src={tertiaryTeam.url} width={30} height={30}></Image></h2>

    }
    else if(secondaryTeam){
      alsoSupports = <h2>Also supports: <Image src={secondaryTeam.url} width={30} height={30}></Image> </h2>

    }
    else{
     alsoSupports = ''; 
    }

    //here's where you put html and React components
    return(
    //everything goes between these div tags
    <div>
        {navbar}
        <h1>{verified} <Image src={primaryTeam.url} width={40} height={40}></Image> {profile.userprofile}</h1>
        {alsoSupports}
        <table id='profileTable'>
          <tbody>
            <tr>
              <th>2024 Ballots</th>
            </tr>
            {ballotArray2024.map(ballot => ballot)}
            <tr>
              <th>2023 Ballots</th>
            </tr>
            {ballotArray2023.map(ballot => ballot)}
          </tbody>
        </table>
    </div>)
}

//BACKEND CODE BEGINS HERE

//Reddit login code
//const REDIRECT_URI = "http://localhost:3000/profile";
const REDIRECT_URI = "http://cbbpoll.net/profile";

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
  
    if (refresh_token) {
      if (access_token) {
        let propData = await getPropData(access_token, query.userprofile);
        return { props:  propData };
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
        // let profile = await getUserInfo(query.userprofile);
        // profile = JSON.parse(JSON.stringify(profile));
        // let primaryTeam = await getTeam(profile.primaryTeam);
        // primaryTeam = JSON.parse(JSON.stringify(primaryTeam));
        let propData = await getPropData(access_token, query.userprofile);
        return { props:  propData };
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
        // const user = await getUser(token.access_token);
        // let profile = await getUserInfo(query.userprofile);
        // profile = JSON.parse(JSON.stringify(profile));
        // let primaryTeam = await getTeam(profile.primaryTeam);
        // primaryTeam = JSON.parse(JSON.stringify(primaryTeam));

        let propData = await getPropData(access_token, query.userprofile);
        return { props:  propData };
      } catch (e) {
        console.log(e);
        return { props: { user: null } };
      }
    } else {
      console.log('else');
      let propData = await getPropData(access_token, query.userprofile);
      return { props: propData };
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
  
  const getPropData = async (access_token, userprofile) => {
    let user;
    if(access_token){
      user = await getUser(access_token);
    }
    else{
      user = 'none';
    }
    // const user = await getUser(access_token);
    let profile = await getUserInfo(userprofile);
    profile = JSON.parse(JSON.stringify(profile));
    let primaryTeam = await getTeam(profile.primaryTeam);
    primaryTeam = JSON.parse(JSON.stringify(primaryTeam));
    let secondaryTeam = await getTeam(profile.secondaryTeam);
    secondaryTeam = JSON.parse(JSON.stringify(secondaryTeam));
    let tertiaryTeam = await getTeam(profile.tertiaryTeam);
    tertiaryTeam = JSON.parse(JSON.stringify(tertiaryTeam));
    let profileBallots = await getProfileBallots(profile.name);
    profileBallots = JSON.parse(JSON.stringify(profileBallots));
    return {user, profile, primaryTeam, secondaryTeam, tertiaryTeam, profileBallots};
  }