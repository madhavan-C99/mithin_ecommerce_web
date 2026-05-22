// // 📁 src/webdelivery/pages/CurrentOrdersPage.jsx

// import { Box, Typography, Chip } from "@mui/material";
// import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
// import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
// import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
// import WifiOffRoundedIcon from "@mui/icons-material/WifiOffRounded";
// import useDeliverySocket from "../hooks/useDeliverySocket";
// import ActiveOrderCard from "../components/currentorders/ActiveOrderCard";
// import NewOrderPopup from "../components/currentorders/NewOrderPopup";

// /**
//  * CurrentOrdersPage
//  *
//  * WebSocket-powered page. Handles 4 states:
//  * 1. Disconnected  — WS not yet connected
//  * 2. No order      — connected, waiting for assignment
//  * 3. Active order  — ORDER_CONFIRMED received → show ActiveOrderCard
//  * 4. New request   — NEW_ORDER_REQUEST received → show NewOrderPopup
//  */

// /** WS status indicator chip */
// const WsStatusChip = ({ status }) => {
//   const config = {
//     connected: { label: "Live", color: "#22C55E", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)" },
//     connecting: { label: "Connecting...", color: "#F97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)" },
//     disconnected: { label: "Disconnected", color: "#EF4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)" },
//   };
//   const cfg = config[status] ?? config.disconnected;

//   return (
//     <Chip
//       icon={
//         <FiberManualRecordRoundedIcon
//           sx={{ fontSize: "10px !important", color: `${cfg.color} !important` }}
//         />
//       }
//       label={cfg.label}
//       size="small"
//       sx={{
//         backgroundColor: cfg.bg,
//         color: cfg.color,
//         fontWeight: 700,
//         fontSize: "0.72rem",
//         height: 26,
//         border: `1px solid ${cfg.border}`,
//         "& .MuiChip-icon": { ml: "6px" },
//       }}
//     />
//   );
// };

// /** Empty state — waiting for order */
// const WaitingState = () => (
//   <Box
//     sx={{
//       backgroundColor: "#FFFFFF",
//       borderRadius: "20px",
//       border: "1px solid #E2E8F0",
//       py: { xs: 8, md: 12 },
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
//     }}
//   >
//     <Box
//       sx={{
//         width: 80,
//         height: 80,
//         borderRadius: "22px",
//         backgroundColor: "rgba(249,115,22,0.08)",
//         border: "1px solid rgba(249,115,22,0.15)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         mb: 3,
//       }}
//     >
//       <InboxRoundedIcon sx={{ color: "#F97316", fontSize: 40 }} />
//     </Box>
//     <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "1.1rem", mb: 0.8 }}>
//       No Active Orders
//     </Typography>
//     <Typography
//       sx={{
//         color: "#94A3B8",
//         fontSize: "0.875rem",
//         textAlign: "center",
//         maxWidth: 300,
//         lineHeight: 1.6,
//       }}
//     >
//       You're all set! New order assignments will appear here automatically.
//     </Typography>
//   </Box>
// );

// /** Disconnected state */
// const DisconnectedState = () => (
//   <Box
//     sx={{
//       backgroundColor: "#FFFFFF",
//       borderRadius: "20px",
//       border: "1px solid #FEE2E2",
//       py: { xs: 8, md: 12 },
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
//     }}
//   >
//     <Box
//       sx={{
//         width: 80,
//         height: 80,
//         borderRadius: "22px",
//         backgroundColor: "rgba(239,68,68,0.08)",
//         border: "1px solid rgba(239,68,68,0.15)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         mb: 3,
//       }}
//     >
//       <WifiOffRoundedIcon sx={{ color: "#EF4444", fontSize: 40 }} />
//     </Box>
//     <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "1.1rem", mb: 0.8 }}>
//       Connection Lost
//     </Typography>
//     <Typography
//       sx={{
//         color: "#94A3B8",
//         fontSize: "0.875rem",
//         textAlign: "center",
//         maxWidth: 300,
//         lineHeight: 1.6,
//       }}
//     >
//       Attempting to reconnect automatically. Please check your internet connection.
//     </Typography>
//   </Box>
// );

