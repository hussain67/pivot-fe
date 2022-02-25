import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Header from "./components/Header";
import MainSection from "./components/MainSection";
import Results from "./components/Results";
//import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Routes>
          <Route
            path="/presentations/:presentation_id"
            element={<MainSection ></MainSection>}>
          </Route>
          <Route path="/presentations/:presentation_id/responses" element={<Results></Results>}></Route>
          <Route path="*" element={<p className='notFound'>Page Not Found !!</p>} />
        </Routes>
        {/* <Footer presentation_id={presentationId} slide_id={slide_id}></Footer> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
