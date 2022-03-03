import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularLoader from "./CircularLoader";
import { getSlides } from "../utils/api";
import Footer from "./Footer";
import ImageCarousel from "./ImageCarousel";
import Header from "./Header";
import QRModal from "./QRModal";
import PollChart from "./PollChart";

const MainSection = ({
  socket,
  responseData,
  setResponseData,
  setChartData,
  setCorrectAnswer,
  setImage,
  chartData,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [slides, setSlides] = useState([]);
  const [slideId, setSlideId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { sessionId } = useParams();
  const [url, setUrl] = useState("");
  const [current, setCurrent] = useState(0);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    getSlides(sessionId)
      .then((res) => {
        setSlides(res.slides);
        setUrl(`https://pivot-fe.netlify.app/${sessionId}`);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, [sessionId]);

  return isLoading ? (
    <CircularLoader></CircularLoader>
  ) : (
    <div className="main">
      <Header setShowModal={setShowModal} showModal={showModal}></Header>
      <div className="main-container">
        <ImageCarousel slides={slides} current={current}></ImageCarousel>
        {showChart && <PollChart chartData={chartData}></PollChart>}
      </div>
      <Footer
        slideId={slideId}
        setSlideId={setSlideId}
        current={current}
        setCurrent={setCurrent}
        slides={slides}
        socket={socket}
        setResponseData={setResponseData}
        setChartData={setChartData}
        setCorrectAnswer={setCorrectAnswer}
        setImage={setImage}
        setShowChart={setShowChart}
      ></Footer>
      <QRModal setShow={setShowModal} show={showModal} sessionId={sessionId} />
    </div>
  );
};

export default MainSection;
