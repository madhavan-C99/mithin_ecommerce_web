// import { createContext, useContext, useState } from "react";
// import { productsAPI} from "../features/products/productAPI";
// import { categoryAPI } from "../features/category/categoryAPI";
// import { dropdownAPI } from "../services/dropdownAPI";
// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };

// export const AdminAuthProvider = ({ children }) => {
//   const [allproducts, setAllproducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ---------------- FETCH ALL PRODUCTS ----------------
//   const fetchAllproducts = async () => {
//     try {
//       setLoading(true);
//       const res = await productsAPI.fetchAllProducts();
//       setAllproducts(res.data.data || res.data);
//       const loadUserImages = res.data;
//       console.log("fetch all the here for image res ",res)
//       console.log("fetch all the here for image res data ",res.data)
//       console.log("fetch all the here for image ",res.product_image)
//     } catch (error) {
//       console.log("Fetch Products Failed", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- DELETE PRODUCT ----------------
//   const deleteProductApi = async (id) => {
//     try {
//       await productsAPI.deleteProduct(id);
//       setAllproducts((prev) =>
//         prev.filter((product) => product.id !== id)
//       );
//       return { success: true };
//     } catch (error) {
//       console.error("Delete Failed", error.message);
//       return { success: false };
//     }
//   };

//   // ---------------- GET PRODUCT BY ID ----------------
//   const getProductById = async (id) => {
//   try {
//     const res = await productsAPI.getProductById(id);
//     return { success: true, data: res.data };
//   } catch (err) {
//     return { success: false };
//   }
// };

//   // ---------------- GET UPDATE BY ID ----------------
//   const updateProductApi = async (id, data) => {
//   try {
//     await productsAPI.updateProduct(id, data);
//     fetchAllproducts();
//     return { success: true };
//   } catch {
//     return { success: false };
//   }
// };

  


//   // ---------------- ADD CATEGORY ----------------
//   const addCategoryApi = async (formData) => {
//     try {
//      const res =  await categoryAPI.addCategoryApi(formData);
//       fetchAllproducts(); // refresh table
//       return { 
//         success: true,
//         // res:response.data
//       };
//     } catch {
//       return { success: false };
//     }
//   };
  

//   // ---------------- DROPDOWNS ----------------
//   const fetchCategories = async () => {
//     const res = await dropdownAPI.fetchCategories();
//     return res.data;
//   };

//   const fetchStatusList = async () => {
//     const res = await dropdownAPI.fetchStatusList();
//     return res.data;
//   };
  
//   // -----------------IMAGE UPLOAD-----------------
// //   const uploadFile = async (file, name) => {
// //     try {
// //       // var id = localStorage.getItem('python_fullstack')
// //       const formData = new FormData();
// //       formData.append('file', file);
// //       formData.append('source_field', name);
// //       // formData.append("id" ,id)
// //       console.log("auth",formData)



// //       const filename = await authAPI.upload_file(formData);

// //       return { success: true, filename };
// //     } catch (error) {
// //       return {
// //         success: false,
// //         error: error.response?.data?.errors || 'Mission Failed',
// //       };
// //     }
// //   };


//   return (
//     <AuthContext.Provider
//       value={{
//         allproducts,
//         loading,
//         fetchAllproducts,
//         deleteProductApi,
//         getProductById,
//         fetchCategories,
//         fetchStatusList,
//         updateProductApi,
//         addCategoryApi
//         // uploadFile
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };





// export const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {

//   const [notifications, setNotifications] = useState([]);

//   return (
//     <NotificationContext.Provider
//       value={{ notifications, setNotifications }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );

// };



// export const DashboardContext = createContext();












