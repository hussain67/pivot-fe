import React from "react";
import { Chart } from "react-google-charts";

const PollChart = ({ chartData }) => {
  const options = {
    title: "Poll Results",
    is3D: true,
  };

  return (
    <div className="PollChart">
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default PollChart;
