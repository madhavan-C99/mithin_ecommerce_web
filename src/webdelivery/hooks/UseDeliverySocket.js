// // 📁 src/webdelivery/hooks/useDeliverySocket.js

// import { useEffect, useRef, useState, useCallback } from "react";
// import useDeliveryAuth from "./useDeliveryAuth";

// /**
//  * useDeliverySocket
//  *
//  * Manages full WebSocket lifecycle for the delivery boy.
//  *
//  * WS URL : ws://{VITE_WS_BASE_URL}/ws/delivery/{user_id}/?token={delivery_token}
//  *
//  * Incoming message — single action "ORDER_CONFIRMED" with two statuses:
//  *   status: "pending_acceptance" → show order card with Accept button
//  *   status: "accepted"           → show order card with Reached + Report buttons
//  *
//  * Outgoing message — when Accept is clicked:
//  *   { action: "Accept_Order", order_id, delivery_boy_id }
//  *
//  * Returns:
//  * {
//  *   activeOrder : object | null  — full ORDER_CONFIRMED payload (includes status)
//  *   wsStatus    : "connecting" | "connected" | "disconnected"
//  *   acceptOrder : function(order_id)
//  * }
//  */

// const WS_BASE = import.meta.env.VITE_WS_BASE_URL || "ws://127.0.0.1:8000";

// const useDeliverySocket = () => {
//   const { deliveryBoy } = useDeliveryAuth();

//   const [activeOrder, setActiveOrder] = useState(null);
//   const [wsStatus, setWsStatus] = useState("disconnected");

//   const socketRef = useRef(null);
//   const reconnectTimerRef = useRef(null);
//   const isMountedRef = useRef(true);

//   const connect = useCallback(() => {
//     if (!deliveryBoy?.user_id) return;
//     if (socketRef.current?.readyState === WebSocket.OPEN) return;

//     const token = localStorage.getItem("delivery_token");
//     const url = `${WS_BASE}/ws/delivery/${deliveryBoy.user_id}/?token=${token}`;

//     setWsStatus("connecting");
//     const ws = new WebSocket(url);
//     socketRef.current = ws;

//     ws.onopen = () => {
//       if (!isMountedRef.current) return;
//       setWsStatus("connected");
//       if (reconnectTimerRef.current) {
//         clearTimeout(reconnectTimerRef.current);
//         reconnectTimerRef.current = null;
//       }
//     };

//     ws.onmessage = (event) => {
//       if (!isMountedRef.current) return;
//       try {
//         const data = JSON.parse(event.data);

//         // Single entry point — action is always ORDER_CONFIRMED
//         // status field drives what UI is shown
//         if (data.action === "ORDER_CONFIRMED") {
//           setActiveOrder(data);
//         }
//       } catch (err) {
//         console.error("useDeliverySocket: failed to parse message", err);
//       }
//     };

//     ws.onerror = (err) => {
//       console.error("useDeliverySocket: WebSocket error", err);
//     };

//     ws.onclose = () => {
//       if (!isMountedRef.current) return;
//       setWsStatus("disconnected");
//       // Auto-reconnect after 3 seconds
//       reconnectTimerRef.current = setTimeout(() => {
//         if (isMountedRef.current) connect();
//       }, 3000);
//     };
//   }, [deliveryBoy?.user_id]);

//   /**
//    * Send Accept_Order message to WebSocket
//    * After sending, backend will push back ORDER_CONFIRMED
//    * with status "accepted" — which updates activeOrder automatically
//    */
//   const acceptOrder = useCallback(
//     (order_id) => {
//       if (socketRef.current?.readyState !== WebSocket.OPEN) {
//         console.warn("useDeliverySocket: cannot accept — socket not open");
//         return;
//       }
//       const message = {
//         action: "Accept_Order",
//         order_id,
//         delivery_boy_id: deliveryBoy?.user_id,
//       };
//       socketRef.current.send(JSON.stringify(message));
//     },
//     [deliveryBoy?.user_id]
//   );

//   useEffect(() => {
//     isMountedRef.current = true;
//     connect();

//     return () => {
//       isMountedRef.current = false;
//       if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
//       if (socketRef.current) {
//         socketRef.current.close();
//         socketRef.current = null;
//       }
//     };
//   }, [connect]);

//   return {
//     activeOrder,
//     wsStatus,
//     acceptOrder,
//   };
// };

// export default useDeliverySocket;











// 📁 src/webdelivery/hooks/useDeliverySocket.js

import { useEffect, useRef, useState, useCallback } from "react";
import useDeliveryAuth from "./useDeliveryAuth";

const WS_BASE = import.meta.env.VITE_WS_BASE_URL || "ws://127.0.0.1:8000";

const useDeliverySocket = () => {
  const { deliveryBoy } = useDeliveryAuth();

  const [activeOrder, setActiveOrder] = useState(null);
  const [wsStatus, setWsStatus] = useState("disconnected");

  const socketRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const isMountedRef = useRef(true);

  const connect = useCallback(() => {
    if (!deliveryBoy?.user_id) return;
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    const token = localStorage.getItem("delivery_token");
    const url = `${WS_BASE}/ws/delivery/${deliveryBoy.user_id}/?token=${token}`;

    setWsStatus("connecting");
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      if (!isMountedRef.current) return;
      setWsStatus("connected");
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
    };

    ws.onmessage = (event) => {
      if (!isMountedRef.current) return;
      try {
        const data = JSON.parse(event.data);
        if (data.action === "ORDER_CONFIRMED") {

          setActiveOrder(data);
        }
        

      } catch (err) {
        console.error("useDeliverySocket: failed to parse message", err);
      }
    };

    ws.onerror = (err) => {
      console.error("useDeliverySocket: WebSocket error", err);
    };

    ws.onclose = () => {
      if (!isMountedRef.current) return;
      setWsStatus("disconnected");
      reconnectTimerRef.current = setTimeout(() => {
        if (isMountedRef.current) connect();
      }, 3000);
    };
  }, [deliveryBoy?.user_id]);

  const acceptOrder = useCallback(
    (order_id) => {
      if (socketRef.current?.readyState !== WebSocket.OPEN) {
        console.warn("useDeliverySocket: cannot accept — socket not open");
        return;
      }
      const message = {
        action: "Accept_Order",
        order_id,
        delivery_boy_id: deliveryBoy?.user_id,
      };
      socketRef.current.send(JSON.stringify(message));
    },
    [deliveryBoy?.user_id]
  );

  // ── NEW: clears active order after report success ──
  const clearOrder = useCallback(() => setActiveOrder(null), []);

  useEffect(() => {
    isMountedRef.current = true;
    connect();

    return () => {
      isMountedRef.current = false;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [connect]);

  return {
    activeOrder,
    wsStatus,
    acceptOrder,
    clearOrder, // ── NEW
  };
};

export default useDeliverySocket;