import TeamDropdown from "./teamdropdown";
import BallotRow from "./ballotrow";
import React, { useDebugValue, useState, useRef, setState, useEffect } from "react";

export default function Ballot(props){
    let teams = props.teams;

    const [teamValue, setTeamValue] = useState(null);
    const [teamLabel, setTeamLabel] = useState(null);
    const [teamRank, setRank] = useState();
    const [reasoning, setReasoning] = useState('');

    const changeState = (e) => {
        console.log('ballot e:', e);
        const value = e.value;
        const label = e.label;
        const rank = e.rank;
        setTeamValue(value);
        setTeamLabel(label);
        setRank(rank);

        return {
            id: teamValue,
            name: teamLabel,
            rank: teamRank
        }

        // ballot.id = value;
        // //ballot[rank].id = value;

        // console.log('props:', props);     
    }

    const changeReasoning = (e) => {
        console.log('reasoning e:', e);
        console.log('target:', e.target.id);

        let id = e.target.id;
        id = id.replace('reasoning','');
        console.log('id:', id);

        console.log(e.target.value);

        return {
            id: id,
            reasoning: e.target.value
        };
    }

        // ballot[rank] = {
        //     id: teamValue,
        //     name: teamLabel,
        //     rank: rank
        // }

    // const updateBallot = (ballot, id, name, rank) => {
    //     return {
    //         id: id,
    //         name: name,
    //         rank: rank
    //     }        
    // }

    //ballot[rank] = updateBallot(ballot, teamValue, teamLabel, rank, reasoning);

    let ballotRows = [];

    let ballotObj = props.ballot;



    for(let i = 1; i <= 25; i++){
        let row;
        if(ballotObj){
            row = <BallotRow teams={teams} rank={i} changeState={changeState} changeReasoning={changeReasoning} update={props.update} presetTeam={props.ballot[i].id} reasoning={props.ballot[i].reasoning}></BallotRow>;
        }
        else{
            row = <BallotRow teams={teams} rank={i} changeState={changeState} changeReasoning={changeReasoning} update={props.update}></BallotRow>
        }
        ballotRows.push(row)
    }

    return(                        
    <table className="ballotTable">
        <tbody>
            <tr>                                
                <th>Rank</th>
                <th>Team</th>
                <th>Reason</th>                                
            </tr>
            {ballotRows.map((row) => row)}
            {/* <BallotRow teams={teams} rank={1} changeState={changeState} update={props.update}></BallotRow>
            <BallotRow teams={teams} rank={2} changeState={changeState} update={props.update}></BallotRow>
            <BallotRow teams={teams} rank={3} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={4} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={5} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={6} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={7} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={8} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={9} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={10} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={11} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={12} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={13} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={14} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={15} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={16} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={17} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={18} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={19} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={20} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={21} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={22} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={23} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={24} changeState={changeState}></BallotRow>
            <BallotRow teams={teams} rank={25} changeState={changeState}></BallotRow> */}
            {/* <tr>
                <td>1</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning1" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>2</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange2}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning2" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>3</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange3}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning3" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>4</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange4}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning4" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>5</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange5}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning5" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>6</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange6}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning6" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>7</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange7}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning7" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>8</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange8}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning8"className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>9</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange9}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning9" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>10</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange10}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning10" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>11</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange11}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning11" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>12</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange12}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning12" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>13</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange13}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning13" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>14</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange14}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning14" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>15</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange15}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning15" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>16</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange16}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning16" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>17</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange17}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning17" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>18</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange18}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning18" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>19</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange19}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning19" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>20</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange20}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning20" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>21</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange21}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning21" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>22</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange22}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning22" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>23</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange23}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning23" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>24</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange24}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning24" className="reasoning" maxLength={200}></input></td>
            </tr>
            <tr>
                <td>25</td>
                <td><TeamDropdown teams={teams} change={handleBallotChange25}></TeamDropdown></td>
                <td><input type="textbox" id="reasoning25" className="reasoning" maxLength={200}></input></td>
            </tr> */}
        </tbody>
    </table>)    
}

