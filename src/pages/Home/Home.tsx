import { useState } from "react";

import DailyNormaModal from "../../components/Home/DailyNormaModal/DailyNormaModal";
import { MonthStatsTable } from "../../components/Home/MonthStatsTable/MonthStatsTable";
import { EntryData } from "../../../types/global";
import { Section } from "../../components/common/Section/Section";
import { TodayListModal } from "../../components/Home/TodayListModal/TodayListModal";
import { DeletingEntryModal } from "../../components/Home/DeletingEntryModal/DeletingEntryModal";
import { DailyNorma } from "../../components/Home/DailyNorma/DailyNorma";
import { WaterRatioPanel } from "../../components/Home/WaterRatioPanel/WaterRatioPanel";
import { TodayWaterList } from "../../components/Home/TodayWaterList/TodayWaterList";
import styles from "./Home.module.css";

const Home = () => {
  const [selectedRecord, setSelectedRecord] = useState<EntryData | null>(null);
  const [isNormaModalOpen, setNormaModalOpen] = useState(false);
  const openNormaModal = () => setNormaModalOpen(true);
  const closeNormaModal = () => setNormaModalOpen(false);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const openEditModal = (record: EntryData | null) => {
    setSelectedRecord(record);
    setEditModalOpen(true);
  };
  const closeEditModal = () => setEditModalOpen(false);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const openDeleteModal = (record: EntryData | null) => {
    setSelectedRecord(record);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setDeleteModalOpen(false);
  return (
    <Section secStyles={styles.bg}>
      {isNormaModalOpen && (
        <DailyNormaModal onClose={closeNormaModal} onShow={openNormaModal} />
      )}
      {isAddModalOpen && (
        <TodayListModal
          initialAmount={50}
          onClose={closeAddModal}
          onShow={openAddModal}
        />
      )}
      {isEditModalOpen && (
        <TodayListModal
          initialAmount={selectedRecord?.amount}
          initialTime={selectedRecord?.time}
          isEditing={true}
          existingRecordId={selectedRecord?._id}
          onClose={closeEditModal}
          onShow={openEditModal}
        />
      )}
      {isDeleteModalOpen && selectedRecord && (
        <DeletingEntryModal
          recordId={selectedRecord._id}
          onClose={closeDeleteModal}
          onShow={openDeleteModal}
        />
      )}
      <div className="relative flex flex-col justify-between gap-10 xl:flex-row">
        <div className=" ">
          <DailyNorma onModalOpen={openNormaModal} />
          <WaterRatioPanel onModalOpen={openAddModal} />
        </div>
        <div className="mb-10 w-[280px] bg-solitude px-2 py-6 shadow-md md:mb-11 md:w-[704px] md:px-6 md:py-8 xl:mt-0 xl:w-[592px]">
          <TodayWaterList
            onAddModalOpen={openAddModal}
            onEditModalOpen={openEditModal}
            onDeleteModalOpen={openDeleteModal}
          />
          <MonthStatsTable />
        </div>
      </div>
    </Section>
  );
};

export default Home;
