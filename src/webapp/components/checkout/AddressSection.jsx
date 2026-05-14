

// components/checkout/AddressSection.jsx

import { Box, Typography, Button, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import { useState } from "react";
import AddressModal from "../checkout/AddressModal";

// ─────────────────────────────────────────────────────────────
// FIX 2: Import AddressDialog — this is the modal for ADDING a
// new address. AddressModal is for SELECTING from saved addresses.
// Earlier code had no onClick and no modal in the !address block,
// so the "Add Address" button did nothing.
// ─────────────────────────────────────────────────────────────
import AddressDialog from "../profile/AddressDialog";

const categoryMeta = {
  home: { icon: <HomeOutlinedIcon sx={{ fontSize: 13 }} />, label: "Home" },
  work: { icon: <BusinessOutlinedIcon sx={{ fontSize: 13 }} />, label: "Work" },
  other: { icon: <FmdGoodOutlinedIcon sx={{ fontSize: 13 }} />, label: "Other" },
};

/* ── shared card shell ── */
const Card = ({ children, sx = {} }) => (
  <Box
    sx={{
      mb: 2,
      backgroundColor: "#fff",
      borderRadius: "16px",
      border: "1px solid #e2ece2",
      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      overflow: "hidden",
      ...sx,
    }}
  >
    {children}
  </Box>
);

/* ── section label bar ── */
const SectionBar = ({ icon, label, action }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      px: 2.5,
      py: 1.4,
      borderBottom: "1px solid #eef4ee",
      backgroundColor: "#f7fbf7",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.9 }}>
      <Box sx={{ color: "#4CAF50", display: "flex" }}>{icon}</Box>
      <Typography
        fontSize={11}
        fontWeight={700}
        letterSpacing={1.1}
        color="#7a9a7a"
        sx={{ textTransform: "uppercase" }}
      >
        {label}
      </Typography>
    </Box>
    {action}
  </Box>
);

const AddressSection = ({ address, refresh }) => {
  // Modal for SELECTING from saved addresses (when address exists — "Change" button)
  const [changeOpen, setChangeOpen] = useState(false);

  // FIX 2: Modal for ADDING a new address (when no address — "Add Address" button)
  const [addOpen, setAddOpen] = useState(false);

  const meta =
    categoryMeta[address?.category?.toLowerCase()] ?? categoryMeta.other;

  // ── NO ADDRESS STATE ──────────────────────────────────────────
  if (!address) {
    return (
      <>
        <Card>
          <SectionBar
            icon={<LocationOnIcon sx={{ fontSize: 15 }} />}
            label="Delivering to"
          />
          <Box sx={{ px: 2.5, py: 2.5 }}>
            <Typography color="text.secondary" fontSize={14} sx={{ mb: 0.5 }}>
              No default address found.
            </Typography>
            <Typography color="text.secondary" fontSize={12.5} sx={{ mb: 2 }}>
              Please add an address to continue with your order.
            </Typography>

            {/* FIX 2: onClick now opens AddressDialog */}
            <Button
              size="small"
              variant="outlined"
              startIcon={<AddLocationAltOutlinedIcon sx={{ fontSize: "14px !important" }} />}
              onClick={() => setAddOpen(true)}
              sx={{
                color: "#4CAF50",
                borderColor: "#4CAF50",
                textTransform: "none",
                fontSize: 13,
                fontWeight: 600,
                borderRadius: "8px",
                px: 2,
                "&:hover": { backgroundColor: "#f1f8f1", borderColor: "#388e3c" },
              }}
            >
              Add Address
            </Button>
          </Box>
        </Card>

        {/* FIX 2: AddressDialog — for adding a brand new address */}
        <AddressDialog
          open={addOpen}
          onClose={() => setAddOpen(false)}
          onAddressAdded={() => {
            setAddOpen(false);
            refresh(); // re-fetches address + summary in CheckoutPage
          }}
        />
      </>
    );
  }

  // ── ADDRESS EXISTS STATE ──────────────────────────────────────
  return (
    <>
      <Card>
        {/* Header */}
        <SectionBar
          icon={<LocationOnIcon sx={{ fontSize: 15 }} />}
          label="Delivering to"
          action={
            <Button
              size="small"
              onClick={() => setChangeOpen(true)}
              startIcon={<EditOutlinedIcon sx={{ fontSize: "13px !important" }} />}
              sx={{
                color: "#4CAF50",
                fontSize: 12.5,
                fontWeight: 700,
                textTransform: "none",
                px: 1.2,
                py: 0.4,
                borderRadius: "8px",
                minWidth: "auto",
                "&:hover": { backgroundColor: "#edf7ed" },
              }}
            >
              Change
            </Button>
          }
        />

        {/* Body */}
        <Box sx={{ px: 2.5, py: 2.2 }}>
          {/* Name row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 0.8,
              mb: 1,
            }}
          >
            <Typography fontWeight={700} fontSize={15} color="#1a2e1a">
              {address.name}
            </Typography>
            <Typography fontSize={13} color="#8a9e8a">
              +91 {address.mobile}
            </Typography>

            {address.is_default && (
              <Chip
                label="Default"
                size="small"
                sx={{
                  height: 19,
                  fontSize: 10,
                  fontWeight: 700,
                  backgroundColor: "#e3f4e3",
                  color: "#2e7d32",
                  borderRadius: "6px",
                }}
              />
            )}

            <Chip
              icon={meta.icon}
              label={meta.label}
              size="small"
              sx={{
                height: 19,
                fontSize: 10,
                fontWeight: 600,
                backgroundColor: "#f4f4f4",
                color: "#666",
                borderRadius: "6px",
                "& .MuiChip-icon": { fontSize: 12, color: "#888", ml: "6px" },
              }}
            />
          </Box>

          {/* Address lines */}
          <Typography fontSize={13.5} color="#5a7a5a" sx={{ lineHeight: 1.75 }}>
            {address.address_line1}
            {address.address_line2 ? `, ${address.address_line2}` : ""}
            <br />
            {address.city}, {address.state} — {address.pincode}
          </Typography>

          {/* Landmark */}
          {address.landmark && (
            <Box
              sx={{
                mt: 1.2,
                display: "inline-flex",
                alignItems: "center",
                gap: 0.6,
                backgroundColor: "#f9f9f4",
                border: "1px solid #e8e8d8",
                borderRadius: "8px",
                px: 1.2,
                py: 0.5,
              }}
            >
              <Typography fontSize={12} color="#7a7a5a">
                📍 Near:
              </Typography>
              <Typography fontSize={12} fontWeight={600} color="#555">
                {address.landmark}
              </Typography>
            </Box>
          )}
        </Box>
      </Card>

      {/* AddressModal — for selecting from saved addresses ("Change" button) */}
      <AddressModal
        open={changeOpen}
        onClose={() => setChangeOpen(false)}
        refresh={refresh}
      />
    </>
  );
};

export default AddressSection;