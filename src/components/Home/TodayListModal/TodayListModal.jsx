import { BaseModalWindow } from "components";
import { ContentLoader } from "src/components/index";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import sprite from "src/assets/images/sprite/sprite.svg";
import { format } from "date-fns";
import { addWaterThunk, editWaterThunk } from "src/redux/water/operations";
import {
  IconGlass,
  TodayTime,
  TodayVolume,
} from "../TodayWaterList/TodayWaterList.styled";
import {
  AddButtonSave,
  AddParagraph,
  AddTime,
  AddWater,
  BoxAddModal,
  ButtonMl,
  FooterModal,
  Icon,
  Input,
  InputTime,
  Water,
  Label,
  PreviousInfo,
} from "./TodayListModal.styled";
import { formatCustomTime } from "src/helpers/utils/dateUtils.js";
import { toast } from "react-toastify";

import { selectIsLoading } from "src/redux/root/selectors";

export const TodayListModal = ({
  initialAmount,
  initialTime,
  isEditing,
  existingRecordId,
  onClose,
  onShow,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [amount, setAmount] = useState(initialAmount !== undefined || 0);
  const [time, setTime] = useState(
    isEditing && initialTime
      ? format(new Date(initialTime), "HH:mm")
      : format(new Date(), "HH:mm")
  );

  const increaseAmount = () => {
    setAmount(prevAmount => prevAmount + 50);
  };
  const decreaseAmount = () =>
    setAmount(prevAmount => (prevAmount > 100 ? prevAmount - 50 : 50));

  const handleAmountChange = e => {
    let newValue = e.target.value;

    if (newValue.startsWith("0") && newValue.length > 1) {
      newValue = parseFloat(newValue.substring(1));
    }

    setAmount(parseFloat(newValue));
  };

  useEffect(() => {
    if (isEditing) {
      setAmount(initialAmount || 0);
      setTime(formatCustomTime(initialTime, "HH:mm"));
    } else {
      setAmount(0);
      setTime(format(new Date(), "HH:mm"));
    }
  }, [isEditing, initialAmount, initialTime]);

  useEffect(() => {
    let interval;

    if (onShow && !isEditing) {
      interval = setInterval(() => {
        setTime(format(new Date(), "HH:mm"));
      }, 2000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [onShow, isEditing]);

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

    if (isEditing) {
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
      <BoxAddModal>
        {isEditing && (
          <PreviousInfo>
            <IconGlass>
              <use href={`${sprite}#icon-glass`}></use>
            </IconGlass>
            <TodayVolume>
              {initialAmount ? `${initialAmount} ml` : "No notes yet"}
            </TodayVolume>
            <TodayTime>{initialTime ? `${displayTime}` : ""}</TodayTime>
          </PreviousInfo>
        )}
        <h3>{isEditing ? "Correct entered data:" : "Choose a value:"}</h3>
        <AddWater>
          <AddParagraph>Amount of water:</AddParagraph>
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
          <AddParagraph>Recording time:</AddParagraph>
          <InputTime
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            step="300"
          />
        </AddTime>
        <div>
          <h3>Enter the value of the water used:</h3>
          <Input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            onBlur={() =>
              setAmount(prevAmount => prevAmount || initialAmount || 0)
            }
          />
        </div>
        <FooterModal>
          <span>{amount}ml</span>
          <AddButtonSave onClick={handleSubmit}>
            Save {isLoading && <ContentLoader />}
          </AddButtonSave>
        </FooterModal>
      </BoxAddModal>
    </BaseModalWindow>
  );
};
