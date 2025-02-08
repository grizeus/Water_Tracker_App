import { DailyNorma } from '../../components/Home/DailyNorma/DailyNorma';
import { WaterRatioPanel } from '../../components/Home/WaterRatioPanel/WaterRatioPanel';
import { Container, Section, WaterDescription } from './Home.styled';

const Home = () => {
  return (
    <Section>
      <Container>
        <div>
          <DailyNorma />
          <WaterRatioPanel />
        </div>
        <WaterDescription>
          <div>
            <h3>Today Water list</h3>
          </div>
          <div>
            <h3>Monthly water list</h3>
          </div>
        </WaterDescription>
      </Container>
    </Section>
  );
};

export default Home;
