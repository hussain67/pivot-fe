import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularLoader from "./CircularLoader";
import { getSlides } from "../utils/api";
import Footer from "./Footer";
import ImageCarousel from "./ImageCarousel";
import Header from "./Header";
import Modal from "./Modal";

const MainSection = ({
  socket,
  responseData,
  setResponseData,
  setChartData,
  setCorrectAnswer,
  setImage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [slides, setSlides] = useState([]);
  const [slideId, setSlideId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { sessionId } = useParams();
  const [url, setUrl] = useState("");
  const [current, setCurrent] = useState(0);

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
    <div>
      <Header setShowModal={setShowModal} showModal={showModal}></Header>
      <div className="maindiv">
        <ImageCarousel slides={slides} current={current}></ImageCarousel>

        <div className="qr_div">
          <p>{url}</p>
        </div>
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
      ></Footer>
      <Modal setShow={setShowModal} show={showModal} sessionId={sessionId} />
    </div>
  );
};

export default MainSection;
