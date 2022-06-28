import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "../../components/Page";
import { createSlide, getPresentationById, uploadSlideImage } from "../../utils/api/presentationApi";

const initialState = {
  slideTitle: "",
  slideBody: "",
  slideImage: "",
  slideQuestion: ""
};
const Slides = () => {
  const { id } = useParams();
  const [presentation, setPresentation] = useState("");
  const [slide, setSlide] = useState(initialState);

  useEffect(() => {
    getPresentationById(id).then(presentation => {
      setPresentation(presentation);
    });
  }, []);
  //console.log(presentation.slides);
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
  //console.log(slide);

  const handleSubmit = e => {
    e.preventDefault();
    createSlide(id, slide).then(presentation => {
      //console.log(presentation);
      if (presentation) {
        setPresentation(presentation);
      }
    });
  };

  return (
    <Page>
      <h1>Presentation: {presentation.title}</h1>
      <div className="create-slide">
        <div className="create-slide__create">
          <h1>Create slide</h1>
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
          {presentation.slides &&
            presentation.slides.map(slide => {
              return <li key={slide._id}>{slide.slideTitle}</li>;
            })}
        </div>
      </div>
    </Page>
  );
};

export default Slides;
