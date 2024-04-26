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
import { Separator } from '@radix-ui/react-dropdown-menu';
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
              <NavLink to={`./${chercheur.id + '/informations'}`}>
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
              <NavLink to={`./${publication.id}`}>
                <DropdownMenuItem>Voir le profil</DropdownMenuItem>
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
