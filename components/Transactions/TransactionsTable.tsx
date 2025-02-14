"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/schemas/transactionsSchemas";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import React from "react";
import TableFilters from "./TableFilters";
import TablePaginationControls from "./TablePaginationControls";

interface TransactionsTableProps {
  columns: ColumnDef<Transaction, unknown>[];
  data: Transaction[];
}

const TransactionsTable = ({ columns, data }: TransactionsTableProps) => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "date", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [categoryFilter, setCategoryFilter] =
    React.useState<string>(initialCategory);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter: categoryFilter,
    },
    globalFilterFn: (row, _, filterValue) =>
      filterValue === "all" || row.getValue("category") === filterValue,
  });

  return (
    <div className="rounded-xl bg-white px-lg py-xl @container sm-490:px-2xl sm-490:py-2xl">
      <TableFilters
        table={table}
        data={data}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
      <Table className="mt-xl">
        <TableHeader className="hidden @[640px]:table-header-group">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-grey-100">
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
          <tr className="h-xl"></tr>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-grey-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="px-0 @[640px]:px-4" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePaginationControls table={table} />
    </div>
  );
};

export default TransactionsTable;
