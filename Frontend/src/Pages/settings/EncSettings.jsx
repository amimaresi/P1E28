import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';

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
    // fetch with key
  };

  return ( 
    <div className="flex flex-row items-center justify-between w-[350px]">
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
          <div>
            {Array.isArray(value) ? (
              <ul>
                {value.map((item, index) => (
                  <li key={index}>{item.nomComplet}</li>
                ))}
              </ul>
            ) : (
              <span>{value}</span>
            )}
          </div>
        )}
      </div>
      <div>
        {isEditing ? (
          <Button onClick={handleSave}>
            <CheckIcon />
          </Button>
        ) : (
          <Button onClick={handleEdit} className='bg-white hover:bg-white'>
            <Pencil1Icon color='black'/>
          </Button>
        )}
      </div>
    </div>
  );
};

export default function EncSettings() {
  const [editedData, setEditedData] = useState([
    // Vos données initiales
    {
      "_id": {
      "$oid": "660096a07654baa3c3bed13b"
      },
      "Type": "PFE",
      "Titre": "Intelligence Artificielle",
      "AnneeD": "2020",
      "AnneeF": "2021",
      "Etudiants": [
      "Heti Amina",
      "Soupe Baraka"
      ],
      "Encadrants": [
      {
      "nomComplet": "Boualem Khelouat",
      "_id": "b_khelouat@esi.dz",
      "role": "encadrant"
      },
      {
      "nomComplet": "Fatima Si Tayeb ",
      "_id": "f_sitayeb@esi.dz",
      "role": "co-encadrant"
      }
      ]
     },
     {
      "_id": {
      "$oid": "660097a4c8da1dd8d8c90775"
      },
      "Type": "Doctorat",
      "Titre": "Réseaux",
      "AnneeD": "2022",
      "AnneeF": "2024",
      "Etudiants": [
      "Hassam Amar"
      ],
      "Encadrants": [
      {
      "nomComplet": "KHELOUAT Boualem",
      "_id": "b_khelouat@esi.dz",
      "role": "encadrant"
      },
      {
      "nomComplet": "Ait Kaci Azzou Samira",
      "_id": "Null",
      "role": "Null"
      }
      ]
     }
  ]);

  const handleChange = (key, value, index) => {
    const newData = [...editedData];
    newData[index][key] = value;
    setEditedData(newData);
  };

  return (
    <div className="container mx-auto min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center gap-[330px]">
          <h1 className="text-3xl font-bold">Encadrements</h1>
        </div>

        <div className="grid gap-4 py-4 sm:grid-cols-2">
          {editedData.map((data, index) => (
            <React.Fragment key={index}>
              <div className="border border-gray-300 p-4">
                <EditableField
                  label="Type"
                  value={data.Type}
                  onChange={(value) => handleChange('Type', value, index)}
                />
                <EditableField
                  label="Titre"
                  value={data.Titre}
                  onChange={(value) => handleChange('Titre', value, index)}
                />
                <EditableField
                  label="Année de Début"
                  value={data.AnneeD}
                  onChange={(value) => handleChange('Année de Début', value, index)}
                />
                <EditableField
                  label="Année de Fin"
                  value={data.AnneeF}
                  onChange={(value) => handleChange('Année de Fin', value, index)}
                />
                <EditableField
                  label="Etudiants"
                  value={data.Etudiants}
                  onChange={(value) => handleChange('Etudiants', value, index)}
                />
                <EditableField
                  label="Encadrants"
                  value={data.Encadrants}
                  onChange={(value) => handleChange('Encadrants', value, index)}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