import { createContext, useContext, useState, useEffect, useRef } from "react";
import { productsAPI } from "../features/products/productAPI";
import { categoryAPI } from "../features/category/categoryAPI";
import { dropdownAPI } from "../services/dropdownAPI";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [allproducts, setAllproducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllproducts = async () => {
    try {
      setLoading(true);
      const res = await productsAPI.fetchAllProducts();
      setAllproducts(res.data.data || res.data);
    } catch (error) {
      console.log("Fetch Products Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProductApi = async (id) => {
    try {
      await productsAPI.deleteProduct(id);
      setAllproducts((prev) => prev.filter((product) => product.id !== id));
      return { success: true };
    } catch (error) {
      console.error("Delete Failed", error.message);
      return { success: false };
    }
  };

  const getProductById = async (id) => {
    try {
      const res = await productsAPI.getProductById(id);
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false };
    }
  };

  const updateProductApi = async (id, data) => {
    try {
      await productsAPI.updateProduct(id, data);
      fetchAllproducts();
      return { success: true };
    } catch {
      return { success: false };
    }
  };

  const addCategoryApi = async (formData) => {
    try {
      await categoryAPI.addCategoryApi(formData);
      fetchAllproducts();
      return { success: true };
    } catch {
      return { success: false };
    }
  };

  const fetchCategories = async () => {
    const res = await dropdownAPI.fetchCategories();
    return res.data;
  };

  const fetchStatusList = async () => {
    const res = await dropdownAPI.fetchStatusList();
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        allproducts,
        loading,
        fetchAllproducts,
        deleteProductApi,
        getProductById,
        fetchCategories,
        fetchStatusList,
        updateProductApi,
        addCategoryApi,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// import { createContext, useState, useEffect, useRef } from "react";

// ─── Bell Sound ───────────────────────────────────────────────────────────────
// ✅ ஒரே ஒரு context — file level-ல வை
let sharedCtx = null;

const getAudioContext = () => {
  if (!sharedCtx || sharedCtx.state === "closed") {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    sharedCtx = new AudioContext();
  }
  if (sharedCtx.state === "suspended") {
    sharedCtx.resume();
  }
  return sharedCtx;
};

const playClassicBell = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const playTone = (freq, startTime, duration, gainVal) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(freq, startTime);
      gainNode.gain.setValueAtTime(gainVal, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    playTone(880, now, 1.2, 0.6);
    playTone(660, now + 0.35, 1.2, 0.5);
  } catch (e) {
    console.warn("Bell sound error:", e);
  }
};

// ─── Bell Loop Management ─────────────────────────────────────────────────────
const activeBells = new Map(); // notification_id → intervalId

const startBellLoop = (notificationId) => {
  if (activeBells.has(notificationId)) return;
  playClassicBell();
  const intervalId = setInterval(playClassicBell, 1000);
  activeBells.set(notificationId, intervalId);
};

export const stopBellForNotification = (notificationId) => {
  if (activeBells.has(notificationId)) {
    clearInterval(activeBells.get(notificationId));
    activeBells.delete(notificationId);
  }
};

export const stopAllBells = () => {
  activeBells.forEach((id) => clearInterval(id));
  activeBells.clear();
};

// ─── Browser Push Notification ────────────────────────────────────────────────
const requestNotificationPermission = async () => {
  if ("Notification" in window && Notification.permission === "default") {
    await Notification.requestPermission();
  }
};

export const showBrowserNotification = (title, body) => {
  if (!("Notification" in window)) return;
  
  if (Notification.permission === "granted") {
    new Notification(title, { body, icon: "/favicon.ico" });
  } else if (Notification.permission === "default") {
    // Permission இல்லன்னா request பண்ணிட்டு show பண்ணு
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        new Notification(title, { body, icon: "/favicon.ico" });
      }
    });
  }
};

// ─── Notification Context ─────────────────────────────────────────────────────
export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const prevNotificationIds = useRef(new Set());
  // FIX: track whether this is the first WebSocket message
  const isInitialLoad = useRef(true);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(
      `${import.meta.env.VITE_WS_BASE_URL}/ws/notification_data/`
    );

    socket.onopen = () => {
      console.log("Global notification socket connected");
      socket.send(JSON.stringify({ action: "notification_all" }));
    };

    socket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        const newData = parsedData.payload || [];

        if (isInitialLoad.current) {
          // FIX: First message — just seed the known IDs, no bell/browser notification
          newData.forEach((n) => {
            prevNotificationIds.current.add(n.notification_id);
          });
          isInitialLoad.current = false;
        } else {
          // Subsequent messages — detect truly NEW notifications
          newData.forEach((n) => {
            if (!prevNotificationIds.current.has(n.notification_id)) {
              prevNotificationIds.current.add(n.notification_id);

              // FIX: Start looping bell (stops when user views)
              startBellLoop(n.notification_id);

              // Browser notification
              const title =
                n.title === "Low Stock" ? `⚠️ Low Stock Alert` : `🛒 New Order`;
              const body =
                n.title === "Low Stock"
                  ? `${n.name} is running low (${n.stock} left)`
                  : n.message || "A new order has arrived";

              showBrowserNotification(title, body);
            }
          });
        }

        setNotifications((prev) => {
          const merged = [...newData, ...prev];
          const unique = merged.filter(
            (item, index, self) =>
              index === self.findIndex(
                (t) => t.notification_id === item.notification_id
              )
          );
          return unique.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
        });
      } catch (error) {
        console.error("Invalid JSON:", event.data);
      }
    };

    socket.onerror = (err) => console.error("Notification socket error:", err);
    socket.onclose = () => console.log("Notification socket closed");

    return () => {
      socket.close();
      stopAllBells(); // cleanup on unmount
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};



