import { useEffect, useState } from "react";
import { Day } from "../components/ScheduleLayout";
import {
  OtherTab,
  fetchDayTabs,
  parseOtherTab,
} from "../services/googleSheets";

export function useOtherTab(day: Day) {
  const [data, setData] = useState<OtherTab | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setFailed(false);
    fetchDayTabs(day)
      .other.then((values) => {
        if (cancelled) return;
        setData(parseOtherTab(values));
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [day]);

  return { data, failed };
}
