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
    <div className={`flex flex-row items-center justify-between w-[350px]`}>
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
          <span>{typeof value === 'string' ? value : JSON.stringify(value)}</span>
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

export default function PubSettings() {
  const [editedData, setEditedData] = useState([
    {
      "_id": {
        "$oid": "66112c732dd5fcb5d05589bd"
      },
      "Date": "2013",
      "idCherch": "a_balla@esi.dz",
      "confJourn": "ICITST",
      "volume": "indefini",
      "pages": "182-187",
      "rang": 3,
      "Titre": "DA5DCSWS: A Distributed Architecture for semantic Web services Discovery and Composition.",
      "Lien": "https://doi.org/10.1109/ICITST.2013.6750188",
      "Membres": [
        "Adel Boukhadra",
        "Karima Benatchba",
        "Amar Balla"
      ],
      "Classement": [],
      "__v": 0,
      "createdAt": {
        "$date": "2024-04-06T11:05:23.061Z"
      },
      "updatedAt": {
        "$date": "2024-04-06T11:05:23.061Z"
      }
    },
    {
      "_id": {
        "$oid": "66112c732dd5fcb5d05589b1"
      },
      "Date": "2016",
      "idCherch": "a_balla@esi.dz",
      "confJourn": "IDC",
      "volume": "indefini",
      "pages": "13-22",
      "rang": 3,
      "Titre": "A Dynamic Model to enhance the Distributed Discovery of services in P2P Overlay Networks.",
      "Lien": "https://doi.org/10.1007/978-3-319-48829-5_2",
      "Membres": [
        "Adel Boukhadra",
        "Karima Benatchba",
        "Amar Balla"
      ],
      "Classement": [],
      "__v": 0,
      "createdAt": {
        "$date": "2024-04-06T11:05:23.060Z"
      },
      "updatedAt": {
        "$date": "2024-04-06T11:05:23.060Z"
      }
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
          <h1 className="text-3xl font-bold">Publications</h1>
        </div>

        <div className="grid gap-4 py-4 sm:grid-cols-2">
          {editedData.map((data, index) => (
            <React.Fragment key={index}>
              <EditableField
                label="Email"
                value={data.idCherch}
                onChange={(value) => handleChange('Email', value, index)}
              />
              <EditableField
                label="Titre"
                value={data.Titre}
                onChange={(value) => handleChange('Titre', value, index)}
              />
              <EditableField
                label="Date"
                value={data.Date}
                onChange={(value) => handleChange('Date', value, index)}
              />
              <EditableField
                label="Conférence/Journal"
                value={data.confJourn}
                onChange={(value) => handleChange('Conférence/Journal', value, index)}
              />
              <EditableField
                label="Volume"
                value={data.volume}
                onChange={(value) => handleChange('Volume', value, index)}
              />
              <EditableField
                label="Pages"
                value={data.pages}
                onChange={(value) => handleChange('Pages', value, index)}
              />
              <EditableField
                label="Membres"
                value={data.Membres}
                onChange={(value) => handleChange('Membres', value, index)}
              />
              <EditableField
                label="Classement"
                value={data.Classement}
                onChange={(value) => handleChange('Classement', value, index)}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
