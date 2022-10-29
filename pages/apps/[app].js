import { useRouter } from 'next/router';
import ApplicationData from '../../models/ApplicationData';
import TeamData from '../../models/TeamData';
import UserBallot from '../../models/UserBallot';
import { connectMongo } from "../../utils/connect";

export default function UserApp (props) {
  const router = useRouter();
  const { app } = router.query;

  let application = props.application[0];
  let ballot = props.ballot;

  let reasons = [];
  if(application){
      if(application.checkbox1){
          reasons.push('I rarely go to games, and instead focus on TV broadcasts and streams.');
      }
      if(application.checkbox2){
          reasons.push('I try to go to a few games each year.');
      }
      if(application.checkbox3){
          reasons.push("I go to either my team's game or some other game most or all weeks.");
      }
      if(application.checkbox4){
          reasons.push('I pick a few games each week to watch intently.');
      }
      if(application.checkbox5){
          reasons.push('I try to follow everything going on using multiple TVs and/or monitors.');   
      }
      if(application.checkbox6){
          reasons.push('I tend to focus on watching my team and/or games that could effect their standing.');  
      }
      if(application.checkbox7){
          reasons.push('I tend to focus on watching match-ups between highly ranked teams.');  
      }
      if(application.checkbox8){
          reasons.push("I tend to focus on watching match-ups in my team's conference.");  
      }
      if(application.checkbox9){
          reasons.push('I tend to focus on watching match-ups between closely matched teams regardless of ranking.');  
      }
      if(application.checkbox10){
          reasons.push('I watch the weeknight games regardless of the teams playing.');  
      }
      if(application.checkbox11){
          reasons.push('I gamble or participate in contests trying to predict the outcome of games and follow my progress as games go on.');  
      }
      if(application.checkbox12){
          reasons.push('My experience as a basketball player, coach, or referee tends to guide my focus.');  
      }
  }

  return (
    <div>
      <h1>{app}</h1>
      <h2>Application</h2>
      <p>Favorite Team: {props.favTeams.favTeam}</p>
      <p>Secondary Team: {props.favTeams.favTeam2}</p>
      <p>Tertiary Team: {props.favTeams.favTeam3}</p>

      <h3>In which of the following ways do you inform your opinion of basketball teams?</h3>
      <ul>
          {reasons.map(reason => {
              return (
                  <li key={reason}>{reason}</li>
              );
          })}
      </ul>
      
      <h3>Approach</h3>
      <p>{application.approach}</p>
      <h3>Extra</h3>
      <p>{application.extra}</p>

      <h2>Ballot</h2>
      <table className="userTable">
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Reason</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td><span className="boldText">{props.ballot.one.name}</span> </td>
                        <td>{props.ballot.one.reasoning}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><span className="boldText">{props.ballot.two.name}</span> </td>
                        <td>{props.ballot.two.reasoning}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td><span className="boldText">{props.ballot.three.name}</span> </td>
                        <td>{props.ballot.three.reasoning}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td><span className="boldText">{props.ballot.four.name}</span> </td>
                        <td>{props.ballot.four.reasoning}</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td><span className="boldText">{props.ballot.five.name}</span> </td>
                        <td>{props.ballot.five.reasoning}</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td><span className="boldText">{props.ballot.six.name}</span> </td>
                        <td>{props.ballot.six.reasoning}</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td><span className="boldText">{props.ballot.seven.name}</span> </td>
                        <td>{props.ballot.seven.reasoning}</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td><span className="boldText">{props.ballot.eight.name}</span> </td>
                        <td>{props.ballot.eight.reasoning}</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td><span className="boldText">{props.ballot.nine.name}</span> </td>
                        <td>{props.ballot.nine.reasoning}</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td><span className="boldText">{props.ballot.ten.name}</span> </td>
                        <td>{props.ballot.ten.reasoning}</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td><span className="boldText">{props.ballot.eleven.name}</span> </td>
                        <td>{props.ballot.eleven.reasoning}</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td><span className="boldText">{props.ballot.twelve.name}</span> </td>
                        <td>{props.ballot.twelve.reasoning}</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td><span className="boldText">{props.ballot.thirteen.name}</span> </td>
                        <td>{props.ballot.thirteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td><span className="boldText">{props.ballot.fourteen.name}</span> </td>
                        <td>{props.ballot.fourteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td><span className="boldText">{props.ballot.fifteen.name}</span> </td>
                        <td>{props.ballot.fifteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>16</td>
                        <td><span className="boldText">{props.ballot.sixteen.name}</span> </td>
                        <td>{props.ballot.sixteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>17</td>
                        <td><span className="boldText">{props.ballot.seventeen.name}</span> </td>
                        <td>{props.ballot.seventeen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>18</td>
                        <td><span className="boldText">{props.ballot.eighteen.name}</span> </td>
                        <td>{props.ballot.eighteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>19</td>
                        <td><span className="boldText">{props.ballot.nineteen.name}</span> </td>
                        <td>{props.ballot.nineteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>20</td>
                        <td><span className="boldText">{props.ballot.twenty.name}</span> </td>
                        <td>{props.ballot.twenty.reasoning}</td>
                    </tr>
                    <tr>
                        <td>21</td>
                        <td> <span className="boldText">{props.ballot.twentyOne.name}</span> </td>
                        <td>{props.ballot.twentyOne.reasoning}</td>
                    </tr>
                    <tr>
                        <td>22</td>
                        <td> <span className="boldText">{props.ballot.twentyTwo.name}</span> </td>
                        <td>{props.ballot.twentyTwo.reasoning}</td>
                    </tr>
                    <tr>
                        <td>23</td>
                        <td> <span className="boldText">{props.ballot.twentyThree.name}</span> </td>
                        <td>{props.ballot.twentyThree.reasoning}</td>
                    </tr>
                    <tr>
                        <td>24</td>
                        <td> <span className="boldText">{props.ballot.twentyFour.name}</span> </td>
                        <td>{props.ballot.twentyFour.reasoning}</td>
                    </tr>
                    <tr>
                        <td>25</td>
                        <td> <span className="boldText">{props.ballot.twentyFive.name}</span> </td>
                        <td>{props.ballot.twentyFive.reasoning}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Overall Rationale</h3>
            <p>{props.ballot.overallReasoning}</p>
            
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
    let user = query.app;
    console.log(user);
    let application = await getApp(user);
    console.log(application);
    application = JSON.parse(JSON.stringify(application));    
    let favTeams = {};
    let favTeam = await getTeamProp(application[0].favoriteTeam, 'shortName');
    favTeams.favTeam = favTeam;
    let favTeam2, favTeam3;
    favTeam2 = await getTeamProp(application[0].favoriteTeam2, 'shortName');
    favTeams.favTeam2 = favTeam2;
    favTeam3 = await getTeamProp(application[0].favoriteTeam3, 'shortName');
    favTeams.favTeam3 = favTeam3;
    let ballot = await getBallot(user);
    ballot = JSON.parse(JSON.stringify(ballot));  
    return { props: {user, application, favTeams, ballot} };
}

async function getApp(user){
    console.log('CONNECTING TO MONGO')
    await connectMongo();
    console.log('CONNECTED TO MONGO')

    console.log('FETCHING DOCUMENT');
    const application = await ApplicationData.find({user: user});
    console.log('FETCHED DOCUMENT');

    return application;
}

const getBallot = async (user) => {
  console.log('CONNECTING TO MONGO');
  await connectMongo();
  console.log('CONNECTED TO MONGO');

  console.log('FETCHING BALLOT');
  const ballot = await UserBallot.findOne({'user': user, 'week': "Pre-Season"});
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