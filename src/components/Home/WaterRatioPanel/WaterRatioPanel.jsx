import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWaterVolumePercentage } from "src/redux/water/selectors";
import sprite from 'src/assets/images/sprite/sprite.svg';
import { TodayListModal } from 'components';

import {
  AddIcon,
  AddWaterButton,
  LeftMark,
  Mark,
  MarksContainer,
  RightMark,
  WaterRange,
  WaterRangeContainer,
  WaterRangeHeader,
  WaterRatioPanelContainer,
} from './WaterRatioPanel.styled';

export const WaterRatioPanel = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const percentage = useSelector(selectWaterVolumePercentage);
  const roundedWaterVolumePercentage = parseInt(percentage);

  const getMarkPosition = () => {
    const limitedPercentage = Math.min(
      100,
      Math.max(0, roundedWaterVolumePercentage),
    );
    if (limitedPercentage < 50) {
      return {
        left: `calc(${limitedPercentage}%)`,
      };
    } else if (limitedPercentage > 50 && limitedPercentage <= 75) {
      return {
        left: `calc(${limitedPercentage}% - 2px)`,
      };
    } else if (limitedPercentage > 75 && limitedPercentage < 85) {
      return {
        left: `calc(${limitedPercentage}% - 4px)`,
      };
    } else {
      return {
        left: `calc(${limitedPercentage}% - 5px)`,
      };
    }
  };

  const getBackgroundSize = () => {
    return {
      backgroundSize: `${roundedWaterVolumePercentage}%`,
    };
  };

  const showMarkLabel =
    roundedWaterVolumePercentage > 0 && roundedWaterVolumePercentage < 100;

  return (
    <WaterRatioPanelContainer>
      <WaterRangeContainer>
        <WaterRangeHeader>Today</WaterRangeHeader>
        <WaterRange
          type="range"
          maxValue={100}
          minValue={0}
          value={roundedWaterVolumePercentage}
          readOnly={true}
          style={getBackgroundSize()}
          aria-label="Water range"
        />
        <MarksContainer>
          <LeftMark>0%</LeftMark>
          {showMarkLabel && (
            <Mark
              id="waterMark"
              style={getMarkPosition()}
            >{`${roundedWaterVolumePercentage}%`}</Mark>
          )}
          <RightMark>100%</RightMark>
        </MarksContainer>
      </WaterRangeContainer>
      <AddWaterButton onClick={() => setModalOpen(true)}>
        <AddIcon>
          <use href={`${sprite}#icon-increment-outline`}></use>
        </AddIcon>
        Add Water
      </AddWaterButton>
      <TodayListModal
        onClose={() => setModalOpen(false)}
        onShow={isModalOpen}
      />
    </WaterRatioPanelContainer>
  );
};