export const DashboardContext = createContext();


// // ─── Bell Sound ───────────────────────────────────────────────────────────────
// const playClassicBell = () => {
//   try {
//     const AudioContext = window.AudioContext || window.webkitAudioContext;
//     if (!AudioContext) return;
//     const ctx = new AudioContext();
//     const playTone = (freq, startTime, duration, gainVal) => {
//       const oscillator = ctx.createOscillator();
//       const gainNode = ctx.createGain();
//       oscillator.connect(gainNode);
//       gainNode.connect(ctx.destination);
//       oscillator.type = "sine";
//       oscillator.frequency.setValueAtTime(freq, startTime);
//       gainNode.gain.setValueAtTime(gainVal, startTime);
//       gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
//       oscillator.start(startTime);
//       oscillator.stop(startTime + duration);
//     };
//     const now = ctx.currentTime;
//     playTone(880, now, 1.2, 0.6);
//     playTone(660, now + 0.35, 1.2, 0.5);
//   } catch (e) {
//     console.warn("Bell sound error:", e);
//   }
// };


// // ─── Browser Push Notification ────────────────────────────────────────────────
// const requestNotificationPermission = async () => {
//   if ("Notification" in window && Notification.permission === "default") {
//     await Notification.requestPermission();
//   }
// };

// // ── FIXED: removed visibilityState check so it fires on ALL routes & tabs ──
// const showBrowserNotification = (title, body) => {
//   if ("Notification" in window && Notification.permission === "granted") {
//     new Notification(title, {
//       body,
//       icon: "/favicon.ico",
//     });
//   }
// };


// // ─── Notification Context ─────────────────────────────────────────────────────
// export const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState([]);
//   const prevNotificationIds = useRef(new Set());

//   // ── Request permission once on app load ──
//   useEffect(() => {
//     requestNotificationPermission();
//   }, []);

//   // ── Global WebSocket — lives as long as app is open ──
//   useEffect(() => {
//     const socket = new WebSocket(
//       `${import.meta.env.VITE_WS_BASE_URL}/ws/notification_data/`
//     );

//     socket.onopen = () => {
//       console.log("Global notification socket connected");
//       socket.send(JSON.stringify({ action: "notification_all" }));
//     };

//     socket.onmessage = (event) => {
//       try {
//         const parsedData = JSON.parse(event.data);
//         const newData = parsedData.payload || [];

//         // ── Detect truly NEW notifications and trigger bell + push ──
//         newData.forEach((n) => {
//           if (!prevNotificationIds.current.has(n.notification_id)) {
//             prevNotificationIds.current.add(n.notification_id);

//             // Bell sound — works on same tab, any route
//             playClassicBell();

//             // OS push notification — works on different tab too
//             const title =
//               n.title === "Low Stock" ? `⚠️ Low Stock Alert` : `🛒 New Order`;
//             const body =
//               n.title === "Low Stock"
//                 ? `${n.name} is running low (${n.stock} left)`
//                 : n.message || "A new order has arrived";

//             showBrowserNotification(title, body);
//           }
//         });

//         // ── Merge + deduplicate + sort notifications in state ──
//         setNotifications((prev) => {
//           const merged = [...newData, ...prev];
//           const unique = merged.filter(
//             (item, index, self) =>
//               index === self.findIndex(
//                 (t) => t.notification_id === item.notification_id
//               )
//           );
//           return unique.sort(
//             (a, b) => new Date(b.created_at) - new Date(a.created_at)
//           );
//         });
//       } catch (error) {
//         console.error("Invalid JSON:", event.data);
//       }
//     };

//     socket.onerror = (err) => {
//       console.error("Notification socket error:", err);
//     };

//     socket.onclose = () => {
//       console.log("Notification socket closed");
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   return (
//     <NotificationContext.Provider value={{ notifications, setNotifications }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };
