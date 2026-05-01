// // // 📁 src/webdelivery/components/orders/ActiveOrderCard.jsx

// // import {
// //   Box,
// //   Typography,
// //   Chip,
// //   Divider,
// //   Button,
// //   Grid,
// // } from "@mui/material";
// // import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
// // import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
// // import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
// // import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
// // import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
// // import MapRoundedIcon from "@mui/icons-material/MapRounded";
// // import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// // import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
// // import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
// // import { useNavigate } from "react-router-dom";

// // /**
// //  * ActiveOrderCard
// //  *
// //  * Driven by order.status field from WebSocket ORDER_CONFIRMED message:
// //  *
// //  * status: "pending_acceptance"
// //  *   → Shows full order details + Accept button
// //  *   → Accept sends WS message → backend pushes back ORDER_CONFIRMED
// //  *     with status "accepted" → card re-renders automatically
// //  *
// //  * status: "accepted"
// //  *   → Shows full order details + Reached Location + Report Issue buttons
// //  *   → Reached navigates to /delivery/otp with order_id
// //  *   → Report is a placeholder (API wired later)
// //  *
// //  * Props:
// //  *   order      : full ORDER_CONFIRMED payload
// //  *   onAccept   : function(order_id) — from useDeliverySocket
// //  */
// // const ActiveOrderCard = ({ order, onAccept }) => {
// //   const navigate = useNavigate();

// //   const {
// //     order_id,
// //     status,
// //     customer_name,
// //     delivery_address,
// //     items = [],
// //     total_amount,
// //   } = order;

// //   const isPendingAcceptance = status === "pending_acceptance";
// //   const isAccepted = status === "accepted";

// //   /** Open delivery address in Google Maps in new tab */
// //   const handleOpenMap = () => {
// //     const query = encodeURIComponent(delivery_address);
// //     window.open(
// //       `https://www.google.com/maps/search/?api=1&query=${query}`,
// //       "_blank"
// //     );
// //   };

// //   /** Reached — navigate to OTP page with order_id */
// //   const handleReached = () => {
// //     navigate("/delivery/otp", { state: { order_id } });
// //   };

// //   /** Report — placeholder, API wired later */
// //   const handleReport = () => {
// //     console.log("Report triggered for order", order_id);
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         backgroundColor: "#FFFFFF",
// //         borderRadius: "20px",
// //         border: "1px solid #E2E8F0",
// //         overflow: "hidden",
// //         boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
// //       }}
// //     >
// //       {/* ── Card Header ── */}
// //       <Box
// //         sx={{
// //           px: { xs: 2.5, md: 3 },
// //           py: 2.5,
// //           background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "space-between",
// //           flexWrap: "wrap",
// //           gap: 1,
// //         }}
// //       >
// //         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
// //           <Box
// //             sx={{
// //               width: 42,
// //               height: 42,
// //               borderRadius: "12px",
// //               background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               flexShrink: 0,
// //             }}
// //           >
// //             <LocalShippingRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />
// //           </Box>
// //           <Box>
// //             <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>
// //               Order #{order_id}
// //             </Typography>
// //             <Typography sx={{ color: "#94A3B8", fontSize: "0.75rem" }}>
// //               {isPendingAcceptance ? "Awaiting your acceptance" : "Active Delivery"}
// //             </Typography>
// //           </Box>
// //         </Box>

// //         {/* Status badge — driven by status field */}
// //         {isPendingAcceptance ? (
// //           <Chip
// //             label="Pending Acceptance"
// //             size="small"
// //             sx={{
// //               backgroundColor: "rgba(249,115,22,0.15)",
// //               color: "#FB923C",
// //               fontWeight: 700,
// //               fontSize: "0.75rem",
// //               border: "1px solid rgba(249,115,22,0.3)",
// //             }}
// //           />
// //         ) : (
// //           <Chip
// //             label="Accepted"
// //             size="small"
// //             icon={
// //               <HowToRegRoundedIcon
// //                 sx={{ fontSize: "14px !important", color: "#16A34A !important" }}
// //               />
// //             }
// //             sx={{
// //               backgroundColor: "rgba(34,197,94,0.12)",
// //               color: "#16A34A",
// //               fontWeight: 700,
// //               fontSize: "0.75rem",
// //               border: "1px solid rgba(34,197,94,0.25)",
// //               "& .MuiChip-icon": { ml: "6px" },
// //             }}
// //           />
// //         )}
// //       </Box>

// //       {/* ── Card Body ── */}
// //       <Box sx={{ p: { xs: 2.5, md: 3 } }}>
// //         <Grid container spacing={3}>

// //           {/* ── Left: Customer + Address + Map ── */}
// //           <Grid item xs={12} md={6}>

// //             {/* Customer */}
// //             <Box sx={{ mb: 3 }}>
// //               <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1 }}>
// //                 <PersonRoundedIcon sx={{ fontSize: 15, color: "#64748B" }} />
// //                 <Typography
// //                   sx={{
// //                     color: "#64748B",
// //                     fontSize: "0.7rem",
// //                     fontWeight: 700,
// //                     letterSpacing: "0.06em",
// //                     textTransform: "uppercase",
// //                   }}
// //                 >
// //                   Customer
// //                 </Typography>
// //               </Box>
// //               <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "1rem" }}>
// //                 {customer_name}
// //               </Typography>
// //             </Box>

// //             {/* Delivery Address */}
// //             <Box>
// //               <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1 }}>
// //                 <LocationOnRoundedIcon sx={{ fontSize: 15, color: "#64748B" }} />
// //                 <Typography
// //                   sx={{
// //                     color: "#64748B",
// //                     fontSize: "0.7rem",
// //                     fontWeight: 700,
// //                     letterSpacing: "0.06em",
// //                     textTransform: "uppercase",
// //                   }}
// //                 >
// //                   Delivery Address
// //                 </Typography>
// //               </Box>
// //               <Box
// //                 sx={{
// //                   backgroundColor: "#F8FAFC",
// //                   borderRadius: "12px",
// //                   border: "1px solid #E2E8F0",
// //                   p: 2,
// //                   mb: 1.5,
// //                 }}
// //               >
// //                 <Typography
// //                   sx={{
// //                     color: "#1E293B",
// //                     fontSize: "0.875rem",
// //                     fontWeight: 500,
// //                     lineHeight: 1.6,
// //                   }}
// //                 >
// //                   {delivery_address}
// //                 </Typography>
// //               </Box>

