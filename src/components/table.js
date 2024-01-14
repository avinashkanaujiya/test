import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../redux/authSlice";
import { fetchWatchlist } from "../api/api";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { API_BASE_URL } from "../data/data";
import dayjs from "dayjs";
const Table = () => {
  const [list, setList] = useState(null);
  const [sorting, setSorting] = useState([]);
  const endDate = useSelector((state) => state.common.selectedDate);
  useEffect(() => {
    const getData = async () => {
      setList(await fetchWatchlist(endDate));
    };
    getData();
  }, [endDate]);
  const copyToClipboard = (index, rid) => {
    if (`${index}` === rid) {
      var copyText = document.querySelectorAll("#tickername")[index];
      if (copyText) {
        navigator.clipboard.writeText(copyText.innerHTML);
      }
    }
  };
  useEffect(() => {
    // if (!list) {
    //   let d = dayjs(endDate);
    //   const date = `${d.year()}-${d.month() + 1}-${d.date()}`;
    //   axios.get(`${API_BASE_URL}/buy/month/${date}`);
    // }
  }, [list]);
  const columnHelper = createColumnHelper();
  const columns = useMemo(() => {
    let x = 0;
    return [
      columnHelper.accessor("s", {
        header: () => "No.",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("ticker", {
        header: () => "Ticker",
        cell: (info) => info.getValue(),
      }),
      // columnHelper.accessor("avg_purchase_price", {
      //   header: () => "Avg Purchase Price",
      //   cell: (info) => {
      //     let data = info.getValue();
      //     return Number.parseFloat(data).toFixed(2);
      //   },
      // }),
      // columnHelper.accessor("ltp", {
      //   header: () => "Last Traded Price",
      //   cell: (info) => info.getValue(),
      // }),
      columnHelper.accessor("price_diff_percent", {
        header: () => "Change (%)",
        cell: (info) => {
          let data = info.getValue();
          return Number.parseFloat(data).toFixed(2);
        },
      }),
      // {
      //   accessorKey: "ticker",
      //   header: "Tickers",
      // },
      // {
      //   accessorKey: "name",
      //   header: "Name",
      // },
    ];
  }, []);
  const flexRenderCustom = (d1, d2, d3) => {
    let data = flexRender(d1, d2).props.getValue(d3).split(":")[1];
    // console.log(data, "flexRenderCustom");
    return data;
  };
  const table = useReactTable({
    data: list,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <div className="home-table w-screen">
      {list && (
        <table className="w-full">
          <thead className="my-4 py-4">
            {table.getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-zinc-400 text-zinc-900	">
                {headerGroup.headers.map((header, index) => (
                  <th
                    // className=" w-auto min-w-min max-w-full"
                    className={[
                      `text-grey-400  py-4 ${
                        index === 0 ? "w-10 text-center" : ""
                      } ${index === 1 ? "w-6 text-start" : ""} ${
                        index === 2 ? "w-10 text-center" : ""
                      }`,
                    ]}
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table.getRowModel()?.rows.map((row, index) => (
              <tr
                key={row.id}
                className={`${
                  list[index].held ? "text-green-400" : "text-grey-400"
                } ${index % 2 ? "bg-orange-200" : "bg-orange-100"} h-8 `}
              >
                {row.getVisibleCells().map((cell, cindex) => (
                  <td
                    key={cell.id}
                    className={[
                      ` ${cindex !== 1 ? "" : ""} ${cindex !== 2 ? "" : ""} ${
                        cindex !== 1 ? "text-center" : ""
                      }`,
                    ]}
                  >
                    {cindex === 0 && index + 1}
                    {cell.column.id === "ticker" && (
                      <div
                        className="cursor-pointer	"
                        id="tickername"
                        onClick={() => copyToClipboard(index, cell.row.id)}
                      >
                        {flexRenderCustom(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                          cell.column.id
                        )}
                      </div>
                    )}
                    {cindex === 2 &&
                      flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
