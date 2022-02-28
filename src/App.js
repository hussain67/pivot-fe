import './App.css';
import React, { useState } from "react";
import Header from "./components/Header";
import MainSection from "./components/MainSection";
import Results from "./components/Results";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3002")

function App() {
  const [presentation_id, setPresentationId] = useState('');
  const [responseData, setResponseData] = useState([["Answer", "Response"], ["A", 10]]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Routes>
          <Route
            path="/presentations/:presentation_id"
            element={
              <MainSection
                socket={socket}
                setPresentationId={setPresentationId}
                presentation_id={presentation_id}
                setResponseData={setResponseData}>
              </MainSection>}>
          </Route>
          <Route
            path="/presentations/:presentation_id/responses"
            element={
              <Results
                presentation_id={presentation_id}
                responseData={responseData}>
              </Results>}>
          </Route>
          <Route path="*" element={<p className='notFound'>Page Not Found !!</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
