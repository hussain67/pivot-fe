import React from "react";
import moment from "moment";

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

            <button className="btn btn-view" onClick={() => handleClick(title)}>
              Join Presentation
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PresentationSchedule;
