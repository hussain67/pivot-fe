import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PollChart from "../../components/PollChart";

const JoinPresentation = ({ socket }) => {
  const navigate = useNavigate();
  const [slide, setSlide] = useState();
  const [pollStarted, setPollStarted] = useState(false);
  const [poolQuestion, setPoolquestion] = useState("");
  const [endMessage, setEndMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [chartData, setChartData] = useState(null);

  //room = presentationTitle
  const { username, presentationName } = useParams();
  const room = presentationName.trim().toLocaleLowerCase();

  useEffect(() => {
    console.log(slide);
  }, [slide]);
  const endPresentation = () => {
    setTimeout(() => {
      setEndMessage("Presentation will end shortly");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 4000);
  };

  useEffect(() => {
    socket.on("new-chart-data", chartData => {
      console.log(chartData);
      setChartData(chartData);
      endPresentation();
      //socket.leave(room.toLocaleLowerCase());
    });
  }, [socket]);
  socket.on("join-message", msg => {
    console.log(msg);
  });

  socket.on("current-slide", obj => {
    setSlide(obj);
  });

  socket.on("end-message", msg => {
    setEndMessage(msg);
  });
  socket.on("new-poll", poolQuestion => {
    setPoolquestion(poolQuestion);
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
      {chartData && <PollChart chartData={chartData} />}
      {!slide && !pollStarted && !endMessage && <h1>Wait presentation {room} to start</h1>}
      {endMessage && <h1>{endMessage}</h1>}
    </section>
  );
};

export default JoinPresentation;
