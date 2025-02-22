import { useState } from "react";

import styles from "./Home.module.css";
import {
  DailyNorma,
  DailyNormaModal,
  MonthStatsTable,
  Section,
  TodayWaterList,
  WaterRatioPanel,
} from "../../components";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <Section secStyles={styles.bg}>
      {isModalOpen && (
        <DailyNormaModal onClose={closeModal} onShow={openModal} />
      )}
      <div className="relative flex flex-col justify-between gap-10 xl:flex-row">
        <div className=" ">
          <DailyNorma onModalOpen={openModal} />
          <WaterRatioPanel />
        </div>
        <div className="bg-solitude mb-10 w-[280px] px-2 py-6 shadow-[0_4px_14px_0_rgba(64,123,255,0.3)] md:mb-11 md:w-[704px] md:px-6 md:py-8 xl:mt-0 xl:w-[592px]">
          <TodayWaterList />
          <MonthStatsTable />
        </div>
      </div>
    </Section>
  );
};

export default Home;
