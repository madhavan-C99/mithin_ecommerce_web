

import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/CartSlice";
import { clearDelivery } from "../store/DeliverySlice";
import { fetchCartFromServer } from "../store/CartSlice";
import { closeNotification } from "../store/DistanceNotifySlice";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
  const token = localStorage.getItem("access_token");
  const storedUser = localStorage.getItem("user");

  if (token && storedUser && storedUser !== "undefined") {
    try {
      const parsedUser = JSON.parse(storedUser);
      setAccessToken(token);
      setUser(parsedUser);

      // ✅ Also sync cart on page refresh — same fix
      if (parsedUser?.user_id) {
        dispatch(fetchCartFromServer(parsedUser.user_id));
      }

    } catch (error) {
      console.error("Invalid user in localStorage");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      dispatch(clearCart());
      dispatch(clearDelivery());
    }
  } else {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    dispatch(clearCart());
    dispatch(clearDelivery());
  }

  setAuthLoading(false);
}, []);

  const login = (token, userData) => {
    if (!token || !userData) return;

    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(userData));


    setAccessToken(token);
    setUser(userData);
    // check delivery available popup close
    dispatch(closeNotification());
  // fetch backend cart on every login
  if (userData?.user_id) {
    dispatch(fetchCartFromServer(userData.user_id));
  }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    setAccessToken(null);
    setUser(null);

    dispatch(clearCart());
    dispatch(clearDelivery()); // ✅ new
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        authLoading,
        isAuthenticated: !!accessToken,
        isProfileComplete: !!user?.name,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);