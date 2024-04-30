import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
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
    nom: yup.string().required('le nom est requis'),
    prenom: yup.string().required('le prenom est requis'),
    email: yup
      .string()
      .email('email format is not valid')
      .required(" l'email est requis"),
    diplome: yup.string().required('le diplome est requis'),
    etablissementdorigine: yup
      .string()
      .required(" l'etabliisement d'origine est requis "),
    gradeenseignement: yup
      .string()
      .required(' le  grade-enseignement est requis '),
    graderecherche: yup.string().required(' le grade-recherche est requis '),
    qualitee: yup.string().required(' la qualitee est requise '),
    hIndex: yup.number(),
    equipe: yup.string(),
    lien: yup.string(),
    projet: yup.string(),
  });

  const form = useForm({
    defaultValues: {
      nom: '',
      prenom: '',
      email: '',
      diplome: '',
      etablissementdorigine: '',
      gradeenseignement: 'professeur',
      graderecherche: 'directeur de recherche',
      qualitee: 'enseignant-chercheur',
      hIndex: '',
      equipe: '',
      lien: '',
      projet: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Filtres : ', data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="p-5 text-center ">
            <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
              Ajouter un nouveau chercheur
            </h1>
          </div>
          <h2 className="text-1xl text-center font-bold dark:text-white">
            les informations personnelles
          </h2>
          <hr className="my-8 h-px border-0  bg-black bg-opacity-50 "></hr>
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start  pt-5">
                    <div className="pl-5 pr-9 ">
                      <FormLabel>Nom :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder="entrez le nom "
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            control={form.control}
            name="prenom"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>prénom :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder="entrez le prénom "
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start  ">
                    <div className="pl-5 pr-9 ">
                      <FormLabel>Email :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder="entrez l'email "
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <h2 className="text-1xl text-center font-bold dark:text-white">
            les informations professionnelles
          </h2>
          <hr className="my-8 h-px border-0  bg-black bg-opacity-50 "></hr>
          <FormField
            control={form.control}
            name="gradeenseignement"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>grade enseignement :</FormLabel>
                    </div>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <div className="pl-6">
                          <SelectTrigger className="h-7 w-[180px] rounded-full pl-6">
                            <SelectValue placeholder="choisissez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professeur">
                              Professeur
                            </SelectItem>
                            <SelectItem value="mca">MCA</SelectItem>
                            <SelectItem value="mcb">MCB</SelectItem>
                            <SelectItem value="maa">MAA</SelectItem>
                            <SelectItem value="mab">MAB</SelectItem>
                            <SelectItem value="null">NULL</SelectItem>
                          </SelectContent>
                        </div>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="graderecherche"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>grade recherche :</FormLabel>
                    </div>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <div className="pl-6">
                          <SelectTrigger className="h-7 w-[180px] rounded-full pl-6">
                            <SelectValue placeholder="choisissez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="directeur de recherche">
                              Directeur de recherche
                            </SelectItem>
                            <SelectItem value="maitre de recherche">
                              Maitre de recherche
                            </SelectItem>
                            <SelectItem value="charge de recherche">
                              Charge de recherche
                            </SelectItem>
                            <SelectItem value="attache de recherche">
                              Attache de recherche
                            </SelectItem>
                            <SelectItem value="null">NULL</SelectItem>
                          </SelectContent>
                        </div>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="diplome"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>diplome :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" "
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            control={form.control}
            name="etablissementdorigine"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>etablissement d origine :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" "
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            control={form.control}
            name="qualitee"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>qualitee:</FormLabel>
                    </div>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <div className="pl-6">
                          <SelectTrigger className="h-7 w-[180px] rounded-full pl-6">
                            <SelectValue placeholder="choisissez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="enseignant-chercheur">
                              Enseignant-chercheur
                            </SelectItem>
                            <SelectItem value="chercheur">Chercheur</SelectItem>
                            <SelectItem value="doctorant">Doctorant</SelectItem>
                          </SelectContent>
                        </div>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="hIndex"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>h-index :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" "
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="equipe"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>equipe :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" "
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="lien"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>lien :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" "
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="projet"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>projet:</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" "
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <div className="p-5">
            <Button
              className="mb-2 h-[35px] rounded-lg bg-buttonDark p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline  "
              type="submit"
            >
              Ajouter
            </Button>
          </div>
        </form>
      </Form>
      <DevTool control={form.control} />
    </>
  );
}
