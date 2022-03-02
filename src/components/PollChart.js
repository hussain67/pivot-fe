import React from "react";
import { Chart } from "react-google-charts";


const PollChart = (props) => {
    // const data = [
    //     ["Answer", "Response"],
    //     ["A", 10],
    //     ["B", 12],
    //     ["C", 5],
    //     ["D", 2]
    // ]

    const data = props.chartData;

    const options = {
        title: "Poll Results",
        is3D: true
    };

    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    );
}

export default PollChart;
