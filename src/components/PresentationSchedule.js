import React from "react";

const PresentationSchedule = ({ schedule, setPresentationName, setJoiningPresentation }) => {
  const handleClick = presentationName => {
    setPresentationName(presentationName);
    setJoiningPresentation(true);
  };

  return (
    <div>
      {schedule.map(item => {
        const { _id, name: presentationName } = item;
        return (
          <div key={_id} className="presentation-list">
            <span>{presentationName} </span>
            <div className="btn-container">
              <button className="btn btn-view" onClick={() => handleClick(presentationName)}>
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
