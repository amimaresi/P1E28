import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
 
export default function AddProject() {
  const schema = yup.object().shape({
    numero: yup.string().required("le numero est requis"),
    titre: yup.string().required("le titre est requis"),
    dateDebut: yup.string().required("la date de debut est requise"),
    chefProjet: yup.string().required(" le chef de projet est requis  "),
    dateFin : yup.string(),
    theme : yup.string().required(" le theme est requis "),
    listeMembres : yup.string().required(" la liste des membres est requise "),
  });

  const form = useForm({
    defaultValues: {
      numero:"" ,
    titre:"" ,
    dateDebut: "",
    chefProjet: "",
    dateFin : "",
    theme : "",
    listeMembres : "",

    },
    resolver: yupResolver(schema),

  });

  const onSubmit = (data) => {
    console.log('Filtres : ', data);
  };
 
  return <>
  <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className='p-5 text-center '>
            <h1 className='mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>Ajouter un nouveau projet </h1>
            </div>
            <h2 className='text-1xl font-bold dark:text-white text-center'>veuillez remplir ce formulaire </h2>
            <hr className='h-px my-8 bg-black  bg-opacity-50 border-0 '></hr>
          <FormField
            control={form.control}
            name="numero"
            render={({ field }) => (
              <>
              
                <FormItem>
                <div className='flex flex-row items-center justify-start  pt-5'>
                  <div className='pl-5 pr-9 '>
                  <FormLabel>Numero :</FormLabel>
                  </div>
                  <FormControl>
                  
                    <Input className=' rounded-full w-300 h-7'
                     
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
            name="titre"
            render={({ field }) => (

              <> 
              <FormItem>
                <div className='flex flex-row items-center justify-start   '>
                  <div className='px-5'>
                  <FormLabel >titre :</FormLabel>
                  </div>
                  <FormControl>
                  
                    <Input className=' rounded-full w-300 h-7'
                     
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
            name="dateDebut"
            render={({ field }) => (
              <>
              
                <FormItem>
                <div className='flex flex-row items-center justify-start  '>
                  <div className='pl-5 pr-9 '>
                  <FormLabel>Date de debut :</FormLabel>
                  </div>
                  <FormControl>
                  
                    <Input className=' rounded-full w-300 h-7'
                     
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
                <div className='flex flex-row items-center justify-start   '>
                  <div className='px-5'>
                  <FormLabel >Chef de Projet :</FormLabel>
                  </div>
                  <FormControl>
                  
                    <Input className=' rounded-full w-300 h-7'
                     
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
            name="dateFin"
            render={({ field }) => (

              <> 
              <FormItem>
                <div className='flex flex-row items-center justify-start   '>
                  <div className='px-5'>
                  <FormLabel >date de fin :</FormLabel>
                  </div>
                  <FormControl>
                  
                    <Input className=' rounded-full w-300 h-7'
                     
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
            name="theme"
            render={({ field }) => (

              <> 
              <FormItem>
                <div className='flex flex-row items-center justify-start   '>
                  <div className='px-5'>
                  <FormLabel >Theme :</FormLabel>
                  </div>
                  <FormControl>
                  
                    <Input className=' rounded-full w-300 h-7'
                     
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
            name="listeMembres"
            render={({ field }) => (

              <> 
              <FormItem>
                <div className='flex flex-row items-center justify-start   '>
                  <div className='px-5'>
                  <FormLabel >liste des membres :</FormLabel>
                  </div>
                  <FormControl>
                  
                    <Input className=' rounded-full w-300 h-7'
                     
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
           <div className='p-5'>
          <Button className='focus:outline font-medium rounded-lg text-sm p-5 py-2.5 mb-2 h-[35px]  bg-buttonDark  text-textLight hover:bg-slate-700 hover:text-textLight  ' type="submit">Ajouter</Button>
          </div>
           </form>
      </Form>
      <DevTool control={form.control} />
  
  
  </>;
}
