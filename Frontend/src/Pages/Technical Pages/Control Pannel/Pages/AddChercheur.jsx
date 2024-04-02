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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
export default function Filtres() {
  const schema = yup.object().shape({
    chercheur: yup.string().required(),
  });

  const form = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Filtres : ', data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="chercheur"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>chercheur</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="entrez le nom du chercheur"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <DevTool control={form.control} />
    </>
  );
}
