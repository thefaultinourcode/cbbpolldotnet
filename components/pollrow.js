import Image from "next/image";

export default function PollRow(props) {
	let team;
	if (props.firstPlaceVotes > 0) {
		team = (
			<div>
				<Image src={props.url} width={30} height={30} alt={props.teamName}></Image>{" "}
				<span className="boldText">{props.teamName}</span> ({props.firstPlaceVotes})
			</div>
		);
	} else {
		team = (
			<div>
				<Image src={props.url} width={30} height={30} alt={props.teamName}></Image>{" "}
				<span className="boldText">{props.teamName}</span>
			</div>
		);
	}

	return (
		<tr>
			<td>{props.rank}</td>
			<td>{team}</td>
			<td>{props.points}</td>
		</tr>
	);
}
