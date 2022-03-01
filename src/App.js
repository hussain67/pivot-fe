import './App.css';
import React, { useState } from "react";
//import { useParams } from "react-router-dom";
import Header from "./components/Header";
import MainSection from "./components/MainSection";
import Results from "./components/Results";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:9090")
//const socket = io(process.env.REACT_APP_SOCKET_URL)
console.log(io(process.env.REACT_APP_SOCKET_URL))

function App() {
  const [sessionId, setSessionId] = useState('');
  const [responseData, setResponseData] = useState([["Answer", "Response"], ["A", 10]]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Routes>
          <Route
            path="/presentations/:sessionId"
            element={
              <MainSection
                socket={socket}
                setSessionId={setSessionId}
                // sessionId={sessionId}
                setResponseData={setResponseData}>
              </MainSection>}>
          </Route>
          <Route
            path="/presentations/:sessionId/responses/:slideId"
            element={
              <Results
                sessionId={sessionId}
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


// function App() {
//   const [presentation_id, setPresentationId] = useState('');
//   const [responseData, setResponseData] = useState([["Answer", "Response"], ["A", 10]]);

//   return (
//     <BrowserRouter>
//       <div className="App">
//         <Header></Header>
//         <Routes>
//           <Route
//             path="/presentations/:presentation_id"
//             element={
//               <MainSection
//                 socket={socket}
//                 setPresentationId={setPresentationId}
//                 presentation_id={presentation_id}
//                 setResponseData={setResponseData}>
//               </MainSection>}>
//           </Route>
//           <Route
//             path="/presentations/:presentation_id/responses"
//             element={
//               <Results
//                 presentation_id={presentation_id}
//                 responseData={responseData}>
//               </Results>}>
//           </Route>
//           <Route path="*" element={<p className='notFound'>Page Not Found !!</p>} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }
