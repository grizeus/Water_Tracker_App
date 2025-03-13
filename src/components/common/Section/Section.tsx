import { Container } from "../Container/Container";

import type { ChildrenProps } from "../../../../types/global";

export const Section = ({
  children,
  secStyles,
  contStyles,
}: {
  children: ChildrenProps;
  secStyles?: string;
  contStyles?: string | undefined;
}) => {
  return (
    <section className={secStyles}>
      <Container contStyles={contStyles ?? ""}>{children}</Container>
    </section>
  );
};
