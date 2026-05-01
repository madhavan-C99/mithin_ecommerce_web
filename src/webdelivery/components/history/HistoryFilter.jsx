// 📁 src/webdelivery/components/history/HistoryFilter.jsx

import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Chip,
} from "@mui/material";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

/**
 * HistoryFilter
 *
 * Date range filter bar for order history.
 * Props:
 *   dateRange    : { from: string, to: string }
 *   setDateRange : function
 *   clearFilter  : function
 *   totalCount   : number — total unfiltered orders
 *   filteredCount: number — count after filter applied
 */

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#F8FAFC",
    fontSize: "0.875rem",
    "& fieldset": { borderColor: "#E2E8F0" },
    "&:hover fieldset": { borderColor: "#F97316" },
    "&.Mui-focused fieldset": { borderColor: "#F97316" },
  },
  "& input": { color: "#1E293B", py: "10px" },
  "& input[type='date']::-webkit-calendar-picker-indicator": {
    opacity: 0,
  },
};

const HistoryFilter = ({
  dateRange,
  setDateRange,
  clearFilter,
  totalCount = 0,
  filteredCount = 0,
}) => {
  const isFiltered = dateRange.from || dateRange.to;

  const handleChange = (field) => (e) => {
    setDateRange((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        p: { xs: 2, md: 2.5 },
        mb: 3,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          gap: 2,
        }}
      >
        {/* Label */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
          <FilterListRoundedIcon sx={{ color: "#F97316", fontSize: 20 }} />
          <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.875rem" }}>
            Filter by Date
          </Typography>
        </Box>

        {/* Date inputs */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { sm: "center" },
            gap: 1.5,
            flex: 1,
          }}
        >
          <TextField
            type="date"
            size="small"
            label="From"
            value={dateRange.from}
            onChange={handleChange("from")}
            InputLabelProps={{ shrink: true }}
            inputProps={{ max: dateRange.to || undefined }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayRoundedIcon sx={{ fontSize: 16, color: "#94A3B8" }} />
                </InputAdornment>
              ),
            }}
            sx={{ ...inputSx, minWidth: { xs: "100%", sm: 180 } }}
          />

          <Typography sx={{ color: "#94A3B8", fontSize: "0.8rem", flexShrink: 0 }}>
            to
          </Typography>

          <TextField
            type="date"
            size="small"
            label="To"
            value={dateRange.to}
            onChange={handleChange("to")}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: dateRange.from || undefined }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayRoundedIcon sx={{ fontSize: 16, color: "#94A3B8" }} />
                </InputAdornment>
              ),
            }}
            sx={{ ...inputSx, minWidth: { xs: "100%", sm: 180 } }}
          />

          {/* Clear button */}
          {isFiltered && (
            <Button
              onClick={clearFilter}
              size="small"
              startIcon={<CloseRoundedIcon fontSize="small" />}
              sx={{
                borderRadius: "8px",
                color: "#64748B",
                border: "1px solid #E2E8F0",
                px: 1.5,
                py: "7px",
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { backgroundColor: "#FEF2F2", borderColor: "#EF4444", color: "#EF4444" },
              }}
            >
              Clear
            </Button>
          )}
        </Box>

        {/* Result count */}
        <Box sx={{ flexShrink: 0 }}>
          {isFiltered ? (
            <Chip
              label={`${filteredCount} of ${totalCount} orders`}
              size="small"
              sx={{
                backgroundColor: "rgba(249,115,22,0.08)",
                color: "#C2410C",
                fontWeight: 600,
                fontSize: "0.75rem",
                border: "1px solid rgba(249,115,22,0.2)",
              }}
            />
          ) : (
            <Chip
              label={`${totalCount} total orders`}
              size="small"
              sx={{
                backgroundColor: "#F1F5F9",
                color: "#475569",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HistoryFilter;