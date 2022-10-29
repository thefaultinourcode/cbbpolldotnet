import { useRouter } from 'next/router';
// import ApplicationData from '../../models/ApplicationData';
import TeamData from '../../models/TeamData';
import UserBallot from '../../models/UserBallot';
import { connectMongo } from "../../utils/connect";

let ObjectId = require('mongodb').ObjectID;
export default function UserRanking (props){
    const router = useRouter();
    const { id } = router.query;   
    console.log('props:', props);

    return(
        <div>
            <h1>{props.ballot.user}&apos;s Ballot</h1>
            <table>
                <tbody>
                <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Reason</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td><span className="boldText">{props.ballot.one.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.one.reasoning}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><span className="boldText">{props.ballot.two.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.two.reasoning}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td><span className="boldText">{props.ballot.three.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.three.reasoning}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td><span className="boldText">{props.ballot.four.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.four.reasoning}</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td><span className="boldText">{props.ballot.five.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.five.reasoning}</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td><span className="boldText">{props.ballot.six.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.six.reasoning}</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td><span className="boldText">{props.ballot.seven.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.seven.reasoning}</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td><span className="boldText">{props.ballot.eight.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.eight.reasoning}</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td><span className="boldText">{props.ballot.nine.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.nine.reasoning}</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td><span className="boldText">{props.ballot.ten.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.ten.reasoning}</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td><span className="boldText">{props.ballot.eleven.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.eleven.reasoning}</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td><span className="boldText">{props.ballot.twelve.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.twelve.reasoning}</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td><span className="boldText">{props.ballot.thirteen.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.thirteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td><span className="boldText">{props.ballot.fourteen.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.fourteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td><span className="boldText">{props.ballot.fifteen.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.fifteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>16</td>
                        <td><span className="boldText">{props.ballot.sixteen.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.sixteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>17</td>
                        <td><span className="boldText">{props.ballot.seventeen.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.seventeen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>18</td>
                        <td><span className="boldText">{props.ballot.eighteen.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.eighteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>19</td>
                        <td><span className="boldText">{props.ballot.nineteen.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.nineteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>20</td>
                        <td><span className="boldText">{props.ballot.twenty.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.twenty.reasoning}</td>
                    </tr>
                    <tr>
                        <td>21</td>
                        <td> <span className="boldText">{props.ballot.twentyOne.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.twentyOne.reasoning}</td>
                    </tr>
                    <tr>
                        <td>22</td>
                        <td> <span className="boldText">{props.ballot.twentyTwo.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.twentyTwo.reasoning}</td>
                    </tr>
                    <tr>
                        <td>23</td>
                        <td> <span className="boldText">{props.ballot.twentyThree.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.twentyThree.reasoning}</td>
                    </tr>
                    <tr>
                        <td>24</td>
                        <td> <span className="boldText">{props.ballot.twentyFour.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.twentyFour.reasoning}</td>
                    </tr>
                    <tr>
                        <td>25</td>
                        <td> <span className="boldText">{props.ballot.twentyFive.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.twentyFive.reasoning}</td>
                    </tr>
                </tbody>
            </table>
            <h2>Overall Rationale</h2>
            <p>{props.ballot.overallReasoning}</p>
        </div>
    );

}

export const getServerSideProps = async ({ query }) => {
    let ballotId = query.app;   
    let ballot = await getBallot(ballotId);
    ballot = JSON.parse(JSON.stringify(ballot));  
    return { props: {ballot} };
}

const getBallot = async (id) => {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');
  
    console.log('FETCHING BALLOT');

    console.log(ObjectId(id));

    const ballot = await UserBallot.findOne({'id':ObjectId(id)});
    const userBallot = JSON.parse(JSON.stringify(ballot));
    console.log('userBallot:', userBallot)
    console.log('FETCHED BALLOT');
    return userBallot;
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