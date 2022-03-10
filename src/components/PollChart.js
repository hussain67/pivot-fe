import React from "react";
import { Chart } from "react-google-charts";

const PollChart = ({
  chartData,
  show,
  currSlide,
  correctAnswer,
  pollStopped,
}) => {
  const options = {
    title: "Poll Results",
    is3D: true,
  };

  return (
    <div
      className="PollChart"
      style={show ? { display: "block" } : { display: "none" }}
    >
      <div className="PollChart-content">
        <h2>Responses for slide #{currSlide + 1}</h2>
        <Chart
          chartType="PieChart"
          data={chartData}
          options={options}
          width={"100%"}
          height={"400px"}
        />
        {pollStopped && <h3>The correct answer was {correctAnswer}</h3>}
      </div>
    </div>
  );
};

export default PollChart;
