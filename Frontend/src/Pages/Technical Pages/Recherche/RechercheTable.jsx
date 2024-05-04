import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { useEffect ,useState } from 'react';
import { set } from 'react-hook-form';
//import { data } from 'autoprefixer';
export function RechercheTable({ navigate, searchby }) {
  const Columns = GetColumns(searchby);
  const [data , setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 6,
  });

  //ttest //////////////////////////
  const onSubmit = async (data) => {
    
   
    console.log('Filtres : ', data);
    console.log("search by "+searchby)
    const searchform = {};
    
    Object.entries(data).forEach((value, key) => {
    if (value != 0) {
        searchform[key] = value;
        
       }
     });
    //console.log(form.getValues() + ' ' + searchform);
    

    //setSearchParams(searchform);
    try{
      const resultat = await axios.post(
        `http://localhost:3000/recherche/${searchby}`, data );
        console.log(resultat.data.Chercheurs)
         if(searchby==="chercheur") setData(resultat.data.Chercheurs)
         if(searchby==="publication") setData(resultat.data.Publications)
        if(searchby==="ConfJourn") setData(resultat.data.Confjournals)
        if(searchby==="encadrement") setData(resultat.data.Encadrements)
          if (searchby==="projet") setData(resultat.data.projet)
    
        
    }
    catch(err){
      console.log(err.message);
    }
  };
  ////////////////////////////////



  const table = useReactTable({
    data ,
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
    console.log("rendering");
  }, [data])
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
             <Filtres searchby={searchby}  onSubmit={onSubmit}  /> 
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
                          
                          
                        )
                        
                        }
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
