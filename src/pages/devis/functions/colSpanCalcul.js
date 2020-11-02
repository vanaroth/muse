//Pour la dernière ligne du tableau, pour le span du total
export const colSpanCalcul = (children, record, otherSize = 0) => {
  const colSpan = Object.entries(record).length > 1 ? 1 : otherSize;
  return {
    children,
    props: { colSpan },
  };
};
