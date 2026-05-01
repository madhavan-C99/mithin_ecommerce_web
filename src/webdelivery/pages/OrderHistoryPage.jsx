// // 📁 src/webdelivery/pages/OrderHistoryPage.jsx

// import { useState } from "react";
// import {
//   Box,
//   Typography,
//   Alert,
//   Skeleton,
//   Paper,
//   Chip,
//   Divider,
//   Collapse,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import HistoryRoundedIcon       from "@mui/icons-material/HistoryRounded";
// import InboxRoundedIcon         from "@mui/icons-material/InboxRounded";
// import CheckCircleRoundedIcon   from "@mui/icons-material/CheckCircleRounded";
// import ShoppingBagRoundedIcon   from "@mui/icons-material/ShoppingBagRounded";
// import AccessTimeRoundedIcon    from "@mui/icons-material/AccessTimeRounded";
// import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
// import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
// import KeyboardArrowUpRoundedIcon   from "@mui/icons-material/KeyboardArrowUpRounded";
// import ScaleRoundedIcon         from "@mui/icons-material/ScaleRounded";
// import Inventory2RoundedIcon    from "@mui/icons-material/Inventory2Rounded";
// import TagRoundedIcon           from "@mui/icons-material/TagRounded";

// import HistoryFilter   from "../components/history/HistoryFilter";
// import useOrderHistory from "../hooks/useOrderHistory";

// /* ─────────────────────────────────────────────────────────────
//    HELPERS
// ───────────────────────────────────────────────────────────── */

// /** Format ISO date string → "17 Apr 2026, 04:31 PM" */
// const formatDate = (isoString) => {
//   if (!isoString) return "—";
//   return new Date(isoString).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// /** Rupee formatted string */
// const rupee = (val) => `₹${Number(val ?? 0).toFixed(2)}`;

// /* ─────────────────────────────────────────────────────────────
//    SKELETON
// ───────────────────────────────────────────────────────────── */
// const SkeletonRow = () => (
//   <Box sx={{ px: { xs: 2, md: 3 }, py: 2, display: "flex", alignItems: "center", gap: 2 }}>
//     <Skeleton variant="rounded" width={38} height={38} sx={{ borderRadius: "10px", flexShrink: 0 }} />
//     <Box sx={{ flex: 1 }}>
//       <Skeleton variant="text" width={110} height={20} />
//       <Skeleton variant="text" width={150} height={15} />
//     </Box>
//     <Skeleton variant="text" width={70}  height={20} sx={{ display: { xs: "none", sm: "block" } }} />
//     <Skeleton variant="rounded" width={90} height={26} sx={{ borderRadius: "20px", display: { xs: "none", md: "block" } }} />
//     <Skeleton variant="circular" width={28} height={28} />
//   </Box>
// );

// /* ─────────────────────────────────────────────────────────────
//    EMPTY STATE
// ───────────────────────────────────────────────────────────── */
// const EmptyState = ({ isFiltered }) => (
//   <Paper
//     elevation={0}
//     sx={{
//       borderRadius: "14px",
//       border: "1px solid #E2E8F0",
//       py: { xs: 6, md: 10 },
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       backgroundColor: "#FAFBFC",
//     }}
//   >
//     <Box
//       sx={{
//         width: 64, height: 64,
//         borderRadius: "18px",
//         backgroundColor: "rgba(249,115,22,0.07)",
//         border: "1px solid rgba(249,115,22,0.15)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         mb: 2,
//       }}
//     >
//       <InboxRoundedIcon sx={{ color: "#F97316", fontSize: 30 }} />
//     </Box>
//     <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem", mb: 0.5 }}>
//       {isFiltered ? "No orders in this date range" : "No delivery history yet"}
//     </Typography>
//     <Typography sx={{ color: "#94A3B8", fontSize: "0.82rem", textAlign: "center", maxWidth: 260 }}>
//       {isFiltered
//         ? "Try adjusting or clearing the date filter."
//         : "Completed orders will appear here once you start delivering."}
//     </Typography>
//   </Paper>
// );

// /* ─────────────────────────────────────────────────────────────
//    ITEM ROW — inside the expanded panel
//    Works for both desktop (table row) and mobile (card row)
// ───────────────────────────────────────────────────────────── */

// /** Desktop: renders as a <TableRow> */
// const ItemTableRow = ({ item, index }) => (
//   <TableRow
//     sx={{
//       "&:last-child td": { borderBottom: 0 },
//       "&:hover": { backgroundColor: "rgba(249,115,22,0.03)" },
//       transition: "background 0.15s",
//     }}
//   >
//     {/* # */}
//     <TableCell sx={{ py: 1.25, pl: 0, fontSize: "0.75rem", color: "#94A3B8", width: 28, fontWeight: 600 }}>
//       {index + 1}
//     </TableCell>

//     {/* Product */}
//     <TableCell sx={{ py: 1.25 }}>
//       <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#0F172A" }}>
//         {/* product_name will slot in here once API provides it */}
//         {item.product_name ?? `Product #${item.product_id}`}
//       </Typography>
//       <Typography sx={{ fontSize: "0.68rem", color: "#94A3B8", mt: 0.2 }}>
//         Item ID: {item.id}
//       </Typography>
//     </TableCell>

//     {/* Weight */}
//     <TableCell sx={{ py: 1.25, fontSize: "0.8rem", color: "#374151" }}>
//       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//         <ScaleRoundedIcon sx={{ fontSize: 13, color: "#94A3B8" }} />
//         {item.weight} kg
//       </Box>
//     </TableCell>

//     {/* Qty */}
//     <TableCell sx={{ py: 1.25, fontSize: "0.8rem", color: "#374151", textAlign: "center" }}>
//       ×{item.quantity}
//     </TableCell>

//     {/* Unit Price */}
//     <TableCell sx={{ py: 1.25, fontSize: "0.8rem", color: "#374151", textAlign: "right" }}>
//       {rupee(item.unit_price)}
//     </TableCell>

