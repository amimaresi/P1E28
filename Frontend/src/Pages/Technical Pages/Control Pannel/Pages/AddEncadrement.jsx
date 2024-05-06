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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AddEncadrement() {
  const schema = yup.object().shape({
    Titre: yup.string().required('le titre est requis'),
    AnneeD: yup.string().required('lannee debut est requise'),
    AnneeF: yup.string(),
    Type: yup.string().required(' le type est requis  '),
    Encadrants: yup.array().of(
      yup.object().shape({
        nom: yup.string().required('le nom est requis'),
        prenom: yup.string().required('le prenom est requis'),
        idCherch: yup.string().email('email format is not valid'),
        role: yup.string(),
      }),
    ),
    Etudiant: yup.array().of(
      yup.object().shape({
        Nom: yup.string().required('le nom est requis'),
        Prenom: yup.string().required('le prenom est requis'),
      }),
    ),
  });

  const form = useForm({
    defaultValues: {
      Titre: '',
      AnneeD: '',
      AnneeF: '',
      Type: '',
      Etudiant: [
        {
          Nom: '',
          Prenom: '',
        },
      ],
      Encadrants: [
        {
          nom: '',
          prenom: '',
          idCherch: '',
          role: '',
        },
      ],
    },
    resolver: yupResolver(schema),
  });
  const {
    fields: encadrantsFields,
    append: encadrantsAppend,
    remove: encadrantsRemove,
  } = useFieldArray({
    control: form.control,
    name: 'Encadrants',
  });

  const {
    fields: etudFields,
    append: etudAppend,
    remove: etudRemove,
  } = useFieldArray({
    control: form.control,
    name: 'Etudiant',
  });
  const onSubmit = async (data) => {
    console.log('data :', data);

    try {
      const resutlt = await axios.post(
        'http://localhost:3000/encadrements/encadrement/ajouter',
        data,
      );
      console.log(resutlt);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div
            className={` block  select-none space-y-1  rounded-md  p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent  focus:text-accent-foreground `}
          >
            <div
              className={`flex items-center justify-center text-sm font-medium leading-none`}
            >
              Ajouter un Encadrement
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className=" h-[95%]">
          <ScrollArea className="h-[99%] w-[99%] pr-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="p-5 text-center ">
                  <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
                    Ajouter une nouveau encadrement{' '}
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
                            <Input
                              className=" w-300 h-7 rounded-full"
                              placeholder="entrez le titre "
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
                  name="AnneeD"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start  pt-5">
                          <div className="pl-5 pr-9 ">
                            <FormLabel>Annee Debut:</FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              className=" w-300 h-7 rounded-full"
                              placeholder="entrez le titre "
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
                  name="AnneeF"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start  pt-5">
                          <div className="pl-5 pr-9 ">
                            <FormLabel>Annee Fin:</FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              className=" w-300 h-7 rounded-full"
                              placeholder="entrez le titre "
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
                  name="Type"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start  pt-5">
                          <div className="pl-5 pr-9 ">
                            <FormLabel>Type:</FormLabel>
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
                                  <SelectItem value="PFE">PFE</SelectItem>
                                  <SelectItem value="Master2">
                                    Master2
                                  </SelectItem>
                                  <SelectItem value="Doctorat">
                                    Doctorat
                                  </SelectItem>
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

                {etudFields.map((field, index) => (
                  <div key={field.id}>
                    <FormField
                      control={form.control}
                      name={`Etudiant.${index}.Nom`}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <div className="flex flex-row items-center justify-start   ">
                              <div className="px-5">
                                <FormLabel>le nom de l'etudiant :</FormLabel>
                              </div>
                              <FormControl>
                                <Input
                                  className=" w-300 h-7 rounded-full"
                                  placeholder=" entrez le nom de l'etudiant "
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
                      name={`Etudiant.${index}.Prenom`}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <div className="flex flex-row items-center justify-start   ">
                              <div className="px-5">
                                <FormLabel>le prenom de l'etudiant :</FormLabel>
                              </div>
                              <FormControl>
                                <Input
                                  className=" w-300 h-7 rounded-full"
                                  placeholder=" entrez le prenom de l'etudiant "
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
                        className="mb-2 h-[35px] rounded-lg bg-[#6A5ACD] p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline "
                        type="button"
                        onClick={() => etudRemove(index)}
                      >
                        supprimer cet etudiant
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="mb-2 h-[35px] rounded-lg bg-[#6A5ACD] p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline "
                  type="button"
                  onClick={() => etudAppend({ Nom: '', Prenom: '' })}
                >
                  Ajouter un etudiant
                </button>

                {encadrantsFields.map((field, index) => (
                  <div key={field.id}>
                    <FormField
                      control={form.control}
                      name={`Encadrants.${index}.nom`}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <div className="flex flex-row items-center justify-start   ">
                              <div className="px-5">
                                <FormLabel>nom de l'encadrant:</FormLabel>
                              </div>
                              <FormControl>
                                <Input
                                  className=" w-300 h-7 rounded-full"
                                  placeholder=" entrez le nom de l'encadrant "
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
                      name={`Encadrants.${index}.prenom`}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <div className="flex flex-row items-center justify-start   ">
                              <div className="px-5">
                                <FormLabel>
                                  {' '}
                                  le prenom de l'encadrant :
                                </FormLabel>
                              </div>
                              <FormControl>
                                <Input
                                  className=" w-300 h-7 rounded-full"
                                  placeholder=" entrez  le prenom de l'encadrant "
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
                      name={`Encadrants.${index}.idCherch`}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <div className="flex flex-row items-center justify-start   ">
                              <div className="px-5">
                                <FormLabel> l'email de l'encadrant :</FormLabel>
                              </div>
                              <FormControl>
                                <Input
                                  className=" w-300 h-7 rounded-full"
                                  placeholder=" entrez  l'email de l'encadrant "
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
                      name={`Encadrants.${index}.role`}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <div className="flex flex-row items-center justify-start   ">
                              <div className="px-5">
                                <FormLabel> le role de l'encadrant :</FormLabel>
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
                                      <SelectItem value="Encadrant">
                                        Encadrant
                                      </SelectItem>
                                      <SelectItem value="Co-Encadrant">
                                        Co-Encadrant
                                      </SelectItem>
                                      <SelectItem value="null">null</SelectItem>
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
                    {index > 0 && (
                      <button
                        className="mb-2 h-[35px] rounded-lg bg-[#6A5ACD] p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline "
                        type="button"
                        onClick={() => encadrantsRemove(index)}
                      >
                        supprimer cet encadrant
                      </button>
                    )}
                  </div>
                ))}

                <button
                  className="mb-2 h-[35px] rounded-lg bg-[#6A5ACD] p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline "
                  type="button"
                  onClick={() =>
                    encadrantsAppend({
                      nom: '',
                      prenom: ' ',
                      idCherch: ' ',
                      role: ' ',
                    })
                  }
                >
                  Ajouter un encadrant
                </button>

                <div className="p-5">
                  <Button
                    className="mb-2 h-[35px] rounded-lg bg-buttonDark p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline  "
                    type="submit"
                  >
                    Ajouter
                  </Button>
                  <AlertDialogCancel className=" h-auto w-auto border-none">
                    Annuler
                  </AlertDialogCancel>
                </div>
              </form>
            </Form>
          </ScrollArea>
        </AlertDialogContent>
      </AlertDialog>
      <DevTool control={form.control} />
    </>
  );
}
