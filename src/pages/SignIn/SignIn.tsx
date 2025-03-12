import { Section } from "../../components";
import { SignInForm } from "../../components/SignInForm";
import styles from "./SignIn.module.css";

const SignIn = () => {
  return (
    <Section secStyles={styles.bg}>
      <SignInForm />
    </Section>
  );
};

export default SignIn;
