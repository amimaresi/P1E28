import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogClose } from '@radix-ui/react-dialog';
import { CheckIcon, Pencil1Icon, Pencil2Icon } from '@radix-ui/react-icons';

// Composant pour un champ éditable
const EditableField = ({ label, value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedValue(value);
  };

  const handleSave = () => {
    setIsEditing(false);
    onChange(editedValue);
  };

  return (
    <div className="flex flex-row items-center gap-5">
      <Label htmlFor={label} className="text-right">
        {label}:
      </Label>
      {isEditing ? (
        <Input
          id={label}
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
        />
      ) : (
        <span >{value}</span>
      )}
      <div>
        {isEditing ? (
          <Button onClick={handleSave} ><CheckIcon/></Button>
        ) : (
          <Button onClick={handleEdit} className='bg-white hover:bg-white'><Pencil1Icon color='black'/></Button>
        )}
      </div>
    </div>
  );
};

export default function Informations() {
  const [editedData, setEditedData] = useState({
    _id: 'k_benatchba@esi.dz',
    nomComplet: 'Karima Benatchba',
    GradeEnsegnement: null,
    qualité: 'Chercheure',
    GradeRecherche: 'Maitre de recherche',
    H_index: 20,
    EtablissementOrigine: 'ESI',
    statut: 'Actif',
    Diplome: 'Doctorat',
    Equipe: 'Optimisation',
    tel: '0123456789', // Ajouté un numéro de téléphone pour l'exemple
  });

  const handleChange = (key, value) => {
    setEditedData({ ...editedData, [key]: value });
  };

  return (
    <div className="container mx-auto min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-center gap-[330px]">
            <h1 className="text-3xl font-bold">Profil</h1>
             
          </div>

            <div className="grid gap-4 py-4 sm:grid-cols-2">
              <EditableField
                label="Nom complet"
                value={editedData.nomComplet}
                onChange={(value) => handleChange('nomComplet', value)}
              />
              <EditableField
                label="Qualité"
                value={editedData.qualité}
                onChange={(value) => handleChange('qualité', value)}
              />
              <EditableField
                label="Etablissement d'origine"
                value={editedData.EtablissementOrigine}
                onChange={(value) => handleChange('EtablissementOrigine', value)}
              />
              <EditableField
                label="Diplôme"
                value={editedData.Diplome}
                onChange={(value) => handleChange('Diplome', value)}
              />
              <EditableField
                label="Grade de recherche"
                value={editedData.GradeRecherche}
                onChange={(value) => handleChange('GradeRecherche', value)}
              />
              <EditableField
                label="Email"
                value={editedData._id}
                onChange={(value) => handleChange('_id', value)}
              />
              <EditableField
                label="Grade enseignement"
                value={editedData.GradeEnsegnement}
                onChange={(value) => handleChange('GradeEnsegnement', value)}
              />
              <EditableField
                label="H_index"
                value={editedData.H_index}
                onChange={(value) => handleChange('H_index', value)}
              />
              <EditableField
                label="Equipe"
                value={editedData.Equipe}
                onChange={(value) => handleChange('Equipe', value)}
              />
              <EditableField
                label="Téléphone"
                value={editedData.tel}
                onChange={(value) => handleChange('tel', value)}
              />
            </div>

      </div>
      
    </div>
  );
}
