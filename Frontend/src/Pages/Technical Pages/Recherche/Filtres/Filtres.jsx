import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function Filtres({ searchby }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const phoneRegExp = /^\+?(\d{1,3})?[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
  const schemaChercheur = yup.object().shape({
    nomComplet: yup.string().max(50),
    _id: yup.string().email(),
    tel: yup.string().matches(phoneRegExp, { message: 'Invalid phone number' }),
    GradeEnsegnement: yup.string(),
    GradeRecherche: yup.string(),
    qualité: yup.string().max(50),
    Projet: yup.string().max(50),
    Publication: yup.string().max(50),
    Equipe: yup.string().max(50),
    EtablisementOrigine: yup.string().max(50),
  });
  /*  {
    _id: {
      $oid: '66112c732dd5fcb5d05589b1',
    },
    Date: '2016',
    idCherch: 'a_balla@esi.dz',
    confJourn: 'IDC',
    volume: 'indefini',
    pages: '13-22',
    rang: 3,
    Titre:
      'A Dynamic Model to enhance the Distributed Discovery of services in P2P Overlay Networks.',
    Lien: 'https://doi.org/10.1007/978-3-319-48829-5_2',
    Membres: ['Adel Boukhadra', 'Karima Benatchba', 'Amar Balla'],
    Classement: [],
    __v: 0,
    createdAt: {
      $date: '2024-04-06T11:05:23.060Z',
    },
    updatedAt: {
      $date: '2024-04-06T11:05:23.060Z',
    },
  }, */
  const schemaPublication = yup.object().shape({
    Titre: yup.string().max(50),
    idCherch: yup.string().email(),
    confJourn: yup.string(),
    volume: yup.string(),
    GradeRecherche: yup.string(),
    qualité: yup.string().max(50),
    Projet: yup.string().max(50),
    Publication: yup.string().max(50),
    Equipe: yup.string().max(50),
    EtablisementOrigine: yup.string().max(50),
  });
  const params = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const form = useForm({
    defaultValues: params,
    resolver: yupResolver(
      searchby == 'chercheur' ? schemaChercheur : schemaPublication,
    ),
  });

  const onSubmit = (data) => {
    console.log('Filtres : ', data);
    const searchform = {};
    const formValues = form.getValues();
    formValues.forEach((value, key) => {
      if (value != 0) {
        searchform[key] = value;
      }
    });
    console.log(form.getValues() + ' ' + searchform);
    setSearchParams(searchform);
  };

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {searchby === 'chercheur' ? (
                <Fchercheur form={form} />
              ) : searchby === 'publication' ? (
                <Fpublication form={form} />
              ) : searchby === 'projet' ? (
                <Fprojet form={form} />
              ) : null}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
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
      <FormField
        control={form.control}
        name="GradeEnsegnement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grade d'ensegnement</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le numero de telephone" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
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
            <FormDescription>This is your public display name.</FormDescription>
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
            <FormDescription>This is your public display name.</FormDescription>
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
            <FormDescription>This is your public display name.</FormDescription>
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
            <FormDescription>This is your public display name.</FormDescription>
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
            <FormDescription>This is your public display name.</FormDescription>
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
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="Projet"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Projet</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le numero de telephone" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
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
        name="publication"
        render={({ field }) => (
          <FormItem>
            <FormLabel>publication</FormLabel>
            <FormControl>
              <Input placeholder="entrez la publication" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="m@example.com">m@example.com</SelectItem>
                <SelectItem value="m@google.com">m@google.com</SelectItem>
                <SelectItem value="m@support.com">m@support.com</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

function Fprojet({ form }) {
  return (
    <FormField
      control={form.control}
      name="projet"
      render={({ field }) => (
        <FormItem>
          <FormLabel>project</FormLabel>
          <FormControl>
            <Input placeholder="entrez le projet" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
