export const WhyDrinkWater = () => {
  const advantagesList = [
    "Supply of nutrients to all organs",
    "Providing oxygen to the lungs",
    "Maintaining the work of the heart",
    "Release of processed substances",
    "Ensuring the stability of the internal environment",
    "Maintaining within the normal temperature",
    "Maintaining an immune system capable of resisting disease",
  ];

  return (
    <div className="bg-solitude flex w-[288px] flex-col items-start justify-start gap-3 rounded-[10px] px-4 py-6 shadow-[0_4px_14px_0_rgba(64,123,255,0.3)] md:w-[494px] md:px-6 md:py-8">
      <h2 className="text-charcoal text-lg font-medium leading-5">
        Why drink water
      </h2>
      <ul className="flex flex-col gap-4">
        {advantagesList.map((item, index) => (
          <li
            key={index}
            className="text-charcoal before:bg-royal flex flex-row items-center justify-start gap-2 before:h-2 before:w-2 before:flex-shrink-0 before:rounded-full before:content-['']">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
