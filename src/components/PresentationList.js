import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
const PresentationList = ({ presentations }) => {
  return (
    <div>
      {presentations.map(presentation => {
        const { _id, title } = presentation;
        return (
          <div key={_id} className="presentation-list">
            <span>{title} </span>
            <div className="btn-container">
              <button className="btn btn-view">View Slides</button>
              <button className="btn btn-edit">
                <AiOutlineEdit />
              </button>
              <button className="btn btn-delete">
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PresentationList;
