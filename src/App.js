import "./App.css";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

//import MainSection from "./components/MainSection";
import Results from "./components/Results";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import io from "socket.io-client";
import Home from "./pages/Home";
import { Stats, Profile, EditSlide, ViewSingleSlide, CreatePresentation, DisplayPresentation, CreateSlide, SharedLayout, JoinPresentation } from "./pages/presentation";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { getUserFromLocalStorage } from "./utils/localstorage";
import ProtectedRoute from "./pages/ProtectedRoutes";
import Pool from "./pages/presentation/Pool";
import("./styles/main.scss");

/*
let socket = io.connect("https://rhs-pivot-backend.herokuapp.com");

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  socket = io.connect("http://localhost:9090");
} else {
  socket = io.connect("https://rhs-pivot-backend.herokuapp.com");
}
*/
function App() {
  /*
  const [responseData, setResponseData] = useState([]);
  const [chartData, setChartData] = useState([["Option", "Response"]]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [image, setImage] = useState("");
  */
  const [apiSocket, setApiSocket] = useState();

  useEffect(() => {
    const socket = io.connect("http://localhost:9090");
    setApiSocket(socket);
  }, []);

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

            <Route path="create" element={<CreatePresentation />} />
            <Route path="slide-create/:id" element={<CreateSlide />} />
            <Route path=":presentationId/slide-view/:slideId" element={<ViewSingleSlide />} />
            <Route path=":presentationId/slide-edit/:slideId" element={<EditSlide />} />

            <Route path="presentation-pool/:presentationId" element={<Pool socket={apiSocket} />} />
          </Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/join-presentation" element={<JoinPresentation socket={apiSocket} />}></Route>

          {/* 
             <Route path="/presentations/:sessionId" element={<MainSection socket={socket} responseData={responseData} setResponseData={setResponseData} setChartData={setChartData} chartData={chartData} correctAnswer={correctAnswer} setCorrectAnswer={setCorrectAnswer} setImage={setImage}></MainSection>}></Route>
          <Route path="/presentations/:sessionId/responses/:slideId" element={<Results responseData={responseData} chartData={chartData} correctAnswer={correctAnswer} image={image}></Results>}></Route> */}
          <Route path="presentation-display/:presentationId" element={<DisplayPresentation socket={apiSocket} />} />
          <Route path="*" element={<p className="notFound">Page Not Found !!</p>} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
