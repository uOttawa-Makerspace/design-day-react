import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import RoleSelect from "./pages/RoleSelect";
import Sponsors from "./pages/Sponsors";
import JudgePage from "./pages/JudgePage";
import StudentPage from "./pages/StudentPage";
import Footer from "./pages/Footer";
import "./i18n";
import PresentationSchedules from "./pages/PresentationSchedules";
import ScheduleHeader from "./pages/ScheduleHeader";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <RoleSelect />
              <Sponsors />
            </>
          }
        />
        <Route
          path="/judges"
          element={
            <>
              <JudgePage />
            </>
          }
        />
        <Route
          path="/students"
          element={
            <>
              <StudentPage />
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
