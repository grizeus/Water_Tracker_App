export const determineFirstLetter = (value: string | null): string => {
  const result = !value ? "" : value.charAt(0);
  return result.toLocaleUpperCase();
};
