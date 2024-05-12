import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { ViewIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Composant pour un champ éditable
const EditableField = ({ label, value, onChange, isPicture, isPassword }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [visible, setVisible] = useState(false);
  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) setEditedValue(value);
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
        <Label htmlFor={label} className="text-right">
          {label}:
        </Label>
        {isEditing ? (
          isPassword ? (
            <>
              <Input
                id={label}
                type={visible ? 'text' : 'password'}
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
              />
              <Button onClick={handleSave}>
                <CheckIcon />
              </Button>
              <Button onClick={() => setVisible(!visible)}>
                <ViewIcon />
              </Button>
            </>
          ) : (
            <>
              <Input
                id={label}
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
              />
              <Button onClick={handleSave}>
                <CheckIcon />
              </Button>
            </>
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
        <Button onClick={handleEdit} className="bg-white hover:bg-white">
          <Pencil1Icon color="black" />
        </Button>
      </div>
    </div>
  );
};

export default function AdminPLayout() {
  const [editedData, setEditedData] = useState({
    _id: '',
    nomComplet: '',
    user: '',
    password: '',
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/recherche/chercheur/${id}`,
        );
        console.log(result.data.Chercheur);
        setEditedData(result.data.Chercheur);
        return result;
      } catch (err) {
        console.log('error');
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (key, value) => {
    setEditedData({ ...editedData, [key]: value });
  };

  return (
    <div className="container mx-auto min-h-screen bg-white px-4 py-8">
      <div className="bg-white p-8">
        <div className="m-6 grid grid-cols-2 gap-x-12 gap-y-6 p-4">
          <div className="flex flex-col">
            <h2 className="font-bold">Nom complet:</h2>
            {/* {console.log("id"+_id)} */}
            <span>{editedData.nomComplet}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Nom d'utilisateur:</h2>
            <span>{editedData.user}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Email:</h2>
            <span>{editedData._id}</span>
          </div>
        </div>
      </div>
      <Dialog>
        <DialogContent className="p-8 sm:max-w-[900px]">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 flex items-center gap-[330px]">
              <h1 className="text-3xl font-bold">Profil</h1>
            </div>
            <div className="bg-white p-8">
              <div className="m-6 grid grid-cols-2 gap-x-12 gap-y-6 p-4">
                <div className="flex flex-col">
                  <h2 className="font-bold">Nom complet:</h2>
                  <span>{editedData.nomComplet}</span>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Nom d'utilisateur:</h2>
                  <span>{editedData.user}</span>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Email:</h2>
                  <span>{editedData._id}</span>
                </div>
              </div>
            </div>
            <div className="grid gap-4 py-4 sm:grid-cols-2">
              <EditableField
                label="Nom complet"
                key="_id"
                value={editedData.nomComplet}
                onChange={(value) => handleChange('nomComplet', value)}
              />
              <EditableField
                label="Nom d'utilisateur"
                key="user"
                value={editedData.user}
                onChange={(value) => handleChange('user', value)}
              />
              <EditableField
                label="Email"
                value={editedData._id}
                onChange={(value) => handleChange('_id', value)}
              />
              <EditableField
                label="Password"
                isPassword
                value={editedData.password}
                onChange={(value) => handleChange('password', value)}
              />
            </div>
          </div>
        </DialogContent>
        <DialogTrigger asChild>
          <Button variant="outline">Modifier</Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
}
