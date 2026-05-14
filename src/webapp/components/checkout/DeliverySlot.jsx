
// components/checkout/DeliverySlot.jsx

import { Box, Typography, Chip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

const DeliverySlot = () => {
  return (
    <Box
      sx={{
        mb: 2,
        backgroundColor: "#fff",
        borderRadius: "16px",
        border: "1px solid #e2ece2",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    >
      {/* Header bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.9,
          px: 2.5,
          py: 1.4,
          borderBottom: "1px solid #eef4ee",
          backgroundColor: "#f7fbf7",
        }}
      >
        <LocalShippingOutlinedIcon sx={{ fontSize: 15, color: "#4CAF50" }} />
        <Typography
          fontSize={11}
          fontWeight={700}
          letterSpacing={1.1}
          color="#7a9a7a"
          sx={{ textTransform: "uppercase" }}
        >
          Delivery Time
        </Typography>
      </Box>

      {/* Slot body */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        {/* Left: time */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          {/* Green clock icon bubble */}
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "#e8f5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <AccessTimeIcon sx={{ fontSize: 18, color: "#2e7d32" }} />
          </Box>
          <Box>
            <Typography fontWeight={700} fontSize={15} color="#1a2e1a" lineHeight={1.2}>
              Today in 40 minutes
            </Typography>
            <Typography fontSize={11.5} color="#8a9e8a" mt={0.2}>
              Estimated delivery window
            </Typography>
          </Box>
        </Box>

        {/* Right: badges */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label="On time"
            size="small"
            sx={{
              height: 22,
              fontSize: 11,
              fontWeight: 700,
              backgroundColor: "#e3f4e3",
              color: "#2e7d32",
              borderRadius: "7px",
            }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <VerifiedOutlinedIcon sx={{ fontSize: 14, color: "#4CAF50" }} />
            <Typography fontSize={12} color="#6a8a6a" fontWeight={500}>
              Guaranteed
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DeliverySlot;