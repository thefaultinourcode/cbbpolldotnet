import { DateTime, Interval } from "luxon";
// import SeasonDates from "../models/SeasonDates";

// export const getHomePageDates = async (season) => {

//     await connectMongo();

//     const dates = await SeasonDates.findOne({'season': {season}});
//     const seasonDates = JSON.parse(JSON.stringify(dates));

//     return seasonDates;
// }

export const getWeekReplacement = () => {
	//get season
	//fetch season

	//put the season dates
	const seasonObj={
		preSeason:{
			start:DateTime.fromObject({year: 2025, month: 10, day: 17, hour: 11, minute:59}, { zone: 'America/New_York'}),
			end:DateTime.fromObject({year: 2025, month: 10, day: 24, hour: 11, minute:59}, { zone: 'America/New_York'})
		},
		regularSeason:{
			start:DateTime.fromObject({year: 2025, month: 11, day: 3, hour: 10, minute:0}, { zone: 'America/New_York'}),
			end:DateTime.fromObject({year: 2026, month: 3, day: 15, hour: 23, minute:59}, { zone: 'America/New_York'})
		},
		postSeason:{
			start:DateTime.fromObject({year: 2026, month: 4, day: 7, hour: 10, minute:0}, { zone: 'America/New_York'}),
			end:DateTime.fromObject({year: 2026, month: 4, day: 13, hour: 9, minute:59}, { zone: 'America/New_York'})
		},
		weekCount:19
	}
	
	// const now = DateTime.fromObject({year: 2025, month:11, day:3, hour:9, minute:0}, { zone: 'America/New_York'});
	const now = DateTime.now();

	//check if date is before season start date
	let week;
	if(now < seasonObj['regularSeason']['start']){
		//pre-season logic
		if(now < seasonObj['preSeason']['start']){
			//note this is last years post-season
			//logic will need to account for that
			week='Post-Season';
		}
		else{
			week = 'Pre-Season';
		}
	}
	//check if date is after season end date'
	else if(now > seasonObj['regularSeason']['end']){
		//post-season logic
		if(now < seasonObj['postSeason']['start']){
			week = seasonObj['weekCount'];
		}
		else{
			week = 'Post-Season';
		}
	}
	// get current date (either UTC or luxon)
	else{
		//regular season logic
		console.log('regular season');
		let interval = Interval.fromDateTimes(seasonObj['regularSeason']['start'], now);
		interval = interval.length('weeks');
		week = 1 + Math.trunc(interval);
		console.log('week:', week);
	}

	return now;
}

export const getPriorWeekReplacement = () => {
    let currentWeek = getWeek();
	
	//if week 2 return post-season
	//if post season return final week of season
	//if pre-season then return previous year's post season
	
    return week;
}

export const getWeek = () => {
    let week = 'Pre-Season';
    return week;
}



export const getPriorWeek = () => {
    let week = 'Post-Season';
    return week;
}



//function to flag how to hand preseason

export const getPollDate = () => {};

export const getOpenDate = () => {
    let date = new Date('26 October 2025 15:00 UTC');

	return date;
};

export const getCloseDate = () => {
    let date = new Date('26 October 2025 15:00 UTC');

	return date;
};

export const getSeasonCheckDate = () => {
	let today = new Date();
	const close = getCloseDate();
	let date;
	if(today < close){
		console.log('last season');
		date = new Date('October 1 2024');
	}
	else{
		console.log('this season');
		date = new Date('October 1 2025');
	}
    return date;
}

export const getSeason = () => {
	let today = new Date();
	let month = today.getMonth();

	let season;
	if (month < 9) {
		season = today.getFullYear();
	} else {
		season = today.getFullYear() + 1;
	}

	return season;
};
