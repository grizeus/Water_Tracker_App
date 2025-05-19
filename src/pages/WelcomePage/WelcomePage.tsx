import { WaterConsumptionTracker } from "../../components/Welcome/WaterConsumptionTracker/WaterConsumptionTracker"
import { WhyDrinkWater } from "../../components/Welcome/WhyDrinkWater/WhyDrinkWater";
import { Section } from "../../components/common/Section/Section";
import styles from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <Section secStyles={styles.background} contStyles={styles.wrapper}>
      <WaterConsumptionTracker />
      <WhyDrinkWater />
    </Section>
  );
};

export default WelcomePage;
