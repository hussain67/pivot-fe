import React from "react";
import HomeMain from "../components/HomeMain";
import NavCommon from "../components/NavCommon";
import Page from "../components/Page";
import Hero from "../components/Hero";

const Home = ({ socket }) => {
	return (
		<Page title={"Home"}>
			<NavCommon />
			<Hero />
			<HomeMain socket={socket} />
		</Page>
	);
};

export default Home;
