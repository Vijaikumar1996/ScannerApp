import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import DataTable from "../../components/common/DataTable";
import InputField from "../../components/form/form-input/InputField";
import FormGrid from "../../components/form/FormGrid";

/* ---------------- Detail Item ---------------- */

function DetailItem({ label, value }) {

    return (
        <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-xs text-gray-500 mb-1">
                {label}
            </p>

            <p className="text-sm font-semibold text-gray-800">
                {value}
            </p>

        </div>
    );
}

/* ---------------- Component ---------------- */

export default function Orders() {

    const navigate = useNavigate();

    const [selectedOrder, setSelectedOrder] = useState(null);

    const { control } = useForm();

    /* ---------------- Sample Data ---------------- */

    const orders = [
        {
            saleOrder: "350736762",
            shipmentDate: "27-Nov-2024",
            vehicle: "TN01AB1234",
            destination: "New Delhi",
            packages: 160,
            uploadedBy: "Ravi",
            status: "IN_TRANSIT",
            createdAt: "11:20 AM",
        },

        {
            saleOrder: "350736763",
            shipmentDate: "28-Nov-2024",
            vehicle: "TN09XY5521",
            destination: "Bangalore",
            packages: 85,
            uploadedBy: "Kumar",
            status: "DELIVERED",
            createdAt: "09:45 AM",
        },

        {
            saleOrder: "350736764",
            shipmentDate: "29-Nov-2024",
            vehicle: "TN11AZ9912",
            destination: "Hyderabad",
            packages: 72,
            uploadedBy: "Arun",
            status: "OUT_FOR_DELIVERY",
            createdAt: "10:10 AM",
        },

        {
            saleOrder: "350736765",
            shipmentDate: "30-Nov-2024",
            vehicle: "TN22BB7788",
            destination: "Mumbai",
            packages: 120,
            uploadedBy: "Vijay",
            status: "PENDING_HUB_RECEIVE",
            createdAt: "08:25 AM",
        },
    ];

    /* ---------------- Pinned Columns ---------------- */

    const pinnedColumns = useMemo(
        () => ({
            left: ["saleOrder"],
        }),
        []
    );

    /* ---------------- Columns ---------------- */

    const columns = useMemo(
        () => [
            {
                accessorKey: "saleOrder",
                header: "Sales Order",
                cell: (info) => (
                    <span className="font-semibold text-gray-800 whitespace-nowrap">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "shipmentDate",
                header: "Shipment Date",
                cell: (info) => (
                    <span className="text-gray-600 whitespace-nowrap">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "vehicle",
                header: "Vehicle No",
                cell: (info) => (
                    <span className="text-gray-600 whitespace-nowrap">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "destination",
                header: "Destination",
                cell: (info) => (
                    <span className="text-gray-600 whitespace-nowrap">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "packages",
                header: "Packages",
                cell: (info) => (
                    <span className="font-medium whitespace-nowrap">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "uploadedBy",
                header: "Uploaded By",
                cell: (info) => (
                    <span className="text-gray-600 whitespace-nowrap">
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

                        IN_TRANSIT:
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
                accessorKey: "createdAt",
                header: "Created At",
                cell: (info) => (
                    <span className="text-gray-600 whitespace-nowrap">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <button
                        onClick={() => setSelectedOrder(row.original)}
                        className="
                            text-blue-600
                            hover:underline
                            whitespace-nowrap
                            font-medium
                        "
                    >
                        View
                    </button>
                ),
            },
        ],
        []
    );

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-2xl font-semibold text-gray-800">
                        Orders
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage uploaded shipment orders
                    </p>

                </div>

                <button
                    onClick={() => navigate("/uploadshipment")}
                    className="
                        px-5
                        py-2.5
                        bg-blue-600
                        text-white
                        rounded-xl
                        hover:bg-blue-700
                        transition
                    "
                >
                    + Upload Shipment
                </button>

            </div>


            {/* Main Section */}

            <div className="bg-white p-5 rounded-2xl border border-gray-200">

                {/* Filters */}

                <div className="mb-5">

                    <FormGrid cols={4}>

                        <InputField
                            name="sales_order"
                            label="Sales Order"
                            placeholder="Search sales order"
                            control={control}
                        />

                        <InputField
                            name="shipment_date"
                            label="Shipment Date"
                            type="date"
                            control={control}
                        />

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Status
                            </label>

                            <select
                                className="
                                    w-full
                                    border border-gray-300
                                    rounded-xl
                                    px-4 py-2.5
                                    text-sm
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            >

                                <option value="">
                                    All Status
                                </option>

                                <option value="PENDING_HUB_RECEIVE">
                                    Pending Hub Receive
                                </option>

                                <option value="IN_TRANSIT">
                                    In Transit
                                </option>

                                <option value="OUT_FOR_DELIVERY">
                                    Out For Delivery
                                </option>

                                <option value="DELIVERED">
                                    Delivered
                                </option>

                            </select>

                        </div>

                        <div className="flex items-end">

                            <button
                                className="
                                    w-full
                                    bg-gray-900
                                    text-white
                                    rounded-xl
                                    px-4 py-2.5
                                    hover:bg-black
                                    transition
                                "
                            >
                                Search
                            </button>

                        </div>

                    </FormGrid>

                </div>


                {/* Data Table */}

                <DataTable
                    data={orders}
                    columns={columns}
                    pageSize={10}
                    pinnedColumns={pinnedColumns}
                    emptyMessage="No orders found"
                    globalSearch={false}
                />

            </div>


            {/* View Drawer */}

            {
                selectedOrder && (
                    <div className="fixed inset-0 bg-black/40 z-1000 flex justify-end">

                        <div className="w-full max-w-xl bg-white h-full overflow-y-auto shadow-2xl">

                            {/* Header */}

                            <div className="flex items-center justify-between p-6 border-b">

                                <div>

                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Order Details
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Sales Order :
                                        {" "}
                                        {selectedOrder.saleOrder}
                                    </p>

                                </div>

                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="
                                        text-gray-500
                                        hover:text-black
                                        text-2xl
                                    "
                                >
                                    ×
                                </button>

                            </div>


                            {/* Content */}

                            <div className="p-6 space-y-5">

                                <div className="grid grid-cols-2 gap-4">

                                    <DetailItem
                                        label="Shipment Date"
                                        value={selectedOrder.shipmentDate}
                                    />

                                    <DetailItem
                                        label="Vehicle Number"
                                        value={selectedOrder.vehicle}
                                    />

                                    <DetailItem
                                        label="Destination"
                                        value={selectedOrder.destination}
                                    />

                                    <DetailItem
                                        label="Packages"
                                        value={selectedOrder.packages}
                                    />

                                    <DetailItem
                                        label="Uploaded By"
                                        value={selectedOrder.uploadedBy}
                                    />

                                    <DetailItem
                                        label="Created At"
                                        value={selectedOrder.createdAt}
                                    />

                                </div>


                                {/* Status */}

                                <div className="bg-gray-50 rounded-xl p-4">

                                    <p className="text-xs text-gray-500 mb-2">
                                        Current Status
                                    </p>

                                    <span
                                        className="
                                            inline-flex
                                            px-3
                                            py-1
                                            rounded-full
                                            text-xs
                                            font-medium
                                            bg-blue-100
                                            text-blue-700
                                        "
                                    >
                                        {selectedOrder.status.replaceAll("_", " ")}
                                    </span>

                                </div>


                                {/* Address */}

                                <div className="bg-gray-50 rounded-xl p-4">

                                    <p className="text-xs text-gray-500 mb-1">
                                        Delivery Address
                                    </p>

                                    <p className="text-sm text-gray-700 leading-6">
                                        Hospitality District Aerocity,
                                        Asset No. 13,
                                        New Delhi – 110037
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>
                )
            }

        </div>

    );
}