import { useMemo } from "react";
import { useNavigate } from "react-router";
import DataTable from "../common/DataTable";

export default function RecentOrders() {
  const navigate = useNavigate();

  // Hardcoded sample data
  const orders = [
    {
      saleOrder: "350736762",
      vehicle: "TN01AB1234",
      expected: 67,
      scanned: 45,
      status: "IN_HUB",
    },
    {
      saleOrder: "350736763",
      vehicle: "TN09XY5521",
      expected: 40,
      scanned: 40,
      status: "DELIVERED",
    },
    {
      saleOrder: "350736764",
      vehicle: "TN11AZ9912",
      expected: 80,
      scanned: 72,
      status: "OUT_FOR_DELIVERY",
    },
    {
      saleOrder: "350736765",
      vehicle: "TN22BB7788",
      expected: 55,
      scanned: 12,
      status: "PENDING_HUB_RECEIVE",
    },
  ];

  const pinnedColumns = useMemo(
    () => ({
      left: ["saleOrder"],
    }),
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "saleOrder",
        header: "Sale Order",
        cell: (info) => (
          <span className="font-semibold text-gray-800 whitespace-nowrap">
            {info.getValue()}
          </span>
        ),
      },

      {
        accessorKey: "vehicle",
        header: "Vehicle",
        cell: (info) => (
          <span className="text-gray-600 whitespace-nowrap">
            {info.getValue()}
          </span>
        ),
      },

      {
        accessorKey: "expected",
        header: "Expected",
        cell: (info) => (
          <span className="font-medium">
            {info.getValue()}
          </span>
        ),
      },

      {
        accessorKey: "scanned",
        header: "Scanned",
        cell: (info) => (
          <span className="font-medium">
            {info.getValue()}
          </span>
        ),
      },

      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;

          const styles = {
            PENDING_HUB_RECEIVE:
              "bg-orange-100 text-orange-700",

            IN_HUB:
              "bg-blue-100 text-blue-700",

            OUT_FOR_DELIVERY:
              "bg-cyan-100 text-cyan-700",

            DELIVERED:
              "bg-green-100 text-green-700",
          };

          return (
            <span
              className={`
                px-3
                py-1
                rounded-full
                text-xs
                font-medium
                whitespace-nowrap
                ${styles[status]}
              `}
            >
              {status.replaceAll("_", " ")}
            </span>
          );
        },
      },

      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <button
            onClick={() =>
              navigate(`/orders/${row.original.saleOrder}`)
            }
            className="text-blue-600 hover:underline whitespace-nowrap"
          >
            View
          </button>
        ),
      },
    ],
    [navigate]
  );

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Orders
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest shipment tracking activity
          </p>
        </div>

        <button
          onClick={() => navigate("/orders")}
          className="
            px-4
            py-2
            text-sm
            font-medium
            bg-gray-900
            text-white
            rounded-xl
            hover:bg-black
          "
        >
          View All
        </button>
      </div>

      {/* Table */}
      <DataTable
        data={orders}
        columns={columns}
        pageSize={5}
        pinnedColumns={pinnedColumns}
        emptyMessage="No recent orders found"
        globalSearch={false}
      />
    </div>
  );
}