// const CurrentOrdersPage = () => {
//   const { activeOrder, newOrderRequest, wsStatus, acceptOrder, dismissRequest } =
//     useDeliverySocket();

//   return (
//     <Box>
//       {/* ── Page Header ── */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: { xs: "flex-start", sm: "center" },
//           justifyContent: "space-between",
//           flexDirection: { xs: "column", sm: "row" },
//           gap: 1,
//           mb: 3,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <Box
//             sx={{
//               width: 42,
//               height: 42,
//               borderRadius: "12px",
//               backgroundColor: "rgba(249,115,22,0.08)",
//               border: "1px solid rgba(249,115,22,0.15)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <LocalShippingRoundedIcon sx={{ color: "#F97316", fontSize: 22 }} />
//           </Box>
//           <Box>
//             <Typography
//               sx={{
//                 color: "#0F172A",
//                 fontWeight: 800,
//                 fontSize: { xs: "1.2rem", md: "1.5rem" },
//                 lineHeight: 1.2,
//               }}
//             >
//               Current Orders
//             </Typography>
//             <Typography sx={{ color: "#64748B", fontSize: "0.82rem", mt: 0.3 }}>
//               Live order assignments
//             </Typography>
//           </Box>
//         </Box>

//         {/* WS status chip */}
//         <WsStatusChip status={wsStatus} />
//       </Box>

//       {/* ── Page Content ── */}
//       {wsStatus === "disconnected" && !activeOrder ? (
//         <DisconnectedState />
//       ) : activeOrder ? (
//         <ActiveOrderCard order={activeOrder} />
//       ) : (
//         <WaitingState />
//       )}

//       {/* ── New Order Popup ── */}
//       <NewOrderPopup
//         open={!!newOrderRequest}
//         order={newOrderRequest}
//         onAccept={acceptOrder}
//         onDismiss={dismissRequest}
//       />
//     </Box>
//   );
// };

// export default CurrentOrdersPage;











// // 📁 src/webdelivery/pages/CurrentOrdersPage.jsx

// import { Box, Typography, Chip } from "@mui/material";
// import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
// import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
// import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
// import WifiOffRoundedIcon from "@mui/icons-material/WifiOffRounded";
// import useDeliverySocket from "../hooks/useDeliverySocket";
// import ActiveOrderCard from "../components/currentorders/ActiveOrderCard";

// /**
//  * CurrentOrdersPage
//  *
//  * WebSocket-powered. No popup — everything flows through ActiveOrderCard.
//  *
//  * States:
//  * 1. disconnected              → DisconnectedState
//  * 2. connected, no order       → WaitingState
//  * 3. ORDER_CONFIRMED received  → ActiveOrderCard
//  *    - status "pending_acceptance" → Accept button
//  *    - status "accepted"           → Reached + Report buttons
//  */

// const WsStatusChip = ({ status }) => {
//   const config = {
//     connected:    { label: "Live",          color: "#22C55E", bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.2)"  },
//     connecting:   { label: "Connecting...", color: "#F97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)" },
//     disconnected: { label: "Disconnected",  color: "#EF4444", bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.2)"  },
//   };
//   const cfg = config[status] ?? config.disconnected;

//   return (
//     <Chip
//       icon={
//         <FiberManualRecordRoundedIcon
//           sx={{ fontSize: "10px !important", color: `${cfg.color} !important` }}
//         />
//       }
//       label={cfg.label}
//       size="small"
//       sx={{
//         backgroundColor: cfg.bg,
//         color: cfg.color,
//         fontWeight: 700,
//         fontSize: "0.72rem",
//         height: 26,
//         border: `1px solid ${cfg.border}`,
//         "& .MuiChip-icon": { ml: "6px" },
//       }}
//     />
//   );
// };

