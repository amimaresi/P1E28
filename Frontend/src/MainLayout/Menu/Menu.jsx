import { NavLink, redirect } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import * as yup from 'yup';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
export default function Menu({ isLogged, setIsLogged, role, name }) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-[60px] flex-row items-center  justify-between  bg-white bg-opacity-90 px-[1vw] shadow-sm backdrop-blur-md">
      <div className="ml-[5vw] flex flex-row items-center justify-start gap-[10px]">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLink
                to="/"
                className={` items-baseline font-title font-black text-buttonDark underline decoration-[3px] underline-offset-4 hover:bg-white hover:text-buttonLight focus:bg-white focus:text-buttonDark focus:hover:text-buttonLight ${navigationMenuTriggerStyle()}`}
              >
                <h3 className=" text-[23px] ">LMCS: </h3>
                <h3 className=" text-[18px] ">Track</h3>
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className=" text-[16.5px]">
                Recherche
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid w-[125px] grid-flow-row">
                  <LinkItem
                    to="/Recherche/chercheur"
                    isSimple
                    title="Chercheurs"
                    isHref
                  />
                  <LinkItem
                    to="/Recherche/publication"
                    isSimple
                    title="Publications"
                    isHref
                  />{' '}
                  <LinkItem
                    to="/Recherche/encadrement"
                    isSimple
                    title="Encadrement"
                    isHref
                  />{' '}
                  <LinkItem
                    to="/Recherche/ConfJourn"
                    isSimple
                    title="ConfJourn"
                    isHref
                  />
                  <LinkItem
                    to="/Recherche/projet"
                    isSimple
                    title="Projets"
                    isHref
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className=" text-[16.5px]">
                Panneau de control
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <div
                  className=" flex h-[50px] w-full select-none flex-col items-center  justify-center bg-textLight from-muted/50 to-muted py-6 pb-8 no-underline shadow-sm outline-none"
                  to="/control"
                >
                  <div className="mb-2 mt-4 flex flex-row  items-baseline gap-2 text-lg font-medium">
                    paneau de control
                  </div>
                </div>
                <ul className="grid gap-3 border-b-2 border-gray-200 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <LinkItem to="/control/landingPage" title="Page d'acceill">
                    Modifier le contenu de la page d'acceill
                  </LinkItem>

                  <MiseAJour />
                </ul>
                <ul className="grid w-[500px] grid-flow-col gap-3 p-2">
                  <LinkItem
                    to="/control/AddChercheur"
                    title="Ajouter un Chercheur"
                  />

                  <Periodicité />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className=" text-[16.5px]">
                Profiles
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid w-[125px] grid-flow-row">
                  <LinkItem to="/chercheur/test" isSimple title="Chercheurs" />
                  <LinkItem
                    to="/publication/test"
                    isSimple
                    title="Publications"
                  />{' '}
                  <LinkItem
                    to="/encadrement/test"
                    isSimple
                    title="Encadrements"
                  />
                  <LinkItem to="/projet/test" isSimple title="Projet" />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className=" text-[16.5px]">
                Edit
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid w-[125px] grid-flow-row">
                  <LinkItem
                    to="/editpublication/test"
                    isSimple
                    title="publication"
                  />
                  <LinkItem to="/editprojet/test" isSimple title="projet" />{' '}
                  <LinkItem
                    to="/editencadrement/test"
                    isSimple
                    title="Encadrement"
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLink
                to="/statistiques"
                className={` ${navigationMenuTriggerStyle()} text-[16.7px]`}
              >
                Statistiques
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex flex-row items-center justify-end">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLink
                to="/aboutus"
                className={`text-[16.5px] ${navigationMenuTriggerStyle()}`}
              >
                About Us
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to="/guide"
                className={`text-[16.5px] ${navigationMenuTriggerStyle()}`}
              >
                Guide
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              {isLogged ? (
                <ProfileMenu
                  name={name}
                  role={role}
                  setIsLogged={setIsLogged}
                />
              ) : (
                <NavLink to="/login">
                  <Button
                    className={` h-[35px] rounded-xl bg-buttonDark px-4 text-textLight hover:bg-slate-700 hover:text-textLight `}
                  >
                    Connection
                  </Button>
                </NavLink>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}

function LinkItem({ children, title, to, isSimple, onClick, isHref }) {
  return (
    <li onClick={onClick}>
      {isHref ? (
        <a
          href={to}
          className={` ${isSimple ? 'border-b-2 border-white' : null} block  select-none space-y-1  rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${children == null && isSimple == false ? ' bg-gray-50' : null}`}
        >
          <div
            className={`text-sm font-medium leading-none ${children == null ? 'flex items-center justify-center' : null}`}
          >
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      ) : (
        <NavLink
          to={to}
          className={` ${isSimple ? 'border-b-2 border-white' : null} block  select-none space-y-1  rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${children == null && isSimple == false ? ' bg-gray-50' : null}`}
        >
          <div
            className={`text-sm font-medium leading-none ${children == null ? 'flex items-center justify-center' : null}`}
          >
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </NavLink>
      )}
    </li>
  );
}
function MiseAJour() {
  const maj = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        'http://localhost:3000/settings/update-maj-time',
        data,
      );

      console.log(response.data.message); // poping up the message
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const [data, setData] = useState('');
  const [selectValue, setSelectValue] = useState('');

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <li>
          <span
            className={`  block  select-none space-y-1  rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`}
          >
            <div className={`text-sm font-medium leading-none`}>
              Mise à jour
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              - Modifier La Periode automatique <br />- Faire la mise à jour
              manuellement
            </p>
          </span>
        </li>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>la Mise a jour</AlertDialogTitle>
          <AlertDialogDescription>
            modifier la Mise a jour
          </AlertDialogDescription>
          <>
            {/*--------------------------------------------------------------------------------------------------------------------------------*/}
            <div className="p-5 text-center ">
              <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
                mise a jour
              </h1>
            </div>
            <div className="p-10 text-center">
              <h2 className="text-1xl text-center font-bold dark:text-white">
                mise a jour automatique chaque :
              </h2>
              <hr className="my-8 h-px border-0  bg-black bg-opacity-50 "></hr>
              <div className="align ">
                <Input
                  className=" w-300 h-7 rounded-full"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
                <div className='p-2'>
                <Select onValueChange={(e) => setSelectValue(e)}>
                  <SelectTrigger className="h-7 w-[180px] rounded-full pl-6">
                    <SelectValue placeholder="duree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annees">Années</SelectItem>
                    <SelectItem value="mois">Mois</SelectItem>
                  </SelectContent>
                </Select>
                </div>
              </div>
              <button
                onClick={() => maj({ data, selectValue })}
                className="mb-2 h-[35px] rounded-lg bg-buttonDark p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline  "
                type="submit"
              >
                Sauvgarder
              </button>
              <h2 className="text-1xl text-center font-bold dark:text-white p-2">
                mettre a jour manuellement:
              </h2>
              <hr className="my-8 h-px border-0  bg-black bg-opacity-50 "></hr>
              <button
                
                className="mb-2 h-[35px] rounded-lg bg-buttonDark p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline  "
                type="submit"
              >
                mettre a jour
              </button>

              <AlertDialogCancel className="m-5">Cancel</AlertDialogCancel>
            </div>
          </>
          {/*--------------------------------------------------------------------------------------------------------------------------------*/}
          ;
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
function Periodicité() {
  const schema = yup.object().shape({
    acronyme: yup.string(),
    Periodicité: yup.string(),
  });
  const form = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const inf = {
        acronyme: data.acronyme,
        periodicite: data.Periodicité,
      };
      console.log(inf);
      console.log('clicked');

      const res = await axios.post(
        'http://localhost:3000/conf/confJourn/ajouterPeriode',
        inf,
      );
      console.log(res.data.message);
    } catch (err) {
      if (err.response) console.log(err.response.data.message); //this error is for displaying the error message from the server
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div
          className={` block  select-none space-y-1  rounded-md  p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent  focus:text-accent-foreground `}
        >
          <div
            className={`flex items-center justify-center text-sm font-medium leading-none`}
          >
            Ajouter une Periodicité
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ajouter une Periodicité</AlertDialogTitle>
          <AlertDialogDescription>
            modifier la Periodicité d'une ConfJourn par id
          </AlertDialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="acronyme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conferance / Journal Acronyme</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez l'acronyme" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Periodicité"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Periodicité</FormLabel>
                    <FormControl>
                      <Input placeholder="entrez la Periodicité" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Enregister</Button>
              <AlertDialogCancel className="m-5">Cancel</AlertDialogCancel>
            </form>
          </Form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

LinkItem.displayName = 'LinkItem';

function ProfileMenu({ name, role, setIsLogged }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className=" h-auto rounded-xl border-[0.15vw]  border-textLight py-1">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://avatars.githubusercontent.com/u/29647600?v=4" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="mx-3 flex flex-col items-start justify-center">
              <span className="m-0 text-sm font-medium">{name}</span>
              <span className="text-xs text-muted-foreground">{role}</span>
            </div>
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className=" grid w-[179px]">
              <LinkItem to="/chercheur/me" title="Profile" />
              <LinkItem to="/control/AddProject" title="Ajouter un Projet" />
              <LinkItem
                to="/control/AddEncadrement"
                title="Ajouter un Encadrement"
              />
              <LinkItem
                to="/control/AddPublication"
                title="Ajouter une Publication"
              />
              <LinkItem to="/settings" title="Settings" />
              <LinkItem
                to="."
                title="Logout"
                onClick={async () => {
                  setIsLogged(false);
                  localStorage.setItem('isLogged', false);
                  try {
                    const res = await axios.get(
                      'http://localhost:3000/auth/logout',
                      { withCredentials: true },
                    );
                    console.log(res.data.message);
                    redirect('/');
                  } catch (e) {
                    console.log(e);
                  }
                }}
              />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
