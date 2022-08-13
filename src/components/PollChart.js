import React from "react";
import { Chart } from "react-google-charts";

const PollChart = ({ chartData }) => {
  const options = {
    title: "",
    is3D: true
  };
  return (
    <div>
      <Chart chartType="PieChart" data={chartData} options={options} width={"370px"} height={"370px"} />
    </div>
  );
};

export default PollChart;
