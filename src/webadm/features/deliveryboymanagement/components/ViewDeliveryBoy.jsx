// src/webadm/features/deliveryboy/components/ViewDeliveryBoy.jsx

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Avatar,
  Chip,
  Divider,
  CircularProgress,
} from "@mui/material";
import CloseIcon                  from "@mui/icons-material/Close";
import PhoneAndroidOutlinedIcon   from "@mui/icons-material/PhoneAndroidOutlined";
import EmailOutlinedIcon          from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon     from "@mui/icons-material/LocationOnOutlined";
import LocalShippingOutlinedIcon  from "@mui/icons-material/LocalShippingOutlined";
import TodayIcon                  from "@mui/icons-material/Today";
import CheckCircleOutlineIcon     from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon         from "@mui/icons-material/CancelOutlined";
import FiberManualRecordIcon      from "@mui/icons-material/FiberManualRecord";
import { deliveryBoyAPI }         from "../deliveryBoyAPI";

// ─── Avatar color helper ──────────────────────────────────────────────────────
const getAvatarColor = (name = "") => {
  const colors = ["#1e3c72", "#2a5298", "#095c90", "#1565C0", "#0277BD"];
  return colors[name.charCodeAt(0) % colors.length];
};

// ─── Status chip color ────────────────────────────────────────────────────────
const statusColor = (status) => {
  if (!status) return { color: "#64748b", bg: "#f1f5f9" };
  const s = status.toLowerCase();
  if (s === "online")  return { color: "#16a34a", bg: "#dcfce7" };
  if (s === "offline") return { color: "#dc2626", bg: "#fee2e2" };
  return { color: "#d97706", bg: "#fef3c7" };
};

// ─── Stat Tile ────────────────────────────────────────────────────────────────
const StatTile = ({ icon, label, value, color, bg }) => (
  <Box
    sx={{
      flex:         1,
      minWidth:     0,
      background:   bg,
      borderRadius: "14px",
      border:       `1px solid ${color}22`,
      // tighter padding on xs so both tiles fit side-by-side at 375px
      p:            { xs: 1.25, sm: 2 },
      display:      "flex",
      alignItems:   "center",
      gap:          { xs: 1.25, sm: 1.75 },
    }}
  >
    <Box
      sx={{
        // smaller icon box on xs to leave room for the number text
        width:          { xs: 34, sm: 44 },
        height:         { xs: 34, sm: 44 },
        borderRadius:   { xs: "10px", sm: "12px" },
        background:     `${color}18`,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        flexShrink:     0,
      }}
    >
      {React.cloneElement(icon, { sx: { color, fontSize: { xs: 18, sm: 22 } } })}
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          fontSize:   { xs: "1.2rem", sm: "1.6rem" },
          fontWeight: 800,
          color:      "#1e293b",
          lineHeight: 1.1,
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontSize:  { xs: "0.68rem", sm: "0.72rem" },
          color:     "#64748b",
          fontWeight: 500,
          mt:        0.25,
          whiteSpace: "nowrap",   // keep "Total Delivered" on one line
        }}
      >
        {label}
      </Typography>
    </Box>
  </Box>
);

