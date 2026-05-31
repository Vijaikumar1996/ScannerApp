import { useMemo, useState } from "react";

import { Warehouse } from "lucide-react";

import BarcodeScanner from "../../components/scanner/BarcodeScanner";

export default function HubReceive() {

  const [selectedOrder, setSelectedOrder] = useState("");

  const [sessionScans, setSessionScans] = useState([]);

  const [isCompleted, setIsCompleted] = useState(false);

  /* ---------------- Dummy Orders ---------------- */

  const orders = [
    {
      saleOrder: "350736762",
      destination: "New Delhi",
      expected: 160,
    },

    {
      saleOrder: "350736763",
      destination: "Bangalore",
      expected: 85,
    },

    {
      saleOrder: "350736764",
      destination: "Hyderabad",
      expected: 120,
    },
  ];

  /* ---------------- Shipment ---------------- */

  const shipment = useMemo(
    () =>
      orders.find(
        (item) => item.saleOrder === selectedOrder
      ),
    [selectedOrder]
  );

  /* ---------------- Complete Receive ---------------- */

  const handleCompleteReceive = async () => {

    if (!sessionScans.length) {
      return;
    }

    const payload = {
      salesOrder: selectedOrder,
      barcodes: sessionScans.map(
        (item) => item.huNumber
      ),
    };

    console.log("Complete Receive Payload :", payload);

    // API CALL HERE

    /*
      await completeHubReceive(payload)
    */

    setIsCompleted(true);
  };

  return (

    <div className="space-y-5 pb-24">

      {/* Header */}

      <div className="bg-white rounded-2xl border border-gray-200 p-5">

        <div className="flex items-center gap-3">

          <div className="bg-blue-100 rounded-2xl p-3">

            <Warehouse className="w-6 h-6 text-blue-600" />

          </div>

          <div>

            <h1 className="text-xl font-bold text-gray-900">
              Hub Receive
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Scan packages received at hub
            </p>

          </div>

        </div>

      </div>


      {/* Select Sales Order */}

      <div className="bg-white rounded-2xl border border-gray-200 p-5">

        <label className="block text-sm font-medium mb-3">
          Select Sales Order
        </label>

        <select
          value={selectedOrder}
          onChange={(e) => {

            setSelectedOrder(e.target.value);

            setSessionScans([]);

            setIsCompleted(false);
          }}
          className="
            w-full
            border
            border-gray-300
            rounded-2xl
            px-4
            py-4
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        >

          <option value="">
            Choose Sales Order
          </option>

          {
            orders.map((item) => (
              <option
                key={item.saleOrder}
                value={item.saleOrder}
              >
                {item.saleOrder} - {item.destination}
              </option>
            ))
          }

        </select>

      </div>


      {/* Shipment Sections */}

      {
        shipment && (
          <>

            {/* Shipment Info */}

            <div className="bg-white rounded-2xl border border-gray-200 p-5">

              <div className="space-y-4">

                <div className="flex items-center justify-between">

                  <p className="text-sm text-gray-500">
                    Sales Order
                  </p>

                  <p className="font-semibold text-gray-900">
                    {shipment.saleOrder}
                  </p>

                </div>

                <div className="flex items-center justify-between">

                  <p className="text-sm text-gray-500">
                    Destination
                  </p>

                  <p className="font-semibold text-gray-900">
                    {shipment.destination}
                  </p>

                </div>

                <div className="flex items-center justify-between">

                  <p className="text-sm text-gray-500">
                    Expected Packages
                  </p>

                  <p className="font-semibold text-gray-900">
                    {shipment.expected}
                  </p>

                </div>

              </div>

            </div>


            {/* Barcode Scanner */}

            <BarcodeScanner
              theme="blue"
              expectedCount={shipment.expected}
              sessionScans={sessionScans}
              setSessionScans={setSessionScans}
            />


            {/* Complete Button */}

            <button
              onClick={handleCompleteReceive}
              disabled={!sessionScans.length || isCompleted}
              className="
                w-full
                bg-blue-600
                text-white
                rounded-2xl
                py-4
                font-semibold
                transition
                disabled:opacity-50
              "
            >
              {
                isCompleted
                  ? "Hub Receive Completed"
                  : "Complete Hub Receive"
              }
            </button>

          </>
        )
      }

    </div>

  );
}