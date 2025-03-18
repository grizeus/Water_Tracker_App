import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { toast } from "react-toastify";

import { BaseModalWindow } from "../../common/BaseModalWindow/BaseModalWindow";
import { ContentLoader } from "../../common/Loader/Loader";
import { addWaterThunk, editWaterThunk } from "../../../redux/water/operations";
import { selectIsLoading } from "../../../redux/root/selectors";

import {
  AddTime,
  AddWater,
  ButtonMl,
  Icon,
  InputTime,
  Water,
  Label,
  PreviousInfo,
} from "./TodayListModal.styled";
import { formatCustomTime } from "../../../helpers/utils/dateUtils";

import sprite from "src/assets/images/sprite/sprite.svg";
import { safeParse } from "../../../helpers/utils/safeParse";
import { OpenerType } from "../../../../types/global";
import { OpenerTypeWithData } from "../../../../types/components";
import { AppDispatch } from "../../../redux/store";

interface TodayListModalProps {
  initialAmount: number | null | undefined;
  initialTime?: string;
  isEditing?: boolean;
  existingRecordId?: string;
  onClose: OpenerType;
  onShow: OpenerType | OpenerTypeWithData;
}

export const TodayListModal = ({
  initialAmount = 0,
  initialTime,
  isEditing = false,
  existingRecordId,
  onClose,
  onShow,
}: TodayListModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const [amount, setAmount] = useState(initialAmount);
  const [time, setTime] = useState(
    isEditing && initialTime
      ? format(new Date(initialTime), "HH:mm")
      : format(new Date(), "HH:mm")
  );

  const increaseAmount = () => {
    setAmount(prevAmount => (prevAmount ? prevAmount + 50 : 50));
  };
  const decreaseAmount = () =>
    setAmount(prevAmount =>
      prevAmount ? (prevAmount > 100 ? prevAmount - 50 : 50) : 50
    );

  useEffect(() => {
    if (isEditing && initialTime) {
      setAmount(initialAmount || 0);
      setTime(formatCustomTime(initialTime, "HH:mm"));
    } else {
      setAmount(0);
      setTime(format(new Date(), "HH:mm"));
    }
  }, [isEditing, initialAmount, initialTime]);

  useEffect(() => {
    let interval: number;

    if (!isEditing) {
      interval = setInterval(() => {
        setTime(format(new Date(), "HH:mm"));
      }, 2000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isEditing]);

  const handleSubmit = () => {
    let isoDate;

    if (amount < 50) {
      toast.error("The amount of water must be at least 50 ml");
      return;
    }

    if (!time || !/^([0-9]{2}):([0-9]{2})$/.test(time)) {
      toast.error("Please enter a valid time in the format HH:mm");
      return;
    }

    if (isEditing) {
      isoDate = initialTime
        ? new Date(initialTime).toISOString().slice(0, 16)
        : new Date().toISOString();
    } else if (time) {
      const currentDate = new Date();
      const [hours, minutes] = time.split(":");
      currentDate.setHours(hours, minutes);
      isoDate = currentDate.toISOString().slice(0, 16);

      const currentDate2 = new Date(isoDate);
      const newDate = new Date(currentDate2);
      newDate.setHours(currentDate2.getHours() + 2);

      isoDate =
        newDate.getFullYear() +
        "-" +
        ("0" + (newDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + newDate.getDate()).slice(-2) +
        "T" +
        ("0" + newDate.getHours()).slice(-2) +
        ":" +
        ("0" + newDate.getMinutes()).slice(-2);
    }

    const waterData = {
      time: isoDate,
      amount,
    };

    if (isEditing && existingRecordId) {
      dispatch(editWaterThunk({ id: existingRecordId, ...waterData }));
    } else {
      dispatch(addWaterThunk(waterData));
    }

    onClose();
  };

  const handleOnClose = () => {
    if (isEditing) {
      onClose();
      return;
    }
    onClose();
    setAmount(0);
  };

  const title = isEditing ? "Edit the entered amount of water" : "Add water";

  const displayTime =
    isEditing && initialTime ? formatCustomTime(initialTime) : "";

  return (
    <BaseModalWindow onClose={handleOnClose} onShow={onShow} title={title}>
      <div className="flex flex-col gap-6 px-3 pb-6 md:w-[704px] md:px-6 md:pb-8 xl:w-[592px]">
        {isEditing && (
          <PreviousInfo>
            <svg className="size-[26px] md:size-9">
              <use href={`${sprite}#icon-glass`}></use>
            </svg>
            <span className="text-lg leading-6 text-royal">
              {initialAmount ? `${initialAmount} ml` : "No notes yet"}
            </span>
            <span className="text-xs leading-loose text-charcoal">
              {initialTime ? `${displayTime}` : ""}
            </span>
          </PreviousInfo>
        )}
        <h3 className="mb-4 text-lg font-medium leading-5 text-charcoal">
          {isEditing ? "Correct entered data:" : "Choose a value:"}
        </h3>
        <AddWater>
          <p className="mb-3 text-base leading-6 text-charcoal">
            Amount of water:
          </p>
          <div>
            <ButtonMl onClick={decreaseAmount}>
              <Icon>
                <use href={`${sprite}#icon-decrement-outline`}></use>
              </Icon>
            </ButtonMl>
            <Label>
              <Water>{amount} ml</Water>
            </Label>
            <ButtonMl onClick={increaseAmount}>
              <Icon>
                <use href={`${sprite}#icon-increment`}></use>
              </Icon>
            </ButtonMl>
          </div>
        </AddWater>
        <AddTime>
          <p className="mb-3 text-base leading-6 text-charcoal">
            Recording time:
          </p>
          <InputTime
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            step="300"
          />
        </AddTime>
        <div className="flex flex-col gap-4">
          <span className="text-lg font-medium leading-5 text-charcoal">
            Enter the value of the water used:
          </span>
          <input
            className="w-full rounded-md border border-hawkes px-2.5 py-3 text-royal transition-colors duration-300 ease-in-out placeholder:text-perano hover:border-royal focus:border-royal focus:outline-none"
            value={amount}
            onChange={e => setAmount(safeParse(e))}
            onBlur={() =>
              setAmount(prevAmount => prevAmount || initialAmount || 0)
            }
          />
        </div>
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-end md:gap-6">
          <span className="text-lg font-bold leading-6 text-royal">
            {amount}ml
          </span>
          <button
            className="flex w-full items-center justify-center rounded-[10px] bg-royal px-[30px] py-2 text-base leading-5 text-white shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none md:w-40 md:self-end md:py-2.5 md:text-lg md:leading-6"
            onClick={handleSubmit}>
            Save {isLoading && <ContentLoader />}
          </button>
        </div>
      </div>
    </BaseModalWindow>
  );
};
