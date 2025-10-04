"use client";

import { brewingLog, BrewingRecord } from "@/data/brewingLog";
import {
  CellContext,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { srmColors } from "@/data/srmColors";
import { getContrastTextColor } from "@/utils/getContrastTextColor";

type CellInfo = CellContext<BrewingRecord, unknown>;

const EmptyCell = () => <span className="text-gray-400">-</span>;

const renderDateCell = (info: CellInfo) => {
  const value = info.getValue<string>();
  if (!value) return <EmptyCell />;

  const date = new Date(value as string).toLocaleDateString("nl-NL");

  return date;
};

const renderNameCell = (info: CellInfo) => {
  const value = info.getValue<string>();
  if (!value) return <EmptyCell />;

  return <span className="font-semibold">{value}</span>;
};

const renderMonospaceNumber = (info: CellInfo, decimals = 3) => {
  const value = info.getValue<number>();
  if (!value) return <EmptyCell />;

  return (
    <span className="tabular-nums">{Number(value).toFixed(decimals)}</span>
  );
};

const renderSrmCell = (info: CellInfo) => {
  const value = info.getValue<number>();
  if (!value) return <EmptyCell />;

  const color = srmColors[value];
  const textColor = getContrastTextColor(color);

  return (
    <span
      className="px-2 py-1 rounded font-semibold min-w-8 text-center inline-block"
      style={{
        backgroundColor: color,
        color: textColor,
      }}
    >
      {value}
    </span>
  );
};

const renderDefaultColumn: Partial<ColumnDef<BrewingRecord>> = {
  cell: (info) => {
    const value = info.getValue();
    if (!value) return <EmptyCell />;

    return String(value);
  },
};

const columns: ColumnDef<BrewingRecord>[] = [
  { accessorKey: "number", header: "" },
  { accessorKey: "name", header: "Name", cell: renderNameCell },
  { accessorKey: "style", header: "Style" },
  { accessorKey: "volume", header: "Volume" },
  { accessorKey: "og", header: "OG", cell: renderMonospaceNumber },
  { accessorKey: "fg", header: "FG", cell: renderMonospaceNumber },
  { accessorKey: "abv", header: "ABV" },
  { accessorKey: "ibu", header: "IBU" },
  {
    accessorKey: "srm",
    header: "SRM",
    cell: renderSrmCell,
  },
  {
    accessorKey: "clarity",
    header: "Clarity",
  },
  {
    accessorKey: "brewDate",
    header: "Brew Date",
    cell: renderDateCell,
  },
  {
    accessorKey: "bottleDate",
    header: "Bottle Date",
    cell: renderDateCell,
  },
];

const BrewingLog = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: brewingLog,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    defaultColumn: renderDefaultColumn,
  });

  return (
    <div className="overflow-x-auto w-full max-w-6xl rounded-xl border border-gray-200 shadow-lg">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-gray-800 uppercase text-xs font-semibold bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.getIsSorted();

                return (
                  <th
                    key={header.id}
                    className="px-4 py-3 border-b border-gray-200 cursor-pointer select-none group"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <div
                        className={cn(
                          "p-1 rounded duration-250 outline outline-black/0 text-gray-400 bg-white group-hover:outline-black/10 group-hover:shadow-md",
                          isSorted && "outline-black/10 shadow-md text-black"
                        )}
                      >
                        {isSorted === "asc" && <ArrowUp size={14} />}
                        {isSorted === "desc" && <ArrowDown size={14} />}
                        {!isSorted && <ArrowUpDown size={14} />}
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={cn(
                "bg-white hover:bg-gray-100 transition-colors duration-250"
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3 border-b border-gray-200"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrewingLog;
