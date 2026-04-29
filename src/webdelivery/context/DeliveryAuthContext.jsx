// src/webdelivery/context/DeliveryAuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";

/**
 * DELIVERY AUTH CONTEXT
 *
 * Mirrors webapp AuthContext pattern exactly — but:
 * - No Redux (no cart / delivery slices on delivery boy side)
 * - Separate localStorage keys: "delivery_token", "delivery_user"
 * - Exposes: token, deliveryBoy, authLoading, isAuthenticated, login, logout
 *
 * API response shape:
 * {
 *   token: string,
 *   user: { user_id, name, mobile, email, roles: ["delivery_boy"] }
 * }
 */

const DeliveryAuthContext = createContext(null);

export const DeliveryAuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [deliveryBoy, setDeliveryBoy] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  /**
   * Restore session on page refresh
   * Same guard pattern as webapp — handles corrupt localStorage gracefully
   */
  useEffect(() => {
    const token = localStorage.getItem("delivery_token");
    const storedUser = localStorage.getItem("delivery_user");

    if (token && storedUser && storedUser !== "undefined") {
      try {
        setAccessToken(token);
        setDeliveryBoy(JSON.parse(storedUser));
      } catch (error) {
        console.error("DeliveryAuthContext: corrupt localStorage, clearing session");
        localStorage.removeItem("delivery_token");
        localStorage.removeItem("delivery_user");
      }
    } else {
      localStorage.removeItem("delivery_token");
      localStorage.removeItem("delivery_user");
    }

    // Session restore complete — unblock ProtectedDeliveryRoute
    setAuthLoading(false);
  }, []);

  /**
   * Called after successful API login
   * @param {string} token
   * @param {object} userData  — { user_id, name, mobile, email, roles }
   */
  const login = (token, userData) => {
    if (!token || !userData) return;

    localStorage.setItem("delivery_token", token);
    localStorage.setItem("delivery_user", JSON.stringify(userData));

    setAccessToken(token);
    setDeliveryBoy(userData);
  };

  /**
   * Clear session — called from logout button (future: header/sidebar)
   */
  const logout = () => {
    localStorage.removeItem("delivery_token");
    localStorage.removeItem("delivery_user");

    setAccessToken(null);
    setDeliveryBoy(null);
  };

  return (
    <DeliveryAuthContext.Provider
      value={{
        accessToken,
        deliveryBoy,           // { user_id, name, mobile, email, roles }
        authLoading,           // true while restoring session — ProtectedRoute waits on this
        isAuthenticated: !!accessToken,
        login,
        logout,
      }}
    >
      {children}
    </DeliveryAuthContext.Provider>
  );
};

export const useDeliveryAuthContext = () => useContext(DeliveryAuthContext);