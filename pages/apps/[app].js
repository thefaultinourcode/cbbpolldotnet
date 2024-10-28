import { useRouter } from 'next/router';
import ApplicationData from '../../models/ApplicationData';
import TeamData from '../../models/TeamData';
import UserBallot from '../../models/UserBallot';
import { connectMongo } from '../../utils/connect';

export default function UserApp(props) {
	const router = useRouter();
	const { app } = router.query;

	let application = props.application[0];
	let ballot = props.ballot;

	let reasons = [];
	if (application) {
		if (application.checkbox1) {
			reasons.push('I rarely go to games, and instead focus on TV broadcasts and streams.');
		}
		if (application.checkbox2) {
			reasons.push('I try to go to a few games each year.');
		}
		if (application.checkbox3) {
			reasons.push("I go to either my team's game or some other game most or all weeks.");
		}
		if (application.checkbox4) {
			reasons.push('I pick a few games each week to watch intently.');
		}
		if (application.checkbox5) {
			reasons.push('I try to follow everything going on using multiple TVs and/or monitors.');
		}
		if (application.checkbox6) {
			reasons.push('I tend to focus on watching my team and/or games that could effect their standing.');
		}
		if (application.checkbox7) {
			reasons.push('I tend to focus on watching match-ups between highly ranked teams.');
		}
		if (application.checkbox8) {
			reasons.push("I tend to focus on watching match-ups in my team's conference.");
		}
		if (application.checkbox9) {
			reasons.push('I tend to focus on watching match-ups between closely matched teams regardless of ranking.');
		}
		if (application.checkbox10) {
			reasons.push('I watch the weeknight games regardless of the teams playing.');
		}
		if (application.checkbox11) {
			reasons.push('I gamble or participate in contests trying to predict the outcome of games and follow my progress as games go on.');
		}
		if (application.checkbox12) {
			reasons.push('My experience as a basketball player, coach, or referee tends to guide my focus.');
		}
	}

	console.log('ballot:', ballot);
	return (
		<div>
			<h1>{app}</h1>
			<h2>Application</h2>
			<p>Favorite Team: {props.favTeams.favTeam}</p>
			<p>Secondary Team: {props.favTeams.favTeam2}</p>
			<p>Tertiary Team: {props.favTeams.favTeam3}</p>

			<h3>In which of the following ways do you inform your opinion of basketball teams?</h3>
			<ul>
				{reasons.map((reason) => {
					return <li key={reason}>{reason}</li>;
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
						<td>
							<span className="boldText">{props.ballot['1'].name}</span>{' '}
						</td>
						<td>{props.ballot['1'].reasoning}</td>
					</tr>
					<tr>
						<td>2</td>
						<td>
							<span className="boldText">{props.ballot['2'].name}</span>{' '}
						</td>
						<td>{props.ballot['2'].reasoning}</td>
					</tr>
					<tr>
						<td>3</td>
						<td>
							<span className="boldText">{props.ballot['3'].name}</span>{' '}
						</td>
						<td>{props.ballot['3'].reasoning}</td>
					</tr>
					<tr>
						<td>4</td>
						<td>
							<span className="boldText">{props.ballot['4'].name}</span>{' '}
						</td>
						<td>{props.ballot['4'].reasoning}</td>
					</tr>
					<tr>
						<td>5</td>
						<td>
							<span className="boldText">{props.ballot['5'].name}</span>{' '}
						</td>
						<td>{props.ballot['5'].reasoning}</td>
					</tr>
					<tr>
						<td>6</td>
						<td>
							<span className="boldText">{props.ballot['6'].name}</span>{' '}
						</td>
						<td>{props.ballot['6'].reasoning}</td>
					</tr>
					<tr>
						<td>7</td>
						<td>
							<span className="boldText">{props.ballot['7'].name}</span>{' '}
						</td>
						<td>{props.ballot['7'].reasoning}</td>
					</tr>
					<tr>
						<td>8</td>
						<td>
							<span className="boldText">{props.ballot['8'].name}</span>{' '}
						</td>
						<td>{props.ballot['8'].reasoning}</td>
					</tr>
					<tr>
						<td>9</td>
						<td>
							<span className="boldText">{props.ballot['9'].name}</span>{' '}
						</td>
						<td>{props.ballot['9'].reasoning}</td>
					</tr>
					<tr>
						<td>10</td>
						<td>
							<span className="boldText">{props.ballot['10'].name}</span>{' '}
						</td>
						<td>{props.ballot['10'].reasoning}</td>
					</tr>
					<tr>
						<td>11</td>
						<td>
							<span className="boldText">{props.ballot['11'].name}</span>{' '}
						</td>
						<td>{props.ballot['11'].reasoning}</td>
					</tr>
					<tr>
						<td>12</td>
						<td>
							<span className="boldText">{props.ballot['12'].name}</span>{' '}
						</td>
						<td>{props.ballot['12'].reasoning}</td>
					</tr>
					<tr>
						<td>13</td>
						<td>
							<span className="boldText">{props.ballot['13'].name}</span>{' '}
						</td>
						<td>{props.ballot['13'].reasoning}</td>
					</tr>
					<tr>
						<td>14</td>
						<td>
							<span className="boldText">{props.ballot['14'].name}</span>{' '}
						</td>
						<td>{props.ballot['14'].reasoning}</td>
					</tr>
					<tr>
						<td>15</td>
						<td>
							<span className="boldText">{props.ballot['15'].name}</span>{' '}
						</td>
						<td>{props.ballot['15'].reasoning}</td>
					</tr>
					<tr>
						<td>16</td>
						<td>
							<span className="boldText">{props.ballot['16'].name}</span>{' '}
						</td>
						<td>{props.ballot['16'].reasoning}</td>
					</tr>
					<tr>
						<td>17</td>
						<td>
							<span className="boldText">{props.ballot['17'].name}</span>{' '}
						</td>
						<td>{props.ballot['17'].reasoning}</td>
					</tr>
					<tr>
						<td>18</td>
						<td>
							<span className="boldText">{props.ballot['18'].name}</span>{' '}
						</td>
						<td>{props.ballot['18'].reasoning}</td>
					</tr>
					<tr>
						<td>19</td>
						<td>
							<span className="boldText">{props.ballot['19'].name}</span>{' '}
						</td>
						<td>{props.ballot['19'].reasoning}</td>
					</tr>
					<tr>
						<td>20</td>
						<td>
							<span className="boldText">{props.ballot['20'].name}</span>{' '}
						</td>
						<td>{props.ballot['20'].reasoning}</td>
					</tr>
					<tr>
						<td>21</td>
						<td>
							{' '}
							<span className="boldText">{props.ballot['21'].name}</span>{' '}
						</td>
						<td>{props.ballot['21'].reasoning}</td>
					</tr>
					<tr>
						<td>22</td>
						<td>
							{' '}
							<span className="boldText">{props.ballot['22'].name}</span>{' '}
						</td>
						<td>{props.ballot['22'].reasoning}</td>
					</tr>
					<tr>
						<td>23</td>
						<td>
							{' '}
							<span className="boldText">{props.ballot['23'].name}</span>{' '}
						</td>
						<td>{props.ballot['23'].reasoning}</td>
					</tr>
					<tr>
						<td>24</td>
						<td>
							{' '}
							<span className="boldText">{props.ballot['24'].name}</span>{' '}
						</td>
						<td>{props.ballot['24'].reasoning}</td>
					</tr>
					<tr>
						<td>25</td>
						<td>
							{' '}
							<span className="boldText">{props.ballot['25'].name}</span>{' '}
						</td>
						<td>{props.ballot['25'].reasoning}</td>
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
	console.log('user print:', user);
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
	return { props: { user, application, favTeams, ballot } };
};

async function getApp(user) {
	await connectMongo();
	const application = await ApplicationData.find({ user: user, season: 2025 });

	return application;
}

const getBallot = async (user) => {
	await connectMongo();

	const ballot = await UserBallot.findOne({ user: user, week: 'Pre-Season', season: 2025 });
	const userBallot = JSON.parse(JSON.stringify(ballot));
	return userBallot;
};

const getTeamProp = async (teamId, prop) => {
	let teamObj = await TeamData.findOne({ _id: teamId });
	if (teamObj) {
		let parsedTeamObj = JSON.parse(JSON.stringify(teamObj));
		if (prop === 'name') {
			parsedTeamObj = parsedTeamObj.name;
		} else if (prop === 'shortName') {
			parsedTeamObj = parsedTeamObj.shortName;
		} else if (prop === 'url') {
			parsedTeamObj = parsedTeamObj.url;
		} else {
			return null;
		}

		return parsedTeamObj;
	} else {
		return null;
	}
};
