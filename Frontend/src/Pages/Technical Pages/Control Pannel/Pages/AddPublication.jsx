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

export default function AddPublication() {
  const schema = yup.object().shape({
    Titre: yup.string().required('le titre est requis'),
    Date: yup.string().required('la date  est requise'),
    confJourn: yup.string().required(' la  confJourn est requise  '),
    idCherch: yup.string().required(' le champ chercheur est requis  '),
    rang: yup.string().required(' le rang est requis '),
    volume: yup.string().required(' le volume est requis '),
    pages: yup.string().required(' les pages sont requises '),
    Lien: yup.string(),
    Membres: yup.array().of(yup.string()),
     Classement : yup.array().of(yup.object().shape({
        Nom: yup.string(),
        Valeur: yup.string(),
     
      })  ),
      MaisonEdistion :  yup.string()
  });

  const form = useForm({
    defaultValues: {
      Titre: '',
      Date: '',
      confJourn: '',
      idCherch: '',
      rang: '',
      volume: '',
      pages: '',
      Membres: [''],
      Lien : '',
      Classement: [{
        Nom: '',
        Valeur: '',}],
        MaisonEdistion : '',


    },
    resolver: yupResolver(schema),
  });


  const { fields : classFields , append : classAppend , remove : classRemove} = useFieldArray({
   control : form.control,
    name: 'Classement',
  })


  const { fields :membresFields , append : membresAppend , remove : membresRemove} = useFieldArray({
    control : form.control,
     name: 'Membres',
   })
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
            name="Date"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>Date :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder="entrez la date "
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
            name="confJourn"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start  pt-5">
                    <div className="pl-5 pr-9 ">
                      <FormLabel>Conf/journ:</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder="entrez la confJourn"
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
            name="idCherch"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start  ">
                    <div className="pl-5 pr-9 ">
                      <FormLabel>chercheur :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder="entrez le champ chercheur "
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
            name="rang"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>rang :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" entrez votre rang"
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
            name="volume"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>volume :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" entrez le volume "
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
            name="pages"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>Pages :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" entrez les pages"
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
            name="Lien"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>Lien :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" entrez le Lien"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          

          {
            membresFields.map((field, index) => (
             <div key={field.id}>
              <FormField
            control={form.control}
            name={`Membres.${index}`}
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>le membre :</FormLabel>
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

            {
            index >0 && (
              <button className='mb-2 h-[35px] rounded-lg bg-[#6A5ACD] p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline ' type='button' onClick={()=> membresRemove(index)}>supprimer ce membre</button>   
            )
          }
             </div>
             
             ) )}
             <button className='mb-2 h-[35px] rounded-lg bg-[#6A5ACD] p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline ' type='button' onClick={()=> membresAppend({membre :""})}>Ajouter un membre</button>
          

           {
            classFields.map((field, index) => (
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
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>classement :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" entrez le classement "
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          {
            index >0 && (
              <button className='mb-2 h-[35px] rounded-lg bg-[#6A5ACD] p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline ' type='button' onClick={()=> classRemove(index)}>supprimer ce classement</button>   
            )
          }
             </div>   
            ))
           }
            
            <button className='mb-2 h-[35px] rounded-lg bg-[#6A5ACD] p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline ' type='button' onClick={()=> classAppend({nom : "", valeur:" " })}>Ajouter un classement</button>


            <FormField
            control={form.control}
            name="MaisonEdistion"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>Maison D'edition :</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className=" w-300 h-7 rounded-full"
                        placeholder=" entrez la maison edition"
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
