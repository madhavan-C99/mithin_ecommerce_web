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


// bell sound function

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
//     // const now = ctx.currentTime;
//     // playTone(880, now, 1.2, 0.6);
//     // playTone(660, now + 0.35, 1.2, 0.5);
//     const now = ctx.currentTime;
//   playTone(1318, now,        0.1, 0.5); // E6
//   playTone(1567, now + 0.12, 0.1, 0.5); // G6
//   playTone(2093, now + 0.24, 0.4, 0.6); // C7
//   } catch (e) {
//     console.warn("Bell sound error:", e);
//   }
// };

// const activeBells = new Map();

// export const startBellLoop = (id) => {
//   if (activeBells.has(id)) return;
//   playClassicBell();
//   const intervalId = setInterval(playClassicBell, 1000);
//   activeBells.set(id, intervalId);
// };

// export const stopBellForNotification = (id) => {
//   if (activeBells.has(id)) {
//     clearInterval(activeBells.get(id));
//     activeBells.delete(id);
//   }
// };

// export const stopAllBells = () => {
//   activeBells.forEach((id) => clearInterval(id));
//   activeBells.clear();
// };

// ─── Shared AudioContext — ஒரே ஒரு instance reuse பண்ணு ──────────────────────
// ஒவ்வொரு call-லயும் புது context create பண்ணா gap வரும்
let sharedCtx = null;

const getAudioContext = () => {
  if (!sharedCtx || sharedCtx.state === "closed") {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    sharedCtx = new AudioContext();
  }
  if (sharedCtx.state === "suspended") {
    sharedCtx.resume(); // tab switch பண்ணினா suspended ஆகும் — resume பண்ணு
  }
  return sharedCtx;
};

// ─── Bell Sound ───────────────────────────────────────────────────────────────
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
    playTone(1318, now,        0.1, 0.5); // E6
    playTone(1567, now + 0.12, 0.1, 0.5); // G6
    playTone(2093, now + 0.24, 0.4, 0.6); // C7
  } catch (e) {
    console.warn("Bell sound error:", e);
  }
};

// ─── Bell Loop Management ─────────────────────────────────────────────────────
const activeBells = new Map();

export const startBellLoop = (id) => {
  if (activeBells.has(id)) return;
  playClassicBell();
  const intervalId = setInterval(playClassicBell, 1500); // 1.5s — tone 0.64s, gap enough
  activeBells.set(id, intervalId);
};

export const stopBellForNotification = (id) => {
  if (activeBells.has(id)) {
    clearInterval(activeBells.get(id));
    activeBells.delete(id);
  }
};

export const stopAllBells = () => {
  console.log("stopAllBells called, active bells:", activeBells.size);
  activeBells.forEach((id) => clearInterval(id));
  activeBells.clear();
  console.log("after clear:", activeBells.size);
};

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    // ✅ Tab போகும்போது எல்லா intervals-உம் pause பண்ணு
    activeBells.forEach((intervalId, id) => {
      clearInterval(intervalId);
      activeBells.set(id, null); // null — still tracking, just paused
    });
  } else if (document.visibilityState === "visible") {
    // ✅ திரும்பி வந்தா AudioContext resume + intervals restart பண்ணு
    if (sharedCtx?.state === "suspended") {
      sharedCtx.resume();
    }
    activeBells.forEach((intervalId, id) => {
      if (intervalId === null) {
        // paused ஆனதை மட்டும் restart பண்ணு
        playClassicBell();
        const newIntervalId = setInterval(playClassicBell, 1500);
        activeBells.set(id, newIntervalId);
      }
    });
  }
});
// ─── Browser Push Notification ────────────────────────────────────────────────

// App start-ல ஒரே ஒரு முறை call பண்ணு — permission popup காட்டும்
export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
};

// Order வந்தா இதை call பண்ணு
export const showBrowserNotification = (title, body) => {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    // ✅ Permission already இருக்கு — நேரடியா show பண்ணு
    new Notification(title, { body, icon: "/favicon.ico" });
  } else if (Notification.permission === "default") {
    // Permission இல்லன்னா request பண்ணிட்டு show பண்ணு
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        new Notification(title, { body, icon: "/favicon.ico" });
      }
    });
  }
  // "denied" ஆனா ஒன்னும் பண்ண முடியாது — browser block பண்றது
};

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

      // ws.send(JSON.stringify({ action: "GET_PENDING_ORDERS" }));
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
    };

    ws.onmessage = (event) => {
      if (!isMountedRef.current) return;
      try {
        const data = JSON.parse(event.data);

        if (data.action === "NEW_ORDER_REQUEST") {
          setActiveOrder(data); // ← இதை add பண்ணுங்க
          startBellLoop(data.order_id);
        }
        if (data.action === "ORDER_CONFIRMED") {

          setActiveOrder(data);
          // startBellLoop(data.order_id);

          stopAllBells();
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
      stopAllBells();
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
      // stopAllBells();
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