// src/webdelivery/hooks/useDeliveryAuth.js

import { useDeliveryAuthContext } from "../context/DeliveryAuthContext";

/**
 * useDeliveryAuth
 *
 * Clean hook that pages and components use to consume DeliveryAuthContext.
 * Pages never import the context directly — they use this hook.
 *
 * Usage:
 *   const { deliveryBoy, isAuthenticated, login, logout, authLoading } = useDeliveryAuth();
 */
const useDeliveryAuth = () => {
  return useDeliveryAuthContext();
};

export default useDeliveryAuth;