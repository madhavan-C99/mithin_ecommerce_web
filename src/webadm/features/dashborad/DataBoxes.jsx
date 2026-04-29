// // import React, { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Grid,
// //   Paper,
// //   Typography,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   CircularProgress
// // } from "@mui/material";
// // // import CountUp from "react-countup";
// // import { dashboradAPI } from "./dashboradAPI";

// // export default function DataBoxes() {

// //   const [filterType, setFilterType] = useState("year");
// //   const [loading, setLoading] = useState(false);

// //   const [dashboardData, setDashboardData] = useState({
// //     total_products: 0,
// //     total_revenue: 0,
// //     total_customers: 0,
// //     pending_orders: 0
// //   });

// //   // ---------------- SINGLE API CALL ----------------
// //   const fetchDashboard = async () => {
// //   try {
// //     setLoading(true);

// //     const response = await dashboradAPI.topcards(
// //      filterType);


// //     setDashboardData(response.data.data[0]);

// //     setLoading(false);

// //   } catch (error) {
// //     setLoading(false);
// //   }
// // };

// //   useEffect(() => {
// //     fetchDashboard();
// //   }, [filterType]);

// //   const cardStyle = {
// //   p: { xs: 2, sm: 3 },
// //   borderRadius: 3,
// //   boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
// //   height: { xs: 60, sm: 50, md: 100 },
// //   width: { xs: 80, sm: 100, md: 140, },
// //   display: "flex",
// //   flexDirection: "row",
// //   justifyContent: "center",
// //   alignItems: "center",
// //   textAlign: "center",
// //   transition: "0.3s",
// //   "&:hover": {
// //     transform: "translateY(-4px)",
// //     boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
// //   }
// // };

// //   const filterstyle={
// //               "& .MuiOutlinedInput-root": {
// //                 borderRadius: "30px",
// //                backgroundColor: "#FFFFFF",
// //                 transition: "0.3s"
// //               },
// //                  "& input::placeholder": {
// //       fontSize: {
// //         xs: "9px",
// //         sm: "12px",
// //         md: "14px",
// //         lg: "14px"
// //       },
// //       opacity: 0.5
// //     },
// //     "& .MuiSelect-select": {
// //       fontSize: {
// //         xs: "11px",
// //         sm: "12px",
// //         md: "13px",
// //         lg: "13px"
// //       },
// //       color: "#374151"
// //     },
// //           "& .MuiInputLabel-root": {
// //       fontSize: {
// //         xs: "12px",
// //         sm: "13px",
// //         md: "14px",
// //         lg: "14px"
// //       },
// //       color: "#6B7280",
// //       fontWeight: 500
// //     },
// //     color: "#84868a",
// //       fontSize: {
// //         xs: "10px",
// //         sm: "12px",
// //         md: "13px",
// //           lg: "13px"
// //           },
// //         fontWeight:600
// // }

// //   return (
// //     <Box sx={{ m: 3 }}>

// //       {/* FILTER DROPDOWN */}
// //       <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3}}>
// //         <FormControl size="small">
// //           <Select
// //             value={filterType}
// //             onChange={(e) => setFilterType(e.target.value)}
// //             sx={filterstyle}
// //           >
// //             <MenuItem value="year" sx={filterstyle}>Yearly</MenuItem>
// //             {/* <MenuItem value="all">All</MenuItem> */}
// //             <MenuItem value="today" sx={filterstyle}>Today</MenuItem>
// //             <MenuItem value="yesterday" sx={filterstyle}>Yesterday</MenuItem>
// //             <MenuItem value="weekly" sx={filterstyle}>Weekly</MenuItem>
// //             <MenuItem value="monthly" sx={filterstyle}>Monthly</MenuItem>
// //           </Select>
// //         </FormControl>
// //       </Box>

