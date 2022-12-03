import axios from "axios";
import { getCookies, setCookie } from "cookies-next";

const CLIENT_ID = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

export const getToken = async (body) => {
	const data = await axios.post(
		"https://www.reddit.com/api/v1/access_token",
		querystring.stringify(body),
		{
			headers: {
				Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
			},
		}
	);
	return data.data;
};

export const getUser = async (access_token) => {
	const data = await axios.get("https://oauth.reddit.com/api/v1/me", {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	return data.data;
};

export const userQuery = async () => {
	const { access_token, refresh_token } = getCookies();

	console.log("ACCESS TOKEN", access_token);
	console.log("REFRESH TOKEN", refresh_token);
	if (refresh_token) {
		if (access_token) {
			const user = await getUser(access_token);
			return { user };
		} else {
			const token = await getToken({
				refresh_token: refresh_token,
				grant_type: "refresh_token",
			});
			setCookie("refresh_token", token.refresh_token, {
				maxAge: 60 * 60,
			});
			setCookie("access_token", token.access_token, {
				maxAge: 60 * 60 * 24,
			});
			const user = await getUser(token.access_token);
			return { user };
		}
	} else if (query.code && query.state === RANDOM_STRING) {
		try {
			const token = await getToken({
				code: query.code,
				grant_type: "authorization_code",
				redirect_uri: REDIRECT_URI,
			});
			setCookie("refresh_token", token.refresh_token, {
				maxAge: 60 * 60,
			});
			setCookie("access_token", token.access_token, {
				maxAge: 60 * 60 * 24,
			});
			const user = await getUser(token.access_token);
			return { user };
		} catch (e) {
			console.log(e);
			return { user: null };
		}
	} else {
		return { user: null };
	}
};
