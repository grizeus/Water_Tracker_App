import { ReactNode } from "react";

export interface ChildrenProps {
  children: ReactNode;
}

export interface LoaderProps {
  size?: number;
  color?: string;
  height?: number;
  width?: number;
  radius?: string;
  ariaLabel?: string;
  visible?: boolean;
}

export interface ContentLoaderProps {
  width?: string;
  strokeColor?: string;
  strokeWidth?: string;
  animationDuration?: string;
  ariaLabel?: string;
  visible?: boolean;
}