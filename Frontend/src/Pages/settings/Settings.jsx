import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ViewIcon } from 'lucide-react';
import NotFound from '../NotFound/NotFound';
import axios from 'axios';
import { set } from 'react-hook-form';

// Composant pour un champ éditable
const EditableField = ({
  _id,
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

  const handleSave = async () => {
    setIsEditing(false);
    onChange(editedValue);
    // fetch with key
    let obj = {};
    obj[label] = editedValue;
    console.log(obj);
    console.log('base de donne' + _id);
    try {
      const result = await axios.put(
        `http://localhost:3000/modification/chercheur/${_id}`,
        obj,
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
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
  const [_id, setId] = useState('');
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
  useEffect(() => {
    //localStorage.setItem('user', 'y_aissaoui@esi.dz') ca just pour test
    const _id = localStorage.getItem('user.Chercheur._id');
    console.log(_id);
    setId(_id);
    const fetch = async () => {
      try {
        const result = await axios.get(
          'http://localhost:3000/recherche/chercheur/' + _id,
        );
        console.log(result.data.Chercheur);
        setEditedData(result.data.Chercheur);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);
  const handleChange = (key, value) => {
    // console.log("here is the mail "  + _id)
    setEditedData({ ...editedData, [key]: value });
  };

  return editedData ? (
    <div className="container mx-auto min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center gap-[330px]">
          <h1 className="text-3xl font-bold">Profil</h1>
          <EditableField
            _id={_id}
            label="image_path"
            isPicture
            value={editedData.image_path}
            onChange={(value) => handleChange('image_path', value)}
          />
        </div>

        <div className="grid gap-4 py-4 sm:grid-cols-2">
          <EditableField
            _id={_id}
            label="nomComplet"
            key="_id"
            value={editedData.nomComplet}
            onChange={(value) => handleChange('nomComplet', value)}
          />
          <EditableField
            _id={_id}
            label="Qualité"
            value={editedData.qualité}
            onChange={(value) => handleChange('Qualité', value)}
          />
          <EditableField
            _id={_id}
            label="EtablissementOrigine"
            value={editedData.EtablissementOrigine}
            onChange={(value) => handleChange('EtablissementOrigine', value)}
          />
          <EditableField
            _id={_id}
            label="Diplome"
            value={editedData.Diplome}
            onChange={(value) => handleChange('Diplome', value)}
          />
          <EditableField
            _id={_id}
            label="GradeRecherche"
            value={editedData.GradeRecherche}
            onChange={(value) => handleChange('GradeRecherche', value)}
          />
          <EditableField
            _id={_id}
            label="Email"
            value={editedData._id}
            onChange={(value) => handleChange('_id', value)}
          />
          <EditableField
            _id={_id}
            label="GradeEnsegnement"
            value={editedData.GradeEnsegnement}
            onChange={(value) => handleChange('GradeEnsegnement', value)}
          />
          <EditableField
            _id={_id}
            label="H_index"
            value={editedData.H_index}
            onChange={(value) => handleChange('H_index', value)}
          />
          <EditableField
            _id={_id}
            label="Equipe"
            value={editedData.Equipe}
            onChange={(value) => handleChange('Equipe', value)}
          />
          <EditableField
            _id={_id}
            label="contact"
            value={editedData.tel}
            onChange={(value) => handleChange('tel', value)}
          />
          <EditableField
            _id={_id}
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
