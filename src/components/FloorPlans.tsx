import { useTranslation } from "react-i18next";
import { useState } from "react";
import config from "../config/config";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

const FloorPlans = () => {
  const { t } = useTranslation();
  const [isImgPopupOpen, setIsImgPopupOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const images = config.floorplans.map((floorplan_url: string) => {
    return { src: floorplan_url };
  });

  const handleSelect = (i: number) => {
    setImgIndex(i);
    setIsImgPopupOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mt-10 mb-6 text-left">
        {t("floor_plans")}
      </h3>

      {config.showFloorPlan === false || images.length === 0 ? (
        <p className="text-center text-slate-500">{t("no_floor_plans")}</p>
      ) : (
        // Bigger tiles: 1 column on mobile, 2 on tablet/desktop
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {images.map((image: { src: string }, i: number) => {
            // Overlay clears only while this plan is open in the lightbox
            const isSelected = isImgPopupOpen && imgIndex === i;
            const title = config.floorplan_titles[i] || t("floor_plans");

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
        close={() => {
          setIsImgPopupOpen(false);
          // Drop focus so the overlay isn't left hidden after closing
          (document.activeElement as HTMLElement | null)?.blur();
        }}
        plugins={[Captions]}
      />
    </div>
  );
};

export default FloorPlans;
