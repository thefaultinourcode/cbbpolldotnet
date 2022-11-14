import { useRouter } from 'next/router';
// import ApplicationData from '../../models/ApplicationData';
import TeamData from '../../models/TeamData';
import UserBallot from '../../models/UserBallot';
import User from '../../models/User';
import { connectMongo } from "../../utils/connect";
import Image from 'next/image';

let ObjectId = require('mongodb').ObjectID;
export default function UserRanking (props){
    const router = useRouter();
    const { id } = router.query;   

    return(
        <div>
            <span><h1><Image src={props.team.url} width={100} height={100}></Image>{props.ballot.user}&apos;s Ballot</h1></span>
            <h2>{id}</h2>
            <table>
                <tbody>
                <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Reason</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td><span className="boldText"><Image src={props.urls.one} width={30} height={30}></Image> {props.ballot.one.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.one.reasoning}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><span className="boldText"><Image src={props.urls.two} width={30} height={30}></Image> {props.ballot.two.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.two.reasoning}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td><span className="boldText"><Image src={props.urls.three} width={30} height={30}></Image>{props.ballot.three.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.three.reasoning}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td><span className="boldText"><Image src={props.urls.four} width={30} height={30}></Image> {props.ballot.four.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.four.reasoning}</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td><span className="boldText"><Image src={props.urls.five} width={30} height={30}></Image> {props.ballot.five.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.five.reasoning}</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td><span className="boldText"><Image src={props.urls.six} width={30} height={30}></Image>{props.ballot.six.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.six.reasoning}</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td><span className="boldText"><Image src={props.urls.seven} width={30} height={30}></Image> {props.ballot.seven.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.seven.reasoning}</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td><span className="boldText"> <Image src={props.urls.eight} width={30} height={30}></Image>{props.ballot.eight.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.eight.reasoning}</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td><span className="boldText"><Image src={props.urls.nine} width={30} height={30}></Image>{props.ballot.nine.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.nine.reasoning}</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td><span className="boldText"><Image src={props.urls.ten} width={30} height={30}></Image>{props.ballot.ten.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.ten.reasoning}</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td><span className="boldText"> <Image src={props.urls.eleven} width={30} height={30}></Image> {props.ballot.eleven.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.eleven.reasoning}</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td><span className="boldText"> <Image src={props.urls.twelve} width={30} height={30}></Image> {props.ballot.twelve.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.twelve.reasoning}</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td><span className="boldText"><Image src={props.urls.thirteen} width={30} height={30}></Image>{props.ballot.thirteen.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.thirteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td><span className="boldText"> <Image src={props.urls.fourteen} width={30} height={30}></Image>{props.ballot.fourteen.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.fourteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td><span className="boldText"><Image src={props.urls.fifteen} width={30} height={30}></Image>{props.ballot.fifteen.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.fifteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>16</td>
                        <td><span className="boldText"><Image src={props.urls.sixteen} width={30} height={30}></Image> {props.ballot.sixteen.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.sixteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>17</td>
                        <td><span className="boldText"> <Image src={props.urls.seventeen} width={30} height={30}></Image>{props.ballot.seventeen.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.seventeen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>18</td>
                        <td><span className="boldText"><Image src={props.urls.eighteen} width={30} height={30}></Image> {props.ballot.eighteen.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.eighteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>19</td>
                        <td><span className="boldText"> <Image src={props.urls.nineteen} width={30} height={30}></Image>{props.ballot.nineteen.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.nineteen.reasoning}</td>
                    </tr>
                    <tr>
                        <td>20</td>
                        <td><span className="boldText"><Image src={props.urls.twenty} width={30} height={30}></Image>{props.ballot.twenty.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.twenty.reasoning}</td>
                    </tr>
                    <tr>
                        <td>21</td>
                        <td> <span className="boldText"><Image src={props.urls.twentyOne} width={30} height={30}></Image>{props.ballot.twentyOne.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.twentyOne.reasoning}</td>
                    </tr>
                    <tr>
                        <td>22</td>
                        <td> <span className="boldText"><Image src={props.urls.twentyTwo} width={30} height={30}></Image>{props.ballot.twentyTwo.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.twentyTwo.reasoning}</td>
                    </tr>
                    <tr>
                        <td>23</td>
                        <td> <span className="boldText"><Image src={props.urls.twentyThree} width={30} height={30}></Image>{props.ballot.twentyThree.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.twentyThree.reasoning}</td>
                    </tr>
                    <tr>
                        <td>24</td>
                        <td> <span className="boldText"><Image src={props.urls.twentyFour} width={30} height={30}></Image>{props.ballot.twentyFour.name.replace(' undefined','')}</span> </td>
                        <td>{props.ballot.twentyFour.reasoning}</td>
                    </tr>
                    <tr>
                        <td>25</td>
                        <td> <span className="boldText"><Image src={props.urls.twentyFive} width={30} height={30}></Image>{props.ballot.twentyFive.name.replace(' undefined','')}</span> </td>
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
    let ballotId = query.ballot;
    console.log('query:', query);
    console.log('ballotId:', ballotId);   
    let ballot = await getBallot(ballotId);
    ballot = JSON.parse(JSON.stringify(ballot));  
    let user = await getUserData(ballot.user);
    let team = await getTeam(user[0].primaryTeam);
    team = JSON.parse(JSON.stringify(team));

    let urls = {};
    let one = await getTeam(ballot.one.id);
    let two = await getTeam(ballot.two.id);
    let three = await getTeam(ballot.three.id);
    let four = await getTeam(ballot.four.id);
    let five = await getTeam(ballot.five.id);
    let six = await getTeam(ballot.six.id);
    let seven = await getTeam(ballot.seven.id);
    let eight = await getTeam(ballot.eight.id);
    let nine = await getTeam(ballot.nine.id);
    let ten = await getTeam(ballot.ten.id);
    let eleven = await getTeam(ballot.eleven.id);
    let twelve = await getTeam(ballot.twelve.id);
    let thirteen = await getTeam(ballot.thirteen.id);
    let fourteen = await getTeam(ballot.fourteen.id);
    let fifteen = await getTeam(ballot.fifteen.id);
    let sixteen = await getTeam(ballot.sixteen.id);
    let seventeen = await getTeam(ballot.seventeen.id);
    let eighteen = await getTeam(ballot.eighteen.id);
    let nineteen = await getTeam(ballot.nineteen.id);
    let twenty = await getTeam(ballot.twenty.id);
    let twentyOne = await getTeam(ballot.twentyOne.id);
    let twentyTwo = await getTeam(ballot.twentyTwo.id);
    let twentyThree = await getTeam(ballot.twentyThree.id);
    let twentyFour = await getTeam(ballot.twentyFour.id);
    let twentyFive = await getTeam(ballot.twentyFive.id);

    urls["one"] = one.url;
    urls["two"] = two.url;
    urls["three"] = three.url;
    urls["four"] = four.url;
    urls["five"] = five.url;
    urls["six"] = six.url;
    urls["seven"] = seven.url;
    urls["eight"] = eight.url;
    urls["nine"] = nine.url;
    urls["ten"] = ten.url;
    urls["eleven"] = eleven.url;
    urls["twelve"] = twelve.url;
    urls["thirteen"] = thirteen.url;
    urls["fourteen"] = fourteen.url;
    urls["fifteen"] = fifteen.url;
    urls["sixteen"] = sixteen.url;
    urls["seventeen"] = seventeen.url;
    urls["eighteen"] = eighteen.url;
    urls["nineteen"] = nineteen.url;
    urls["twenty"] = twenty.url;
    urls["twentyOne"] = twentyOne.url;
    urls["twentyTwo"] = twentyTwo.url;
    urls["twentyThree"] = twentyThree.url;
    urls["twentyFour"] = twentyFour.url;
    urls["twentyFive"] = twentyFive.url;

    return { props: {ballot, user, team, urls} };
}

const getBallot = async (id) => {
    await connectMongo();

    console.log('Id:', ObjectId(id));

    const ballot = await UserBallot.findOne({'_id':ObjectId(id)});
    const userBallot = JSON.parse(JSON.stringify(ballot));
    console.log('userBallot:', userBallot);
    return userBallot;
  }

  async function getTeam(id){

    await connectMongo();

    const teamData = await TeamData.findOne({_id: id});
  
    return teamData;
  }

  const getUserData = async (user) => {
    await connectMongo();

    const u = await User.find({name: user});
    const userData = JSON.parse(JSON.stringify(u));
    return userData;

  }