import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import {
  ButtonSave,
  CalculateWater,
  Container,
  Description,
  Form,
  FormRadio,
  FormSubTitle,
  Formula,
  Input,
  InputRadio,
  Paragraph,
  Wrapper,
} from './DailyNormaModal.styled';
import { updateWaterRate } from '../../../redux/Api/api';
import { BaseModalWindow } from '../../common/BaseModalWindow/BaseModalWindow';

export const DailyNormaModal = ({ onClose, onShow }) => {
  const [gender, setGender] = useState('woman');
  const [weight, setWeight] = useState('');
  const [timeOfActive, setTimeOfActive] = useState('');
  const [dailyWaterNorm, setDailyWaterNorm] = useState('');
  const [intakeGoal, setIntakeGoal] = useState('');

  const dispatch = useDispatch();

  const calculateWaterDailyNorm = useCallback(() => {
    if (!weight || !timeOfActive) return setDailyWaterNorm('');

    if (weight <= 0 || timeOfActive <= 0) {
      return toast.error('Please enter a valid data');
    }

    const userGender = gender === 'woman' ? 0.03 : 0.04;
    const activityTime = gender ? 0.4 : 0.6;

    const intake = weight * userGender + (timeOfActive / 60) * activityTime;

    setDailyWaterNorm(intake.toFixed(2));
  }, [gender, weight, timeOfActive]);

  useEffect(() => {
    calculateWaterDailyNorm();
  }, [calculateWaterDailyNorm]);

  const handleSubmit = e => {
    e.preventDefault();

    const userGoal = parseFloat(intakeGoal);

    const finishGoal = userGoal ? userGoal : dailyWaterNorm;

    dispatch(updateWaterRate(finishGoal));
  };

  return (
    <BaseModalWindow onClose={onClose} onShow={onShow} title="My daily norma">
      <Container>
        {
          <Wrapper>
            <Formula>
              <Paragraph>
                For woman:<span> V=(M*0,03) + (T*0,4)</span>
              </Paragraph>
              <Paragraph>
                For man:<span> V=(M*0,04) + (T*0,6)</span>
              </Paragraph>
            </Formula>
            <Description>
              <p>
                <span>*</span>V is the volume of the water norm in liters per
                day, M is your body weight, T is the time of active sports, or
                another type of activity commensurate in terms of loads (in the
                absence of these, you must set 0)
              </p>
            </Description>
          </Wrapper>
        }

        {
          <Form>
            <FormRadio>
              <FormSubTitle>Calculate your rate:</FormSubTitle>
              <label>
                <InputRadio
                  type="radio"
                  name="gender"
                  value="woman"
                  checked={gender === 'woman'}
                  onChange={() => setGender('woman')}
                />
                <span>For woman</span>
              </label>
              <label>
                <InputRadio
                  type="radio"
                  name="gender"
                  value="man"
                  checked={gender === 'man'}
                  onChange={() => setGender('man')}
                />
                <span>For man</span>
              </label>
            </FormRadio>
            <div>
              <Paragraph>Your weight in kilograms:</Paragraph>
              <Input
                type="number"
                name="weight"
                value={weight}
                onChange={e => setWeight(e.target.value)}
              />
            </div>
            <div>
              <Paragraph>
                The time of active participation in sports or other activities
                with a high physical. load in hours:
              </Paragraph>
              <Input
                type="number"
                name="timeOfActive"
                value={timeOfActive}
                onChange={e => setTimeOfActive(e.target.value)}
              />
            </div>
            <CalculateWater>
              The required amount of water in liters per day:
              <span>
                {dailyWaterNorm
                  ? parseFloat(dailyWaterNorm).toFixed(1) + 'L'
                  : 0 + 'L'}
              </span>
            </CalculateWater>
            <div>
              <FormSubTitle>
                Write down how much water you will drink:
              </FormSubTitle>

              <Input
                type="number"
                name="intakeGoal"
                value={intakeGoal}
                onChange={e => setIntakeGoal(e.target.value)}
              />
            </div>
            <ButtonSave type="submit" onClick={handleSubmit}>
              Save
            </ButtonSave>
          </Form>
        }
      </Container>
    </BaseModalWindow>
  );
};
