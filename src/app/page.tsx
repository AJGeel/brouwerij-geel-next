"use client";

import { brewingLog, BrewingRecord } from "@/data/brewingLog";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

const formatDate = (value: unknown) => {
  if (!value) return "-";
  try {
    return new Date(value as string).toLocaleDateString();
  } catch {
    return "-";
  }
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
  { accessorKey: "srm", header: "SRM" },
  {
    accessorKey: "clarity",
    header: "Clarity",
    cell: (info) => String(info.getValue() ?? "-"),
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

export default function Home() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: brewingLog,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="overflow-x-auto w-full max-w-6xl shadow-xl rounded-xl border border-gray-200">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-gray-800 uppercase text-xs font-semibold">
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
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={`${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-amber-100 transition-colors`}
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
    </div>
  );
}
