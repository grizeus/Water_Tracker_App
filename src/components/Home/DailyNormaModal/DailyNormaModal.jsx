import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import {
  CalculateWater,
  Description,
  FormRadio,
  FormSubTitle,
  Formula,
  Paragraph,
  Wrapper,
} from './DailyNormaModal.styled';
import { selectUser } from '../../../redux/auth/authSelectors';
import { updateWaterRate } from '../../../redux/Api/api';

const MyDailyNormSchema = Yup.object().shape({
  gender: Yup.string().required('Required').oneOf(['woman', 'man']),
  weight: Yup.string().required('Required'),
  timeOfActive: Yup.string().required('Required').min(0),
  intakeGoal: Yup.string().required('Required'),
});

const initialValues = {
  gender: '',
  weight: '',
  timeOfActive: '',
  intakeGoal: '',
};

export const DailyNormaModal = () => {
  const dispatch = useDispatch();
  const { waterRate } = useSelector(selectUser);

  const [gender, setGender] = useState('woman');
  const [weight, setWeigth] = useState('');
  const [timeOfActive, setTimeOfActive] = useState();
  const [dailyIntake, setDailyIntake] = useState((waterRate / 1000).toFixed(1));

  const calculateValueWater = useCallback(() => {
    if (!gender || !weight || !timeOfActive) {
      setDailyIntake('');
      return;
    }

    const factor = gender === 'woman' ? 0.03 : 0.04;
    const activityFactor = gender === 'woman' ? 0.4 : 0.6;
    const intake = (weight * factor + timeOfActive * activityFactor).toFixed(2);

    setDailyIntake(intake);
  });

  useEffect(() => {
    calculateValueWater();
  }, [gender, weight, timeOfActive]);

  const handleSubmit = (values, actions) => {
    const { intakeGoal } = values;
    const finalWaterRate = intakeGoal || dailyIntake;
    dispatch(updateWaterRate(finalWaterRate));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={MyDailyNormSchema}
    >
      <Form>
        <Wrapper>
          <Formula>
            <Paragraph>
              For woman:<span>V=(M*0,03) + (T*0,4)</span>
            </Paragraph>
            <Paragraph>
              For man: <span>V=(M*0,04) + (T*0,6)</span>
            </Paragraph>
          </Formula>
          <Description>
            <p>
              V is the volume of the water norm in liters per day, M is your
              body weight, T is the time of active sports, or another type of
              activity commensurate in terms of loads (in the absence of these,
              you must set 0)
            </p>
          </Description>
        </Wrapper>

        <Wrapper>
          <FormRadio>
            <div role="group" aria-labelledby="chose-gender">
              <label>
                <Field type="radio" name="gender" value="woman" />
                <span>For woman</span>
              </label>
              <label>
                <Field type="radio" name="gender" value="man" />
                <span>For man</span>
              </label>
            </div>
          </FormRadio>
          <div>
            <Paragraph>Your weight in kilograms:</Paragraph>
            <Field type="number" name="weight" />
          </div>
          <div>
            <Paragraph>
              The time of active participation in sports or other activities
              with a high physical. load in hours:
            </Paragraph>
            <Field type="number" name="timeOfActive" />
          </div>
          <CalculateWater>
            The required amount of water in liters per day:
            <span>Calculate Norma</span>
          </CalculateWater>
          <div>
            <FormSubTitle>
              Write down how much water you will drink:
            </FormSubTitle>

            <Field type="number" name="intakeGoal" />
          </div>
        </Wrapper>
        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
};
