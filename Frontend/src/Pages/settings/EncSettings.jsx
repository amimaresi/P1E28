import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';
import NotAllowed from '../NotAllowed/NotAllowed';
const EditableField = ({ attribut, id, label, value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedValue(value);
  };

  const handleSave = async () => {
    setIsEditing(false);
    onChange(editedValue);
    // fetch with key
    let obj = {};
    obj[attribut] = editedValue;
    try {
      const result = await axios.put(
        'http://localhost:3000/modification/encadrement/' + id,
        obj,
        { withCredentials: true },
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex w-[350px] flex-row items-center justify-between">
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
          <Button onClick={handleEdit} className="bg-white hover:bg-white">
            <Pencil1Icon color="black" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default function EncSettings() {
  const [editedData, setEditedData] = useState([]);
  const { userInfo, isLogged } = useOutletContext();
  const { id } = useParams();
  console.log(id);

  const handleChange = (key, value, index) => {
    const newData = [...editedData];
    newData[index][key] = value;
    setEditedData(newData);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(
          'http://localhost:3000/recherche/encadrement/' + id,
        );
        console.log(result.data.Encadrement);
        setEditedData([result.data.Encadrement]);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return isLogged && editedData.Encadrants.includes(userInfo._id) ? (
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
                  id={id}
                  attribut="Type"
                  label="Type"
                  value={data.Type}
                  onChange={(value) => handleChange('Type', value, index)}
                />
                <EditableField
                  id={id}
                  attribut="Titre"
                  label="Titre"
                  value={data.Titre}
                  onChange={(value) => handleChange('Titre', value, index)}
                />
                <EditableField
                  id={id}
                  attribut="AnneeD"
                  label="Année de Début"
                  value={data.AnneeD}
                  onChange={(value) => handleChange('AnneeD', value, index)}
                />
                <EditableField
                  id={id}
                  attribut="AnneeF"
                  label="Année de Fin"
                  value={data.AnneeF}
                  onChange={(value) => handleChange('AnneeF', value, index)}
                />
                <EditableField
                  id={id}
                  attribut="Etudiants"
                  label="Etudiants"
                  value={data.Etudiants}
                  onChange={(value) => handleChange('Etudiants', value, index)}
                />
                <EditableField
                  id={id}
                  attribut="Encadrants"
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
  ) : (
    <NotAllowed />
  );
}
