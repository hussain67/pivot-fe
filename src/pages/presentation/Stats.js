import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

import Page from "../../components/Page";
import { getAllPresentations } from "../../utils/api/presentationApi";
import { createSchedule, getSchedulePresenter, removeScheduleById } from "../../utils/api/scheduleApi";

const initialState = {
  title: "",
  id: "",
  time: ""
};

const Stats = () => {
  const navigate = useNavigate();
  const [presentations, setPresentations] = useState([]);
  const [selectedPresentation, setSelectedPresentation] = useState(initialState);
  const [showSelectTime, setShowSelectTime] = useState(false);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    getSchedulePresenter().then(schedule => {
      setSchedule(schedule);
    });

    getAllPresentations().then(presentations => {
      if (presentations) {
        setPresentations(presentations);
      }
    });
  }, []);

  const handleSelectedPresentation = (title, id) => {
    setSelectedPresentation({ ...selectedPresentation, title, id });
    setShowSelectTime(true);
  };
  const handleSubmit = e => {
    e.preventDefault();
    createSchedule(selectedPresentation).then(item => {
      if (item) {
        setSchedule([...schedule, item]);
      }
    });
    setShowSelectTime(false);
    setSelectedPresentation(initialState);
  };

  const removeSchedule = id => {
    removeScheduleById(id).then(resp => {
      if (resp === "success") {
        setSchedule(
          schedule.filter(item => {
            return item._id != id;
          })
        );
      }
    });
  };

  return (
    <Page title={"Presentation-stats"}>
      <div className="page-section">
        {schedule.length > 0 ? <h2>Scheduled presentations</h2> : ""}

        {schedule && (
          <div>
            {schedule.map(presentation => {
              const { _id, title, time, presentationId } = presentation;
              return (
                <div key={_id} className="presentation-list">
                  <span>{title} </span>
                  <span>{time}</span>
                  <div className="btn-container">
                    <button className="btn btn-view" onClick={() => navigate(`presentation-display/${title}/${presentationId}`)}>
                      Display
                    </button>
                    <button className="btn btn-delete" onClick={() => removeSchedule(_id)}>
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {presentations.length > 0 ? <h2>Available presentations</h2> : <h2> You have not created any presentations yet</h2>}
        {presentations && (
          <div>
            {presentations.map(presentation => {
              const { _id, title } = presentation;
              return (
                <div key={_id} className="presentation-list">
                  <span>{title} </span>
                  <div className="btn-container">
                    <button className="btn btn-view" onClick={() => handleSelectedPresentation(title, _id)}>
                      Schedule presentation
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {showSelectTime && (
          <div className="form">
            <h1>Schedule Presentation</h1>
            <form className="form__container" onSubmit={handleSubmit}>
              <div className="form__row">
                <label htmlFor="presentation-time" className="form__label">
                  Presentation Time
                </label>
                <input
                  type="text"
                  name="presentation-time"
                  id="presentation-time"
                  className="form__input"
                  value={selectedPresentation.time}
                  onChange={e => {
                    setSelectedPresentation({ ...selectedPresentation, time: e.target.value });
                  }}
                />
              </div>

              <button type="submit" className=" btn btn__block">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </Page>
  );
};

export default Stats;
