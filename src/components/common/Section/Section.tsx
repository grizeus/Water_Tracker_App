import { Container } from "../Container/Container";

import type { ChildrenProps } from "../common.d.ts";

export const Section = ({
  children,
  secStyles,
  contStyles,
}: {
  children: ChildrenProps;
  secStyles: string;
  contStyles: string;
}) => {
  return (
    <section className={secStyles}>
      <Container contStyles={contStyles}>{children}</Container>
    </section>
  );
};
