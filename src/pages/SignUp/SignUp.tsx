import { Section } from "../../components/common/Section/Section";
import { SignUpForm } from "../../components/SignUpForm";
import styles from "./SignUp.module.css";

const SignUp = () => {
  return (
    <Section secStyles={styles.bg}>
      <SignUpForm />
    </Section>
  );
};

export default SignUp;
