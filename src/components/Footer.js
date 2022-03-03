import React, { useEffect, useState } from "react";

const Footer = ({
  showChart,
  setShowChart,
  slideId,
  setSlideId,
  current,
  setCurrent,
  slides,
  socket,
  setResponseData,
  setChartData,
  setCorrectAnswer,
  setImage,
}) => {
  const [noOfRes, setNoOfResponses] = useState(0);
  const [pollActive, setPollActive] = useState(false);
  const [pollStopped, setPollStopped] = useState(false);
  const [hasQuestion, setHasQuestion] = useState(false);

  useEffect(() => {
    setImage(slides[0].slideImageUrl);
    setSlideId(slides[0].slideId);
    setHasQuestion(slides[0].question.hasQuestion);
    if (slides[0].question.hasQuestion) {
      setResponseData((curr) => {
        return [];
      });
      setChartData((curr) => {
        const newChartData = [["Options", "Response"]];
        const possibleAnswers = slides[0].question.numAnswers;
        const possibleOptions = ["A", "B", "C", "D", "E"];
        for (let j = 0; j < possibleAnswers; j++) {
          let newData = [possibleOptions[j], 0];
          newChartData.push(newData);
        }
        return newChartData;
      });
    }
  }, []);

  const length = slides.length;

  function prevSlide() {
    let newSlide_id =
      current === 0 ? slides[length - 1].slideId : slides[current - 1].slideId;
    setCurrent(current === 0 ? length - 1 : current - 1);
    setSlideId(newSlide_id);
    const currSlide = slides.filter((slide) => {
      return slide.slideId === newSlide_id;
    });
    setHasQuestion(currSlide[0].question.hasQuestion);
    setImage(currSlide[0].slideImageUrl);
    if (currSlide[0].question.hasQuestion) {
      setCorrectAnswer(currSlide[0].question.correctAnswer);
      setNoOfResponses(0);
      setPollActive(false);
      setPollStopped(false);
      setResponseData((curr) => {
        return [];
      });
      setChartData((curr) => {
        const newChartData = [["Options", "Responses"]];
        const possibleAnswers = currSlide[0].question.numAnswers;
        const possibleOptions = ["A", "B", "C", "D", "E"];
        for (let j = 0; j < possibleAnswers; j++) {
          let newData = [possibleOptions[j], 0];
          newChartData.push(newData);
        }
        return newChartData;
      });
    }
  }

  function nextSlide() {
    let newSlide_id =
      current === length - 1 ? slides[0].slideId : slides[current + 1].slideId;
    setCurrent(current === length - 1 ? 0 : current + 1);
    setSlideId(newSlide_id);
    const currSlide = slides.filter((slide) => {
      return slide.slideId === newSlide_id;
    });
    setHasQuestion(currSlide[0].question.hasQuestion);
    setImage(currSlide[0].slideImageUrl);
    if (currSlide[0].question.hasQuestion) {
      setCorrectAnswer(currSlide[0].question.correctAnswer);
      setNoOfResponses(0);
      setPollActive(false);
      setPollStopped(false);
      setResponseData((curr) => {
        return [];
      });
      setChartData((curr) => {
        const newChartData = [["Options", "Responses"]];
        const possibleAnswers = currSlide[0].question.numAnswers;
        const possibleOptions = ["A", "B", "C", "D", "E"];
        for (let j = 0; j < possibleAnswers; j++) {
          let newData = [possibleOptions[j], 0];
          newChartData.push(newData);
        }
        return newChartData;
      });
    }
  }

  useEffect(() => {
    socket.on("new_response", (resdata) => {
      setResponseData((currData) => {
        const newRes = currData.map((studentRes) => {
          return { ...studentRes };
        });
        newRes.push(resdata);
        return newRes;
      });
      setNoOfResponses((curr) => {
        return curr + 1;
      });
      setChartData((curr) => {
        const newChartData = curr.map((data) => [...data]);
        const answer = resdata.userAnswer;
        for (let j = 0; j < newChartData.length; j++) {
          if (newChartData[j][0] === answer) {
            let currCount = newChartData[j][1];
            currCount = currCount + 1;
            newChartData[j] = [answer, currCount];
            break;
          }
        }
        return newChartData;
      });
    });
  }, [socket]);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  function handleStartClick() {
    socket.emit("teacher_current_slide", slideId);
    setPollActive(true);
    setShowChart(false);
  }

  function handleStopClick() {
    socket.emit("teacher_slide_stop", slideId);
    setPollStopped(true);
    setShowChart(false);
  }

  function handleShowChart() {
    setShowChart(!showChart);
    console.log(showChart, "<<<<");
  }

  return (
    <div className="footer">
      <div className="slideNav">
        <button onClick={prevSlide}>{"<"}</button>
        <p id="footer_span">{current + 1}</p>
        <button onClick={nextSlide}>{">"}</button>
      </div>
      <div className="pollButtons">
        <button
          className={`poll_btns ${
            hasQuestion && !pollActive ? "" : "poll_btns-disabled"
          }`}
          onClick={hasQuestion && !pollActive ? handleStartClick : () => {}}
        >
          Start Poll
        </button>
        <button
          className={`poll_btns ${
            hasQuestion && pollActive && !pollStopped
              ? ""
              : "poll_btns-disabled"
          }`}
          onClick={
            hasQuestion && pollActive && !pollStopped
              ? handleStopClick
              : () => {}
          }
        >
          Stop Poll
        </button>
        <button
          className={`poll_btns ${
            hasQuestion && pollActive && pollStopped ? "" : "poll_btns-disabled"
          }`}
          onClick={handleShowChart}
        >
          {showChart ? "Hide Results" : "Show Results"}
        </button>
      </div>
      <div className="responses">Responses{` ( ${noOfRes} ) `}</div>
      {hasQuestion && pollActive && pollStopped && <></>}
    </div>
  );
};

export default Footer;
