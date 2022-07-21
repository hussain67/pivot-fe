import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PollChart from "../../components/PollChart";

let chartData = [["Option", "Answer"]];

const Poll = ({ socket }) => {
  const navigate = useNavigate();
  const { presentationTitle } = useParams();
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noneCount, setNoneCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const room = presentationTitle.trim().toLocaleLowerCase();
  const poolQuestion = "Amazon rain forest is in danger ? ";

  useEffect(() => {
    socket.emit("poll-started", { poolQuestion });
  });

  useEffect(() => {
    socket.on("new-answer", answer => {
      if (answer === "yes") {
        setYesCount(count => {
          return count + 1;
        });
      } else if (answer === "no") {
        setNoCount(count => {
          return count + 1;
        });
      } else {
        setNoneCount(count => {
          return count + 1;
        });
      }
    });
  }, [socket]);

  useEffect(() => {
    console.log(yesCount, "yes");
    console.log(noCount, "no");
    console.log(noneCount, "none");
  }, [yesCount, noCount, noneCount]);

  return (
    <>
      {!showResult && <div>Poll In Progress</div>}
      <button
        className="btn btn-block"
        onClick={() => {
          chartData.push(["yes", yesCount], ["no", noCount], ["none", noneCount]);
          socket.emit("chart-data", { chartData, room: presentationTitle.toLowerCase() });
          setShowResult(!showResult);
        }}
      >
        Poll Result
      </button>
      <button
        className="btn btn-block"
        onClick={() => {
          chartData = [["Option", "Answer"]];

          setTimeout(() => {
            navigate("/");
          }, 1000);
        }}
      >
        End Presentation
      </button>
      {showResult && <PollChart chartData={chartData} />}
    </>
  );
};

export default Poll;
