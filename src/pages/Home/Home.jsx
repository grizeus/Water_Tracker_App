import { DailyNorma } from '../../components/Home/DailyNorma/DailyNorma';
import { WaterRatioPanel } from '../../components/Home/WaterRatioPanel/WaterRatioPanel';
import { Section } from './Home.styled';

const Home = () => {
  return (
    <Section>
      <div>
        <DailyNorma />
        <WaterRatioPanel />
      </div>
      <div>
        <h3>Today Water list</h3>
      </div>
      <div>
        <h3>Monthly water list</h3>
      </div>
    </Section>
  );
};

export default Home;
