import PollRow from "./pollrow";

export default function Poll(props){
    let teams = props.teams;

    let rows = [];

    for(let i = 0; i < teams.length; i++){
        rows.push(<PollRow rank={teams[i].rank} points={teams[i].points} url={teams[i].url} teamName={teams[i].teamName} firstPlaceVotes={teams[i].firstPlaceVotes}></PollRow>)
    }

    return(
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>
                    {rows.map(row => row)}
                </tbody>
            </table>
        </div>
    );
}