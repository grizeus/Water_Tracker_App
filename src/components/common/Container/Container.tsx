import styles from "../Container/Container.module.css";

import { ChildrenProps } from "../common.i";

export const Container = ({ children }: ChildrenProps) => {
  return <div className={styles.container}>{children}</div>;
};
