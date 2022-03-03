import React from "react";
import { Chart } from "react-google-charts";

const PollChart = (props) => {
  const data = props.chartData;

  const options = {
    title: "Poll Results",
    is3D: true,
  };

  return (
    <div className="PollChart">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default PollChart;
