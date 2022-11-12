import TeamDropdown from "./teamdropdown";
import React, { useDebugValue, useState, useRef, setState, useEffect } from "react";

export default function BallotRow(props){

    let value, label;
    if(props.ballot !== null){

    }
    else{
        value = null;
        label = null;
    }

    const [teamValue, setTeamValue] = useState(null);
    const [teamLabel, setTeamLabel] = useState(null);
    const [rank, setRank] = useState();
    const [reasoning, setReasoning] = useState('');

    const handleBallotChange = e => {
        setTeamValue(e.value);
        setTeamLabel(e.label);
        setRank(props.rank);
    }

    let id = "reasoning" + props.rank;
    let input;
    if(props.reasoning){
        input = <input type="textbox" id={id} className="reasoning" defaultValue={props.reasoning} maxLength={200} onInput={props.changeReasoning}></input>;
    }
    else{
        input = <input type="textbox" id={id} className="reasoning" maxLength={200} onInput={props.changeReasoning}></input>;
    }

    
    return(            
        <tr>
            <td>{props.rank}</td>
            {/* <td><TeamDropdown teams={props.teams} change={handleBallotChange}></TeamDropdown></td> */}
            <td><TeamDropdown teams={props.teams} change={props.changeState} rank={props.rank} update={props.update} presetTeam={props.presetTeam}></TeamDropdown></td>
            <td>{input}</td>
        </tr>
    );
}