import { DailyNorma } from '../../components/Home/DailyNorma/DailyNorma';
import { WaterRatioPanel } from '../../components/Home/WaterRatioPanel/WaterRatioPanel';
import { Container, Section, WaterDescription } from './Home.styled';
import imgBottleMobile1x from '../../assets/images/background/homePage/mobile/bottleMob.png';
import imgBottleMobile2x from '../../assets/images/background/homePage/mobile/bottleMob@2x.png';
import imgBottleTablet1x from '../../assets/images/background/homePage/tablet/bottleTabl.png';
import imgBottleTablet2x from '../../assets/images/background/homePage/tablet/bottleTabl@2x.png';
import imgBottleDesktop1x from '../../assets/images/background/homePage/desktop/bottleDesc.png';
import imgBottleDesktop2x from '../../assets/images/background/homePage/desktop/bottleDesc@2x.png';
// import {TodayWaterList} from "../../components/Home/TodayWaterList/TodayWaterList"
import { TodayWaterList } from '../../components/Home/TodayWaterList/TodayWaterList';
import { MonthStatsTable } from '../../components/Home/MonthStatsTable/MonthStatsTable';

const Home = () => {
  return (
    <Section>
      <Container>
        <div>
          <DailyNorma />
          <WaterRatioPanel />
        </div>
        <div>
          <picture>
            <source
              srcSet={`${imgBottleDesktop1x} 1x, ${imgBottleDesktop2x} 2x`}
              media="(min-width: 1440px)"
            />
            <source
              srcSet={`${imgBottleTablet1x} 1x, ${imgBottleTablet2x} 2x`}
              media="(min-width: 768px) and (max-width: 1439px)"
            />
            <img
              src={imgBottleMobile1x}
              srcSet={`${imgBottleMobile1x} 1x, ${imgBottleMobile2x} 2x`}
              alt="Background"
            />
            <source
              srcSet={`${imgBottleMobile1x}} 1x, ${imgBottleMobile2x} 2x`}
            />
          </picture>
        </div>
        <WaterDescription>
          <TodayWaterList />
          <MonthStatsTable />
        </WaterDescription>
      </Container>
    </Section>
  );
};

export default Home;
