import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSchedule } from "../utils/api/scheduleApi";
import PresentationSchedule from "./PresentationSchedule";
import Register from "./Register";

function HomeMain({ socket }) {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [username, setUsername] = useState("");
  const [presentationName, setPresentationName] = useState("");
  const [joiningPresentation, setJoiningPresentation] = useState(false);

  useEffect(() => {
    getSchedule().then(schedule => {
      setSchedule(schedule);
    });

    console.log(schedule);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit("join", { username, room: presentationName }, (error, user) => {
      if (error) {
        alert(error);
        console.log(error);
      } else {
        console.log(user);
        navigate(`/join-presentation/${username}/${presentationName}`);
      }
    });
  };
  return (
    <div className="home-main">
      <div className="home-main__left">
        <h1>Participant</h1>
        {!joiningPresentation && <PresentationSchedule schedule={schedule} setPresentationName={setPresentationName} setJoiningPresentation={setJoiningPresentation} />}

        {joiningPresentation && (
          <div>
            <div className="form">
              <form className="form__container" onSubmit={handleSubmit}>
                <div className="form__row">
                  <label htmlFor="username" className="form__label">
                    Choose an username
                  </label>
                  <input
                    type="text"
                    required
                    name="username"
                    id="username"
                    className="form__input"
                    value={username}
                    onChange={e => {
                      setUsername(e.target.value);
                    }}
                  ></input>
                </div>
                <button type="submit" className=" btn btn__block">
                  Join presentation {presentationName}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="home-main__right">
        <h1>Presenter</h1>
        <Register />
      </div>
    </div>
  );
}

export default HomeMain;
