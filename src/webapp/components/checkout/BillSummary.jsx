// // components/checkout/BillSummary.jsx
// // Logic unchanged — only visual redesign

// import { Box, Typography, Divider } from "@mui/material";
// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
// import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
// import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";

// // ── helper row ──────────────────────────────────────────────
// const BillRow = ({ label, value, valueColor = "#2a2a2a", labelColor = "#7a9a7a", bold = false }) => (
//   <Box
//     sx={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       py: 0.9,
//     }}
//   >
//     <Typography fontSize={13.5} color={labelColor} fontWeight={bold ? 700 : 400}>
//       {label}
//     </Typography>
//     {typeof value === "string" ? (
//       <Typography fontSize={13.5} fontWeight={bold ? 700 : 500} color={valueColor}>
//         {value}
//       </Typography>
//     ) : (
//       value
//     )}
//   </Box>
// );

// // ── component ────────────────────────────────────────────────
// const BillSummary = ({ summary }) => {
//   // API: { cart_id, items_count, overall_total }
//   const itemsCount = summary?.items_count ?? 0;
//   const total = Number(summary?.overall_total) || 0;
//   const grandTotal = total; // convenience + shipping both FREE

//   const isEmpty = !summary || itemsCount === 0;

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#fff",
//         borderRadius: "16px",
//         border: "1px solid #e2ece2",
//         boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
//         overflow: "hidden",
//         position: { md: "sticky" },
//         top: { md: 84 },
//       }}
//     >
//       {/* ── Dark green header ── */}
//       <Box
//         sx={{
//           background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #388e3c 100%)",
//           px: 2.5,
//           py: 2,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <ShoppingBagOutlinedIcon sx={{ fontSize: 18, color: "rgba(255,255,255,0.85)" }} />
//           <Typography fontWeight={700} fontSize={14.5} color="#fff" letterSpacing={0.2}>
//             Bill Summary
//           </Typography>
//         </Box>
//         {itemsCount > 0 && (
//           <Box
//             sx={{
//               backgroundColor: "rgba(255,255,255,0.18)",
//               border: "1px solid rgba(255,255,255,0.3)",
//               borderRadius: "20px",
//               px: 1.4,
//               py: 0.3,
//             }}
//           >
//             <Typography fontSize={11.5} fontWeight={700} color="#fff">
//               {itemsCount} {itemsCount === 1 ? "item" : "items"}
//             </Typography>
//           </Box>
//         )}
//       </Box>

//       {/* ── Body ── */}
//       <Box sx={{ px: 2.5, pt: 2, pb: 2.5 }}>
//         {isEmpty ? (
//           <Typography fontSize={13.5} color="text.secondary" textAlign="center" py={2}>
//             Your cart is empty
//           </Typography>
//         ) : (
//           <>
//             {/* Items total */}
//             <BillRow label="Items total" value={`₹ ${total}`} />

//             {/* Convenience charge */}
//             <BillRow
//               label="Convenience charge"
//               value={
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                   <DiscountOutlinedIcon sx={{ fontSize: 13, color: "#4CAF50" }} />
//                   <Typography fontSize={13.5} fontWeight={600} color="#2e7d32">
//                     FREE
//                   </Typography>
//                 </Box>
//               }
//             />

//             {/* Delivery */}
//             <BillRow
//               label="Delivery charge"
//               value={
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                   <LocalShippingOutlinedIcon sx={{ fontSize: 13, color: "#4CAF50" }} />
//                   <Typography fontSize={13.5} fontWeight={600} color="#2e7d32">
//                     FREE
//                   </Typography>
//                 </Box>
//               }
//             />

//             <Divider sx={{ my: 1.5, borderColor: "#eef4ee", borderStyle: "dashed" }} />

//             {/* Grand total */}
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 backgroundColor: "#f4faf4",
//                 border: "1px solid #d8eed8",
//                 borderRadius: "10px",
//                 px: 2,
//                 py: 1.4,
//               }}
//             >
//               <Typography fontSize={14.5} fontWeight={700} color="#1a2e1a">
//                 Amount payable
//               </Typography>
//               <Typography fontSize={17} fontWeight={800} color="#1b5e20">
//                 ₹ {grandTotal}
//               </Typography>
//             </Box>

//             {/* Savings note */}
//             <Box
//               sx={{
//                 mt: 1.5,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 0.8,
//                 backgroundColor: "#f0faf0",
//                 border: "1px solid #c8e6c9",
//                 borderRadius: "10px",
//                 px: 1.8,
//                 py: 1,
//               }}
//             >
//               <Typography fontSize={14}>🎉</Typography>
//               <Typography fontSize={12.5} fontWeight={500} color="#2e7d32" lineHeight={1.5}>
//                 Shipping & convenience — both FREE on this order
//               </Typography>
//             </Box>
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default BillSummary;










// components/checkout/BillSummary.jsx

