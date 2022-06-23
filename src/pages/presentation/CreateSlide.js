import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemFromLocalStorage } from "../../utils/localstorage";

const initialState = {
  title: "",
  content: "",
  image: "",
  question: ""
};
const CreateSlide = () => {
  const id = useParams();
  const [presentationName, setPresentationName] = useState("");
  const [values, setValues] = useState(initialState);
  console.log(id);

  useEffect(() => {
    const name = getItemFromLocalStorage("presentationName");
    setPresentationName(name);
  }, []);

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>{presentationName}</h1>
      <form className="" onSubmit={handleSubmit}>
        <div className="form__row">
          <label htmlFor="title" className="form__label">
            Slide Title:
          </label>
          <input type="text" name="title" className="form__input" onChange={handleChange} value={values.title} />
        </div>
        <button type="submit" className="btn btn__block">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateSlide;
