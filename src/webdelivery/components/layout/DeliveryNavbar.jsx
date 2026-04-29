import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_WIDTH } from "./DeliverySideBar";

// Hardcoded for UI — will be replaced with auth context later
const MOCK_DELIVERY_BOY = {
  name: "Ravi Kumar",
  avatarUrl: "",          // empty → falls back to initials
  status: "online",       // "online" | "on_delivery" | "offline"
};

const STATUS_CONFIG = {
  online: {
    label: "Available",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.1)",
    textColor: "#15803D",
  },
  on_delivery: {
    label: "On Delivery",
    color: "#F97316",
    bg: "rgba(249,115,22,0.1)",
    textColor: "#C2410C",
  },
  offline: {
    label: "Offline",
    color: "#94A3B8",
    bg: "rgba(148,163,184,0.1)",
    textColor: "#475569",
  },
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const DeliveryNavbar = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const { name, avatarUrl, status } = MOCK_DELIVERY_BOY;
  const statusCfg = STATUS_CONFIG[status];

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    // logout logic wired later
    navigate("/delivery/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        ml: { md: `${SIDEBAR_WIDTH}px` },
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, md: 68 },
          px: { xs: 2, md: 3 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* ── Left: Hamburger (mobile) + Page title placeholder ── */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isMobile && (
            <IconButton
              onClick={onMenuClick}
              size="small"
              sx={{
                color: "#1E293B",
                mr: 0.5,
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                p: "6px",
              }}
            >
              <MenuRoundedIcon fontSize="small" />
            </IconButton>
          )}
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "#0F172A",
                fontWeight: 700,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.2,
              }}
            >
              SM VegMart
            </Typography>
            <Typography
              sx={{
                color: "#94A3B8",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                display: { xs: "none", sm: "block" },
              }}
            >
              Delivery Management Portal
            </Typography>
          </Box>
        </Box>

        {/* ── Right: Status + Avatar + Name ── */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

          {/* Status chip */}
          <Chip
            icon={
              <FiberManualRecordRoundedIcon
                sx={{ fontSize: "10px !important", color: `${statusCfg.color} !important` }}
              />
            }
            label={statusCfg.label}
            size="small"
            sx={{
              backgroundColor: statusCfg.bg,
              color: statusCfg.textColor,
              fontWeight: 600,
              fontSize: "0.72rem",
              height: 26,
              border: `1px solid ${statusCfg.color}30`,
              display: { xs: "none", sm: "flex" },
              "& .MuiChip-icon": { ml: "6px" },
            }}
          />

          {/* Avatar + Name + Dropdown */}
          <Tooltip title="Account options" arrow>
            <Box
              onClick={handleMenuOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                borderRadius: "10px",
                px: 1,
                py: 0.5,
                border: "1px solid #E2E8F0",
                "&:hover": { backgroundColor: "#F8FAFC" },
                transition: "background 0.2s",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={avatarUrl}
                  sx={{
                    width: 34,
                    height: 34,
                    backgroundColor: "#F97316",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                  }}
                >
                  {!avatarUrl && getInitials(name)}
                </Avatar>
                {/* Online dot */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: statusCfg.color,
                    border: "2px solid #FFFFFF",
                  }}
                />
              </Box>

              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Typography
                  sx={{
                    color: "#0F172A",
                    fontWeight: 600,
                    fontSize: "0.825rem",
                    lineHeight: 1.2,
                  }}
                >
                  {name}
                </Typography>
                <Typography
                  sx={{ color: "#94A3B8", fontSize: "0.7rem", lineHeight: 1 }}
                >
                  Delivery Agent
                </Typography>
              </Box>

              <KeyboardArrowDownRoundedIcon
                sx={{
                  color: "#94A3B8",
                  fontSize: 18,
                  display: { xs: "none", sm: "block" },
                }}
              />
            </Box>
          </Tooltip>
        </Box>
      </Toolbar>

      {/* ── Dropdown Menu ── */}
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            overflow: "visible",
          },
        }}
      >
        {/* Header inside menu */}
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography sx={{ fontWeight: 700, fontSize: "0.875rem", color: "#0F172A" }}>
            {name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.3 }}>
            <FiberManualRecordRoundedIcon sx={{ fontSize: 9, color: statusCfg.color }} />
            <Typography sx={{ fontSize: "0.75rem", color: statusCfg.textColor, fontWeight: 500 }}>
              {statusCfg.label}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#F1F5F9" }} />

        <MenuItem
          onClick={handleMenuClose}
          sx={{ py: 1.2, gap: 1.5, fontSize: "0.875rem", color: "#374151" }}
        >
          <PersonRoundedIcon fontSize="small" sx={{ color: "#94A3B8" }} />
          My Profile
        </MenuItem>

        <Divider sx={{ borderColor: "#F1F5F9" }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1.2,
            gap: 1.5,
            fontSize: "0.875rem",
            color: "#EF4444",
            "&:hover": { backgroundColor: "#FEF2F2" },
          }}
        >
          <LogoutRoundedIcon fontSize="small" sx={{ color: "#EF4444" }} />
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default DeliveryNavbar;