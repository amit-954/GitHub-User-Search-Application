import React, { useState, useEffect } from "react";

const Tab = ({
	repos,
	forkedRepos,
	followers,
	following,
	numberTokilo,
	updateProfile,
	loadingRepos,
	loadingForkedRepos,
	loadingFollowers,
	loadingFollowing,
}) => {
	const [activeTab, setActiveTab] = useState("repositories");

	useEffect(() => {
		setActiveTab("repositories");
	}, [repos]);

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const renderRepoSkeleton = () => (
		<>
			{Array.from({ length: 6 }).map((_, index) => (
				<div key={index} className="card repo-skeleton">
					<div className="card-body">
						<div className="skeleton title-skeleton"></div>
						<div className="skeleton text-skeleton text-1"></div>
						<div className="skeleton text-skeleton text-2"></div>
					</div>
					<div className="card-footer">
						<div className="skeleton text-skeleton"></div>
						<div className="skeleton text-skeleton"></div>
						<div className="skeleton text-skeleton"></div>
					</div>
				</div>
			))}
		</>
	);

	const renderFollowerSkeleton = () => (
		<>
			{Array.from({ length: 6 }).map((_, index) => (
				<div key={index} className="card follower-skeleton">
					<div className="skeleton avatar-skeleton"></div>
					<div className="skeleton title-skeleton"></div>
				</div>
			))}
		</>
	);

	return (
		<div className="tab-container">
			{/* Tab Navigation */}
			<nav className="tab-list">
				<button
					className={`tab-btn ${
						activeTab === "repositories" ? "active" : ""
					}`}
					aria-selected={activeTab === "repositories"}
					onClick={() => handleTabClick("repositories")}
				>
					Repositories
				</button>
				<button
					className={`tab-btn ${
						activeTab === "forked" ? "active" : ""
					}`}
					aria-selected={activeTab === "forked"}
					onClick={() => handleTabClick("forked")}
				>
					Forked
				</button>
				<button
					className={`tab-btn ${
						activeTab === "followers" ? "active" : ""
					}`}
					aria-selected={activeTab === "followers"}
					onClick={() => handleTabClick("followers")}
				>
					Followers
				</button>
				<button
					className={`tab-btn ${
						activeTab === "following" ? "active" : ""
					}`}
					aria-selected={activeTab === "following"}
					onClick={() => handleTabClick("following")}
				>
					Following
				</button>
			</nav>

			{/* Tab Content */}
			<div className="tab-panel" hidden={activeTab !== "repositories"}>
				{loadingRepos ? (
					renderRepoSkeleton()
				) : repos.length ? (
					repos.map((repo) => {
						const {
							id,
							name,
							html_url,
							description,
							private: isPrivate,
							language,
							stargazers_count: stars_count,
							forks_count,
						} = repo;

						return (
							<article key={id} className="card repo-card">
								<div className="card-body">
									<a
										href={html_url}
										target="_blank"
										rel="noopener noreferrer"
										className="card-title"
									>
										<h3 className="title-3">{name}</h3>
									</a>
									{description && (
										<p className="card-text">
											{description}
										</p>
									)}
									<span className="badge">
										{isPrivate ? "Private" : "Public"}
									</span>
								</div>
								<div className="card-footer">
									{language && (
										<div className="meta-item">
											<span
												className="material-symbols-rounded"
												aria-hidden="true"
											>
												code_blocks
											</span>
											<span className="span">
												{language}
											</span>
										</div>
									)}
									<div className="meta-item">
										<span
											className="material-symbols-rounded"
											aria-hidden="true"
										>
											star_rate
										</span>
										<span className="span">
											{numberTokilo(stars_count)}
										</span>
									</div>
									<div className="meta-item">
										<span
											className="material-symbols-rounded"
											aria-hidden="true"
										>
											family_history
										</span>
										<span className="span">
											{numberTokilo(forks_count)}
										</span>
									</div>
								</div>
							</article>
						);
					})
				) : (
					<div className="error-content">
						<p className="title-1">Oops! :(</p>
						<p className="text">
							Doesn't have any public repositories yet.
						</p>
					</div>
				)}
			</div>

			<div className="tab-panel" hidden={activeTab !== "forked"}>
				{loadingForkedRepos ? (
					renderRepoSkeleton()
				) : forkedRepos.length ? (
					forkedRepos.map((repo) => {
						const {
							id,
							name,
							html_url,
							description,
							private: isPrivate,
							language,
							stargazers_count: stars_count,
							forks_count,
						} = repo;

						return (
							<article key={id} className="card repo-card">
								<div className="card-body">
									<a
										href={html_url}
										target="_blank"
										rel="noopener noreferrer"
										className="card-title"
									>
										<h3 className="title-3">{name}</h3>
									</a>
									{description && (
										<p className="card-text">
											{description}
										</p>
									)}
									<span className="badge">
										{isPrivate ? "Private" : "Public"}
									</span>
								</div>
								<div className="card-footer">
									{language && (
										<div className="meta-item">
											<span
												className="material-symbols-rounded"
												aria-hidden="true"
											>
												code_blocks
											</span>
											<span className="span">
												{language}
											</span>
										</div>
									)}
									<div className="meta-item">
										<span
											className="material-symbols-rounded"
											aria-hidden="true"
										>
											star_rate
										</span>
										<span className="span">
											{numberTokilo(stars_count)}
										</span>
									</div>
									<div className="meta-item">
										<span
											className="material-symbols-rounded"
											aria-hidden="true"
										>
											family_history
										</span>
										<span className="span">
											{numberTokilo(forks_count)}
										</span>
									</div>
								</div>
							</article>
						);
					})
				) : (
					<div className="error-content">
						<p className="title-1">Oops! :(</p>
						<p className="text">
							Doesn't have any forked repositories yet.
						</p>
					</div>
				)}
			</div>

			<div className="tab-panel" hidden={activeTab !== "followers"}>
				{loadingFollowers ? (
					renderFollowerSkeleton()
				) : followers.length ? (
					followers.map((follower) => {
						const { login: username, avatar_url, url } = follower;

						return (
							<article
								key={username}
								className="card follower-card"
							>
								<figure className="avatar-circle img-holder">
									<img
										src={`${avatar_url}?s=64`}
										width="56"
										height="56"
										loading="lazy"
										alt={username}
										className="img-cover"
									/>
								</figure>
								<h3 className="card-title">{username}</h3>
								<button
									className="icon-btn"
									onClick={() => updateProfile(url)}
									aria-label={`Go to ${username} profile`}
								>
									<span
										className="material-symbols-rounded"
										aria-hidden="true"
									>
										link
									</span>
								</button>
							</article>
						);
					})
				) : (
					<div className="error-content">
						<p className="title-1">Oops! :(</p>
						<p className="text">Doesn't have any followers yet.</p>
					</div>
				)}
			</div>

			<div className="tab-panel" hidden={activeTab !== "following"}>
				{loadingFollowing ? (
					renderFollowerSkeleton()
				) : following.length ? (
					following.map((followed) => {
						const { login: username, avatar_url, url } = followed;

						return (
							<article
								key={username}
								className="card follower-card"
							>
								<figure className="avatar-circle img-holder">
									<img
										src={`${avatar_url}?s=64`}
										width="56"
										height="56"
										loading="lazy"
										alt={username}
										className="img-cover"
									/>
								</figure>
								<h3 className="card-title">{username}</h3>
								<button
									className="icon-btn"
									onClick={() => updateProfile(url)}
									aria-label={`Go to ${username} profile`}
								>
									<span
										className="material-symbols-rounded"
										aria-hidden="true"
									>
										link
									</span>
								</button>
							</article>
						);
					})
				) : (
					<div className="error-content">
						<p className="title-1">Oops! :(</p>
						<p className="text">Doesn't have any following yet.</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Tab;
