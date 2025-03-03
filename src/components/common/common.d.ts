import { ReactNode } from "react";
import { OpenerType, OpenerTypeWithData } from "../components";

export type ChildrenProps = ReactNode;

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

export interface BaseModalWindowProps {
  onShow: OpenerType | OpenerTypeWithData;
  children: ReactNode;
  title: string;
  onClose: () => void;
}
