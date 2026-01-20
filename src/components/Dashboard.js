import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import API from "../api";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const location = useLocation();

  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [orders, setOrders] = useState([]);

  const refreshData = useCallback(async () => {
    try {
      const [h, p, o] = await Promise.all([
        API.get("/api/allHoldings"),
        API.get("/api/allPositions"),
        API.get("/api/allOrders")
      ]);

      setHoldings(h.data || []);
      setPositions(p.data || []);
      setOrders(o.data || []);
    } catch (err) {
      console.error("Dashboard refresh failed", err);
    }
  }, []);

  useEffect(() => {
    // 1️⃣ Read token from URL
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      window.history.replaceState({}, document.title, "/");
    }

    // 2️⃣ Check token
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "https://zerodhafnd-ui.vercel.app";
      return;
    }

    // 3️⃣ Load data
    refreshData();
  }, [location.search, refreshData]);

  return (
    <GeneralContextProvider>
      <div className="dashboard-container">
        {/* LEFT SIDE */}
        <WatchList onTradeSuccess={refreshData} />

        {/* RIGHT SIDE */}
        <div className="content">
          <Routes>
            <Route
              index
              element={
                <Summary
                  holdings={holdings}
                  positions={positions}
                />
              }
            />
            <Route
              path="holdings"
              element={<Holdings data={holdings} />}
            />
            <Route
              path="positions"
              element={<Positions data={positions} />}
            />
            <Route
              path="orders"
              element={<Orders data={orders} />}
            />
            <Route path="funds" element={<Funds />} />
            <Route path="apps" element={<Apps />} />
          </Routes>
        </div>
      </div>
    </GeneralContextProvider>
  );
};

export default Dashboard;




// import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import API from "../api";

// import Apps from "./Apps";
// import Funds from "./Funds";
// import Holdings from "./Holdings";
// import Orders from "./Orders";
// import Positions from "./Positions";
// import Summary from "./Summary";
// import WatchList from "./WatchList";
// import { GeneralContextProvider } from "./GeneralContext";

// const Dashboard = () => {
//   const [holdings, setHoldings] = useState([]);
//   const [positions, setPositions] = useState([]);
//   const [orders, setOrders] = useState([]);

//   const refreshData = async () => {
//     try {
//       const [h, p, o] = await Promise.all([
//         API.get("/allHoldings"),
//         API.get("/allPositions"),
//         API.get("/allOrders"),
//       ]);

//       setHoldings(h.data || []);
//       setPositions(p.data || []);
//       setOrders(o.data || []);
//     } catch (err) {
//       console.error("Failed to refresh dashboard data", err);
//     }
//   };

//   useEffect(() => {
//     refreshData();
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <GeneralContextProvider>
//         {/* 🔥 BUY/SELL notifies dashboard */}
//         <WatchList onTradeSuccess={refreshData} />
//       </GeneralContextProvider>

//       <div className="content">
//         <Routes>
//           <Route index element={<Summary />} />

//           <Route
//             path="holdings"
//             element={<Holdings data={holdings} />}
//           />

//           <Route
//             path="positions"
//             element={<Positions data={positions} />}
//           />

//           <Route
//             path="orders"
//             element={<Orders data={orders} />}
//           />

//           <Route path="funds" element={<Funds />} />
//           <Route path="apps" element={<Apps />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;













// import React from "react";
// import { Route, Routes } from "react-router-dom";

// import Apps from "./Apps";
// import Funds from "./Funds";
// import Holdings from "./Holdings";

// import Orders from "./Orders";
// import Positions from "./Positions";
// import Summary from "./Summary";
// import WatchList from "./WatchList";
// import { GeneralContextProvider } from "./GeneralContext";

// const Dashboard = () => {
//   return (
//     <div className="dashboard-container">
//       <GeneralContextProvider>
//         <WatchList />
//       </GeneralContextProvider>
//       <div className="content">
//         <Routes>
//           <Route exact path="/" element={<Summary />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/holdings" element={<Holdings />} />
//           <Route path="/positions" element={<Positions />} />
//           <Route path="/funds" element={<Funds />} />
//           <Route path="/apps" element={<Apps />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import TopBar from "./TopBar";
// import Apps from "./Apps";
// import Funds from "./Funds";
// import Holdings from "./Holdings";
// import Orders from "./Orders";
// import Positions from "./Positions";
// import Summary from "./Summary";
// import WatchList from "./WatchList";
// import { GeneralContextProvider } from "./GeneralContext";

// const Dashboard = () => {
//   return (
//     <div className="dashboard-container">
//       {/* LEFT SIDE */}
//       <GeneralContextProvider>
//         <WatchList />
//       </GeneralContextProvider>

//       {/* RIGHT SIDE */}
//       <div className="right-section">
//         {/* ✅ MAIN NAV BAR */}
//         <TopBar />

//         {/* PAGE CONTENT */}
//         <div className="content">
//           <Routes>
//             <Route index element={<Summary />} />
//             <Route path="orders" element={<Orders />} />
//             <Route path="holdings" element={<Holdings />} />
//             <Route path="positions" element={<Positions />} />
//             <Route path="funds" element={<Funds />} />
//             <Route path="apps" element={<Apps />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





