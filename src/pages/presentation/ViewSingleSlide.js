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
    navigate(`/slide-create/${presentationId}`);
  };
  return (
    <div>
      <p>
        <Link to={`/slide-create/${presentationId}`}>
          {" "}
          &laquo;<small>Back to slides </small>{" "}
        </Link>
      </p>
      {slide && (
        <div className="view-slide">
          <div className="view-slide__header">
            <span className="view-slide__title">{slide.slideTitle}</span>
            <div className="btn-container">
              <button
                className="btn btn-edit"
                onClick={() => {
                  navigate(`/${presentationId}/slide-edit/${slideId}`);
                }}
              >
                <AiOutlineEdit />
              </button>
              <button className="btn btn-delete" onClick={deleteSlide}>
                <FaRegTrashAlt />
              </button>
            </div>
          </div>

          <p className="view-slide__body">{slide.slideBody}</p>
          <img className="view-slide__image" src={slide.slideImage} alt="" />
          <h3 className="view-slide__question">{slide.slideQuestion}</h3>
        </div>
      )}
    </div>
  );
};

export default ViewSingleSlide;
