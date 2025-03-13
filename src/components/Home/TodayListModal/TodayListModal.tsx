import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { format, parseISO } from "date-fns";

import {
  formatTimeToLocalISO,
  convertTo24HourFormat,
  cleanTimeInput,
  formatTo12Hour,
} from "../../../helpers/utils/dateUtils";
import { validationSchemaAddEntryData } from "../../../helpers/utils/validationSchema";

import { addWaterThunk, editWaterThunk } from "../../../redux/water/operations";
import { selectIsLoading } from "../../../redux/root/selectors";

import { AppDispatch } from "../../../redux/store";
import { TodayListModalProps } from "../../../../types/components";
import { AddEntryData, EditWaterEntry } from "../../../../types/global";

import sprite from "src/assets/images/sprite/sprite.svg";
import styles from "./TodayListModal.module.css";

import { BaseModalWindow } from "../../common/BaseModalWindow/BaseModalWindow";
import { ContentLoader } from "../../common/Loader/Loader";

export const TodayListModal = ({
  initialAmount = 50,
  initialTime,
  isEditing = false,
  existingRecordId,
  onClose,
  onShow,
}: TodayListModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const title = isEditing ? "Edit the entered amount of water" : "Add water";
  const displayTime =
    isEditing && initialTime ? formatTo12Hour(initialTime) : "";
  const parsedInitialTime: Date | null =
    isEditing && initialTime ? parseISO(initialTime) : null;
  const [currentTime, setCurrentTime] = useState<string>(
    format(new Date(), "h:mm a")
  );

  useEffect(() => {
    if (!isEditing) {
      const interval = setInterval(() => {
        setCurrentTime(format(new Date(), "h:mm a"));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isEditing]);

  return (
    <BaseModalWindow onClose={onClose} onShow={onShow} title={title}>
      <div className={styles.boxAddModal}>
        {isEditing && (
          <div className={styles.previousInfo}>
            <svg className={styles.iconGlass}>
              <use href={`${sprite}#icon-glass`}></use>
            </svg>
            <div className={styles.todayVolume}>
              {initialAmount ? `${initialAmount} ml` : "No notes yet"}
            </div>
            <div className={styles.todayTime}>{displayTime || ""}</div>
          </div>
        )}
        <Formik
          enableReinitialize
          initialValues={{
            amount: initialAmount,
            time:
              isEditing && parsedInitialTime
                ? format(parsedInitialTime, "h:mm a")
                : currentTime,
          }}
          validationSchema={validationSchemaAddEntryData}
          onSubmit={(values, { setSubmitting }) => {
            const cleanedTime = cleanTimeInput(values.time);
            const formattedTime = convertTo24HourFormat(cleanedTime);
            const isoDate = formatTimeToLocalISO(
              formattedTime,
              initialTime || "",
              isEditing
            );
            const waterData: AddEntryData = {
              time: isoDate,
              amount: values.amount,
            };
            if (isEditing && existingRecordId) {
              const editData: EditWaterEntry = {
                id: existingRecordId,
                time: isoDate,
                amount: values.amount,
              };
              dispatch(editWaterThunk(editData));
            } else {
              dispatch(addWaterThunk(waterData));
            }
            setSubmitting(false);
            onClose();
          }}>
          {({ values, setFieldValue }) => (
            <Form>
              <h3 className={styles.thirdTitle}>
                {isEditing ? "Correct entered data:" : "Choose a value:"}
              </h3>
              <div className={styles.addWater}>
                <label className={styles.addParagraph}>
                  Amount of water (ml):
                </label>
                <div>
                  <button
                    type="button"
                    className={styles.buttonMl}
                    onClick={() =>
                      setFieldValue("amount", Math.max(50, values.amount - 50))
                    }>
                    <svg className={styles.icon}>
                      <use href={`${sprite}#icon-decrement-outline`}></use>
                    </svg>
                  </button>
                  <div className={styles.label}>
                    <Field
                      className={styles.input}
                      type="number"
                      name="amount"
                    />
                    <ErrorMessage
                      className={styles.error}
                      name="amount"
                      component="div"
                    />
                  </div>
                  <button
                    type="button"
                    className={styles.buttonMl}
                    onClick={() => setFieldValue("amount", values.amount + 50)}>
                    <svg className={styles.icon}>
                      <use href={`${sprite}#icon-increment`}></use>
                    </svg>
                  </button>
                </div>
              </div>
              <div className={styles.addTime}>
                <label className={styles.addParagraph}>Recording time:</label>
                <Field
                  className={styles.inputTime}
                  type="text"
                  name="time"
                  value={cleanTimeInput(values.time)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("time", e.target.value);
                  }}
                  onBlur={() => {
                    setFieldValue("time", formatTo12Hour(values.time));
                  }}
                />
                <ErrorMessage
                  className={styles.error}
                  name="time"
                  component="div"
                />
              </div>
              <div className={styles.footerModal}>
                <span>{values.amount}ml</span>
                <button type="submit" className={styles.addButtonSave}>
                  Save {isLoading && <ContentLoader />}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </BaseModalWindow>
  );
};
