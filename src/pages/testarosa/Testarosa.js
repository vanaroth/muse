import React, { useState } from "react";

export const Testarosa = () => {
  const [activite, setActivite] = useState(0);
  return (
    <div>
      <p>C'est actif : {active ? "oui" : "non"}</p>
      <button type="button" onClick={() => setActivite((a) => !a)}>
        {a ? "Désactiver" : "Activer"}
      </button>
    </div>
  );
};
