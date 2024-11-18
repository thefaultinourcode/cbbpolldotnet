import Image from 'next/image';

export default function PollRow(props){

    let team;
	let teamDelta;
	const getColor = (change) => {
		if (change === 0) return 'transparent';
		const intensity = Math.min(255, Math.abs(change) * 50); // Adjust intensity multiplier as needed
		return change > 0
		  ? `rgba(0, ${intensity}, 0, 0.6)`  // Green for rank increase
		  : `rgba(${intensity}, 0, 0, 0.6)`; // Red for rank decrease
	  };
    if(props.firstPlaceVotes > 0){
        team = <div><Image src={props.url} width={30} height={30}></Image> <span className="boldText">{props.teamName}</span> ({props.firstPlaceVotes})</div>;
    }
    else{
        team = <div><Image src={props.url} width={30} height={30}></Image> <span className="boldText">{props.teamName}</span></div>;
    }
	if(props.delta) {
		teamDelta = <td style={{ backgroundColor: getColor(props.delta), color: '#fff', textAlign: 'center' }}>
		{props.delta === 0 ? '-' : props.delta > 0 ? `+${props.delta}` : props.delta}</td>
	}

    return(
        <tr>
            <td>
            {props.rank}
            </td>
            <td>
                {team}
            </td>
            <td>
            {props.points}
            </td>
			{teamDelta}
        </tr>
    );
}
