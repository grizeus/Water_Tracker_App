import { useSelector } from "react-redux";
import { selectProgress } from "../../../redux/water/selectors";
import sprite from "src/assets/images/sprite/sprite.svg";

import { OpenerType } from "../../components";

export const WaterRatioPanel = ({
  onModalOpen,
}: {
  onModalOpen: OpenerType;
}) => {
  const percentage = useSelector(selectProgress);
  const intPercentage = parseInt(percentage);

  const showMarkLabel =
    intPercentage > 5 && intPercentage < 95;
// TODO: add shadows defaults
  return (
    <div className="flex w-[280px] flex-col justify-center gap-2 md:w-[704px] md:flex-row md:items-center md:gap-6 xl:w-[594px] xl:gap-8">
      <div className="flex w-[280px] flex-col md:w-[356px] xl:w-[390px]">
        <h4 className="mb-2 text-lg font-normal leading-6 text-royal md:mb-4">
          Today
        </h4>
        <div className="bg-hawkes relative h-2 w-full rounded-full">
          <div
            className="bg-perano absolute h-full rounded-full transition-all duration-300"
            style={{ width: `${intPercentage}%` }}
          />
          <div
            className="relative top-1/2 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-royal bg-white transition-all duration-300"
            style={{
              left: `${intPercentage}%`,
            }}>
            {showMarkLabel && (
              <span className="absolute flex -translate-x-1/3 translate-y-1/3 flex-col text-center text-sm font-medium leading-4 text-royal before:content-['|']">{`${intPercentage}%`}</span>
            )}
          </div>
        </div>
        <div className="flex h-8 flex-row justify-between">
          <span className="-translate-x-1/2 text-left text-xs text-royal before:flex before:justify-center before:gap-1 before:content-['|']">
            0%
          </span>
          <span className="translate-x-1/2 text-center text-xs text-royal before:flex before:justify-center before:gap-1 before:content-['|']">
            100%
          </span>
        </div>
      </div>
      <button
        className="flex items-center justify-center gap-3 rounded-xl border-none bg-royal px-[76px] py-[6px] text-white shadow-[0_4px_8px_0_rgba(64,123,255,0.34)] transition-shadow duration-[350] ease-in-out hover:shadow-[0_4px_14px_0_rgba(64,123,255,0.54);] active:shadow-none md:w-[336px] md:px-24 md:py-[10px] xl:w-44 xl:px-8"
        type="button"
        onClick={onModalOpen}>
        <svg className="h-6 w-6 fill-transparent stroke-white">
          <use href={`${sprite}#icon-increment-outline`}></use>
        </svg>
        Add Water
      </button>
    </div>
  );
};
