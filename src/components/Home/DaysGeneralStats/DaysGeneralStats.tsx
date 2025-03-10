import { useRef, useEffect } from "react";
import { formatDate } from "../../../helpers/utils/dateUtils";

interface DayStats {
  date: string;
  drinkCount: number;
  dailyGoal: number | string;
  waterVolumePercentage: number | string;
}

interface Position {
  top: number;
  left: number;
  width: number;
}

const DaysGeneralStats = ({
  stats,
  position,
  isVisible,
}: {
  stats: DayStats;
  position: Position;
  isVisible: boolean;
}) => {
  const { date, drinkCount, dailyGoal, waterVolumePercentage } = stats;
  const modalRef = useRef(null);
  const day = parseInt(stats.date.split("-").pop());
  useEffect(() => {
    if (!modalRef.current) return;

    const { top, left, width } = position;
    const modal = modalRef.current;
    const modalWidth = modal.offsetWidth;
    const isMobile = window.innerWidth <= 767;
    const isTablet = window.innerWidth > 767 && window.innerWidth <= 1439;
    const isDesktop = window.innerWidth > 1439;
    const margin = 14;

    if (isMobile) {
      modal.style.top = `${top - (modal.offsetHeight + 58)}px`;
    }
    if (isTablet) {
      if (
        day <= 4 ||
        (day >= 11 && day <= 14) ||
        (day >= 21 && day <= 24) ||
        day === 31
      ) {
        modal.style.left = `${left + 17}px`;
      } else {
        modal.style.left = `${left - (modal.offsetWidth - 17)}px`;
      }

      modal.style.top = `${top - (modal.offsetHeight + 58)}px`;
    }
    if (isDesktop) {
      modal.style.transform = "translateX(0)";
      modal.style.top = top - modal.offsetHeight - 20 + "px";
      modal.style.left = left + width + "px";
    }
  }, [position, day]);

  const formattedDate = formatDate(date, "d, MMMM");
  return (
    <div
      className={`${!isVisible ? "hidden" : null} absolute -left-2 w-[280px] rounded-[10px] bg-white px-4 py-6 shadow-[0_4px_4px_0_rgba(64,123,255,0.3)] md:w-[292px]`}
      ref={modalRef}>
      <ul className="flex flex-col gap-4">
        <li className="flex items-center gap-1.5 text-base leading-5">
          <p className="text-royal">{formattedDate}</p>
        </li>
        <li className="flex items-center gap-1.5 text-base leading-5">
          Daily norma:
          <span className="text-lg font-medium leading-6 text-royal">
            {dailyGoal !== 0 ? dailyGoal : "2.0 L"}
          </span>
        </li>
        <li className="flex items-center gap-1.5 text-base leading-5">
          Fulfillment of the daily norm:
          <span className="text-lg font-medium leading-6 text-royal">
            {waterVolumePercentage}
          </span>
        </li>
        <li className="flex items-center gap-1.5 text-base leading-5">
          How many servings of water:
          <span className="text-lg font-medium leading-6 text-royal">
            {drinkCount}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default DaysGeneralStats;
