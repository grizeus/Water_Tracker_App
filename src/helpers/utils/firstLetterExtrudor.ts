const firstLetterExtrudor = (name: string | null): string => {
  return name ? name.charAt(0).toUpperCase() : "";
};

export default firstLetterExtrudor;
