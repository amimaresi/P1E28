import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import axios from 'axios';
import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

export default function Filtres({ searchby, onSubmit }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const form = useForm({
    defaultValues:
      searchby == 'publication'
        ? {
            ...params,
            Date: [
              params.DateMin ? params.DateMin : 2000,
              params.DateMin ? params.DateMax : new Date().getFullYear(),
            ],
          }
        : searchby == 'encadrement'
          ? {
              ...params,
              AnneeD: [
                params.AnneeDMin ? params.AnneeDMin : 2000,
                params.AnneeDMan ? params.AnneeDMax : new Date().getFullYear(),
              ],
              AnneeF: [
                params.AnneeFMin ? params.AnneeFMin : 2000,
                params.AnneeFMax
                  ? params.AnneeFMax
                  : new Date().getFullYear() + 6,
              ],
            }
          : searchby == 'projet'
            ? {
                ...params,
                DateDebut: [
                  params.DateDebutMin ? params.DateDebutMin : 2000,
                  params.DateDebutMan
                    ? params.DateDebutMax
                    : new Date().getFullYear(),
                ],
                DateFin: [
                  params.DateFinMin ? params.DateFinMin : 2000,
                  params.DateFinMax
                    ? params.DateFinMax
                    : new Date().getFullYear() + 10,
                ],
              }
            : { ...params },
    resolver: yupResolver(
      searchby == 'chercheur'
        ? schema.Chercheur
        : searchby == 'Publication' //cap
          ? schema.Publication
          : searchby == 'encadrement'
            ? schema.Encadrement
            : searchby == 'projet'
              ? schema.Projet
              : schema.ConfJourn,
    ),
  });
  function onError() {
    console.log('error');
  }
  return (
    <>
      <Sheet>
        <SheetTrigger className="m-10 rounded-xl bg-buttonDark px-6 py-[5px] text-[18px] text-textLight hover:bg-black">
          Filtres
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Filtres</SheetTitle>
          </SheetHeader>

          <ScrollArea className="h-[98%] w-[355px] pr-5">
            {' '}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="space-y-8"
              >
                {searchby === 'chercheur' ? (
                  <Fchercheur form={form} />
                ) : searchby === 'publication' ? (
                  <Fpublication form={form} />
                ) : searchby === 'projet' ? (
                  <Fprojet form={form} />
                ) : searchby === 'encadrement' ? (
                  <FEncadrement form={form} />
                ) : (
                  <FConfJourn form={form} />
                )}
                <Button type="submit">Filtrer</Button>
              </form>
            </Form>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <DevTool control={form.control} />
    </>
  );
}

