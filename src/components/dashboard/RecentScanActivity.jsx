import {
  ScanLine,
  Warehouse,
  Truck,
  PackageCheck,
} from "lucide-react";

export default function RecentScanActivity() {

  const activities = [
    {
      huNumber: "161202731",
      stage: "HUB RECEIVE",
      time: "10:32 AM",
      order: "350736762",
    },

    {
      huNumber: "164165971",
      stage: "VEHICLE LOADING",
      time: "10:45 AM",
      order: "350736763",
    },

    {
      huNumber: "161187260",
      stage: "DELIVERY",
      time: "11:05 AM",
      order: "350736764",
    },

    {
      huNumber: "161202888",
      stage: "DELIVERY",
      time: "11:22 AM",
      order: "350736765",
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
      text: "text-cyan-600",
      bg: "bg-cyan-100",
    },

    DELIVERY: {
      icon: PackageCheck,
      text: "text-green-600",
      bg: "bg-green-100",
    },
  };

  return (

    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

      {/* Header */}

      <div className="p-5 border-b border-gray-100">

        <div className="flex items-center gap-3">

          <div className="bg-gray-100 p-2.5 rounded-xl">

            <ScanLine className="h-5 w-5 text-gray-700" />

          </div>

          <div>

            <h2 className="text-lg font-semibold text-gray-800">
              Scan History
            </h2>

            <p className="text-sm text-gray-500">
              Recent barcode scan updates
            </p>

          </div>

        </div>

      </div>


      {/* Activity List */}

      <div className="divide-y divide-gray-100 max-h-[420px] overflow-y-auto">

        {activities.map((item, index) => {

          const config = stageConfig[item.stage];

          const Icon = config.icon;

          return (

            <div
              key={index}
              className="
                px-5
                py-4
                active:bg-gray-50
                transition
              "
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
                      h-5
                      w-5
                      ${config.text}
                    `}
                  />

                </div>


                {/* Content */}

                <div className="flex-1 min-w-0">

                  {/* HU + SO */}

                  <div className="flex items-center justify-between gap-3">

                    {/* Left */}

                    <div>

                      <p className="font-semibold text-gray-900 text-sm">
                        HU {item.huNumber}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        SO : {item.order}
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

                    <div>

                      <p className="text-xs text-gray-400 whitespace-nowrap">
                        {item.time}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          );
        })}

      </div>

    </div>

  );
}