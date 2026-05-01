// 📁 src/webdelivery/components/dashboard/StatCard.jsx

import { Box, Typography, Skeleton } from "@mui/material";

/**
 * StatCard
 *
 * Reusable dashboard tile.
 * Props:
 *   title   : string  — tile label
 *   value   : number  — stat value
 *   icon    : node    — MUI icon element
 *   color   : string  — accent color (hex)
 *   loading : boolean — shows skeleton while fetching
 */
const StatCard = ({ title, value, icon, color = "#F97316", loading = false }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        p: 3,
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Icon box */}
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: "14px",
          backgroundColor: `${color}15`,
          border: `1px solid ${color}25`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          "& svg": { color, fontSize: 26 },
        }}
      >
        {icon}
      </Box>

      {/* Text */}
      <Box>
        <Typography
          sx={{
            color: "#64748B",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            mb: 0.5,
          }}
        >
          {title}
        </Typography>

        {loading ? (
          <Skeleton variant="text" width={60} height={36} />
        ) : (
          <Typography
            sx={{
              color: "#0F172A",
              fontSize: "1.75rem",
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            {value ?? 0}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default StatCard;