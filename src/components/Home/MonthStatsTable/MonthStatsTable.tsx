import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  format,
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";

import { getMonthWater } from "../../../redux/water/operations";
import { selectMonthData } from "../../../redux/water/selectors";
import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats";

import { AppDispatch } from "../../../redux/store";
import { MonthData } from "../../../../types/global";


// NOTE: lieve this interfaces here for now
interface Position {
  top: number;
  left: number;
  width: number;
}

interface DayStats {
  date: string;
  drinkCount: number;
  dailyGoal: number | string;
  waterVolumePercentage: number | string;
}

type ActiveBtn = "prev" | "next" | null;

export const MonthStatsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const monthData: MonthData[] = useSelector(selectMonthData);

  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [lastSelectedDay, setLastSelectedDay] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState<ActiveBtn>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [dayPosition, setDayPosition] = useState<Position>({
    top: 0,
    left: 0,
    width: 0,
  });
  const [selectedDayStats, setSelectedDayStats] = useState<DayStats | null>(
    null
  );

  const dayRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const month = format(selectedMonth, "yyyy-MM");

  useEffect(() => {
    void dispatch(getMonthWater(month));
  }, [dispatch, month]);

  const handlePreviousMonth = (): void => {
    const newMonth = subMonths(selectedMonth, 1);
    setSelectedMonth(newMonth);
    setActiveButton(isSameMonth(newMonth, new Date()) ? null : "prev");
  };

  const handleNextMonth = (): void => {
    if (selectedMonth < new Date()) {
      const newMonth = addMonths(selectedMonth, 1);
      setSelectedMonth(newMonth);
      setActiveButton(isSameMonth(newMonth, new Date()) ? null : "next");
    }
  };

  const daysOfMonth = eachDayOfInterval({
    start: startOfMonth(selectedMonth),
    end: endOfMonth(selectedMonth),
  });

  const monthDataMap: Record<string, MonthData> = monthData.reduce(
    (acc: Record<string, MonthData>, dayData: MonthData) => {
      acc[dayData.date] = dayData;
      return acc;
    },
    {}
  );

  const onDayClick = (day: Date): void => {
    const dayKey = format(day, "yyyy-MM-dd");
    const dayData = monthDataMap[dayKey];

    if (dayKey === lastSelectedDay) {
      setModalVisible(!isModalVisible);
      setLastSelectedDay(null);
    } else {
      setSelectedDayStats({
        date: dayKey,
        dailyGoal: dayData ? dayData.dailyGoal : 0,
        drinkCount: dayData ? dayData.entriesCount : 0,
        waterVolumePercentage: dayData ? dayData.percentage : 0,
      });
      setModalVisible(true);
      setLastSelectedDay(dayKey);

      const dayElement = dayRefs.current[dayKey];
      const containerElement = containerRef.current;

      if (dayElement && containerElement) {
        const dayRect = dayElement.getBoundingClientRect();
        const containerRect = containerElement.getBoundingClientRect();
        setDayPosition({
          top: dayRect.top - containerRect.top,
          left: dayRect.left - containerRect.left,
          width: dayRect.width,
        });
      }
    }
  };

  const handleCloseModal = (): void => {
    setModalVisible(false);
    setSelectedDayStats(null);
  };

  return (
    <div ref={containerRef}>
      <div className="mb-4 flex items-center justify-between md:mb-6">
        <h3 className="text-2xl font-medium leading-tight text-charcoal md:text-[26px] md:leading-8">
          Month
        </h3>
        <div className="flex items-baseline gap-3 text-base leading-5 text-royal">
          <button
            className={`${activeButton === "prev" ? "text-royal" : "text-perano"} size-3.5 bg-transparent transition-colors duration-300 ease-in-out hover:text-sunshade`}
            onClick={handlePreviousMonth}>
            &lt;
          </button>
          <span>{format(selectedMonth, "MMMM, yyyy")}</span>
          <button
            className={`${activeButton === "next" ? "text-royal" : "text-perano"} size-3.5 bg-transparent transition-colors duration-300 ease-in-out hover:text-sunshade`}
            onClick={handleNextMonth}
            disabled={selectedMonth >= new Date()}>
            &gt;
          </button>
        </div>
      </div>
      <ul className="relative grid grid-cols-5 grid-rows-6 justify-between gap-4 md:grid-cols-10 md:grid-rows-4 md:gap-5">
        {daysOfMonth.map((day: Date) => {
          const dayKey = format(day, "yyyy-MM-dd");
          const dayData = monthDataMap[dayKey];
          const percentage = dayData ? parseInt(dayData.percentage) : 0;
          const isHighlighted = dayData && percentage < 100;
          const isFullfiled = dayData && percentage === 100;

          return (
            <li key={dayKey} className="flex flex-col items-center gap-1">
              <button
                className={`${isHighlighted && "border-sunshade"} ${isFullfiled && "border-royal"} flex size-[34px] items-center justify-center rounded-full border bg-white text-[14px] leading-[18px] text-charcoal md:text-base md:leading-tight`}
                ref={el => (dayRefs.current[dayKey] = el)}
                onClick={() => onDayClick(day)}>
                {format(day, "d")}
              </button>
              <span className="text-[10px] leading-4 text-perano md:text-xs md:leading-5 xl:leading-normal">
                {percentage}%
              </span>
            </li>
          );
        })}
        {isModalVisible && selectedDayStats && lastSelectedDay && (
          <DaysGeneralStats
            stats={selectedDayStats}
            position={dayPosition}
            onClose={handleCloseModal}
            isVisible={isModalVisible}
          />
        )}
      </ul>
    </div>
  );
};