// //               {/* Open in Maps — shown for both statuses */}
// //               <Button
// //                 onClick={handleOpenMap}
// //                 startIcon={<MapRoundedIcon fontSize="small" />}
// //                 size="small"
// //                 variant="outlined"
// //                 sx={{
// //                   borderRadius: "8px",
// //                   borderColor: "#E2E8F0",
// //                   color: "#475569",
// //                   fontWeight: 600,
// //                   fontSize: "0.8rem",
// //                   textTransform: "none",
// //                   px: 2,
// //                   py: 0.8,
// //                   "&:hover": {
// //                     borderColor: "#F97316",
// //                     color: "#F97316",
// //                     backgroundColor: "rgba(249,115,22,0.04)",
// //                   },
// //                 }}
// //               >
// //                 Open in Google Maps
// //               </Button>
// //             </Box>
// //           </Grid>

// //           {/* ── Right: Items + Total ── */}
// //           <Grid item xs={12} md={6}>
// //             <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1.5 }}>
// //               <ShoppingBagRoundedIcon sx={{ fontSize: 15, color: "#64748B" }} />
// //               <Typography
// //                 sx={{
// //                   color: "#64748B",
// //                   fontSize: "0.7rem",
// //                   fontWeight: 700,
// //                   letterSpacing: "0.06em",
// //                   textTransform: "uppercase",
// //                 }}
// //               >
// //                 Items ({items.length})
// //               </Typography>
// //             </Box>

// //             <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2.5 }}>
// //               {items.map((item, index) => (
// //                 <Box
// //                   key={index}
// //                   sx={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "space-between",
// //                     backgroundColor: "#F8FAFC",
// //                     borderRadius: "10px",
// //                     px: 2,
// //                     py: 1.2,
// //                     border: "1px solid #F1F5F9",
// //                   }}
// //                 >
// //                   <Box>
// //                     <Typography
// //                       sx={{ fontWeight: 600, color: "#1E293B", fontSize: "0.875rem" }}
// //                     >
// //                       {item.product_name}
// //                     </Typography>
// //                     <Typography sx={{ color: "#94A3B8", fontSize: "0.75rem", mt: 0.2 }}>
// //                       Qty: {item.quantity} · ₹{parseFloat(item.price).toFixed(2)}/unit
// //                     </Typography>
// //                   </Box>
// //                   <Typography
// //                     sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.875rem" }}
// //                   >
// //                     ₹{(item.quantity * parseFloat(item.price)).toFixed(2)}
// //                   </Typography>
// //                 </Box>
// //               ))}
// //             </Box>

// //             <Divider sx={{ borderColor: "#F1F5F9", mb: 2 }} />

// //             {/* Total */}
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "space-between",
// //               }}
// //             >
// //               <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// //                 <CurrencyRupeeRoundedIcon sx={{ fontSize: 16, color: "#64748B" }} />
// //                 <Typography sx={{ color: "#64748B", fontWeight: 600, fontSize: "0.85rem" }}>
// //                   Order Total
// //                 </Typography>
// //               </Box>
// //               <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.15rem" }}>
// //                 ₹{parseFloat(total_amount).toFixed(2)}
// //               </Typography>
// //             </Box>
// //           </Grid>
// //         </Grid>

// //         <Divider sx={{ borderColor: "#F1F5F9", my: 3 }} />

// //         {/* ── Action Buttons — driven by status ── */}
// //         {isPendingAcceptance ? (
// //           // pending_acceptance → Accept button only
// //           <Button
// //             onClick={() => onAccept(order_id)}
// //             fullWidth
// //             variant="contained"
// //             startIcon={<CheckCircleRoundedIcon fontSize="small" />}
// //             sx={{
// //               borderRadius: "12px",
// //               background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
// //               fontWeight: 700,
// //               py: 1.5,
// //               textTransform: "none",
// //               fontSize: "0.95rem",
// //               boxShadow: "0 4px 12px rgba(249,115,22,0.25)",
// //               "&:hover": {
// //                 background: "linear-gradient(135deg, #FB923C 0%, #F97316 100%)",
// //                 boxShadow: "0 6px 20px rgba(249,115,22,0.35)",
// //                 transform: "translateY(-1px)",
// //               },
// //               transition: "all 0.2s ease",
// //             }}
// //           >
// //             Accept Order
// //           </Button>
// //         ) : (
// //           // accepted → Report + Reached buttons
// //           <Box
// //             sx={{
// //               display: "flex",
// //               flexDirection: { xs: "column", sm: "row" },
// //               gap: 1.5,
// //             }}
// //           >
// //             {/* Report — placeholder */}
// //             <Button
// //               onClick={handleReport}
// //               fullWidth
// //               variant="outlined"
// //               startIcon={<ReportProblemRoundedIcon fontSize="small" />}
// //               sx={{
// //                 borderRadius: "12px",
// //                 borderColor: "#E2E8F0",
// //                 color: "#64748B",
// //                 fontWeight: 600,
// //                 py: 1.4,
// //                 textTransform: "none",
// //                 fontSize: "0.9rem",
// //                 "&:hover": {
// //                   borderColor: "#EF4444",
// //                   color: "#EF4444",
// //                   backgroundColor: "rgba(239,68,68,0.04)",
// //                 },
// //               }}
// //             >
// //               Report Issue
// //             </Button>

// //             {/* Reached Location */}
// //             <Button
// //               onClick={handleReached}
// //               fullWidth
// //               variant="contained"
// //               startIcon={<CheckCircleRoundedIcon fontSize="small" />}
// //               sx={{
// //                 borderRadius: "12px",
// //                 background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
// //                 fontWeight: 700,
// //                 py: 1.4,
// //                 textTransform: "none",
// //                 fontSize: "0.9rem",
// //                 boxShadow: "0 4px 12px rgba(34,197,94,0.25)",
// //                 "&:hover": {
// //                   background: "linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)",
// //                   boxShadow: "0 6px 20px rgba(34,197,94,0.35)",
// //                   transform: "translateY(-1px)",
// //                 },
// //                 transition: "all 0.2s ease",
// //               }}
// //             >
// //               Reached Location
// //             </Button>
// //           </Box>
// //         )}
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default ActiveOrderCard;













// // 📁 src/webdelivery/components/orders/ActiveOrderCard.jsx

