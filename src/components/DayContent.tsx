import React from "react";
import { Day } from "./ScheduleLayout";
import ScheduleTable from "./ScheduleTable";
import PresentationSchedules from "./PresentationSchedules";
import Food from "./Food";
import FloorPlans from "./FloorPlans";
import { useOtherTab } from "../hooks/useOtherTab";
import { Role } from "../services/googleSheets";

interface DayContentProps {
  role: Role;
  day: Day;
}

const DayContent: React.FC<DayContentProps> = ({ role, day }) => {
  const { data, failed } = useOtherTab(day);

  return (
    <>
      <ScheduleTable
        type={role}
        rows={data?.[role].schedule ?? []}
        failed={failed}
      />
      <Food type={role} blurb={data?.[role].food} />
      <PresentationSchedules day={day} />
      <FloorPlans day={day} />
    </>
  );
};

export default DayContent;
