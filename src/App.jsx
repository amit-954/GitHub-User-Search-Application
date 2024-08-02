import React, { useState } from "react";
import Header from "./components/Header";
import MainComponent from "./components/MainComponent";
import "./App.css";

const App = () => {
	const [searchUsername, setSearchUsername] = useState("");

	const handleSearch = (username) => {
		setSearchUsername(username);
	};

	return (
		<>
			<Header onSearch={handleSearch} />
			<MainComponent searchUsername={searchUsername} />
		</>
	);
};

export default App;
