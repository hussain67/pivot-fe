import "./App.css";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

//import Results from "./components/Results";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Stats, Profile, EditSlide, ViewSingleSlide, CreatePresentation, DisplayPresentation, CreateSlide, SharedLayout, JoinPresentation } from "./pages/presentation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./pages/ProtectedRoutes";
import Poll from "./pages/presentation/Poll";
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
            path="/presentation"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/presentation" element={<Stats />} />
            <Route path="profile" element={<Profile />} />

            <Route path="create" element={<CreatePresentation />} />
            <Route path="slide-create/:id" element={<CreateSlide />} />
            <Route path=":presentationId/slide-view/:slideId" element={<ViewSingleSlide />} />
            <Route path=":presentationId/slide-edit/:slideId" element={<EditSlide />} />
          </Route>
          <Route path="/" element={<Home socket={apiSocket} />}></Route>
          <Route path="/presentation-display/:presentationTitle/:presentationId" element={<DisplayPresentation socket={apiSocket} />} />
          <Route path="/join-presentation/:username/:presentationName" element={<JoinPresentation socket={apiSocket} />}></Route>
          <Route path="/presentation-poll/:presentationTitle/:presentationId" element={<Poll socket={apiSocket} />} />

          <Route path="*" element={<p className="notFound">Page Not Found !!</p>} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
