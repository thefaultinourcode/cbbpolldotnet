import { useRouter } from 'next/router';
// import ApplicationData from '../../models/ApplicationData';
import TeamData from '../../../models/TeamData';
import UserBallot from '../../../models/UserBallot';
import User from '../../../models/User';
import { connectMongo } from '../../../utils/connect';
import Image from 'next/image';
import Link from 'next/link';

let ObjectId = require('mongodb').ObjectID;

export default function UserRanking(props) {
	const router = useRouter();
	const { id } = router.query;

    let week = props.week;

    let rows = [];
    for(let i = 1; i <= 25; i++){

    }

    let titleName = props.ballot.user + "'s";
	let gateDate = new Date('October 1 2025');
	console.log('props.ballot.date:', props.ballot.date);
	console.log(typeof props.ballot.date);
	const ballotDate = new Date(props.ballot.date);
	if(ballotDate > gateDate){
		return (
			<div>
				<h1>Unavailable</h1>
			</div>
		)
	}
	else{
		return(
			<div>
				<span><h1><Image src={props.team.url} width={100} height={100}></Image><Link href={`/users/${props.ballot.user}`}>{titleName}</Link> Week {week} Ballot</h1></span>
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
							<td><span className="boldText"><Image src={props.urls.one} width={30} height={30}></Image> {props.ballot[1].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[1].reasoning}</td>
						</tr>
						<tr>
							<td>2</td>
							<td><span className="boldText"><Image src={props.urls.two} width={30} height={30}></Image> {props.ballot[2].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[2].reasoning}</td>
						</tr>
						<tr>
							<td>3</td>
							<td><span className="boldText"><Image src={props.urls.three} width={30} height={30}></Image>{props.ballot[3].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[3].reasoning}</td>
						</tr>
						<tr>
							<td>4</td>
							<td><span className="boldText"><Image src={props.urls.four} width={30} height={30}></Image> {props.ballot[4].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[4].reasoning}</td>
						</tr>
						<tr>
							<td>5</td>
							<td><span className="boldText"><Image src={props.urls.five} width={30} height={30}></Image> {props.ballot[5].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[5].reasoning}</td>
						</tr>
						<tr>
							<td>6</td>
							<td><span className="boldText"><Image src={props.urls.six} width={30} height={30}></Image>{props.ballot[6].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[6].reasoning}</td>
						</tr>
						<tr>
							<td>7</td>
							<td><span className="boldText"><Image src={props.urls.seven} width={30} height={30}></Image> {props.ballot[7].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[7].reasoning}</td>
						</tr>
						<tr>
							<td>8</td>
							<td><span className="boldText"> <Image src={props.urls.eight} width={30} height={30}></Image>{props.ballot[8].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[8].reasoning}</td>
						</tr>
						<tr>
							<td>9</td>
							<td><span className="boldText"><Image src={props.urls.nine} width={30} height={30}></Image>{props.ballot[9].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[9].reasoning}</td>
						</tr>
						<tr>
							<td>10</td>
							<td><span className="boldText"><Image src={props.urls.ten} width={30} height={30}></Image>{props.ballot[10].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[10].reasoning}</td>
						</tr>
						<tr>
							<td>11</td>
							<td><span className="boldText"> <Image src={props.urls.eleven} width={30} height={30}></Image> {props.ballot[11].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[11].reasoning}</td>
						</tr>
						<tr>
							<td>12</td>
							<td><span className="boldText"> <Image src={props.urls.twelve} width={30} height={30}></Image> {props.ballot[12].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[12].reasoning}</td>
						</tr>
						<tr>
							<td>13</td>
							<td><span className="boldText"><Image src={props.urls.thirteen} width={30} height={30}></Image>{props.ballot[13].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[13].reasoning}</td>
						</tr>
						<tr>
							<td>14</td>
							<td><span className="boldText"> <Image src={props.urls.fourteen} width={30} height={30}></Image>{props.ballot[14].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[14].reasoning}</td>
						</tr>
						<tr>
							<td>15</td>
							<td><span className="boldText"><Image src={props.urls.fifteen} width={30} height={30}></Image>{props.ballot[15].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[15].reasoning}</td>
						</tr>
						<tr>
							<td>16</td>
							<td><span className="boldText"><Image src={props.urls.sixteen} width={30} height={30}></Image> {props.ballot[16].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[16].reasoning}</td>
						</tr>
						<tr>
							<td>17</td>
							<td><span className="boldText"> <Image src={props.urls.seventeen} width={30} height={30}></Image>{props.ballot[17].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[17].reasoning}</td>
						</tr>
						<tr>
							<td>18</td>
							<td><span className="boldText"><Image src={props.urls.eighteen} width={30} height={30}></Image> {props.ballot[18].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[18].reasoning}</td>
						</tr>
						<tr>
							<td>19</td>
							<td><span className="boldText"> <Image src={props.urls.nineteen} width={30} height={30}></Image>{props.ballot[19].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[19].reasoning}</td>
						</tr>
						<tr>
							<td>20</td>
							<td><span className="boldText"><Image src={props.urls.twenty} width={30} height={30}></Image>{props.ballot[20].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[20].reasoning}</td>
						</tr>
						<tr>
							<td>21</td>
							<td> <span className="boldText"><Image src={props.urls.twentyOne} width={30} height={30}></Image>{props.ballot[21].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[21].reasoning}</td>
						</tr>
						<tr>
							<td>22</td>
							<td> <span className="boldText"><Image src={props.urls.twentyTwo} width={30} height={30}></Image>{props.ballot[22].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[22].reasoning}</td>
						</tr>
						<tr>
							<td>23</td>
							<td> <span className="boldText"><Image src={props.urls.twentyThree} width={30} height={30}></Image>{props.ballot[23].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[23].reasoning}</td>
						</tr>
						<tr>
							<td>24</td>
							<td> <span className="boldText"><Image src={props.urls.twentyFour} width={30} height={30}></Image>{props.ballot[24].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[24].reasoning}</td>
						</tr>
						<tr>
							<td>25</td>
							<td> <span className="boldText"><Image src={props.urls.twentyFive} width={30} height={30}></Image>{props.ballot[25].name.replace(' undefined','')}</span> </td>
							<td>{props.ballot[25].reasoning}</td>
						</tr>
					</tbody>
				</table>
				<h2>Overall Rationale</h2>
				<p>{props.ballot.overallReasoning}</p>
			</div>
		);
	}



	return (
		<div>
			<span>
				<h1>
					<Image src={props.team.url} width={100} height={100}></Image>
					<Link href={`/users/${props.ballot.user}`}>{titleName}</Link> Week {week} Ballot
				</h1>
			</span>
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
						<td>
							<span className="boldText">
								<Image src={props.urls.one} width={30} height={30}></Image> {props.ballot[1].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[1].reasoning}</td>
					</tr>
					<tr>
						<td>2</td>
						<td>
							<span className="boldText">
								<Image src={props.urls.two} width={30} height={30}></Image> {props.ballot[2].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[2].reasoning}</td>
					</tr>
					<tr>
						<td>3</td>
						<td>
							<span className="boldText">
								<Image src={props.urls.three} width={30} height={30}></Image>
								{props.ballot[3].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[3].reasoning}</td>
					</tr>
					<tr>
						<td>4</td>
						<td>
							<span className="boldText">
								<Image src={props.urls.four} width={30} height={30}></Image> {props.ballot[4].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[4].reasoning}</td>
					</tr>
					<tr>
						<td>5</td>
						<td>
							<span className="boldText">
								<Image src={props.urls.five} width={30} height={30}></Image> {props.ballot[5].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[5].reasoning}</td>
					</tr>
					<tr>
						<td>6</td>
						<td>
							<span className="boldText">
								<Image src={props.urls.six} width={30} height={30}></Image>
								{props.ballot[6].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[6].reasoning}</td>
					</tr>
					<tr>
						<td>7</td>
						<td>
							<span className="boldText">
								<Image src={props.urls.seven} width={30} height={30}></Image> {props.ballot[7].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[7].reasoning}</td>
					</tr>
					<tr>
						<td>8</td>
						<td>
							<span className="boldText">
								{' '}
								<Image src={props.urls.eight} width={30} height={30}></Image>
								{props.ballot[8].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[8].reasoning}</td>
					</tr>
					<tr>
						<td>9</td>
						<td>
							<span className="boldText">
								<Image src={props.urls.nine} width={30} height={30}></Image>
								{props.ballot[9].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[9].reasoning}</td>
					</tr>
					<tr>
						<td>10</td>
						<td>
							<span className="boldText">
								<Image src={props.urls.ten} width={30} height={30}></Image>
								{props.ballot[10].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[10].reasoning}</td>
					</tr>
					<tr>
						<td>11</td>
						<td>
							<span className="boldText">
								{' '}
								<Image src={props.urls.eleven} width={30} height={30}></Image> {props.ballot[11].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[11].reasoning}</td>
					</tr>
					<tr>
						<td>12</td>
						<td>
							<span className="boldText">
								{' '}
								<Image src={props.urls.twelve} width={30} height={30}></Image> {props.ballot[12].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[12].reasoning}</td>
					</tr>
					<tr>
						<td>13</td>
						<td>
							<span className="boldText">
								<Image src={props.urls.thirteen} width={30} height={30}></Image>
								{props.ballot[13].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[13].reasoning}</td>
					</tr>
					<tr>
						<td>14</td>
						<td>
							<span className="boldText">
								{' '}
								<Image src={props.urls.fourteen} width={30} height={30}></Image>
								{props.ballot[14].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[14].reasoning}</td>
					</tr>
					<tr>
						<td>15</td>
						<td>
							<span className="boldText">
								<Image src={props.urls.fifteen} width={30} height={30}></Image>
								{props.ballot[15].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[15].reasoning}</td>
					</tr>
					<tr>
						<td>16</td>
						<td>
							<span className="boldText">
								<Image src={props.urls.sixteen} width={30} height={30}></Image> {props.ballot[16].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[16].reasoning}</td>
					</tr>
					<tr>
						<td>17</td>
						<td>
							<span className="boldText">
								{' '}
								<Image src={props.urls.seventeen} width={30} height={30}></Image>
								{props.ballot[17].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[17].reasoning}</td>
					</tr>
					<tr>
						<td>18</td>
						<td>
							<span className="boldText">
								<Image src={props.urls.eighteen} width={30} height={30}></Image> {props.ballot[18].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[18].reasoning}</td>
					</tr>
					<tr>
						<td>19</td>
						<td>
							<span className="boldText">
								{' '}
								<Image src={props.urls.nineteen} width={30} height={30}></Image>
								{props.ballot[19].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[19].reasoning}</td>
					</tr>
					<tr>
						<td>20</td>
						<td>
							<span className="boldText">
								<Image src={props.urls.twenty} width={30} height={30}></Image>
								{props.ballot[20].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[20].reasoning}</td>
					</tr>
					<tr>
						<td>21</td>
						<td>
							{' '}
							<span className="boldText">
								<Image src={props.urls.twentyOne} width={30} height={30}></Image>
								{props.ballot[21].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[21].reasoning}</td>
					</tr>
					<tr>
						<td>22</td>
						<td>
							{' '}
							<span className="boldText">
								<Image src={props.urls.twentyTwo} width={30} height={30}></Image>
								{props.ballot[22].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[22].reasoning}</td>
					</tr>
					<tr>
						<td>23</td>
						<td>
							{' '}
							<span className="boldText">
								<Image src={props.urls.twentyThree} width={30} height={30}></Image>
								{props.ballot[23].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[23].reasoning}</td>
					</tr>
					<tr>
						<td>24</td>
						<td>
							{' '}
							<span className="boldText">
								<Image src={props.urls.twentyFour} width={30} height={30}></Image>
								{props.ballot[24].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[24].reasoning}</td>
					</tr>
					<tr>
						<td>25</td>
						<td>
							{' '}
							<span className="boldText">
								<Image src={props.urls.twentyFive} width={30} height={30}></Image>
								{props.ballot[25].name.replace(' undefined', '')}
							</span>{' '}
						</td>
						<td>{props.ballot[25].reasoning}</td>
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
	let week = query.week;

	let ballot = await getBallot(ballotId);
	ballot = JSON.parse(JSON.stringify(ballot));
	console.log('ballot:', ballot);

	let user = await getUserData(ballot.user);
	let team = await getTeam(user[0].primaryTeam);
	team = JSON.parse(JSON.stringify(team));

	let urls = {};
	// if(week === "Pre-Season"){
	//     let one = await getTeam(ballot.one.id);
	//     let two = await getTeam(ballot.two.id);
	//     let three = await getTeam(ballot.three.id);
	//     let four = await getTeam(ballot.four.id);
	//     let five = await getTeam(ballot.five.id);
	//     let six = await getTeam(ballot.six.id);
	//     let seven = await getTeam(ballot.seven.id);
	//     let eight = await getTeam(ballot.eight.id);
	//     let nine = await getTeam(ballot.nine.id);
	//     let ten = await getTeam(ballot.ten.id);
	//     let eleven = await getTeam(ballot.eleven.id);
	//     let twelve = await getTeam(ballot.twelve.id);
	//     let thirteen = await getTeam(ballot.thirteen.id);
	//     let fourteen = await getTeam(ballot.fourteen.id);
	//     let fifteen = await getTeam(ballot.fifteen.id);
	//     let sixteen = await getTeam(ballot.sixteen.id);
	//     let seventeen = await getTeam(ballot.seventeen.id);
	//     let eighteen = await getTeam(ballot.eighteen.id);
	//     let nineteen = await getTeam(ballot.nineteen.id);
	//     let twenty = await getTeam(ballot.twenty.id);
	//     let twentyOne = await getTeam(ballot.twentyOne.id);
	//     let twentyTwo = await getTeam(ballot.twentyTwo.id);
	//     let twentyThree = await getTeam(ballot.twentyThree.id);
	//     let twentyFour = await getTeam(ballot.twentyFour.id);
	//     let twentyFive = await getTeam(ballot.twentyFive.id);

	//     urls["one"] = one.url;
	//     urls["two"] = two.url;
	//     urls["three"] = three.url;
	//     urls["four"] = four.url;
	//     urls["five"] = five.url;
	//     urls["six"] = six.url;
	//     urls["seven"] = seven.url;
	//     urls["eight"] = eight.url;
	//     urls["nine"] = nine.url;
	//     urls["ten"] = ten.url;
	//     urls["eleven"] = eleven.url;
	//     urls["twelve"] = twelve.url;
	//     urls["thirteen"] = thirteen.url;
	//     urls["fourteen"] = fourteen.url;
	//     urls["fifteen"] = fifteen.url;
	//     urls["sixteen"] = sixteen.url;
	//     urls["seventeen"] = seventeen.url;
	//     urls["eighteen"] = eighteen.url;
	//     urls["nineteen"] = nineteen.url;
	//     urls["twenty"] = twenty.url;
	//     urls["twentyOne"] = twentyOne.url;
	//     urls["twentyTwo"] = twentyTwo.url;
	//     urls["twentyThree"] = twentyThree.url;
	//     urls["twentyFour"] = twentyFour.url;
	//     urls["twentyFive"] = twentyFive.url;
	// }
	//else{
	let one = await getTeam(ballot[1].id);
	let two = await getTeam(ballot[2].id);
	let three = await getTeam(ballot[3].id);
	let four = await getTeam(ballot[4].id);
	let five = await getTeam(ballot[5].id);
	let six = await getTeam(ballot[6].id);
	let seven = await getTeam(ballot[7].id);
	let eight = await getTeam(ballot[8].id);
	let nine = await getTeam(ballot[9].id);
	let ten = await getTeam(ballot[10].id);
	let eleven = await getTeam(ballot[11].id);
	let twelve = await getTeam(ballot[12].id);
	let thirteen = await getTeam(ballot[13].id);
	let fourteen = await getTeam(ballot[14].id);
	let fifteen = await getTeam(ballot[15].id);
	let sixteen = await getTeam(ballot[16].id);
	let seventeen = await getTeam(ballot[17].id);
	let eighteen = await getTeam(ballot[18].id);
	let nineteen = await getTeam(ballot[19].id);
	let twenty = await getTeam(ballot[20].id);
	let twentyOne = await getTeam(ballot[21].id);
	let twentyTwo = await getTeam(ballot[22].id);
	let twentyThree = await getTeam(ballot[23].id);
	let twentyFour = await getTeam(ballot[24].id);
	let twentyFive = await getTeam(ballot[25].id);

	urls['one'] = one.url;
	urls['two'] = two.url;
	urls['three'] = three.url;
	urls['four'] = four.url;
	urls['five'] = five.url;
	urls['six'] = six.url;
	urls['seven'] = seven.url;
	urls['eight'] = eight.url;
	urls['nine'] = nine.url;
	urls['ten'] = ten.url;
	urls['eleven'] = eleven.url;
	urls['twelve'] = twelve.url;
	urls['thirteen'] = thirteen.url;
	urls['fourteen'] = fourteen.url;
	urls['fifteen'] = fifteen.url;
	urls['sixteen'] = sixteen.url;
	urls['seventeen'] = seventeen.url;
	urls['eighteen'] = eighteen.url;
	urls['nineteen'] = nineteen.url;
	urls['twenty'] = twenty.url;
	urls['twentyOne'] = twentyOne.url;
	urls['twentyTwo'] = twentyTwo.url;
	urls['twentyThree'] = twentyThree.url;
	urls['twentyFour'] = twentyFour.url;
	urls['twentyFive'] = twentyFive.url;
	//}

	return { props: { ballot, user, team, urls, week } };
};

const getBallot = async (id) => {
	await connectMongo();

	console.log('Id:', ObjectId(id));

	const ballot = await UserBallot.findOne({ _id: ObjectId(id) });
	const userBallot = JSON.parse(JSON.stringify(ballot));
	console.log('userBallot:', userBallot);
	return userBallot;
};


async function getTeam(id) {
	await connectMongo();

	const teamData = await TeamData.findOne({ _id: id });

	return teamData;
}

const getUserData = async (user) => {
	await connectMongo();

	const u = await User.find({ name: user });
	const userData = JSON.parse(JSON.stringify(u));
	return userData;
};
