import React, { useState, useEffect } from "react";
import Profile from "../components/Profile";
import Tab from "../components/Tab";

const MainComponent = ({ searchUsername }) => {
	const [profileData, setProfileData] = useState(null);
	const [repoData, setRepoData] = useState([]);
	const [forkedRepos, setForkedRepos] = useState([]);
	const [followers, setFollowers] = useState([]);
	const [following, setFollowing] = useState([]);
	const [loadingRepos, setLoadingRepos] = useState(true);
	const [loadingForkedRepos, setLoadingForkedRepos] = useState(true);
	const [loadingFollowers, setLoadingFollowers] = useState(true);
	const [loadingFollowing, setLoadingFollowing] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const defaultUsername = "amit-954";
		const username = searchUsername || defaultUsername;

		updateProfile(`https://api.github.com/users/${username}`);
	}, [searchUsername]);

	const fetchData = async (
		url,
		successCallback,
		errorCallback,
		setLoading,
	) => {
		if (setLoading) setLoading(true);
		try {
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				successCallback(data);
			} else {
				const error = await response.json();
				setError("An unexpected error occurred.");
				errorCallback && errorCallback(error);
			}
		} finally {
			if (setLoading) setLoading(false);
		}
	};

	const numberTokilo = (number) => {
		const numStr = String(number);
		if (numStr.length <= 3) {
			return numStr;
		} else if (numStr.length >= 4 && numStr.length <= 5) {
			return `${numStr.slice(0, -3)}.${numStr.slice(-3, -2)}k`;
		} else if (numStr.length === 6) {
			return `${numStr.slice(0, -3)}k`;
		} else {
			return `${numStr.slice(0, -6)}M`;
		}
	};

	const updateProfile = (profileUrl) => {
		setError(null);
		fetchData(
			profileUrl,
			(data) => {
				setProfileData(data);
				setRepoData([]);
				setForkedRepos([]);
				setFollowers([]);
				setFollowing([]);

				const { repos_url, followers_url, following_url } = data;

				// Fetch repositories
				fetchData(
					`${repos_url}?sort=created&per_page=12`,
					(repoData) => {
						// setRepoData(repoData.filter((repo) => !repo.fork));
						setRepoData(repoData);
					},
					null,
					setLoadingRepos,
				);

				// Fetch repositories
				fetchData(
					`${repos_url}?sort=created&per_page=12`,
					(repoData) => {
						setForkedRepos(repoData.filter((repo) => repo.fork));
					},
					null,
					setLoadingForkedRepos,
				);

				// Fetch followers
				fetchData(
					followers_url,
					setFollowers,
					null,
					setLoadingFollowers,
				);

				// Fetch following
				fetchData(
					following_url.replace("{/other_user}", ""),
					setFollowing,
					null,
					setLoadingFollowing,
				);
			},
			() => {
				setProfileData(null);
				setRepoData([]);
				setForkedRepos([]);
				setFollowers([]);
				setFollowing([]);
				setError("No account with this username."); // Set error for invalid profile
			},
		);
	};

	return (
		<>
			<main className="main" id="main">
				{error && (
					<div class="error-content">
						<p class="title-1">Oops! :(</p>
						<p class="text">No account with this username...</p>
					</div>
				)}
				<div className="container">
					{!error && (
						<>
							<Profile data={profileData} />
							<Tab
								repos={repoData}
								forkedRepos={forkedRepos}
								followers={followers}
								following={following}
								numberTokilo={numberTokilo}
								updateProfile={updateProfile}
								loadingRepos={loadingRepos}
								loadingForkedRepos={loadingForkedRepos}
								loadingFollowers={loadingFollowers}
								loadingFollowing={loadingFollowing}
							/>
						</>
					)}
				</div>
			</main>

			<footer className="footer container">
				<p className="copyright">&copy; 2024 amitjana</p>
			</footer>
		</>
	);
};

export default MainComponent;
