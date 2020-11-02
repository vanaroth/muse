export const calculTotal = (qte, pu, tva, prime) => {
  const totalPu = qte * pu * (1 - tva / 100);
  const totalPrime = qte * prime;
  return totalPu > totalPrime ? totalPu : totalPrime;
};
