// import SeasonDates from "../models/SeasonDates";

// export const getHomePageDates = async (season) => {

//     await connectMongo();

//     const dates = await SeasonDates.findOne({'season': {season}});
//     const seasonDates = JSON.parse(JSON.stringify(dates));

//     return seasonDates;
// }

export const getWeek = () => {
	let week = 15;
	return week;
};

export const getPriorWeek = () => {
	let week = 14;
	return week;
};

export const getPollDate = () => {};

export const getOpenDate = () => {
	let date = new Date('10 February 2024 15:00 UTC');

	return date;
};

export const getCloseDate = () => {
	let date = new Date('12 February 2024 15:00 UTC');

	return date;
};

export const getSeasonCheckDate = () => {
	let date = new Date('October 1 2023');
	return date;
};

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
