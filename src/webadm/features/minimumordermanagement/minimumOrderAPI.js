// src/webadm/features/minimumordermanagement/minimumOrderAPI.js

import api from "../../services/apiClient";

export const minimumOrderAPI = {
  fetchOrderFee:()=>api.post("adm/fetch_order_config_fee"),
  /*
   * Add order fee — called on first time save
   * Payload: { min_order_amount: 200, delivery_fee: 50 }
   * Response: { data: "Added Order Fee successfully." }
   */
  addOrderFee: (payload) =>
    api.post("/adm/add_order_fee", payload),

  /*
   * Update order fee — called when values already exist
   * Payload: { min_order_amount: 200, delivery_fee: 50 }
   * Response: { data: "Updated Successfully." }
   */
  updateOrderFee: (payload) =>
    api.post("/adm/update_order_fee", payload),
};