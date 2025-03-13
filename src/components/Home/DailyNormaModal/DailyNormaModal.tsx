import { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { BaseModalWindow } from "../../common/BaseModalWindow/BaseModalWindow";
import { updateWaterNormaThunk } from "../../../redux/water/operations";
import { selectDailyGoal } from "../../../redux/water/selectors";
import { selectDaily } from "../../../redux/auth/selectors";
import { Gender, OpenerType } from "../../../../types/global";
import { AppDispatch } from "../../../redux/store";
import { safeParse } from "../../../helpers/utils/safeParse";

const DailyNormaModal = ({
  onClose,
  onShow,
}: {
  onClose: OpenerType;
  onShow: OpenerType;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectDailyNorm = useSelector(selectDailyGoal);
  const dailyGoal = useSelector(selectDaily);

  const [gender, setGender] = useState<Gender>("woman");
  const [weight, setWeight] = useState(0);
  const [timeOfActive, setTimeOfActive] = useState(0);
  const [dailyWaterNorm, setDailyWaterNorm] = useState("");
  const [intakeGoal, setIntakeGoal] = useState("");

  useEffect(() => {
    if (dailyGoal) {
      setIntakeGoal((dailyGoal / 1000).toFixed(1));
    }
  }, [dailyGoal]);

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

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const userGoal = parseFloat(intakeGoal);
    const dailyGoal = !isNaN(userGoal)
      ? userGoal * 1000
      : parseFloat(dailyWaterNorm) * 1000;

    await dispatch(updateWaterNormaThunk({ dailyGoal }));
    onClose();
  };

  return (
    <BaseModalWindow onClose={onClose} onShow={onShow} title="My daily norma">
      <div className="px-3 pb-6 md:w-[704px] md:px-6 md:pb-8 xl:w-[592px]">
        <div className="flex flex-col gap-4 pb-3 md:flex-row md:gap-6">
          <p className="text-base leading-5 text-charcoal">
            For woman:
            <span className="text-lg leading-6 text-royal">
              {" "}
              V=(M*0,03) + (T*0,4)
            </span>
          </p>
          <p className="text-base leading-5 text-charcoal">
            For man:
            <span className="text-lg leading-6 text-royal">
              {" "}
              V=(M*0,04) + (T*0,6)
            </span>
          </p>
        </div>

        <div className="mb-6 rounded-[10px] border border-hawkes p-2.5">
          <p className="text-xs text-neutral-400">
            <span className="text-royal">* </span>V is the volume of the water
            norm in liters per day, M is your body weight, T is the time of
            active sports, or another type of activity commensurate in terms of
            loads (in the absence of these, you must set 0)
          </p>
        </div>

        <div className="flex flex-col gap-6 text-charcoal">
          <h3 className="text-lg font-medium leading-5">
            Calculate your rate:
          </h3>
          <ul className="flex flex-col gap-4">
            <li>
              <ul className="flex gap-4">
                <li className="flex">
                  <label
                    onClick={() => setGender("woman")}
                    className="relative inline-block cursor-pointer pl-6">
                    <span className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-royal bg-white"></span>
                    <div>
                      <span
                        className={`absolute left-1 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-royal transition-opacity duration-200 ${
                          gender === "woman" ? "opacity-100" : "opacity-0"
                        }`}></span>
                    </div>
                    <span className="text-base leading-5">For woman</span>
                  </label>
                </li>
                <li className="flex">
                  <label
                    onClick={() => setGender("man")}
                    className="relative inline-block cursor-pointer pl-6">
                    <span className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-royal bg-white"></span>
                    <div>
                      <span
                        className={`absolute left-1 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-royal transition-opacity duration-200 ${
                          gender === "man" ? "opacity-100" : "opacity-0"
                        }`}></span>
                    </div>
                    <span className="text-base leading-5">For man</span>
                  </label>
                </li>
              </ul>
            </li>
            <li className="flex flex-col gap-2">
              <p className="text-base leading-5 text-charcoal">
                Your weight in kilograms:
              </p>
              <input
                className="w-full rounded-md border border-hawkes px-2.5 py-3 text-royal transition-colors duration-300 ease-in-out placeholder:text-perano hover:border-royal focus:border-royal focus:outline-none"
                name="weight"
                value={weight}
                onChange={e => setWeight(safeParse(e))}
                placeholder="0"
              />
            </li>

            <li className="flex flex-col gap-2">
              <p className="text-base leading-5 text-charcoal">
                The time of active participation in sports or other activities
                with a high physical load in hours:
              </p>
              <input
                className="w-full rounded-md border border-hawkes px-2.5 py-3 text-royal transition-colors duration-300 ease-in-out placeholder:text-perano hover:border-royal focus:border-royal focus:outline-none"
                name="timeOfActive"
                value={timeOfActive ?? 0}
                onChange={e => setTimeOfActive(safeParse(e))}
              />
            </li>

            <li className="flex items-center gap-1.5">
              <p className="w-[190px] text-base leading-5 md:w-auto">
                The required amount of water in liters per day:
              </p>
              <span className="text-lg font-bold leading-6 text-royal">
                {dailyWaterNorm
                  ? parseFloat(dailyWaterNorm).toFixed(1)
                  : (selectDailyNorm / 1000).toFixed(1)}{" "}
                L
              </span>
            </li>
          </ul>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium leading-5">
              Write down how much water you will drink:
            </h3>
            <input
              className="w-full rounded-md border border-hawkes px-2.5 py-3 text-royal transition-colors duration-300 ease-in-out placeholder:text-perano hover:border-royal focus:border-royal focus:outline-none"
              name="intakeGoal"
              value={intakeGoal}
              onChange={e => setIntakeGoal(e.target.value)}
            />
          </div>

          <button
            className="flex w-full items-center justify-center rounded-[10px] bg-royal px-[30px] py-2 text-base leading-5 text-white shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none md:w-40 md:self-end md:py-2.5 md:text-lg md:leading-6"
            type="submit"
            onClick={e => handleSubmit(e)}>
            Save
          </button>
        </div>
      </div>
    </BaseModalWindow>
  );
};

export default DailyNormaModal;
