import { Container } from "../Container/Container.tsx";

export const Section = ({ className, children }) => {
  return (
    <section className={className}>
      <Container>{children}</Container>
    </section>
  );
};
