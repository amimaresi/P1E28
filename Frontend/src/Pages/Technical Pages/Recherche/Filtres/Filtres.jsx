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
    email: yup.string().email(),
    tel: yup.string().matches(phoneRegExp, { message: 'Invalid phone number' }),
    gradeEnsegnement: yup.string(),
    gradeRecherche: yup.string(),
    qualite: yup.string().max(50),
    projet: yup.string().max(50),
    equipe: yup.string().max(50),
    etablisementOrigine: yup.string().max(50),
  });

  const params = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const form = useForm({
    defaultValues: params,
    resolver: yupResolver(schemaChercheur),
  });

  const onSubmit = (data) => {
    console.log('Filtres : ', data);
    setSearchParams(form.getValues());
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
              <FormLabel>nomComplet</FormLabel>
              <FormControl>
                <Input placeholder="Entrez le nom du chercheur" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>email</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le nom du chercheur" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>tel</FormLabel>
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
