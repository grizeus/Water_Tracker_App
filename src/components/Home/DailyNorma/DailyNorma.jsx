import { useState } from "react";
import { useSelector } from "react-redux";
import {
  DailyWrapper,
  FlexContainer,
  TitleForm,
  ButtonEdit,
  Description,
} from "./DailyNorma.styled";
import { DailyNormaModal } from "src/components/index";
import { selectDailyGoal } from "src/redux/water/selectors";

// TODO: fix JSX later
export const DailyNorma = () => {
  const dailyGoal = useSelector(selectDailyGoal);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dailyNorma = (dailyGoal / 1000).toFixed(1);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <DailyWrapper>
      <TitleForm>My Daily Norma</TitleForm>
      <FlexContainer>
        <Description>{dailyGoal ? dailyNorma : 2} L </Description>
        <ButtonEdit onClick={openModal}>Edit</ButtonEdit>
      </FlexContainer>
      {isModalOpen && <DailyNormaModal onClose={closeModal} />}
    </DailyWrapper>
  );
};
