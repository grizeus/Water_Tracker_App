import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  DailyWrapper,
  FlexContainer,
  TitleForm,
  ButtonEdit,
  Description,
} from './DailyNorma.styled';
import { DailyNormaModal } from '../DailyNormaModal/DailyNormaModal';
import { selectDailyGoal } from '../../../redux/waterData/waterSelectors';

export const DailyNorma = () => {
  const dailyGoal  = useSelector(selectDailyGoal);
  console.log(dailyGoal)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const convertInL = (dailyGoal / 1000).toFixed(1);

  return (
    <DailyWrapper>
      <TitleForm>My Daily Norma</TitleForm>
      <FlexContainer>
        <Description>{dailyGoal ? convertInL : 2} L </Description>
        <ButtonEdit onClick={openModal}>Edit</ButtonEdit>
      </FlexContainer>
      {isModalOpen && <DailyNormaModal onClose={closeModal} />}
    </DailyWrapper>
  );
};
