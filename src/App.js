import "./App.css";
import React, { useState } from "react";
import MainSection from "./components/MainSection";
import Results from "./components/Results";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

let socket = io.connect("https://rhs-pivot-backend.herokuapp.com");

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  socket = io.connect("http://localhost:9090");
} else {
  socket = io.connect("https://rhs-pivot-backend.herokuapp.com");
}

function App() {
  const [responseData, setResponseData] = useState([]);
  const [chartData, setChartData] = useState([["Option", "Response"]]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [image, setImage] = useState("");

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/presentations/:sessionId"
            element={
              <MainSection
                socket={socket}
                responseData={responseData}
                setResponseData={setResponseData}
                setChartData={setChartData}
                chartData={chartData}
                setCorrectAnswer={setCorrectAnswer}
                setImage={setImage}
              ></MainSection>
            }
          ></Route>
          <Route
            path="/presentations/:sessionId/responses/:slideId"
            element={
              <Results
                responseData={responseData}
                chartData={chartData}
                correctAnswer={correctAnswer}
                image={image}
              ></Results>
            }
          ></Route>
          <Route
            path="*"
            element={<p className="notFound">Page Not Found !!</p>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
