import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';

const axios = require('axios').default;

class Dropdown extends React.Component{
    state = {
        teamsData: []
    };

    componentDidMount() {
        axios.get('/api/teamsData')
          .then(res => {
            const teamsData = res.data.data;
            console.log('teams:', teamsData);
            this.setState({ teamsData });
          })
    }  

      render() {
        let options = this.state.teamsData;
        console.log('options:', options);
        let teamList = []


        for(let i = 0; i < options.length; i++){
            teamList.push({value:options[i]._id, label: options[i].name});
        }

        return (
        <div>
            <Select instanceId="long-value-select" 
                    value={teamList.find(obj => obj.value === selectedValue)}
                    options={teamList}>
            </Select>
            <ul>
            {
                this.state.teamsData
                .map(team =>
                  <li key={team._id}>{team.name}</li>
                )
            }
          </ul>
        </div>

        )
      }
}

export default Dropdown;

// export function Dropdown(){
    
//     const [t, getTeams] = useState('');

//     state = {
//         teams: []
//     };

//     componentDidMount() {
//         axios.get('/api/teams')
//         .then(res => {
//             const teams = res.data;
//             this.setState( {teams} );
//         });
//     }

//     console.log('state:', state);

//     let teams;

//     let test;

//     async function axiosTest() {
//         const response = await axios.get('/api/teams');
//         return response.data;
//     }

//     const getAllTeams = () => {

//     }

//     teams = axiosTest().then(
//         function (result) {
//             console.log('result:', result.data[0].name);
//             const teamObj = result.data;
//         }
//     );
    
//     console.log('teams test:', teams);

//     // useEffect(() => {
//     //     const getAds = async () => {
//     //       const res = await axios.get('/api/teams');
//     //       console.log(res.data);
//     //       teams = res.data;
//     //     }
//     //     getAds()
//     //     console.log('teams:', teams);
//     //   }, []);

//     console.log('test:', teams);
    
//     return(<div>
//         <h1>Vote in the poll</h1>
//         <select placeholder='Select option'>
//             <option value='option1'>Option 1</option>
//             <option value='option2'>Option 2</option>
//             <option value='option3'>Option 3</option>
//         </select>
//     </div>);
// }