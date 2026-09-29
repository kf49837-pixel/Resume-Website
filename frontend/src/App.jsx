import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ResumeMaker from "./pages/ResumeMaker";
import UploadResume from "./pages/UploadResume";
import Resumes from "./pages/Resumes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<ResumeMaker />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/resumes" element={<Resumes />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
      