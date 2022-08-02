import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PollChart from "../../components/PollChart";
import poolImage from "../../img/poll.jpg";
import Page from "../../components/Page";
import LoadingDotsIcon from "../../components/LoadingDotsIcon";
import NavCommon from "../../components/NavCommon";

let chartData = [["Option", "Answer"]];

const Poll = ({ socket }) => {
  const navigate = useNavigate();
  const { presentationTitle } = useParams();
  const [totalCount, setTotalCount] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noneCount, setNoneCount] = useState(0);
  const [pollEnded, setPollEnded] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const room = presentationTitle.trim().toLocaleLowerCase();
  const poolQuestion = "Amazon rain forest is in danger ? ";

  useEffect(() => {
    socket.emit("poll-started", { poolQuestion });
  }, [socket]);

  useEffect(() => {
    setTimeout(() => {
      setPollEnded(pollEnded => {
        return !pollEnded;
      });
    }, 25000);
  }, []);

  const processResult = () => {
    chartData.push(["yes", yesCount], ["no", noCount], ["none", noneCount]);
    socket.emit("chart-data", { chartData, room: presentationTitle.toLowerCase() });
  };
  useEffect(() => {
    if (pollEnded) {
      processResult();
      setShowResult(showResult => {
        return !showResult;
      });
    }
  }, [pollEnded]);

  useEffect(() => {
    socket.on("new-answer", answer => {
      if (answer) {
        setTotalCount(count => {
          return count + 1;
        });
      }
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

  return (
    <Page>
      <NavCommon />
      <main className="poll">
        {!showResult && (
          <section className="poll__running">
            <div className="poll__img">
              <img src={poolImage} alt={""} />
            </div>

            <LoadingDotsIcon />

            <div>
              {" "}
              <span className="poll-count">{totalCount} </span> poll result received
            </div>
          </section>
        )}

        {/*
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

        */}

        {showResult && (
          <div className="pool__result">
            <PollChart chartData={chartData} />
            <button
              className="btn btn-block"
              onClick={() => {
                chartData = [["Option", "Answer"]];
                socket.emit("remove-user");

                setTimeout(() => {
                  navigate("/presentation");
                }, 1000);
              }}
            >
              End Presentation
            </button>
          </div>
        )}
      </main>
    </Page>
  );
};

export default Poll;