// const WaitingState = () => (
//   <Box
//     sx={{
//       backgroundColor: "#FFFFFF",
//       borderRadius: "20px",
//       border: "1px solid #E2E8F0",
//       py: { xs: 8, md: 12 },
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
//     }}
//   >
//     <Box
//       sx={{
//         width: 80,
//         height: 80,
//         borderRadius: "22px",
//         backgroundColor: "rgba(249,115,22,0.08)",
//         border: "1px solid rgba(249,115,22,0.15)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         mb: 3,
//       }}
//     >
//       <InboxRoundedIcon sx={{ color: "#F97316", fontSize: 40 }} />
//     </Box>
//     <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "1.1rem", mb: 0.8 }}>
//       No Active Orders
//     </Typography>
//     <Typography
//       sx={{
//         color: "#94A3B8",
//         fontSize: "0.875rem",
//         textAlign: "center",
//         maxWidth: 300,
//         lineHeight: 1.6,
//       }}
//     >
//       You're all set! New order assignments will appear here automatically.
//     </Typography>
//   </Box>
// );

// const DisconnectedState = () => (
//   <Box
//     sx={{
//       backgroundColor: "#FFFFFF",
//       borderRadius: "20px",
//       border: "1px solid #FEE2E2",
//       py: { xs: 8, md: 12 },
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
//     }}
//   >
//     <Box
//       sx={{
//         width: 80,
//         height: 80,
//         borderRadius: "22px",
//         backgroundColor: "rgba(239,68,68,0.08)",
//         border: "1px solid rgba(239,68,68,0.15)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         mb: 3,
//       }}
//     >
//       <WifiOffRoundedIcon sx={{ color: "#EF4444", fontSize: 40 }} />
//     </Box>
//     <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "1.1rem", mb: 0.8 }}>
//       Connection Lost
//     </Typography>
//     <Typography
//       sx={{
//         color: "#94A3B8",
//         fontSize: "0.875rem",
//         textAlign: "center",
//         maxWidth: 300,
//         lineHeight: 1.6,
//       }}
//     >
//       Attempting to reconnect automatically. Please check your internet connection.
//     </Typography>
//   </Box>
// );

// const CurrentOrdersPage = () => {
//   const { activeOrder, wsStatus, acceptOrder } = useDeliverySocket();

//   return (
//     <Box>
//       {/* ── Page Header ── */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: { xs: "flex-start", sm: "center" },
//           justifyContent: "space-between",
//           flexDirection: { xs: "column", sm: "row" },
//           gap: 1,
//           mb: 3,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <Box
//             sx={{
//               width: 42,
//               height: 42,
//               borderRadius: "12px",
//               backgroundColor: "rgba(249,115,22,0.08)",
//               border: "1px solid rgba(249,115,22,0.15)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <LocalShippingRoundedIcon sx={{ color: "#F97316", fontSize: 22 }} />
//           </Box>
//           <Box>
//             <Typography
//               sx={{
//                 color: "#0F172A",
//                 fontWeight: 800,
//                 fontSize: { xs: "1.2rem", md: "1.5rem" },
//                 lineHeight: 1.2,
//               }}
//             >
//               Current Orders
//             </Typography>
//             <Typography sx={{ color: "#64748B", fontSize: "0.82rem", mt: 0.3 }}>
//               Live order assignments
//             </Typography>
//           </Box>
//         </Box>

//         {/* <WsStatusChip status={wsStatus} /> */}
//       </Box>

//       {/* ── Page Content ── */}
//       {wsStatus === "disconnected" && !activeOrder ? (
//         <DisconnectedState />
//       ) : activeOrder ? (
//         <ActiveOrderCard order={activeOrder} onAccept={acceptOrder} />
//       ) : (
//         <WaitingState />
//       )}
//     </Box>
//   );
// };

// export default CurrentOrdersPage;











// 📁 src/webdelivery/pages/CurrentOrdersPage.jsx

import { useCallback, useState } from "react";
import { Box, Typography, Chip, Snackbar, Alert } from "@mui/material";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import WifiOffRoundedIcon from "@mui/icons-material/WifiOffRounded";
// import useDeliverySocket from "../hooks/useDeliverySocket";
// import { useDeliverySocketContext } from "../context/DeliverySocketContext ";
import ActiveOrderCard from "../components/currentorders/ActiveOrderCard";
import useDeliverySocket from "../hooks/useDeliverySocket";

