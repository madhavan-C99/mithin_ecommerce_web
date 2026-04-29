
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
//   CircularProgress,
// } from "@mui/material";
// import { PieChart } from "@mui/x-charts";
// import { dashboradAPI } from "./dashboradAPI";


// import empty_box from '../../../assets/empty_box.gif'

// export default function CategoryPieChart() {
//   const [filterType, setFilterType] = useState("year");
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchChartData = async () => {
//     try {
//       setLoading(true);

//     const response = await dashboradAPI.categoryrevenue(filterType,);
//       const colors = [ "#ed6c02", "#80a882","#677b8f", "#9c27b0", "#d32f2f"];
//       const formatted = response.data.data
//         .filter((item) => item.total_revenue > 0)
//         .map((item, index) => ({
//           id: index,
//           value: item.total_revenue,
//           label: item.category_name,
//           color: colors[index % colors.length],
//         }));
//       setChartData(formatted);
//     } catch (error) {
//       console.error("Pie API Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchChartData();
//   }, [filterType]);

//   const totalRevenue = chartData.reduce(
//     (sum, item) => sum + item.value,
//     0
//   );



//   const filterstyle={
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "30px",
//                backgroundColor: "#FFFFFF",
//                 transition: "0.3s"
//               },
//                  "& input::placeholder": {
//       fontSize: {
//         xs: "9px",
//         sm: "12px",
//         md: "14px",
//         lg: "14px"
//       },
//       opacity: 0.5
//     },
//     "& .MuiSelect-select": {
//       fontSize: {
//         xs: "11px",
//         sm: "12px",
//         md: "13px",
//         lg: "13px"
//       },
//       color: "#374151"
//     },
//           "& .MuiInputLabel-root": {
//       fontSize: {
//         xs: "12px",
//         sm: "13px",
//         md: "14px",
//         lg: "14px"
//       },
//       color: "#6B7280",
//       fontWeight: 500
//     },
//     color: "#84868a",
//       fontSize: {
//         xs: "10px",
//         sm: "12px",
//         md: "13px",
//           lg: "13px"
//           },
//         fontWeight:600
// }

//   return (
//     <Box sx={{ width: "50%", }}>
//       {/* Header */}
//       {/* <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
          
//         }}
//       >
       
//       </Box> */}

//       {/* Chart Card */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: 3,
//           borderRadius: 3,
//           boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
//         }}
//       >
//         {/* ---------------- ---- */}
//         <Box sx={{display:"flex",justifyContent:"space-between"}}>
//            <Typography variant="h6" fontWeight="bold">
//               Revenue Distribution
//             </Typography>

//             <FormControl size="small">
//               <Select
//                 value={filterType}
//                 onChange={(e) => setFilterType(e.target.value)}
//                 sx={filterstyle}
//               >
//                 <MenuItem value="year" sx={filterstyle}>Yearly</MenuItem>
//                 <MenuItem value="today" sx={filterstyle}>Today</MenuItem>
//                 <MenuItem value="yesterday" sx={filterstyle}>Yesterday</MenuItem>
//                 <MenuItem value="weekly" sx={filterstyle}>Weekly</MenuItem>
//                 <MenuItem value="monthly" sx={filterstyle}>Monthly</MenuItem>
//               </Select>
//             </FormControl>
//         </Box>
//         {/* ----------------------- */}
//         {loading ? (
//           <Box textAlign="center">
//             <CircularProgress />
//           </Box>
//         ) : chartData.length === 0 ? (
//           <Typography align="center" color="text.secondary">
//                                <Box
//                                  display="flex"
//                                  flexDirection="column"
//                                  alignItems="center"
//                                  justifyContent="center"
//                                  height={280}
//                                  marginTop={5}
//                                  sx={{
//                                    opacity: 0.7
//                                  }}
//                                >
//                                  {/* Animation */}
//                                  <img
//                                    src={empty_box}
//                                    alt="orders not found"
//                                   //  width={"100%"}
//                                    height={"100%"}
//                                    style={{
//                                      animation: "float 2s ease-in-out infinite"
//                                    }}
//                                  />
           
//                                  <Typography mt={2} color="text.secondary">
//                                   Revenue Not Found 
//                                  </Typography>
           
//                                </Box>
//           </Typography>
//         ) : (
//           <Box position="relative">
//             <PieChart
//               height={320}
//               series={[
//                 {
//                   data: chartData,
//                   outerRadius: 140,
//                   innerRadius: 50, // donut style
//                   paddingAngle: 3,
//                   cornerRadius: 8,

//                   // category_img Animation logic (like your first example)
//                   highlightScope: {
//                     fade: "global",
//                     highlight: "item",
//                   },

//                   faded: {
//                     innerRadius: 40,
//                     additionalRadius: -20,
//                     color: "#d1d5db",
//                   },

//                   highlighted: {
//                     additionalRadius: 15,
//                   },

//                   // Percentage label inside arc
//                   arcLabel: (item) => {
//                     const percentage = (
//                       (item.value / totalRevenue) *
//                       100
//                     ).toFixed(0);
//                     return `${percentage}%`;
//                   },
//                 },
//               ]}
//               slotProps={{
//                 legend: {
//                   direction: "column",
//                   position: {
//                     vertical: "middle",
//                     horizontal: "right",
//                   },
//                 },
//               }}
//             />
//           </Box>
//         )}
//       </Paper>
//     </Box>
//   );
// }















// //  ONLY UI CHANGED CODE

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
//   CircularProgress,
// } from "@mui/material";
// import { PieChart } from "@mui/x-charts";
// import { dashboradAPI } from "./dashboradAPI";
// import empty_box from '../../../assets/empty_box.gif';

// export default function CategoryPieChart() {
//   const [filterType, setFilterType] = useState("year");
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchChartData = async () => {
//     try {
//       setLoading(true);

//       const response = await dashboradAPI.categoryrevenue(filterType);
//       const colors = ["#ed6c02", "#80a882", "#677b8f", "#9c27b0", "#d32f2f"];
//       const formatted = response.data.data
//         .filter((item) => item.total_revenue > 0)
//         .map((item, index) => ({
//           id: index,
//           value: item.total_revenue,
//           label: item.category_name,
//           color: colors[index % colors.length],
//         }));
//       setChartData(formatted);
//     } catch (error) {
//       console.error("Pie API Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchChartData();
//   }, [filterType]);

//   const totalRevenue = chartData.reduce((sum, item) => sum + item.value, 0);

//   const filterstyle = {
//     "& .MuiOutlinedInput-root": {
//       borderRadius     : "30px",
//       backgroundColor  : "#FFFFFF",
//       transition       : "0.3s",
//     },
//     "& input::placeholder": {
//       fontSize: { xs: "9px", sm: "12px", md: "14px", lg: "14px" },
//       opacity : 0.5,
//     },
//     "& .MuiSelect-select": {
//       fontSize: { xs: "11px", sm: "12px", md: "13px", lg: "13px" },
//       color   : "#374151",
//     },
//     "& .MuiInputLabel-root": {
//       fontSize  : { xs: "12px", sm: "13px", md: "14px", lg: "14px" },
//       color     : "#6B7280",
//       fontWeight: 500,
//     },
//     color    : "#84868a",
//     fontSize : { xs: "10px", sm: "12px", md: "13px", lg: "13px" },
//     fontWeight: 600,
//   };

//   return (
//     // ← width: "100%" fills the parent wrapper (was hardcoded 50%)
//     <Box sx={{ width: "100%", height: "100%", boxSizing: "border-box" }}>

//       <Paper
//         elevation={0}
//         sx={{
//           p           : { xs: 2, sm: 2.5, md: 3 },
//           borderRadius: 3,
//           boxShadow   : "0 5px 20px rgba(0,0,0,0.06)",
//           width       : "100%",
//           height      : "100%",
//           boxSizing   : "border-box",
//         }}
//       >
//         {/* Header row */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Typography
//             variant="h6"
//             fontWeight="bold"
//             sx={{ fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" } }}
//           >
//             Revenue Distribution
//           </Typography>

//           <FormControl size="small">
//             <Select
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value)}
//               sx={filterstyle}
//             >
//               <MenuItem value="year"      sx={filterstyle}>Yearly</MenuItem>
//               <MenuItem value="today"     sx={filterstyle}>Today</MenuItem>
//               <MenuItem value="yesterday" sx={filterstyle}>Yesterday</MenuItem>
//               <MenuItem value="weekly"    sx={filterstyle}>Weekly</MenuItem>
//               <MenuItem value="monthly"   sx={filterstyle}>Monthly</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         {/* Content */}
//         {loading ? (
//           <Box textAlign="center" mt={4}>
//             <CircularProgress />
//           </Box>
//         ) : chartData.length === 0 ? (
//           <Typography align="center" color="text.secondary">
//             <Box
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//               height={280}
//               marginTop={5}
//               sx={{ opacity: 0.7 }}
//             >
//               <img
//                 src={empty_box}
//                 alt="orders not found"
//                 height="100%"
//                 style={{ animation: "float 2s ease-in-out infinite" }}
//               />
//               <Typography mt={2} mb={3} color="text.secondary">
//                 Revenue Not Found
//               </Typography>
//             </Box>
//           </Typography>
//         ) : 
//         // (
//           // <Box position="relative" sx={{ width: "100%" }}>
//           //   <PieChart
//           //     height={320}
//           //     series={[
//           //       {
//           //         data        : chartData,
//           //         outerRadius : 140,
//           //         innerRadius : 50,
//           //         paddingAngle: 3,
//           //         cornerRadius: 8,
//           //         highlightScope: { fade: "global", highlight: "item" },
//           //         faded: {
//           //           innerRadius     : 40,
//           //           additionalRadius: -20,
//           //           color           : "#d1d5db",
//           //         },
//           //         highlighted: { additionalRadius: 15 },
//           //         arcLabel: (item) => {
//           //           const percentage = ((item.value / totalRevenue) * 100).toFixed(0);
//           //           return `${percentage}%`;
//           //         },
//           //       },
//           //     ]}
//           //     slotProps={{
//           //       legend: {
//           //         direction: "column",
//           //         position : { vertical: "middle", horizontal: "right" },
//           //       },
//           //     }}
//           //   />
//           // </Box>
//         // )}


