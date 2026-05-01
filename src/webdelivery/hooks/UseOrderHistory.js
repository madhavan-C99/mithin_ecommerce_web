// 📁 src/webdelivery/hooks/useOrderHistory.js

import { useEffect, useState, useMemo } from "react";
import { fetchOrderHistory } from "../api/DeliveryApi";
import useDeliveryAuth from "./useDeliveryAuth";

/**
 * useOrderHistory
 *
 * Fetches full order history for the logged-in delivery boy.
 * Date range filtering is done client-side — no extra API call on filter change.
 *
 * Returns:
 * {
 *   filteredHistory : array   — orders after applying date filter
 *   totalCount      : number  — total unfiltered orders count
 *   loading         : boolean
 *   error           : string | null
 *   refetch         : function
 *   dateRange       : { from: string, to: string }
 *   setDateRange    : function
 *   clearFilter     : function
 * }
 */
const useOrderHistory = () => {
  const { deliveryBoy } = useDeliveryAuth();

  const [rawHistory, setRawHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const fetchData = async () => {
    if (!deliveryBoy?.user_id) return;

    setLoading(true);
    setError(null);

    try {
      // Response is already unwrapped by Axios interceptor → direct array
      const response = await fetchOrderHistory(deliveryBoy.user_id);
      // Backend returns { data: [...] } — handle both shapes safely
      const orders = Array.isArray(response) ? response : response?.data ?? [];
      setRawHistory(orders);
    } catch (err) {
      setError(err.message || "Failed to fetch order history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [deliveryBoy?.user_id]);

  /**
   * Client-side date filter
   * Filters rawHistory by created_at within the selected date range.
   * Recalculates only when rawHistory or dateRange changes.
   */
  const filteredHistory = useMemo(() => {
    if (!dateRange.from && !dateRange.to) return rawHistory;

    return rawHistory.filter((order) => {
      const orderDate = new Date(order.created_at);

      if (dateRange.from && dateRange.to) {
        const from = new Date(dateRange.from);
        const to = new Date(dateRange.to);
        // Include full "to" day
        to.setHours(23, 59, 59, 999);
        return orderDate >= from && orderDate <= to;
      }

      if (dateRange.from) {
        return orderDate >= new Date(dateRange.from);
      }

      if (dateRange.to) {
        const to = new Date(dateRange.to);
        to.setHours(23, 59, 59, 999);
        return orderDate <= to;
      }

      return true;
    });
  }, [rawHistory, dateRange]);

  const clearFilter = () => setDateRange({ from: "", to: "" });

  return {
    filteredHistory,
    totalCount: rawHistory.length,
    loading,
    error,
    refetch: fetchData,
    dateRange,
    setDateRange,
    clearFilter,
  };
};

export default useOrderHistory;