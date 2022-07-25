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
        return (
          <div key={_id} className="presentation-list">
            <span>{title} </span>
            <span>{time}</span>
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
