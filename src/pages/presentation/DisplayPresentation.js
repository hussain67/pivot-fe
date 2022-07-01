import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getAllSlides } from "../../utils/api/presentationApi";

const DisplayPresentation = () => {
  const { presentationId } = useParams();
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  //console.log(presentationId);

  useEffect(() => {
    getAllSlides(presentationId).then(slides => {
      setSlides(slides);
      //console.log(slides);
    });
  }, []);

  useEffect(() => {
    if (index > slides.length - 1) {
      setIndex(0);
    }
    if (index < 0) {
      setIndex(slides.length - 1);
    }
  }, [index, slides]);
  return (
    <section className="view-slide slide-display">
      {slides.length > 0 && (
        <div>
          {slides.map((slide, slideIndex) => {
            const { slideTitle, slideBody, slideImage, slideQuestion, _id } = slide;

            let position = "slide-next";

            if (slideIndex === index) {
              position = "slide-active";
            }
            if (slideIndex === index - 1 || (index === 0 && slideIndex === slides.length - 1)) {
              position = "slide-last";
            }

            return (
              <div className={`slide__content ${position}`} key={_id}>
                <h3 className="view-slide__title">{slideTitle}</h3>
                <p className="view-slide__body">{slideBody}</p>
                <img className="view-slide__image" src={slideImage} alt="" />
                <p className="view-slide__question"> {slideQuestion}</p>
              </div>
            );
          })}
        </div>
      )}
      <button className="prev" onClick={() => setIndex(index - 1)}>
        <FiChevronLeft />
      </button>
      <button className="next" onClick={() => setIndex(index + 1)}>
        <FiChevronRight />
      </button>
    </section>
  );
};

export default DisplayPresentation;