// import {
//   Box,
//   Typography,
//   Chip,
//   Button,
//   Divider,
// } from "@mui/material";
// import LocalShippingRoundedIcon    from "@mui/icons-material/LocalShippingRounded";
// import PersonRoundedIcon           from "@mui/icons-material/PersonRounded";
// import LocationOnRoundedIcon       from "@mui/icons-material/LocationOnRounded";
// import ShoppingBagRoundedIcon      from "@mui/icons-material/ShoppingBagRounded";
// import CurrencyRupeeRoundedIcon    from "@mui/icons-material/CurrencyRupeeRounded";
// import MapRoundedIcon              from "@mui/icons-material/MapRounded";
// import CheckCircleRoundedIcon      from "@mui/icons-material/CheckCircleRounded";
// import ReportProblemRoundedIcon    from "@mui/icons-material/ReportProblemRounded";
// import HowToRegRoundedIcon         from "@mui/icons-material/HowToRegRounded";
// import OpenInNewRoundedIcon        from "@mui/icons-material/OpenInNewRounded";
// import ScaleRoundedIcon            from "@mui/icons-material/ScaleRounded";
// import { useNavigate } from "react-router-dom";

// // ─────────────────────────────────────────────────────────────────────────────
// // extractMapAddress
// //
// // Strips name (first token, letters-only at index 0) and mobile
// // (any 10-digit token) before building Google Maps URL.
// //
// // Input  : "arjun,6385868812, 3/38, Sarathy Nagar, Velachery, Chennai-600042,Tamil Nadu,India"
// // Output : "3/38, Sarathy Nagar, Velachery, Chennai-600042, Tamil Nadu, India"
// // ─────────────────────────────────────────────────────────────────────────────
// const extractMapAddress = (raw = "") =>
//   raw
//     .split(",")
//     .map((p) => p.trim())
//     .filter((p, i) => {
//       if (i === 0 && /^[a-zA-Z\s]+$/.test(p)) return false; // name at index 0
//       if (/^\d{10}$/.test(p)) return false;                  // 10-digit mobile
//       return true;
//     })
//     .join(", ");

// // ─────────────────────────────────────────────────────────────────────────────
// // SectionLabel — tiny icon + uppercase muted label
// // ─────────────────────────────────────────────────────────────────────────────
// const SectionLabel = ({ icon, text }) => (
//   <Box sx={{ display: "flex", alignItems: "center", gap: 0.7, mb: 1.2 }}>
//     {icon}
//     <Typography
//       sx={{
//         fontSize: "0.62rem",
//         fontWeight: 700,
//         letterSpacing: "0.1em",
//         textTransform: "uppercase",
//         color: "#94A3B8",
//       }}
//     >
//       {text}
//     </Typography>
//   </Box>
// );

// // ─────────────────────────────────────────────────────────────────────────────
// // UnitBadge — inline pill for unit type (kg, pcs, ltr, bn …)
// // ─────────────────────────────────────────────────────────────────────────────
// const UnitBadge = ({ label }) => (
//   <Box
//     component="span"
//     sx={{
//       display: "inline-flex",
//       alignItems: "center",
//       color: "#94A3B8",
//     //   px: 0.9,
//     //   py: 0.15,
//     //   borderRadius: "5px",
//     //   backgroundColor: "rgba(249,115,22,0.08)",
//     //   border: "1px solid rgba(249,115,22,0.20)",
//     //   color: "#EA580C",
//       fontSize: "0.68rem",
//       fontWeight: 500,
//       letterSpacing: "0.04em",
//     //   textTransform: "uppercase",
//       lineHeight: 1.5,
//       ml: 0.5,
//     }}
//   >
//     {label}
//   </Box>
// );

// // ─────────────────────────────────────────────────────────────────────────────
// // ActiveOrderCard
// //
// // Props:
// //   order    — full ORDER_CONFIRMED payload from WebSocket
// //   onAccept — fn(order_id) wired from useDeliverySocket via CurrentOrdersPage
// //
// // WebSocket item shape:
// //   { product_name, quantity, weight, unit, price }
// //
// // Status-driven layout:
// //   "pending_acceptance" → Accept button
// //   "accepted"           → Report Issue + Reached Location buttons
// //
// // Desktop layout (md+):
// //   ┌──────────────────────────────────────────┐
// //   │  HEADER (dark gradient)                  │
// //   ├────────────────────┬─────────────────────┤
// //   │  Customer          │  Items + Total       │
// //   │  Address           │                     │
// //   ├────────────────────┴─────────────────────┤
// //   │  Map iframe (full width)                 │
// //   ├──────────────────────────────────────────┤
// //   │  Action Buttons                          │
// //   └──────────────────────────────────────────┘
// // ─────────────────────────────────────────────────────────────────────────────
// const ActiveOrderCard = ({ order, onAccept }) => {
//   const navigate = useNavigate();

//   const {
//     order_id,
//     status,
//     customer_name,
//     delivery_address,
//     items = [],
//     total_amount,
//   } = order;

//   const isPendingAcceptance = status === "pending_acceptance";

//   const cleanAddress = extractMapAddress(delivery_address);
//   const mapSrc = cleanAddress
//     ? `https://maps.google.com/maps?q=${encodeURIComponent(cleanAddress)}&output=embed&zoom=15`
//     : "";
//   const mapOpenLink = cleanAddress
//     ? `https://www.google.com/maps/search/${encodeURIComponent(cleanAddress)}`
//     : "";

//   const handleReached = () => navigate("/delivery/otp", { state: { order_id } });
//   const handleReport  = () => console.log("Report triggered for order", order_id); // TODO: wire API

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#FFFFFF",
//         borderRadius: "20px",
//         border: "1px solid #E2E8F0",
//         overflow: "hidden",
//         boxShadow: "0 2px 24px rgba(0,0,0,0.07)",
//       }}
//     >

//       {/* ══════════════════════════════════════════
//           1. HEADER
//       ══════════════════════════════════════════ */}
//       <Box
//         sx={{
//           px: { xs: 2.5, md: 3.5 },
//           py: { xs: 2, md: 2.5 },
//           background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: 1,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <Box
//             sx={{
//               width: 44,
//               height: 44,
//               borderRadius: "13px",
//               background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               flexShrink: 0,
//               boxShadow: "0 4px 14px rgba(249,115,22,0.38)",
//             }}
//           >
//             <LocalShippingRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />
//           </Box>

