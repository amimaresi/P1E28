import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Informations() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
  });

  useEffect(() => {
    // Fetch data here
    // setData(fetchedData)
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleChange = (key, value) => {
    setEditedData({ ...editedData, [key]: value });
  };

  const handleSubmit = () => {
    // Submit editedData to backend
    // setIsSubmitting(true);
    // perform submission logic
    // setIsSubmitting(false);
    setIsEditing(false); // Exit editing mode after submission
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Dialog>
          <div className="mb-10 flex items-center gap-[330px]">
            <h1 className="text-3xl font-bold">Profil</h1>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-buttonDark"
                onClick={handleEditProfile}
              >
                Modifier
              </Button>
            </DialogTrigger>
          </div>

          <DialogContent className="sm:max-w-[900px]">
            <DialogHeader>
              <DialogTitle>Modifier le profil</DialogTitle>
              <DialogDescription>
                Modifiez votre profile ici. Cliquez sur Sauvegarder lorsque vous
                avez terminé.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 sm:grid-cols-2">
              <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-4">
                <Label htmlFor="nomComplet" className="text-right">
                  Nom complet:
                </Label>
                <Input
                  id="nomComplet"
                  value={editedData.nomComplet}
                  onChange={(e) => handleChange('nomComplet', e.target.value)}
                  className="col-span-2 sm:col-span-3"
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-4">
                <Label htmlFor="qualité" className="text-right">
                  Qualité:
                </Label>
                <Input
                  id="qualité"
                  value={editedData.qualité}
                  onChange={(e) => handleChange('qualité', e.target.value)}
                  className="col-span-2 sm:col-span-3"
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-4">
                <Label htmlFor="EtablissementOrigine" className="text-right">
                  Etablissement d'origine:
                </Label>
                <Input
                  id="EtablissementOrigine"
                  value={editedData.EtablissementOrigine}
                  onChange={(e) =>
                    handleChange('EtablissementOrigine', e.target.value)
                  }
                  className="col-span-2 sm:col-span-3"
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-4">
                <Label htmlFor="Diplome" className="text-right">
                  Diplôme:
                </Label>
                <Input
                  id="Diplome"
                  value={editedData.Diplome}
                  onChange={(e) => handleChange('Diplome', e.target.value)}
                  className="col-span-2 sm:col-span-3"
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-4">
                <Label htmlFor="GradeRecherche" className="text-right">
                  Grade de recherche:
                </Label>
                <Input
                  id="GradeRecherche"
                  value={editedData.GradeRecherche}
                  onChange={(e) =>
                    handleChange('GradeRecherche', e.target.value)
                  }
                  className="col-span-2 sm:col-span-3"
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-4">
                <Label htmlFor="_id" className="text-right">
                  Email:
                </Label>
                <Input
                  id="_id"
                  value={editedData._id}
                  onChange={(e) => handleChange('_id', e.target.value)}
                  className="col-span-2 sm:col-span-3"
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-4">
                <Label htmlFor="GradeEnsegnement" className="text-right">
                  Grade ensegnement:
                </Label>
                <Input
                  id="GradeEnsegnement"
                  value={editedData.GradeEnsegnement}
                  onChange={(e) =>
                    handleChange('GradeEnsegnement', e.target.value)
                  }
                  className="col-span-2 sm:col-span-3"
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-4">
                <Label htmlFor="H_index" className="text-right">
                  H_index:
                </Label>
                <Input
                  id="H_index"
                  value={editedData.H_index}
                  onChange={(e) => handleChange('H_index', e.target.value)}
                  className="col-span-2 sm:col-span-3"
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-4">
                <Label htmlFor="Equipe" className="text-right">
                  Equipe:
                </Label>
                <Input
                  id="Equipe"
                  value={editedData.Equipe}
                  onChange={(e) => handleChange('Equipe', e.target.value)}
                  className="col-span-2 sm:col-span-3"
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-4">
                <Label htmlFor="tel" className="text-right">
                  Téléphone:
                </Label>
                <Input
                  id="tel"
                  value={editedData.tel}
                  onChange={(e) => handleChange('tel', e.target.value)}
                  className="col-span-2 sm:col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" onClick={handleSubmit}>
                Sauvegarder
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
          <div className="flex flex-col">
            <h2 className="font-bold">Nom complet:</h2>
            <span>{editedData.nomComplet}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Qualité:</h2>
            <span>{editedData.qualité}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Etablissement d'origine:</h2>
            <span>{editedData.EtablissementOrigine}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Diplôme:</h2>
            <span>{editedData.Diplome}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Grade de recherche:</h2>
            <span>{editedData.GradeRecherche}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Email:</h2>
            <span>{editedData._id}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Grade enseignement:</h2>
            <span>{editedData.GradeEnsegnement}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">H_index:</h2>
            <span>{editedData.H_index}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Equipe:</h2>
            <span>{editedData.Equipe}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Téléphone:</h2>
            <span>{editedData.tel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
