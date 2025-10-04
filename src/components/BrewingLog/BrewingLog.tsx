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
import { formatDate } from "@/utils/formatDate";
import { srmColors } from "@/data/srmColors";
import { getContrastTextColor } from "@/utils/getContrastTextColor";

const renderSrmCell = (info: CellContext<BrewingRecord, unknown>) => {
  const value = info.getValue<number>();

  if (!value) {
    return "-";
  }

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

    if (value == null || value == "") {
      return "-";
    }

    return String(value);
  },
};

const columns: ColumnDef<BrewingRecord>[] = [
  { accessorKey: "number", header: "#" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "style", header: "Style" },
  { accessorKey: "volume", header: "Volume (L)" },
  { accessorKey: "og", header: "OG" },
  { accessorKey: "fg", header: "FG" },
  { accessorKey: "abv", header: "ABV (%)" },
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
    cell: (info) => formatDate(info.getValue()),
  },
  {
    accessorKey: "bottleDate",
    header: "Bottle Date",
    cell: (info) => formatDate(info.getValue()),
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
                    className="px-4 py-3 border-b border-gray-200 cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {isSorted === "asc" && (
                        <ArrowUp size={14} className="text-gray-600" />
                      )}
                      {isSorted === "desc" && (
                        <ArrowDown size={14} className="text-gray-600" />
                      )}
                      {!isSorted && (
                        <ArrowUpDown size={14} className="text-gray-400" />
                      )}
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
