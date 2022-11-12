import Image from 'next/image';

export default function TeamRow(props){

    return(
        <tr>
            <td>{props.rank}</td>
            <td><Image src={props.url} width={25} height={25} alt={props.rank}></Image> <span className="boldText">{props.name}</span> </td>
            <td>{props.reasoning}</td>
        </tr>
    );

}