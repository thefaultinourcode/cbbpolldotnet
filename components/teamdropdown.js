import { useState } from "react";
// import { connectMongo }  from '../../utils/connect';
// import TeamData from "../../models/TeamData";
import Select from 'react-select';
import Image from 'next/image';

export default function TeamDropdown(props){
    // let sub = JSON.parse(JSON.stringify(props));
    const id = props.id;
    const options = props.teams;
    let teamList = [];

    // const id = sub.id;
    // const options = sub.teams;

    let teamsParse = JSON.parse(options);

    teamsParse.sort((a,b) => (b.allTimeApVotes > a.allTimeApVotes) ? 1 : -1);

    for(let i = 0; i < teamsParse.length; i++){
        let label = teamsParse[i].shortName + " " + teamsParse[i].name;
        teamList.push({value:teamsParse[i]._id, label: label, url: teamsParse[i].url, shortName: teamsParse[i].shortName, name: teamsParse[i].name, rank: props.rank});
    }

    
    // const control = () => ({
    //         width: 200,
    // })
  
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState(null);

    const handleChange = e => {
        setSelectedValue(e.value);
        setSelectedLabel(e.label);
    }

    const handleLoad = (value, label) => {
        setSelectedValue(value);
        setSelectedLabel(label);
        console.log('values:', selectedValue, selectedLabel);
        console.log('SOS');
    }

    const twoCalls = e => {
        props.update(e);
        props.change(e);
        handleChange(e);
    }

    const twoCallsLoad = e => {
        props.load(e);
        handleLoad(e);
    }

    if(props.presetTeam){
        let obj = teamList.find(o => o.value === props.presetTeam);

        return(
            <div>
                 <Select    id={id}
                            instanceId="long-value-select" 
                            // control={control}
                            options={teamList}
                            defaultValue={{label:obj.label, value:obj.value, shortName:obj.shortName, url:obj.url, name:obj.name}}
                            onChange={event => twoCalls(event)}
                            rank={props.rank}
                            // onLoad={() => handleLoad(obj.value, obj.label)}
                            // value={teamList.filter(obj => obj.value === selectedValue)}
                            // label={teamList.filter(obj => obj.label === selectedLabel)}
                            formatOptionLabel={team => (
                                    <div className="teamOption ">    
                                        <Image src={team.url} width={25} height={25} alt={team.name}></Image>                                            
                                        <div className="teamLabel"><span className="boldText">{team.shortName}</span> ({team.name})</div>
                                    </div>
                                )    
                            }
                ></Select> 
            </div>
        );
    }
    else{   
        return(
            <div>
                 <Select    id={id}
                            instanceId="long-value-select" 
                            value={teamList.filter(obj => obj.value === selectedValue)}
                            label={teamList.filter(obj => obj.label === selectedLabel)}
                            options={teamList}
                            onChange={event => twoCalls(event)}
                            rank={props.rank}
                            formatOptionLabel={team => (
                                    <div className="teamOption ">    
                                        <Image src={team.url} width={25} height={25} alt={team.name}></Image>                                            
                                        <div className="teamLabel"><span className="boldText">{team.shortName}</span> ({team.name})</div>
                                    </div>
                                )    
                            }
                ></Select> 
            </div>
        );
    }



   
}

// export const getTeams = async () => {
//     try{
//         console.log('CONNECTING TO MONGO');
//         await connectMongo();
//         console.log('CONNECTED TO MONGO');

//         console.log('FETCHING TEAMS');
//         const teams = await TeamData.find({});
//         const allTeams = JSON.parse(JSON.stringify(teams));
//         console.log('FETCHED TEAMS');

//         return allTeams;

//     }
//     catch(error){
//         console.log(error);
//         const allTeams = [];
//         return allTeams;
//     }
// }

// export const getServerSideProps = async () => {
//     try{
//         console.log('CONNECTING TO MONGO');
//         await connectMongo();
//         console.log('CONNECTED TO MONGO');

//         console.log('FETCHING TEAMS');
//         const teams = await TeamData.find({});
//         const allTeams = JSON.parse(JSON.stringify(teams));
//         console.log('FETCHED TEAMS');

//         return{
//             props: {allTeams}
//         }

//     }
//     catch(error){
//         console.log(error);
//         return{
//             notFound: true
//         }
//     }
// }