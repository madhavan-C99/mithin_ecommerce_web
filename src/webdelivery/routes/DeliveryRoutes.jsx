// // 📁 src/webdelivery/routes/DeliveryRoutes.jsx

// import { Routes, Route, Navigate } from "react-router-dom";
// import { lazy, Suspense } from "react";
// import ProtectedDeliveryRoute from "./ProtectedDeliveryRoute";
// import DeliveryLoginPage from "../pages/DeliveryLoginPage";
// import DeliveryLayout from "../components/layout/DeliveryLayout";

// /**
//  * DeliveryRoutes
//  *
//  * ✅ FIX: Paths are now RELATIVE (no leading /delivery prefix).
//  * The parent route in App.jsx owns "/delivery/*" and renders this component.
//  * React Router v6 nested routing resolves relative paths automatically.
//  *
//  * login      → /delivery/login
//  * (index)    → /delivery  → redirects to /delivery/dashboard
//  * dashboard  → /delivery/dashboard
//  * orders     → /delivery/orders
//  * history    → /delivery/history
//  */

// const DashboardPage     = lazy(() => import("../pages/DashboardPage"));
// const CurrentOrdersPage = lazy(() => import("../pages/CurrentOrdersPage"));
// const OrderHistoryPage  = lazy(() => import("../pages/OrderHistoryPage"));

// const DeliveryRoutes = () => {
//   return (
//     <Routes>
//       {/* Public */}
//       <Route path="login" element={<DeliveryLoginPage />} />

//       {/* Protected — all under DeliveryLayout */}
//       <Route
//         path="/"
//         element={
//           <ProtectedDeliveryRoute>
//             <DeliveryLayout />
//           </ProtectedDeliveryRoute>
//         }
//       >
//         {/* /delivery → /delivery/dashboard */}
//         <Route index element={<Navigate to="dashboard" replace />} />

//         <Route
//           path="dashboard"
//           element={
//             <Suspense fallback={null}>
//               <DashboardPage />
//             </Suspense>
//           }
//         />
//         <Route
//           path="orders"
//           element={
//             <Suspense fallback={null}>
//               <CurrentOrdersPage />
//             </Suspense>
//           }
//         />
//         <Route
//           path="history"
//           element={
//             <Suspense fallback={null}>
//               <OrderHistoryPage />
//             </Suspense>
//           }
//         />
//       </Route>
//     </Routes>
//   );
// };

// export default DeliveryRoutes;











// 📁 src/webdelivery/routes/DeliveryRoutes.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedDeliveryRoute from "./ProtectedDeliveryRoute";
import DeliveryLoginPage from "../pages/DeliveryLoginPage";
import DeliveryLayout from "../components/layout/DeliveryLayout";

const DashboardPage     = lazy(() => import("../pages/DashboardPage"));
const CurrentOrdersPage = lazy(() => import("../pages/CurrentOrdersPage"));
const OrderHistoryPage  = lazy(() => import("../pages/OrderHistoryPage"));
const OtpPage           = lazy(() => import("../pages/OtpPage")); // ✅ new

const DeliveryRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="login" element={<DeliveryLoginPage />} />

      {/* Protected — all wrapped in DeliveryLayout */}
      <Route
        path="/"
        element={
          <ProtectedDeliveryRoute>
            <DeliveryLayout />
          </ProtectedDeliveryRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route
          path="dashboard"
          element={<Suspense fallback={null}><DashboardPage /></Suspense>}
        />
        <Route
          path="orders"
          element={<Suspense fallback={null}><CurrentOrdersPage /></Suspense>}
        />
        <Route
          path="history"
          element={<Suspense fallback={null}><OrderHistoryPage /></Suspense>}
        />
        {/* ✅ OTP page — inside layout, protected */}
        <Route
          path="otp"
          element={<Suspense fallback={null}><OtpPage /></Suspense>}
        />
      </Route>
    </Routes>
  );
};

export default DeliveryRoutes;