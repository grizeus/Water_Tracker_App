import { ChangeEvent } from "react";

export const safeParse = (e: ChangeEvent<HTMLInputElement>) => {
  const res = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(res)) {
    return 0;
  }
  return res;
};
