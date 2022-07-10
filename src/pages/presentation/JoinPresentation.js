import React, { useEffect, useState } from "react";

const JoinPresentation = ({ socket }) => {
  const [slide, setSlide] = useState();
  const [endMessage, setendMessage] = useState("");
  const [answer, setAnswer] = useState("");

  const room = "amazon";
  const username = "participant";

  useEffect(() => {
    socket.emit("join", { username, room });
  }, []);

  useEffect(() => {
    console.log(slide);
  }, [slide]);

  socket.on("current-slide", obj => {
    setSlide(obj);
  });
  socket.on("join-message", msg => {
    console.log(msg);
  });
  socket.on("end-message", msg => {
    setendMessage(msg);
  });

  const setValue = e => {
    setAnswer(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit("answer", answer);
  };
  const handleClick = () => {
    socket.emit("result", { room, answer: "yes" });
  };
  return (
    <section className="slide ">
      {slide && !endMessage && (
        <div className={`slide__content`}>
          <h3 className="slide__title">{slide.slideTitle}</h3>
          <p className="slide__body">{slide.slideBody}</p>
          <img className="slide__image" src={slide.slideImage} alt="" />
          <div>
            {slide.slideQuestion && (
              <>
                {" "}
                <p className="slide__question"> {slide.slideQuestion}</p>
                <form className="slide__form" onSubmit={handleSubmit}>
                  <div>
                    <input type="radio" id="yes" name="survey" value="yes" onChange={setValue} />
                    <label htmlFor="yes"> Yes</label>
                  </div>
                  <div>
                    <input type="radio" id="No" name="survey" value="no" onChange={setValue} />
                    <label htmlFor="No"> No</label>
                  </div>
                  <div>
                    <input type="radio" id="none" name="survey" value="none" onChange={setValue} />
                    <label htmlFor="none"> None</label>
                  </div>
                  <button type="submit">Submit</button>
                </form>
                <button onClick={handleClick}>Send vote</button>
              </>
            )}
          </div>
        </div>
      )}
      {!slide && !endMessage && <h1>Wait presentation to start</h1>}
      {endMessage && <h1>{endMessage}</h1>}
    </section>
  );
};

export default JoinPresentation;
