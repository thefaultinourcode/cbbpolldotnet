// import SeasonDates from "../models/SeasonDates";

// export const getHomePageDates = async (season) => {

//     await connectMongo();

//     const dates = await SeasonDates.findOne({'season': {season}});
//     const seasonDates = JSON.parse(JSON.stringify(dates));

//     return seasonDates;
// }

export const getWeek = () => {

    let week = 18;
    return week;
}

export const getPriorWeek = () => {
    let week = 17;
    return week;
}


export const getPollDate = () => {};

export const getOpenDate = () => {
    let date = new Date('1 March 2025 15:00 UTC');

	return date;
};

export const getCloseDate = () => {
    let date = new Date('3 March 2025 15:00 UTC');

	return date;
};

export const getSeasonCheckDate = () => {
    let date = new Date('October 1 2024');
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