// //       {/* SUMMARY CARDS */}
// //       {/* <Grid container spacing={0} sx={{display:"flex", justifyContent:"space-evenly", alignItems:"center"}} > */}
// // <Grid
// //   container
// //   sx={{
// //     display: "grid",
// //     gridTemplateColumns: {
// //       xs: "1fr",           // mobile
// //       sm: "1fr 1fr 1fr",       // tablet
// //       md: "1fr 1fr 1fr 1fr",   // small laptop
// //       lg: "1fr 1fr 1fr 1fr" // desktop
// //     },
// //     gap: 3,
// //     rowGap:3,
// //     justifyContent:"center",
// //     alignItems: "center",

// //   }}
// // >

// //           <Paper sx={{ ...cardStyle, background: "#dae4f0", flexDirection: "column",height:"120px", alignItems:"center",textAlign:"center",width:'70%' }}>
// //             <Typography variant="h5" sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 ,marginBottom:2}}>
// //               Total Products
// //             </Typography>
// //             {loading ? (
// //               <CircularProgress size={24} />
// //             ) : (
// //               <Typography variant="h5" fontWeight="bold"  sx={{ fontSize: { xs: 20, md: 24 } }}>
// //                  {dashboardData.total_product || 0}
// //               </Typography>
// //             )}
// //           </Paper>
      

// //           <Paper sx={{ ...cardStyle, background: "#f0fdf4",height:"120px", flexDirection: "column",alignItems:"center",width:'70%'  }}>
// //             <Typography variant="h5" sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 ,marginBottom:2}}>
// //               Total Revenue
// //             </Typography>
// //             {loading ? (
// //               <CircularProgress size={24} />
// //             ) : (
// //               <Typography variant="h5" fontWeight="bold"  sx={{ fontSize: { xs: 20, md: 24 } }}>
// //                  ₹ {dashboardData.total_revenue || 0} 
// //               </Typography>
// //             )}
// //           </Paper>
        

// //           <Paper sx={{ ...cardStyle, background: "#fefce8",height:"120px",  flexDirection: "column",alignItems:"center",width:'70%'  }}>
// //             <Typography variant="h5" sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 ,marginBottom:2}}>
// //               Total Orders
// //             </Typography>
// //             {loading ? (
// //               <CircularProgress size={24} />
// //             ) : (
// //               <Typography variant="h5" fontWeight="bold"  sx={{ fontSize: { xs: 20, md: 24 } }}>
// //                 {dashboardData.total_orders || 0}
// //               </Typography>
// //             )}
// //           </Paper>

// //           <Paper sx={{ ...cardStyle, background: "#fef2f2",height:"120px",  flexDirection: "column",alignItems:"center",width:'70%'  }}>
// //             <Typography variant="h5" sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 ,marginBottom:2}}>
// //               New Orders
// //             </Typography>
// //             {loading ? (
// //               <CircularProgress size={24} />
// //             ) : (
// //               <Typography variant="h5" fontWeight="bold"  sx={{ fontSize: { xs: 20, md: 24 } }}>
// //                 {dashboardData.total_new_orders || 0}
// //               </Typography>
// //             )}
// //           </Paper>

// //       </Grid>

// //     </Box>
// //   );
// // }











// import React, { useEffect, useState, useRef } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
//   CircularProgress,
//   Popover,
//   Button,
// } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import dayjs from "dayjs";
// import { dashboradAPI } from "./dashboradAPI";

// export default function DataBoxes() {

//   const [filterType, setFilterType] = useState("year");
//   const [loading, setLoading] = useState(false);

//   const [dashboardData, setDashboardData] = useState({
//     total_products: 0,
//     total_revenue: 0,
//     total_customers: 0,
//     pending_orders: 0,
//   });

//   // ---------- Custom date state ----------
//   const [anchorEl, setAnchorEl] = useState(null);         // popover anchor
//   const [dateStep, setDateStep] = useState("start");       // "start" | "end"
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [customLabel, setCustomLabel] = useState("Custom Date");

//   // ---------- Existing API call (yearly / today / weekly etc.) ----------
//   const fetchDashboard = async () => {
//     try {
//       setLoading(true);
//       const response = await dashboradAPI.topcards(filterType);
//       setDashboardData(response.data.data[0]);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//     }
//   };

