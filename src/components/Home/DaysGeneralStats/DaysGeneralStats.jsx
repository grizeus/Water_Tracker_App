import { useRef, useEffect } from 'react';
import { formatDate } from "src/helpers/utils/dateUtils";
import {
  DaysGeneralStatsModal,
  DaysGeneralStatsList,
  DaysGeneralStatsInfo,
  DaysGeneralStatsItem,
  DaysGeneralStatsData,
} from './DaysGeneralStats.styled';

export const DaysGeneralStats = ({ stats, position, onShow }) => {
  const { date, drinkCount, dailyGoal, waterVolumePercentage } = stats;
  const modalRef = useRef(null);
  const day = stats.date.split('-').pop();
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
      modal.style.width = `80%`;
      modal.style.left = '10%';
      modal.style.top = `${top - modal.offsetHeight - (58 + margin)}px`;
      modal.style.transform = `translateX(0)`;
    }
    if (isTablet) {

      if (
        (day <= 4) |
        (day >= 11 && day <= 14) |
        (day >= 21 && day <= 24) |
        (day === 31)
      ) {
        modal.style.left = `${left - modalWidth}px`;
      } else {
        modal.style.left = `${left - modalWidth * 1.75}px`;
      }

      modal.style.top = `${top - (1152 + margin)}px`;
    }
    if (isDesktop) {
      modal.style.transform = 'translateX(0)';
      modal.style.top = top - modal.offsetHeight - 20 + 'px';
      modal.style.left = left + width + 'px';
    }
  }, [position, day]);

  const formattedDate = date ? formatDate(date, 'd, MMMM') : '';
  return (
    <DaysGeneralStatsModal
      ref={modalRef}
      style={{ visibility: onShow ? 'visible' : 'hidden' }}
    >
      <DaysGeneralStatsList>
        <DaysGeneralStatsItem>
          <DaysGeneralStatsData>{formattedDate}</DaysGeneralStatsData>
        </DaysGeneralStatsItem>
        <DaysGeneralStatsItem>
          Daily norma:
          <DaysGeneralStatsInfo>
            {dailyGoal !== 0 ? dailyGoal : '2.0 L'}
          </DaysGeneralStatsInfo>
        </DaysGeneralStatsItem>
        <DaysGeneralStatsItem>
          Fulfillment of the daily norm:
          <DaysGeneralStatsInfo>{waterVolumePercentage}</DaysGeneralStatsInfo>
        </DaysGeneralStatsItem>
        <DaysGeneralStatsItem>
          How many servings of water:
          <DaysGeneralStatsInfo>{drinkCount}</DaysGeneralStatsInfo>
        </DaysGeneralStatsItem>
      </DaysGeneralStatsList>
    </DaysGeneralStatsModal>
  );
};
