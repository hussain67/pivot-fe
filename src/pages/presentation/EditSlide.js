import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Page from "../../components/Page";
import { updateSlideById, getSlideById, uploadSlideImage } from "../../utils/api/presentationApi";

const initialState = {
  slideTitle: "",
  slideBody: "",
  slideImage: "",
  slideQuestion: ""
};
const EditSlide = () => {
  const navigate = useNavigate();
  const { presentationId, slideId } = useParams();
  const [slide, setSlide] = useState(initialState);

  useEffect(() => {
    getSlideById(presentationId, slideId).then(slide => {
      setSlide(slide);
    });
  }, [presentationId, slideId]);

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setSlide({ ...slide, [name]: value });
  };
  const handleImageUpload = e => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    uploadSlideImage(formData).then(src => {
      setSlide({ ...slide, slideImage: src });
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateSlideById(presentationId, slideId, slide).then(slide => {
      if (slide) {
        navigate(`/${presentationId}/slide-view/${slideId}`);
      }
    });
  };

  return (
    <Page>
      <div className="create-slide">
        <div className="create-slide__create">
          <h1>Edit slide</h1>
          <div className="create-slide__create__container">
            <form className="" onSubmit={handleSubmit}>
              <div className="form__row">
                <label htmlFor="title" className="form__label">
                  Title:
                </label>
                <input type="text" name="slideTitle" className="form__input" onChange={handleChange} value={slide.slideTitle} />
              </div>
              <div className="form__row">
                <label htmlFor="body" className="form__label">
                  Body
                </label>
                <textarea type="text" name="slideBody" className="form__input form__body" onChange={handleChange} value={slide.slideBody} />
              </div>
              <label htmlFor="image" className="form__label">
                Image
              </label>
              <img className="view-slide__image" src={slide.slideImage} alt="" />
              <div className="form__row">
                <input type="file" id="image" accept="image/*" onChange={handleImageUpload} />
              </div>

              <button type="submit" className="btn btn__block btn-create-slide">
                Save Updates
              </button>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default EditSlide;
