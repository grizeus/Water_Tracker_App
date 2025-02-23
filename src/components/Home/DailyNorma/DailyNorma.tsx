import { useSelector } from "react-redux";
import { selectDailyGoal } from "../../../redux/water/selectors";
import { OpenerType } from "../../components";

export const DailyNorma = ({onModalOpen}: {onModalOpen: OpenerType}) => {
  const dailyGoal = useSelector(selectDailyGoal);
  const dailyNorma = (dailyGoal / 1000).toFixed(1);

  return (
    <div className="border-solitude mb-[232px] flex w-[164px] flex-col gap-3 rounded-lg border p-2 px-4 shadow-[0_4px_8px_0_rgba(158,187,255,0.12)] md:mb-[326px] xl:mb-[466px] xl:mt-8">
      <h3 className="text-charcoal text-lg font-medium leading-6">
        My daily norma
      </h3>
      <div className="flex items-center gap-3">
        <p className="text-royal text-[22px] font-bold leading-none md:text-2xl">
          {dailyGoal ? dailyNorma : 2} L
        </p>
        <button
          className="hover:text-sunshade focus:text-sunshade text-jordy cursor-pointer border-transparent bg-transparent transition-colors duration-[250] ease-in-out"
          onClick={onModalOpen}>
          Edit
        </button>
      </div>
    </div>
  );
};
