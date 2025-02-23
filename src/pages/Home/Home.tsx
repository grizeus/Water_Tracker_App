import { useState } from "react";

import styles from "./Home.module.css";
import {
  DailyNorma,
  DailyNormaModal,
  MonthStatsTable,
  Section,
  TodayListModal,
  TodayWaterList,
  WaterRatioPanel,
} from "../../components";

const Home = () => {
  const [isNormaModalOpen, setNormaModalOpen] = useState(false);
  const openNormaModal = () => setNormaModalOpen(true);
  const closeNormaModal = () => setNormaModalOpen(false);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);
  return (
    <Section secStyles={styles.bg}>
      {isNormaModalOpen && (
        <DailyNormaModal onClose={closeNormaModal} onShow={openNormaModal} />
      )}
      {isAddModalOpen && (
        <TodayListModal onClose={closeAddModal} onShow={openAddModal} />
      )}
      <div className="relative flex flex-col justify-between gap-10 xl:flex-row">
        <div className=" ">
          <DailyNorma onModalOpen={openNormaModal} />
          <WaterRatioPanel onModalOpen={openAddModal} />
        </div>
        <div className="mb-10 w-[280px] bg-solitude px-2 py-6 shadow-md md:mb-11 md:w-[704px] md:px-6 md:py-8 xl:mt-0 xl:w-[592px]">
          <TodayWaterList />
          <MonthStatsTable />
        </div>
      </div>
    </Section>
  );
};

export default Home;
