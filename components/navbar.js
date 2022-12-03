import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { userQuery } from "../lib/client";
import { useQuery } from "@tanstack/react-query";

export default function Navbar(props) {
	//figure out a better way
	const DURATION = "permanent";
	const SCOPE = "identity edit flair history read vote wikiread wikiedit";
	const REDIRECT_URI = "http://localhost:3000/profile";
	const RANDOM_STRING = "randomstringhere"; //randomstring.generate();
	const RESPONSE_TYPE = "code";
	const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
	const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

	const URL = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`;

	const year = 2023;

	const { data: user, isLoading, err } = useQuery(["user"], userQuery);

	console.log("USER DATA", user);

	if (!user || isLoading) {
		return (
			<div className="flex flex-col w-full h-fit p-2 gap-3 bg-[#d3ecff]">
				<div className="navbar">
					<ul className="navbar-list">
						<li className="navbar-list-item">
							<div id="cbbLogo">
								<Link href="/">
									<div className="cursor-pointer">
										<Image
											src={props.cbbLogo}
											height="100"
											width="104"
											alt="College Basketball Logo"
										></Image>
									</div>
								</Link>
							</div>
						</li>
						<div className="linkBlock">
							<li className="navbar-list-item center">
								<div className="cbbup">
									<b>r/CollegeBasketball Userpoll</b>
								</div>
							</li>
						</div>
						<div className="linkBlock">
							<li className="navbar-list-item center">
								<div className="homefield">
									<a
										href="https://www.homefieldapparel.com/products/r-cbb-logo-t-shirt"
										target="_blank"
										rel="noreferrer"
									>
										<Image
											src={props.homefieldLogo}
											width="258"
											height="75"
											alt="Sponsored by Homefield Logo"
										></Image>
									</a>
								</div>
							</li>
						</div>
						<div className="linkBlock">
							<li className="navbar-list-item center">
								<a href="../about">
									<div className="navbar-link">About</div>
								</a>
							</li>
						</div>
						<div id="usernameFloat" className="center">
							<li className="navbar-list-item">
								<a href={URL}>
									{" "}
									<div className="navbar-link userName center">{props.user}</div>
								</a>
							</li>
						</div>
					</ul>
				</div>
				{props.children}
			</div>
		);
	}

	if (user.user) {
		return (
			<div className="flex flex-col w-full h-fit p-2 gap-3 bg-[#d3ecff]">
				<div className="navbar">
					<ul className="navbar-list">
						<li className="navbar-list-item">
							<div id="cbbLogo">
								<Link href="/">
									<div className="cursor-pointer">
										<Image
											src={props.cbbLogo}
											height="100"
											width="104"
											className="fixed-width"
											alt="College Basketball Logo"
										></Image>
									</div>
								</Link>
							</div>
						</li>
						<div className="linkBlock">
							<li className="navbar-list-item center">
								<div className="cbbup">
									<b>r/CollegeBasketball Userpoll</b>
								</div>
							</li>
						</div>

						<div className="linkBlock">
							<li className="navbar-list-item center">
								<div className="homefield">
									<a
										href="https://www.homefieldapparel.com/products/r-cbb-logo-t-shirt"
										target="_blank"
										rel="noreferrer"
									>
										<Image
											src={props.homefieldLogo}
											width="258"
											height="75"
											alt="Sponsored by Homefield logo"
										></Image>
									</a>
								</div>
							</li>
						</div>
						<div className="linkBlock">
							<li className="navbar-list-item center">
								<Link href={`../seasons/${year}`}>
									<div className="navbar-link cursor-pointer">Results</div>
								</Link>
							</li>
						</div>
						<div className="linkBlock">
							<li className="navbar-list-item center">
								<Link href="../ballotBox">
									<div className="navbar-link cursor-pointer">Vote</div>
								</Link>
							</li>
						</div>
						{/* Application Link */}
						{/* <div className='linkBlock'>
                        <li className='navbar-list-item center'>
                        <a href="../application">
                            <div className='navbar-link'>
                                Application
                            </div>
                        </a>
                        </li>
                    </div> */}
						<div className="linkBlock">
							<li className="navbar-list-item center">
								<Link href="../about">
									<div className="navbar-link cursor-pointer">About</div>
								</Link>
							</li>
						</div>

						<div id="usernameFloat" className="center">
							<li className="navbar-list-item">
								<Link href="../profile">
									<div className="navbar-link userName center cursor-pointer">{user.user.name}</div>
								</Link>
							</li>
						</div>
					</ul>
				</div>
				{props.children}
			</div>
		);
	}
}

export const getServerSideProps = async ({ query, req, res }) => {
	let pollDate = new Date("21 November 2022 15:00 UTC");
	//let today = new Date('3 May 2023 15:00 UTC');
	let today = new Date();
	let week;
	if (today > pollDate) {
		week = 3;
	} else {
		week = 2;
	}

	const refresh_token = getCookie("refresh_token", { req, res });
	const access_token = getCookie("access_token", { req, res });

	if (refresh_token) {
		if (access_token) {
			const user = await getUser(access_token);
			const userpoll = await getUserpoll(week);
			const pollVoters = await getBallots(true);
			const provisionalVoters = await getBallots(false);
			return { props: { user, userpoll, pollVoters, provisionalVoters } };
		} else {
			const token = await getToken({
				refresh_token: refresh_token,
				grant_type: "refresh_token",
			});
			setCookie("refresh_token", token.refresh_token, {
				req,
				res,
				maxAge: 60 * 60,
			});
			setCookie("access_token", token.access_token, {
				req,
				res,
				maxAge: 60 * 60 * 24,
			});
			const user = await getUser(token.access_token);
			const userpoll = await getUserpoll(week);
			const pollVoters = await getBallots(true);
			const provisionalVoters = await getBallots(false);
			return { props: { user, userpoll, pollVoters, provisionalVoters } };
		}
	} else if (query.code && query.state === RANDOM_STRING) {
		try {
			const token = await getToken({
				code: query.code,
				grant_type: "authorization_code",
				redirect_uri: REDIRECT_URI,
			});
			setCookie("refresh_token", token.refresh_token, {
				req,
				res,
				maxAge: 60 * 60,
			});
			setCookie("access_token", token.access_token, {
				req,
				res,
				maxAge: 60 * 60 * 24,
			});
			const user = await getUser(token.access_token);
			const userpoll = await getUserpoll(week);
			const pollVoters = await getBallots(true);
			const provisionalVoters = await getBallots(false);
			return { props: { user, userpoll, pollVoters, provisionalVoters } };
		} catch (e) {
			console.log(e);
			return { props: { user: null } };
		}
	} else {
		const userpoll = await getUserpoll(week);
		const pollVoters = await getBallots(true);
		const provisionalVoters = await getBallots(false);
		return { props: { user: null, userpoll, pollVoters, provisionalVoters } };
	}
};
