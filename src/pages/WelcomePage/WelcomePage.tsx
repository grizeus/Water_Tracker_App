import { WaterConsumptionTracker } from "../../components/Welcome/WaterConsumptionTracker/WaterConsumptionTracker"
import { WhyDrinkWater } from "../../components/Welcome/WhyDrinkWater/WhyDrinkWater";
import styles from "./WelcomePage.module.css";
import { Section } from "../../components";

const WelcomePage = () => {
  return (
    <Section secStyles={styles.background} contStyles={styles.wrapper}>
      <WaterConsumptionTracker />
      <WhyDrinkWater />
    </Section>
  );
};

export default WelcomePage;
