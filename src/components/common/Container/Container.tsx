import styles from "../Container/Container.module.css";
import clsx from "clsx";
import type { ChildrenProps } from "../common.d.ts";

export const Container = ({
  children,
  contStyles,
}: {
  children: ChildrenProps;
  contStyles?: string;
}) => {
  return <div className={clsx(contStyles, styles.container)}>{children}</div>;
};
