import "./App.css";
import React, { useState } from "react";
import MainSection from "./components/MainSection";
import Results from "./components/Results";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Home from "./pages/Home";
import { Stats, Profile, CreatePresentation, DisplayPresentation, CreateSlide, SharedLayout } from "./pages/presentation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { getUserFromLocalStorage } from "./utils/localstorage";
import ProtectedRoute from "./pages/ProtectedRoutes";
import("./styles/main.scss");

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
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats />} />
            <Route path="profile" element={<Profile />} />
            <Route path="create-slide/:presentationId" element={<CreateSlide />} />
            <Route path="create" element={<CreatePresentation />} />
            <Route path="display" element={<DisplayPresentation />} />
          </Route>
          <Route path="/home" element={<Home />}></Route>

          <Route path="/presentations/:sessionId" element={<MainSection socket={socket} responseData={responseData} setResponseData={setResponseData} setChartData={setChartData} chartData={chartData} correctAnswer={correctAnswer} setCorrectAnswer={setCorrectAnswer} setImage={setImage}></MainSection>}></Route>
          <Route path="/presentations/:sessionId/responses/:slideId" element={<Results responseData={responseData} chartData={chartData} correctAnswer={correctAnswer} image={image}></Results>}></Route>
          <Route path="*" element={<p className="notFound">Page Not Found !!</p>} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
