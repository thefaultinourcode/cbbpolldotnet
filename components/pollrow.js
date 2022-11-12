import Image from 'next/image';

export default function TeamRow(props){

    let team;
    if(props.firstPlaceVotes > 0){
        team = <div><Image src={props.url} width={30} height={30}></Image> <span className="boldText">{props.teamName}</span> ({props.firstPlaceVotes})</div>;
    }
    else{
        team = <div><Image src={props.url} width={30} height={30}></Image> <span className="boldText">{props.teamName}</span></div>;
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
            -
            </td>
            <td>
            {props.points}
            </td>
        </tr>
    );
}