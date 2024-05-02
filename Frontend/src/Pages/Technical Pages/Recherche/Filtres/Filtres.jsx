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
//import { c } from 'vite/dist/node/types.d-aGj9QkWt';

export default function Filtres({ searchby  , onSubmit}) {
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

  // const onSubmit = async (data) => {
    
   
  //   console.log('Filtres : ', data);
  //   const searchform = {};
    
  //   Object.entries(data).forEach((value, key) => {
  //     if (value != 0) {
  //       searchform[key] = value;
  //     }
  //   });
  //   console.log(form.getValues() + ' ' + searchform);
    

  //   setSearchParams(searchform);
  //   try{
  //     const resultat = await axios.post(
  //       `http://localhost:3000/recherche/Chercheur`, data );
  //         console.log(res.data);
          
  //   }
  //   catch(err){
  //     console.log(err.message);
  //   }
  // };

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
                onSubmit={form.handleSubmit(onSubmit) }
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
      />{' '}
      <FormField
        control={form.control}
        name="contact"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact (Tel)</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le numero de telephone" {...field} />
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
            <FormControl>
              <Input placeholder="Entrez le numero de telephone" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="GradeRecherche"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grade de recherche</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le numero de telephone" {...field} />
            </FormControl>
            <FormMessage />
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
              <Input placeholder="Entrez le numero de telephone" {...field} />
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
              <Input placeholder="Entrez le numero de telephone" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="Publication"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Publication</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le numero de telephone" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="projet"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Projet</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le numero de telephone" {...field} />
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
              <Input placeholder="Entrez le numero de telephone" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="orcid"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Orcid</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le numero de telephone" {...field} />
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
              <Input placeholder="entrez le titre" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />{' '}
      <Separator />
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
      <FormField
        control={form.control}
        name="volume"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Volume</FormLabel>
            <FormControl>
              <Input placeholder="entrez le mot clé" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="pages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pages</FormLabel>
            <FormControl>
              <Input placeholder="entrez le numero des pages" {...field} />
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
      />{' '}
      <Separator />
      <FormField
        control={form.control}
        name="Classement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Classement</FormLabel>
            <FormControl>
              <Input placeholder="entrez le classement" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />{' '}
      <FormField
        control={form.control}
        name="rang"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rang</FormLabel>
            <FormControl>
              <Input placeholder="entrez le rang" {...field} />
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
            <FormLabel>Projet ID</FormLabel>
            <FormControl>
              <Input placeholder="entrez l'ID du projet" {...field} />
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
      <FormField
        control={form.control}
        name="Theme"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Theme</FormLabel>
            <FormControl>
              <Input placeholder="entrez le theme" {...field} />
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
            <FormLabel>Projet ID</FormLabel>
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
        name="_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Encadrement ID</FormLabel>
            <FormControl>
              <Input placeholder="entrez l'ID de l'encadrement" {...field} />
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
              <Input placeholder="entrez le titre" {...field} />
            </FormControl>
            <FormMessage />
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
      />{' '}
      <FormField
        control={form.control}
        name="roleEncadrant"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Encadrement (Role)</FormLabel>
            <FormControl>
              <Input placeholder="entrez le role de l'encadrant" {...field} />
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
            <FormLabel>ID</FormLabel>
            <FormControl>
              <Input placeholder="entrez l'ID" {...field} />
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
            <FormControl>
              <Input placeholder="entrez le type" {...field} />
            </FormControl>
            <FormMessage />
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
      <FormField
        control={form.control}
        name="periodicite"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Periodicité</FormLabel>
            <FormControl>
              <Input placeholder="entrez la periodicité" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

const phoneRegExp = /^\+?(\d{1,3})?[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
const schema = {
  Chercheur: yup.object().shape({
    nomComplet: yup.string().max(50),
    _id: yup.string().email(),
    cantact: yup
      .string()
      .matches(phoneRegExp, { message: 'Invalid phone number' }),
    GradeEnsegnement: yup.string(),
    GradeRecherche: yup.string(),
    qualité: yup.string().max(50),
    projet: yup.string().max(50),
    Publication: yup.string().max(50),
    Equipe: yup.string().max(50),
    EtablisementOrigine: yup.string().max(50),
    H_index: yup.number(),
    orcid: yup.string(),
    Matricule: yup.string(),
  }),
  Projet: yup.object().shape({
    _id: yup.number(),
    Titre: yup.string(),
    ChefDeProjet: yup.string().email(),
    Mombre: yup.string().email(),

    DateDebut: yup.array().of(yup.number()),
    DateFin: yup.array().of(yup.number()),
    Theme: yup.number(),
  }),
  Encadrement: yup.object().shape({
    Type: yup.string().max(50),
    Titre: yup.string(),
    EmailEncadrant: yup.string().email(),
    NomEncadrant: yup.string(),
    roleEncadrant: yup.string(),
    Etudiant: yup.string(),
    _id: yup.string(),
    AnneeD: yup.array().of(yup.number()),
    AnneeF: yup.array().of(yup.number()),
  }),
  ConfJourn: yup.object().shape({
    _id: yup.string().max(50),
    type: yup.string(),
    nom: yup.string(),
    periodicite: yup.string(),
  }),
  Publication: yup.object().shape({
    Titre: yup.string().max(50),
    idCherch: yup.string().email(),
    confJourn: yup.string(),
    volume: yup.string(),
    pages: yup.number(),
    Date: yup.array().of(yup.number()),
    GradeRecherche: yup.string(),
    MaisonEdition: yup.string(),
    Classement: yup.string(),
    rang: yup.string(),
  }),
};