//          (
//   <Box
//     position="relative"
//     sx={{
//       width: "100%",
//       overflowX: "hidden",   // ← prevents horizontal overflow clipping
//     }}
//   >
//     <PieChart
//       height={320}
//       // ← Remove fixed outerRadius, let it scale; or reduce it
//       series={[
//         {
//           data        : chartData,
//           outerRadius : 110,   // ← reduced from 140 to prevent clipping
//           innerRadius : 50,
//           paddingAngle: 3,
//           cornerRadius: 8,
//           highlightScope: { fade: "global", highlight: "item" },
//           faded: {
//             innerRadius     : 40,
//             additionalRadius: -20,
//             color           : "#d1d5db",
//           },
//           highlighted: { additionalRadius: 10 },  // ← reduced from 15
//           arcLabel: (item) => {
//             const percentage = ((item.value / totalRevenue) * 100).toFixed(0);
//             return `${percentage}%`;
//           },
//         },
//       ]}
//       slotProps={{
//         legend: {
//           direction: "column",
//           position : { vertical: "middle", horizontal: "right" },
//         },
//       }}
//     />
//   </Box>
// )}




//       </Paper>
//     </Box>
//   );
// }














import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { PieChart } from "@mui/x-charts";
import { dashboradAPI } from "./dashboradAPI";
import empty_box from '../../../assets/empty_box.gif';

