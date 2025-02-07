import { NavLink } from 'react-router-dom';
import sprite from 'src/assets/images/sprite/sprite.svg';

import styles from "./WaterConsumptionTracker.module.css"
export const WaterConsumptionTracker = () => {

  const benefitsList = [
    {
      text: 'Habit drive',
      id: `${sprite}#icon-calendar`,
    },
    {
      text: 'View statistics',
      id: `${sprite}#icon-statistic`,
    },
    {
      text: 'Personal rate setting',
      id: `${sprite}#icon-instrument`,
    },
  ];


  return (
    <div>
      <h1>Water consumption tracker</h1>
      <span>Record daily water intake and track</span>
      <h2>Tracker Benefits</h2>
      <ul>
        {benefitsList.map(({ id, text }, index) => (
          <li key={index}>
            <svg className={styles.icon}>
              <use href={id}></use>
            </svg>
            {text}
          </li>
        ))}
      </ul>

      <NavLink to={"/signup"}>
        Try tracker
      </NavLink>
    </div>
  );
};
