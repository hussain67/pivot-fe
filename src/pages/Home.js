import React from "react";
import HomeMain from "../components/HomeMain";
import NavCommon from "../components/NavCommon";
import Page from "../components/Page";

const Home = ({ socket }) => {
  return (
    <Page title={"Home"}>
      <NavCommon />
      <HomeMain socket={socket} />
    </Page>
  );
};

export default Home;
