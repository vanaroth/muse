import React from 'react';

import { PDFViewer } from '@react-pdf/renderer';
import { useParams, useHistory } from 'react-router-dom';
import { FicheChantier } from './templates/FicheChantier';
import { PV } from './templates/pv/PV';
import { Attestation } from './templates/attestation/Attestation';
import { VtVierge } from './templates/vt/VtVierge';
import { VtViergeNOIMAGE } from './templates/vt/VtViergeNOIMAGE';
import { Result, Button } from 'antd';

export const PDFLoader = () => {
  const history = useHistory();
  const { pdf } = useParams();
  console.log(pdf);
  let PDF = false;
  switch (pdf) {
    case 'chantier':
      PDF = FicheChantier;
      break;
    case 'pv':
      PDF = PV;
      break;
    case 'attestation':
      PDF = Attestation;
      break;
    case 'vt_vierge':
      PDF = VtVierge;
      break;
    case 'vt':
      PDF = VtViergeNOIMAGE;
      break;
    default:
      PDF = false;
      break;
  }

  if (PDF) {
    return (
      <div style={{ boxShadow: '15px 15px 2em rgba(0,0,0,0.3)' }}>
        <PDFViewer
          style={{
            width: 500,
            height: 750,
            maxWidth: '90vw',
            border: '0px solid black',
          }}
        >
          <PDF />
        </PDFViewer>
      </div>
    );
  } else {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Attention, Ce PDF n'existe pas!"
        extra={
          <Button type="primary" onClick={() => history.push('/')}>
            Retour à l'accueil
          </Button>
        }
      />
    );
  }
};
