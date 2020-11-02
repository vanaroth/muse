import { calculTotal } from './calculTotal';

export const tableCalcul = (table) => {
  let finalTable = table.map((ligne) => ({
    ...ligne,
    total: calculTotal(ligne.quantite, ligne.pu, ligne.tva, ligne.prime),
  }));

  finalTable.push({
    total: finalTable.reduce((acc, cur) => acc + cur.total, 0),
  });
  return finalTable;
};