//           <Box>
//             <Typography
//               sx={{
//                 color: "#fff",
//                 fontWeight: 800,
//                 fontSize: { xs: "0.95rem", md: "1.05rem" },
//                 lineHeight: 1.2,
//               }}
//             >
//               Order #{order_id}
//             </Typography>
//             <Typography sx={{ color: "#64748B", fontSize: "0.72rem", mt: 0.25 }}>
//               {isPendingAcceptance ? "Awaiting your acceptance" : "Active Delivery"}
//             </Typography>
//           </Box>
//         </Box>

//         {/* Status chip */}
//         {isPendingAcceptance ? (
//           <Chip
//             label="Pending Acceptance"
//             size="small"
//             sx={{
//               backgroundColor: "rgba(249,115,22,0.15)",
//               color: "#FB923C",
//               fontWeight: 700,
//               fontSize: "0.72rem",
//               border: "1px solid rgba(249,115,22,0.30)",
//               height: 26,
//             }}
//           />
//         ) : (
//           <Chip
//             label="Accepted"
//             size="small"
//             icon={
//               <HowToRegRoundedIcon
//                 sx={{ fontSize: "14px !important", color: "#16A34A !important" }}
//               />
//             }
//             sx={{
//               backgroundColor: "rgba(34,197,94,0.12)",
//               color: "#16A34A",
//               fontWeight: 700,
//               fontSize: "0.72rem",
//               border: "1px solid rgba(34,197,94,0.25)",
//               height: 26,
//               "& .MuiChip-icon": { ml: "6px" },
//             }}
//           />
//         )}
//       </Box>

//       {/* ══════════════════════════════════════════
//           2. INFO ROW
//           ──────────────────────────────────────────
//           Desktop (md+):
//             Left column  — Customer + Address      (40% width)
//             1px divider  — #F1F5F9 vertical line
//             Right column — Items list + Total      (60% width)

//           Mobile (xs):
//             Customer + Address stacked above Items (divider between)

//           Why this approach:
//           - CSS grid on the wrapper with explicit column sizing gives
//             the items section more real-estate (60%) since it holds
//             more content, while customer info stays compact (40%).
//           - No nested background boxes — sections breathe inside
//             the white card directly.
//       ══════════════════════════════════════════ */}
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: { xs: "1fr", md: "2fr 1px 3fr" },
//           alignItems: "stretch",
//         }}
//       >

//         {/* ── LEFT: Customer + Delivery Address ── */}
//         <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: { xs: 2.5, md: 3 } }}>

//           {/* Customer */}
//           <Box sx={{ mb: 2.5 }}>
//             <SectionLabel
//               icon={<PersonRoundedIcon sx={{ fontSize: 13, color: "#94A3B8" }} />}
//               text="Customer"
//             />
//             <Typography
//               sx={{
//                 fontWeight: 700,
//                 color: "#0F172A",
//                 fontSize: "1rem",
//                 lineHeight: 1.3,
//               }}
//             >
//               {customer_name}
//             </Typography>
//           </Box>

//           {/* Delivery Address */}
//           <Box>
//             <SectionLabel
//               icon={<LocationOnRoundedIcon sx={{ fontSize: 13, color: "#94A3B8" }} />}
//               text="Delivery Address"
//             />
//             <Typography
//               sx={{
//                 color: "#374151",
//                 fontSize: "0.865rem",
//                 fontWeight: 500,
//                 lineHeight: 1.75,
//                 wordBreak: "break-word",
//               }}
//             >
//               {delivery_address}
//             </Typography>
//           </Box>
//         </Box>

//         {/* ── VERTICAL DIVIDER (desktop only) ── */}
//         <Box
//           sx={{
//             display: { xs: "none", md: "block" },
//             backgroundColor: "#F1F5F9",
//             alignSelf: "stretch",
//           }}
//         />

//         {/* ── RIGHT: Items + Total ── */}
//         <Box
//           sx={{
//             px: { xs: 2.5, md: 3.5 },
//             py: { xs: 2.5, md: 3 },
//             borderTop: { xs: "1px solid #F1F5F9", md: "none" },
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <SectionLabel
//             icon={<ShoppingBagRoundedIcon sx={{ fontSize: 13, color: "#94A3B8" }} />}
//             text={`Items (${items.length})`}
//           />

//           {/* ── Item rows
//               • maxHeight 240px → scrollable for many items
//               • Each row: product name left, subtotal right
//               • Second line: Qty · Weight+Unit · price/unit
//               • Thin divider between rows only (not after last)
//           ── */}
//           <Box
//             sx={{
//               maxHeight: 240,
//               overflowY: "auto",
//               "&::-webkit-scrollbar":       { width: 3 },
//               "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
//               "&::-webkit-scrollbar-thumb": { bgcolor: "#E2E8F0", borderRadius: 2 },
//             }}
//           >
//             {items.map((item, i) => {
//               const subtotal = (item.quantity * parseFloat(item.price)).toFixed(2);
//               return (
//                 <Box
//                   key={i}
//                   sx={{
//                     display: "flex",
//                     alignItems: "flex-start",
//                     justifyContent: "space-between",
//                     gap: 2,
//                     py: 1.4,
//                     borderBottom: i < items.length - 1 ? "1px solid #F1F5F9" : "none",
//                   }}
//                 >
//                   {/* Left — name + meta */}
//                   <Box sx={{ minWidth: 0, flex: 1 }}>
//                     <Typography
//                       sx={{
//                         fontWeight: 600,
//                         color: "#1E293B",
//                         fontSize: "0.875rem",
//                         lineHeight: 1.35,
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       {item.product_name}
//                     </Typography>

//                     {/* Meta row: Qty · Weight Unit badge · ₹price/unit */}
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         flexWrap: "wrap",
//                         gap: 0.4,
//                         mt: 0.4,
//                       }}
//                     >
//                       <ScaleRoundedIcon sx={{ fontSize: 11, color: "#94A3B8" }} />
//                       <Typography
//                         component="span"
//                         sx={{ color: "#94A3B8", fontSize: "0.72rem" }}
//                       >
//                         Qty: {item.quantity}
//                       </Typography>

//                       <Typography
//                         component="span"
//                         sx={{ color: "#CBD5E1", fontSize: "0.72rem", mx: 0.3 }}
//                       >
//                         ·
//                       </Typography>

