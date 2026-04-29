// src/webadm/features/deliveryboy/deliveryBoyAPI.js

import api from "../../services/apiClient";

export const deliveryBoyAPI = {

  /*
   * Create a new delivery boy account
   * Payload: { name, mobile_number, email, password, confirm_password, address_line1, address_line2 }
   * Response: { data: { user_id: 4, message: "Delivery_boy User Created" } }
   */
  createDeliveryBoy: (payload) =>
    api.post("/adm/create_deliveryboy_profile", payload),

  /*
   * Update an existing delivery boy profile
   * Payload: { user_id, name, email, mobile, address_line1, address_line2 }
   * Response: { data: "Delivery Boy Profile Updated Successfully." }
   */
  updateDeliveryBoy: (payload) =>
    api.post("/adm/update_deliveryboy_profile", payload),

  /*
   * Fetch all delivery boys
   * No payload required
   * Response: { data: [ { id, name, mobile_number, email, address_line1, address_line2, status, is_available, is_active } ] }
   */
  fetchAllDeliveryBoys: () =>
    api.post("/adm/fetch_all_deliveryboys"),

  /*
   * Fetch one delivery boy details + tile stats
   * Payload: { id }
   * Response: { data: { delivery_boy_details: [...], tile_details: { overall_delivered, today_delivered } } }
   */
  fetchOneDeliveryBoy: (payload) =>
    api.post("/adm/fetch_one_deliveryboy", payload),

  /*
   * Delete a delivery boy by id
   * Payload: { id }
   * Response: { data: "4 Removed Successfully." }
   */
  deleteDeliveryBoy: (payload) =>
    api.post("/adm/delete_deliveryboy", payload),
};