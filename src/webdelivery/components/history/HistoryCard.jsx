// 📁 src/webdelivery/components/history/HistoryCard.jsx

import {
  Box,
  Typography,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";

/**
 * HistoryCard
 *
 * Displays a single delivered order with:
 * - Order ID + delivered date/time
 * - Status badge
 * - Items list (product_id as placeholder until backend provides product name)
 * - Total amount
 *
 * Props:
 *   order: {
 *     order_id, status, total_amount, created_at,
 *     items: [{ id, product_id, weight, quantity, unit_price, total_price }]
 *   }
 */

/**
 * Formats ISO date string to readable format
 * e.g. "2026-04-17T11:01:12.845479Z" → "17 Apr 2026, 11:01 AM"
 */
const formatDateTime = (isoString) => {
  if (!isoString) return "—";
  const date = new Date(isoString);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const HistoryCard = ({ order }) => {
  const { order_id, status, total_amount, created_at, items = [] } = order;

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* ── Card Header ── */}
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
          borderBottom: "1px solid #F1F5F9",
          backgroundColor: "#FAFBFC",
        }}
      >
        {/* Order ID + icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              backgroundColor: "rgba(249,115,22,0.08)",
              border: "1px solid rgba(249,115,22,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ReceiptRoundedIcon sx={{ color: "#F97316", fontSize: 18 }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.9rem" }}>
              Order #{order_id}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.2 }}>
              <AccessTimeRoundedIcon sx={{ fontSize: 12, color: "#94A3B8" }} />
              <Typography sx={{ fontSize: "0.72rem", color: "#94A3B8" }}>
                {formatDateTime(created_at)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Status badge */}
        <Chip
          icon={<CheckCircleRoundedIcon sx={{ fontSize: "14px !important", color: "#15803D !important" }} />}
          label={status}
          size="small"
          sx={{
            backgroundColor: "rgba(34,197,94,0.08)",
            color: "#15803D",
            fontWeight: 700,
            fontSize: "0.75rem",
            height: 28,
            border: "1px solid rgba(34,197,94,0.2)",
            "& .MuiChip-icon": { ml: "6px" },
          }}
        />
      </Box>

      {/* ── Card Body ── */}
      <Box sx={{ px: 3, py: 2.5 }}>

        {/* Items section */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1.5 }}>
            <ShoppingBagRoundedIcon sx={{ fontSize: 15, color: "#64748B" }} />
            <Typography
              sx={{
                color: "#64748B",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Items ({items.length})
            </Typography>
          </Box>

          {/* Item rows */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#F8FAFC",
                  borderRadius: "10px",
                  px: 2,
                  py: 1.2,
                  border: "1px solid #F1F5F9",
                }}
              >
                <Box>
                  {/* Placeholder — replace with product name when backend provides it */}
                  <Typography sx={{ fontWeight: 600, color: "#1E293B", fontSize: "0.85rem" }}>
                    Product #{item.product_id}
                  </Typography>
                  <Typography sx={{ color: "#94A3B8", fontSize: "0.75rem", mt: 0.2 }}>
                    Qty: {item.quantity} · Weight: {item.weight} kg · ₹{item.unit_price}/unit
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.875rem" }}>
                  ₹{item.total_price.toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#F1F5F9", mb: 2 }} />

        {/* Total row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CurrencyRupeeRoundedIcon sx={{ fontSize: 16, color: "#64748B" }} />
            <Typography sx={{ color: "#64748B", fontWeight: 600, fontSize: "0.82rem" }}>
              Order Total
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.05rem" }}>
            ₹{total_amount.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HistoryCard;