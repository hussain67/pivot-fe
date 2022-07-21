import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getAllSlides } from "../../utils/api/presentationApi";

const DisplayPresentation = ({ socket }) => {
  const { presentationTitle, presentationId } = useParams();
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [isStart, setIsStart] = useState(true);
  const navigate = useNavigate();

  const room = presentationTitle.trim().toLocaleLowerCase();
  const username = "presenter";

  useEffect(() => {
    getAllSlides(presentationId).then(slides => {
      setSlides(slides);
      console.log(slides);
      socket.emit("join", { username, room }, (error, user) => {
        if (error) {
          alert(error);
          console.log(error);
        } else {
          console.log(user);
        }
      });
    });
  }, [presentationId, room, socket]);

  const startSlide = () => {
    if (isStart) {
      socket.emit("current-slide", { slide: slides[0] });
      setIndex(0);
      setIsStart(!isStart);
    } else {
      socket.emit("end-message", "Presentation has ended");
      setSlides([]);

      setIsStart(!isStart);
    }
  };
  const prevSlide = () => {
    let currentIndex;
    currentIndex = index - 1;
    if (currentIndex < 0) {
      currentIndex = slides.length - 1;
    }
    setIndex(currentIndex);
    const slide = slides[currentIndex];
    socket.emit("current-slide", { slide });
  };

  const nextSlide = () => {
    let currentIndex;
    currentIndex = index + 1;
    if (currentIndex > slides.length - 1) {
      currentIndex = 0;
    }
    setIndex(currentIndex);
    const slide = slides[currentIndex];
    socket.emit("current-slide", { slide });
  };

  return (
    <section className="slide">
      {slides.length > 0 && (
        <>
          <div className={`slide__content`} key={slides[index]._id}>
            <h3 className="slide__title">{slides[index].slideTitle}</h3>
            <img className="slide__image" src={slides[index].slideImage} alt="" />
            <p className="slide__body">{slides[index].slideBody}</p>
          </div>
          <footer className="slide__footer">
            <button onClick={startSlide} className={"btn"}>
              {isStart ? "Start" : "Stop"}
            </button>
            {index === slides.length - 1 && (
              <button className={"btn"} onClick={() => navigate(`/presentation/presentation-poll/${presentationTitle}/${presentationId}`)}>
                Start Poll
              </button>
            )}
          </footer>
          <button className="prev" onClick={prevSlide}>
            <FiChevronLeft />
          </button>
          <button className="next" onClick={nextSlide}>
            <FiChevronRight />
          </button>
        </>
      )}
    </section>
  );
};

export default DisplayPresentation;
