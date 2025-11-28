import React from "react";
import NavCommon from "../components/NavCommon";
import Page from "../components/Page";
import Hero from "../components/Hero";
import Users from "../features/user/Users";

const Home = ({ socket }) => {
	return (
		<Page title={"Home"}>
			<NavCommon />
			<Hero />
			<Users socket={socket} />
		</Page>
	);
};

export default Home;
