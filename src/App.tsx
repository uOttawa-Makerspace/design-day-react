import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import JudgePage from "./pages/JudgePage";
import StudentPage from "./pages/StudentPage";
import { prefetchScheduleTabs } from "./services/googleSheets";
import "./i18n";

function App() {
  // The schedule data is the same for judges and students: warm it up before
  // either page is opened. App renders only once the config has loaded.
  useEffect(() => {
    prefetchScheduleTabs();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/judges" element={<JudgePage />} />
        <Route path="/students" element={<StudentPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
