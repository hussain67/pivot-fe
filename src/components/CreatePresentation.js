import React, { useState } from "react";
import { createPresentation } from "../utils/api/presentationApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CreatePresentation = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [presentation, setPresentation] = useState("");
  const handleChange = e => {
    setInput(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    createPresentation(input).then(title => {
      if (title) {
        setPresentation(title);
      }
    });
  };

  useEffect(() => {
    if (presentation) {
      setTimeout(() => {
        navigate("/create-slide");
      }, 1000);
    }
  }, [presentation, navigate]);
  return (
    <div>
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
  );
};

export default CreatePresentation;
