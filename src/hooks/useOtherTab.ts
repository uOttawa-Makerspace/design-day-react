import { useEffect, useState } from "react";
import { Day } from "../components/ScheduleLayout";
import {
  OtherTab,
  fetchDayTabs,
  followTab,
  parseOtherTab,
} from "../services/googleSheets";

export function useOtherTab(day: Day) {
  const [data, setData] = useState<OtherTab | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setData(null);
    setFailed(false);
    return followTab(
      fetchDayTabs(day).other,
      (values) => {
        setData(parseOtherTab(values));
        setFailed(false);
      },
      (err) => {
        console.error(err);
        setFailed(true);
      }
    );
  }, [day]);

  return { data, failed };
}
