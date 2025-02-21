import styles from "../Container/Container.module.css";

import type { ChildrenProps } from "../common.d.ts";

export const Container = ({ children }: ChildrenProps) => {
  return <div className={styles.container}>{children}</div>;
};
