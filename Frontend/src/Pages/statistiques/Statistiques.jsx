import { useState } from 'react';
import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
//import {  BarChart } from "./Chartss/BarChart";
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Bar } from 'react-chartjs-2';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto';
import { UserData } from './Data';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { NavLink } from 'react-router-dom';

export default function Statistiques() {
  const schema = yup.object().shape({
    dateDebut: yup.string().required('l annee de debut  est requise'),
    dateFin: yup.string().required('l annee de fin  est requise'),
  });

  const schema1 = yup.object().shape({
    Theme: yup.string().required('l annee de debut  est requise'),
  });
   
  const form1 = useForm({
    defaultValues: {
      Theme: '',
    },
    resolver: yupResolver(schema1),
  });
  

  const form = useForm({
    defaultValues: {
      dateDebut: '',
      dateFin: '',

    },
    resolver: yupResolver(schema),
  });
  const onSubmit1 = async (data) => {
    console.log('dataTwo :', data); };
  const onSubmit = async (data) => {
    console.log('data :', data);

    try {
      console.log('dataaaaaaaaa :', data);
      const resutlt = await axios.post(
        'http://localhost:3000/chercheur/inserPub',
        data,
      );
      console.log('resulttttttt',resutlt);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: 'nombre de publication',
        data: UserData.map((data) => data.nbrPub),
        backgroundColor: ['#2536eb', '#3b82f6', '#2E2787', '#002D62'],
      },
    ],
  });
  return (
    <>
      <div className=" min-h-screen bg-white">
        <NavLink className="flex items-center">
          <ChevronLeftIcon className="text-black-500 hover:text-black-700 ml-28 mt-10 h-8 w-8" />
          <h1 className="ml-4 mt-10 text-3xl font-bold no-underline">
            Statistiques
          </h1>
        </NavLink>

        <h1 className="    mb-1  px-2 pt-6 text-center text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
          Explorez les Statistiques de LMCS selon Votre Thème Préféré
        </h1>
        <p className="px-2  pt-2 text-center">
          Découvrez les tendances fascinantes de LMCS en choisissant votre
          intervalle d'années et un thème qui vous intéresse,
        </p>
        <p className="px-2 pb-6 text-center">
          puis visualisez les graphiques en toute simplicité
        </p>
        <div className="flex justify-center space-x-20 p-4 ">
          <div className="flex justify-center rounded-xl border bg-buttonDark px-12 pb-4 pt-4 text-white ">
            <h2 className="px-4 font-extrabold  ">1234</h2>
            <h2>Publications</h2>
          </div>

          <div className="flex justify-center rounded-xl border bg-buttonDark px-12 pb-4 pt-4 text-white">
            <h2 className="px-4 font-extrabold ">150</h2>
            <h2>Projet</h2>
          </div>

          <div className="flex justify-center rounded-xl border bg-buttonDark px-12 pb-4 pt-4 text-white">
            <h2 className="px-4 font-extrabold ">900</h2>
            <h2>Encadrement</h2>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="justify-right flex space-x-20 p-4 ">
            <div className='"w-[300px] p-6'>
              <Tabs defaultValue="annee" className="w-[300px]">
                <TabsList className="grid w-full grid-cols-2 bg-[#EFF3FF]">
                  <TabsTrigger value="annees">Les années</TabsTrigger>
                  <TabsTrigger value="theme"> Le théme</TabsTrigger>
                </TabsList>
                <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <TabsContent value="annees">
                  <Card>
                    <CardHeader>
                      <CardTitle>Les années</CardTitle>
                      <CardDescription>
                        veuillez choisir un intervalle des années
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                      <FormField
            control={form.control}
            name="dateDebut"
            render={({ field }) => (
              <>
                <FormItem>
                  <div >
                    <div>
                      <FormLabel>annee debut:</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        
                        placeholder="entrez l'annee de debut "
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
                      </div>
                      <div className="space-y-1">
                      <FormField
            control={form.control}
            name="dateFin"
            render={({ field }) => (
              <>
                <FormItem>
                  <div >
                    <div >
                      <FormLabel>annee Fin:</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        
                        placeholder="entrez l'annee de fin "
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="bg-buttonDark">Enregistrer</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                </form>
      </Form>
      <DevTool control={form.control} />
                <TabsContent value="theme">
                <Form {...form1}>
        <form onSubmit={form1.handleSubmit(onSubmit1)} className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Le théme</CardTitle>
                      <CardDescription>
                        veuillez choisir un théme
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                      <FormField
            control={form1.control}
            name="Theme"
            render={({ field }) => (
              <>
                <FormItem>
                  <div className="flex flex-row items-center justify-start   ">
                    <div className="px-5">
                      <FormLabel>Les themes:</FormLabel>
                    </div>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <h3 className="font-bold">nombre de :</h3>
                            <SelectItem value="publication">
                              publications
                            </SelectItem>
                            <SelectItem value="encadrement">
                              encadrements
                            </SelectItem>
                            <SelectItem value="projet">projets</SelectItem>
                            <h3 className="font-bold"> type encadrement:</h3>
                            <SelectItem value="pfe">PFE</SelectItem>
                            <SelectItem value="master">Master2</SelectItem>
                            <SelectItem value="doctorat">Doctorat</SelectItem>
                          </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="bg-buttonDark">Enregistrer</Button>
                    </CardFooter>
                  </Card>
                  </form>
      </Form>
      <DevTool control={form1.control} />
                </TabsContent>
              </Tabs>
            </div>

            <div className='"w-[600px] p-6'>
              <Tabs defaultValue="annee" className="w-[600px]">
                <TabsList className="grid w-full grid-cols-4 bg-[#EFF3FF] ">
                  <TabsTrigger value="courbe">Courbe</TabsTrigger>
                  <TabsTrigger value="histogramme">Histogramme</TabsTrigger>
                  <TabsTrigger value="cercle">Diagramme circulaire</TabsTrigger>
                  <TabsTrigger value="liste">Liste</TabsTrigger>
                </TabsList>
                <TabsContent value="courbe">
                  <div className="#002D62 h-full w-full">
                    <Line data={userData} />
                  </div>
                </TabsContent>
                <TabsContent value="histogramme">
                  <div className="#002D62">
                    <Bar data={userData} />
                  </div>
                </TabsContent>

                <TabsContent value="cercle">
                  <div className="#002D62">
                    <Pie data={userData} />
                  </div>
                </TabsContent>

                <TabsContent value="liste">
                  <div>
                  { 
              UserData.map((data) => (
                <div
                  key={data}
                  className="   mb-4 mr-4 flex h-16 w-full items-center rounded-2xl border  bg-[#EFF3FF]  p-4   "
                >
                  <h3>_{data.year}</h3>
                  <h3>_{data.nbrPub}</h3>
                </div>
              ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
