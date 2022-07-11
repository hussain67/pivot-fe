import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PollChart from "../../components/PollChart";

const chartData = [["Option", "Answer"]];

const Pool = ({ socket }) => {
  const { presntationTitle, presntationId } = useParams();
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noneCount, setNoneCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    socket.emit("pool-started", { room: "amazon" });
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

          setShowResult(!showResult);
        }}
      >
        Poll Result
      </button>
      {showResult && <PollChart chartData={chartData} />}
    </>
  );
};

export default Pool;
