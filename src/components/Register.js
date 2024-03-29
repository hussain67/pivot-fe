import React, { useEffect } from "react";
import { useState } from "react";
import { registerUser, loginUser } from "../utils/api/authApi";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addItemToLocalStorage } from "../utils/localstorage";

const initialState = {
  name: "",
  email: "",
  password: "",
  isRegistered: true,
  isLoading: false
};

function Register() {
  const [values, setValues] = useState(initialState);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { name, email, password } = values;
    if (!email || !password || (!values.isRegistered && !name)) {
      toast.error("Please provide all values");
      return;
    }
    if (values.isRegistered) {
      loginUser(email, password).then(user => {
        if (user) {
          addItemToLocalStorage("user", user);
          setUser(user);
        }
      });

      return;
    }
    registerUser(name, email, password).then(user => {
      addItemToLocalStorage("user", user);
      setUser(user);
    });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/presentation");
      }, 500);
    }
  }, [user, navigate]);

  const toggleRegistered = () => {
    setValues({ ...values, isRegistered: !values.isRegistered });
  };

  return (
    <div className="form">
      <form className="form__container" onSubmit={onSubmit}>
        <h3>{values.isRegistered ? "Presenter Login" : "Presenter Register"} </h3>
        {!values.isRegistered && (
          <div className="form__row">
            <label htmlFor="name" className="form__label">
              name
            </label>
            <input type="text" name="name" id="name" className="form__input" value={values.name} onChange={handleChange}></input>
          </div>
        )}

        <div className="form__row">
          <label htmlFor="email" className="form__label">
            email
          </label>
          <input type="email" name="email" id="email" className="form__input" value={values.email} onChange={handleChange}></input>
        </div>

        <div className="form__row">
          <label htmlFor="password" className="form__label">
            password
          </label>
          <input type="password" name="password" id="password" className="form__input" value={values.password} onChange={handleChange}></input>
        </div>
        <button type="submit" className=" btn btn__block" disabled={values.isLoading}>
          {values.isLoading ? "Loading..." : "Submit"}
        </button>
        <p>
          {" "}
          {values.isRegistered ? "Not Registered Yet ?" : "Already registered ?"}{" "}
          <button className="btn btn__register" type="button" onClick={toggleRegistered}>
            {" "}
            {values.isRegistered ? "Register" : "Login"}{" "}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;
