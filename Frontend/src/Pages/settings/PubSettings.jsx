import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';

const EditableField = ({ id, label, attribut, value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedValue(value);
  };

  const handleSave = async () => {
    setIsEditing(false);
    onChange(editedValue);
    let obj = {};
    obj[attribut] = editedValue;
    console.log(obj);
    // fetch with attribut
    try {
      const result = await axios.put(
        'http://localhost:3000/modification/Publication/' + id,
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

export default function PubSettings() {
  const { userInfo, isLogged } = useOutletContext();
  const [editedData, setEditedData] = useState([]);
  const { id } = useParams();

  const handleChange = (key, value, index) => {
    const newData = [...editedData];
    console.log(newData);
    newData[index][key] = value;
    console.log(index);
    console.log(key);
    console.log(value);

    setEditedData(newData);
  };
  useEffect(() => {
    console.log('id' + id);
    const fetch = async () => {
      try {
        const result = await axios.get(
          'http://localhost:3000/recherche/publication/' + id,
        );
        console.log(result.data.Publications);
        setEditedData([result.data.Publications]);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return isLogged &&
    (editedData.Membres.includes(userInfo.nomComplet) ||
      editedData.idCherch == userInfo._id) ? (
    <div className="container mx-auto min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center gap-[330px]">
          <h1 className="text-3xl font-bold">Publications</h1>
        </div>

        <div className="grid gap-4 py-4 sm:grid-cols-2">
          {editedData.map((data, index) => (
            <React.Fragment key={index}>
              <div className="border border-gray-300 p-4">
                <EditableField
                  id={id}
                  attribut={'idCherch'}
                  label={'Email'}
                  value={data.idCherch}
                  onChange={(value) => handleChange('idCherch', value, index)}
                />
                <EditableField
                  id={id}
                  attribut={'Titre'}
                  label={'Titre'}
                  value={data.Titre}
                  onChange={(value) => handleChange('Titre', value, index)}
                />
                <EditableField
                  id={id}
                  attribut={'Date'}
                  label="Date"
                  value={data.Date}
                  onChange={(value) => handleChange('Date', value, index)}
                />
                <EditableField
                  id={id}
                  attribut={'confJourn'}
                  label={'conferece/Journal'}
                  value={data.confJourn}
                  onChange={(value) => handleChange('confJourn', value, index)}
                />
                <EditableField
                  id={id}
                  attribut={'MaisonEdistion'}
                  label={"Maison D'édition"}
                  value={data.MaisonEdistion}
                  onChange={(value) =>
                    handleChange('MaisonEdistion', value, index)
                  }
                />
                <EditableField
                  id={id}
                  label="volume"
                  attribut={'volume'}
                  value={data.volume}
                  onChange={(value) => handleChange('volume', value, index)}
                />
                <EditableField
                  id={id}
                  label="Pages"
                  attribut={'pages'}
                  value={data.pages}
                  onChange={(value) => handleChange('pages', value, index)}
                />
                <EditableField
                  id={id}
                  attribut={'Membres'}
                  label="Membres"
                  value={data.Membres}
                  onChange={(value) => handleChange('Membres', value, index)}
                />
                <EditableField
                  id={id}
                  attribut={'Classement'}
                  label="Classement"
                  value={data.Classement}
                  onChange={(value) => handleChange('Classement', value, index)}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  ) : null;
}
