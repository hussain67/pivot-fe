import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPresentations } from "../../utils/api/presentationApi";

const Stats = () => {
  const navigate = useNavigate();
  const [presentations, setPresentations] = useState();

  useEffect(() => {
    getAllPresentations().then(presentations => {
      setPresentations(presentations);
      console.log(presentations);
    });
  }, []);

  return (
    <div>
      <h1>Stats </h1>
      <h2>You have a scheduled presentation at 2PM</h2>
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
                    Display
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Stats;
