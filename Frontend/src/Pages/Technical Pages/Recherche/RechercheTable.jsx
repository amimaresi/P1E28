import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
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
import data from './data.js';
import { GetColumns } from './RechercheTable.config.jsx';

export function RechercheTable({ navigate, searchby }) {
  const Columns = GetColumns(searchby);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 6,
  });
  const table = useReactTable({
    data:
      searchby == 'chercheur'
        ? data.Chercheur
        : searchby == 'publication'
          ? data.Publication
          : data.Projet,
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
      <div className="h-[610px] w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center ">
            <Input
              type="text"
              placeholder="Entrez le mot clé"
              className="h-15 w-[17rem] rounded-xl border border-gray-300 shadow "
            />
            <Filtres searchby={searchby} />
          </div>
          <div className=" flex flex-row items-center justify-between">
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
      <div className="flex flex-row items-center justify-center ">
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
