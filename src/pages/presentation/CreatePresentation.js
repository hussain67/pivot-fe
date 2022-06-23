import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import PresentationList from "../../components/PresentationList";
import { createPresentation, getAllPresentations } from "../../utils/api/presentationApi";
//import { useNavigate } from "react-router-dom";
import { addItemToLocalStorage } from "../../utils/localstorage";
const CreatePresentation = () => {
  //const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [presentations, setPresentations] = useState([]);
  const [presentationName, setPresentationName] = useState(null);
  const handleChange = e => {
    setInput(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    createPresentation(input).then(presentation => {
      if (presentation) {
        addItemToLocalStorage("presentationName", presentation.title);
        setPresentationName(presentation);
      }
    });
  };
  useEffect(() => {
    getAllPresentations().then(presentations => {
      setPresentations(presentations);
    });
  }, []);
  console.log(presentations);
  /*
  useEffect(() => {
    if (presentation) {
      setTimeout(() => {
        navigate(`/create-slide/${presentation.id}`);
      }, 1000);
    }
  }, [presentation, navigate]);

  */
  return (
    <Page title={"Create-presentation"}>
      <div className="presentation-create">
        {presentations.length > 0 && <PresentationList presentations={presentations} />}

        <div className="form__container">
          <h2>Create a new presentation</h2>
          <form className="" onSubmit={handleSubmit}>
            <div className="form__row">
              <label htmlFor="presentation" className="form__label">
                Presentation Title:
              </label>
              <input type="text" name="presentation" className="form__input" onChange={handleChange} value={input} />
            </div>
            <button type="submit" className="btn btn__block">
              Create
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default CreatePresentation;