//                       {/* Weight + unit badge together */}
//                       <Typography
//                         component="span"
//                         sx={{ color: "#64748B", fontSize: "0.72rem", fontWeight: 600 }}
//                       >
//                         {item.weight}
//                       </Typography>
//                       <UnitBadge label={item.unit} />

//                       <Typography
//                         component="span"
//                         sx={{ color: "#CBD5E1", fontSize: "0.72rem", mx: 0.3 }}
//                       >
//                         ·
//                       </Typography>

//                       <Typography
//                         component="span"
//                         sx={{ color: "#94A3B8", fontSize: "0.72rem" }}
//                       >
//                         ₹{parseFloat(item.price).toFixed(2)}/unit
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {/* Right — subtotal */}
//                   <Typography
//                     sx={{
//                       fontWeight: 700,
//                       color: "#0F172A",
//                       fontSize: "0.9rem",
//                       flexShrink: 0,
//                       pt: 0.1,
//                     }}
//                   >
//                     ₹{subtotal}
//                   </Typography>
//                 </Box>
//               );
//             })}
//           </Box>

//           {/* ── Order Total — pinned below scrollable list ── */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               pt: 1.5,
//               mt: "auto",
//               borderTop: "2px solid #F1F5F9",
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//               <CurrencyRupeeRoundedIcon sx={{ fontSize: 15, color: "#64748B" }} />
//               <Typography
//                 sx={{ color: "#64748B", fontWeight: 600, fontSize: "0.85rem" }}
//               >
//                 Order Total
//               </Typography>
//             </Box>
//             <Typography
//               sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.15rem" }}
//             >
//               ₹{parseFloat(total_amount).toFixed(2)}
//             </Typography>
//           </Box>
//         </Box>
//       </Box>

//       {/* ══════════════════════════════════════════
//           3. MAP SECTION
//           ──────────────────────────────────────────
//           Full-width iframe below the info row.
//           extractMapAddress strips name + mobile before
//           passing to Google Maps — display address is
//           kept raw as-is in section 2 above.
//       ══════════════════════════════════════════ */}
//       <Divider sx={{ borderColor: "#F1F5F9" }} />

//       {/* Map header: label + Open in Maps link */}
//       <Box
//         sx={{
//           px: { xs: 2.5, md: 3.5 },
//           pt: 1.8,
//           pb: 0.8,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <SectionLabel
//           icon={<MapRoundedIcon sx={{ fontSize: 13, color: "#94A3B8" }} />}
//           text="Delivery Location"
//         />

//         {mapOpenLink && (
//           <Button
//             component="a"
//             href={mapOpenLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             size="small"
//             endIcon={<OpenInNewRoundedIcon sx={{ fontSize: "12px !important" }} />}
//             sx={{
//               fontSize: "0.75rem",
//               fontWeight: 600,
//               textTransform: "none",
//               color: "#F97316",
//               borderRadius: "8px",
//               px: 1.5,
//               py: 0.4,
//               minWidth: 0,
//               mb: 0.8,
//               "&:hover": { backgroundColor: "rgba(249,115,22,0.06)" },
//             }}
//           >
//             Open in Maps
//           </Button>
//         )}
//       </Box>

//       {/* Map iframe */}
//       <Box sx={{ height: { xs: 200, sm: 240, md: 280 } }}>
//         {mapSrc ? (
//           <iframe
//             title="Delivery Location"
//             src={mapSrc}
//             width="100%"
//             height="100%"
//             style={{ border: "none", display: "block" }}
//             loading="lazy"
//             allowFullScreen
//           />
//         ) : (
//           <Box
//             sx={{
//               height: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: "#F8FAFC",
//             }}
//           >
//             <Typography sx={{ color: "#94A3B8", fontSize: "0.875rem" }}>
//               Location unavailable
//             </Typography>
//           </Box>
//         )}
//       </Box>

//       {/* ══════════════════════════════════════════
//           4. ACTION BUTTONS
//           ──────────────────────────────────────────
//           pending_acceptance → single full-width Accept (orange gradient)
//           accepted           → Report Issue (outlined) + Reached Location (green)

//           xs  → stacked column
//           sm+ → side by side
//       ══════════════════════════════════════════ */}
//       <Divider sx={{ borderColor: "#F1F5F9" }} />

//       <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: { xs: 2, md: 2.5 } }}>
//         {isPendingAcceptance ? (
//           <Button
//             onClick={() => onAccept(order_id)}
//             fullWidth
//             variant="contained"
//             startIcon={<CheckCircleRoundedIcon fontSize="small" />}
//             sx={{
//               borderRadius: "12px",
//               background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
//               fontWeight: 700,
//               py: 1.6,
//               textTransform: "none",
//               fontSize: "0.95rem",
//               boxShadow: "0 4px 16px rgba(249,115,22,0.30)",
//               "&:hover": {
//                 background: "linear-gradient(135deg, #FB923C 0%, #F97316 100%)",
//                 boxShadow: "0 6px 22px rgba(249,115,22,0.40)",
//                 transform: "translateY(-1px)",
//               },
//               transition: "all 0.2s ease",
//             }}
//           >
//             Accept Order
//           </Button>
//         ) : (
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: { xs: "column", sm: "row" },
//               gap: 1.5,
//             }}
//           >
//             {/* Report — placeholder, API wired later */}
//             <Button
//               onClick={handleReport}
//               fullWidth
//               variant="outlined"
//               startIcon={<ReportProblemRoundedIcon fontSize="small" />}
//               sx={{
//                 borderRadius: "12px",
//                 borderColor: "#E2E8F0",
//                 color: "#64748B",
//                 fontWeight: 600,
//                 py: 1.5,
//                 textTransform: "none",
//                 fontSize: "0.9rem",
//                 "&:hover": {
//                   borderColor: "#EF4444",
//                   color: "#EF4444",
//                   backgroundColor: "rgba(239,68,68,0.04)",
//                 },
//               }}
//             >
//               Report Issue
//             </Button>

//             {/* Reached — navigates to OTP page */}
//             <Button
//               onClick={handleReached}
//               fullWidth
//               variant="contained"
//               startIcon={<CheckCircleRoundedIcon fontSize="small" />}
//               sx={{
//                 borderRadius: "12px",
//                 background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
//                 fontWeight: 700,
//                 py: 1.5,
//                 textTransform: "none",
//                 fontSize: "0.9rem",
//                 boxShadow: "0 4px 14px rgba(34,197,94,0.27)",
//                 "&:hover": {
//                   background: "linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)",
//                   boxShadow: "0 6px 22px rgba(34,197,94,0.37)",
//                   transform: "translateY(-1px)",
//                 },
//                 transition: "all 0.2s ease",
//               }}
//             >
//               Reached Location
//             </Button>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default ActiveOrderCard;











