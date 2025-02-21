import { Container } from "../Container/Container";

import type { ChildrenProps } from "../common.d.ts";

export const Section = ({ children }: ChildrenProps) => {
  return (
    <section>
      <Container>{children}</Container>
    </section>
  );
};
