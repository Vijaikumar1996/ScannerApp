import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

import SignIn from "./pages/AuthPages/SignIn";
// import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";

import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";




import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import GlobalLoader from "./components/loader/GlobalLoader";
import Home from "./pages/Dashboard/Home";


import PrivateRoute from "./PrivateRoute";
import Orders from "./pages/Orders/Orders";
import Users from "./pages/Users/Users";
import HubReceive from "./pages/Scanner/HubReceive";
import VehicleLoading from "./pages/Scanner/VehicleLoading";
import Delivery from "./pages/Scanner/Delivery";
import ScanHistory from "./pages/Scanner/ScanHistory";


export default function App() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = isFetching || isMutating;

  // ✅ Detect mobile screen
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      {isLoading ? <GlobalLoader /> : null}

      <Router>
        <ScrollToTop />

        {/* ✅ Responsive Toaster */}
        <Toaster
          position={isMobile ? "bottom-center" : "top-center"}
          reverseOrder={false}
          gutter={8}
          containerStyle={
            isMobile
              ? { bottom: 20 }
              : { top: 20 }
          }
          toastOptions={{
            duration: 3000,
            style: {
              fontSize: "14px",
              zIndex: 999999,
              borderRadius: "8px",
              padding: "12px 16px",
            },
          }}
        />

        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route index path="/home" element={<Home />} />

              {/* Others Page */}
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/hubreceive" element={<HubReceive />} />
              <Route path="/vehicleloading" element={<VehicleLoading />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/scanhistory" element={<ScanHistory />} />
              <Route path="/users" element={<Users />} />
              <Route path="/orders" element={<Orders />} />          



              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
            </Route>
          </Route>

          {/* Auth Layout */}
          <Route path="/" element={<SignIn />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

