import { ThreeDots, RotatingLines } from "react-loader-spinner";

import styles from "./Loader.module.css";

import type { LoaderProps, ContentLoaderProps } from "../../../../types/common";

export const Loader = ({
  size = 90,
  color = "#407bff",
  visible = true,
}: LoaderProps) => {
  return (
    <div className={styles.threeDots}>
      <ThreeDots
        height={size}
        width={size}
        radius="9"
        color={color}
        ariaLabel="three-dots-loading"
        visible={visible}
      />
    </div>
  );
};

export const ContentLoader = ({
  width = "18px",
  strokeColor = "white",
  strokeWidth = "5",
  animationDuration = "0.75",
  ariaLabel = "rotating-lines-loading",
  visible = true,
}: ContentLoaderProps) => {
  return (
    <div className={styles.rotatingLines}>
      <RotatingLines
        visible={visible}
        width={width}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        animationDuration={animationDuration}
        ariaLabel={ariaLabel}
      />
    </div>
  );
};
