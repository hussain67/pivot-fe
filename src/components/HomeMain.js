import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getScheduleParticipant } from "../utils/api/scheduleApi";
import PresentationSchedule from "./PresentationSchedule";
import shareImg from "../img/sharing_articles.svg";
import Register from "./Register";
import join from "../img/join.svg";

function HomeMain({ socket }) {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [username, setUsername] = useState("");
  const [presentationName, setPresentationName] = useState("");
  const [joiningPresentation, setJoiningPresentation] = useState(false);
  const [showSchedule, setShowSchedule] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    getScheduleParticipant().then(schedule => {
      setSchedule(schedule);
    });

    //console.log(schedule);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/join-presentation/${username}/${presentationName}`);
  };
  return (
    <>
      <div className="home-main">
        <div className="home-main__left">
          {!showSchedule && (
            <div className="home-hero-left">
              <img src={join}></img>
            </div>
          )}
          {showSchedule && !joiningPresentation && <PresentationSchedule schedule={schedule} setPresentationName={setPresentationName} setJoiningPresentation={setJoiningPresentation} />}

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
          {!showLogin && (
            <div className="home-hero">
              <img src={shareImg} alt="" />
              <div className="home-hero-banner">
                <p className="home-hero-info"> To create and display presentation and to conduct poll.</p>
                <button
                  className="btn btn__hero"
                  onClick={() => {
                    setShowLogin(!showLogin);
                  }}
                >
                  Login/Register{" "}
                </button>
              </div>
            </div>
          )}
          {showLogin && <Register />}
        </div>
      </div>
    </>
  );
}

export default HomeMain;
