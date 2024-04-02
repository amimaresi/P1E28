import React from 'react';
import Filtres from './Filtres/Filtres';
export default function RechercheLayout({ searchby }) {
  return <Filtres searchby={searchby} />;
}
