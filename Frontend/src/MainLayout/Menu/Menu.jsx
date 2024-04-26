import { NavLink } from 'react-router-dom';
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

export default function Menu({ isLogged, setIsLogged, role, name }) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-[60px] flex-row items-center  justify-between  bg-white bg-opacity-90 px-[40px] shadow-sm backdrop-blur-md">
      <div className="m-[100px] flex flex-row items-center justify-start gap-[10px]">
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
                  <ListItem
                    to="/Recherche/chercheur"
                    isSimple
                    title="Chercheurs"
                  />
                  <ListItem
                    to="/Recherche/publication"
                    isSimple
                    title="Publications"
                  />
                  <ListItem to="/Recherche/projet" isSimple title="Projets" />
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
                  <ListItem to="/control/landingPage" title="Page d'acceill">
                    Modifier le contenu de la page d'acceill
                  </ListItem>
                  <ListItem to="/control/update" title="Mise à jour">
                    - Modifier La Periode automatique <br />- Faire la mise à
                    jour manuellement
                  </ListItem>
                </ul>
                <ul className="grid w-[500px] grid-flow-col gap-3 p-2">
                  <ListItem
                    to="/control/AddChercheur"
                    title="Ajouter un Chercheur"
                  />
                  <ListItem
                    to="/control/AddProject"
                    title="Ajouter un Projet"
                  />
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
                  <ListItem
                    to="/Recherche/chercheur/test"
                    isSimple
                    title="Chercheurs"
                  />
                  <ListItem
                    to="/Recherche/publication/test"
                    isSimple
                    title="Publications"
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex flex-row items-center justify-end gap-5">
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

function ListItem({ children, title, to, isSimple, onClick }) {
  return (
    <li onClick={onClick}>
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
    </li>
  );
}

ListItem.displayName = 'ListItem';

function ProfileMenu({ name, role, setIsLogged }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
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
            <ul className=" grid w-[163px]">
              <ListItem to="/chercheur/me" title="Profile" />
              <ListItem to="/settings" title="Settings" />
              <ListItem
                to="."
                title="Logout"
                onClick={() => setIsLogged(false)}
              />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
