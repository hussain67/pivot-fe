import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateMomentUtils from "@date-io/moment";
import moment from "moment";
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
  const [selectedDate, handleDateChange] = useState(new Date());

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

  useEffect(() => {
    setSelectedPresentation(p => {
      return { ...p, time: selectedDate._d };
    });
  }, [selectedDate]);

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
            return item._id !== id;
          })
        );
      }
    });
  };

  return (
    <Page title={"Presentation-stats"}>
      <div className="presentation-stats">
        <div className="page-section">
          {schedule.length > 0 ? <h2 className="page-section-title">Scheduled presentations</h2> : ""}

          {schedule && (
            <div className="">
              {schedule.map(presentation => {
                const { _id, title, time, presentationId } = presentation;
                const dateFormated = moment(time).format("D/ M/ Y, h:mm A");
                return (
                  <div key={_id} className="presentation-list">
                    <div className="presentation-schedule">
                      <span>{title} </span>
                      <span>{dateFormated}</span>
                    </div>

                    <div className="btn-container">
                      <button className="btn btn-view" onClick={() => navigate(`/presentation-display/${title}/${presentationId}`)}>
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
        </div>
        <div className="page-section">
          {presentations.length > 0 ? <h2 className="page-section-title">Available presentations</h2> : <h2> You have not created any presentations yet</h2>}
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
        </div>
        {showSelectTime && (
          <form className="form__container" onSubmit={handleSubmit}>
            <h3 className="page-section-title">Select Date and Time</h3>
            <div className="form__row">
              <MuiPickersUtilsProvider utils={DateMomentUtils}>
                <DatePicker value={selectedDate} onChange={handleDateChange} />
                <TimePicker value={selectedDate} onChange={handleDateChange} />
              </MuiPickersUtilsProvider>
            </div>

            <button type="submit" className=" btn btn__block">
              Submit
            </button>
          </form>
        )}
      </div>
    </Page>
  );
};

export default Stats;