// ─── Info Row ─────────────────────────────────────────────────────────────────
const InfoRow = ({ icon, label, value }) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, py: { xs: 1, sm: 1.25 } }}>
    <Box
      sx={{
        width:          { xs: 30, sm: 34 },
        height:         { xs: 30, sm: 34 },
        borderRadius:   "9px",
        background:     "#f0f4ff",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        flexShrink:     0,
        mt:             0.1,
      }}
    >
      {React.cloneElement(icon, { sx: { fontSize: { xs: 15, sm: 17 }, color: "#2a5298" } })}
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          fontSize:      "0.68rem",
          color:         "#94a3b8",
          fontWeight:    600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          mb:            0.2,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize:   { xs: "0.83rem", sm: "0.875rem" },
          color:      "#1e293b",
          fontWeight: 500,
          wordBreak:  "break-word",
        }}
      >
        {value || "—"}
      </Typography>
    </Box>
  </Box>
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function ViewDeliveryBoy({ open, onClose, deliveryBoyId }) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  useEffect(() => {
    if (open && deliveryBoyId) fetchDetails();
  }, [open, deliveryBoyId]);

  const fetchDetails = async () => {
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await deliveryBoyAPI.fetchOneDeliveryBoy({ id: deliveryBoyId });
      console.log(res)
      setData(res?.data?.data || null);
    } catch (err) {
      console.error("View Delivery Boy Error:", err);
      setError("Failed to load details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setData(null);
    setError("");
    onClose();
  };
  console.log("data",data)
  const boy   = data?.delivery_boy_details || null;
  console.log("boy",boy)
  const tiles = data?.tile_details || {};
  console.log("tiles",tiles)
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      fullScreen={false}
      PaperProps={{
        sx: {
          borderRadius:  "18px",
          boxShadow:     "0 20px 60px rgba(0,0,0,0.18)",
          overflow:      "hidden",
          mx:            { xs: 2, sm: "auto" },
          my:            { xs: 2, sm: "auto" },
          maxHeight:     { xs: "92vh", sm: "88vh" },
          display:       "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* ── Header ── */}
      <DialogTitle sx={{ p: 0, flexShrink: 0 }}>
        <Box
          sx={{
            background:     "linear-gradient(110deg, #1e3c72 0%, #2a5298 100%)",
            px:             { xs: 2.5, sm: 3 },
            py:             { xs: 2, sm: 2.25 },
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color:      "#fff",
              fontWeight: 700,
              fontSize:   { xs: "0.95rem", sm: "1.05rem" },
            }}
          >
            Delivery Boy Details
          </Typography>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              color:        "rgba(255,255,255,0.75)",
              borderRadius: "8px",
              p:            0.75,
              "&:hover":    { color: "#fff", background: "rgba(255,255,255,0.14)" },
            }}
          >
            <CloseIcon sx={{ fontSize: 19 }} />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* ── Body ── */}
      <DialogContent
        sx={{
          // tighter horizontal padding on xs to maximise usable width at 375px
          px:        { xs: 2, sm: 3 },
          pt:        { xs: "16px !important", sm: "20px !important" },
          pb:        { xs: 2, sm: 2.5 },
          overflowY: "auto",
          flex:      1,
          "&::-webkit-scrollbar":       { width: "4px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": { background: "#d1d5db", borderRadius: "4px" },
        }}
      >
        {/* ── Loading ── */}
        {loading && (
          <Box
            sx={{
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              justifyContent: "center",
              py:             6,
              gap:            2,
            }}
          >
            <CircularProgress size={34} sx={{ color: "#2a5298" }} />
            <Typography sx={{ color: "#64748b", fontSize: "0.83rem" }}>
              Loading details...
            </Typography>
          </Box>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <Box
            sx={{
              p:            2,
              borderRadius: "10px",
              background:   "#fff5f5",
              border:       "1px solid #fecaca",
              textAlign:    "center",
            }}
          >
            <Typography sx={{ color: "#dc2626", fontSize: "0.85rem" }}>{error}</Typography>
          </Box>
        )}

        {/* ── Content ── */}
        {!loading && boy && (
          <Box>

            {/* ── Profile Card ──
                Always ROW on every screen size:
                  avatar (48px xs / 64px sm) | name + chips
                mt:1 = small intentional breath below the dialog header.
            ── */}
            <Box
              sx={{
                display:       "flex",
                flexDirection: "row",        // ← always row, no column override
                alignItems:    "center",
                gap:           { xs: 1.5, sm: 2 },
                p:             { xs: 1.75, sm: 2.5 },
                borderRadius:  "14px",
                background:    "linear-gradient(135deg, #f8faff 0%, #eef4ff 100%)",
                border:        "1px solid #e0eaff",
                mt:            1,            // small breath, not the heavy mt:2
                mb:            { xs: 1.75, sm: 2.25 },
              }}
            >
              {/* Avatar */}
              <Avatar
                sx={{
                  width:      { xs: 48, sm: 64 },
                  height:     { xs: 48, sm: 64 },
                  bgcolor:    getAvatarColor(boy.name),
                  fontSize:   { xs: "1.2rem", sm: "1.65rem" },
                  fontWeight: 700,
                  flexShrink: 0,
                  boxShadow:  "0 4px 14px rgba(30,60,114,0.22)",
                }}
              >
                {boy.name?.charAt(0).toUpperCase()}
              </Avatar>

              {/* Name + badges — minWidth:0 prevents overflow past card edge */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontWeight:   700,
                    fontSize:     { xs: "0.92rem", sm: "1.1rem" },
                    color:        "#1e293b",
                    mb:           0.6,
                    overflow:     "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace:   "nowrap",
                  }}
                >
                  {boy.name}
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6 }}>
                  {/* Active / Inactive */}
                  <Chip
                    icon={
                      boy.is_active
                        ? <CheckCircleOutlineIcon sx={{ fontSize: "12px !important" }} />
                        : <CancelOutlinedIcon    sx={{ fontSize: "12px !important" }} />
                    }
                    label={boy.is_active ? "Active" : "Inactive"}
                    size="small"
                    sx={{
                      fontSize:   { xs: "0.68rem", sm: "0.72rem" },
                      fontWeight: 600,
                      height:     { xs: 22, sm: 24 },
                      background: boy.is_active ? "#dcfce7" : "#fee2e2",
                      color:      boy.is_active ? "#15803d" : "#dc2626",
                      border:     `1px solid ${boy.is_active ? "#bbf7d0" : "#fecaca"}`,
                      "& .MuiChip-icon": { color: boy.is_active ? "#15803d" : "#dc2626" },
                    }}
                  />

                  {/* Online status */}
                  {boy.status && (
                    <Chip
                      icon={<FiberManualRecordIcon sx={{ fontSize: "9px !important" }} />}
                      label={boy.status}
                      size="small"
                      sx={{
                        fontSize:   { xs: "0.68rem", sm: "0.72rem" },
                        fontWeight: 600,
                        height:     { xs: 22, sm: 24 },
                        background: statusColor(boy.status).bg,
                        color:      statusColor(boy.status).color,
                        border:     `1px solid ${statusColor(boy.status).color}30`,
                        "& .MuiChip-icon": { color: statusColor(boy.status).color },
                      }}
                    />
                  )}

                  {/* Availability */}
                  <Chip
                    label={boy.is_available ? "Available" : "Unavailable"}
                    size="small"
                    sx={{
                      fontSize:   { xs: "0.68rem", sm: "0.72rem" },
                      fontWeight: 600,
                      height:     { xs: 22, sm: 24 },
                      background: boy.is_available ? "#eff6ff" : "#f8fafc",
                      color:      boy.is_available ? "#1d4ed8" : "#94a3b8",
                      border:     `1px solid ${boy.is_available ? "#bfdbfe" : "#e2e8f0"}`,
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* ── Stats Tiles ── */}
            <Box
              sx={{
                display: "flex",
                gap:     { xs: 1.25, sm: 2 },
                mb:      { xs: 1.75, sm: 2.25 },
              }}
            >
              <StatTile
                icon={<LocalShippingOutlinedIcon />}
                label="Total Delivered"
                value={tiles.overall_delivered ?? "—"}
                color="#2a5298"
                bg="linear-gradient(135deg, #f0f4ff, #e8f0ff)"
              />
              <StatTile
                icon={<TodayIcon />}
                label="Delivered Today"
                value={tiles.today_delivered ?? "—"}
                color="#0891b2"
                bg="linear-gradient(135deg, #f0fbff, #e0f7fa)"
              />
            </Box>

            {/* ── Contact & Address ── */}
            <Box
              sx={{
                borderRadius: "14px",
                border:       "1px solid #e2e8f0",
                background:   "#fff",
                overflow:     "hidden",
              }}
            >
              {/* Section label */}
              <Box sx={{ px: { xs: 2, sm: 2.5 }, pt: { xs: 1.5, sm: 2 }, pb: 0.5 }}>
                <Typography
                  sx={{
                    fontSize:      "0.68rem",
                    fontWeight:    700,
                    color:         "#2a5298",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    mb:            0.5,
                  }}
                >
                  Contact & Address
                </Typography>
                <Divider sx={{ borderColor: "#e2e8f0" }} />
              </Box>

              {/* Info rows */}
              <Box sx={{ px: { xs: 2, sm: 2.5 }, pb: { xs: 1, sm: 1.5 } }}>
                <InfoRow
                  icon={<PhoneAndroidOutlinedIcon />}
                  label="Mobile Number"
                  value={boy.mobile_number}
                />
                <Divider sx={{ borderColor: "#f1f5f9" }} />
                <InfoRow
                  icon={<EmailOutlinedIcon />}
                  label="Email Address"
                  value={boy.email}
                />
                <Divider sx={{ borderColor: "#f1f5f9" }} />
                <InfoRow
                  icon={<LocationOnOutlinedIcon />}
                  label="Address"
                  value={[boy.address_line1, boy.address_line2].filter(Boolean).join(", ")}
                />
              </Box>
            </Box>

          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}