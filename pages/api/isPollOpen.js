import { connectMongo } from "../../utils/connect";
import ApplicationData from "../../models/ApplicationData";
import { DateTime } from "luxon";

export default async function handler(req, res) {
	let now = DateTime.now();
	let nextPollOpen;
	let nextPollClose;

	//gets the date of the saturday of the current week
	//(except our 'week' starts on monday so we have to subtract a few days to make it think its the previous week)
	if (now.weekday !== 1) {
		nextPollOpen = now.setZone("America/New_York").set({
			weekday: 6,
			hour: 10,
			minute: 0,
			second: 0,
			millisecond: 0,
		});

		nextPollClose = nextPollOpen.plus({ days: 2 });
	} else {
		now = now.minus({ days: 3 });
		nextPollOpen = now.setZone("America/New_York").set({
			weekday: 6,
			hour: 10,
			minute: 0,
			second: 0,
			millisecond: 0,
		});

		nextPollClose = nextPollOpen.plus({ days: 2 });
	}

	now = DateTime.now();

	//checks if the time is between the opening and closing of the poll
	if (now.toMillis() > nextPollOpen.toMillis() && now.toMillis() < nextPollClose.toMillis()) {
		res.status(200).json({ open: true });
		return;
	} else {
		res.status(200).json({ open: false });
		return;
	}
}
