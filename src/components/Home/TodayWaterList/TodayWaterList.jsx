import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWaterToday } from "src/redux/water/selectors";
import sprite from "src/assets/images/sprite/sprite.svg";

import {
  AddWaterBtn,
  ButtonChange,
  ButtonDelete,
  IconGlass,
  TodayInfo,
  TodayItem,
  TodayList,
  TodayTime,
  TodayTitle,
  TodayTools,
  TodayVolume,
  TodayWrapper,
} from "./TodayWaterList.styled";
import { getTodayWater } from "src/redux/water/operations";
import { formatCustomTime } from "src/helpers/utils/dateUtils";

const icons = {
  glass: `${sprite}#icon-glass`,
  change: `${sprite}#icon-change`,
  delete: `${sprite}#icon-delete`,
  add: `${sprite}#icon-increment`,
};

export const TodayWaterList = ({
  onAddModalOpen,
  onEditModalOpen,
  onDeleteModalOpen,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodayWater());
  }, []);

  const dailyWaterList = useSelector(selectWaterToday);

  return (
    <TodayWrapper>
      <TodayTitle>Today</TodayTitle>
      <TodayList>
        {dailyWaterList?.map(record => (
          <TodayItem key={record._id}>
            <TodayInfo>
              <IconGlass>
                <use href={icons.glass}></use>
              </IconGlass>
              <TodayVolume>{record.amount} ml</TodayVolume>
              <TodayTime>{formatCustomTime(record.time)}</TodayTime>
            </TodayInfo>
            <TodayTools>
              <ButtonChange onClick={() => onEditModalOpen(record)}>
                <svg>
                  <use href={icons.change}></use>
                </svg>
              </ButtonChange>
              <ButtonDelete onClick={() => onDeleteModalOpen(record)}>
                <svg>
                  <use href={icons.delete}></use>
                </svg>
              </ButtonDelete>
            </TodayTools>
          </TodayItem>
        ))}
      </TodayList>
      <AddWaterBtn onClick={onAddModalOpen}>
        <svg>
          <use href={icons.add}></use>
        </svg>
        Add Water
      </AddWaterBtn>
    </TodayWrapper>
  );
};
