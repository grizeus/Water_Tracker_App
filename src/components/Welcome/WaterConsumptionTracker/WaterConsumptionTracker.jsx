import { NavLink } from 'react-router-dom';

import sprite from 'src/assets/images/sprite/sprite.svg';
import styles from './WaterConsumptionTracker.module.css';

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
    <div className={styles.wrapper}>
      <h1 className={styles['main-title']}>Water consumption tracker</h1>
      <span className={styles.description}>
        Record daily water intake and track
      </span>
      <h2 className={styles['list-title']}>Tracker Benefits</h2>
      <ul className={styles.list}>
        {benefitsList.map(({ id, text }, index) => (
          <li key={index} className={styles.item}>
            <svg className={styles.icon}>
              <use href={id}></use>
            </svg>
            <p className={styles.text}>{text}</p>
          </li>
        ))}
      </ul>

      <NavLink to={'/signup'} className={styles.btn}>
        Try tracker
      </NavLink>
    </div>
  );
};
