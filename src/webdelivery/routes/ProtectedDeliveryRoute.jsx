// src/webdelivery/routes/ProtectedDeliveryRoute.jsx

import { Navigate } from "react-router-dom";
import useDeliveryAuth from "../hooks/useDeliveryAuth";

/**
 * ProtectedDeliveryRoute
 *
 * Mirrors webapp ProtectedRoute pattern exactly.
 *
 * Behaviour:
 * - While authLoading is true  → render nothing (session restore in progress)
 * - isAuthenticated is false   → redirect to /delivery/login
 * - isAuthenticated is true    → render children
 *
 * This prevents the flash-redirect on page refresh that happens
 * when the route checks auth before localStorage has been read.
 */
const ProtectedDeliveryRoute = ({ children }) => {
  const { isAuthenticated, authLoading } = useDeliveryAuth();

  // Wait for session restore to finish before making any redirect decision
  if (authLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/delivery/login" replace />;
  }

  return children;
};

export default ProtectedDeliveryRoute;