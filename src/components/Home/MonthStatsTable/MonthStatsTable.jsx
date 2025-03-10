import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMonthWater } from "src/redux/water/operations";
import { selectMonthData } from "src/redux/water/selectors";
import {
  format,
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";
import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats";
import {
  ButtonPaginator,
  DaysButton,
  DaysList,
  DaysPercentage,
  HeaderMonth,
  Paginator,
} from "./MonthStatsTable.styled";
export const MonthStatsTable = () => {
  const dispatch = useDispatch();
  const monthData = useSelector(selectMonthData);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [activeButton, setActiveButton] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [dayPosition, setDayPosition] = useState({ top: 0, left: 0, width: 0 });
  const [selectedDayStats, setSelectedDayStats] = useState(null);
  const dayRefs = useRef({});
  const containerRef = useRef(null);
  const month = format(selectedMonth, "yyyy-MM");
  useEffect(() => {
    dispatch(getMonthWater(month));
  }, [dispatch, month]);
  const handlePreviousMonth = () => {
    const newMonth = subMonths(selectedMonth, 1);
    setSelectedMonth(newMonth);
    setActiveButton(isSameMonth(newMonth, new Date()) ? null : "prev");
  };
  const handleNextMonth = () => {
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
  const monthDataMap = monthData.reduce((acc, dayData) => {
    acc[dayData.date] = dayData;
    return acc;
  }, {});
  const onDayClick = day => {
    const dayKey = format(day, "yyyy-MM-dd");
    const dayData = monthDataMap[dayKey];
    const isSameDaySelected = selectedDayStats?.date === dayKey;
    if (isSameDaySelected && isModalVisible) {
      setModalVisible(false);
      setSelectedDayStats(null);
    } else {
      setSelectedDayStats({
        date: dayKey,
        dailyGoal: dayData ? dayData.dailyGoal : 0,
        drinkCount: dayData ? dayData.entriesCount : 0,
        waterVolumePercentage: dayData ? dayData.percentage : 0,
      });
      setModalVisible(true);
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
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedDayStats(null);
  };
  useEffect(() => {
    const handleClickOutside = event => {
      if (isModalVisible) {
        const isClickOutside = Object.values(dayRefs.current).every(
          ref => ref && !ref.contains(event.target)
        );
        if (isClickOutside) {
          handleCloseModal();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalVisible, selectedDayStats]);
  return (
    <div ref={containerRef}>
      <HeaderMonth>
        <h2>Month</h2>
        <Paginator>
          <ButtonPaginator
            onClick={handlePreviousMonth}
            active={activeButton === "next"}>
            &lt;
          </ButtonPaginator>
          <span>{format(selectedMonth, "MMMM, yyyy")}</span>
          <ButtonPaginator
            onClick={handleNextMonth}
            disabled={selectedMonth >= new Date()}
            active={activeButton === "prev"}>
            &gt;
          </ButtonPaginator>
        </Paginator>
      </HeaderMonth>
      <DaysList>
        {daysOfMonth.map(day => {
          const dayKey = format(day, "yyyy-MM-dd");
          const dayData = monthDataMap[dayKey];
          const percentage = dayData ? parseInt(dayData.percentage) : 0;
          const isHighlighted = dayData && percentage < 100;
          const isFullfiled = dayData && percentage === 100;
          return (
            <div key={dayKey}>
              <DaysPercentage>
                <DaysButton
                  ref={el => (dayRefs.current[dayKey] = el)}
                  onClick={() => onDayClick(day)}
                  isHighlighted={isHighlighted}
                  isFullfiled={isFullfiled}>
                  {format(day, "d")}
                </DaysButton>
                <span>{percentage}%</span>
              </DaysPercentage>
            </div>
          );
        })}
        {isModalVisible && selectedDayStats && (
          <DaysGeneralStats
            stats={selectedDayStats}
            position={dayPosition}
            onClose={handleCloseModal}
            isVisible={isModalVisible}
          />
        )}
      </DaysList>
    </div>
  );
};
