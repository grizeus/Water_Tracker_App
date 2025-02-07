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
    <div>
      <h2>Why drink water</h2>
      <ul>
        {advantagesList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
