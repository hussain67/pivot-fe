import React from "react";
import HomeMain from "../components/HomeMain";
import Nav from "../components/NavHome";
import Page from "../components/Page";

const Home = ({ socket }) => {
  return (
    <Page title={"Home"}>
      <Nav />
      <HomeMain socket={socket} />
    </Page>
  );
};

export default Home;
