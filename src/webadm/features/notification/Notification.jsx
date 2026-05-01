// UPDATED POP UP CODE

import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";

import empty_box from '../../../assets/empty_box.gif';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { orderAPI } from "../ordermanagement/components/orderAPI";
import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { NotificationContext } from "../../context/AuthContext";

// ── NEW IMPORT ────────────────────────────────────────────────────────────────
import OrderAcceptDialog from "./OrderAcceptDialog";
// ─────────────────────────────────────────────────────────────────────────────


// ─── Classic Bell Sound via Web Audio API ────────────────────────────────────
const playClassicBell = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();

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


// ─── Browser Push Notification ────────────────────────────────────────────────
const requestNotificationPermission = async () => {
  if ("Notification" in window && Notification.permission === "default") {
    await Notification.requestPermission();
  }
};

const showBrowserNotification = (title, body) => {
  if ("Notification" in window && Notification.permission === "granted") {
    if (document.visibilityState === "hidden") {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
      });
    }
  }
};


// ─── Component ────────────────────────────────────────────────────────────────
const Notification = () => {

  const { notifications, setNotifications } = useContext(NotificationContext);
  const [loading, setLoading] = useState(true);
  const prevNotificationIds = useRef(new Set());

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // ── NEW STATE ─────────────────────────────────────────────────────────────
  const [openAcceptDialog, setOpenAcceptDialog]     = useState(false);
  const [acceptNotification, setAcceptNotification] = useState(null);
  const [confirming, setConfirming]                 = useState(false);
  const [confirmError, setConfirmError]             = useState("");
  // ─────────────────────────────────────────────────────────────────────────


  // ── Track new arrivals and trigger bell + browser notification ──────────────
  // useEffect(() => {
  //   if (notifications.length === 0) return;

  //   notifications.forEach((n) => {
  //     const id = n.notification_id;
  //     if (!prevNotificationIds.current.has(id)) {
  //       prevNotificationIds.current.add(id);

  //       if (prevNotificationIds.current.size > notifications.length) return;

  //       playClassicBell();

  //       const title = n.title === "Low Stock"
  //         ? `⚠️ Low Stock Alert`
  //         : `🛒 New Order`;

  //       const body = n.title === "Low Stock"
  //         ? `${n.name} is running low (${n.stock} left)`
  //         : n.message || "A new order has arrived";

  //       showBrowserNotification(title, body);
  //     }
  //   });
  // }, [notifications]);


  // ── Request browser notification permission once ────────────────────────────
  // useEffect(() => {
  //   requestNotificationPermission();
  // }, []);


  // ── Existing WebSocket logic — UNTOUCHED ────────────────────────────────────
  // useEffect(() => {
  //   const stockSocket = createSocket(
  //     `${import.meta.env.VITE_WS_BASE_URL}/ws/notification_data/`,
  //     "notification_all"
  //   );
  //   return () => {
  //     stockSocket.close();
  //   };
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  const createSocket = (url, actionName) => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("url", url);
      if (actionName) {
        socket.send(JSON.stringify({ action: actionName }));
      }
    };

    socket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        console.log('stock', parsedData);
        setNotifications((prev) => {
          const newData = parsedData.payload || [];
          const merged = [...newData, ...prev];
          const unique = merged.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.notification_id === item.notification_id)
          );
          return unique.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
        });
      } catch (error) {
        console.error("Invalid JSON:", event.data);
      }
    };

    return socket;
  };


  // ── Existing API logic — UNTOUCHED ─────────────────────────────────────────
  const updateStatus = async (id, status, notification_id) => {
    try {
      await orderAPI.updatestatusApi(id, status);
      await readNotification(notification_id);
      setNotifications((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error("Status update error", err);
    }
  };

  const readNotification = async (id) => {
    try {
      await orderAPI.readnotification(id);
      setNotifications((prev) =>
        prev.filter((item) => item.notification_id !== id)
      );
    } catch (error) {
      console.error("Notification update failed", error);
    }
  };


  // ── NEW HANDLERS ──────────────────────────────────────────────────────────

  // Opens the accept dialog for the tapped notification
  const handleAcceptClick = (n) => {
    setAcceptNotification(n);
    setConfirmError("");
    setOpenAcceptDialog(true);
  };

  // Fires both APIs simultaneously, then cleans up
  // const handleConfirmAccept = async (notification, deliveryBoyId) => {
  //   setConfirming(true);
  //   setConfirmError("");
  //   try {
  //     await Promise.all([
  //       orderAPI.updatestatusApi(notification.order_id, "Confirmed"),
  //       orderAPI.assignDeliveryBoy(notification.order_id, deliveryBoyId),
  //     ]);
  //     await readNotification(notification.notification_id);
  //     setNotifications((prev) =>
  //       prev.filter((item) => item.id !== notification.order_id)
  //     );
  //     setOpenAcceptDialog(false);
  //   } catch (err) {
  //     console.error("Accept & assign error:", err);
  //     setConfirmError("Something went wrong. Please try again.");
  //   } finally {
  //     setConfirming(false);
  //   }
  // };

  // AFTER
const handleConfirmAccept = async (notification, deliveryBoyId) => {
  setConfirming(true);
  setConfirmError("");
  try {

    // ── Step 1: Assign delivery boy FIRST ─────────────────────────────────
    const assignRes = await orderAPI.assignDeliveryBoy(
      notification.order_id,
      deliveryBoyId
    );

    // ── Step 2: Check response body for backend-level error ───────────────
    // Backend returns HTTP 200 even on failure, so we must inspect the body
    const assignMessage = assignRes?.data?.data;
    if (typeof assignMessage === "string" && assignMessage.toLowerCase().includes("not found")) {
      setConfirmError(assignMessage);
      return; // stop here — don't confirm status, don't close dialog
    }

    // ── Step 3: Only now confirm the order status ─────────────────────────
    await orderAPI.updatestatusApi(notification.order_id, "Confirmed");

    // ── Step 4: Dismiss notification and close dialog ─────────────────────
    await readNotification(notification.notification_id);
    setNotifications((prev) =>
      prev.filter((item) => item.id !== notification.order_id)
    );
    setOpenAcceptDialog(false);

  } catch (err) {
    console.error("Accept & assign error:", err);
    setConfirmError("Something went wrong. Please try again.");
  } finally {
    setConfirming(false);
  }
};



  // ─────────────────────────────────────────────────────────────────────────


  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f6fa",
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1.5, sm: 3, md: 4 },
      }}
    >
      {/* ── Centered Content Wrapper ── */}
      <Box
        sx={{
          maxWidth: 780,
          mx: "auto",
          width: "100%",
        }}
      >

        {/* ══════════════════════════════════════════
            HEADER CARD  — UNTOUCHED
        ══════════════════════════════════════════ */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: { xs: 3, sm: 4 },
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Box
            sx={{
              height: 4,
              background: "linear-gradient(90deg, #1a3c5e 0%, #2e7d32 50%, #1a3c5e 100%)",
            }}
          />

          <Box
            sx={{
              px: { xs: 2.5, sm: 3.5 },
              py: { xs: 2, sm: 2.5 },
              bgcolor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Box
                sx={{
                  width: { xs: 38, sm: 44 },
                  height: { xs: 38, sm: 44 },
                  borderRadius: "12px",
                  bgcolor: "#f0f4ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <NotificationsIcon
                  sx={{
                    fontSize: { xs: 20, sm: 24 },
                    color: "#1a3c5e",
                  }}
                />
              </Box>

              <Box>
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  fontWeight={700}
                  color="#1a1a2e"
                  lineHeight={1.2}
                >
                  Notifications
                </Typography>
                <Typography
                  fontSize={{ xs: 11, sm: 12 }}
                  color="text.disabled"
                  mt={0.2}
                >
                  {notifications.length > 0
                    ? `${notifications.length} unread alert${notifications.length > 1 ? "s" : ""}`
                    : "All caught up"}
                </Typography>
              </Box>
            </Box>

            {notifications.length > 0 && (
              <Box
                sx={{
                  px: 2,
                  py: 0.6,
                  borderRadius: "20px",
                  bgcolor: "#fff3f3",
                  border: "1.5px solid #ffcdd2",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#d32f2f",
                    "@keyframes pulse": {
                      "0%":   { opacity: 1, transform: "scale(1)" },
                      "50%":  { opacity: 0.5, transform: "scale(1.3)" },
                      "100%": { opacity: 1, transform: "scale(1)" },
                    },
                    animation: "pulse 1.8s ease-in-out infinite",
                  }}
                />
                <Typography fontSize={12} fontWeight={700} color="#d32f2f">
                  {notifications.length} Unread
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>


        {/* ══════════════════════════════════════════
            NOTIFICATION LIST  — UNTOUCHED
            except: Accept button onClick changed
        ══════════════════════════════════════════ */}
        {notifications.length === 0 ? (

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mt={{ xs: 8, sm: 12 }}
            sx={{ opacity: 0.75 }}
          >
            <img
              src={empty_box}
              alt="no notifications"
              style={{
                width: isMobile ? "55%" : isTablet ? "30%" : "18%",
                height: "auto",
                animation: "float 2s ease-in-out infinite",
              }}
            />
            <Typography
              mt={2}
              fontWeight={600}
              color="text.secondary"
              fontSize={{ xs: 14, sm: 16 }}
            >
              No Notifications Yet
            </Typography>
            <Typography
              fontSize={{ xs: 12, sm: 13 }}
              color="text.disabled"
              mt={0.5}
            >
              You're all caught up for now 🎉
            </Typography>
          </Box>

        ) : (

          <Stack spacing={{ xs: 1.5, sm: 2 }}>
            {notifications.map((n, index) => (
              <Paper
                key={n.notification_id}
                elevation={0}
                sx={{
                  width: "100%",
                  borderRadius: { xs: 3, sm: 3.5 },
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: n.title === "Low Stock"
                    ? "rgba(211, 47, 47, 0.15)"
                    : "rgba(46, 125, 50, 0.15)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  bgcolor: "#ffffff",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: n.title === "Low Stock"
                      ? "0 8px 24px rgba(211, 47, 47, 0.10)"
                      : "0 8px 24px rgba(46, 125, 50, 0.10)",
                  },
                }}
              >
                <Box display="flex">
                  <Box
                    sx={{
                      width: 4,
                      flexShrink: 0,
                      bgcolor: n.title === "Low Stock" ? "#d32f2f" : "#2e7d32",
                    }}
                  />

                  <Box
                    sx={{
                      flex: 1,
                      p: { xs: 2, sm: 2.5 },
                      minWidth: 0,
                    }}
                  >

                    {/* ── LOW STOCK — UNTOUCHED ── */}
                    {n.title === "Low Stock" && (
                      <Box
                        display="flex"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        justifyContent="space-between"
                        gap={1.5}
                      >
                        <Box
                          display="flex"
                          flexWrap="wrap"
                          alignItems="center"
                          gap={1}
                          flex={1}
                          minWidth={0}
                        >
                          <Box
                            sx={{
                              width: 32, height: 32,
                              borderRadius: "8px",
                              bgcolor: "#fff3f3",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <WarningIcon sx={{ color: "#d32f2f", fontSize: 18 }} />
                          </Box>

                          <Typography
                            fontWeight={700}
                            fontSize={{ xs: 13, sm: 14, md: 15 }}
                            color="#1a1a2e"
                            sx={{ wordBreak: "break-word", flexShrink: 0 }}
                          >
                            {n.name}
                          </Typography>

                          <Box
                            sx={{
                              background: "#ffebee",
                              color: "#d32f2f",
                              px: 1.5, py: 0.4,
                              borderRadius: "20px",
                              fontSize: { xs: 10, sm: 11 },
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.4,
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                              border: "1px solid #ffcdd2",
                            }}
                          >
                            ⚠ {n.stock} left · Low stock
                          </Box>
                        </Box>

                        <IconButton
                          onClick={() => readNotification(n.notification_id)}
                          size="small"
                          sx={{
                            flexShrink: 0,
                            color: "text.disabled",
                            bgcolor: "#f5f5f5",
                            width: 30, height: 30,
                            borderRadius: "8px",
                            "&:hover": { bgcolor: "#ffebee", color: "#d32f2f" },
                          }}
                        >
                          <CloseIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    )}

                    {/* ── NEW ORDER ── */}
                    {n.title === "New Order" && (
                      <Box
                        display="flex"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        justifyContent="space-between"
                        flexDirection={{ xs: "column", sm: "row" }}
                        gap={{ xs: 2, sm: 2.5 }}
                      >
                        {/* Left: order info — UNTOUCHED */}
                        <Box display="flex" gap={1.5} flex={1} minWidth={0}>
                          <Box
                            sx={{
                              width: 36, height: 36,
                              borderRadius: "10px",
                              bgcolor: "#f0faf0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              mt: 0.3,
                            }}
                          >
                            <ShoppingCartIcon sx={{ color: "#2e7d32", fontSize: 18 }} />
                          </Box>

                          <Box minWidth={0}>
                            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                              <Typography
                                fontWeight={700}
                                fontSize={{ xs: 13, sm: 14, md: 15 }}
                                color="#1a1a2e"
                              >
                                {n.title}
                              </Typography>
                              <Box
                                sx={{
                                  px: 1, py: 0.2,
                                  bgcolor: "#e8f5e9",
                                  color: "#2e7d32",
                                  borderRadius: "20px",
                                  fontSize: { xs: 9, sm: 10 },
                                  fontWeight: 700,
                                  border: "1px solid #c8e6c9",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                NEW
                              </Box>
                            </Box>

                            <Typography
                              fontSize={{ xs: 12, sm: 13 }}
                              color="text.secondary"
                              mt={0.4}
                              sx={{ wordBreak: "break-word" }}
                            >
                              {n.message}
                            </Typography>

                            <Typography
                              fontSize={{ xs: 10, sm: 11 }}
                              color="text.disabled"
                              mt={0.4}
                            >
                              🕐 {n.time_ago}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Right: Accept button
                            ── CHANGE: onClick now opens dialog instead of directly calling updateStatus ── */}
                        <Box
                          display="flex"
                          gap={1.5}
                          flexShrink={0}
                          alignSelf={{ xs: "flex-end", sm: "center" }}
                          width={{ xs: "100%", sm: "auto" }}
                          justifyContent={{ xs: "flex-end", sm: "flex-start" }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleAcceptClick(n)}  //{/* ── CHANGED ── */}
                            sx={{
                              px: { xs: 2.5, sm: 3 },
                              py: 0.8,
                              borderRadius: "10px",
                              fontSize: { xs: 11, sm: 12 },
                              fontWeight: 700,
                              bgcolor: "#2e7d32",
                              boxShadow: "0 2px 8px rgba(46,125,50,0.25)",
                              textTransform: "uppercase",
                              letterSpacing: 0.5,
                              "&:hover": {
                                bgcolor: "#1b5e20",
                                boxShadow: "0 4px 12px rgba(46,125,50,0.35)",
                              },
                            }}
                          >
                            Accept
                          </Button>
                        </Box>
                      </Box>
                    )}

                  </Box>
                </Box>
              </Paper>
            ))}

            <Box height={{ xs: 16, sm: 24 }} />
          </Stack>
        )}

      </Box>

      {/* ══════════════════════════════════════════
          NEW: Order Accept Dialog
      ══════════════════════════════════════════ */}
      <OrderAcceptDialog
        open={openAcceptDialog}
        onClose={() => setOpenAcceptDialog(false)}
        notification={acceptNotification}
        onConfirm={handleConfirmAccept}
        confirming={confirming}
        confirmError={confirmError}
      />

    </Box>
  );
};

export default Notification;