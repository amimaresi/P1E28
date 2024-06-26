import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import leftArrow from './assets/left arrow.svg';
import rightArrow from './assets/right arrow.svg';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NotFound from '@/Pages/NotFound/NotFound';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
export default function EditLandingPage() {
  const LandingPage = {};

  const schema = yup.object().shape({
    title: yup.string().max(20),
    paragraphe: yup.string(),
    img: yup.string(),
    Subject: yup.string(),
  });
  const [boxes, setBoxes] = useState(LandingPage.news); //title, paragraphe, Consept

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await axios.get(
          'http://localhost:3000/recherche/PageAcc',
        ); // Replace with your actual API endpoint

        const newsData = response.data.Pages; // Assuming data is in response.data.Pages
        console.log('newsData', newsData);
        setBoxes(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Gérer les erreurs
      }
    }
    fetchNews();
  }, []);

  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  const form = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const updateForm = (i) => {
    setIndex(i);
    form.setValue('id', boxes[i].id);
    form.setValue('title', boxes[i].title);
    form.setValue('paragraphe', boxes[i].paragraphe);
    form.setValue('img', boxes[i].img);
    form.setValue('Subject', boxes[i].Subject);
  };
  const onSubmit = async (data) => {
    console.log('data', data);
    const dataWithId = { ...data, id: index }; // Spread existing data and add id
    console.log('data (with id):', dataWithId);
    try {
      const response = await axios.post(
        'http://localhost:3000/pageAcc/insertion',
        dataWithId,
      ); // Replace with your API endpoint
      console.log(response.data);
      setBoxes((oldBoxes) => {
        const newBoxes = oldBoxes.map((box, i) => {
          console.log('index', index);
          if (i == index) {
            return { ...box, ...data };
            /////////////////////////////////////
            // save changes to b
            ///////////////////////////////////
          }
          return box;
        });
        return newBoxes;
      });
    } catch (err) {
      if (err.response) console.log(err.response.data.message); //this error is for displaying the error message from the server
    }
  };

  const handleRemoveBox = async () => {
    if (boxes.length <= 6 && boxes.length !== 1) {
      try {
        await axios.delete(`http://localhost:3000/pageAcc/supression/${index}`);
        setBoxes((old) => {
          const newBoxes = [...old];
          newBoxes.splice(index, 1);
          setIndex((oldIndex) => (oldIndex !== 0 ? oldIndex - 1 : 0));
          return newBoxes;
        });
      } catch (error) {
        console.error('Error removing box:', error);
        // Gérer les erreurs de suppression
      }
    }
  };
  const paginationButtons = [];
  if (boxes) {
    for (let i = 0; i < boxes.length; i++) {
      paginationButtons[i] = (
        <button
          onClick={() => {
            updateForm(i);
          }}
          className={`mx-2 px-[0.6vw] py-[0.3vw] text-lg ${index == i ? 'bg-black' : 'bg-gray-400'} rounded-md transition-colors hover:text-black`}
        ></button>
      );
    }
  }
  return boxes ? (
    <div className="flex flex-col items-center justify-center gap-5 pt-5">
      <Card>
        <CardHeader>
          <CardTitle>Anouncements ( Page d'acceil )</CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" flex flex-row p-14">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" flex flex-col gap-6"
              >
                <CardDescription className="text-[20px] font-semibold italic text-textDark">
                  Element # {index + 1}
                </CardDescription>
                <div className=" flex flex-row gap-16">
                  {' '}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titre</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Entrez le Titre"
                            className="w-[300px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>L'acroche</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Entrez l'acroche"
                            className="w-64"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="paragraphe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Paragraphe</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Entrez la description"
                          className="w-[620px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="img"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lien de l'image</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Entrez le lien de l'image"
                          className="w-[620px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-row  justify-between">
                  <Button type="submit">Appliquer les changements</Button>
                  <div className="flex flex-row gap-2">
                    {' '}
                    <Button
                      type="button"
                      className="rounded-full"
                      onClick={() => {
                        if (boxes.length <= 5) {
                          setBoxes((old) => {
                            let newboxes = structuredClone(old);
                            newboxes.push({
                              id: boxes.length,
                              Subject: '',
                              img: '',
                              title: '',
                              paragraphe: '',
                            });
                            return newboxes;
                          });
                        }
                      }}
                    >
                      <span className=" mr-2 ">+</span>
                      Nouveau
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="rounded-full">
                          <span className=" mr-2">x</span>
                          Suprimer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {boxes.length == 1 ? 'Error !' : 'Etes-vous sure?'}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Au moins un element doit etre present !
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={handleRemoveBox}>
                            Continuer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
      <div className="bg-whitep-1  flex min-w-[64vw] flex-col place-items-center ">
        <div className="flex min-w-[64vw] flex-row items-center justify-around px-2 py-2">
          <button
            className="bg-buttonDarkshadow-sm mr-5 flex h-[5vw] w-[5vw] items-center justify-center rounded-full bg-buttonDark transition-all hover:bg-buttonLight hover:shadow-md active:shadow-lg md:h-[2.5vw] md:w-[2.5vw] "
            onClick={async () => {
              setShow(false);
              await timeout(100);
              updateForm(index == 0 ? boxes.length - 1 : index - 1);

              await timeout(100);
              setShow(true);
            }}
          >
            <img
              src={leftArrow}
              alt="background"
              className="mr-[0.1vw] h-[2vw]   active:opacity-70  md:h-[1vw] "
            />
          </button>

          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.1, delay: 0.1 }}
                className="flex h-[140px] w-[65vw] flex-row items-start justify-around rounded-2xl bg-white px-4 py-[2vw] shadow-md md:h-auto md:w-[54vw] md:min-w-[54vw] lg:p-5 "
              >
                <div className="flex h-[15vw]  w-[22vw] flex-col items-start gap-[1.1vw]">
                  <h2 className="m-0 rounded-xl bg-buttonLight px-[0.9vw] py-[0.6vw] text-center font-sans text-[1.2vw] font-[500] text-textLight lg:px-[0.7vw] lg:py-[0.4vw] lg:text-[0.8vw]">
                    {boxes[index].Subject}
                  </h2>
                  <div className="flex h-[17vw]  w-[23vw] flex-col items-start ">
                    <h1 className="m-0  text-center font-title text-[2.5vw] lg:text-[1.5vw]">
                      {boxes[index].title}
                    </h1>
                    <p className="m-0 font-sans text-[1.8vw] font-normal text-textDark md:text-[1.2vw] lg:text-[0.8vw]">
                      {boxes[index].paragraphe}
                    </p>
                  </div>
                </div>
                <img
                  src={boxes[index].img}
                  alt="background"
                  className=" mr-2 h-[17vw] w-[23vw] rounded-lg object-cover object-center md:h-[15vw] md:w-[27vw]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className="ml-5 flex h-[5vw] w-[5vw] items-center justify-center rounded-full bg-buttonDark shadow-sm transition-all hover:bg-buttonLight hover:shadow-md active:shadow-lg md:h-[2.5vw]  md:w-[2.5vw] "
            onClick={async () => {
              setShow(false);
              await timeout(100);
              updateForm(index == boxes.length - 1 ? 0 : index + 1);
              await timeout(100);
              setShow(true);
            }}
          >
            <img
              src={rightArrow}
              alt="background"
              className="ml-[0.1vw] h-[2vw] active:opacity-70  md:h-[1vw]"
            />
          </button>
        </div>
        <div className="my-5 flex flex-row items-center justify-center">
          {paginationButtons}
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
}