//     {/* Total Price */}
//     <TableCell sx={{ py: 1.25, textAlign: "right" }}>
//       <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.85rem" }}>
//         {rupee(item.total_price)}
//       </Typography>
//     </TableCell>
//   </TableRow>
// );

// /** Mobile: renders as a small summary card per item */
// const ItemMobileCard = ({ item, index }) => (
//   <Box
//     sx={{
//       display: "flex",
//       alignItems: "flex-start",
//       justifyContent: "space-between",
//       gap: 1,
//       px: 1.5,
//       py: 1.25,
//       borderRadius: "10px",
//       backgroundColor: "#FFFFFF",
//       border: "1px solid #E2E8F0",
//       mb: 1,
//       "&:last-child": { mb: 0 },
//     }}
//   >
//     {/* Left: serial + product */}
//     <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, flex: 1, minWidth: 0 }}>
//       <Box
//         sx={{
//           width: 22, height: 22,
//           borderRadius: "6px",
//           backgroundColor: "rgba(249,115,22,0.08)",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           flexShrink: 0, mt: 0.2,
//         }}
//       >
//         <Typography sx={{ fontSize: "0.62rem", fontWeight: 800, color: "#F97316" }}>
//           {index + 1}
//         </Typography>
//       </Box>
//       <Box sx={{ minWidth: 0 }}>
//         <Typography
//           sx={{
//             fontSize: "0.82rem", fontWeight: 600, color: "#0F172A",
//             whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
//           }}
//         >
//           {item.product_name ?? `Product #${item.product_id}`}
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 0.4, flexWrap: "wrap" }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
//             <ScaleRoundedIcon sx={{ fontSize: 11, color: "#94A3B8" }} />
//             <Typography sx={{ fontSize: "0.68rem", color: "#64748B" }}>{item.weight} kg</Typography>
//           </Box>
//           <Typography sx={{ fontSize: "0.68rem", color: "#64748B" }}>Qty: ×{item.quantity}</Typography>
//           <Typography sx={{ fontSize: "0.68rem", color: "#94A3B8" }}>
//             Unit: {rupee(item.unit_price)}
//           </Typography>
//         </Box>
//       </Box>
//     </Box>

//     {/* Right: total price */}
//     <Box sx={{ flexShrink: 0, textAlign: "right" }}>
//       <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "0.88rem" }}>
//         {rupee(item.total_price)}
//       </Typography>
//       <Typography sx={{ fontSize: "0.62rem", color: "#94A3B8" }}>ID: {item.id}</Typography>
//     </Box>
//   </Box>
// );

// /* ─────────────────────────────────────────────────────────────
//    EXPANDED PANEL — shown when a row is open
// ───────────────────────────────────────────────────────────── */
// const ExpandedPanel = ({ order }) => {
//   const items = order.items ?? [];

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#F8FAFC",
//         borderTop: "1px dashed #E2E8F0",
//         px: { xs: 2, md: 3 },
//         py: 2,
//       }}
//     >
//       {/* Panel title */}
//       <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.75 }}>
//         <Inventory2RoundedIcon sx={{ fontSize: 15, color: "#F97316" }} />
//         <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", letterSpacing: "0.06em", textTransform: "uppercase" }}>
//           Order Items — {items.length} item{items.length !== 1 ? "s" : ""}
//         </Typography>
//       </Box>

