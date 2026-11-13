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

  const images = config.floorplans.map((floorplan_url) => {
    return { src: floorplan_url };
  });

  return (
    <>
      <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mt-10 mb-6 text-left">
        {t("floor_plans")}
      </h3>

      {config.showFloorPlan === false || images.length === 0 ? (
        <p className="text-center text-slate-500">{t("no_floor_plans")}</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {images.map((image, i) => (
            <button
              onClick={() => {
                setImgIndex(i);
                setIsImgPopupOpen(true);
              }}
              className="flex flex-col items-center justify-center"
              key={i}
            >
              <p className="mb-2 font-medium">{config.floorplan_titles[i]}</p>
              <img
                className="w-auto h-auto max-h-full rounded-lg shadow-sm hover:shadow-md transition-shadow"
                src={image.src}
                alt={config.floorplan_titles[i] || "Floor Plan"}
              />
            </button>
          ))}
        </div>
      )}

      <Lightbox
        open={isImgPopupOpen}
        index={imgIndex}
        slides={images}
        close={() => setIsImgPopupOpen(false)}
        plugins={[Captions]}
      />
    </>
  );
};

export default FloorPlans;
