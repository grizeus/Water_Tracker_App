import styles from './WhyDrinkWater.module.css'

export const WhyDrinkWater = () => {
  const advantagesList = [
    'Supply of nutrients to all organs',
    'Providing oxygen to the lungs',
    'Maintaining the work of the heart',
    'Release of processed substances',
    'Ensuring the stability of the internal environment',
    'Maintaining within the normal temperature',
    'Maintaining an immune system capable of resisting disease',
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Why drink water</h2>
      <ul className={styles.list}>
        {advantagesList.map((item, index) => (
          <li key={index} className={styles.item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
