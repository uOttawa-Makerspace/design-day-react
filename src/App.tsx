import Header from "./pages/Header";
import Home from "./pages/Home";
import GeneralSchedule from "./pages/GeneralSchedule";
import Sponsors from "./pages/Sponsors";
import Footer from "./pages/Footer";
import "./i18n";
import PresentationSchedules from "./pages/PresentationSchedules";

function App() {
  return (
    <div>
      <Header />
      <Home />
      <GeneralSchedule />
      <PresentationSchedules />
      <Sponsors />
      <Footer />
    </div>
  );
}
export default App;
