import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseModalWindow } from '../../common/BaseModalWindow/BaseModalWindow';
import { selectUser } from '../../../redux/auth/authSelectors';
import {
  DailyWrapper,
  FlexContainer,
  TitleForm,
  ButtonEdit,
  Description,
} from './DailyNorma.styled';

export const DailyNorma = () => {
  const { waterRate } = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const convertInL = (waterRate / 1000).toFixed(1);

  return (
    <DailyWrapper>
      <TitleForm>My Daily Norma</TitleForm>
      <FlexContainer>
        <Description>{waterRate ? convertInL : 2} L </Description>
        <ButtonEdit onClick={openModal}>Edit</ButtonEdit>
      </FlexContainer>
      {isModalOpen && <BaseModalWindow onClose={closeModal} />}
    </DailyWrapper>
  );
};