export default function CategoryPieChart() {
  const [filterType, setFilterType] = useState("year");
  const [chartData, setChartData]   = useState([]);
  const [loading, setLoading]       = useState(false);

  // ---------- Custom date state (same pattern as DataBoxes) ----------
  const [anchorEl,    setAnchorEl]    = useState(null);
  const [dateStep,    setDateStep]    = useState("start");
  const [startDate,   setStartDate]   = useState(null);
  const [endDate,     setEndDate]     = useState(null);
  const [customLabel, setCustomLabel] = useState("Custom Date");

  // ---------- Standard filter API ----------
  const fetchChartData = async () => {
    try {
      setLoading(true);
      const response = await dashboradAPI.categoryrevenue(filterType);
      const formatted = formatResponse(response.data.data);
      setChartData(formatted);
    } catch (error) {
      console.error("Pie API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Custom date range API ----------
  const fetchChartDataByDate = async (start, end) => {
    try {
      setLoading(true);
      const response = await dashboradAPI.categoryrevenueByDateRange(
        start.format("YYYY-MM-DD"),
        end ? end.format("YYYY-MM-DD") : null
      );
      const formatted = formatResponse(response.data.data);
      setChartData(formatted);
    } catch (error) {
      console.error("Pie Date Range API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Shared formatter ----------
  const formatResponse = (data) => {
    const colors = ["#ed6c02", "#80a882", "#677b8f", "#9c27b0", "#d32f2f"];
    return data
      .filter((item) => item.total_revenue > 0)
      .map((item, index) => ({
        id   : index,
        value: item.total_revenue,
        label: item.category_name,
        color: colors[index % colors.length],
      }));
  };

  useEffect(() => {
    if (filterType !== "custom") {
      fetchChartData();
    }
  }, [filterType]);

  // ---------- Handlers (identical logic to DataBoxes) ----------
  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setFilterType("custom");
    } else {
      setFilterType(value);
      setStartDate(null);
      setEndDate(null);
      setCustomLabel("Custom Date");
    }
  };

  const handleCustomMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
    setDateStep("start");
    setStartDate(null);
    setEndDate(null);
  };

  const handleDateSelect = (newValue) => {
    if (dateStep === "start") {
      setStartDate(newValue);
      setEndDate(null);
      setDateStep("end");
    } else {
      if (newValue.isBefore(startDate)) {
        setStartDate(newValue);
        setEndDate(null);
        return;
      }
      setEndDate(newValue);
      const label = `${startDate.format("DD MMM")} – ${newValue.format("DD MMM YY")}`;
      setCustomLabel(label);
      setAnchorEl(null);
      fetchChartDataByDate(startDate, newValue);
    }
  };

  const handleApplySingleDate = () => {
    if (!startDate) return;
    const label = startDate.format("DD MMM YY");
    setCustomLabel(label);
    setAnchorEl(null);
    fetchChartDataByDate(startDate, null);
  };

  const totalRevenue = chartData.reduce((sum, item) => sum + item.value, 0);

  // ---------- Styles ----------
  const filterstyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius   : "30px",
      backgroundColor: "#FFFFFF",
      transition     : "0.3s",
    },
    "& input::placeholder": {
      fontSize: { xs: "9px", sm: "12px", md: "14px", lg: "14px" },
      opacity : 0.5,
    },
    "& .MuiSelect-select": {
      fontSize: { xs: "11px", sm: "12px", md: "13px", lg: "13px" },
      color   : "#374151",
    },
    "& .MuiInputLabel-root": {
      fontSize  : { xs: "12px", sm: "13px", md: "14px", lg: "14px" },
      color     : "#6B7280",
      fontWeight: 500,
    },
    color     : "#84868a",
    fontSize  : { xs: "10px", sm: "12px", md: "13px", lg: "13px" },
    fontWeight: 600,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: "100%", height: "100%", boxSizing: "border-box" }}>

        <Paper
          elevation={0}
          sx={{
            p           : { xs: 2, sm: 2.5, md: 3 },
            borderRadius: 3,
            boxShadow   : "0 5px 20px rgba(0,0,0,0.06)",
            width       : "100%",
            height      : "100%",
            boxSizing   : "border-box",
          }}
        >
          {/* Header row */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" } }}
            >
              Revenue Distribution
            </Typography>

            <FormControl size="small">
              <Select
                value={filterType}
                onChange={handleFilterChange}
                sx={filterstyle}
                renderValue={(value) =>
                  value === "custom"
                    ? customLabel
                    : ({ year: "Yearly", today: "Today", yesterday: "Yesterday", weekly: "Weekly", monthly: "Monthly" }[value])
                }
              >
                <MenuItem value="year"      sx={filterstyle}>Yearly</MenuItem>
                <MenuItem value="today"     sx={filterstyle}>Today</MenuItem>
                <MenuItem value="yesterday" sx={filterstyle}>Yesterday</MenuItem>
                <MenuItem value="weekly"    sx={filterstyle}>Weekly</MenuItem>
                <MenuItem value="monthly"   sx={filterstyle}>Monthly</MenuItem>

                {/* Custom Date — same as DataBoxes */}
                <MenuItem value="custom" sx={filterstyle} onClick={handleCustomMenuClick}>
                  📅 Custom Date
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* CALENDAR DIALOG — identical to DataBoxes */}
          <Dialog
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow   : "0 8px 30px rgba(0,0,0,0.12)",
                p           : 1,
                width       : { xs: "92vw", sm: 360 },
                maxWidth    : { xs: "92vw", sm: 360 },
              },
            }}
          >
            <DialogTitle
              sx={{
                fontSize  : 14,
                fontWeight: 700,
                color     : "#1e3a5f",
                textAlign : "center",
                pb        : 0,
              }}
            >
              📅 Select Custom Date
            </DialogTitle>

            <DialogContent sx={{ pb: 0, px: { xs: 0.5, sm: 1 } }}>
              <Typography
                sx={{
                  fontSize  : 12,
                  fontWeight: 600,
                  color     : "#6B7280",
                  textAlign : "center",
                  pb        : 0,
                  pt        : 1,
                }}
              >
                {dateStep === "start"
                  ? "Select start date"
                  : `Start: ${startDate?.format("DD MMM YYYY")} — Now select end date`}
              </Typography>

              <DateCalendar
                value={dateStep === "start" ? startDate : endDate}
                onChange={handleDateSelect}
                disableFuture
                sx={{
                  width: "100%",
                  "& .MuiPickersDay-root.Mui-selected": { backgroundColor: "#2563eb" },
                  "& .MuiPickersDay-root:hover"        : { backgroundColor: "#dbeafe" },
                  "& .MuiPickersCalendarHeader-root"   : { px: 0 },
                  "& .MuiDayCalendar-header"           : { justifyContent: "space-around" },
                  "& .MuiDayCalendar-weekContainer"    : { justifyContent: "space-around" },
                }}
              />

              {dateStep === "end" && (
                <Box sx={{ display: "flex", justifyContent: "flex-end", px: 1, pb: 1.5, gap: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setAnchorEl(null)}
                    sx={{ borderRadius: 2, fontSize: 12, textTransform: "none", borderColor: "#D1D5DB", color: "#6B7280" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleApplySingleDate}
                    sx={{ borderRadius: 2, fontSize: 12, textTransform: "none", backgroundColor: "#2563eb" }}
                  >
                    Apply single date
                  </Button>
                </Box>
              )}
            </DialogContent>
          </Dialog>

          {/* Content */}
          {loading ? (
            <Box textAlign="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : chartData.length === 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height={280}
              marginTop={5}
              sx={{ opacity: 0.7 }}
            >
              <img
                src={empty_box}
                alt="revenue not found"
                height="100%"
                style={{ animation: "float 2s ease-in-out infinite" }}
              />
              <Typography mt={2} mb={3} color="text.secondary">
                Revenue Not Found
              </Typography>
            </Box>
          ) : (
            <Box position="relative" sx={{ width: "100%", overflowX: "hidden" }}>
              <PieChart
                height={320}
                series={[
                  {
                    data          : chartData,
                    outerRadius   : 110,
                    innerRadius   : 50,
                    paddingAngle  : 3,
                    cornerRadius  : 8,
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                      innerRadius     : 40,
                      additionalRadius: -20,
                      color           : "#d1d5db",
                    },
                    highlighted: { additionalRadius: 10 },
                    arcLabel: (item) => {
                      const percentage = ((item.value / totalRevenue) * 100).toFixed(0);
                      return `${percentage}%`;
                    },
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: "column",
                    position : { vertical: "middle", horizontal: "right" },
                  },
                }}
              />
            </Box>
          )}

        </Paper>
      </Box>
    </LocalizationProvider>
  );
}