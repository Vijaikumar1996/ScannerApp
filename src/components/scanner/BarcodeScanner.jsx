import { useRef, useState } from "react";

import {
  ScanLine,
  CheckCircle2,
  CircleAlert,
  Camera,
} from "lucide-react";

export default function BarcodeScanner({
  theme = "blue",
  expectedCount = 0,
  sessionScans,
  setSessionScans,
}) {

  const inputRef = useRef(null);

  const [barcode, setBarcode] = useState("");

  const [lastScanned, setLastScanned] = useState(null);

  const [scanStatus, setScanStatus] = useState(null);

  /* ---------------- Theme Styles ---------------- */

  const themes = {
    blue: {
      button: "bg-blue-600",
      focus: "focus:border-blue-500",
      icon: "text-blue-600",
      summary: "text-blue-700",
    },

    orange: {
      button: "bg-orange-600",
      focus: "focus:border-orange-500",
      icon: "text-orange-600",
      summary: "text-orange-700",
    },

    green: {
      button: "bg-green-600",
      focus: "focus:border-green-500",
      icon: "text-green-600",
      summary: "text-green-700",
    },
  };

  const currentTheme = themes[theme];

  /* ---------------- Summary ---------------- */

  const scannedCount = sessionScans.length;

  const pendingCount =
    expectedCount - scannedCount;

  /* ---------------- Process Barcode ---------------- */

  const processBarcode = () => {

    if (!barcode.trim()) {
      return;
    }

    const normalizedBarcode = barcode.trim();

    /* ---------------- Duplicate Check ---------------- */

    const alreadyExists = sessionScans.some(
      (item) => item.huNumber === normalizedBarcode
    );

    if (alreadyExists) {

      setScanStatus("DUPLICATE");

      setLastScanned(normalizedBarcode);

    } else {

      setScanStatus("SUCCESS");

      setLastScanned(normalizedBarcode);

      setSessionScans((prev) => [
        {
          huNumber: normalizedBarcode,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "SCANNED",
        },
        ...prev,
      ]);
    }

    setBarcode("");

    setTimeout(() => {

      inputRef.current?.focus();

    }, 100);
  };

  /* ---------------- Camera Scan ---------------- */

  const handleCameraScan = () => {

    // CAMERA INTEGRATION HERE

    console.log("Open Camera Scanner");
  };

  return (

    <div className="space-y-5">

      {/* Camera Button */}

      <button
        onClick={handleCameraScan}
        className={`
          w-full
          ${currentTheme.button}
          text-white
          rounded-2xl
          py-4
          font-semibold
          flex
          items-center
          justify-center
          gap-2
          active:scale-[0.99]
          transition
        `}
      >

        <Camera className="w-5 h-5" />

        Open Camera Scanner

      </button>


      {/* Manual Barcode Entry */}

      <div className="bg-white rounded-2xl border border-gray-200 p-5">

        <div className="flex items-center gap-2 mb-4">

          <ScanLine
            className={`w-5 h-5 ${currentTheme.icon}`}
          />

          <h2 className="text-lg font-semibold text-gray-900">
            Manual Barcode Entry
          </h2>

        </div>

        <input
          ref={inputRef}
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              e.preventDefault();

              processBarcode();
            }
          }}
          onBlur={() => {

            processBarcode();
          }}
          placeholder="Scan or enter HU barcode"
          className={`
            w-full
            border-2
            border-gray-300
            rounded-2xl
            px-5
            py-4
            text-lg
            font-semibold
            tracking-wide
            focus:outline-none
            ${currentTheme.focus}
          `}
        />

      </div>


      {/* Scan Result */}

      {
        lastScanned && (
          <div
            className={`
              rounded-2xl
              border
              p-5
              ${
                scanStatus === "SUCCESS"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }
            `}
          >

            <div className="flex items-start gap-3">

              <div
                className={`
                  rounded-2xl
                  p-3
                  ${
                    scanStatus === "SUCCESS"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }
                `}
              >

                {
                  scanStatus === "SUCCESS"
                    ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    )
                    : (
                      <CircleAlert className="w-6 h-6 text-red-600" />
                    )
                }

              </div>

              <div>

                <p
                  className={`
                    text-lg
                    font-bold
                    ${
                      scanStatus === "SUCCESS"
                        ? "text-green-700"
                        : "text-red-700"
                    }
                  `}
                >
                  {
                    scanStatus === "SUCCESS"
                      ? "Scan Added"
                      : "Duplicate Barcode"
                  }
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  HU {lastScanned}
                </p>

              </div>

            </div>

          </div>
        )
      }


      {/* Summary */}

      <div className="grid grid-cols-3 gap-3">

        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">

          <p className="text-xs text-gray-500">
            Scanned
          </p>

          <p className="text-2xl font-bold text-green-700 mt-2">
            {scannedCount}
          </p>

        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-center">

          <p className="text-xs text-gray-500">
            Pending
          </p>

          <p className="text-2xl font-bold text-orange-700 mt-2">
            {pendingCount}
          </p>

        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">

          <p className="text-xs text-gray-500">
            Expected
          </p>

          <p className={`text-2xl font-bold mt-2 ${currentTheme.summary}`}>
            {expectedCount}
          </p>

        </div>

      </div>


      {/* Current Session */}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

        <div className="p-5 border-b border-gray-100">

          <h2 className="text-lg font-semibold text-gray-900">
            Current Session Scans
          </h2>

        </div>

        <div className="divide-y divide-gray-100">

          {
            sessionScans.length > 0 ? (
              sessionScans.map((item, index) => (
                <div
                  key={index}
                  className="px-5 py-3"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="font-semibold text-sm text-gray-900">
                        HU {item.huNumber}
                      </p>

                      <p className="text-xs text-green-600 mt-1">
                        {item.status}
                      </p>

                    </div>

                    <p className="text-xs text-gray-400">
                      {item.time}
                    </p>

                  </div>

                </div>
              ))
            ) : (
              <div className="px-5 py-6 text-center text-sm text-gray-500">
                No scans added yet
              </div>
            )
          }

        </div>

      </div>

    </div>

  );
}