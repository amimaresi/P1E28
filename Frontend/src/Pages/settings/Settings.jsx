import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ViewIcon } from 'lucide-react';
import NotFound from '../NotFound/NotFound';

// Composant pour un champ éditable
const EditableField = ({
  label,
  key,
  value,
  onChange,
  isPicture,
  isPassword,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [visible, setVisible] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
    setEditedValue(value);
  };

  const handleSave = () => {
    setIsEditing(false);
    onChange(editedValue);
    // fetch with key
  };

  return (
    <div
      className={`flex flex-row items-center justify-between ${!isPicture ? 'w-[350px]' : 'w-[500px]'}`}
    >
      <div className="flex flex-row items-center gap-5">
        {!isPicture ? (
          <Label htmlFor={label} className="text-right">
            {label}:
          </Label>
        ) : (
          <Avatar>
            <AvatarImage
              className=" rounded-full"
              src={
                value || 'https://avatars.githubusercontent.com/u/2981046?v=4'
              }
            />
            <AvatarFallback>No</AvatarFallback>
          </Avatar>
        )}
        {isEditing ? (
          isPassword ? (
            <>
              <Input
                id={label}
                type={visible ? 'text' : 'password'}
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
              ></Input>
              <Button onClick={() => setVisible(!visible)}>
                <ViewIcon />
              </Button>
            </>
          ) : (
            <Input
              id={label}
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
            />
          )
        ) : (
          <span>
            {typeof value === 'string' && isPassword
              ? value
                  .split('')
                  .map(() => '*')
                  .join('')
              : value}
          </span>
        )}
      </div>
      <div>
        {isEditing ? (
          <Button onClick={handleSave}>
            <CheckIcon />
          </Button>
        ) : (
          <Button onClick={handleEdit} className="bg-white hover:bg-white">
            <Pencil1Icon color="black" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default function Settings() {
  const [editedData, setEditedData] = useState({
    _id: 'k_benatchba@esi.dz',
    nomComplet: 'Karima Benatchba',
    GradeEnsegnement: 'hi',
    qualité: 'Chercheure',
    GradeRecherche: 'Maitre de recherche',
    H_index: 20,
    EtablissementOrigine: 'ESI',
    statut: 'Actif',
    Diplome: 'Doctorat',
    Equipe: 'Optimisation',
    tel: '0123456789', // Ajouté un numéro de téléphone pour l'exemple
    password: '123456',
  });

  const handleChange = (key, value) => {
    setEditedData({ ...editedData, [key]: value });
  };

  return editedData ? (
    <div className="container mx-auto min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center gap-[330px]">
          <h1 className="text-3xl font-bold">Profil</h1>
          <EditableField
            label="Nom complet"
            isPicture
            value={editedData.image_path}
            onChange={(value) => handleChange('image_path', value)}
          />
        </div>

        <div className="grid gap-4 py-4 sm:grid-cols-2">
          <EditableField
            label="Nom complet"
            key="_id"
            value={editedData.nomComplet}
            onChange={(value) => handleChange('nomComplet', value)}
          />
          <EditableField
            label="Qualité"
            value={editedData.qualité}
            onChange={(value) => handleChange('Qualité', value)}
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
          <EditableField
            label="Password"
            isPassword
            value={editedData.tel}
            onChange={(value) => handleChange('password', value)}
          />
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
}
