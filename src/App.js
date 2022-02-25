import './App.css';
import Header from "./components/Header";
import MainSection from "./components/MainSection";
import Responses from "./components/Responses";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Routes>
          <Route path="/" element={<MainSection></MainSection>}></Route>
          <Route path="/responses" element={<Responses></Responses>}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
