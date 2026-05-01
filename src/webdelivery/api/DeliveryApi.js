// 📁 src/webdelivery/api/DeliveryApi.js

import deliveryAxios from "./Axios";

/**
 * DELIVERY API LAYER
 * Only handles API communication.
 * No UI logic. No navigation. No storage.
 */

/**
 * Fetch delivery boy details + dashboard tile stats
 * @param {number} id — deliveryBoy.user_id from DeliveryAuthContext
 */
export const fetchDeliveryBoyDetails = async (id) => {
  return await deliveryAxios.post("/adm/fetch_one_deliveryboy", { id });
};

/**
 * Toggle delivery boy online/offline status
 * API decides the new status (toggles server-side)
 * @param {number} id — deliveryBoy.user_id from DeliveryAuthContext
 * @returns {{ data: { status: "Success", current_status: "Online"|"Offline", is_available: boolean } }}
 */
export const changeDeliveryBoyStatus = async (id) => {
  return await deliveryAxios.post("/adm/change_deliveryboy_status", { id });
};

/**
 * Fetch delivery boy order history
 * @param {number} id — deliveryBoy.user_id from DeliveryAuthContext
 * @returns {Promise<Array>} — array of delivered orders
 */
export const fetchOrderHistory = async (id) => {
  return await deliveryAxios.post("/adm/fetch_deliveryboy_order_history", { id });
};