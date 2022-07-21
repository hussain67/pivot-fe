import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { getAllPresentations } from "../../utils/api/presentationApi";
import { createSchedule, getSchedule } from "../../utils/api/scheduleApi";

const Stats = () => {
  const navigate = useNavigate();
  const [presentations, setPresentations] = useState();
  const [selectedPresentation, setSelectedPresentation] = useState({
    scheduleFor: "",
    presentationName: "",
    presentationId: ""
  });
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    getSchedule().then(schedule => {
      setSchedule(schedule);
    });
    getAllPresentations().then(presentations => {
      setPresentations(presentations);
    });
  }, []);

  console.log(schedule);
  const handleSubmit = e => {
    e.preventDefault();
    createSchedule(presentation);
  };

  return (
    <Page title={"Presentation-stats"}>
      <div className="page-section">
        <h2>You have a scheduled presentation at 2PM</h2>

        {schedule && (
          <div>
            {schedule.map(presentation => {
              const { _id, title } = presentation;
              return (
                <div key={_id} className="presentation-list">
                  <span>{title} </span>
                  <div className="btn-container">
                    <button className="btn btn-view" onClick={() => navigate(`presentation-display/${presentation.title}/${presentation._id}`)}>
                      Display
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <h2>Available presentations</h2>
        {presentations && (
          <div>
            {presentations.map(presentation => {
              const { _id, title } = presentation;
              return (
                <div key={_id} className="presentation-list">
                  <span>{title} </span>
                  <div className="btn-container">
                    <button className="btn btn-view" onClick={() => navigate(`presentation-display/${presentation.title}/${presentation._id}`)}>
                      Schedule presentation
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="form">
          <h1>Schedule Presentation</h1>
          <form className="form__container" onSubmit={handleSubmit}>
            <div className="form__row">
              <label htmlFor="presentation-name" className="form__label">
                Presentation Name
              </label>
              <input
                type="text"
                name="presentation-name"
                id="presentation-name"
                className="form__input"
                value={presentation}
                onChange={e => {
                  setPresentation(e.target.value);
                }}
              />
            </div>
            <button type="submit" className=" btn btn__block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default Stats;
