// src/webdelivery/routes/DeliveryRoutes.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedDeliveryRoute from "./ProtectedDeliveryRoute";
import DeliveryLoginPage from "../pages/DeliveryLoginPage";
import DeliveryLayout from "../components/layout/DeliveryLayout";

/**
 * DeliveryRoutes
 *
 * All delivery boy routes defined here.
 * - /delivery/login        → public
 * - /delivery/*            → protected behind ProtectedDeliveryRoute
 * - /delivery              → redirects to /delivery/dashboard
 *
 * Pages are lazy-imported to keep bundle size clean.
 * Add DashboardPage, CurrentOrdersPage, OrderHistoryPage here
 * as you build them next.
 */

// Lazy imports — add pages here as you build them
import { lazy, Suspense } from "react";

const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const CurrentOrdersPage = lazy(() => import("../pages/CurrentOrdersPage"));
const OrderHistoryPage = lazy(() => import("../pages/OrderHistoryPage"));

const DeliveryRoutes = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/delivery/login" element={<DeliveryLoginPage />} />

      {/* Protected routes — all wrapped in DeliveryLayout */}
      <Route
        path="/delivery"
        element={
          <ProtectedDeliveryRoute>
            <DeliveryLayout />
          </ProtectedDeliveryRoute>
        }
      >
        {/* /delivery → redirect to /delivery/dashboard */}
        <Route index element={<Navigate to="/delivery/dashboard" replace />} />

        <Route
          path="dashboard"
          element={
            <Suspense fallback={null}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route
          path="orders"
          element={
            <Suspense fallback={null}>
              <CurrentOrdersPage />
            </Suspense>
          }
        />
        <Route
          path="history"
          element={
            <Suspense fallback={null}>
              <OrderHistoryPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default DeliveryRoutes;