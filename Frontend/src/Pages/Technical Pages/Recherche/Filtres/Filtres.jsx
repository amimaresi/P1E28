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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';

export default function Filtres() {
  const form = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log('searchparams : ', searchParams);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const searchby = searchParams.get('searchby');
  return (
    <>
      <Sheet>
        <SheetTrigger className=" m-10 h-7 w-12 rounded bg-buttonDark text-textLight hover:bg-black">
          Open
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
    <FormField
      control={form.control}
      name="chercheur"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function Fpublication({ form }) {
  return (
    <FormField
      control={form.control}
      name="publication"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function Fprojet({ form }) {
  return (
    <FormField
      control={form.control}
      name="projet"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
