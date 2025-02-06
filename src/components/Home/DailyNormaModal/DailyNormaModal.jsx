import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import {
  CalculateWater,
  Description,
  FormRadio,
  FormSubTitle,
  Formula,
  Paragraph,
  Wrapper,
} from './DailyNormaModal.styled';

const MyDailyNormSchema = Yup.object().shape({
  gender: (Yup.string().required('Required').oneOf(['woman', 'man']).default =
    'woman'),
  weight: Yup.number().required('Required').positive(),
  timeOfActive: (Yup.date().default = new Date()),
  waterDrunk: (Yup.number().required('Required').default = 250),
});

export const DailyNormaModal = () => {
  const dispatch = useDispatch();

  const [gender, setGender] = useState('woman');
  const [weight, setWeigth] = useState('');
  const [timeOfActive, setTimeOfActive] = useState();
  const [waterDrunk, setWaterDrunk] = useState();

  const initialValues = {
    gender: '',
    weight: '',
    timeOfActive: '',
    waterDrunk: '',
  };

  const handleSubmit = (values, action) => {
    console.log(values);
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
              {/* стилізувати елемент * через псевдоелемент after */}* V is the
              volume of the water norm in liters per day, M is your body weight,
              T is the time of active sports, or another type of activity
              commensurate in terms of loads (in the absence of these, you must
              set 0)
            </p>
          </Description>
        </Wrapper>

        <Wrapper>
          <FormRadio>
            <div role="group" aria-labelledby="chose-gender">
              <label>
                <Field type="radio" name="gender" value="woman" />
                <span>For man</span>
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

            <Field type="number" name="waterDrunk" />
          </div>
        </Wrapper>
        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
};
