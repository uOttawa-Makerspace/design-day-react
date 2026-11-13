import React from "react";
import ScheduleLayout from "../components/ScheduleLayout";
import ScheduleTable from "../components/ScheduleTable";
import PresentationSchedules from "../components/PresentationSchedules";
import Food from "../components/Food";
import FloorPlans from "../components/FloorPlans";
import Sponsors from "../components/Sponsors";

const StudentPage: React.FC = () => {
  return (
    <>
      <ScheduleLayout>
        {(day) => (
          <>
            <ScheduleTable type="students" />
            <Food type="students" />
            <PresentationSchedules />
            <FloorPlans />
          </>
        )}
      </ScheduleLayout>
      <Sponsors />
    </>
  );
};
export default StudentPage;
