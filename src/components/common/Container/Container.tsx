import styles from "../Container/Container.module.css";

import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};
