import React, { useState, useEffect } from "react";

const Header = ({ onSearch }) => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isPressed, setIsPressed] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const toggleSearch = () => {
		setIsSearchOpen(!isSearchOpen);
		document
			.querySelector(".header")
			.classList.toggle("search-active", !isSearchOpen);
	};

	const handleResize = () => {
		if (window.innerWidth > 768 && isSearchOpen) {
			setIsSearchOpen(false);
			document.querySelector(".header").classList.remove("search-active");
		}
	};

	const handleSearchSubmit = () => {
		onSearch(searchQuery);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSearchSubmit();
		}
	};

	useEffect(() => {
		const $HTML = document.documentElement;
		const isDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;

		if (sessionStorage.getItem("theme")) {
			$HTML.dataset.theme = sessionStorage.getItem("theme");
		} else {
			$HTML.dataset.theme = isDark ? "dark" : "light";
		}

		const changeTheme = () => {
			const newIsPressed = !isPressed;
			setIsPressed(newIsPressed);
			const newTheme = $HTML.dataset.theme === "light" ? "dark" : "light";
			$HTML.setAttribute("data-theme", newTheme);
			sessionStorage.setItem("theme", newTheme);
		};

		const $themeBtn = document.querySelector("[data-theme-btn]");
		$themeBtn.addEventListener("click", changeTheme);

		const handleScroll = () => {
			const header = document.querySelector("[data-header]");
			if (header) {
				header.classList[window.scrollY > 50 ? "add" : "remove"](
					"active",
				);
			}
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);

		return () => {
			$themeBtn.removeEventListener("click", changeTheme);
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, [isPressed, isSearchOpen]);

	return (
		<header className="header" data-header>
			<div className="container">
				<a href="/" className="logo">
					GitVerse
				</a>

				<div className="header-search">
					<button
						className="icon-btn search-toggler"
						aria-controls="searchBox"
						aria-expanded={isSearchOpen}
						aria-label="Toggle search"
						data-search-toggler
						onClick={toggleSearch}
					>
						<span
							className="material-symbols-rounded search-icon"
							aria-hidden="true"
						>
							search
						</span>
						<span
							className="material-symbols-rounded close-icon"
							aria-hidden="true"
						>
							arrow_back
						</span>
					</button>

					<div
						className={`search-box ${isSearchOpen ? "open" : ""}`}
						id="searchBox"
					>
						<span
							className="material-symbols-rounded leading-icon"
							aria-hidden="true"
						>
							search
						</span>
						<input
							type="search"
							name="search"
							aria-label="Search github username"
							placeholder="Search username"
							className="search-field label-1"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyDown={handleKeyDown} // Added this line
							data-search-field
						/>
						<button
							className="search-btn"
							aria-label="Search submit"
							data-search-submit
							onClick={handleSearchSubmit}
						>
							<span
								className="material-symbols-rounded"
								aria-hidden="true"
							>
								search
							</span>
							<span className="label-1">Search</span>
						</button>
					</div>
				</div>

				<button
					className="icon-btn theme-btn"
					aria-pressed={isPressed}
					aria-label="Toggle dark and light theme"
					data-theme-btn
				>
					<span
						className="material-symbols-rounded sun-icon"
						aria-hidden="true"
					>
						light_mode
					</span>
					<span
						className="material-symbols-rounded moon-icon"
						aria-hidden="true"
					>
						dark_mode
					</span>
				</button>
			</div>
		</header>
	);
};

export default Header;
