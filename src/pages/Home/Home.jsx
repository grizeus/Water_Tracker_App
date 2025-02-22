import { useState } from "react";

import { DailyNorma } from "../../components/Home/DailyNorma/DailyNorma";
import { WaterRatioPanel } from "components";
import { Section } from "../../components/common/Section/Section";

import { TodayWaterList } from "components";
import { MonthStatsTable } from "components";

import styles from "./Home.module.css";
import { DailyNormaModal } from "../../components";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <Section secStyles={styles.section}>
        {isModalOpen && (
          <DailyNormaModal onClose={closeModal} onShow={openModal} />
        )}
        <div className="relative flex flex-col justify-between gap-10 xl:flex-row">
          <div className=" ">
            <DailyNorma onModalOpen={openModal}/>
            <WaterRatioPanel />
          </div>
          <div className="bg-solitude mb-10 max-w-[280px] px-2 py-6 shadow-[0_4px_14px_0_rgba(64,123,255,0.3)] md:mb-11 md:max-w-[688px] md:px-6 md:py-8 xl:max-w-[680px] xl:mt-0">
            <TodayWaterList />
            <MonthStatsTable />
          </div>
        </div>
    </Section>
  );
};

export default Home;
