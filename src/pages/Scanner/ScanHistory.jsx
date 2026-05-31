import { useMemo, useState } from "react";

import {
  ScanLine,
  Warehouse,
  Truck,
  PackageCheck,
  Search,
} from "lucide-react";

export default function ScanHistory() {

  const [search, setSearch] = useState("");

  /* ---------------- Dummy Data ---------------- */

  const scans = [
    {
      huNumber: "161202731",
      salesOrder: "350736762",
      stage: "HUB RECEIVE",
      time: "10:32 AM",
      date: "24 May 2026",
    },

    {
      huNumber: "164165971",
      salesOrder: "350736762",
      stage: "VEHICLE LOADING",
      time: "11:10 AM",
      date: "24 May 2026",
    },

    {
      huNumber: "161187260",
      salesOrder: "350736763",
      stage: "DELIVERY",
      time: "12:25 PM",
      date: "24 May 2026",
    },

    {
      huNumber: "161202888",
      salesOrder: "350736764",
      stage: "DELIVERY",
      time: "01:40 PM",
      date: "24 May 2026",
    },
  ];

  /* ---------------- Stage Config ---------------- */

  const stageConfig = {
    "HUB RECEIVE": {
      icon: Warehouse,
      text: "text-blue-600",
      bg: "bg-blue-100",
    },

    "VEHICLE LOADING": {
      icon: Truck,
      text: "text-orange-600",
      bg: "bg-orange-100",
    },

    DELIVERY: {
      icon: PackageCheck,
      text: "text-green-600",
      bg: "bg-green-100",
    },
  };

  /* ---------------- Filtered Data ---------------- */

  const filteredScans = useMemo(() => {

    if (!search.trim()) {
      return scans;
    }

    return scans.filter((item) =>
      item.huNumber.includes(search) ||
      item.salesOrder.includes(search)
    );

  }, [search]);

  return (

    <div className="space-y-5 pb-24">

      {/* Header */}

      <div className="bg-white rounded-2xl border border-gray-200 p-5">

        <div className="flex items-center gap-3">

          <div className="bg-gray-100 rounded-2xl p-3">

            <ScanLine className="w-6 h-6 text-gray-700" />

          </div>

          <div>

            <h1 className="text-xl font-bold text-gray-900">
              Scan History
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              View recent barcode scan activities
            </p>

          </div>

        </div>

      </div>


      {/* Search */}

      <div className="bg-white rounded-2xl border border-gray-200 p-4">

        <div className="relative">

          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search HU or Sales Order"
            className="
              w-full
              border
              border-gray-300
              rounded-2xl
              pl-12
              pr-4
              py-4
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

      </div>


      {/* Scan List */}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

        <div className="divide-y divide-gray-100">

          {
            filteredScans.length > 0 ? (
              filteredScans.map((item, index) => {

                const config = stageConfig[item.stage];

                const Icon = config.icon;

                return (

                  <div
                    key={index}
                    className="px-5 py-4"
                  >

                    <div className="flex items-start gap-4">

                      {/* Icon */}

                      <div
                        className={`
                          ${config.bg}
                          rounded-xl
                          p-2.5
                          mt-1
                        `}
                      >

                        <Icon
                          className={`
                            w-5
                            h-5
                            ${config.text}
                          `}
                        />

                      </div>


                      {/* Content */}

                      <div className="flex-1 min-w-0">

                        <div className="flex items-center justify-between gap-3">

                          {/* Left */}

                          <div>

                            <p className="font-semibold text-sm text-gray-900">
                              HU {item.huNumber}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                              SO : {item.salesOrder}
                            </p>

                          </div>


                          {/* Center */}

                          <div className="flex-1 flex justify-center">

                            <span
                              className={`
                                inline-flex
                                items-center
                                justify-center
                                rounded-full
                                px-4
                                py-1.5
                                text-xs
                                font-semibold
                                whitespace-nowrap
                                ${config.bg}
                                ${config.text}
                              `}
                            >
                              {item.stage}
                            </span>

                          </div>


                          {/* Right */}

                          <div className="text-right whitespace-nowrap">

                            <p className="text-xs text-gray-400">
                              {item.time}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                              {item.date}
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                );
              })
            ) : (
              <div className="px-5 py-10 text-center text-sm text-gray-500">

                No scan history found

              </div>
            )
          }

        </div>

      </div>

    </div>

  );
}