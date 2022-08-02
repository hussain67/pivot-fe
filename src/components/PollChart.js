import React from "react";
import { Chart } from "react-google-charts";

const PollChart = ({ chartData }) => {
  const options = {
    title: "Poll results",
    is3D: true
  };
  return (
    <div>
      <Chart chartType="PieChart" data={chartData} options={options} width={"400px"} height={"400px"} />
    </div>
  );
};

export default PollChart;
