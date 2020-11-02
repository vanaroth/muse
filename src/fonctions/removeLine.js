export const removeLine = (table, ligne) => {
  return ligne === 0
    ? table.slice(1)
    : ligne === table.length - 1
    ? table.slice(0, ligne)
    : [...table.slice(0, ligne), ...table.slice(ligne + 1)];
};
