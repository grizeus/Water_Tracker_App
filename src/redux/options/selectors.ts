import { GeneralState } from "../redux";

export const selectTheme = (state: GeneralState) => state.options.theme;