function Fchercheur({ form }) {
  return (
    <>
      <FormField
        control={form.control}
        name="nomComplet"
        render={({ field }) => (
          <>
            <FormItem>
              <FormLabel>Nom Complet</FormLabel>
              <FormControl>
                <Input placeholder="Entrez le nom du chercheur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          </>
        )}
      />
      <FormField
        control={form.control}
        name="_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le nom du chercheur" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Separator />
      <FormField
        control={form.control}
        name="GradeEnsegnement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grade d'ensegnement</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un grade" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Null">Choisir un grade</SelectItem>
                <SelectItem value="Professeur">Professeur</SelectItem>
                <SelectItem value="MCA">MCA</SelectItem>
                <SelectItem value="MCB">MCB</SelectItem>
                <SelectItem value="MAA">MAA</SelectItem>
                <SelectItem value="MAB">MAB</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="GradeRecherche"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grade de recherche</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un grade" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Null">Choisir un grade</SelectItem>
                <SelectItem value="Directeur de recherche">
                  Directeur de recherche
                </SelectItem>
                <SelectItem value="Maitre de recherche">
                  Maitre de recherche
                </SelectItem>
                <SelectItem value="Charge de recherche">
                  Charge de recherche
                </SelectItem>
                <SelectItem value="Attache de recherche">
                  Attache de recherche
                </SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="qualité"
        render={({ field }) => (
          <FormItem>
            <FormLabel>qualité</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le numero de telephone" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="EtablissementOrigine"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Etablissement d'origine</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le numero de telephone" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="Diplome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Diplome</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le diplome" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="Equipe"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Equipe</FormLabel>
            <FormControl>
              <Input placeholder="Entrez l'equipe'" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />
      <FormField
        control={form.control}
        name="H_index"
        render={({ field }) => (
          <FormItem>
            <FormLabel>H index</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le H-index" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="Matricule"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Matricule</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le Matricule" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

function Fpublication({ form }) {
  return (
    <>
      <FormField
        control={form.control}
        name="Titre"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Titre</FormLabel>
            <FormControl>
              <Input placeholder="entrez le titre" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="idCherch"
        render={({ field }) => (
          <FormItem>
            <FormLabel>chercheur (Email)</FormLabel>
            <FormControl>
              <Input placeholder="entrez l'email'" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confJourn"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Conferance / Journal</FormLabel>
            <FormControl>
              <Input placeholder="entrez le mot clé" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <Separator />
      <FormField
        control={form.control}
        name="Date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <Slider
                defaultValue={[2000, new Date().getFullYear()]}
                max={new Date().getFullYear()}
                min={2000}
                step={1}
                onValueChange={field.onChange}
                {...field}
                className="w-[90%]"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <Separator />
      <FormField
        control={form.control}
        name="MaisonEdition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Maison d'edition</FormLabel>
            <FormControl>
              <Input placeholder="entrez le mot clé" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
    /* {
    Titre: yup.string().max(50),
    idCherch: yup.string().email(),
    confJourn: yup.string(),
    volume: yup.string(),
    pages: yup.number(),
    Date: yup.string(),
    MaisonEdition: yup.string(),
    Classement: yup.string(),
  } */
  );
}

function Fprojet({ form }) {
  return (
    <>
      <FormField
        control={form.control}
        name="_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numero de Projet</FormLabel>
            <FormControl>
              <Input placeholder="entrez le numero du projet" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="Titre"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Titre</FormLabel>
            <FormControl>
              <Input placeholder="entrez le Titre" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />
      <FormField
        control={form.control}
        name="ChefDeProjet"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Chef De Projet</FormLabel>
            <FormControl>
              <Input
                placeholder="Entrez l'email du chef de projet"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="Mombre"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mombre (pas Chef)</FormLabel>
            <FormControl>
              <Input placeholder="entrez l'Email d'un Mombre " {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Separator />

      <FormField
        control={form.control}
        name="DateDebut"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date de debut</FormLabel>
            <FormControl>
              <Slider
                defaultValue={[2000, new Date().getFullYear()]}
                max={new Date().getFullYear()}
                min={2000}
                step={1}
                onValueChange={field.onChange}
                {...field}
                className="w-[90%]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="DateFin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date de fin</FormLabel>
            <FormControl>
              <Slider
                defaultValue={[2000, new Date().getFullYear() + 10]}
                max={new Date().getFullYear() + 10}
                min={2000}
                step={1}
                onValueChange={field.onChange}
                {...field}
                className="w-[90%]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

function FEncadrement({ form }) {
  return (
    <>
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Null">Choisir un type</SelectItem>
                <SelectItem value="PFE">PFE</SelectItem>
                <SelectItem value="Master2">Master 2</SelectItem>
                <SelectItem value="Doctorat">Doctorat</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <Separator />
      <FormField
        control={form.control}
        name="EmailEncadrant"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Encadrant (Email)</FormLabel>
            <FormControl>
              <Input placeholder="entrez l'email d'un encadrant" {...field} />
            </FormControl>
            <FormDescription>
              !! le meme encadrant pour l'email/nom/role
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="NomEncadrant"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Encadrement (Nom)</FormLabel>
            <FormControl>
              <Input placeholder="entrez le nom de l'encadrant" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Separator />
      <FormField
        control={form.control}
        name="Etudiant"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Etudiant</FormLabel>
            <FormControl>
              <Input placeholder="entrez le mot clé" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Separator />
      <FormField
        control={form.control}
        name="AnneeD"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Annee Debut</FormLabel>
            <FormControl>
              <Slider
                defaultValue={[2000, new Date().getFullYear()]}
                max={new Date().getFullYear()}
                min={2000}
                step={1}
                onValueChange={field.onChange}
                {...field}
                className="w-[90%]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="AnneeF"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Annee Fin</FormLabel>
            <FormControl>
              <Slider
                defaultValue={[2000, new Date().getFullYear() + 6]}
                max={new Date().getFullYear()}
                min={2000}
                step={1}
                onValueChange={field.onChange}
                {...field}
                className="w-[90%]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
function FConfJourn({ form }) {
  return (
    <>
      <FormField
        control={form.control}
        name="_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Acronyme</FormLabel>
            <FormControl>
              <Input placeholder="entrez l'acronyme" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Null">Choisir un type</SelectItem>
                <SelectItem value="Conference">Conference</SelectItem>
                <SelectItem value="Workshop Papers">Workshop Papers</SelectItem>
                <SelectItem value="Journal Articles">
                  Journal Articles
                </SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />{' '}
      <FormField
        control={form.control}
        name="nom"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input placeholder="entrez le nom" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

const schema = {
  Chercheur: yup.object().shape({
    nomComplet: yup.string().max(50),
    _id: yup.string().email(),
    GradeEnsegnement: yup.string(),
    GradeRecherche: yup.string(),
    qualité: yup.string().max(50),
    Equipe: yup.string().max(50),
    EtablisementOrigine: yup.string().max(50),
    H_index: yup
      .number('entrez un nombre entier')
      .integer('entrez un nombre entier')
      .nullable(true)
      .transform((_, val) => (val == Number(val) ? Number(val) : null)),
    Matricule: yup.string(),
  }),
  Projet: yup.object().shape({
    _id: yup
      .number('entrez un nombre entier')
      .integer('entrez un nombre entier')
      .nullable(true)
      .transform((_, val) => (val == Number(val) ? Number(val) : null)),
    Titre: yup.string(),
    ChefDeProjet: yup.string().email(),
    Mombre: yup.string().email(),

    DateDebut: yup.array().of(yup.number()),
    DateFin: yup.array().of(yup.number()),
  }),
  Encadrement: yup.object().shape({
    Type: yup.string(),
    EmailEncadrant: yup.string().email(),
    NomEncadrant: yup.string(),
    Etudiant: yup.string(),
    AnneeD: yup.array().of(yup.number()),
    AnneeF: yup.array().of(yup.number()),
  }),
  ConfJourn: yup.object().shape({
    _id: yup.string().max(50),
    type: yup.string(),
    nom: yup.string(),
  }),
  Publication: yup.object().shape({
    Titre: yup.string().max(50),
    idCherch: yup.string().email(),
    confJourn: yup.string(),
    Date: yup.array().of(yup.number()),
    GradeRecherche: yup.string(),
    MaisonEdition: yup.string(),
  }),
};