//       {/* ── DESKTOP: Table ── */}
//       <Box sx={{ display: { xs: "none", md: "block" } }}>
//         <Table
//           size="small"
//           sx={{
//             "& .MuiTableCell-root": { borderColor: "#E2E8F0" },
//           }}
//         >
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#EFF3F8" }}>
//               <TableCell sx={{ py: 1, pl: 0, fontSize: "0.65rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase", width: 28 }}>
//                 #
//               </TableCell>
//               <TableCell sx={{ py: 1, fontSize: "0.65rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
//                 Product
//               </TableCell>
//               <TableCell sx={{ py: 1, fontSize: "0.65rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
//                 Weight
//               </TableCell>
//               <TableCell sx={{ py: 1, fontSize: "0.65rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "center" }}>
//                 Qty
//               </TableCell>
//               <TableCell sx={{ py: 1, fontSize: "0.65rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "right" }}>
//                 Unit Price
//               </TableCell>
//               <TableCell sx={{ py: 1, fontSize: "0.65rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "right" }}>
//                 Total
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {items.map((item, idx) => (
//               <ItemTableRow key={item.id} item={item} index={idx} />
//             ))}
//           </TableBody>
//         </Table>
//       </Box>

//       {/* ── MOBILE: Cards ── */}
//       <Box sx={{ display: { xs: "block", md: "none" } }}>
//         {items.map((item, idx) => (
//           <ItemMobileCard key={item.id} item={item} index={idx} />
//         ))}
//       </Box>

//       {/* ── Order total footer ── */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "flex-end",
//           mt: 2,
//           pt: 1.5,
//           borderTop: "1px solid #E2E8F0",
//           gap: 1,
//         }}
//       >
//         <Typography sx={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 500 }}>
//           Order Total
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
//           <CurrencyRupeeRoundedIcon sx={{ fontSize: 15, color: "#0F172A" }} />
//           <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1rem" }}>
//             {Number(order.total_amount ?? 0).toFixed(2)}
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// /* ─────────────────────────────────────────────────────────────
//    ORDER ROW — collapsed summary + toggle
// ───────────────────────────────────────────────────────────── */
// const OrderRow = ({ order, isOpen, onToggle, isLast }) => {
//   const items     = order.items ?? [];
//   const firstItem = items[0];
//   const extraCount = items.length - 1;

//   return (
//     <>
//       {/* ── DESKTOP collapsed row ── */}
//       <Box
//         onClick={onToggle}
//         sx={{
//           display: { xs: "none", md: "flex" },
//           alignItems: "center",
//           gap: 3,
//           px: 3,
//           py: 1.75,
//           cursor: "pointer",
//           transition: "background 0.15s",
//           backgroundColor: isOpen ? "rgba(249,115,22,0.03)" : "transparent",
//           "&:hover": { backgroundColor: "rgba(249,115,22,0.04)" },
//         }}
//       >
//         {/* Icon + Order ID + Date */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 220 }}>
//           <Box
//             sx={{
//               width: 38, height: 38,
//               borderRadius: "10px",
//               backgroundColor: isOpen ? "rgba(249,115,22,0.12)" : "rgba(249,115,22,0.07)",
//               border: `1px solid ${isOpen ? "rgba(249,115,22,0.25)" : "rgba(249,115,22,0.12)"}`,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               flexShrink: 0,
//               transition: "all 0.2s",
//             }}
//           >
//             <ShoppingBagRoundedIcon sx={{ color: "#F97316", fontSize: 18 }} />
//           </Box>
//           <Box>
//             <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.875rem" }}>
//               Order #{order.order_id}
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, mt: 0.2 }}>
//               <AccessTimeRoundedIcon sx={{ fontSize: 11, color: "#94A3B8" }} />
//               <Typography sx={{ fontSize: "0.7rem", color: "#94A3B8" }}>
//                 {formatDate(order.created_at)}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>

//         {/* Item preview */}
//         <Box sx={{ flex: 1, minWidth: 0 }}>
//           {firstItem ? (
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               {/* <Typography
//                 sx={{
//                   fontSize: "0.82rem", color: "#374151", fontWeight: 500,
//                   whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
//                   maxWidth: 200,
//                 }}
//               >
//                 {firstItem.product_name ?? `Product #${firstItem.product_id}`}
//               </Typography>
//               <Typography sx={{ fontSize: "0.72rem", color: "#94A3B8", flexShrink: 0 }}>
//                 ×{firstItem.quantity}
//               </Typography>
//               {extraCount > 0 && (
//                 <Chip
//                   label={`+${extraCount} more`}
//                   size="small"
//                   sx={{
//                     height: 20, fontSize: "0.65rem", fontWeight: 600,
//                     backgroundColor: "#F1F5F9", color: "#64748B", flexShrink: 0,
//                   }} */}
//                   {/* />
//               )} */}

//                   {/* // AFTER */}
// <Typography
//   sx={{
//     fontSize: { md: "0.74rem", lg: "0.82rem" }, color: "#374151", fontWeight: 500,
//     whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
//     maxWidth: { md: 140, lg: 200 },
//   }}
// >
//   {firstItem.product_name ?? `Product #${firstItem.product_id}`}
// </Typography>
// <Typography sx={{ fontSize: { md: "0.66rem", lg: "0.72rem" }, color: "#94A3B8", flexShrink: 0 }}>
//   ×{firstItem.quantity}
// </Typography>
// {extraCount > 0 && (
//   <Chip
//     label={`+${extraCount} more`}
//     size="small"
//     sx={{
//       height: 20, fontSize: { md: "0.6rem", lg: "0.65rem" }, fontWeight: 600,
//       backgroundColor: "#F1F5F9", color: "#64748B", flexShrink: 0,
//     }}
//   />
// )}


                
//             </Box>
//           ) : (
//             <Typography sx={{ fontSize: "0.82rem", color: "#94A3B8" }}>No items</Typography>
//           )}
//           <Typography sx={{ fontSize: "0.68rem", color: "#94A3B8", mt: 0.2 }}>
//             {items.length} item{items.length !== 1 ? "s" : ""}
//           </Typography>
//         </Box>

//         {/* Total */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, minWidth: 90, justifyContent: "flex-end" }}>
//           <CurrencyRupeeRoundedIcon sx={{ fontSize: 14, color: "#374151" }} />
//           <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.9rem" }}>
//             {Number(order.total_amount ?? 0).toFixed(2)}
//           </Typography>
//         </Box>

//         {/* Status chip */}
//         <Box sx={{ minWidth: 90, display: "flex", justifyContent: "flex-end" }}>
//           <Chip
//             icon={<CheckCircleRoundedIcon sx={{ fontSize: "13px !important", color: "#16A34A !important" }} />}
//             label="Delivered"
//             size="small"
//             sx={{
//               backgroundColor: "rgba(22,163,74,0.08)", color: "#15803D",
//               fontWeight: 600, fontSize: "0.72rem", height: 26,
//               border: "1px solid rgba(22,163,74,0.2)",
//               "& .MuiChip-icon": { ml: "6px" },
//             }}
//           />
//         </Box>

//         {/* Expand toggle */}
//         <Box
//           sx={{
//             width: 28, height: 28,
//             borderRadius: "8px",
//             border: "1px solid",
//             borderColor: isOpen ? "rgba(249,115,22,0.3)" : "#E2E8F0",
//             backgroundColor: isOpen ? "rgba(249,115,22,0.06)" : "transparent",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             transition: "all 0.2s",
//             flexShrink: 0,
//           }}
//         >
//           {isOpen
//             ? <KeyboardArrowUpRoundedIcon   sx={{ fontSize: 18, color: "#F97316" }} />
//             : <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18, color: "#94A3B8" }} />
//           }
//         </Box>
//       </Box>

//       {/* ── MOBILE collapsed row ── */}
//       <Box
//         onClick={onToggle}
//         sx={{
//           display: { xs: "flex", md: "none" },
//           alignItems: "center",
//           gap: 1.5,
//           px: 2,
//           py: 1.75,
//           cursor: "pointer",
//           backgroundColor: isOpen ? "rgba(249,115,22,0.03)" : "transparent",
//           transition: "background 0.15s",
//         }}
//       >
//         {/* Icon */}
//         <Box
//           sx={{
//             width: 36, height: 36,
//             borderRadius: "10px",
//             backgroundColor: isOpen ? "rgba(249,115,22,0.12)" : "rgba(249,115,22,0.07)",
//             border: `1px solid ${isOpen ? "rgba(249,115,22,0.25)" : "rgba(249,115,22,0.12)"}`,
//             display: "flex", alignItems: "center", justifyContent: "center",
//             flexShrink: 0, transition: "all 0.2s",
//           }}
//         >
//           <ShoppingBagRoundedIcon sx={{ color: "#F97316", fontSize: 17 }} />
//         </Box>

//         {/* Order ID + date + item count */}
//         <Box sx={{ flex: 1, minWidth: 0 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.875rem" }}>
//               Order #{order.order_id}
//             </Typography>
//             <Chip
//               icon={<CheckCircleRoundedIcon sx={{ fontSize: "11px !important", color: "#16A34A !important" }} />}
//               label="Delivered"
//               size="small"
//               sx={{
//                 height: 20, fontSize: "0.62rem", fontWeight: 600,
//                 backgroundColor: "rgba(22,163,74,0.08)", color: "#15803D",
//                 border: "1px solid rgba(22,163,74,0.2)",
//                 "& .MuiChip-icon": { ml: "5px" },
//               }}
//             />
//           </Box>
//           {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.3 }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
//               <AccessTimeRoundedIcon sx={{ fontSize: 10, color: "#94A3B8" }} />
//               <Typography sx={{ fontSize: "0.68rem", color: "#94A3B8" }}>
//                 {formatDate(order.created_at)}
//               </Typography>
//             </Box>
//             <Typography sx={{ fontSize: "0.68rem", color: "#94A3B8" }}>
//               · {items.length} item{items.length !== 1 ? "s" : ""}
//             </Typography>
//           </Box> */}

//           {/* // AFTER */}
// <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.3, flexWrap: "nowrap" }}>
//   <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, flexShrink: 0 }}>
//     <AccessTimeRoundedIcon sx={{ fontSize: 10, color: "#94A3B8" }} />
//     <Typography sx={{ fontSize: { xs: "0.6rem", sm: "0.68rem" }, color: "#94A3B8", whiteSpace: "nowrap" }}>
//       {formatDate(order.created_at)}
//     </Typography>
//   </Box>
//   <Typography sx={{ fontSize: { xs: "0.6rem", sm: "0.68rem" }, color: "#94A3B8", whiteSpace: "nowrap", flexShrink: 0 }}>
//     · {items.length} item{items.length !== 1 ? "s" : ""}
//   </Typography>
// </Box>


//         </Box>

//         {/* Total + toggle */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
//             <CurrencyRupeeRoundedIcon sx={{ fontSize: 13, color: "#0F172A" }} />
//             <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "0.9rem" }}>
//               {Number(order.total_amount ?? 0).toFixed(2)}
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               width: 26, height: 26, borderRadius: "7px",
//               border: "1px solid",
//               borderColor: isOpen ? "rgba(249,115,22,0.3)" : "#E2E8F0",
//               backgroundColor: isOpen ? "rgba(249,115,22,0.06)" : "transparent",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               transition: "all 0.2s",
//             }}
//           >
//             {isOpen
//               ? <KeyboardArrowUpRoundedIcon   sx={{ fontSize: 16, color: "#F97316" }} />
//               : <KeyboardArrowDownRoundedIcon sx={{ fontSize: 16, color: "#94A3B8" }} />
//             }
//           </Box>
//         </Box>
//       </Box>

//       {/* ── Expanded panel (shared desktop + mobile) ── */}
//       <Collapse in={isOpen} timeout={250} unmountOnExit>
//         <ExpandedPanel order={order} />
//       </Collapse>

//       {!isLast && <Divider sx={{ borderColor: "#F1F5F9" }} />}
//     </>
//   );
// };

// /* ─────────────────────────────────────────────────────────────
//    PAGE
// ───────────────────────────────────────────────────────────── */
// const OrderHistoryPage = () => {
//   const {
//     filteredHistory,
//     totalCount,
//     loading,
//     error,
//     refetch,
//     dateRange,
//     setDateRange,
//     clearFilter,
//   } = useOrderHistory();

//   // Track which order IDs are expanded — multiple can be open simultaneously
//   const [openIds, setOpenIds] = useState(new Set());

//   const toggleOrder = (orderId) => {
//     setOpenIds((prev) => {
//       const next = new Set(prev);
//       next.has(orderId) ? next.delete(orderId) : next.add(orderId);
//       return next;
//     });
//   };

//   const isFiltered = !!(dateRange.from || dateRange.to);

//   return (
//     <Box>
//       {/* ── Page Header ── */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: { xs: "flex-start", sm: "center" },
//           justifyContent: "space-between",
//           flexDirection: { xs: "column", sm: "row" },
//           gap: 1.5,
//           mb: 3,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <Box
//             sx={{
//               width: 42, height: 42, borderRadius: "12px",
//               backgroundColor: "rgba(249,115,22,0.08)",
//               border: "1px solid rgba(249,115,22,0.15)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               flexShrink: 0,
//             }}
//           >
//             <HistoryRoundedIcon sx={{ color: "#F97316", fontSize: 22 }} />
//           </Box>
//           <Box>
//             <Typography
//               sx={{
//                 color: "#0F172A", fontWeight: 800,
//                 fontSize: { xs: "1.25rem", md: "1.5rem" },
//                 lineHeight: 1.2, letterSpacing: "-0.01em",
//               }}
//             >
//               Order History
//             </Typography>
//             <Typography sx={{ color: "#64748B", fontSize: "0.82rem", mt: 0.2 }}>
//               All your completed deliveries
//             </Typography>
//           </Box>
//         </Box>

//         {/* Total badge */}
//         {!loading && totalCount > 0 && (
//           <Box
//             sx={{
//               backgroundColor: "rgba(22,163,74,0.07)",
//               border: "1px solid rgba(22,163,74,0.18)",
//               borderRadius: "12px",
//               px: 2.5, py: 1,
//               textAlign: "center", flexShrink: 0,
//             }}
//           >
//             <Typography sx={{ fontWeight: 800, color: "#15803D", fontSize: "1.4rem", lineHeight: 1 }}>
//               {totalCount}
//             </Typography>
//             <Typography sx={{ color: "#16A34A", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em" }}>
//               DELIVERED
//             </Typography>
//           </Box>
//         )}
//       </Box>

//       {/* ── Error ── */}
//       {error && (
//         <Alert
//           severity="error"
//           sx={{ mb: 3, borderRadius: "10px" }}
//           action={
//             <Typography
//               onClick={refetch}
//               sx={{ color: "#EF4444", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", mr: 1 }}
//             >
//               Retry
//             </Typography>
//           }
//         >
//           {error}
//         </Alert>
//       )}

//       {/* ── Filter bar ── */}
//       <HistoryFilter
//         dateRange={dateRange}
//         setDateRange={setDateRange}
//         clearFilter={clearFilter}
//         totalCount={totalCount}
//         filteredCount={filteredHistory.length}
//       />

//       {/* ── Content ── */}
//       {loading ? (
//         <Paper elevation={0} sx={{ borderRadius: "14px", border: "1px solid #E2E8F0", overflow: "hidden" }}>
//           {[1, 2, 3, 4, 5].map((i, idx, arr) => (
//             <Box key={i}>
//               <SkeletonRow />
//               {idx < arr.length - 1 && <Divider sx={{ borderColor: "#F1F5F9" }} />}
//             </Box>
//           ))}
//         </Paper>

//       ) : filteredHistory.length === 0 ? (
//         <EmptyState isFiltered={isFiltered} />

//       ) : (
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: "14px",
//             border: "1px solid #E2E8F0",
//             overflow: "hidden",
//             backgroundColor: "#FFFFFF",
//           }}
//         >
//           {/* ── Desktop column headers ── */}
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               alignItems: "center",
//               gap: 3,
//               px: 3, py: 1.25,
//               backgroundColor: "#F8FAFC",
//               borderBottom: "1px solid #E2E8F0",
//             }}
//           >
//             {[
//               { label: "Order",  minWidth: 220 },
//               { label: "Items",  flex: 1 },
//               { label: "Total",  minWidth: 90,  textAlign: "right" },
//               { label: "Status", minWidth: 90,  textAlign: "right" },
//             ].map(({ label, ...sx }) => (
//               <Typography
//                 key={label}
//                 sx={{
//                   fontSize: "0.67rem", fontWeight: 700, color: "#94A3B8",
//                   letterSpacing: "0.06em", textTransform: "uppercase",
//                   ...sx,
//                 }}
//               >
//                 {label}
//               </Typography>
//             ))}
//             {/* spacer for expand icon column */}
//             <Box sx={{ width: 28, flexShrink: 0 }} />
//           </Box>

//           {/* ── Mobile sub-header ── */}
//           <Box
//             sx={{
//               display: { xs: "flex", md: "none" },
//               alignItems: "center",
//               justifyContent: "space-between",
//               px: 2, py: 1.25,
//               backgroundColor: "#F8FAFC",
//               borderBottom: "1px solid #E2E8F0",
//             }}
//           >
//             <Typography sx={{ fontSize: "0.67rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
//               {filteredHistory.length} Order{filteredHistory.length !== 1 ? "s" : ""}
//             </Typography>
//             <Typography sx={{ fontSize: "0.67rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
//               Tap to see items ↓
//             </Typography>
//           </Box>

//           {/* ── Order rows ── */}
//           {filteredHistory.map((order, idx) => (
//             <OrderRow
//               key={order.order_id}
//               order={order}
//               isOpen={openIds.has(order.order_id)}
//               onToggle={() => toggleOrder(order.order_id)}
//               isLast={idx === filteredHistory.length - 1}
//             />
//           ))}
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default OrderHistoryPage;











// 📁 src/webdelivery/pages/OrderHistoryPage.jsx

import { useState } from "react";
import {
  Box,
  Typography,
  Alert,
  Skeleton,
  Paper,
  Chip,
  Divider,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import HistoryRoundedIcon           from "@mui/icons-material/HistoryRounded";
import InboxRoundedIcon             from "@mui/icons-material/InboxRounded";
import CheckCircleRoundedIcon       from "@mui/icons-material/CheckCircleRounded";
import ShoppingBagRoundedIcon       from "@mui/icons-material/ShoppingBagRounded";
import AccessTimeRoundedIcon        from "@mui/icons-material/AccessTimeRounded";
import CurrencyRupeeRoundedIcon     from "@mui/icons-material/CurrencyRupeeRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon   from "@mui/icons-material/KeyboardArrowUpRounded";
import ScaleRoundedIcon             from "@mui/icons-material/ScaleRounded";
import Inventory2RoundedIcon        from "@mui/icons-material/Inventory2Rounded";

import HistoryFilter   from "../components/history/HistoryFilter";
import useOrderHistory from "../hooks/useOrderHistory";

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */

/** Format ISO date string → "17 Apr 2026, 04:31 PM" */
const formatDate = (isoString) => {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

/** Rupee formatted string */
const rupee = (val) => `₹${Number(val ?? 0).toFixed(2)}`;

/* ─────────────────────────────────────────────────────────────
   SKELETON
───────────────────────────────────────────────────────────── */
const SkeletonRow = () => (
  <Box sx={{ px: { xs: 2, md: 3 }, py: 2, display: "flex", alignItems: "center", gap: 2 }}>
    <Skeleton variant="rounded" width={38} height={38} sx={{ borderRadius: "10px", flexShrink: 0 }} />
    <Box sx={{ flex: 1 }}>
      <Skeleton variant="text" width={110} height={20} />
      <Skeleton variant="text" width={150} height={15} />
    </Box>
    <Skeleton variant="text" width={70}  height={20} sx={{ display: { xs: "none", sm: "block" } }} />
    <Skeleton variant="rounded" width={90} height={26} sx={{ borderRadius: "20px", display: { xs: "none", md: "block" } }} />
    <Skeleton variant="circular" width={28} height={28} />
  </Box>
);

/* ─────────────────────────────────────────────────────────────
   EMPTY STATE
───────────────────────────────────────────────────────────── */
const EmptyState = ({ isFiltered }) => (
  <Paper
    elevation={0}
    sx={{
      borderRadius: "14px",
      border: "1px solid #E2E8F0",
      py: { xs: 6, md: 10 },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#FAFBFC",
    }}
  >
    <Box
      sx={{
        width: 64, height: 64,
        borderRadius: "18px",
        backgroundColor: "rgba(249,115,22,0.07)",
        border: "1px solid rgba(249,115,22,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        mb: 2,
      }}
    >
      <InboxRoundedIcon sx={{ color: "#F97316", fontSize: 30 }} />
    </Box>
    <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem", mb: 0.5 }}>
      {isFiltered ? "No orders in this date range" : "No delivery history yet"}
    </Typography>
    <Typography sx={{ color: "#94A3B8", fontSize: "0.82rem", textAlign: "center", maxWidth: 260 }}>
      {isFiltered
        ? "Try adjusting or clearing the date filter."
        : "Completed orders will appear here once you start delivering."}
    </Typography>
  </Paper>
);

/* ─────────────────────────────────────────────────────────────
   ITEM ROW — inside the expanded panel
───────────────────────────────────────────────────────────── */

/** Desktop: renders as a <TableRow> */
const ItemTableRow = ({ item, index }) => (
  <TableRow
    sx={{
      "&:last-child td": { borderBottom: 0 },
      "&:hover": { backgroundColor: "rgba(249,115,22,0.03)" },
      transition: "background 0.15s",
    }}
  >
    {/* # */}
    <TableCell sx={{ py: 1.25, pl: 0, fontSize: "0.75rem", color: "#94A3B8", width: 28, fontWeight: 600 }}>
      {index + 1}
    </TableCell>

    {/* Product — Item ID removed */}
    <TableCell sx={{ py: 1.25 }}>
      <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#0F172A" }}>
        {item.product_name ?? `Product #${item.product_id}`}
      </Typography>
    </TableCell>

    {/* Weight — dynamic unit from API */}
    <TableCell sx={{ py: 1.25, fontSize: "0.8rem", color: "#374151" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <ScaleRoundedIcon sx={{ fontSize: 13, color: "#94A3B8" }} />
        {item.weight} {item.unit?.trim()}
      </Box>
    </TableCell>

    {/* Qty */}
    <TableCell sx={{ py: 1.25, fontSize: "0.8rem", color: "#374151", textAlign: "center" }}>
      ×{item.quantity}
    </TableCell>

    {/* Total Price — Unit Price column removed */}
    <TableCell sx={{ py: 1.25, textAlign: "right" }}>
      <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.85rem" }}>
        {rupee(item.total_price)}
      </Typography>
    </TableCell>
  </TableRow>
);

/** Mobile: renders as a small summary card per item */
const ItemMobileCard = ({ item, index }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 1,
      px: 1.5,
      py: 1.25,
      borderRadius: "10px",
      backgroundColor: "#FFFFFF",
      border: "1px solid #E2E8F0",
      mb: 1,
      "&:last-child": { mb: 0 },
    }}
  >
    {/* Left: serial + product */}
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, flex: 1, minWidth: 0 }}>
      <Box
        sx={{
          width: 22, height: 22,
          borderRadius: "6px",
          backgroundColor: "rgba(249,115,22,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, mt: 0.2,
        }}
      >
        <Typography sx={{ fontSize: "0.62rem", fontWeight: 800, color: "#F97316" }}>
          {index + 1}
        </Typography>
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "0.82rem", fontWeight: 600, color: "#0F172A",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}
        >
          {item.product_name ?? `Product #${item.product_id}`}
        </Typography>

        {/* Weight (dynamic unit) + Qty — Unit Price removed */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 0.4, flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <ScaleRoundedIcon sx={{ fontSize: 11, color: "#94A3B8" }} />
            <Typography sx={{ fontSize: "0.68rem", color: "#64748B" }}>
              {item.weight} {item.unit?.trim()}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "0.68rem", color: "#64748B" }}>Qty: ×{item.quantity}</Typography>
        </Box>
      </Box>
    </Box>

    {/* Right: total price only — Item ID removed */}
    <Box sx={{ flexShrink: 0, textAlign: "right" }}>
      <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "0.88rem" }}>
        {rupee(item.total_price)}
      </Typography>
    </Box>
  </Box>
);

