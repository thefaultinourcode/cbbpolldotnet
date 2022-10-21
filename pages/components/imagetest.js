import { useState } from "react";
// import { connectMongo }  from '../../utils/connect';
// import TeamData from "../../models/TeamData";
import Select from 'react-select';
import Image from 'next/image';

export default function ImageTest(){
        const options = [
            {
                "_id": 1,
                "name": "Abilene Christian University",
                "shortName": "Abilene Christian",
                "nickname": "Wildcats",
                "codes": ["ACU"],
                "conference": "WAC",
                "allTimeApVotes": 0, 
                "url": "/../public/img/D1/Western/AbileneChristian/AbileneChristian1.png"
            },
            {
                "_id": 2,
                "name": "United States Air Force Academy",
                "shortName": "Air Force",
                "nickname": "Falcons",
                "codes": ["AF"],
                "conference": "Mountain West",
                "allTimeApVotes": 87,
                "url": "/../public/img/D1/Ivy/Brown/Brown1.png"
            }
    ];

    let teamList = [];

   // let teamsParse = JSON.parse(options);

    options.sort((a,b) => (b.allTimeApVotes > a.allTimeApVotes) ? 1 : -1);

    for(let i = 0; i < options.length; i++){
        teamList.push({value:options[i]._id, label: options[i].name, url: options[i].url});
        console.log('options[i].url:', options[i].url);
    }


    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState(null);

    const handleChange = e => {
        setSelectedValue(e.value);
        setSelectedLabel(e.label);
    }

    const twoCalls = e => {
        //props.change(e);
        handleChange(e);
    }

    return(
        <div>
             <Select   
                        instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue)}
                        label={teamList.filter(obj => obj.label === selectedLabel)}
                        options={teamList}
                        //onChange={event => props.change(event)}
                        onChange={event => twoCalls(event)}
                        formatOptionLabel={team => (
                                <div className="teamOption">
                                    {/* <img src={team.url} alt={team.name}></img> */}
                                    <Image src={team.url} width={25} height={25} alt={team.name}></Image>
                                    <span> {team.label}</span>
                                </div>
                            )
                        }
                        ></Select> 
                        <h1>team list: {teamList.map(home => <div>url: {teamList.label}</div>)}</h1>
                        <img src='/../public/img/D1/Western/AbileneChristian/AbileneChristian1.png'/>
                        <Image src='/../public/img/D1/Western/AbileneChristian/AbileneChristian1.png' width={25} height={25}></Image>
        </div>
    );
}