//   // ---------- NEW: Custom date range API call ----------
//   const fetchDashboardByDate = async (start, end) => {
//     try {
//       setLoading(true);
//       const response = await dashboradAPI.topcardsByDateRange(
//         start.format("YYYY-MM-DD"),
//         end ? end.format("YYYY-MM-DD") : null
//       );
//       setDashboardData(response.data.data[0]);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (filterType !== "custom") {
//       fetchDashboard();
//     }
//   }, [filterType]);

//   // ---------- Handlers ----------
//   const handleFilterChange = (e) => {
//     const value = e.target.value;
//     if (value === "custom") {
//       // don't fire API yet — wait for calendar selection
//       setFilterType("custom");
//     } else {
//       setFilterType(value);
//       // reset custom state when switching away
//       setStartDate(null);
//       setEndDate(null);
//       setCustomLabel("Custom Date");
//     }
//   };

//   const handleCustomMenuClick = (e) => {
//     // open calendar popover when "Custom Date" menu item is clicked
//     setAnchorEl(e.currentTarget);
//     setDateStep("start");
//     setStartDate(null);
//     setEndDate(null);
//   };

//   const handleDateSelect = (newValue) => {
//     if (dateStep === "start") {
//       setStartDate(newValue);
//       setEndDate(null);
//       setDateStep("end");                 // now ask user to pick end date
//     } else {
//       // end date must be >= start date
//       if (newValue.isBefore(startDate)) {
//         // if user picks an earlier date, treat it as new start
//         setStartDate(newValue);
//         setEndDate(null);
//         return;
//       }
//       setEndDate(newValue);
//       const label = `${startDate.format("DD MMM")} – ${newValue.format("DD MMM YY")}`;
//       setCustomLabel(label);
//       setAnchorEl(null);                  // close popover
//       fetchDashboardByDate(startDate, newValue);
//     }
//   };

//   const handleApplySingleDate = () => {
//     // user picked only start date and wants to apply without end date
//     if (!startDate) return;
//     const label = startDate.format("DD MMM YY");
//     setCustomLabel(label);
//     setAnchorEl(null);
//     fetchDashboardByDate(startDate, null);
//   };

//   // ---------- Styles (unchanged from your original) ----------
//   const cardStyle = {
//     p: { xs: 2, sm: 3 },
//     borderRadius: 3,
//     boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
//     height: { xs: 60, sm: 50, md: 100 },
//     width: { xs: 80, sm: 100, md: 140 },
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//     transition: "0.3s",
//     "&:hover": {
//       transform: "translateY(-4px)",
//       boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
//     },
//   };

//   const filterstyle = {
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "30px",
//       backgroundColor: "#FFFFFF",
//       transition: "0.3s",
//     },
//     "& input::placeholder": {
//       fontSize: { xs: "9px", sm: "12px", md: "14px", lg: "14px" },
//       opacity: 0.5,
//     },
//     "& .MuiSelect-select": {
//       fontSize: { xs: "11px", sm: "12px", md: "13px", lg: "13px" },
//       color: "#374151",
//     },
//     "& .MuiInputLabel-root": {
//       fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "14px" },
//       color: "#6B7280",
//       fontWeight: 500,
//     },
//     color: "#84868a",
//     fontSize: { xs: "10px", sm: "12px", md: "13px", lg: "13px" },
//     fontWeight: 600,
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box sx={{ m: 3 }}>

//         {/* FILTER DROPDOWN */}
//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
//           <FormControl size="small">
//             <Select
//               value={filterType}
//               onChange={handleFilterChange}
//               sx={filterstyle}
//               // render the custom label (date range) when custom is selected
//               renderValue={(value) =>
//                 value === "custom" ? customLabel : (
//                   { year: "Yearly", today: "Today", yesterday: "Yesterday", weekly: "Weekly", monthly: "Monthly" }[value]
//                 )
//               }
//             >
//               <MenuItem value="year" sx={filterstyle}>Yearly</MenuItem>
//               <MenuItem value="today" sx={filterstyle}>Today</MenuItem>
//               <MenuItem value="yesterday" sx={filterstyle}>Yesterday</MenuItem>
//               <MenuItem value="weekly" sx={filterstyle}>Weekly</MenuItem>
//               <MenuItem value="monthly" sx={filterstyle}>Monthly</MenuItem>

