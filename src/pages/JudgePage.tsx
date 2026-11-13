import React from "react";
import ScheduleLayout from "../components/ScheduleLayout";
import ScheduleTable from "../components/ScheduleTable";
import PresentationSchedules from "../components/PresentationSchedules";
import Food from "../components/Food";
import FloorPlans from "../components/FloorPlans";
import Sponsors from "../components/Sponsors";

const JudgePage: React.FC = () => {
  return (
    <>
      <ScheduleLayout>
        {(day) => (
          <>
            <ScheduleTable type="judges" />
            <Food type="judges" />
            <PresentationSchedules />
            <FloorPlans />
          </>
        )}
      </ScheduleLayout>
      <Sponsors />
    </>
  );
};

export default JudgePage;
