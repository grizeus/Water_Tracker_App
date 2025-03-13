import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectWaterToday } from "../../../redux/water/selectors";
import { getTodayWater } from "../../../redux/water/operations";
import { formatCustomTime } from "../../../helpers/utils/dateUtils";
import { OpenerType } from "../../../../types/global";
import { OpenerTypeWithData } from "../../../../types/components";
import { AppDispatch } from "../../../redux/store";
import sprite from "src/assets/images/sprite/sprite.svg";

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
}: {
  onAddModalOpen: OpenerType;
  onEditModalOpen: OpenerTypeWithData;
  onDeleteModalOpen: OpenerTypeWithData;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    void dispatch(getTodayWater());
  }, []);

  const dailyWaterList = useSelector(selectWaterToday);

  return (
    <div className="mb-6">
      <h1 className="mb-2 text-2xl font-medium leading-tight text-charcoal md:mb-4 md:text-[26px] md:leading-8">
        Today
      </h1>
      <ul className="h-[224px] overflow-auto md:h-[168px]">
        {dailyWaterList &&
          Array.isArray(dailyWaterList) &&
          dailyWaterList?.map(record => (
            <li
              className="flex items-center justify-between border-b border-b-hawkes py-3"
              key={record._id}>
              <div className="flex items-center gap-x-4">
                <svg className="size-[26px] md:size-9">
                  <use href={icons.glass}></use>
                </svg>
                <span className="text-lg leading-6 text-royal">
                  {record.amount} ml
                </span>
                <span className="text-xs leading-loose text-charcoal">
                  {formatCustomTime(record.time)}
                </span>
              </div>
              <div className="flex gap-[18px]">
                <button
                  className="size-5 flex justify-center hover:border-b hover:border-b-perano"
                  onClick={() => onEditModalOpen(record)}>
                  <svg className="size-4 fill-transparent stroke-perano">
                    <use href={icons.change}></use>
                  </svg>
                </button>
                <button
                  className="flex size-5 justify-center hover:border-b hover:border-b-sunset"
                  onClick={() => onDeleteModalOpen(record)}>
                  <svg className="size-4 fill-transparent stroke-sunset">
                    <use href={icons.delete}></use>
                  </svg>
                </button>
              </div>
            </li>
          ))}
      </ul>
      <button
        className="group mt-3 flex items-center gap-2 text-base font-medium leading-tight text-royal transition-colors duration-300 ease-in-out hover:text-sunshade focus:text-sunshade md:text-lg md:leading-6"
        type="button"
        onClick={onAddModalOpen}>
        <svg className="size-6 fill-royal stroke-1 transition-colors duration-300 ease-in-out group-hover:fill-sunshade group-focus:fill-sunshade">
          <use href={icons.add}></use>
        </svg>
        Add Water
      </button>
    </div>
  );
};
