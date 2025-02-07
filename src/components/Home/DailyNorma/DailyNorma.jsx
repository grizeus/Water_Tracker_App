import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseModalWindow } from '../../common/BaseModalWindow/BaseModalWindow';
import { selectUser } from '../../../redux/auth/authSelectors';

export const DailyNorma = () => {
  const { waterRate } = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const convertInL = (waterRate / 1000).toFixed(1);

  return (
    <div>
      <h3>My Daily Norma</h3>
      <p>{waterRate ? convertInL + 'L' : '2 L'} </p>
      <button onClick={openModal}>Edit</button>

      {isModalOpen && <BaseModalWindow onClose={closeModal} />}
    </div>
  );
};
