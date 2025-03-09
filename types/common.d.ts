import { ReactNode } from "react";
import { OpenerTypeWithData } from "./components";
import { OpenerType, ChildrenProps } from "./global";

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
  children: ChildrenProps;
  title: string;
  onClose: () => void;
}
