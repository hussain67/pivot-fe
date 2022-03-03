import React from "react";
import { Chart } from "react-google-charts";

const PollChart = ({ chartData, show, setShow }) => {
  const options = {
    title: "Poll Results",
    is3D: true,
  };

  return (
    <div
      className="PollChart"
      style={show ? { display: "block" } : { display: "none" }}
    >
      <div class="PollChart-content">
        <span onClick={() => setShow(!show)} class="modal-close">
          &times;
        </span>
        <Chart
          chartType="PieChart"
          data={chartData}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </div>
  );
};

export default PollChart;