import { Box, Typography, Divider } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";

// ── helper row — completely unchanged ───────────────────────
const BillRow = ({ label, value, valueColor = "#2a2a2a", labelColor = "#7a9a7a", bold = false }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 0.9,
    }}
  >
    <Typography fontSize={13.5} color={labelColor} fontWeight={bold ? 700 : 400}>
      {label}
    </Typography>
    {typeof value === "string" ? (
      <Typography fontSize={13.5} fontWeight={bold ? 700 : 500} color={valueColor}>
        {value}
      </Typography>
    ) : (
      value
    )}
  </Box>
);

// ── component ────────────────────────────────────────────────
const BillSummary = ({ summary }) => {

  const itemsCount  = summary?.items_count  ?? 0;

  // ── CHANGE 1: use real fields from fetch_order_summary response ──
  // API now returns: { items_count, items_total, delivery_charge, overall_total }
  const itemsTotal  = Number(summary?.items_total)    || 0;  // subtotal without delivery
  const delivCharge = Number(summary?.delivery_charge) || 0; // 0 if free, 50 if applicable
  const grandTotal  = Number(summary?.overall_total)  || 0;  // final amount = itemsTotal + delivCharge

  const isEmpty = !summary || itemsCount === 0;

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        border: "1px solid #e2ece2",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        overflow: "hidden",
        position: { md: "sticky" },
        top: { md: 84 },
      }}
    >
      {/* ── Dark green header — completely unchanged ── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #388e3c 100%)",
          px: 2.5,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ShoppingBagOutlinedIcon sx={{ fontSize: 18, color: "rgba(255,255,255,0.85)" }} />
          <Typography fontWeight={700} fontSize={14.5} color="#fff" letterSpacing={0.2}>
            Bill Summary
          </Typography>
        </Box>
        {itemsCount > 0 && (
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "20px",
              px: 1.4,
              py: 0.3,
            }}
          >
            <Typography fontSize={11.5} fontWeight={700} color="#fff">
              {itemsCount} {itemsCount === 1 ? "item" : "items"}
            </Typography>
          </Box>
        )}
      </Box>

      {/* ── Body ── */}
      <Box sx={{ px: 2.5, pt: 2, pb: 2.5 }}>
        {isEmpty ? (
          <Typography fontSize={13.5} color="text.secondary" textAlign="center" py={2}>
            Your cart is empty
          </Typography>
        ) : (
          <>
            {/* Items total — CHANGE 2: now shows itemsTotal not grandTotal */}
            <BillRow label="Items total" value={`₹ ${itemsTotal}`} />

            {/* Convenience charge — unchanged, always FREE */}
            <BillRow
              label="Convenience charge"
              value={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                  <DiscountOutlinedIcon sx={{ fontSize: 13, color: "#4CAF50" }} />
                  <Typography fontSize={13.5} fontWeight={600} color="#2e7d32">
                    FREE
                  </Typography>
                </Box>
              }
            />

            {/* Delivery charge — CHANGE 3: dynamic based on delivCharge from API */}
            <BillRow
              label="Delivery charge"
              value={
                delivCharge > 0 ? (
                  // Delivery charge applied — show in orange
                  <Typography fontSize={13.5} fontWeight={600} color="#e65100">
                    ₹ {delivCharge}
                  </Typography>
                ) : (
                  // Free delivery — show in green
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                    <LocalShippingOutlinedIcon sx={{ fontSize: 13, color: "#4CAF50" }} />
                    <Typography fontSize={13.5} fontWeight={600} color="#2e7d32">
                      FREE
                    </Typography>
                  </Box>
                )
              }
            />

            <Divider sx={{ my: 1.5, borderColor: "#eef4ee", borderStyle: "dashed" }} />

            {/* Grand total — unchanged layout, now uses real overall_total */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f4faf4",
                border: "1px solid #d8eed8",
                borderRadius: "10px",
                px: 2,
                py: 1.4,
              }}
            >
              <Typography fontSize={14.5} fontWeight={700} color="#1a2e1a">
                Amount payable
              </Typography>
              <Typography fontSize={17} fontWeight={800} color="#1b5e20">
                ₹ {grandTotal}
              </Typography>
            </Box>

            {/* CHANGE 4: bottom note — dynamic based on delivCharge */}
            <Box
              sx={{
                mt: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                backgroundColor: "#f0faf0",
                border: "1px solid #c8e6c9",
                borderRadius: "10px",
                px: 1.8,
                py: 1,
              }}
            >
              <Typography fontSize={14}>
                {delivCharge > 0 ? "🛵" : "🎉"}
              </Typography>
              <Typography fontSize={12.5} fontWeight={500} color="#2e7d32" lineHeight={1.5}>
                {delivCharge > 0
                  ? `₹${delivCharge} delivery charge applied on this order`
                  : "Shipping & convenience — both FREE on this order"}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default BillSummary;