import Navbar from "../components/navbar";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import axios, { Axios } from "axios";
import querystring from "querystring";
const randomstring = require("randomstring");
import Image from 'next/image';
import CBBlogo from '/public/CBBLogo.png'


const DURATION = "permanent";
const SCOPE = "identity edit flair history read vote wikiread wikiedit";
//const REDIRECT_URI = "http://localhost:3000/profile";
const REDIRECT_URI = "http://cbbpolldotnet.vercel.app/profile";
const RANDOM_STRING = "randomstringhere"; //randomstring.generate();
const RESPONSE_TYPE = "code";
const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

const URL = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`;

export default function Home(props) {
  
  return props.user ? (    
    <div className="homepage">
      
      <Navbar cbbLogo="/CBBlogo2.png" homefieldLogo="/../public/img/SponsoredByHomefield.png" user={props.user.name}></Navbar>

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
          <h1>Preseason poll goes live on Monday, October 31, at 10am EDT!</h1>
          <table>
            <tbody>
              <tr>
                <th>Rank</th>
                <th>Change</th>
                <th>Team (#1 Votes)</th>
                <th>Points</th>
              </tr>
              <tr>
              <td>1</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>2</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>3</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>4</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>5</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>6</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>7</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>8</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>9</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>10</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>11</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>12</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>13</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>14</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>15</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>16</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>17</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>18</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>19</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>20</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>21</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>22</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>23</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>24</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>25</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
            </tbody>
          </table>        
        </div>
      </div>  

    </div>
  ) :  (    
    <div className="homepage">
      
      <Navbar cbbLogo="/../test/CBBlogo2.png" homefieldLogo="/../public/img/SponsoredByHomefield.png"></Navbar>
      <div className="content">  
        <Image src={CBBlogo} width={100} height={100}></Image>
        <Image src='/../public/CBBlogo.png' width={100} height={100}></Image>
        <Image src='/../test/CBBlogo.png' layout='fill'></Image>

        <div id="ballotBox">
              <Image src='/static/CBBlogo.png' width={100} height={100}></Image>
              <h3>Become a poll voter!</h3>
              <h3>Sign in to apply!</h3>
            <a href={URL}>
              <button>Sign in with Reddit</button>          
            </a>
            <h3>Applications close Friday, October 28, at 11:59pm EDT</h3>
        </div>
        <div id="pollTable">
          <h1>Preseason poll goes live on Monday, October 31, at 10am EDT!</h1>
          <table>
            <tbody>
              <tr>
                <th>Rank</th>
                <th>Change</th>
                <th>Team (#1 Votes)</th>
                <th>Points</th>
              </tr>
              <tr>
              <td>1</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>2</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>3</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>4</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>5</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>6</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>7</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>8</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>9</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>10</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>11</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>12</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>13</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>14</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>15</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>16</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>17</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>18</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>19</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>20</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>21</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>22</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>23</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>24</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
              <tr>
              <td>25</td> 
              <td>-</td>
              <td>TBD</td>
              <td>TBD</td>
              </tr>
            </tbody>
          </table>        
        </div>
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
