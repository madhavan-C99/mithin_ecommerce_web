// 📁 src/webdelivery/hooks/useOrders.js

import { useEffect, useState } from "react";
import { fetchDeliveryBoyDetails } from "../api/DeliveryApi";
import useDeliveryAuth from "./useDeliveryAuth";

/**
 * useOrders
 *
 * Fetches delivery boy details + dashboard tile stats.
 * Gets delivery boy ID from DeliveryAuthContext — no prop needed.
 *
 * Returns:
 * {
 *   deliveryBoyDetails : object   — { id, name, mobile_number, email, status, is_available, is_active }
 *   stats              : object   — { overall_delivered, today_delivered }
 *   loading            : boolean
 *   error              : string | null
 *   refetch            : function — call to manually refresh
 * }
 */
const useOrders = () => {
  const { deliveryBoy } = useDeliveryAuth();

  const [deliveryBoyDetails, setDeliveryBoyDetails] = useState(null);
  const [stats, setStats] = useState({ overall_delivered: 0, today_delivered: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!deliveryBoy?.user_id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetchDeliveryBoyDetails(deliveryBoy.user_id);

      // Response shape (already unwrapped by Axios interceptor):
      // { delivery_boy_details: [...], tile_details: { overall_delivered, today_delivered } }
      setDeliveryBoyDetails(response.delivery_boy_details ?? null);
      setStats(response.tile_details ?? { overall_delivered: 0, today_delivered: 0 });
    } catch (err) {
      setError(err.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [deliveryBoy?.user_id]);

  return {
    deliveryBoyDetails,
    stats,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useOrders;