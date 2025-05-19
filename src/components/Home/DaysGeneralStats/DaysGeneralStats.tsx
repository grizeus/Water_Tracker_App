import { useRef, useEffect } from "react";
import { formatDate } from "../../../helpers/utils/dateUtils";
import { OpenerType } from "../../../../types/global";

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
  onClose,
}: {
  stats: DayStats;
  position: Position;
  isVisible: boolean;
  onClose: OpenerType;
}) => {
  const { date, drinkCount, dailyGoal, waterVolumePercentage } = stats;
  const modalRef = useRef<HTMLDivElement>(null);
  const dayString = date.split("-").pop();
  if (dayString === undefined) {
    return;
  }
  const day = parseInt(dayString);
  if (Number.isNaN(day)) {
    return;
  }

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) {
      return;
    }

    const { top, left, width } = position;
    const modalWidth = modal.offsetWidth;
    const modalHeight = modal.offsetHeight;
    const btnHeight = 58;

    const screenW = window.innerWidth;
    const isTablet = screenW > 767 && screenW <= 1439;
    const isDesktop = screenW > 1439;

    modal.style.top = `${top - (modalHeight + btnHeight)}px`;

    if (isTablet) {
      const shouldAlignLeft = [
        ...Array.from({ length: 4 }, (_, i) => i + 1),
        ...Array.from({ length: 4 }, (_, i) => i + 11),
        ...Array.from({ length: 4 }, (_, i) => i + 21),
        31,
      ].includes(day);

      modal.style.left = shouldAlignLeft
        ? `${left + width / 2}px`
        : `${left - (modalWidth - width / 2)}px`;
    }
    if (isDesktop) {
      modal.style.left = `${left - (modalWidth - width / 2)}px`;
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (isVisible && !modal.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [position, day, isVisible, onClose]);

  const formattedDate = formatDate(date, "d, MMMM");
  return (
    <div
      className={`${!isVisible && "hidden"} absolute -left-2 w-[280px] rounded-[10px] bg-white px-4 py-6 shadow-[0_4px_4px_0_rgba(64,123,255,0.3)] md:w-[292px]`}
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
