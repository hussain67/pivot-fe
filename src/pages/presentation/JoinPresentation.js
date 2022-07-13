import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PollChart from "../../components/PollChart";

const JoinPresentation = ({ socket }) => {
  const navigate = useNavigate();
  const [slide, setSlide] = useState();
  const [pollStarted, setPollStarted] = useState(false);
  const [endMessage, setEndMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [chartData, setChartData] = useState(null);

  const room = "amazon";
  const username = "participant";

  useEffect(() => {
    socket.emit("join", { username, room });
  }, []);

  useEffect(() => {
    console.log(slide);
  }, [slide]);

  useEffect(() => {
    socket.on("new-chart-data", chartData => {
      console.log(chartData);
      setChartData(chartData);
      endPresentation();
    });
    socket.on("join-message", msg => {
      console.log(msg);
    });
  }, [socket]);

  const endPresentation = () => {
    setTimeout(() => {
      setEndMessage("Presentation will end shortly");
      setTimeout(() => {
        navigate("/");
      }, 8000);
    }, 8000);
  };

  socket.on("current-slide", obj => {
    setSlide(obj);
  });

  socket.on("end-message", msg => {
    setEndMessage(msg);
  });
  socket.on("new-poll", () => {
    setPollStarted(true);
    console.log("pollStarted");
  });

  const setValue = e => {
    setAnswer(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit("answer", { room, answer });
  };

  return (
    <section className="slide ">
      {slide && !pollStarted && !endMessage && (
        <div className={`slide__content`}>
          <h3 className="slide__title">{slide.slideTitle}</h3>
          <p className="slide__body">{slide.slideBody}</p>
          <img className="slide__image" src={slide.slideImage} alt="" />
        </div>
      )}
      <div>
        {pollStarted && !chartData && (
          <>
            {" "}
            <p className="slide__question"> "Poll Question"</p>
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
      {chartData && <PollChart chartData={chartData} />}
      {!slide && !pollStarted && !endMessage && <h1>Wait presentation to start</h1>}
      {endMessage && <h1>{endMessage}</h1>}
    </section>
  );
};

export default JoinPresentation;
