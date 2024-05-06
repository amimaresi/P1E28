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
    <div className={`flex w-[350px] flex-row items-center justify-between`}>
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
                  <li key={index}>{item}</li>
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
          <Button onClick={handleEdit} className="bg-white hover:bg-white">
            <Pencil1Icon color="black" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default function ProSettings() {
  const [editedData, setEditedData] = useState([
    // Vos données initiales
    {
      _id: { $numberInt: '2' },
      Titre: 'ALGORITHMS AND DATA STRUCTURES',
      ChefDeProjet: 'k_benatchba@esi.dz',
      liste_members: [
        'a_balla@esi.dz',
        'mouloud.koudil@esi.dz',
        'b_khelouat@esi.dz',
      ],
      DateDebut: '20/3/2024',
      DateFin: '23/5/2024',
      Theme: 'ALGORTIHMS ANALYSIS',
      createdAt: { $date: { $numberLong: '1712474730446' } },
      updatedAt: { $date: { $numberLong: '1712474730446' } },
      __v: { $numberInt: '0' },
    },
    {
      _id: { $numberInt: '3' },
      Titre: 'ALGORITHMS AND DATA STRUCTURES ',
      ChefDeProjet: 'k_benatchba@esi.dz',
      liste_members: [
        'a_balla@esi.dz',
        'mouloud.koudil@esi.dz',
        'b_khelouat@esi.dz',
      ],
      DateDebut: '20/3/2024',
      DateFin: '23/5/2024',
      Theme: 'ALGORTIHMS ANALYSIS',
      createdAt: { $date: { $numberLong: '1712474780801' } },
      updatedAt: { $date: { $numberLong: '1712474780801' } },
      __v: { $numberInt: '0' },
    },
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
          <h1 className="text-3xl font-bold">Projets</h1>
        </div>

        <div className="grid gap-4 py-4 sm:grid-cols-2">
          {editedData.map((data, index) => (
            <div key={index} className="border border-gray-300 p-4">
              <React.Fragment>
                <EditableField
                  label="Titre"
                  value={data.Titre}
                  onChange={(value) => handleChange('Titre', value, index)}
                />
                <EditableField
                  label="Chef De Projet"
                  value={data.ChefDeProjet}
                  onChange={(value) =>
                    handleChange('Chef De Projet', value, index)
                  }
                />
                <EditableField
                  label="Listes des membres"
                  value={data.liste_members}
                  onChange={(value) =>
                    handleChange('Listes des membres', value, index)
                  }
                />
                <EditableField
                  label="Date de Début"
                  value={data.DateDebut}
                  onChange={(value) =>
                    handleChange('Date de Début', value, index)
                  }
                />
                <EditableField
                  label="Date du Fin"
                  value={data.DateFin}
                  onChange={(value) =>
                    handleChange('Date du Fin', value, index)
                  }
                />
                <EditableField
                  label="Theme"
                  value={data.Theme}
                  onChange={(value) => handleChange('Theme', value, index)}
                />
              </React.Fragment>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
