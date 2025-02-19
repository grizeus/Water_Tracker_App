import { WaterConsumptionTracker } from "components/Welcome/WaterConsumptionTracker/WaterConsumptionTracker";
import { WhyDrinkWater } from "components/Welcome/WhyDrinkWater/WhyDrinkWater";
import styles from './WelcomePage.module.css';

const WelcomePage = () => {
  return (
    <section className={styles.wrapper}>
      <WaterConsumptionTracker />
      <WhyDrinkWater />
    </section>
  );
};

export default WelcomePage;
