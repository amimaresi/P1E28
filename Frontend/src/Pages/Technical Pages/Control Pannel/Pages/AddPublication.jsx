import { useState } from 'react';
import { DevTool } from '@hookform/devtools';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AddPublication() {
  const schema = yup.object().shape({
    Titre: yup.string().required('le titre est requis'),
    Date: yup.string().required('la date  est requise'),
    confJourn: yup.string().required(' la  confJourn est requise  '),
    idCherch: yup.string().required(' le champ chercheur est requis  '),
    rang: yup.number().integer().required(' le rang est requis '),
    volume: yup.string().required(' le volume est requis '),
    pages: yup.string().required(' les pages sont requises '),
    Lien: yup.string(),
    Membres: yup.array().of(yup.string()),
    Classement: yup.array().of(
      yup.object().shape({
        Nom: yup.string(),
        Valeur: yup.string(),
      }),
    ),
    MaisonEdistion: yup.string(),
  });
const [isSubmitted, setIsSubmitted] = useState(false);
  const handleButtonClick = () => {
    form.handleSubmit(onSubmit)();
  };
  const form = useForm({
    defaultValues: {
      Titre: '',
      Date: '',
      confJourn: '',
      idCherch: '',
      rang: 0,
      volume: '',
      pages: '',
      Membres: [''],
      Lien: '',
      Classement: [
        {
          Nom: '',
          Valeur: '',
        },
      ],
      MaisonEdistion: '',
    },
    resolver: yupResolver(schema),
  });

  const {
    fields: classFields,
    append: classAppend,
    remove: classRemove,
  } = useFieldArray({
    control: form.control,
    name: 'Classement',
  });

  const {
    fields: membresFields,
    append: membresAppend,
    remove: membresRemove,
  } = useFieldArray({
    control: form.control,
    name: 'Membres',
  });
  const onSubmit = async (data) => {
    console.log('data :', data);

    try {
      console.log('dataaaaaaaaa :', data);
      setIsSubmitted(true);
      const resutlt = await axios.post(
        'http://localhost:3000/chercheur/inserPub',
        data,
      );
      console.log('resulttttttt', resutlt);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  /* const onSubmit = (data) => {
    
    console.log('Filtres : ', data);
  }; */

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div
            className={` block  select-none space-y-1  rounded-md  p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent  focus:text-accent-foreground `}
          >
            <div
              className={`flex items-center justify-center text-sm font-medium leading-none`}
            >
              Ajouter une Publication
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className=" h-[95%]">
          <ScrollArea className="h-[99%] w-[99%] pr-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="p-5 text-center ">
                  <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
                    Ajouter une nouvelle publication{' '}
                  </h1>
                </div>
                <h2 className="text-1xl text-center font-bold dark:text-white">
                  veuillez remplir ce formulaire{' '}
                </h2>
                <hr className="my-8 h-px border-0  bg-black bg-opacity-50 "></hr>
                <FormField
                  control={form.control}
                  name="Titre"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start  pt-5">
                          <div className="pl-5 pr-9 ">
                            <FormLabel>Titre:</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-14">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder="entrez le titre "
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Date"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>Date :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-16">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder="entrez la date "
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confJourn"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start  ">
                          <div className="pl-5 pr-9 ">
                            <FormLabel>Conf/journ:</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-4">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder="entrez la confJourn"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="idCherch"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start  ">
                          <div className="pl-5 pr-9 ">
                            <FormLabel>chercheur :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-4">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder="entrez le  chercheur "
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rang"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>rang :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-16">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder=" entrez le rang"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="volume"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>volume :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-12">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder=" entrez le volume "
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pages"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>Pages :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-14">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder=" entrez les pages"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Lien"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>Lien :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-16">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder=" entrez le Lien"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <h2 className="text-1xl text-center font-bold dark:text-white">
                  Ajouter les membres{' '}
                </h2>
                <hr className="my-8 h-px border-0  bg-black bg-opacity-50 "></hr>
                {membresFields.map((field, index) => (
                  <div key={field.id}>
                    <FormField
                      control={form.control}
                      name={`Membres.${index}`}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <div className="flex flex-row items-center justify-start pt-4   ">
                              <div className="px-5">
                                <FormLabel>le membre :</FormLabel>
                              </div>
                              <FormControl>
                                <Input
                                  className=" w-300 h-7 rounded-full"
                                  placeholder=" entrez le membre "
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />

                    {index > 0 && (
                      <button
                        className="mb-2 h-[35px] rounded-lg bg-buttonDark p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline "
                        type="button"
                        onClick={() => membresRemove(index)}
                      >
                        supprimer ce membre
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="mb-2 h-[35px] rounded-lg bg-buttonDark p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline "
                  type="button"
                  onClick={() => membresAppend({})}
                >
                  Ajouter un membre
                </button>
                <h2 className="text-1xl text-center font-bold dark:text-white">
                  le classement{' '}
                </h2>
                <hr className="my-8 h-px border-0  bg-black bg-opacity-50 "></hr>
                {classFields.map((field, index) => (
                  <div key={field.id}>
                    <FormField
                      control={form.control}
                      name={`Classement.${index}.Nom`}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <div className="flex flex-row items-center justify-start   ">
                              <div className="px-5">
                                <FormLabel>nom de Classement:</FormLabel>
                              </div>
                              <FormControl>
                                <Input
                                  className=" w-300 h-7 rounded-full"
                                  placeholder=" entrez le nom de classement "
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
                      name={`Classement.${index}.Valeur`}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <div className="flex flex-row items-center justify-start pt-7  ">
                              <div className="px-5">
                                <FormLabel>classement :</FormLabel>
                              </div>
                              <FormControl>
                                <div className="ml-12">
                                  <Input
                                    className=" w-300 h-7 rounded-full"
                                    placeholder=" entrez le classement "
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                    {index > 0 && (
                      <button
                        className="mb-2 h-[35px] rounded-lg bg-buttonDark p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline "
                        type="button"
                        onClick={() => classRemove(index)}
                      >
                        supprimer ce classement
                      </button>
                    )}
                  </div>
                ))}

                <button
                  className="mb-2 h-[35px] rounded-lg bg-buttonDark p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline "
                  type="button"
                  onClick={() => classAppend({ nom: '', valeur: ' ' })}
                >
                  Ajouter un classement
                </button>

                <FormField
                  control={form.control}
                  name="MaisonEdistion"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>Maison d'édition :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-4">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder=" entrez la maison d'édition"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <div className="flex gap-4 p-5">
                  <div className="text-green-600 font-bold text-center">
        {isSubmitted && <p> ajouté avec succès</p>}
      </div>
                  <Button
                    className="mb-2 h-[35px] rounded-lg bg-buttonDark p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline  "
                    type="submit"
                    onClick={handleButtonClick}
                  >
                    Ajouter
                  </Button>
                </div>
              </form>
            </Form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <DevTool control={form.control} />
    </>
  );
}