// 📁 src/webdelivery/components/orders/ActiveOrderCard.jsx

import { useState, useCallback } from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import LocalShippingRoundedIcon    from "@mui/icons-material/LocalShippingRounded";
import PersonRoundedIcon           from "@mui/icons-material/PersonRounded";
import LocationOnRoundedIcon       from "@mui/icons-material/LocationOnRounded";
import ShoppingBagRoundedIcon      from "@mui/icons-material/ShoppingBagRounded";
import CurrencyRupeeRoundedIcon    from "@mui/icons-material/CurrencyRupeeRounded";
import MapRoundedIcon              from "@mui/icons-material/MapRounded";
import CheckCircleRoundedIcon      from "@mui/icons-material/CheckCircleRounded";
import ReportProblemRoundedIcon    from "@mui/icons-material/ReportProblemRounded";
import HowToRegRoundedIcon         from "@mui/icons-material/HowToRegRounded";
import OpenInNewRoundedIcon        from "@mui/icons-material/OpenInNewRounded";
import ScaleRoundedIcon            from "@mui/icons-material/ScaleRounded";
import WarningAmberRoundedIcon     from "@mui/icons-material/WarningAmberRounded";
import { useNavigate } from "react-router-dom";
import deliveryAxios from "../../api/Axios";

// ─────────────────────────────────────────────────────────────────────────────
// extractMapAddress — strips name (index 0, letters-only) and mobile (10 digits)
// ─────────────────────────────────────────────────────────────────────────────
const extractMapAddress = (raw = "") =>
  raw
    .split(",")
    .map((p) => p.trim())
    .filter((p, i) => {
      if (i === 0 && /^[a-zA-Z\s]+$/.test(p)) return false;
      if (/^\d{10}$/.test(p)) return false;
      return true;
    })
    .join(", ");

// ─────────────────────────────────────────────────────────────────────────────
// SectionLabel — tiny icon + uppercase muted label
// ─────────────────────────────────────────────────────────────────────────────
const SectionLabel = ({ icon, text }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.7, mb: 1.2 }}>
    {icon}
    <Typography
      sx={{
        fontSize: "0.62rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#94A3B8",
      }}
    >
      {text}
    </Typography>
  </Box>
);

// ─────────────────────────────────────────────────────────────────────────────
// UnitBadge — inline pill for unit type
// ─────────────────────────────────────────────────────────────────────────────
const UnitBadge = ({ label }) => (
  <Box
    component="span"
    sx={{
      display: "inline-flex",
      alignItems: "center",
      color: "#94A3B8",
      fontSize: "0.68rem",
      fontWeight: 500,
      letterSpacing: "0.04em",
      lineHeight: 1.5,
      ml: 0.5,
    }}
  >
    {label}
  </Box>
);