//               {/* NEW ↓ */}
//               <MenuItem
//                 value="custom"
//                 sx={filterstyle}
//                 onClick={handleCustomMenuClick}
//               >
//                 📅 Custom Date
//               </MenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         {/* CALENDAR POPOVER */}
//         <Popover
//           open={Boolean(anchorEl)}
//           anchorEl={anchorEl}
//           onClose={() => setAnchorEl(null)}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//           transformOrigin={{ vertical: "top", horizontal: "right" }}
//           PaperProps={{
//             sx: {
//               borderRadius: 3,
//               boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
//               p: 1,
//               minWidth: 320,
//             },
//           }}
//         >
//           {/* Instruction label */}
//           <Typography
//             sx={{
//               fontSize: 12,
//               fontWeight: 600,
//               color: "#6B7280",
//               textAlign: "center",
//               pt: 1,
//               pb: 0,
//             }}
//           >
//             {dateStep === "start"
//               ? "Select start date"
//               : `Start: ${startDate?.format("DD MMM YYYY")} — Now select end date`}
//           </Typography>

//           <DateCalendar
//             value={dateStep === "start" ? startDate : endDate}
//             onChange={handleDateSelect}
//             disableFuture
//             sx={{
//               "& .MuiPickersDay-root.Mui-selected": {
//                 backgroundColor: "#2563eb",
//               },
//               "& .MuiPickersDay-root:hover": {
//                 backgroundColor: "#dbeafe",
//               },
//             }}
//           />

//           {/* Show "Apply single date" button only after start is picked */}
//           {dateStep === "end" && (
//             <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, pb: 1.5, gap: 1 }}>
//               <Button
//                 size="small"
//                 variant="outlined"
//                 onClick={() => setAnchorEl(null)}
//                 sx={{ borderRadius: 2, fontSize: 12, textTransform: "none", borderColor: "#D1D5DB", color: "#6B7280" }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 size="small"
//                 variant="contained"
//                 onClick={handleApplySingleDate}
//                 sx={{ borderRadius: 2, fontSize: 12, textTransform: "none", backgroundColor: "#2563eb" }}
//               >
//                 Apply single date
//               </Button>
//             </Box>
//           )}
//         </Popover>

//         {/* SUMMARY CARDS — untouched */}
//         <Grid
//           container
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               sm: "1fr 1fr 1fr",
//               md: "1fr 1fr 1fr 1fr",
//               lg: "1fr 1fr 1fr 1fr",
//             },
//             gap: 3,
//             rowGap: 3,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Paper sx={{ ...cardStyle, background: "#dae4f0", flexDirection: "column", height: "120px", alignItems: "center", textAlign: "center", width: "70%" }}>
//             <Typography variant="h5" sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700, marginBottom: 2 }}>
//               Total Products
//             </Typography>
//             {loading ? <CircularProgress size={24} /> : (
//               <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: 20, md: 24 } }}>
//                 {dashboardData.total_product || 0}
//               </Typography>
//             )}
//           </Paper>

//           <Paper sx={{ ...cardStyle, background: "#f0fdf4", height: "120px", flexDirection: "column", alignItems: "center", width: "70%" }}>
//             <Typography variant="h5" sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700, marginBottom: 2 }}>
//               Total Revenue
//             </Typography>
//             {loading ? <CircularProgress size={24} /> : (
//               <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: 20, md: 24 } }}>
//                 ₹ {dashboardData.total_revenue || 0}
//               </Typography>
//             )}
//           </Paper>

