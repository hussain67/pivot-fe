import './App.css';
import Header from "./components/Header";
import MainSection from "./components/MainSection";
import Results from "./components/Results";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3002")

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Routes>
          <Route
            path="/presentations/:presentation_id"
            element={<MainSection socket={socket}></MainSection>}>
          </Route>
          <Route path="/presentations/:presentation_id/responses" element={<Results></Results>}></Route>
          <Route path="*" element={<p className='notFound'>Page Not Found !!</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
