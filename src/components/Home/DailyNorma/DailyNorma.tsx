import { useSelector } from "react-redux";
import { selectDailyGoal } from "../../../redux/water/selectors";
import { OpenerType } from "../../../../types/global";

export const DailyNorma = ({ onModalOpen }: { onModalOpen: OpenerType }) => {
  const dailyGoal = useSelector(selectDailyGoal);
  const dailyNorma = (dailyGoal / 1000).toFixed(1);

  return (
    <div className="mb-[232px] flex w-[164px] flex-col gap-3 rounded-lg border border-solitude p-2 px-4 shadow-[0_4px_8px_0_rgba(158,187,255,0.12)] md:mb-[326px] xl:mb-[466px] xl:mt-8">
      <h3 className="text-lg font-medium leading-6 text-charcoal">
        My daily norma
      </h3>
      <div className="flex items-center gap-3">
        <p className="text-[22px] font-bold leading-none text-royal md:text-2xl">
          {dailyGoal ? dailyNorma : 2} L
        </p>
        <button
          className="cursor-pointer border-transparent bg-transparent text-jordy transition-colors duration-[250] ease-in-out hover:text-sunshade focus:text-sunshade"
          onClick={onModalOpen}>
          Edit
        </button>
      </div>
    </div>
  );
};
