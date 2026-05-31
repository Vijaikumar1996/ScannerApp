import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import InputField from "../../components/form/form-input/InputField";
import FormGrid from "../../components/form/FormGrid";

/* ---------------- Schema ---------------- */

const shipmentUploadSchema = z.object({
    sales_order_number: z
        .string()
        .min(1, "Sales order number is required"),

    shipment_date: z
        .string()
        .min(1, "Shipment date is required"),

    vehicle_number: z.string().optional(),

    delivery_address: z
        .string()
        .min(1, "Delivery address is required"),

    remarks: z.string().optional(),

    file: z.any().refine(
        (files) => files?.length > 0,
        "Excel file is required"
    ),
});

/* ---------------- Component ---------------- */

export default function ShipmentUploadForm({
    defaultValues,
    onSubmit,
    isLoading,
    onCancel,
}) {

    const [selectedFile, setSelectedFile] = useState("");

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(shipmentUploadSchema),
        defaultValues,
    });

    const fileRegister = register("file");

    return (

        <div className="max-w-3xl mx-auto">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                {/* Header */}

                <div className="border-b border-gray-200 px-8 py-6">

                    <h2 className="text-2xl font-semibold text-gray-800">
                        Upload Shipment
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Upload shipment Excel received from operations email
                    </p>

                </div>


                {/* Form */}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-8 space-y-6"
                >

                    {/* Sales Order Number + Shipment Date */}

                    <FormGrid>

                        <InputField
                            name="sales_order_number"
                            label="Sales Order Number"
                            control={control}
                            error={errors.sales_order_number}
                            required
                            placeholder="Enter sales order number"
                        />

                        <InputField
                            name="shipment_date"
                            label="Shipment Date"
                            type="date"
                            control={control}
                            error={errors.shipment_date}
                            required
                        />

                    </FormGrid>


                    {/* Vehicle Number + Remarks */}

                    <FormGrid>

                        <InputField
                            name="vehicle_number"
                            label="Vehicle Number"
                            control={control}
                            error={errors.vehicle_number}
                            placeholder="Eg: TN01AB1234"
                        />

                        <InputField
                            name="remarks"
                            label="Remarks"
                            control={control}
                            error={errors.remarks}
                            placeholder="Optional remarks"
                        />

                    </FormGrid>


                    {/* Delivery Address */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Delivery Address
                            <span className="text-red-500 ml-1">*</span>
                        </label>

                        <textarea
                            rows={4}
                            {...register("delivery_address")}
                            placeholder="Enter complete delivery address"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {errors.delivery_address && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.delivery_address.message}
                            </p>
                        )}

                    </div>


                    {/* Upload Section */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Excel File
                            <span className="text-red-500 ml-1">*</span>
                        </label>

                        <label className="cursor-pointer block">

                            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">

                                <div className="text-5xl mb-3">
                                    📄
                                </div>

                                <p className="text-sm font-semibold text-gray-700">
                                    Click to upload shipment Excel
                                </p>

                                <p className="text-xs text-gray-500 mt-2">
                                    Supported formats: XLSX, XLS, CSV
                                </p>

                                {selectedFile && (
                                    <div className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
                                        {selectedFile}
                                    </div>
                                )}

                                <input
                                    type="file"
                                    accept=".xlsx,.xls,.csv"
                                    className="hidden"
                                    {...fileRegister}
                                    onChange={(e) => {
                                        fileRegister.onChange(e);

                                        if (e.target.files?.[0]) {
                                            setSelectedFile(
                                                e.target.files[0].name
                                            );
                                        }
                                    }}
                                />

                            </div>

                        </label>

                        {errors.file && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.file.message}
                            </p>
                        )}

                    </div>


                    {/* Info Box */}

                    <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">

                        <h4 className="text-sm font-semibold text-blue-800 mb-2">
                            Upload Instructions
                        </h4>

                        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">

                            <li>
                                Enter the sales order number from email subject
                            </li>

                            <li>
                                Upload shipment Excel received through email
                            </li>

                            <li>
                                Ensure HU numbers are available in the sheet
                            </li>

                            <li>
                                Duplicate package numbers will be validated
                            </li>

                            <li>
                                Supported formats: XLSX, XLS, CSV
                            </li>

                        </ul>

                    </div>


                    {/* Buttons */}

                    <div className="flex justify-end gap-3 pt-2">

                        <button
                            type="button"
                            onClick={onCancel}
                            className="border border-gray-300 px-5 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {isLoading ? "Uploading..." : "Upload Shipment"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}