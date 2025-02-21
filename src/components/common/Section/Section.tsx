import { Container } from "../Container/Container";

import { ChildrenProps } from "../common.i";

export const Section = ({ children }: ChildrenProps) => {
  return (
    <section>
      <Container>{children}</Container>
    </section>
  );
};