//           <Paper sx={{ ...cardStyle, background: "#fefce8", height: "120px", flexDirection: "column", alignItems: "center", width: "70%" }}>
//             <Typography variant="h5" sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700, marginBottom: 2 }}>
//               Total Orders
//             </Typography>
//             {loading ? <CircularProgress size={24} /> : (
//               <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: 20, md: 24 } }}>
//                 {dashboardData.total_orders || 0}
//               </Typography>
//             )}
//           </Paper>

//           <Paper sx={{ ...cardStyle, background: "#fef2f2", height: "120px", flexDirection: "column", alignItems: "center", width: "70%" }}>
//             <Typography variant="h5" sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700, marginBottom: 2 }}>
//               New Orders
//             </Typography>
//             {loading ? <CircularProgress size={24} /> : (
//               <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: 20, md: 24 } }}>
//                 {dashboardData.total_new_orders || 0}
//               </Typography>
//             )}
//           </Paper>
//         </Grid>

//       </Box>
//     </LocalizationProvider>
//   );
// }














// ONLY UI CHANGED CODE

import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Button,
} from "@mui/material";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { dashboradAPI } from "./dashboradAPI";

export default function DataBoxes() {

  const [filterType, setFilterType]     = useState("year");
  const [loading, setLoading]           = useState(false);
  const [dashboardData, setDashboardData] = useState({
    total_products  : 0,
    total_revenue   : 0,
    total_customers : 0,
    pending_orders  : 0,
  });

  // ---------- Custom date state ----------
  const [anchorEl,    setAnchorEl]    = useState(null);
  const [dateStep,    setDateStep]    = useState("start");
  const [startDate,   setStartDate]   = useState(null);
  const [endDate,     setEndDate]     = useState(null);
  const [customLabel, setCustomLabel] = useState("Custom Date");

  // ---------- Existing API call ----------
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await dashboradAPI.topcards(filterType);
      setDashboardData(response.data.data[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // ---------- NEW: Custom date range API call ----------
  const fetchDashboardByDate = async (start, end) => {
    try {
      setLoading(true);
      const response = await dashboradAPI.topcardsByDateRange(
        start.format("YYYY-MM-DD"),
        end ? end.format("YYYY-MM-DD") : null
      );
      setDashboardData(response.data.data[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filterType !== "custom") {
      fetchDashboard();
    }
  }, [filterType]);

  // ---------- Handlers ----------
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
      fetchDashboardByDate(startDate, newValue);
    }
  };

  const handleApplySingleDate = () => {
    if (!startDate) return;
    const label = startDate.format("DD MMM YY");
    setCustomLabel(label);
    setAnchorEl(null);
    fetchDashboardByDate(startDate, null);
  };

  // ─────────────────────────────────────────────
  //  STYLES  (only sizing values changed)
  // ─────────────────────────────────────────────

  // Card: width and height now fully fluid — parent grid controls width
  const cardStyle = {
    borderRadius  : 3,
    boxShadow     : "0 5px 20px rgba(0,0,0,0.05)",
    width         : "100%",          // ← was "70%" — now fills grid cell
    height        : "auto",          // ← was fixed px — grows with content
    minHeight     : { xs: 90, sm: 100, md: 120 },
    p             : { xs: 2, sm: 2.5, md: 3 },
    display       : "flex",
    flexDirection : "column",
    justifyContent: "center",
    alignItems    : "center",
    textAlign     : "center",
    transition    : "0.3s",
    boxSizing     : "border-box",
    "&:hover"     : {
      transform : "translateY(-4px)",
      boxShadow : "0 8px 25px rgba(0,0,0,0.1)",
    },
  };

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

  // Card title responsive font
  const titleSx = {
    fontSize    : { xs: 12, sm: 14, md: 16, lg: 18 },
    fontWeight  : 700,
    marginBottom: { xs: 1, md: 2 },
    lineHeight  : 1.3,
  };

  // Card value responsive font
  const valueSx = {
    fontSize  : { xs: 18, sm: 20, md: 22, lg: 24 },
    fontWeight: "bold",
  };

  // Card definitions — keeps rendering DRY
  const cards = [
    { bg: "#dae4f0", label: "Total Products",  value: dashboardData.total_product     || 0 },
    { bg: "#f0fdf4", label: "Total Revenue",   value: `₹ ${dashboardData.total_revenue  || 0}` },
    { bg: "#fefce8", label: "Total Orders",    value: dashboardData.total_orders      || 0 },
    { bg: "#fef2f2", label: "New Orders",      value: dashboardData.total_new_orders  || 0 },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          mx: { xs: 0, sm: 1, md: 2 }, // ← was m:3 on all sides; now responsive horizontal margin
          mb: 3,
        }}
      >

        {/* FILTER DROPDOWN */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
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
              <MenuItem value="custom" sx={filterstyle} onClick={handleCustomMenuClick}>
                📅 Custom Date
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* CALENDAR POPOVER */}
        {/* <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow   : "0 8px 30px rgba(0,0,0,0.12)",
              p           : 1,
              minWidth    : { xs: 280, sm: 320 },  // ← narrower on xs so it fits screen
              maxWidth    : "95vw",
            },
          }}
        >
          <Typography
            sx={{
              fontSize  : 12,
              fontWeight: 600,
              color     : "#6B7280",
              textAlign : "center",
              pt        : 1,
              pb        : 0,
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
              "& .MuiPickersDay-root.Mui-selected": { backgroundColor: "#2563eb" },
              "& .MuiPickersDay-root:hover"        : { backgroundColor: "#dbeafe" },
            }}
          />

          {dateStep === "end" && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, pb: 1.5, gap: 1 }}>
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
        </Popover> */}





        {/* CALENDAR DIALOG */}
<Dialog
  open={Boolean(anchorEl)}
  onClose={() => setAnchorEl(null)}
  PaperProps={{
    sx: {
      borderRadius: 3,
      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
      p: 1,
      minWidth: 0,
      width: { xs: "92vw", sm: 360 },
      maxWidth: { xs: "92vw", sm: 360 },
      // minWidth: { xs: 300, sm: 360 },
      // maxWidth: "95vw",
    },
  }}
>
  <DialogTitle
    sx={{
      fontSize: 14,
      fontWeight: 700,
      color: "#1e3a5f",
      textAlign: "center",
      pb: 0,
    }}
  >
    📅 Select Custom Date
  </DialogTitle>

  <DialogContent sx={{ pb: 0, px: { xs: 0.5, sm: 1 } }}>
    <Typography
      sx={{
        fontSize: 12,
        fontWeight: 600,
        color: "#6B7280",
        textAlign: "center",
        pb: 0,
        pt: 1,
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
        "& .MuiPickersDay-root.Mui-selected": { backgroundColor: "#2563eb" },
        "& .MuiPickersDay-root:hover": { backgroundColor: "#dbeafe" },
        // ADD this inside the existing sx of DateCalendar
        width: "100%",
        "& .MuiPickersCalendarHeader-root": { px: 0 },
        "& .MuiDayCalendar-header": { justifyContent: "space-around" },
        "& .MuiDayCalendar-weekContainer": { justifyContent: "space-around" },
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




        {/* SUMMARY CARDS */}
        <Grid
          container
          sx={{
            display            : "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",           // 2 columns on mobile
              sm: "1fr 1fr",           // 2 columns on small tablet
              md: "1fr 1fr 1fr 1fr",   // 4 columns on md+
              lg: "1fr 1fr 1fr 1fr",
            },
            gap    : { xs: 1.5, sm: 2, md: 3 },
            rowGap : { xs: 1.5, sm: 2, md: 3 },
            width  : "100%",
          }}
        >
          {cards.map((card) => (
            <Paper key={card.label} sx={{ ...cardStyle, background: card.bg }}>
              <Typography variant="h5" sx={titleSx}>
                {card.label}
              </Typography>
              {loading
                ? <CircularProgress size={24} />
                : <Typography variant="h5" sx={valueSx}>{card.value}</Typography>
              }
            </Paper>
          ))}
        </Grid>

      </Box>
    </LocalizationProvider>
  );
}