// ─────────────────────────────────────────────────────────────────────────────
// ActiveOrderCard
//
// Props:
//   order           — full ORDER_CONFIRMED payload from WebSocket
//   onAccept        — fn(order_id) — sends Accept_Order via WS
//   onReportSuccess — fn() — called after report API succeeds
//                     → CurrentOrdersPage clears order + shows snackbar
// ─────────────────────────────────────────────────────────────────────────────
const ActiveOrderCard = ({ order, onAccept, onReportSuccess }) => {
  const navigate = useNavigate();

  const {
    order_id,
    status,
    customer_name,
    delivery_address,
    items = [],
    total_amount,
  } = order;

  const isPendingAcceptance = status === "pending_acceptance";

  const cleanAddress = extractMapAddress(delivery_address);
  const mapSrc = cleanAddress
    ? `https://maps.google.com/maps?q=${encodeURIComponent(cleanAddress)}&output=embed&zoom=15`
    : "";
  const mapOpenLink = cleanAddress
    ? `https://www.google.com/maps/search/${encodeURIComponent(cleanAddress)}`
    : "";

  // ── Report dialog state ──
  const [dialogOpen,     setDialogOpen]     = useState(false);
  const [reasons,        setReasons]        = useState([]);
  const [loadingReasons, setLoadingReasons] = useState(false);
  const [reasonsError,   setReasonsError]   = useState("");
  const [submitting,     setSubmitting]     = useState(false);
  const [submitError,    setSubmitError]    = useState("");

  // ── Open dialog + fetch reasons ──
  const handleReport = useCallback(async () => {
    setDialogOpen(true);
    setReasons([]);
    setReasonsError("");
    setSubmitError("");
    setLoadingReasons(true);

    try {
      // Interceptor unwraps response.data.data → returns array directly
      const data = await deliveryAxios.post("adm/fetch_all_order_return_reason");
      // data is already the array because interceptor does response.data?.data ?? response.data
      setReasons(Array.isArray(data) ? data : []);
    } catch (err) {
      setReasonsError(err.message || "Failed to load reasons. Please try again.");
    } finally {
      setLoadingReasons(false);
    }
  }, []);

  // ── Reason selected → POST report ──
  const handleReasonSelect = useCallback(
    async (reasonId) => {
      setSubmitError("");
      setSubmitting(true);

      // deliveryboy_id from localStorage
      const deliveryUser = JSON.parse(localStorage.getItem("delivery_user") || "{}");
      const deliveryboyId = deliveryUser.user_id;

      try {
        await deliveryAxios.post("adm/report_delivery_failure", {
          order_id:          order_id,
          deliveryboy_id:    deliveryboyId,
          delivery_stage_id: reasonId,
        });

        // Success → close dialog, let parent clear order + show snackbar
        setDialogOpen(false);
        onReportSuccess();
      } catch (err) {
        setSubmitError(err.message || "Failed to submit report. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [order_id, onReportSuccess]
  );

  const handleDialogClose = () => {
    if (submitting) return; // prevent close while submitting
    setDialogOpen(false);
    setReasons([]);
    setReasonsError("");
    setSubmitError("");
  };

  const handleReached = () => navigate("/delivery/otp", { state: { order_id } });

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          boxShadow: "0 2px 24px rgba(0,0,0,0.07)",
        }}
      >
        {/* ══ 1. HEADER ══ */}
        <Box
          sx={{
            px: { xs: 2.5, md: 3.5 },
            py: { xs: 2, md: 2.5 },
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "13px",
                background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 14px rgba(249,115,22,0.38)",
              }}
            >
              <LocalShippingRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  lineHeight: 1.2,
                }}
              >
                Order #{order_id}
              </Typography>
              <Typography sx={{ color: "#64748B", fontSize: "0.72rem", mt: 0.25 }}>
                {isPendingAcceptance ? "Awaiting your acceptance" : "Active Delivery"}
              </Typography>
            </Box>
          </Box>

          {isPendingAcceptance ? (
            <Chip
              label="Pending Acceptance"
              size="small"
              sx={{
                backgroundColor: "rgba(249,115,22,0.15)",
                color: "#FB923C",
                fontWeight: 700,
                fontSize: "0.72rem",
                border: "1px solid rgba(249,115,22,0.30)",
                height: 26,
              }}
            />
          ) : (
            <Chip
              label="Accepted"
              size="small"
              icon={
                <HowToRegRoundedIcon
                  sx={{ fontSize: "14px !important", color: "#16A34A !important" }}
                />
              }
              sx={{
                backgroundColor: "rgba(34,197,94,0.12)",
                color: "#16A34A",
                fontWeight: 700,
                fontSize: "0.72rem",
                border: "1px solid rgba(34,197,94,0.25)",
                height: 26,
                "& .MuiChip-icon": { ml: "6px" },
              }}
            />
          )}
        </Box>

        {/* ══ 2. INFO ROW ══ */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1px 3fr" },
            alignItems: "stretch",
          }}
        >
          {/* Left: Customer + Address */}
          <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: { xs: 2.5, md: 3 } }}>
            <Box sx={{ mb: 2.5 }}>
              <SectionLabel
                icon={<PersonRoundedIcon sx={{ fontSize: 13, color: "#94A3B8" }} />}
                text="Customer"
              />
              <Typography
                sx={{ fontWeight: 700, color: "#0F172A", fontSize: "1rem", lineHeight: 1.3 }}
              >
                {customer_name}
              </Typography>
            </Box>

            <Box>
              <SectionLabel
                icon={<LocationOnRoundedIcon sx={{ fontSize: 13, color: "#94A3B8" }} />}
                text="Delivery Address"
              />
              <Typography
                sx={{
                  color: "#374151",
                  fontSize: "0.865rem",
                  fontWeight: 500,
                  lineHeight: 1.75,
                  wordBreak: "break-word",
                }}
              >
                {delivery_address}
              </Typography>
            </Box>
          </Box>

          {/* Vertical divider (desktop) */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              backgroundColor: "#F1F5F9",
              alignSelf: "stretch",
            }}
          />

          {/* Right: Items + Total */}
          <Box
            sx={{
              px: { xs: 2.5, md: 3.5 },
              py: { xs: 2.5, md: 3 },
              borderTop: { xs: "1px solid #F1F5F9", md: "none" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SectionLabel
              icon={<ShoppingBagRoundedIcon sx={{ fontSize: 13, color: "#94A3B8" }} />}
              text={`Items (${items.length})`}
            />

            <Box
              sx={{
                maxHeight: 240,
                overflowY: "auto",
                "&::-webkit-scrollbar":       { width: 3 },
                "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
                "&::-webkit-scrollbar-thumb": { bgcolor: "#E2E8F0", borderRadius: 2 },
              }}
            >
              {items.map((item, i) => {
                const subtotal = (item.quantity * parseFloat(item.price)).toFixed(2);
                return (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 2,
                      py: 1.4,
                      borderBottom: i < items.length - 1 ? "1px solid #F1F5F9" : "none",
                    }}
                  >
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "#1E293B",
                          fontSize: "0.875rem",
                          lineHeight: 1.35,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.product_name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: 0.4,
                          mt: 0.4,
                        }}
                      >
                        <ScaleRoundedIcon sx={{ fontSize: 11, color: "#94A3B8" }} />
                        <Typography component="span" sx={{ color: "#94A3B8", fontSize: "0.72rem" }}>
                          Qty: {item.quantity}
                        </Typography>
                        <Typography component="span" sx={{ color: "#CBD5E1", fontSize: "0.72rem", mx: 0.3 }}>
                          ·
                        </Typography>
                        <Typography component="span" sx={{ color: "#64748B", fontSize: "0.72rem", fontWeight: 600 }}>
                          {item.weight}
                        </Typography>
                        <UnitBadge label={item.unit} />
                        <Typography component="span" sx={{ color: "#CBD5E1", fontSize: "0.72rem", mx: 0.3 }}>
                          ·
                        </Typography>
                        <Typography component="span" sx={{ color: "#94A3B8", fontSize: "0.72rem" }}>
                          ₹{parseFloat(item.price).toFixed(2)}/unit
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.9rem", flexShrink: 0, pt: 0.1 }}
                    >
                      ₹{subtotal}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {/* Order Total */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pt: 1.5,
                mt: "auto",
                borderTop: "2px solid #F1F5F9",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CurrencyRupeeRoundedIcon sx={{ fontSize: 15, color: "#64748B" }} />
                <Typography sx={{ color: "#64748B", fontWeight: 600, fontSize: "0.85rem" }}>
                  Order Total
                </Typography>
              </Box>
              <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.15rem" }}>
                ₹{parseFloat(total_amount).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ══ 3. MAP SECTION ══ */}
        <Divider sx={{ borderColor: "#F1F5F9" }} />

        <Box
          sx={{
            px: { xs: 2.5, md: 3.5 },
            pt: 1.8,
            pb: 0.8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <SectionLabel
            icon={<MapRoundedIcon sx={{ fontSize: 13, color: "#94A3B8" }} />}
            text="Delivery Location"
          />
          {mapOpenLink && (
            <Button
              component="a"
              href={mapOpenLink}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              endIcon={<OpenInNewRoundedIcon sx={{ fontSize: "12px !important" }} />}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "none",
                color: "#F97316",
                borderRadius: "8px",
                px: 1.5,
                py: 0.4,
                minWidth: 0,
                mb: 0.8,
                "&:hover": { backgroundColor: "rgba(249,115,22,0.06)" },
              }}
            >
              Open in Maps
            </Button>
          )}
        </Box>

        <Box sx={{ height: { xs: 200, sm: 240, md: 280 } }}>
          {mapSrc ? (
            <iframe
              title="Delivery Location"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: "none", display: "block" }}
              loading="lazy"
              allowFullScreen
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F8FAFC",
              }}
            >
              <Typography sx={{ color: "#94A3B8", fontSize: "0.875rem" }}>
                Location unavailable
              </Typography>
            </Box>
          )}
        </Box>

        {/* ══ 4. ACTION BUTTONS ══ */}
        <Divider sx={{ borderColor: "#F1F5F9" }} />

        <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: { xs: 2, md: 2.5 } }}>
          {isPendingAcceptance ? (
            <Button
              onClick={() => onAccept(order_id)}
              fullWidth
              variant="contained"
              startIcon={<CheckCircleRoundedIcon fontSize="small" />}
              sx={{
                borderRadius: "12px",
                background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                fontWeight: 700,
                py: 1.6,
                textTransform: "none",
                fontSize: "0.95rem",
                boxShadow: "0 4px 16px rgba(249,115,22,0.30)",
                "&:hover": {
                  background: "linear-gradient(135deg, #FB923C 0%, #F97316 100%)",
                  boxShadow: "0 6px 22px rgba(249,115,22,0.40)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Accept Order
            </Button>
          ) : (
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5 }}>
              {/* Report Issue → opens dialog */}
              <Button
                onClick={handleReport}
                fullWidth
                variant="outlined"
                startIcon={<ReportProblemRoundedIcon fontSize="small" />}
                sx={{
                  borderRadius: "12px",
                  borderColor: "#E2E8F0",
                  color: "#64748B",
                  fontWeight: 600,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "0.9rem",
                  "&:hover": {
                    borderColor: "#EF4444",
                    color: "#EF4444",
                    backgroundColor: "rgba(239,68,68,0.04)",
                  },
                }}
              >
                Report Issue
              </Button>

              {/* Reached Location → OTP page */}
              <Button
                onClick={handleReached}
                fullWidth
                variant="contained"
                startIcon={<CheckCircleRoundedIcon fontSize="small" />}
                sx={{
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
                  fontWeight: 700,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "0.9rem",
                  boxShadow: "0 4px 14px rgba(34,197,94,0.27)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)",
                    boxShadow: "0 6px 22px rgba(34,197,94,0.37)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                Reached Location
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* ══════════════════════════════════════════
          REPORT ISSUE DIALOG
          ──────────────────────────────────────────
          Opens when Report Issue is clicked.
          Fetches reasons from API.
          Click a reason → POST report_delivery_failure.
          On success → dialog closes, parent clears order.
          On error   → inline error shown inside dialog.
      ══════════════════════════════════════════ */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            overflow: "hidden",
          },
        }}
      >
        {/* Dialog Header */}
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            px: 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              backgroundColor: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <WarningAmberRoundedIcon sx={{ color: "#EF4444", fontSize: 20 }} />
          </Box>
          <Box>
            <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1rem", lineHeight: 1.2 }}>
              Report Issue
            </Typography>
            <Typography sx={{ color: "#64748B", fontSize: "0.72rem", mt: 0.2 }}>
              Select a reason for Order #{order_id}
            </Typography>
          </Box>
        </DialogTitle>

        {/* Dialog Content */}
        <DialogContent sx={{ px: 2.5, pt: 2.5, pb: 1 }}>

          {/* Loading */}
          {loadingReasons && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={32} sx={{ color: "#F97316" }} />
            </Box>
          )}

          {/* Fetch error */}
          {!loadingReasons && reasonsError && (
            <Box
              sx={{
                backgroundColor: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "12px",
                px: 2,
                py: 2,
                mb: 1,
              }}
            >
              <Typography sx={{ color: "#EF4444", fontSize: "0.875rem", fontWeight: 600 }}>
                {reasonsError}
              </Typography>
            </Box>
          )}

          {/* Reasons list */}
          {!loadingReasons && !reasonsError && reasons.length > 0 && (
            <>
              <Typography sx={{ color: "#64748B", fontSize: "0.8rem", mb: 1.5, px: 0.5 }}>
                Tap a reason to submit. This will mark the order as failed.
              </Typography>

              <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
                {reasons.map((reason) => (
                  <ListItemButton
                    key={reason.id}
                    disabled={submitting}
                    onClick={() => handleReasonSelect(reason.id)}
                    sx={{
                      borderRadius: "12px",
                      border: "1px solid #E2E8F0",
                      px: 2,
                      py: 1.4,
                      transition: "all 0.18s ease",
                      "&:hover": {
                        backgroundColor: "rgba(239,68,68,0.05)",
                        borderColor: "#EF4444",
                        "& .reason-text": { color: "#EF4444" },
                      },
                      "&.Mui-disabled": {
                        opacity: 0.5,
                      },
                    }}
                  >
                    {/* Show spinner next to the item being submitted */}
                    <ListItemText
                      primary={
                        <Typography
                          className="reason-text"
                          sx={{
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            color: "#1E293B",
                            transition: "color 0.18s ease",
                            textTransform: "capitalize",
                          }}
                        >
                          {reason.name}
                        </Typography>
                      }
                    />
                    {submitting && (
                      <CircularProgress size={16} sx={{ color: "#EF4444", ml: 1, flexShrink: 0 }} />
                    )}
                  </ListItemButton>
                ))}
              </List>

              {/* Submit error (shown below list) */}
              {submitError && (
                <Box
                  sx={{
                    mt: 2,
                    backgroundColor: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: "10px",
                    px: 2,
                    py: 1.5,
                  }}
                >
                  <Typography sx={{ color: "#EF4444", fontSize: "0.825rem", fontWeight: 600 }}>
                    {submitError}
                  </Typography>
                </Box>
              )}
            </>
          )}
        </DialogContent>

        {/* Dialog Footer */}
        <DialogActions sx={{ px: 2.5, pb: 2.5, pt: 1.5 }}>
          <Button
            onClick={handleDialogClose}
            disabled={submitting}
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: "10px",
              borderColor: "#E2E8F0",
              color: "#64748B",
              fontWeight: 600,
              py: 1.2,
              textTransform: "none",
              fontSize: "0.875rem",
              "&:hover": {
                borderColor: "#94A3B8",
                backgroundColor: "rgba(0,0,0,0.02)",
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActiveOrderCard;