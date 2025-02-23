import { NavLink } from "react-router-dom";

import sprite from "src/assets/images/sprite/sprite.svg";

export const WaterConsumptionTracker = () => {
  const benefitsList = [
    {
      text: "Habit drive",
      id: `${sprite}#icon-calendar`,
    },
    {
      text: "View statistics",
      id: `${sprite}#icon-statistic`,
    },
    {
      text: "Personal rate setting",
      id: `${sprite}#icon-instrument`,
    },
  ];

  return (
    <div className="flex-start flex flex-col md:mb-[60px] xl:mb-0">
      <h1 className="text-charcoal mb-4 text-[28px] font-bold leading-10 md:text-4xl md:leading-8">
        Water consumption tracker
      </h1>
      <span className="text-charcoal mb-6 text-2xl leading-7 font-normal md:text-[26px] md:leading-8">
        Record daily water intake and track
      </span>
      <h2 className="text-charcoal mb-3 text-lg font-medium leading-5">
        Tracker Benefits
      </h2>
      <ul className="flex flex-col items-start justify-start gap-4 md:flex-row md:justify-between xl:flex-col">
        {benefitsList.map(({ id, text }, index) => (
          <li
            key={index}
            className="flex flex-row items-center justify-start gap-2">
            <svg className="stroke-royal h-8 w-8 fill-transparent md:h-10 md:w-10">
              <use href={id}></use>
            </svg>
            <p className="text-charcoal text-base font-normal leading-5">
              {text}
            </p>
          </li>
        ))}
      </ul>

      <NavLink
        to={"/signup"}
        className="bg-royal mt-6 inline-block w-[280px] rounded-lg px-8 py-2 text-center text-base font-medium leading-5 text-white shadow-sm transition-shadow duration-[350] ease-in-out hover:shadow-lg active:shadow-none md:h-11 md:w-[336px] md:text-lg md:leading-6 xl:w-96">
        Try tracker
      </NavLink>
    </div>
  );
};
