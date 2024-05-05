import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Filtres from './Filtres/Filtres.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
//import data from './data.js';
import { GetColumns } from './RechercheTable.config.jsx';
import { useEffect, useState } from 'react';
export function RechercheTable({ navigate, searchby }) {
  const Columns = GetColumns(searchby);
  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 6,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  //test //////////////////////////
  const onSubmit = async (data) => {
    console.log('Filtres : ', data);
    console.log('search by ' + searchby);
    const searchform = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        searchform[key] = value;
      }
    });
    let DataToFetch = { ...searchform };
    switch (searchby) {
      case 'publication':
        {
          if (data.Date[0] > 2000) DataToFetch.DateMin = data.Date[0];
          if (data.Date[1] < new Date().getFullYear())
            DataToFetch.DateMax = data.Date[1];
          delete DataToFetch.Date;
        }
        break;
      case 'encadrement': {
        if (data.AnneeD[0] > 2000) DataToFetch.AnneeDMin = data.AnneeD[0];
        if (data.AnneeD[1] < new Date().getFullYear())
          DataToFetch.AnneeDMax = data.AnneeD[1];
        delete DataToFetch.AnneeD;
        if (data.AnneeF[0] > 2000) DataToFetch.AnneeFMin = data.AnneeF[0];
        if (data.AnneeF[1] < new Date().getFullYear() + 6)
          DataToFetch.AnneeFMax = data.AnneeF[1];
        delete DataToFetch.AnneeF;
        break;
      }
      case 'projet': {
        if (data.DateDebut[0] > 2000)
          DataToFetch.DateDebutMin = data.DateDebut[0];
        if (data.DateDebut[1] < new Date().getFullYear())
          DataToFetch.DateDebutMax = data.DateDebut[1];
        delete DataToFetch.DateDebut;
        if (data.DateFin[0] > 2000) DataToFetch.DateFinMin = data.DateFin[0];
        if (data.DateFin[1] < new Date().getFullYear() + 10)
          DataToFetch.DateFinMax = data.DateFin[1];
        delete DataToFetch.DateFin;
      }
    }

    setSearchParams(DataToFetch);
    console.log('Filtres : ', DataToFetch);
    try {
      const resultat = await axios.post(
        `http://localhost:3000/recherche/${searchby}`,
        DataToFetch,
      );
      console.log('search by ' + searchby);
      console.log(resultat.data);
      setData(resultat.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  ////////////////////////////////

  const table = useReactTable({
    data,
    // searchby == 'chercheur'
    //   ? { Matricule: "123", orcid: "", H_index: 20, Equipe: "", Publication: "", projet: "", "qualité": "", GradeRecherche: "", GradeEnsegnement: "", _id: "mo_nemamcha@esi.dz"}
    //   : searchby == 'publication'
    //     ? data.Publication
    //     : searchby == 'projet'
    //       ? data.Projet
    //       : searchby == 'encadrement'
    //         ? data.Encadrement
    //         : data.ConfJourn,
    columns: Columns(navigate),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
  });
  useEffect(() => {
    console.log('rendering');
  }, [data]);
  const paginationButtons = [];
  for (let i = 0; i < table.getPageCount(); i++) {
    paginationButtons[i] = (
      <button
        onClick={() => {
          table.setPageIndex(i);
        }}
        className={` m-2 p-1 ${table.getState().pagination.pageIndex == i ? 'text-black' : 'text-gray-400'} transition-colors hover:text-black`}
      >
        {i}
      </button>
    );
  }
  return (
    <div>
      <div className="min-h-[610px] w-full">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex flex-col items-center md:flex-row">
            <Input
              type="text"
              placeholder="Entrez le mot clé"
              className="h-15 w-[15rem] rounded-xl border border-gray-300 shadow md:w-[17rem] "
            />
            {/* filtriing is here  */}
            <Filtres searchby={searchby} onSubmit={onSubmit} />
          </div>
          <div className=" md-m-0 m-2 flex flex-row items-center justify-between">
            <span className=" mr-2">Lignes par page : </span>
            <Select
              defaultValue={pagination.pageSize.toString()}
              value={pagination.pageSize.toString()}
              onValueChange={(value) => {
                setPagination((prev) => {
                  return {
                    ...prev,
                    pageSize: Number(value),
                  };
                });
                console.log(pagination.pageSize + ' ' + value);
              }}
            >
              <SelectTrigger className="flex w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="rounded-sm border border-buttonDark bg-white ">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className=" border-b-buttonDark">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className=" border-b-grey-400">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                        {/* {console.log(cell.getContext().column.id)} */}
                        {/* {console.log("under flex "+cell.column.columnDef.cell)} */}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={Columns(navigate).length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="my-3 flex flex-row items-center justify-center">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          {paginationButtons}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
