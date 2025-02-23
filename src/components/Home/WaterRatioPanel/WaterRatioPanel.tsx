import { useSelector } from "react-redux";
import { selectProgress } from "../../../redux/water/selectors";
import sprite from "src/assets/images/sprite/sprite.svg";

import {
  AddWaterButton,
  LeftMark,
  Mark,
  RightMark,
  WaterRange,
  WaterRangeContainer,
} from "./WaterRatioPanel.styled";
import { OpenerType } from "../../components";

export const WaterRatioPanel = ({
  onModalOpen,
}: {
  onModalOpen: OpenerType;
}) => {
  const percentage = useSelector(selectProgress);
  const roundedWaterVolumePercentage = parseInt(percentage);

  const getMarkPosition = () => {
    const limitedPercentage = Math.min(
      100,
      Math.max(0, roundedWaterVolumePercentage)
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
    <div className="flex w-[280px] flex-col justify-center gap-2 md:w-[704px] md:flex-row md:items-center md:gap-6 xl:w-[594px] xl:gap-8">
      <WaterRangeContainer>
        <h4 className="text-royal mb-2 text-lg font-normal leading-6 md:mb-4">
          Today
        </h4>
        <WaterRange
          type="range"
          maxValue={100}
          minValue={0}
          value={roundedWaterVolumePercentage}
          readOnly={true}
          style={getBackgroundSize()}
          aria-label="Water range"
        />
        <div className="flex h-8 flex-row justify-between">
          <LeftMark>0%</LeftMark>
          {showMarkLabel && (
            <Mark
              id="waterMark"
              style={getMarkPosition()}>{`${roundedWaterVolumePercentage}%`}</Mark>
          )}
          <RightMark>100%</RightMark>
        </div>
      </WaterRangeContainer>
      <AddWaterButton onClick={onModalOpen}>
        <svg className="h-6 w-6 fill-transparent stroke-white">
          <use href={`${sprite}#icon-increment-outline`}></use>
        </svg>
        Add Water
      </AddWaterButton>
    </div>
  );
};
