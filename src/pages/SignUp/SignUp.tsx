import { Section } from "../../components";
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
