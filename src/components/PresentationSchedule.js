import moment from "moment";
import React from "react";

const PresentationSchedule = ({ schedule, setPresentationName, setJoiningPresentation }) => {
  const handleClick = presentationName => {
    setPresentationName(presentationName);
    setJoiningPresentation(true);
  };

  return (
    <div>
      {schedule.map(item => {
        const { _id, title, time } = item;

        const dateFormated = moment(time).format("D/ M/ Y, h:mm A");
        return (
          <div key={_id} className="presentation-list">
            <span>{title} </span>
            <span>{dateFormated}</span>
            <div className="btn-container">
              <button className="btn btn-view" onClick={() => handleClick(title)}>
                Join Presentation
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PresentationSchedule;
