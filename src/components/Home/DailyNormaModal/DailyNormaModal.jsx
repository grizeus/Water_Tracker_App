import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  ButtonSave,
  CalculateWater,
  Container,
  Description,
  Form,
  FormRadio,
  FormSubTitle,
  Formula,
  Input,
  InputRadio,
  Paragraph,
  Result,
} from "./DailyNormaModal.styled";

import { BaseModalWindow } from "src/components/index";
import { updateWaterNormaThunk } from "src/redux/water/operations";
import { selectDailyGoal } from "src/redux/water/selectors";
import { selectDaily } from "src/redux/auth/selectors";
import { Field } from "formik";

export const DailyNormaModal = ({ onClose, onShow }) => {
  const selectDailyNorm = useSelector(selectDailyGoal); // Отримуємо щоденну норму води
  const dispatch = useDispatch();
  const dailyGoal = useSelector(selectDaily);

  const [gender, setGender] = useState("woman");
  const [weight, setWeight] = useState(0);
  const [timeOfActive, setTimeOfActive] = useState(0);
  const [dailyWaterNorm, setDailyWaterNorm] = useState("");
  const [intakeGoal, setIntakeGoal] = useState(""); // Початково порожнє значення

  // Використовуємо useEffect для встановлення поточного значення денної норми при відкритті модалки
  useEffect(() => {
    if (dailyGoal) {
      setIntakeGoal((dailyGoal / 1000).toFixed(1)); // Перетворюємо з мілілітрів у літри
    }
  }, [dailyGoal]);

  // Використовуємо useEffect для автоматичного розрахунку добової норми води
  useEffect(() => {
    if (timeOfActive < 0) {
      toast.error("Please enter a valid data");
      return;
    }

    const usedWeight = weight > 0 ? weight : gender === "woman" ? 60 : 70;
    const userGender = gender === "woman" ? 0.03 : 0.04;
    const activityTime = gender === "woman" ? 0.4 : 0.6;

    const intake = usedWeight * userGender + timeOfActive * activityTime;
    setDailyWaterNorm(intake.toFixed(2));
  }, [timeOfActive, gender, weight]);

  // Функція відправки запиту
  const handleSubmit = async e => {
    e.preventDefault();

    const userGoal = parseFloat(intakeGoal);
    const dailyGoal = !isNaN(userGoal)
      ? userGoal * 1000
      : dailyWaterNorm * 1000; // Конвертація в мілілітри

    try {
      dispatch(updateWaterNormaThunk({ dailyGoal }));
      onClose();
    } catch (error) {
      toast.error("Failed to update water norm");
    }
  };

  return (
    <BaseModalWindow onClose={onClose} onShow={onShow} title="My daily norma">
      <Container>
        <Formula>
          <Paragraph>
            For woman:<span> V=(M*0,03) + (T*0,4)</span>
          </Paragraph>
          <Paragraph>
            For man:<span> V=(M*0,04) + (T*0,6)</span>
          </Paragraph>
        </Formula>

        <Description>
          <p>
            <span>*</span>V is the volume of the water norm in liters per day, M
            is your body weight, T is the time of active sports, or another type
            of activity commensurate in terms of loads (in the absence of these,
            you must set 0)
          </p>
        </Description>

        <Form>
          <div className="flex gap-6">
            <div className="flex">
              <Field
                className="absolute opacity-0"
                type="radio"
                name="gender"
                value="woman"
                id="gender-woman"
              />
              <label
                htmlFor="gender-woman"
                className="relative inline-block cursor-pointer pl-6">
                <span className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-royal bg-white"></span>
                <Field name="gender">
                  <span
                    onClick={setGender("woman")}
                    className={`absolute left-1 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-royal transition-opacity duration-200 ${
                      gender === "woman" ? "opacity-100" : "opacity-0"
                    }`}></span>
                </Field>
                <span className="text-base leading-5">Woman</span>
              </label>
            </div>
            <div className="flex">
              <Field
                className="absolute opacity-0"
                type="radio"
                name="gender"
                value="man"
                id="gender-man"
              />
              <label
                htmlFor="gender-man"
                className="relative inline-block cursor-pointer pl-6">
                <span className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-royal bg-white"></span>
                <Field name="gender">
                  <span
                    onClick={setGender("woman")}
                    className={`absolute left-1 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-royal transition-opacity duration-200 ${
                      gender === "man" ? "opacity-100" : "opacity-0"
                    }`}></span>
                </Field>
                <span className="text-base leading-5">Man</span>
              </label>
            </div>
          </div>
          <FormRadio>
            <FormSubTitle>Calculate your rate:</FormSubTitle>
            <label>
              <InputRadio
                type="radio"
                name="gender"
                value="woman"
                checked={gender === "woman"}
                onChange={() => setGender("woman")}
              />
              <span>For woman</span>
            </label>
            <label>
              <InputRadio
                type="radio"
                name="gender"
                value="man"
                checked={gender === "man"}
                onChange={() => setGender("man")}
              />
              <span>For man</span>
            </label>
          </FormRadio>

          <div>
            <Paragraph>Your weight in kilograms:</Paragraph>
            <Input
              type="number"
              name="weight"
              value={weight}
              onChange={e => setWeight(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder="0"
            />
          </div>

          <div>
            <Paragraph>
              The time of active participation in sports or other activities
              with a high physical load in hours:
            </Paragraph>
            <Input
              type="number"
              name="timeOfActive"
              value={timeOfActive}
              onChange={e =>
                setTimeOfActive(e.target.value.replace(/[^0-9.]/g, ""))
              }
            />
          </div>

          <CalculateWater>
            <Result>Recommended amount of water in liters per day:</Result>
            <span>
              {dailyWaterNorm
                ? parseFloat(dailyWaterNorm).toFixed(1)
                : (selectDailyNorm / 1000).toFixed(1)}{" "}
              L
            </span>
          </CalculateWater>

          <div>
            <FormSubTitle>
              Write down how much water you will drink:
            </FormSubTitle>
            <Input
              type="number"
              name="intakeGoal"
              value={intakeGoal}
              onChange={e => setIntakeGoal(e.target.value)}
            />
          </div>

          <ButtonSave type="submit" onClick={handleSubmit}>
            Save
          </ButtonSave>
        </Form>
      </Container>
    </BaseModalWindow>
  );
};
