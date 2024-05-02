import { useState } from 'react';
import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
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

export default function AddProject() {
  const schema = yup.object().shape({
    Num: yup.number().required('le numero est requis'),
    Titre: yup.string().required('le titre est requis'),
    DateDebut: yup.date().required('la date de debut est requise'),
    chefProjet: yup.string().required(' le chef de projet est requis  '),
    DateFin: yup.date(),
    Theme: yup.string().required(' le theme est requis '),
    liste_members: yup
      .array()
      .transform((str) => str.split(' '))
      .of(yup.string().email())
      .required(' la liste des membres est requise '),
  });

  const form = useForm({
    defaultValues: {
      Num: '',
      Titre: '',
      DateDebut: '',
      chefProjet: '',
      DateFin: '',
      Theme: '',
      liste_members: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log('data :', data);

    try {
      const resutlt = await axios.post(
        'http://localhost:3000/insertion/projet',
        data,
      );
      console.log(resutlt);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  /* const onSubmit = (data) => {
    
    console.log('Filtres : ', data);
  }; */

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="p-5 text-center ">
            <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
              Ajouter un nouveau projet{' '}
            </h1>
          </div>
          <h2 className="text-1xl text-center font-bold dark:text-white">
            veuillez remplir ce formulaire{' '}
          </h2>
          <hr className="my-8 h-px border-0  bg-black bg-opacity-50 "></hr>
          <FormField
            control={form.control}
            name="Num"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start  pt-5">
                    <div className="pl-5 pr-9 ">
                      <FormLabel>Numero :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder="entrez le numero "
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
            name="Titre"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>titre :</FormLabel>
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
            name="DateDebut"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start  ">
                    <div className="pl-5 pr-9 ">
                      <FormLabel>Date de debut :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder="entrez la date de debut "
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
            name="chefProjet"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>Chef de Projet :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" entrez le chef de Projet"
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
            name="DateFin"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>date de fin :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" entrez la date de fin "
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
            name="Theme"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>Theme :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" entrez le theme"
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
            name="liste_members"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>liste des membres :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" entrez la liste des membres "
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
