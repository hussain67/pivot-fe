import React from "react";

const Stats = () => {
  return (
    <div>
      <h1>Stats </h1>
      <h2>You have a scheduled presentation at 2PM</h2>
      <h2>Available presentations</h2>
      <div className="form__container">
        <h2>Create a new presentation</h2>
        <form className="">
          <div className="form__row">
            <label htmlFor="presentation" className="form__label">
              Presentation Title:
            </label>
            <input type="text" name="presentation" className="form__input" />
          </div>
          <button type="submit" className="btn btn__block">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Stats;
