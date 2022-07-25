import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { deleteSlideById, getSlideById } from "../../utils/api/presentationApi";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";

const ViewSingleSlide = () => {
  const navigate = useNavigate();
  const { presentationId, slideId } = useParams();
  const [slide, setSlide] = useState();
  useEffect(() => {
    getSlideById(presentationId, slideId).then(slide => {
      setSlide(slide);
    });
  }, [presentationId, slideId]);

  const deleteSlide = async () => {
    await deleteSlideById(presentationId, slideId);
    navigate(`/presentation/slide-create/${presentationId}`);
  };
  return (
    <div>
      <div className="slide__link">
        <Link to={`/presentation/slide-create/${presentationId}`}>
          {" "}
          &laquo;<small>Back to slides </small>{" "}
        </Link>
      </div>
      {slide && (
        <div className="slide">
          <div className="slide__header">
            <span className="slide__title">{slide.slideTitle}</span>
            <div className="btn-container">
              <button
                className="btn btn-edit"
                onClick={() => {
                  navigate(`/presentation/${presentationId}/slide-edit/${slideId}`);
                }}
              >
                <AiOutlineEdit />
              </button>
              <button className="btn btn-delete" onClick={deleteSlide}>
                <FaRegTrashAlt />
              </button>
            </div>
          </div>

          <img className="slide__image" src={slide.slideImage} alt="" />
          <p className="slide__body">{slide.slideBody}</p>
        </div>
      )}
    </div>
  );
};

export default ViewSingleSlide;
