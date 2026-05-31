import {
  PackageCheck,
  ScanLine,
  Clock3,
} from "lucide-react";

export default function DashboardMetrics() {
  /* ---------------- Dashboard Data ---------------- */

  const data = {
    todayCompleted: 12,
    packagesScanned: 450,
    pending: 3,
  };

  /* ---------------- Summary Cards ---------------- */

  const summaryCards = [
    {
      title: "Completed",
      value: data.todayCompleted,
      description: "Orders completed today",
      icon: PackageCheck,
      bg: "bg-green-50",
      border: "border-green-200",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      valueColor: "text-green-700",
    },
    {
      title: "Scanned",
      value: data.packagesScanned,
      description: "Packages scanned today",
      icon: ScanLine,
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      valueColor: "text-blue-700",
    },
    {
      title: "Pending",
      value: data.pending,
      description: "Pending operations",
      icon: Clock3,
      bg: "bg-orange-50",
      border: "border-orange-200",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      valueColor: "text-orange-700",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Summary Cards */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className={`${card.bg} ${card.border} rounded-2xl border p-5`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {card.title}
                  </p>

                  <h3
                    className={`mt-2 text-3xl font-bold ${card.valueColor}`}
                  >
                    {card.value}
                  </h3>

                  <p className="mt-2 text-xs text-gray-500">
                    {card.description}
                  </p>
                </div>

                <div className={`${card.iconBg} rounded-2xl p-3`}>
                  <Icon className={`h-7 w-7 ${card.iconColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}