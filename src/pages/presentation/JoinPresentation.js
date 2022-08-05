import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingDotsIcon from "../../components/LoadingDotsIcon";
import Page from "../../components/Page";
import PollChart from "../../components/PollChart";
import pivot_logo from "../../img/pivot.logo.jpg";

const JoinPresentation = ({ socket }) => {
  const navigate = useNavigate();
  const [slide, setSlide] = useState();
  const [pollStarted, setPollStarted] = useState(false);
  const [poolQuestion, setPoolquestion] = useState("");
  const [endMessage, setEndMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [chartData, setChartData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const { presentationName } = useParams();
  const room = presentationName.trim().toLowerCase();

  const endPresentation = useCallback(() => {
    setTimeout(() => {
      setEndMessage("Presentation will end shortly");
      setTimeout(() => {
        socket.emit("remove-user");
        navigate("/");
      }, 3000);
    }, 4000);
  });

  useEffect(() => {
    if (socket) {
      socket.on("new-poll-result", ({ chartData, totalCount }) => {
        setChartData(chartData);
        setTotalCount(totalCount);
        endPresentation();
      });
      socket.on("current-slide", ({ slide, room }) => {
        if (presentationName.trim().toLowerCase() === room) setSlide(slide);
      });
      socket.on("new-poll", poolQuestion => {
        setPoolquestion(poolQuestion);
        setPollStarted(true);
      });
    }
  }, [socket, presentationName, endPresentation]);

  const setValue = e => {
    setAnswer(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit("answer", { room, answer });
  };

  return (
    <Page title={"Presentation"}>
      <img className="nav-common-logo" src={pivot_logo} alt="logo" />
      <section className="slide ">
        {slide && !pollStarted && !endMessage && (
          <div className={`slide__content`}>
            <h3 className="slide__title">{slide.slideTitle}</h3>
            <img className="slide__image" src={slide.slideImage} alt="" />
            <p className="slide__body">{slide.slideBody}</p>
          </div>
        )}
        <div>
          {pollStarted && !chartData && (
            <>
              {" "}
              <p className="slide__question"> {poolQuestion}</p>
              <form className="slide__form" onSubmit={handleSubmit}>
                <div>
                  <input type="radio" id="yes" name="survey" value="yes" onChange={setValue} />
                  <label htmlFor="yes"> Yes</label>
                </div>
                <div>
                  <input type="radio" id="No" name="survey" value="no" onChange={setValue} />
                  <label htmlFor="No"> No</label>
                </div>
                <div>
                  <input type="radio" id="none" name="survey" value="none" onChange={setValue} />
                  <label htmlFor="none"> None</label>
                </div>
                <button type="submit">Submit</button>
              </form>
            </>
          )}
        </div>
        <div className="poll__result">
          {chartData && (
            <>
              <h2>{totalCount} people participated the poll</h2>
              <PollChart chartData={chartData} />{" "}
            </>
          )}
        </div>

        {!slide && !pollStarted && !endMessage && (
          <>
            <h1>Wait for presentation {room} to start</h1>
            <LoadingDotsIcon />
          </>
        )}
        {endMessage && <h1>{endMessage}</h1>}
      </section>
    </Page>
  );
};

export default JoinPresentation;
