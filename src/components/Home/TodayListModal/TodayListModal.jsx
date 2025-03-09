import { BaseModalWindow } from "components";
import { ContentLoader } from "src/components/index";
import { useDispatch, useSelector } from "react-redux";
import sprite from "src/assets/images/sprite/sprite.svg";
import { format } from "date-fns";
import { addWaterThunk, editWaterThunk } from "src/redux/water/operations";
import { formatCustomTime } from "src/helpers/utils/dateUtils.js";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchemaAddEntryData } from "../../../helpers/utils/validationSchema";
import styles from "./TodayListModal.module.css";
import { selectIsLoading } from "src/redux/root/selectors";

export const TodayListModal = ({
  initialAmount = 0,
  initialTime,
  isEditing = false,
  existingRecordId,
  onClose,
  onShow,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const title = isEditing ? "Edit the entered amount of water" : "Add water";
  const displayTime =
    isEditing && initialTime ? formatCustomTime(initialTime) : "";

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
            <div className={styles.todayTime}>
              {initialTime ? `${displayTime}` : ""}
            </div>
          </div>
        )}
        <Formik
          initialValues={{
            amount: initialAmount || 0,
            time:
              isEditing && initialTime
                ? format(new Date(initialTime), "HH:mm")
                : format(new Date(), "HH:mm"),
          }}
          validationSchema={validationSchemaAddEntryData}
          onSubmit={values => {
            let isoDate;
            if (isEditing) {
              isoDate = initialTime
                ? new Date(initialTime).toISOString().slice(0, 16)
                : new Date().toISOString();
            } else {
              const currentDate = new Date();
              const [hours, minutes] = values.time.split(":");
              currentDate.setHours(hours, minutes);
              isoDate = currentDate.toISOString().slice(0, 16);
            }

            const waterData = {
              time: isoDate,
              amount: values.amount,
            };

            if (isEditing) {
              dispatch(editWaterThunk({ id: existingRecordId, ...waterData }));
            } else {
              dispatch(addWaterThunk(waterData));
            }

            onClose();
          }}>
          {({ values, setFieldValue }) => (
            <Form>
              <h3 className={styles.thirdTitle}>
                {isEditing ? "Correct entered data:" : "Choose a value:"}
              </h3>
              <div className={styles.addWater}>
                <label className={styles.addParagraph}>Amount of water:</label>
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
                <Field className={styles.inputTime} type="time" name="time" />
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
