import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PollChart from "../../components/PollChart";
import poolImage from "../../img/poll.jpg";
import Page from "../../components/Page";
import LoadingDotsIcon from "../../components/LoadingDotsIcon";
import pivot_logo from "../../img/pivot.logo.jpg";

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

  const poolQuestion = "Amazon rain forest is in danger ? ";

  useEffect(() => {
    if (socket) {
      socket.emit("poll-started", { poolQuestion });
    }
  }, [socket]);

  useEffect(() => {
    setTimeout(() => {
      setPollEnded(pollEnded => {
        return !pollEnded;
      });
    }, 10000);
  }, []);

  useEffect(() => {
    if (pollEnded) {
      const processResult = () => {
        chartData.push(["yes", yesCount], ["no", noCount], ["none", noneCount]);
        socket.emit("poll-result", { chartData, totalCount, room: presentationTitle.toLowerCase() });
      };
      processResult();
      setShowResult(showResult => {
        return !showResult;
      });
    }
  }, [pollEnded]);

  useEffect(() => {
    if (socket) {
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
    }
  }, [socket]);

  return (
    <Page title={"Poll"}>
      <img className="nav-common-logo" src={pivot_logo} alt="logo" />
      <main className="poll">
        {!showResult && <h2 className="poll__info">Poll in progress, do not refresh the page</h2>}

        {!showResult && (
          <>
            <section className="poll__running">
              <div className="poll__img">
                <img src={poolImage} alt={""} />
              </div>

              <LoadingDotsIcon />

              <div className="poll__count">
                <span className="poll__count__total">{totalCount} </span>
                <span> poll result received</span>
              </div>
            </section>
          </>
        )}

        {showResult && (
          <div className="poll__result">
            <div className="poll__result__container">
              <h2>{totalCount} people participated in sthe poll</h2>
              <PollChart chartData={chartData} />
              <button
                className="btn btn__end-presentation"
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
          </div>
        )}
      </main>
    </Page>
  );
};

export default Poll;
