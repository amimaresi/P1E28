import {
  ArrowUpDown,
  MoreHorizontal,
  SeparatorHorizontal,
  SeparatorVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavLink } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
export function GetColumns(searchby) {
  return searchby === 'chercheur'
    ? ColumnsChercheur
    : searchby === 'publication'
      ? ColumnsPublication
      : ColumnsProjet;
}

export function ColumnsChercheur() {
  return [
    {
      accessorKey: 'nomComplet',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="ml-8"
          >
            Nom Complet
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className=" flex flex-row items-center gap-3">
          <div className=" flex h-9 w-9 items-center justify-center rounded-full bg-gray-300">
            <Avatar>
              <AvatarImage src="n" />
              <AvatarFallback>
                {row.getValue('nomComplet').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="lowercase">{row.getValue('nomComplet')}</div>
        </div>
      ),
    },
    {
      accessorKey: 'GradeRecherche',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Grade Recherche
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('GradeRecherche')}</div>
      ),
    },
    {
      accessorKey: 'Email',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('Email')}</div>
      ),
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const chercheur = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <NavLink to={`../publication/${chercheur.id + '/informations'}`}>
                <DropdownMenuItem>Voir le profil</DropdownMenuItem>
              </NavLink>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export function ColumnsPublication() {
  return [
    {
      accessorKey: 'Titre',
      sortingFn: 'basic',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Titre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className=" flex flex-row items-center gap-3">
          <div className="ml-2">{row.getValue('Titre')}</div>
        </div>
      ),
    },
    {
      accessorKey: 'Date',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('Date')}</div>
      ),
    },
    {
      accessorKey: 'Membres',
      header: ({ column }) => {
        return <span className=" ml-4">Membres</span>;
      },
      cell: ({ row }) => (
        <div>
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="link">View members</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              {row.getValue('Membres').map((M, ind, arr) => (
                <>
                  <h2>{M}</h2>
                  {ind == arr.length - 1 ? null : <DropdownMenuSeparator />}
                </>
              ))}
            </HoverCardContent>
          </HoverCard>
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const publication = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <NavLink to={`../publication/${publication.id}`}>
                <DropdownMenuItem>Plus d'info</DropdownMenuItem>
              </NavLink>
              <a href={publication.Lien}>
                <DropdownMenuItem>Lien externe</DropdownMenuItem>
              </a>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export function ColumnsProjet() {
  return [
    {
      accessorKey: 'Titre',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="ml-[-5px]"
          >
            Nom Complet
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className=" flex flex-row items-center gap-3">
          <div className="ml-3">{row.getValue('Titre')}</div>
        </div>
      ),
    },
    {
      accessorKey: 'Theme',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Theme
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('Theme')}</div>,
    },
    {
      accessorKey: 'liste_members',
      header: ({ column }) => {
        return <span className=" ml-4">Membres</span>;
      },
      cell: ({ row }) => (
        <div>
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="link">View members</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <span className=" font-bold underline">Chef :</span>{' '}
              {row.original.ChefDeProjet}
              <DropdownMenuSeparator />
              {row.getValue('liste_members').map((M, ind, arr) => (
                <>
                  <h2>{M}</h2>
                  {ind == arr.length - 1 ? null : <DropdownMenuSeparator />}
                </>
              ))}
            </HoverCardContent>
          </HoverCard>
        </div>
      ),
    },

    {
      accessorKey: '_id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Numero
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('_id').$numberInt}</div>,
    },
    {
      accessorKey: 'DateDebut',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Date Debut
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('DateDebut')}</div>,
    },
    {
      accessorKey: 'DateFin',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Date Debut
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('DateFin')}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const projet = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <NavLink to={`../projet/${projet.id}`}>
                <DropdownMenuItem>Plus d'info</DropdownMenuItem>
              </NavLink>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export function ColumnsEncadrement() {
  return [
    {
      accessorKey: 'nomComplet',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="ml-10"
          >
            Nom Complet
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className=" flex flex-row items-center gap-3">
          <div className=" flex h-9 w-9 items-center justify-center rounded-full bg-gray-300">
            <Avatar>
              <AvatarImage src="n" />
              <AvatarFallback>
                {row.getValue('nomComplet').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="lowercase">{row.getValue('nomComplet')}</div>
        </div>
      ),
    },
    {
      accessorKey: '_id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue('_id')}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const chercheur = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <NavLink to={`./${chercheur.id + '/informations'}`}>
                <DropdownMenuItem>Voir le profil</DropdownMenuItem>
              </NavLink>
              <DropdownMenuItem>View chercheur details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export function ColumnsConfJournal() {
  return [
    {
      accessorKey: 'nomComplet',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="ml-10"
          >
            Nom Complet
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className=" flex flex-row items-center gap-3">
          <div className=" flex h-9 w-9 items-center justify-center rounded-full bg-gray-300">
            <Avatar>
              <AvatarImage src="n" />
              <AvatarFallback>
                {row.getValue('nomComplet').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="lowercase">{row.getValue('nomComplet')}</div>
        </div>
      ),
    },
    {
      accessorKey: '_id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue('_id')}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const chercheur = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <NavLink to={`./${chercheur.id + '/informations'}`}>
                <DropdownMenuItem>Voir le profil</DropdownMenuItem>
              </NavLink>
              <DropdownMenuItem>View chercheur details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
