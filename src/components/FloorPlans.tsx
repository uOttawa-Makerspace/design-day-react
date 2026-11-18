import { useTranslation } from "react-i18next";
import { useState } from "react";
import config from "../config/config";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Day } from "./ScheduleLayout";

const FloorPlans = ({ day }: { day: Day }) => {
  const { t } = useTranslation();
  const [isImgPopupOpen, setIsImgPopupOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const showForDay =
    day === "1" ? config.showFloorPlan : config.showFloorPlanDay2;

  const plans = config.floorplans
    .map((url, i) => ({
      src: url,
      title: config.floorplan_titles[i],
      day: config.floorplanDays[i],
    }))
    .filter((plan) => plan.day == null || String(plan.day) === day);

  const images = plans.map((plan) => ({ src: plan.src }));

  const handleSelect = (i: number) => {
    setImgIndex(i);
    setIsImgPopupOpen(true);
  };

  const handleClose = () => {
    setIsImgPopupOpen(false);
    // Drop focus so the overlay isn't left hidden after closing
    (document.activeElement as HTMLElement | null)?.blur();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mt-10 mb-6 text-left">
        {t("floor_plans")}
      </h3>

      {showForDay === false || images.length === 0 ? (
        <p className="text-center text-slate-500">{t("no_floor_plans")}</p>
      ) : (
        // Bigger tiles: 1 column on mobile, 2 on tablet/desktop
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {images.map((image: { src: string }, i: number) => {
            // Overlay clears only while this plan is open in the lightbox
            const isSelected = isImgPopupOpen && imgIndex === i;
            const title = plans[i].title || t("floor_plans");

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(i)}
                className="group relative block w-full overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-400"
              >
                <img
                  className="w-full h-72 sm:h-96 object-contain p-2"
                  src={image.src}
                />

                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 transition-opacity duration-300 pointer-events-none p-4
                    ${isSelected ? "opacity-0" : "opacity-100"}
                    [@media(hover:hover)]:group-hover:opacity-0`}
                >
                  <span className="text-center text-3xl sm:text-5xl font-bold text-white drop-shadow-md mb-2">
                    {title}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-slate-200">
                    {t("floorplan_overlay_instruction", {
                      defaultValue: "Click or hover to view",
                    })}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <Lightbox
        open={isImgPopupOpen}
        index={imgIndex}
        slides={images}
        close={handleClose}
        plugins={[Captions, Zoom]}
        controller={{
          closeOnBackdropClick: true,
        }}
        render={{
          buttonClose: () => (
            <button
              type="button"
              onClick={handleClose}
              aria-label={t("close", "Close") || "Close"}
              className="yarl__button flex items-center gap-1.5 rounded-full bg-slate-900/90 px-4 py-2 text-sm font-semibold text-white border border-white/30 shadow-lg backdrop-blur-sm hover:bg-slate-800 active:scale-95 transition m-2"
            >
              <span>{t("close", "Close")}</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ),
        }}
      />
    </div>
  );
};

export default FloorPlans;
