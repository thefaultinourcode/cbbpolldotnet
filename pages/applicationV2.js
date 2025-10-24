import React, { useDebugValue, useState, useRef, setState, useEffect } from 'react';

import { connectMongo } from '../utils/connect';
import TeamData from '../models/TeamData';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import axios, { Axios } from 'axios';
import TeamDropdown from '../components/teamdropdown';
import Navbar from '../components/navbar';
import ApplicationData from '../models/ApplicationData';
import UserBallot from '../models/UserBallot';
import User from '../models/User';
import { useRouter } from 'next/router';
import {DateTime} from 'luxon';

export default function Application({user, teams, app, ballot, userTeams}){

    const form = useRef(null);  
    const partOne = useRef(null);
    const partTwo = useRef(null);
    const approach = useRef(null);
    const participation = useRef(null);
    const bias = useRef(null);
    const meme = useRef(null);
    const router = useRouter();
    
    //allow input of close date 
    //make call to db to get this date
    let closeDate = new Date(Date.UTC(2025, 9, 25, 3, 59));

	const handleSubmit = async (event) => {
		console.log('target:', event.target);
		event.preventDefault();

		let today = new Date();
		const season = today.getFullYear() + 1;
		console.log('season added:', season);

		let ballotArray = [
			oneTeamValue,
			twoTeamValue,
			threeTeamValue,
			fourTeamValue,
			fiveTeamValue,
			sixTeamValue,
			sevenTeamValue,
			eightTeamValue,
			nineTeamValue,
			tenTeamValue,
			elevenTeamValue,
			twelveTeamValue,
			thirteenTeamValue,
			fourteenTeamValue,
			fifteenTeamValue,
			sixteenTeamValue,
			seventeenTeamValue,
			eighteenTeamValue,
			nineteenTeamValue,
			twentyTeamValue,
			twentyOneTeamValue,
			twentyTwoTeamValue,
			twentyThreeTeamValue,
			twentyFourTeamValue,
			twentyFiveTeamValue,
		];
		let validBallot = validateBallot(ballotArray);

		if (validBallot === false) {
			return;
		}

		const pollUser = {
			name: event.target.user.value,
			primaryTeam: primaryTeamValue,
			secondaryTeam: secondaryTeamValue,
			tertiaryTeam: tertiaryTeamValue,
			pollVoter: false,
		};

		const application = {
			user: event.target.user.value,
			favoriteTeam: primaryTeamValue,
			favoriteTeam2: secondaryTeamValue,
			favoriteTeam3: tertiaryTeamValue,
			checkbox1: event.target.checkbox1.checked,
			checkbox2: event.target.checkbox2.checked,
			checkbox3: event.target.checkbox3.checked,
			checkbox4: event.target.checkbox4.checked,
			checkbox5: event.target.checkbox5.checked,
			checkbox6: event.target.checkbox6.checked,
			checkbox7: event.target.checkbox7.checked,
			checkbox8: event.target.checkbox8.checked,
			checkbox9: event.target.checkbox9.checked,
			checkbox10: event.target.checkbox10.checked,
			checkbox11: event.target.checkbox11.checked,
			checkbox12: event.target.checkbox12.checked,
			approach: event.target.approach.value,
			extra: event.target.extra.value,
			participationRequirement: event.target.participationRequirement.checked,
			biasRequirement: event.target.biasRequirement.checked,
			memeRequirement: event.target.memeRequirement.checked,
			season: season,
		};

		const voterBallot = {
			date: Date.now(),
			week: 'Pre-Season',
			user: event.target.user.value,
			1: {
				id: oneTeamValue,
				name: oneTeamLabel,
				reasoning: event.target.reasoning1.value,
				points: 25,
			},
			2: {
				id: twoTeamValue,
				name: twoTeamLabel,
				reasoning: event.target.reasoning2.value,
				points: 24,
			},
			3: {
				id: threeTeamValue,
				name: threeTeamLabel,
				reasoning: event.target.reasoning3.value,
				points: 23,
			},
			4: {
				id: fourTeamValue,
				name: fourTeamLabel,
				reasoning: event.target.reasoning4.value,
				points: 22,
			},
			5: {
				id: fiveTeamValue,
				name: fiveTeamLabel,
				reasoning: event.target.reasoning5.value,
				points: 21,
			},
			6: {
				id: sixTeamValue,
				name: sixTeamLabel,
				reasoning: event.target.reasoning6.value,
				points: 20,
			},
			7: {
				id: sevenTeamValue,
				name: sevenTeamLabel,
				reasoning: event.target.reasoning7.value,
				points: 19,
			},
			8: {
				id: eightTeamValue,
				name: eightTeamLabel,
				reasoning: event.target.reasoning8.value,
				points: 18,
			},
			9: {
				id: nineTeamValue,
				name: nineTeamLabel,
				reasoning: event.target.reasoning9.value,
				points: 17,
			},
			10: {
				id: tenTeamValue,
				name: tenTeamLabel,
				reasoning: event.target.reasoning10.value,
				points: 16,
			},
			11: {
				id: elevenTeamValue,
				name: elevenTeamLabel,
				reasoning: event.target.reasoning11.value,
				points: 15,
			},
			12: {
				id: twelveTeamValue,
				name: twelveTeamLabel,
				reasoning: event.target.reasoning12.value,
				points: 14,
			},
			13: {
				id: thirteenTeamValue,
				name: thirteenTeamLabel,
				reasoning: event.target.reasoning13.value,
				points: 13,
			},
			14: {
				id: fourteenTeamValue,
				name: fourteenTeamLabel,
				reasoning: event.target.reasoning14.value,
				points: 12,
			},
			15: {
				id: fifteenTeamValue,
				name: fifteenTeamLabel,
				reasoning: event.target.reasoning15.value,
				points: 11,
			},
			16: {
				id: sixteenTeamValue,
				name: sixteenTeamLabel,
				reasoning: event.target.reasoning16.value,
				points: 10,
			},
			17: {
				id: seventeenTeamValue,
				name: seventeenTeamLabel,
				reasoning: event.target.reasoning17.value,
				points: 9,
			},
			18: {
				id: eighteenTeamValue,
				name: eighteenTeamLabel,
				reasoning: event.target.reasoning18.value,
				points: 8,
			},
			19: {
				id: nineteenTeamValue,
				name: nineteenTeamLabel,
				reasoning: event.target.reasoning19.value,
				points: 7,
			},
			20: {
				id: twentyTeamValue,
				name: twentyTeamLabel,
				reasoning: event.target.reasoning20.value,
				points: 6,
			},
			21: {
				id: twentyOneTeamValue,
				name: twentyOneTeamLabel,
				reasoning: event.target.reasoning21.value,
				points: 5,
			},
			22: {
				id: twentyTwoTeamValue,
				name: twentyTwoTeamLabel,
				reasoning: event.target.reasoning22.value,
				points: 4,
			},
			23: {
				id: twentyThreeTeamValue,
				name: twentyThreeTeamLabel,
				reasoning: event.target.reasoning23.value,
				points: 3,
			},
			24: {
				id: twentyFourTeamValue,
				name: twentyFourTeamLabel,
				reasoning: event.target.reasoning24.value,
				points: 2,
			},
			25: {
				id: twentyFiveTeamValue,
				name: twentyFiveTeamLabel,
				reasoning: event.target.reasoning25.value,
				points: 1,
			},
			overallReasoning: event.target.overallReasoning.value,
		};

		if (application === null) {
			console.log('app is null');
		}
		const res = await fetch('/api/addApp', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(application),
		});

		const data = await res.json();

		const res2 = await fetch('/api/addBallot', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(voterBallot),
		});

		const data2 = await res2.json();

		console.log('userExists:', event.target.userExists.value);
		console.log('PollUser:', pollUser);
		if (event.target.userExists.value === 'false') {
			console.log('user does not exist');
			const res3 = await fetch('/api/addUser', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(pollUser),
			});

			const data3 = await res3.json();
		} else {
			console.log('user exists');
		}

		router.push({ pathname: '/submit' });
	};

	function ballotApp(e) {
		let appIsValid = validateApp();
		if (appIsValid) {
			toggleShow();
			window.scrollTo({ top: 0, left: 0 });
			// window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
		}
	}

	function toggleShow() {
		setShow(!show);
	}

	function validateApp() {
		let appIsValid = true;
		if (!primaryTeamValue) {
			appIsValid = false;
			setErrorPrimaryTeam('*Please select a Primary Team');
		}
		if (!approach.current.value) {
			appIsValid = false;
			setErrorApproach('*Please enter your approach to voting');
		}
		if (!participation.current.checked) {
			appIsValid = false;
			setErrorParticipation('*Please confirm that you understand the participation requirement');
		}
		if (!bias.current.checked) {
			appIsValid = false;
			setErrorBias('*Please confirm that you understand the no bias requirement');
		}
		if (!meme.current.checked) {
			appIsValid = false;
			setErrorMeme('*Please confirm that you understand meme votes will not be allowed this season');
		}
		if (primaryTeamValue === secondaryTeamValue || primaryTeamValue === tertiaryTeamValue || (secondaryTeamValue === tertiaryTeamValue && secondaryTeamValue)) {
			appIsValid = false;
			setErrorTeams('*Please only select a team once');
		}
		return appIsValid;
	}

	function validateBallot(ballot) {
		let errorMsg = '';
		let validBallot = true;
		const ballotSet = new Set();
		ballot.forEach((item) => ballotSet.add(item));

		if (ballot.includes(null) == true) {
			errorMsg = 'No ranking can be left blank. Please select a team for each rank, 1-25. ';
			validBallot = false;
		} else if (ballotSet.size !== ballot.length) {
			errorMsg = errorMsg + 'No team can be selected twice on the ballot. Please select 25 unique teams. ';
			validBallot = false;
		}

		setErrorBallot(errorMsg);
		return validBallot;
	}

	console.log('userTeams:', userTeams);

	const [errorPrimaryTeam, setErrorPrimaryTeam] = useState();
	const [errorApproach, setErrorApproach] = useState();
	const [errorParticipation, setErrorParticipation] = useState();
	const [errorBias, setErrorBias] = useState();
	const [errorMeme, setErrorMeme] = useState();
	const [errorTeams, setErrorTeams] = useState();

	const [errorBallot, setErrorBallot] = useState();

	let favTeam, favTeam2, favTeam3;
	if (app != null) {
		favTeam = app.favoriteTeam;
		console.log('favTeam:', favTeam);
		favTeam2 = app.favoriteTeam2;
		favTeam3 = app.favoriteTeam3;
	} else if (userTeams !== null) {
		console.log('userTeams:', userTeams);
		favTeam = userTeams.primary;
		favTeam2 = userTeams.secondary;
		favTeam3 = userTeams.tertiary;
	} else {
		favTeam = null;
		favTeam2 = null;
		favTeam3 = null;
	}

	const [primaryTeamValue, setPrimaryTeamValue] = useState(favTeam);
	const [primaryTeamLabel, setPrimaryTeamLabel] = useState(null);

	const [secondaryTeamValue, setSecondaryTeamValue] = useState(favTeam2);
	const [secondaryTeamLabel, setSecondaryTeamLabel] = useState(null);

	const [tertiaryTeamValue, setTertiaryTeamValue] = useState(favTeam3);
	const [tertiaryTeamLabel, setTertiaryTeamLabel] = useState(null);

	const [show, setShow] = useState(false);

	const handleChange = (e) => {
		setPrimaryTeamValue(e.value);
		setPrimaryTeamLabel(e.label);
	};

	const handleChange2 = (e) => {
		setSecondaryTeamValue(e.value);
		setSecondaryTeamLabel(e.label);
	};

	const handleChange3 = (e) => {
		setTertiaryTeamValue(e.value);
		setTertiaryTeamLabel(e.label);
	};

	let one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty, twentyOne, twentyTwo, twentyThree, twentyFour, twentyFive;

	let oneL, twoL, threeL, fourL, fiveL, sixL, sevenL, eightL, nineL, tenL, elevenL, twelveL, thirteenL, fourteenL, fifteenL, sixteenL, seventeenL, eighteenL, nineteenL, twentyL, twentyOneL, twentyTwoL, twentyThreeL, twentyFourL, twentyFiveL;

	if (ballot != null) {
		one = ballot['1'].id;
		oneL = ballot['1'].name;
		two = ballot['2'].id;
		twoL = ballot['2'].name;
		three = ballot['3'].id;
		threeL = ballot['3'].name;
		four = ballot['4'].id;
		fourL = ballot['4'].name;
		five = ballot['5'].id;
		fiveL = ballot['5'].name;
		six = ballot['6'].id;
		sixL = ballot['6'].name;
		seven = ballot['7'].id;
		sevenL = ballot['7'].name;
		eight = ballot['8'].id;
		eightL = ballot['8'].name;
		nine = ballot['9'].id;
		nineL = ballot['9'].name;
		ten = ballot['10'].id;
		tenL = ballot['10'].name;
		eleven = ballot['11'].id;
		elevenL = ballot['11'].name;
		twelve = ballot['12'].id;
		twelveL = ballot['12'].name;
		thirteen = ballot['13'].id;
		thirteenL = ballot['13'].name;
		fourteen = ballot['14'].id;
		fourteenL = ballot['14'].name;
		fifteen = ballot['15'].id;
		fifteenL = ballot['15'].name;
		sixteen = ballot['16'].id;
		sixteenL = ballot['16'].name;
		seventeen = ballot['17'].id;
		seventeenL = ballot['17'].name;
		eighteen = ballot['18'].id;
		eighteenL = ballot['18'].name;
		nineteen = ballot['19'].id;
		nineteenL = ballot['19'].name;
		twenty = ballot['20'].id;
		twentyL = ballot['20'].name;
		twentyOne = ballot['21'].id;
		twentyOneL = ballot['21'].name;
		twentyTwo = ballot['22'].id;
		twentyTwoL = ballot['22'].name;
		twentyThree = ballot['23'].id;
		twentyThreeL = ballot['23'].name;
		twentyFour = ballot['24'].id;
		twentyFourL = ballot['24'].name;
		twentyFive = ballot['25'].id;
		twentyFiveL = ballot['25'].name;
	} else {
		one = null;
		oneL = null;
		two = null;
		twoL = null;
		three = null;
		threeL = null;
		four = null;
		fourL = null;
		five = null;
		fiveL = null;
		six = null;
		sixL = null;
		seven = null;
		sevenL = null;
		eight = null;
		eightL = null;
		nine = null;
		nineL = null;
		ten = null;
		tenL = null;
		eleven = null;
		elevenL = null;
		twelve = null;
		twelveL = null;
		thirteen = null;
		thirteenL = null;
		fourteen = null;
		fourteenL = null;
		fifteen = null;
		fifteenL = null;
		sixteen = null;
		sixteenL = null;
		seventeen = null;
		seventeenL = null;
		eighteen = null;
		eighteenL = null;
		nineteen = null;
		nineteenL = null;
		twenty = null;
		twentyL = null;
		twentyOne = null;
		twentyOneL = null;
		twentyTwo = null;
		twentyTwoL = null;
		twentyThree = null;
		twentyThreeL = null;
		twentyFour = null;
		twentyFourL = null;
		twentyFive = null;
		twentyFiveL = null;
	}

	const [oneTeamValue, setOneTeamValue] = useState(one);
	const [oneTeamLabel, setOneTeamLabel] = useState(oneL);

	const handleBallotChange = (e) => {
		setOneTeamValue(e.value);
		setOneTeamLabel(e.shortName);
	};

	const [twoTeamValue, setTwoTeamValue] = useState(two);
	const [twoTeamLabel, setTwoTeamLabel] = useState(twoL);

	const handleBallotChange2 = (e) => {
		setTwoTeamValue(e.value);
		setTwoTeamLabel(e.shortName);
	};

	const [threeTeamValue, setThreeTeamValue] = useState(three);
	const [threeTeamLabel, setThreeTeamLabel] = useState(threeL);

	const handleBallotChange3 = (e) => {
		setThreeTeamValue(e.value);
		setThreeTeamLabel(e.shortName);
	};

	const [fourTeamValue, setFourTeamValue] = useState(four);
	const [fourTeamLabel, setFourTeamLabel] = useState(fourL);

	const handleBallotChange4 = (e) => {
		setFourTeamValue(e.value);
		setFourTeamLabel(e.shortName);
	};

	const [fiveTeamValue, setFiveTeamValue] = useState(five);
	const [fiveTeamLabel, setFiveTeamLabel] = useState(fiveL);

	const handleBallotChange5 = (e) => {
		setFiveTeamValue(e.value);
		setFiveTeamLabel(e.shortName);
	};

	const [sixTeamValue, setSixTeamValue] = useState(six);
	const [sixTeamLabel, setSixTeamLabel] = useState(sixL);

	const handleBallotChange6 = (e) => {
		setSixTeamValue(e.value);
		setSixTeamLabel(e.shortName);
	};

	const [sevenTeamValue, setSevenTeamValue] = useState(seven);
	const [sevenTeamLabel, setSevenTeamLabel] = useState(sevenL);

	const handleBallotChange7 = (e) => {
		setSevenTeamValue(e.value);
		setSevenTeamLabel(e.shortName);
	};

	const [eightTeamValue, setEightTeamValue] = useState(eight);
	const [eightTeamLabel, setEightTeamLabel] = useState(eightL);

	const handleBallotChange8 = (e) => {
		setEightTeamValue(e.value);
		setEightTeamLabel(e.shortName);
	};

	const [nineTeamValue, setNineTeamValue] = useState(nine);
	const [nineTeamLabel, setNineTeamLabel] = useState(nineL);

	const handleBallotChange9 = (e) => {
		setNineTeamValue(e.value);
		setNineTeamLabel(e.shortName);
	};

	const [tenTeamValue, setTenTeamValue] = useState(ten);
	const [tenTeamLabel, setTenTeamLabel] = useState(tenL);

	const handleBallotChange10 = (e) => {
		setTenTeamValue(e.value);
		setTenTeamLabel(e.shortName);
	};

	const [elevenTeamValue, setElevenTeamValue] = useState(eleven);
	const [elevenTeamLabel, setElevenTeamLabel] = useState(elevenL);

	const handleBallotChange11 = (e) => {
		setElevenTeamValue(e.value);
		setElevenTeamLabel(e.shortName);
	};

	const [twelveTeamValue, setTwelveTeamValue] = useState(twelve);
	const [twelveTeamLabel, setTwelveTeamLabel] = useState(twelveL);

	const handleBallotChange12 = (e) => {
		setTwelveTeamValue(e.value);
		setTwelveTeamLabel(e.shortName);
	};

	const [thirteenTeamValue, setThirteenTeamValue] = useState(thirteen);
	const [thirteenTeamLabel, setThirteenTeamLabel] = useState(thirteenL);

	const handleBallotChange13 = (e) => {
		setThirteenTeamValue(e.value);
		setThirteenTeamLabel(e.shortName);
	};

	const [fourteenTeamValue, setFourteenTeamValue] = useState(fourteen);
	const [fourteenTeamLabel, setFourteenTeamLabel] = useState(fourteenL);

	const handleBallotChange14 = (e) => {
		setFourteenTeamValue(e.value);
		setFourteenTeamLabel(e.shortName);
	};

	const [fifteenTeamValue, setFifteenTeamValue] = useState(fifteen);
	const [fifteenTeamLabel, setFifteenTeamLabel] = useState(fifteenL);

	const handleBallotChange15 = (e) => {
		setFifteenTeamValue(e.value);
		setFifteenTeamLabel(e.shortName);
	};

	const [sixteenTeamValue, setSixteenTeamValue] = useState(sixteen);
	const [sixteenTeamLabel, setSixteenTeamLabel] = useState(sixteenL);

	const handleBallotChange16 = (e) => {
		setSixteenTeamValue(e.value);
		setSixteenTeamLabel(e.shortName);
	};

	const [seventeenTeamValue, setSeventeenTeamValue] = useState(seventeen);
	const [seventeenTeamLabel, setSeventeenTeamLabel] = useState(seventeenL);

	const handleBallotChange17 = (e) => {
		setSeventeenTeamValue(e.value);
		setSeventeenTeamLabel(e.shortName);
	};

	const [eighteenTeamValue, setEighteenTeamValue] = useState(eighteen);
	const [eighteenTeamLabel, setEighteenTeamLabel] = useState(eighteenL);

	const handleBallotChange18 = (e) => {
		setEighteenTeamValue(e.value);
		setEighteenTeamLabel(e.shortName);
	};

	const [nineteenTeamValue, setNineteenTeamValue] = useState(nineteen);
	const [nineteenTeamLabel, setNineteenTeamLabel] = useState(nineteenL);

	const handleBallotChange19 = (e) => {
		setNineteenTeamValue(e.value);
		setNineteenTeamLabel(e.shortName);
	};

	const [twentyTeamValue, setTwentyTeamValue] = useState(twenty);
	const [twentyTeamLabel, setTwentyTeamLabel] = useState(twentyL);

	const handleBallotChange20 = (e) => {
		setTwentyTeamValue(e.value);
		setTwentyTeamLabel(e.shortName);
	};

	const [twentyOneTeamValue, setTwentyOneTeamValue] = useState(twentyOne);
	const [twentyOneTeamLabel, setTwentyOneTeamLabel] = useState(twentyOneL);

	const handleBallotChange21 = (e) => {
		setTwentyOneTeamValue(e.value);
		setTwentyOneTeamLabel(e.shortName);
	};

	const [twentyTwoTeamValue, setTwentyTwoTeamValue] = useState(twentyTwo);
	const [twentyTwoTeamLabel, setTwentyTwoTeamLabel] = useState(twentyTwoL);

	const handleBallotChange22 = (e) => {
		setTwentyTwoTeamValue(e.value);
		setTwentyTwoTeamLabel(e.shortName);
	};

	const [twentyThreeTeamValue, setTwentyThreeTeamValue] = useState(twentyThree);
	const [twentyThreeTeamLabel, setTwentyThreeTeamLabel] = useState(twentyThreeL);

	const handleBallotChange23 = (e) => {
		setTwentyThreeTeamValue(e.value);
		setTwentyThreeTeamLabel(e.shortName);
	};

	const [twentyFourTeamValue, setTwentyFourTeamValue] = useState(twentyFour);
	const [twentyFourTeamLabel, setTwentyFourTeamLabel] = useState(twentyFourL);

	const handleBallotChange24 = (e) => {
		setTwentyFourTeamValue(e.value);
		setTwentyFourTeamLabel(e.shortName);
	};

	const [twentyFiveTeamValue, setTwentyFiveTeamValue] = useState(twentyFive);
	const [twentyFiveTeamLabel, setTwentyFiveTeamLabel] = useState(twentyFiveL);

	const handleBallotChange25 = (e) => {
		setTwentyFiveTeamValue(e.value);
		setTwentyFiveTeamLabel(e.shortName);
	};

	let today = new Date();
	if (today < closeDate) {
		if (!user) {
			return (
				<div>
					<Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user="Sign In "></Navbar>
					<br />
					<p>Please login</p>
				</div>
			);
		} else if (!app && userTeams != null) {
			console.log('!app && userTeams');
			const handleLoad = (e) => {
				setPrimaryTeamValue(e.value);
				setPrimaryTeamLabel(e.label);
			};
			const handleLoad2 = (e) => {
				setSecondaryTeamValue(e.value);
				setSecondaryTeamLabel(e.label);
			};

			return (
				<div>
					<Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={user.name}></Navbar>
					<h1>Apply to be an official voter: {user.name}</h1>
					<form id="appForm" onSubmit={handleSubmit} ref={form}>
						<div id="partOne" ref={partOne} style={{ display: show ? 'none' : 'block' }}>
							<input type="textbox" id="user" value={user.name} hidden readOnly></input>
							<label>Which team do you primarily support?</label>
							<TeamDropdown teams={teams} id="favoriteTeam" change={handleChange} onLoad={handleLoad} presetTeam={userTeams.primary}></TeamDropdown>
							<div className="errorMsg">{errorPrimaryTeam}</div>
							<br />

                        <label>Which other teams, if any, do you support? (Optional)</label>
                        <TeamDropdown teams={teams} id="favoriteTeam2" change={handleChange2} onLoad={handleLoad2} presetTeam={userTeams.secondary}></TeamDropdown>
                        <br/>
                        <TeamDropdown teams={teams} id="favoriteTeam3" change={handleChange3} presetTeam={userTeams.tertiary}></TeamDropdown>
                        <br/>
                        <div className="errorMsg">{errorTeams}</div>
                        <br/>
                        <input type='hidden' id='userExists' value='true'></input>
                        <div>
                            <label>In which of the following ways do you inform your opinion of basketball teams? (select all that apply)</label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox1" value="I rarely go to games, and instead focus on TV broadcasts and streams."></input>
                                I rarely go to games, and instead focus on TV broadcasts and streams.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox2" value="I try to go to a few games each year."></input>
                                I try to go to a few games each year.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox3" value="I go to either my team's game or some other game most or all weeks."></input>
                                I go to either my team&apos;s game or some other game most or all weeks.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox4" value="I pick a few games each week to watch intently."></input>
                                I pick a few games each week to watch intently.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox5" value="I try to follow everything going on using multiple TVs and/or monitors."></input>
                                I try to follow everything going on using multiple TVs and/or monitors.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox6" value="I tend to focus on watching my team and/or games that could effect their standing."></input>
                                I tend to focus on watching my team and/or games that could effect their standing.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox7" value="I tend to focus on watching match-ups between highly ranked teams."></input>
                                I tend to focus on watching match-ups between highly ranked teams.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox8" value="I tend to focus on watching match-ups in my team's conference."></input>
                                I tend to focus on watching match-ups in my team&apos;s conference.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox9" value="I tend to focus on watching match-ups between closely matched teams regardless of ranking."></input>
                                I tend to focus on watching match-ups between closely matched teams regardless of ranking.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox10" value="I watch the weeknight games regardless of the teams playing."></input>
                                I watch the weeknight games regardless of the teams playing.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox11" value="I gamble or participate in contests trying to predict the outcome of games and follow my progress as games go on."></input>
                                I gamble or participate in contests trying to predict the outcome of games and follow my progress as games go on.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox12" value="My experience as a basketball player, coach, or referee tends to guide my focus."></input>
                                My experience as a basketball player, coach, or referee tends to guide my focus.
                            </label>
                            <br/>
                        </div>
                        <br/>
                        <br/>
                        <label>
                        If selected, how would you approach filling out your ballot? What would lead you to decide to vote for one team over another?        
                        <br/>
                        <textarea id="approach" ref={approach} rows="5" cols="150"></textarea>
                        </label> 
                        <div className="errorMsg">{errorApproach}</div>
                        <br/>
                        <label>
                            Anything else to say? (Optional)
                            <br/>
                            <textarea id="extra" rows="5" cols="150"></textarea>
                        </label>
                        <br/>
                        <br/>
                        <label>
                            <input type='checkbox' id="participationRequirement" ref={participation}></input>
                        I understand that there is a participation requirement to this poll. If I fail to submit a ballot three times, I understand that I may lose voting privilege                    
                        </label>
                        <div className="errorMsg">{errorParticipation}</div>
                        <label>
                            <input type='checkbox' id="biasRequirement" ref={bias}></input>
                        I understand that being transparently biased toward or against any team or conference may lead to my removal from the official poll roster.                    
                        </label>
                        <div className="errorMsg">{errorBias}</div>
                        <label>
                            <input type='checkbox' id="memeRequirement" ref={meme}></input>
                        I understand that my ballots shall represent my honest perception of the top 25 men&apos;s college basketball teams in Division I. I also understand that, per the new voter guidelines on the &quot;About&quot; page of this website, meme votes of any kind are now explicitly prohibited for official voters and shall lead to removal from the official voting panel.                        
                        </label>
                        <div className="errorMsg">{errorMeme}</div>
                        <br/>
                        <button type="button" onClick={ballotApp}>Next</button>
                    </div>
                    <div id="partTwo" ref={partTwo} style={{display: show?"block":"none"}}>
                        <h1>Submit your preseason ballot for 2025-26</h1>
                        <h4>Application and preseason poll ballots close Friday, October 25, at 11:59pm EDT</h4>
                        

							<table className="ballotTable">
								<tbody>
									<tr>
										<th>Rank</th>
										<th>Team</th>
										<th>Reason</th>
									</tr>
									<tr>
										<td>1</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning1" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>2</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange2}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning2" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>3</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange3}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning3" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>4</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange4}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning4" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>5</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange5}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning5" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>6</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange6}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning6" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>7</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange7}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning7" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>8</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange8}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning8" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>9</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange9}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning9" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>10</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange10}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning10" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>11</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange11}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning11" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>12</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange12}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning12" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>13</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange13}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning13" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>14</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange14}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning14" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>15</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange15}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning15" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>16</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange16}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning16" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>17</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange17}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning17" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>18</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange18}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning18" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>19</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange19}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning19" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>20</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange20}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning20" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>21</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange21}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning21" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>22</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange22}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning22" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>23</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange23}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning23" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>24</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange24}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning24" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>25</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange25}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning25" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
								</tbody>
							</table>
							<div className="errorMsg">{errorBallot}</div>
							<div className="overallRationale">
								<h3>Overall rationale</h3>
							</div>
							<textarea rows="5" cols="150" id="overallReasoning" className="overallRationale" maxLength={2000}></textarea>
							<br />
							<div className="submitBallot">
								<button type="submit">Submit</button>
							</div>
						</div>
					</form>
				</div>
			);
		} else if (!app) {
			console.log('!app');
			console.log('userTeams:', userTeams);
			return (
				<div>
					<Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={user.name}></Navbar>
					<h1>Apply to be an official voter: {user.name}</h1>
					<form id="appForm" onSubmit={handleSubmit} ref={form}>
						<div id="partOne" ref={partOne} style={{ display: show ? 'none' : 'block' }}>
							<input type="textbox" id="user" value={user.name} hidden readOnly></input>
							<label>Which team do you primarily support?</label>
							<TeamDropdown teams={teams} id="favoriteTeam" change={handleChange}></TeamDropdown>
							<div className="errorMsg">{errorPrimaryTeam}</div>
							<br />

                        <label>Which other teams, if any, do you support? (Optional)</label>
                        <TeamDropdown teams={teams} id="favoriteTeam2" change={handleChange2}></TeamDropdown>
                        <br/>
                        <TeamDropdown teams={teams} id="favoriteTeam3" change={handleChange3}></TeamDropdown>
                        <br/>
                        <div className="errorMsg">{errorTeams}</div>
                        <br/>
                        <input type='hidden' id='userExists' value='false'></input>
                        <div>
                            <label>In which of the following ways do you inform your opinion of basketball teams? (select all that apply)</label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox1" value="I rarely go to games, and instead focus on TV broadcasts and streams."></input>
                                I rarely go to games, and instead focus on TV broadcasts and streams.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox2" value="I try to go to a few games each year."></input>
                                I try to go to a few games each year.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox3" value="I go to either my team's game or some other game most or all weeks."></input>
                                I go to either my team&apos;s game or some other game most or all weeks.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox4" value="I pick a few games each week to watch intently."></input>
                                I pick a few games each week to watch intently.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox5" value="I try to follow everything going on using multiple TVs and/or monitors."></input>
                                I try to follow everything going on using multiple TVs and/or monitors.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox6" value="I tend to focus on watching my team and/or games that could effect their standing."></input>
                                I tend to focus on watching my team and/or games that could effect their standing.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox7" value="I tend to focus on watching match-ups between highly ranked teams."></input>
                                I tend to focus on watching match-ups between highly ranked teams.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox8" value="I tend to focus on watching match-ups in my team's conference."></input>
                                I tend to focus on watching match-ups in my team&apos;s conference.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox9" value="I tend to focus on watching match-ups between closely matched teams regardless of ranking."></input>
                                I tend to focus on watching match-ups between closely matched teams regardless of ranking.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox10" value="I watch the weeknight games regardless of the teams playing."></input>
                                I watch the weeknight games regardless of the teams playing.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox11" value="I gamble or participate in contests trying to predict the outcome of games and follow my progress as games go on."></input>
                                I gamble or participate in contests trying to predict the outcome of games and follow my progress as games go on.
                            </label>
                            <br/>
                            <label> 
                                <input type="checkbox" id="checkbox12" value="My experience as a basketball player, coach, or referee tends to guide my focus."></input>
                                My experience as a basketball player, coach, or referee tends to guide my focus.
                            </label>
                            <br/>
                        </div>
                        <br/>
                        <br/>
                        <label>
                        If selected, how would you approach filling out your ballot? What would lead you to decide to vote for one team over another?        
                        <br/>
                        <textarea id="approach" ref={approach} rows="5" cols="150"></textarea>
                        </label> 
                        <div className="errorMsg">{errorApproach}</div>
                        <br/>
                        <label>
                            Anything else to say? (Optional)
                            <br/>
                            <textarea id="extra" rows="5" cols="150"></textarea>
                        </label>
                        <br/>
                        <br/>
                        <label>
                            <input type='checkbox' id="participationRequirement" ref={participation}></input>
                        I understand that there is a participation requirement to this poll. If I fail to submit a ballot three times, I understand that I may lose voting privilege                    
                        </label>
                        <div className="errorMsg">{errorParticipation}</div>
                        <label>
                            <input type='checkbox' id="biasRequirement" ref={bias}></input>
                        I understand that being transparently biased toward or against any team or conference may lead to my removal from the official poll roster.                    
                        </label>
                        <div className="errorMsg">{errorBias}</div>
                        <label>
                            <input type='checkbox' id="memeRequirement" ref={meme}></input>
                        I understand that my ballots shall represent my honest perception of the top 25 men&apos;s college basketball teams in Division I. I also understand that, per the new voter guidelines on the &quot;About&quot; page of this website, meme votes of any kind are now explicitly prohibited for official voters and shall lead to removal from the official voting panel.                        
                        </label>
                        <div className="errorMsg">{errorMeme}</div>
                        <br/>
                        <button type="button" onClick={ballotApp}>Next</button>
                    </div>
                    <div id="partTwo" ref={partTwo} style={{display: show?"block":"none"}}>
                        <h1>Submit your preseason ballot for 2025-26</h1>
                        <h4>Application and preseason poll ballots close Friday, October 25, at 11:59pm EDT</h4>
                        

							<table className="ballotTable">
								<tbody>
									<tr>
										<th>Rank</th>
										<th>Team</th>
										<th>Reason</th>
									</tr>
									<tr>
										<td>1</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning1" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>2</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange2}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning2" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>3</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange3}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning3" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>4</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange4}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning4" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>5</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange5}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning5" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>6</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange6}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning6" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>7</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange7}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning7" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>8</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange8}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning8" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>9</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange9}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning9" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>10</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange10}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning10" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>11</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange11}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning11" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>12</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange12}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning12" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>13</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange13}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning13" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>14</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange14}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning14" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>15</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange15}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning15" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>16</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange16}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning16" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>17</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange17}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning17" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>18</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange18}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning18" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>19</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange19}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning19" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>20</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange20}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning20" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>21</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange21}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning21" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>22</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange22}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning22" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>23</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange23}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning23" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>24</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange24}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning24" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>25</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange25}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning25" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
								</tbody>
							</table>
							<div className="errorMsg">{errorBallot}</div>
							<div className="overallRationale">
								<h3>Overall rationale</h3>
							</div>
							<textarea rows="5" cols="150" id="overallReasoning" className="overallRationale" maxLength={2000}></textarea>
							<br />
							<div className="submitBallot">
								<button type="submit">Submit</button>
							</div>
						</div>
					</form>
				</div>
			);
		} else if (user && app && !ballot) {
			console.log('user && app && !ballot');
			console.log('app.primaryTeamValue:', app.favoriteTeam);

            const handleLoad = e => {
                setPrimaryTeamValue(e.value);
                setPrimaryTeamLabel(e.label);
            }
            const handleLoad2 = e => {
                setSecondaryTeamValue(e.value);
                setSecondaryTeamLabel(e.label);
            }
            
            return(
                <div>
                    <Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={user.name}></Navbar>
                    <h1>Apply to be an official voter: {user.name}</h1>
                    <form id="appForm" onSubmit={handleSubmit} ref={form}>
                        <div id="partOne" ref={partOne} style={{display: show?"none":"block"}}>
                            <input type='textbox' id='user' value={user.name} hidden readOnly></input>
                            <label>Which team do you primarily support?</label>
                            <TeamDropdown teams={teams} id="favoriteTeam" change={handleChange} onLoad={handleLoad} presetTeam={app.favoriteTeam}></TeamDropdown>
                            <div className="errorMsg">{errorPrimaryTeam}</div>
                            <br/>
        
                            <label>Which other teams, if any, do you support? (Optional)</label>
                            <TeamDropdown teams={teams} id="favoriteTeam2" change={handleChange2} onLoad={handleLoad2} presetTeam={app.favoriteTeam2}></TeamDropdown>
                            <br/>
                            <TeamDropdown teams={teams} id="favoriteTeam3" change={handleChange3} presetTeam={app.favoriteTeam3}></TeamDropdown>
                            <br/>
                            <div className="errorMsg">{errorTeams}</div>
                            <br/>
                            <input type='hidden' id='userExists' value='true'></input>
                            <div>
                                <label>In which of the following ways do you inform your opinion of basketball teams? (select all that apply)</label>
                                <br/>
                                <label> 
                                    <input type="checkbox" id="checkbox1" value="I rarely go to games, and instead focus on TV broadcasts and streams." defaultChecked={app.checkbox1}></input>
                                    I rarely go to games, and instead focus on TV broadcasts and streams.
                                </label>
                                <br/>
                                <label> 
                                    <input type="checkbox" id="checkbox2" value="I try to go to a few games each year."defaultChecked={app.checkbox2}></input>
                                    I try to go to a few games each year.
                                </label>
                                <br/>
                                <label> 
                                    <input type="checkbox" id="checkbox3" value="I go to either my team's game or some other game most or all weeks." defaultChecked={app.checkbox3}></input>
                                    I go to either my team&apos;s game or some other game most or all weeks.
                                </label>
                                <br/>
                                <label> 
                                    <input type="checkbox" id="checkbox4" value="I pick a few games each week to watch intently." defaultChecked={app.checkbox4}></input>
                                    I pick a few games each week to watch intently.
                                </label>
                                <br/>
                                <label> 
                                    <input type="checkbox" id="checkbox5" value="I try to follow everything going on using multiple TVs and/or monitors." defaultChecked={app.checkbox5}></input>
                                    I try to follow everything going on using multiple TVs and/or monitors.
                                </label>
                                <br/>
                                <label> 
                                    <input type="checkbox" id="checkbox6" value="I tend to focus on watching my team and/or games that could effect their standing." defaultChecked={app.checkbox6}></input>
                                    I tend to focus on watching my team and/or games that could effect their standing.
                                </label>
                                <br/>
                                <label> 
                                    <input type="checkbox" id="checkbox7" value="I tend to focus on watching match-ups between highly ranked teams." defaultChecked={app.checkbox7}></input>
                                    I tend to focus on watching match-ups between highly ranked teams.
                                </label>
                                <br/>
                                <label> 
                                    <input type="checkbox" id="checkbox8" value="I tend to focus on watching match-ups in my team's conference." defaultChecked={app.checkbox8}></input>
                                    I tend to focus on watching match-ups in my team&apos;s conference.
                                </label>
                                <br/>
                                <label> 
                                    <input type="checkbox" id="checkbox9" value="I tend to focus on watching match-ups between closely matched teams regardless of ranking." defaultChecked={app.checkbox9}></input>
                                    I tend to focus on watching match-ups between closely matched teams regardless of ranking.
                                </label>
                                <br/>
                                <label> 
                                    <input type="checkbox" id="checkbox10" value="I watch the weeknight games regardless of the teams playing." defaultChecked={app.checkbox10}></input>
                                    I watch the weeknight games regardless of the teams playing.
                                </label>
                                <br/>
                                <label> 
                                    <input type="checkbox" id="checkbox11" value="I gamble or participate in contests trying to predict the outcome of games and follow my progress as games go on." defaultChecked={app.checkbox11}></input>
                                    I gamble or participate in contests trying to predict the outcome of games and follow my progress as games go on.
                                </label>
                                <br/>
                                <label> 
                                    <input type="checkbox" id="checkbox12" value="My experience as a basketball player, coach, or referee tends to guide my focus." defaultChecked={app.checkbox12}></input>
                                    My experience as a basketball player, coach, or referee tends to guide my focus.
                                </label>
                                <br/>
                            </div>
                            <br/>
                            <br/>
                            <label>
                            If selected, how would you approach filling out your ballot? What would lead you to decide to vote for one team over another?        
                            <br/>
                            <textarea id="approach" ref={approach} rows="5" cols="150" defaultValue={app.approach}></textarea>
                            </label> 
                            <div className="errorMsg">{errorApproach}</div>
                            <br/>
                            <label>
                                Anything else to say? (Optional)
                                <br/>
                                <textarea id="extra" rows="5" cols="150" defaultValue={app.extra}></textarea>
                            </label>
                            <br/>
                            <br/>
                            <label>
                                <input type='checkbox' id="participationRequirement" ref={participation} defaultChecked={app.participationRequirement}></input>
                            I understand that there is a participation requirement to this poll. If I fail to submit a ballot three times, I understand that I may lose voting privilege                    
                            </label>
                            <div className="errorMsg">{errorParticipation}</div>
                            <label>
                                <input type='checkbox' id="biasRequirement" ref={bias} defaultChecked={app.biasRequirement}></input>
                            I understand that being transparently biased toward or against any team or conference may lead to my removal from the official poll roster.                    
                            </label>
                            <div className="errorMsg">{errorBias}</div>
                            <label>
                                <input type='checkbox' id="memeRequirement" ref={meme} defaultChecked={app.memeRequirement}></input>
                            I understand that my ballots shall represent my honest perception of the top 25 men&apos;s college basketball teams in Division I. I also understand that, per the new voter guidelines on the &quot;About&quot; page of this website, meme votes of any kind are now explicitly prohibited for official voters and shall lead to removal from the official voting panel.                        
                            </label>
                        <div className="errorMsg">{errorMeme}</div>
                            <br/>
                            <button type="button" onClick={ballotApp}>Next</button>
                        </div>
                        <div id="partTwo" ref={partTwo} style={{display: show?"block":"none"}}>
                        <h1>Submit your preseason ballot for 2025-26</h1>
                        <h4>Application and preseason poll ballots close Friday, October 25, at 11:59pm EDT</h4>
                        

							<table className="ballotTable">
								<tbody>
									<tr>
										<th>Rank</th>
										<th>Team</th>
										<th>Reason</th>
									</tr>
									<tr>
										<td>1</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning1" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>2</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange2}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning2" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>3</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange3}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning3" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>4</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange4}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning4" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>5</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange5}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning5" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>6</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange6}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning6" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>7</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange7}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning7" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>8</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange8}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning8" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>9</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange9}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning9" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>10</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange10}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning10" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>11</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange11}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning11" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>12</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange12}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning12" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>13</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange13}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning13" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>14</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange14}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning14" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>15</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange15}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning15" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>16</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange16}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning16" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>17</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange17}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning17" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>18</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange18}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning18" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>19</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange19}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning19" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>20</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange20}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning20" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>21</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange21}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning21" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>22</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange22}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning22" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>23</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange23}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning23" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>24</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange24}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning24" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>25</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange25}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning25" className="reasoning" maxLength={200}></input>
										</td>
									</tr>
								</tbody>
							</table>
							<div className="errorMsg">{errorBallot}</div>
							<div className="overallRationale">
								<h3>Overall rationale</h3>
							</div>
							<textarea rows="5" cols="150" id="overallReasoning" className="overallRationale" maxLength={2000}></textarea>
							<br />
							<div className="submitBallot">
								<button type="submit">Submit</button>
							</div>
						</div>
					</form>
				</div>
			);
		} else if (user && app) {
			console.log('user & app');
			console.log('app.primaryTeamValue:', app.favoriteTeam);
			const handleLoad = (e) => {
				setPrimaryTeamValue(e.value);
				setPrimaryTeamLabel(e.label);
			};
			const handleLoad2 = (e) => {
				setSecondaryTeamValue(e.value);
				setSecondaryTeamLabel(e.label);
			};

			return (
				<div>
					<Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={user.name}></Navbar>
					<h1>Apply to be an official voter: {user.name}</h1>
					<form id="appForm" onSubmit={handleSubmit} ref={form}>
						<div id="partOne" ref={partOne} style={{ display: show ? 'none' : 'block' }}>
							<input type="textbox" id="user" value={user.name} hidden readOnly></input>
							<label>Which team do you primarily support?</label>
							<TeamDropdown teams={teams} id="favoriteTeam" change={handleChange} onLoad={handleLoad} presetTeam={app.favoriteTeam}></TeamDropdown>
							<div className="errorMsg">{errorPrimaryTeam}</div>
							<br />

							<label>Which other teams, if any, do you support? (Optional)</label>
							<TeamDropdown teams={teams} id="favoriteTeam2" change={handleChange2} onLoad={handleLoad2} presetTeam={app.favoriteTeam2}></TeamDropdown>
							<br />
							<TeamDropdown teams={teams} id="favoriteTeam3" change={handleChange3} presetTeam={app.favoriteTeam3}></TeamDropdown>
							<br />
							<div className="errorMsg">{errorTeams}</div>
							<br />
							<input type="hidden" id="userExists" value="true"></input>
							<div>
								<label>In which of the following ways do you inform your opinion of basketball teams? (select all that apply)</label>
								<br />
								<label>
									<input type="checkbox" id="checkbox1" value="I rarely go to games, and instead focus on TV broadcasts and streams." defaultChecked={app.checkbox1}></input>I rarely go to games, and instead focus on TV broadcasts and
									streams.
								</label>
								<br />
								<label>
									<input type="checkbox" id="checkbox2" value="I try to go to a few games each year." defaultChecked={app.checkbox2}></input>I try to go to a few games each year.
								</label>
								<br />
								<label>
									<input type="checkbox" id="checkbox3" value="I go to either my team's game or some other game most or all weeks." defaultChecked={app.checkbox3}></input>I go to either my team&apos;s game or some other game most or all
									weeks.
								</label>
								<br />
								<label>
									<input type="checkbox" id="checkbox4" value="I pick a few games each week to watch intently." defaultChecked={app.checkbox4}></input>I pick a few games each week to watch intently.
								</label>
								<br />
								<label>
									<input type="checkbox" id="checkbox5" value="I try to follow everything going on using multiple TVs and/or monitors." defaultChecked={app.checkbox5}></input>I try to follow everything going on using multiple TVs and/or
									monitors.
								</label>
								<br />
								<label>
									<input type="checkbox" id="checkbox6" value="I tend to focus on watching my team and/or games that could effect their standing." defaultChecked={app.checkbox6}></input>I tend to focus on watching my team and/or games
									that could effect their standing.
								</label>
								<br />
								<label>
									<input type="checkbox" id="checkbox7" value="I tend to focus on watching match-ups between highly ranked teams." defaultChecked={app.checkbox7}></input>I tend to focus on watching match-ups between highly ranked teams.
								</label>
								<br />
								<label>
									<input type="checkbox" id="checkbox8" value="I tend to focus on watching match-ups in my team's conference." defaultChecked={app.checkbox8}></input>I tend to focus on watching match-ups in my team&apos;s conference.
								</label>
								<br />
								<label>
									<input type="checkbox" id="checkbox9" value="I tend to focus on watching match-ups between closely matched teams regardless of ranking." defaultChecked={app.checkbox9}></input>I tend to focus on watching match-ups
									between closely matched teams regardless of ranking.
								</label>
								<br />
								<label>
									<input type="checkbox" id="checkbox10" value="I watch the weeknight games regardless of the teams playing." defaultChecked={app.checkbox10}></input>I watch the weeknight games regardless of the teams playing.
								</label>
								<br />
								<label>
									<input type="checkbox" id="checkbox11" value="I gamble or participate in contests trying to predict the outcome of games and follow my progress as games go on." defaultChecked={app.checkbox11}></input>I gamble or
									participate in contests trying to predict the outcome of games and follow my progress as games go on.
								</label>
								<br />
								<label>
									<input type="checkbox" id="checkbox12" value="My experience as a basketball player, coach, or referee tends to guide my focus." defaultChecked={app.checkbox12}></input>
									My experience as a basketball player, coach, or referee tends to guide my focus.
								</label>
								<br />
							</div>
							<br />
							<br />
							<label>
								If selected, how would you approach filling out your ballot? What would lead you to decide to vote for one team over another?
								<br />
								<textarea id="approach" ref={approach} rows="5" cols="150" defaultValue={app.approach}></textarea>
							</label>
							<div className="errorMsg">{errorApproach}</div>
							<br />
							<label>
								Anything else to say? (Optional)
								<br />
								<textarea id="extra" rows="5" cols="150" defaultValue={app.extra}></textarea>
							</label>
							<br />
							<br />
							<label>
								<input type="checkbox" id="participationRequirement" ref={participation} defaultChecked={app.participationRequirement}></input>I understand that there is a participation requirement to this poll. If I fail to submit a ballot
								three times, I understand that I may lose voting privilege
							</label>
							<div className="errorMsg">{errorParticipation}</div>
							<label>
								<input type="checkbox" id="biasRequirement" ref={bias} defaultChecked={app.biasRequirement}></input>I understand that being transparently biased toward or against any team or conference may lead to my removal from the
								official poll roster.
							</label>
							<div className="errorMsg">{errorBias}</div>
							<label>
								<input type="checkbox" id="memeRequirement" ref={meme} defaultChecked={app.memeRequirement}></input>I understand that my ballots shall represent my honest perception of the top 25 men&apos;s college basketball teams in
								Division I. I also understand that, per the new voter guidelines on the &quot;About&quot; page of this website, meme votes of any kind are now explicitly prohibited for official voters and shall lead to removal from the
								official voting panel.
							</label>
							<div className="errorMsg">{errorMeme}</div>
							<br />
							<button type="button" onClick={ballotApp}>
								Next
							</button>
						</div>
						<div id="partTwo" ref={partTwo} style={{ display: show ? 'block' : 'none' }}>
							<h1>Submit your preseason ballot for 2025-26</h1>
							<h4>Application and preseason poll ballots close Friday, October 25, at 11:59pm EDT</h4>

							<table className="ballotTable">
								<tbody>
									<tr>
										<th>Rank</th>
										<th>Team</th>
										<th>Reason</th>
									</tr>
									<tr>
										<td>1</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange} presetTeam={ballot['1'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning1" className="reasoning" defaultValue={ballot['1'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>2</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange2} presetTeam={ballot['2'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning2" className="reasoning" defaultValue={ballot['2'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>3</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange3} presetTeam={ballot['3'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning3" className="reasoning" defaultValue={ballot['3'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>4</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange4} presetTeam={ballot['4'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning4" className="reasoning" defaultValue={ballot['4'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>5</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange5} presetTeam={ballot['5'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning5" className="reasoning" defaultValue={ballot['5'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>6</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange6} presetTeam={ballot['6'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning6" className="reasoning" defaultValue={ballot['6'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>7</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange7} presetTeam={ballot['7'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning7" className="reasoning" defaultValue={ballot['7'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>8</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange8} presetTeam={ballot['8'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning8" className="reasoning" defaultValue={ballot['8'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>9</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange9} presetTeam={ballot['9'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning9" className="reasoning" defaultValue={ballot['9'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>10</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange10} presetTeam={ballot['10'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning10" className="reasoning" defaultValue={ballot['10'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>11</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange11} presetTeam={ballot['11'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning11" className="reasoning" defaultValue={ballot['11'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>12</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange12} presetTeam={ballot['12'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning12" className="reasoning" defaultValue={ballot['12'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>13</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange13} presetTeam={ballot['13'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning13" className="reasoning" defaultValue={ballot['13'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>14</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange14} presetTeam={ballot['14'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning14" className="reasoning" defaultValue={ballot['14'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>15</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange15} presetTeam={ballot['15'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning15" className="reasoning" defaultValue={ballot['15'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>16</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange16} presetTeam={ballot['16'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning16" className="reasoning" defaultValue={ballot['16'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>17</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange17} presetTeam={ballot['17'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning17" className="reasoning" defaultValue={ballot['17'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>18</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange18} presetTeam={ballot['18'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning18" className="reasoning" defaultValue={ballot['18'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>19</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange19} presetTeam={ballot['19'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning19" className="reasoning" defaultValue={ballot['19'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>20</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange20} presetTeam={ballot['20'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning20" className="reasoning" defaultValue={ballot['20'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>21</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange21} presetTeam={ballot['21'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning21" className="reasoning" defaultValue={ballot['21'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>22</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange22} presetTeam={ballot['22'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning22" className="reasoning" defaultValue={ballot['22'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>23</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange23} presetTeam={ballot['23'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning23" className="reasoning" defaultValue={ballot['23'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>24</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange24} presetTeam={ballot['24'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning24" className="reasoning" defaultValue={ballot['24'].reasoning} maxLength={200}></input>
										</td>
									</tr>
									<tr>
										<td>25</td>
										<td>
											<TeamDropdown teams={teams} change={handleBallotChange25} presetTeam={ballot['25'].id}></TeamDropdown>
										</td>
										<td>
											<input type="textbox" id="reasoning25" className="reasoning" defaultValue={ballot['25'].reasoning} maxLength={200}></input>
										</td>
									</tr>
								</tbody>
							</table>
							<div className="errorMsg">{errorBallot}</div>
							<div className="overallRationale">
								<h3>Overall rationale</h3>
							</div>
							<textarea rows="5" cols="150" id="overallReasoning" className="overallRationale" defaultValue={ballot.overallReasoning} maxLength={2000}></textarea>
							<br />
							<div className="submitBallot">
								<button type="submit">Submit</button>
							</div>
						</div>
					</form>
				</div>
			);
		}
	} else {
		return (
			<div>
				<p>
					Applications for the 2025-26 r/CollegeBasketball Userpoll have closed. If you&apos;ve applied, you should know whether you&apos;ve been accepted shortly. If you haven&apos;t applied and you&apos;d like to join the poll, start submitting
					provisional ballots every week and you&apos;ll likely be added once enough official voters drop out due to inactivity.
				</p>
			</div>
		);
	}
}

const REDIRECT_URI = 'http://cbbpoll.net/application';
//const REDIRECT_URI = process.env.REDIRECT_URI;
const RANDOM_STRING = 'randomstringhere';
const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

const getToken = async (body) => {
	const data = await axios.post('https://www.reddit.com/api/v1/access_token', querystring.stringify(body), {
		headers: {
			Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
			'content-type': 'application/x-www-form-urlencoded',
		},
	});
	return data.data;
};

export const getServerSideProps = async ({ query, req, res }) => {
	let teams = await getTeams();
	teams = JSON.stringify(teams);

	const refresh_token = getCookie('refresh_token', { req, res });
	const access_token = getCookie('access_token', { req, res });

	//   if(teams !== {notFound: true}){
	//     console.log('teams found');
	//   }

	if (refresh_token) {
		const today = new Date();
		const season = today.getFullYear() + 1;
		if (access_token) {
			const user = await getUser(access_token);
			let userTeams = await getUserTeams(user.name);
			let app = await getApp(user, season);
			let ballot = await getBallot(user);
			return { props: { user, teams, app, ballot, userTeams } };
		} else {
			const token = await getToken({
				refresh_token: refresh_token,
				grant_type: 'refresh_token',
			});
			setCookie('refresh_token', token.refresh_token, {
				req,
				res,
				maxAge: 60 * 60,
			});
			setCookie('access_token', token.access_token, {
				req,
				res,
				maxAge: 60 * 60 * 24,
			});
			const user = await getUser(token.access_token);
			let userTeams = await getUserTeams(user.name);
			let app = await getApp(user, season);
			let ballot = await getBallot(user);
			return { props: { user, teams, app, ballot, userTeams } };
		}
	} else if (query.code && query.state === RANDOM_STRING) {
		try {
			const token = await getToken({
				code: query.code,
				grant_type: 'authorization_code',
				redirect_uri: REDIRECT_URI,
			});
			setCookie('refresh_token', token.refresh_token, {
				req,
				res,
				maxAge: 60 * 60,
			});
			setCookie('access_token', token.access_token, {
				req,
				res,
				maxAge: 60 * 60 * 24,
			});
			const user = await getUser(token.access_token);
			let userTeams = await getUserTeams(user.name);
			let app = await getApp(user, season);
			let ballot = await getBallot(user);
			return { props: { user, teams, app, ballot, userTeams } };
		} catch (e) {
			console.log(e);
			return { props: { user: null } };
		}
	} else {
		return { props: { user: null } };
	}
};

const getUser = async (access_token) => {
	const data = await axios.get('https://oauth.reddit.com/api/v1/me', {
		headers: {
			Authorization: `Bearer ${access_token}`,
			content_type: 'application/json',
		},
	});

	return data.data;
};

const getTeams = async () => {
	try {
		console.log('CONNECTING TO MONGO');
		await connectMongo();
		console.log('CONNECTED TO MONGO');

		console.log('FETCHING TEAMS');
		const teams = await TeamData.find({});
		const allTeams = JSON.parse(JSON.stringify(teams));
		console.log('FETCHED TEAMS');
		return allTeams;
	} catch (error) {
		console.log(error);
		return {
			notFound: true,
		};
	}
};

const getApp = async (user, season) => {
	console.log('CONNECTING TO MONGO');
	await connectMongo();
	console.log('CONNECTED TO MONGO');

	console.log('FETCHING APP');
	const app = await ApplicationData.findOne({ user: user.name, season: season });
	const userApp = JSON.parse(JSON.stringify(app));
	console.log('FETCHED APP');
	return userApp;
};

const getBallot = async (user) => {
	console.log('CONNECTING TO MONGO');
	await connectMongo();
	console.log('CONNECTED TO MONGO');

	const date = new Date('2025-10-01');
	console.log('FETCHING BALLOT');
	const ballot = await UserBallot.findOne({ user: user.name, week: 'Pre-Season', date: { $gte: date } });
	const userBallot = JSON.parse(JSON.stringify(ballot));
	console.log('FETCHED BALLOT');
	return userBallot;
};

const getUserTeams = async (name) => {
	console.log('CONNECTING TO MONGO');
	await connectMongo();
	console.log('CONNECTED TO MONGO');

	console.log('FETCHING USER');
	const user = await User.findOne({ name: name });
	const userJSON = JSON.parse(JSON.stringify(user));
	console.log('FETCHED USER');
	let teamObj;
	if (userJSON != null) {
		teamObj = {
			primary: parseInt(userJSON.primaryTeam),
			secondary: parseInt(userJSON.secondaryTeam),
			tertiary: parseInt(userJSON.tertiaryTeam),
		};
	} else {
		teamObj = null;
	}

	return teamObj;
};
