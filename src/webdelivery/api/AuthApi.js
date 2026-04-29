// src/webdelivery/api/AuthApi.js

import deliveryAxios from "./Axios";

/**
 * DELIVERY AUTH API LAYER
 * Only handles API communication.
 * No UI logic. No navigation. No storage.
 *
 * Endpoint : POST /adm/validate_deliverboy_login
 * Payload  : { email, password }
 * Response : { status, token, user: { user_id, name, mobile, email, roles } }
 */

/**
 * Login delivery boy
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string, user: object }>}
 */
export const deliveryBoyLogin = async (email, password) => {
  return await deliveryAxios.post("/adm/validate_deliverboy_login", {
    email,
    password,
  });
};