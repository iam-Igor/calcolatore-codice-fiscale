import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MainComp } from "./components/MainComp";
import { CustNav } from "./components/CustNav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Inverse } from "./components/Inverse";
import { Footer } from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <CustNav />
      <Routes>
        <Route path="/calcola-cf" element={<MainComp />} />
        <Route path="/inverse" element={<Inverse />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