const WsStatusChip = ({ status }) => {
  const config = {
    connected:    { label: "Live",          color: "#22C55E", bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.2)"  },
    connecting:   { label: "Connecting...", color: "#F97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)" },
    disconnected: { label: "Disconnected",  color: "#EF4444", bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.2)"  },
  };
  const cfg = config[status] ?? config.disconnected;

  return (
    <Chip
      icon={
        <FiberManualRecordRoundedIcon
          sx={{ fontSize: "10px !important", color: `${cfg.color} !important` }}
        />
      }
      label={cfg.label}
      size="small"
      sx={{
        backgroundColor: cfg.bg,
        color: cfg.color,
        fontWeight: 700,
        fontSize: "0.72rem",
        height: 26,
        border: `1px solid ${cfg.border}`,
        "& .MuiChip-icon": { ml: "6px" },
      }}
    />
  );
};

const WaitingState = () => (
  <Box
    sx={{
      backgroundColor: "#FFFFFF",
      borderRadius: "20px",
      border: "1px solid #E2E8F0",
      py: { xs: 8, md: 12 },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    }}
  >
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: "22px",
        backgroundColor: "rgba(249,115,22,0.08)",
        border: "1px solid rgba(249,115,22,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 3,
      }}
    >
      <InboxRoundedIcon sx={{ color: "#F97316", fontSize: 40 }} />
    </Box>
    <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "1.1rem", mb: 0.8 }}>
      No Active Orders
    </Typography>
    <Typography
      sx={{
        color: "#94A3B8",
        fontSize: "0.875rem",
        textAlign: "center",
        maxWidth: 300,
        lineHeight: 1.6,
      }}
    >
      You're all set! New order assignments will appear here automatically.
    </Typography>
  </Box>
);

const DisconnectedState = () => (
  <Box
    sx={{
      backgroundColor: "#FFFFFF",
      borderRadius: "20px",
      border: "1px solid #FEE2E2",
      py: { xs: 8, md: 12 },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    }}
  >
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: "22px",
        backgroundColor: "rgba(239,68,68,0.08)",
        border: "1px solid rgba(239,68,68,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 3,
      }}
    >
      <WifiOffRoundedIcon sx={{ color: "#EF4444", fontSize: 40 }} />
    </Box>
    <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "1.1rem", mb: 0.8 }}>
      Connection Lost
    </Typography>
    <Typography
      sx={{
        color: "#94A3B8",
        fontSize: "0.875rem",
        textAlign: "center",
        maxWidth: 300,
        lineHeight: 1.6,
      }}
    >
      Attempting to reconnect automatically. Please check your internet connection.
    </Typography>
  </Box>
);

const CurrentOrdersPage = () => {
  // const { activeOrder, wsStatus, acceptOrder, clearOrder } = useDeliverySocketContext();
  const { activeOrder, wsStatus, acceptOrder, clearOrder } = useDeliverySocket();
  // ── Snackbar state ──
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  // ── Called from ActiveOrderCard after report API succeeds ──
  const handleReportSuccess = useCallback(() => {
    clearOrder();
    setSnackbar({ open: true, message: "Issue reported successfully. Order has been cleared." });
  }, [clearOrder]);

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box>
      {/* ── Page Header ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              backgroundColor: "rgba(249,115,22,0.08)",
              border: "1px solid rgba(249,115,22,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LocalShippingRoundedIcon sx={{ color: "#F97316", fontSize: 22 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#0F172A",
                fontWeight: 800,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                lineHeight: 1.2,
              }}
            >
              Current Orders
            </Typography>
            <Typography sx={{ color: "#64748B", fontSize: "0.82rem", mt: 0.3 }}>
              Live order assignments
            </Typography>
          </Box>
        </Box>

        <WsStatusChip status={wsStatus} />
      </Box>

      {/* ── Page Content ── */}
      {wsStatus === "disconnected" && !activeOrder ? (
        <DisconnectedState />
      ) : activeOrder ? (
        <ActiveOrderCard
          order={activeOrder}
          onAccept={acceptOrder}
          onReportSuccess={handleReportSuccess} // ── NEW
        />
      ) : (
        <WaitingState />
      )}

      {/* ── Success Snackbar ── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{
            borderRadius: "12px",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CurrentOrdersPage;