import React from "react";
import ScheduleTable from "./ScheduleTable";
import PresentationSchedules from "./PresentationSchedules";

const StudentPage: React.FC = () => {
  return (
    <main className="pt-16">
      <ScheduleTable type="students" />
      <PresentationSchedules />
    </main>
  );
};

export default StudentPage;
