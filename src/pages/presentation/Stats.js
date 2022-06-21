import React from "react";
import CreatePresentation from "../../components/CreatePresentation";

const Stats = () => {
  return (
    <div>
      <h1>Stats </h1>
      <h2>You have a scheduled presentation at 2PM</h2>
      <h2>Available presentations</h2>
      <CreatePresentation />
    </div>
  );
};

export default Stats;
