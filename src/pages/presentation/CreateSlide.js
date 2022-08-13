import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Page from "../../components/Page";
import { createSlide, getPresentationById, uploadSlideImage } from "../../utils/api/presentationApi";

const initialState = {
  slideTitle: "",
  slideBody: "",
  slideImage: ""
};
const Slides = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState("");
  const [slide, setSlide] = useState(initialState);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    getPresentationById(id).then(presentation => {
      setPresentation(presentation);
      setSlides(presentation.slides);
    });
  }, [id]);
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
    createSlide(id, slide).then(slideId => {
      // console.log(slideId);
      if (slide) {
        setSlide(initialState);
        navigate(`/presentation/${id}/slide-view/${slideId}`);
      }
    });
  };

  return (
    <Page title={"Create-slide"}>
      <h1>Presentation: {presentation.title}</h1>
      <div className="create-slide">
        <div className="create-slide__create">
          <h1>Create slide</h1>
          <div>
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
              <div className="form__row">
                <label htmlFor="image" className="form__label">
                  Image
                </label>
                <input type="file" id="image" accept="image/*" onChange={handleImageUpload} />
              </div>

              <button type="submit" className="btn btn__block btn-create-slide">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="create-slide__name">
          <h1>Slides</h1>
          {slides.length > 0 &&
            slides.map(slide => {
              return (
                <li key={slide._id}>
                  <Link to={`/presentation/${id}/slide-view/${slide._id}`} key={slide._id}>
                    {slide.slideTitle}
                  </Link>
                </li>
              );
            })}
        </div>
      </div>
    </Page>
  );
};

export default Slides;