/* ─────────────────────────────────────────────────────────────
   EXPANDED PANEL — shown when a row is open
───────────────────────────────────────────────────────────── */
const ExpandedPanel = ({ order }) => {
  const items = order.items ?? [];

  return (
    <Box
      sx={{
        backgroundColor: "#F8FAFC",
        borderTop: "1px dashed #E2E8F0",
        px: { xs: 2, md: 3 },
        py: 2,
      }}
    >
      {/* Panel title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.75 }}>
        <Inventory2RoundedIcon sx={{ fontSize: 15, color: "#F97316" }} />
        <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Order Items — {items.length} item{items.length !== 1 ? "s" : ""}
        </Typography>
      </Box>

      {/* ── DESKTOP: Table ── */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Table size="small" sx={{ "& .MuiTableCell-root": { borderColor: "#E2E8F0" } }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#EFF3F8" }}>
              {/* # */}
              <TableCell sx={{ py: 1, pl: 0, fontSize: "0.65rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase", width: 28 }}>
                #
              </TableCell>
              {/* Product */}
              <TableCell sx={{ py: 1, fontSize: "0.65rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Product
              </TableCell>
              {/* Weight */}
              <TableCell sx={{ py: 1, fontSize: "0.65rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Weight
              </TableCell>
              {/* Qty */}
              <TableCell sx={{ py: 1, fontSize: "0.65rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "center" }}>
                Qty
              </TableCell>
              {/* Total — Unit Price column removed */}
              <TableCell sx={{ py: 1, fontSize: "0.65rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "right" }}>
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, idx) => (
              <ItemTableRow key={item.id} item={item} index={idx} />
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* ── MOBILE: Cards ── */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {items.map((item, idx) => (
          <ItemMobileCard key={item.id} item={item} index={idx} />
        ))}
      </Box>

      {/* ── Order total footer ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          mt: 2,
          pt: 1.5,
          borderTop: "1px solid #E2E8F0",
          gap: 1,
        }}
      >
        <Typography sx={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 500 }}>
          Order Total
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <CurrencyRupeeRoundedIcon sx={{ fontSize: 15, color: "#0F172A" }} />
          <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1rem" }}>
            {Number(order.total_amount ?? 0).toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

/* ─────────────────────────────────────────────────────────────
   ORDER ROW — collapsed summary + toggle
───────────────────────────────────────────────────────────── */
const OrderRow = ({ order, isOpen, onToggle, isLast }) => {
  const items      = order.items ?? [];
  const firstItem  = items[0];
  const extraCount = items.length - 1;

  return (
    <>
      {/* ── DESKTOP collapsed row ── */}
      <Box
        onClick={onToggle}
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: 3,
          px: 3,
          py: 1.75,
          cursor: "pointer",
          transition: "background 0.15s",
          backgroundColor: isOpen ? "rgba(249,115,22,0.03)" : "transparent",
          "&:hover": { backgroundColor: "rgba(249,115,22,0.04)" },
        }}
      >
        {/* Icon + Order ID + Date */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 220 }}>
          <Box
            sx={{
              width: 38, height: 38,
              borderRadius: "10px",
              backgroundColor: isOpen ? "rgba(249,115,22,0.12)" : "rgba(249,115,22,0.07)",
              border: `1px solid ${isOpen ? "rgba(249,115,22,0.25)" : "rgba(249,115,22,0.12)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.2s",
            }}
          >
            <ShoppingBagRoundedIcon sx={{ color: "#F97316", fontSize: 18 }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.875rem" }}>
              Order #{order.order_id}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, mt: 0.2 }}>
              <AccessTimeRoundedIcon sx={{ fontSize: 11, color: "#94A3B8" }} />
              <Typography sx={{ fontSize: "0.7rem", color: "#94A3B8" }}>
                {formatDate(order.created_at)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Item preview */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {firstItem ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                sx={{
                  fontSize: { md: "0.74rem", lg: "0.82rem" }, color: "#374151", fontWeight: 500,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  maxWidth: { md: 140, lg: 200 },
                }}
              >
                {firstItem.product_name ?? `Product #${firstItem.product_id}`}
              </Typography>
              <Typography sx={{ fontSize: { md: "0.66rem", lg: "0.72rem" }, color: "#94A3B8", flexShrink: 0 }}>
                ×{firstItem.quantity}
              </Typography>
              {extraCount > 0 && (
                <Chip
                  label={`+${extraCount} more`}
                  size="small"
                  sx={{
                    height: 20, fontSize: { md: "0.6rem", lg: "0.65rem" }, fontWeight: 600,
                    backgroundColor: "#F1F5F9", color: "#64748B", flexShrink: 0,
                  }}
                />
              )}
            </Box>
          ) : (
            <Typography sx={{ fontSize: "0.82rem", color: "#94A3B8" }}>No items</Typography>
          )}
          <Typography sx={{ fontSize: "0.68rem", color: "#94A3B8", mt: 0.2 }}>
            {items.length} item{items.length !== 1 ? "s" : ""}
          </Typography>
        </Box>

        {/* Total */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, minWidth: 90, justifyContent: "flex-end" }}>
          <CurrencyRupeeRoundedIcon sx={{ fontSize: 14, color: "#374151" }} />
          <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.9rem" }}>
            {Number(order.total_amount ?? 0).toFixed(2)}
          </Typography>
        </Box>

        {/* Status chip */}
        <Box sx={{ minWidth: 90, display: "flex", justifyContent: "flex-end" }}>
          <Chip
            icon={<CheckCircleRoundedIcon sx={{ fontSize: "13px !important", color: "#16A34A !important" }} />}
            label="Delivered"
            size="small"
            sx={{
              backgroundColor: "rgba(22,163,74,0.08)", color: "#15803D",
              fontWeight: 600, fontSize: "0.72rem", height: 26,
              border: "1px solid rgba(22,163,74,0.2)",
              "& .MuiChip-icon": { ml: "6px" },
            }}
          />
        </Box>

        {/* Expand toggle */}
        <Box
          sx={{
            width: 28, height: 28,
            borderRadius: "8px",
            border: "1px solid",
            borderColor: isOpen ? "rgba(249,115,22,0.3)" : "#E2E8F0",
            backgroundColor: isOpen ? "rgba(249,115,22,0.06)" : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
            flexShrink: 0,
          }}
        >
          {isOpen
            ? <KeyboardArrowUpRoundedIcon   sx={{ fontSize: 18, color: "#F97316" }} />
            : <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18, color: "#94A3B8" }} />
          }
        </Box>
      </Box>

      {/* ── MOBILE collapsed row ── */}
      <Box
        onClick={onToggle}
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          gap: 1.5,
          px: 2,
          py: 1.75,
          cursor: "pointer",
          backgroundColor: isOpen ? "rgba(249,115,22,0.03)" : "transparent",
          transition: "background 0.15s",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 36, height: 36,
            borderRadius: "10px",
            backgroundColor: isOpen ? "rgba(249,115,22,0.12)" : "rgba(249,115,22,0.07)",
            border: `1px solid ${isOpen ? "rgba(249,115,22,0.25)" : "rgba(249,115,22,0.12)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "all 0.2s",
          }}
        >
          <ShoppingBagRoundedIcon sx={{ color: "#F97316", fontSize: 17 }} />
        </Box>

        {/* Order ID + date + item count */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.875rem" }}>
              Order #{order.order_id}
            </Typography>
            <Chip
              icon={<CheckCircleRoundedIcon sx={{ fontSize: "11px !important", color: "#16A34A !important" }} />}
              label="Delivered"
              size="small"
              sx={{
                height: 20, fontSize: "0.62rem", fontWeight: 600,
                backgroundColor: "rgba(22,163,74,0.08)", color: "#15803D",
                border: "1px solid rgba(22,163,74,0.2)",
                "& .MuiChip-icon": { ml: "5px" },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.3, flexWrap: "nowrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, flexShrink: 0 }}>
              <AccessTimeRoundedIcon sx={{ fontSize: 10, color: "#94A3B8" }} />
              <Typography sx={{ fontSize: { xs: "0.6rem", sm: "0.68rem" }, color: "#94A3B8", whiteSpace: "nowrap" }}>
                {formatDate(order.created_at)}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: { xs: "0.6rem", sm: "0.68rem" }, color: "#94A3B8", whiteSpace: "nowrap", flexShrink: 0 }}>
              · {items.length} item{items.length !== 1 ? "s" : ""}
            </Typography>
          </Box>
        </Box>

        {/* Total + toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
            <CurrencyRupeeRoundedIcon sx={{ fontSize: 13, color: "#0F172A" }} />
            <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "0.9rem" }}>
              {Number(order.total_amount ?? 0).toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 26, height: 26, borderRadius: "7px",
              border: "1px solid",
              borderColor: isOpen ? "rgba(249,115,22,0.3)" : "#E2E8F0",
              backgroundColor: isOpen ? "rgba(249,115,22,0.06)" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            {isOpen
              ? <KeyboardArrowUpRoundedIcon   sx={{ fontSize: 16, color: "#F97316" }} />
              : <KeyboardArrowDownRoundedIcon sx={{ fontSize: 16, color: "#94A3B8" }} />
            }
          </Box>
        </Box>
      </Box>

      {/* ── Expanded panel (shared desktop + mobile) ── */}
      <Collapse in={isOpen} timeout={250} unmountOnExit>
        <ExpandedPanel order={order} />
      </Collapse>

      {!isLast && <Divider sx={{ borderColor: "#F1F5F9" }} />}
    </>
  );
};

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
const OrderHistoryPage = () => {
  const {
    filteredHistory,
    totalCount,
    loading,
    error,
    refetch,
    dateRange,
    setDateRange,
    clearFilter,
  } = useOrderHistory();

  // Track which order IDs are expanded — multiple can be open simultaneously
  const [openIds, setOpenIds] = useState(new Set());

  const toggleOrder = (orderId) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(orderId) ? next.delete(orderId) : next.add(orderId);
      return next;
    });
  };

  const isFiltered = !!(dateRange.from || dateRange.to);

  return (
    <Box>
      {/* ── Page Header ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 42, height: 42, borderRadius: "12px",
              backgroundColor: "rgba(249,115,22,0.08)",
              border: "1px solid rgba(249,115,22,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <HistoryRoundedIcon sx={{ color: "#F97316", fontSize: 22 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#0F172A", fontWeight: 800,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                lineHeight: 1.2, letterSpacing: "-0.01em",
              }}
            >
              Order History
            </Typography>
            <Typography sx={{ color: "#64748B", fontSize: "0.82rem", mt: 0.2 }}>
              All your completed deliveries
            </Typography>
          </Box>
        </Box>

        {/* Total badge */}
        {!loading && totalCount > 0 && (
          <Box
            sx={{
              backgroundColor: "rgba(22,163,74,0.07)",
              border: "1px solid rgba(22,163,74,0.18)",
              borderRadius: "12px",
              px: 2.5, py: 1,
              textAlign: "center", flexShrink: 0,
            }}
          >
            <Typography sx={{ fontWeight: 800, color: "#15803D", fontSize: "1.4rem", lineHeight: 1 }}>
              {totalCount}
            </Typography>
            <Typography sx={{ color: "#16A34A", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em" }}>
              DELIVERED
            </Typography>
          </Box>
        )}
      </Box>

      {/* ── Error ── */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: "10px" }}
          action={
            <Typography
              onClick={refetch}
              sx={{ color: "#EF4444", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", mr: 1 }}
            >
              Retry
            </Typography>
          }
        >
          {error}
        </Alert>
      )}

      {/* ── Filter bar ── */}
      <HistoryFilter
        dateRange={dateRange}
        setDateRange={setDateRange}
        clearFilter={clearFilter}
        totalCount={totalCount}
        filteredCount={filteredHistory.length}
      />

      {/* ── Content ── */}
      {loading ? (
        <Paper elevation={0} sx={{ borderRadius: "14px", border: "1px solid #E2E8F0", overflow: "hidden" }}>
          {[1, 2, 3, 4, 5].map((i, idx, arr) => (
            <Box key={i}>
              <SkeletonRow />
              {idx < arr.length - 1 && <Divider sx={{ borderColor: "#F1F5F9" }} />}
            </Box>
          ))}
        </Paper>

      ) : filteredHistory.length === 0 ? (
        <EmptyState isFiltered={isFiltered} />

      ) : (
        <Paper
          elevation={0}
          sx={{
            borderRadius: "14px",
            border: "1px solid #E2E8F0",
            overflow: "hidden",
            backgroundColor: "#FFFFFF",
          }}
        >
          {/* ── Desktop column headers ── */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
              px: 3, py: 1.25,
              backgroundColor: "#F8FAFC",
              borderBottom: "1px solid #E2E8F0",
            }}
          >
            {[
              { label: "Order",  minWidth: 220 },
              { label: "Items",  flex: 1 },
              { label: "Total",  minWidth: 90,  textAlign: "right" },
              { label: "Status", minWidth: 90,  textAlign: "right" },
            ].map(({ label, ...sx }) => (
              <Typography
                key={label}
                sx={{
                  fontSize: "0.67rem", fontWeight: 700, color: "#94A3B8",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  ...sx,
                }}
              >
                {label}
              </Typography>
            ))}
            {/* spacer for expand icon column */}
            <Box sx={{ width: 28, flexShrink: 0 }} />
          </Box>

          {/* ── Mobile sub-header ── */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "space-between",
              px: 2, py: 1.25,
              backgroundColor: "#F8FAFC",
              borderBottom: "1px solid #E2E8F0",
            }}
          >
            <Typography sx={{ fontSize: "0.67rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {filteredHistory.length} Order{filteredHistory.length !== 1 ? "s" : ""}
            </Typography>
            <Typography sx={{ fontSize: "0.67rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Tap to see items ↓
            </Typography>
          </Box>

          {/* ── Order rows ── */}
          {filteredHistory.map((order, idx) => (
            <OrderRow
              key={order.order_id}
              order={order}
              isOpen={openIds.has(order.order_id)}
              onToggle={() => toggleOrder(order.order_id)}
              isLast={idx === filteredHistory.length - 1}
            />
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default OrderHistoryPage;