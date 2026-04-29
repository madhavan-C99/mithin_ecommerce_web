// import {
//   Paper,
//   Box,
//   Typography,
//   MenuItem,
//   FormControl,
//   Select,
//   Grid,
//   CircularProgress,
// } from "@mui/material";

// import { useState, useEffect } from "react";

// //api
// import { orderAPI} from "../orderAPI.JS";


// const OrderTiles = () =>{
    
//     const [filterType, setFilterType] = useState("year");
//     const [loading, setLoading] = useState(false);
//     const [data , setData]= useState([]);

//     // ===============WEBSOCKET===============
//      useEffect(() => {
//         const socket = new WebSocket(
//           `${import.meta.env.VITE_WS_BASE_URL}/ws/order_top_tile/`
//         );
    
//         socket.onopen = () => {
//             console.log("websocket connect succesfully")
//           socket.send(JSON.stringify({"action":"order_tile"} ));
//         };

//         //  Here we us Optional Chain  
//         socket.onmessage = (event) => {
//             try {
//                 const parsedData = JSON.parse(event.data);
//                 console.log("data for order tile boxes", parsedData);

//                 setData(parsedData.payload?.[0] || {});
//             } catch (error) {
//                 console.error("Invalid JSON:", event.data);
//             }
//             };
    
//         return () => socket.close();
//       }, []);

//     //   FILTER
//     const fetchFilter = async () => {

//       try {
//         setLoading(true);
//         const response = await orderAPI.getfilterApi(filterType);

//         setData(response.data.data[0]);
//         setLoading(false);
    
//       } catch (error) {
//         console.error("Dashboard API Error:", error);
//         setLoading(false);
//       }
//     };
    
//       useEffect(() => {
//         fetchFilter();
//       }, [filterType]);

//     //   CARD DESIGN 
//  const cardStyle = {
//   p: { xs: 2, sm: 3 },
//   borderRadius: 3,
//   boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
//   height: { xs: 60, sm: 50, md: 100 },
//   width: { xs: 80, sm: 100, md: 140, },
//   display: "flex",
// //   flexDirection: "row",
//   justifyContent: "center",
//   alignItems: "center",
//   textAlign: "center",
//   transition: "0.3s",
//   "&:hover": {
//     transform: "translateY(-4px)",
//     boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
//   }
// };

//     const filterstyle={
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
      
//       return(
//         <>
//             <Box sx={{ mb: 5}}>

//                 {/* FILTER DROPDOWN */}
//                 <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
//                     <FormControl size="small">
//                     <Select
//                         value={filterType}
//                         onChange={(e) => setFilterType(e.target.value)}
//                         sx={filterstyle}
//                     >
//                         <MenuItem value="year" sx={filterstyle}>Yearly</MenuItem>
//                         {/* <MenuItem value="all">All</MenuItem> */}
//                         <MenuItem value="today" sx={filterstyle}>Today</MenuItem>
//                         <MenuItem value="yesterday" sx={filterstyle}>Yesterday</MenuItem>
//                         <MenuItem value="weekly" sx={filterstyle}>Weekly</MenuItem>
//                         <MenuItem value="monthly" sx={filterstyle}>Monthly</MenuItem>
//                     </Select>
//                     </FormControl>
//                 </Box>

//                 {/* SUMMARY CARDS */}
//                <Grid
//   container
//   sx={{
//     display: "grid",
//     gridTemplateColumns: {
//       xs: "1fr 1fr 1fr",           // mobile
//       sm: "1fr 1fr 1fr",       // tablet
//       md: "1fr 1fr 1fr 1fr",   // small laptop
//       lg: "1fr 1fr 1fr 1fr 1fr" // desktop
//     },
//     gap: 2,
//     rowGap:3,
//     justifyContent:"center",
//     alignItems: "center"
//   }}
// >

//   {/* TOTAL ORDER */}
//   <Paper
//     sx={{
//       ...cardStyle,
//       background: "#d9e1eb",
//     //   height: 100,
//       width: "70%",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       textAlign: "center"
//     }}
//   >
//     <Typography sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 }}>
//       Total Order
//     </Typography>

//     {loading ? (
//       <CircularProgress size={24} />
//     ) : (
//       <Typography fontWeight="bold" sx={{ fontSize: { xs: 20, md: 24 } }}>
//         {data.total_order}
//       </Typography>
//     )}
//   </Paper>

//   {/* NEW ORDER */}
//   <Paper
//     sx={{
//       ...cardStyle,
//       background: "#f0fdf4",
//     //   height: 100,
//       width: "70%",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       textAlign: "center"
//     }}
//   >
//     <Typography sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 }}>
//       New Order
//     </Typography>

//     {loading ? (
//       <CircularProgress size={24} />
//     ) : (
//       <Typography fontWeight="bold" sx={{ fontSize: { xs: 20, md: 24 } }}>
//         {data.new_orders}
//       </Typography>
//     )}
//   </Paper>

//   {/* COMPLETE ORDER */}
//   <Paper
//     sx={{
//       ...cardStyle,
//       background: "#fefce8",
//     //   height: 100,
//     //   width: "100%",
//      width: "70%",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       textAlign: "center"
//     }}
//   >
//     <Typography sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 }}>
//       Complete Order
//     </Typography>

//     {loading ? (
//       <CircularProgress size={24} />
//     ) : (
//       <Typography fontWeight="bold" sx={{ fontSize: { xs: 20, md: 24 } }}>
//         {data.completed_orders}
//       </Typography>
//     )}
//   </Paper>

//   {/* PENDING ORDER */}
//   <Paper
//     sx={{
//       ...cardStyle,
//       background: "#fef2f2",
//     //   height: 100,
//     //   width: "100%",
//      width: "70%",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       textAlign: "center"
//     }}
//   >
//     <Typography sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 }}>
//       Pending Order
//     </Typography>

//     {loading ? (
//       <CircularProgress size={24} />
//     ) : (
//       <Typography fontWeight="bold" sx={{ fontSize: { xs: 20, md: 24 } }}>
//         {data.pending_orders}
//       </Typography>
//     )}
//   </Paper>

//   {/* CANCELLED ORDER */}
//   <Paper
//     sx={{
//       ...cardStyle,
//       background: "#fafef2",
//     //   height: 100,
//     //   width: "100%",
//      width: "70%",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       textAlign: "center"
//     }}
//   >
//     <Typography sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 }}>
//       Cancelled Order
//     </Typography>

//     {loading ? (
//       <CircularProgress size={24} />
//     ) : (
//       <Typography fontWeight="bold" sx={{ fontSize: { xs: 20, md: 24 } }}>
//         {data.cancelled_orders}
//       </Typography>
//     )}
//   </Paper>

// </Grid>
//                 {/* </Grid> */}

//                 </Box>
//         </>   
//       );
// }
// export default OrderTiles











// import {
//   Paper,
//   Box,
//   Typography,
//   MenuItem,
//   FormControl,
//   Select,
//   Grid,
//   CircularProgress,
// } from "@mui/material";

// import { useState, useEffect } from "react";

// // api
// import { orderAPI } from "../orderAPI.JS";


// const OrderTiles = () => {

//   // ── LOGIC: untouched ────────────────────────────────────────────────────────
//   const [filterType, setFilterType] = useState("year");
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const socket = new WebSocket(
//       `${import.meta.env.VITE_WS_BASE_URL}/ws/order_top_tile/`
//     );
//     socket.onopen = () => {
//       console.log("websocket connect succesfully");
//       socket.send(JSON.stringify({ "action": "order_tile" }));
//     };
//     socket.onmessage = (event) => {
//       try {
//         const parsedData = JSON.parse(event.data);
//         console.log("data for order tile boxes", parsedData);
//         setData(parsedData.payload?.[0] || {});
//       } catch (error) {
//         console.error("Invalid JSON:", event.data);
//       }
//     };
//     return () => socket.close();
//   }, []);

//   const fetchFilter = async () => {
//     try {
//       setLoading(true);
//       const response = await orderAPI.getfilterApi(filterType);
//       setData(response.data.data[0]);
//       setLoading(false);
//     } catch (error) {
//       console.error("Dashboard API Error:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFilter();
//   }, [filterType]);
//   // ── END LOGIC ────────────────────────────────────────────────────────────────


//   // ── Card style — fixed: consistent sizing, fills grid cell ──────────────────
//   const cardStyle = {
//     width: "100%",                              // fills CSS grid cell fully
//     minHeight: { xs: 90, sm: 100, md: 110 },   // consistent height across breakpoints
//     p: { xs: 1.5, sm: 2, md: 2.5 },
//     borderRadius: 3,
//     boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//     transition: "0.3s",
//     "&:hover": {
//       transform: "translateY(-4px)",
//       boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
//     }
//   };

//   const filterstyle = {
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "30px",
//       backgroundColor: "#FFFFFF",
//       transition: "0.3s"
//     },
//     "& input::placeholder": {
//       fontSize: { xs: "9px", sm: "12px", md: "14px", lg: "14px" },
//       opacity: 0.5
//     },
//     "& .MuiSelect-select": {
//       fontSize: { xs: "11px", sm: "12px", md: "13px", lg: "13px" },
//       color: "#374151"
//     },
//     "& .MuiInputLabel-root": {
//       fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "14px" },
//       color: "#6B7280",
//       fontWeight: 500
//     },
//     color: "#84868a",
//     fontSize: { xs: "10px", sm: "12px", md: "13px", lg: "13px" },
//     fontWeight: 600
//   };

//   // ── Shared label + value Typography sx ──────────────────────────────────────
//   const labelSx = { fontSize: { xs: 12, sm: 13, md: 15 }, fontWeight: 700, lineHeight: 1.3 };
//   const valueSx = { fontSize: { xs: 22, sm: 24, md: 28 }, fontWeight: "bold", mt: 0.5 };


//   return (
//     <>
//       <Box sx={{ mb: 5 }}>

//         {/* ══════════════════════════════════════════
//             FILTER DROPDOWN
//         ══════════════════════════════════════════ */}
//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
//           <FormControl size="small">
//             <Select
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value)}
//               sx={filterstyle}
//             >
//               <MenuItem value="year" sx={filterstyle}>Yearly</MenuItem>
//               <MenuItem value="today" sx={filterstyle}>Today</MenuItem>
//               <MenuItem value="yesterday" sx={filterstyle}>Yesterday</MenuItem>
//               <MenuItem value="weekly" sx={filterstyle}>Weekly</MenuItem>
//               <MenuItem value="monthly" sx={filterstyle}>Monthly</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>


//         {/* ══════════════════════════════════════════
//             SUMMARY CARDS GRID
//             xs  : 2 columns  (2 × 3 layout)
//             sm  : 3 columns
//             md  : 4 columns
//             lg+ : 5 columns (all in one row)
//         ══════════════════════════════════════════ */}
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr 1fr",              // 2 cols → 2×3 layout for 5 cards
//               sm: "1fr 1fr 1fr",          // 3 cols
//               md: "1fr 1fr 1fr 1fr",      // 4 cols
//               lg: "1fr 1fr 1fr 1fr 1fr",  // 5 cols — all in one row
//             },
//             gap: { xs: 1.5, sm: 2, md: 2.5 },
//           }}
//         >

//           {/* TOTAL ORDER */}
//           <Paper sx={{ ...cardStyle, background: "#d9e1eb" }}>
//             <Typography sx={labelSx}>Total Order</Typography>
//             {loading ? (
//               <CircularProgress size={22} sx={{ mt: 0.5 }} />
//             ) : (
//               <Typography sx={valueSx}>{data.total_order}</Typography>
//             )}
//           </Paper>

//           {/* NEW ORDER */}
//           <Paper sx={{ ...cardStyle, background: "#f0fdf4" }}>
//             <Typography sx={labelSx}>New Order</Typography>
//             {loading ? (
//               <CircularProgress size={22} sx={{ mt: 0.5 }} />
//             ) : (
//               <Typography sx={valueSx}>{data.new_orders}</Typography>
//             )}
//           </Paper>

//           {/* COMPLETE ORDER */}
//           <Paper sx={{ ...cardStyle, background: "#fefce8" }}>
//             <Typography sx={labelSx}>Complete Order</Typography>
//             {loading ? (
//               <CircularProgress size={22} sx={{ mt: 0.5 }} />
//             ) : (
//               <Typography sx={valueSx}>{data.completed_orders}</Typography>
//             )}
//           </Paper>

//           {/* PENDING ORDER */}
//           <Paper sx={{ ...cardStyle, background: "#fef2f2" }}>
//             <Typography sx={labelSx}>Pending Order</Typography>
//             {loading ? (
//               <CircularProgress size={22} sx={{ mt: 0.5 }} />
//             ) : (
//               <Typography sx={valueSx}>{data.pending_orders}</Typography>
//             )}
//           </Paper>

//           {/* CANCELLED ORDER */}
//           <Paper sx={{ ...cardStyle, background: "#fafef2" }}>
//             <Typography sx={labelSx}>Cancelled Order</Typography>
//             {loading ? (
//               <CircularProgress size={22} sx={{ mt: 0.5 }} />
//             ) : (
//               <Typography sx={valueSx}>{data.cancelled_orders}</Typography>
//             )}
//           </Paper>

//         </Box>

//       </Box>
//     </>
//   );
// };

// export default OrderTiles;











// updations on custom date code 

import {
  Paper,
  Box,
  Typography,
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { orderAPI } from "../orderAPI.JS";


const OrderTiles = () => {

  // ── EXISTING LOGIC: untouched ─────────────────────────────────────────────
  const [filterType, setFilterType] = useState("year");
  const [loading, setLoading]       = useState(false);
  const [data, setData]             = useState({});

  // WebSocket — untouched
  useEffect(() => {
    const socket = new WebSocket(
      `${import.meta.env.VITE_WS_BASE_URL}/ws/order_top_tile/`
    );
    socket.onopen = () => {
      console.log("websocket connect succesfully");
      socket.send(JSON.stringify({ "action": "order_tile" }));
    };
    socket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        console.log("data for order tile boxes", parsedData);
        setData(parsedData.payload?.[0] || {});
      } catch (error) {
        console.error("Invalid JSON:", event.data);
      }
    };
    return () => socket.close();
  }, []);

  // Standard filter API — untouched
  const fetchFilter = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getfilterApi(filterType);
      setData(response.data.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Dashboard API Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filterType !== "custom") {
      fetchFilter();
    }
  }, [filterType]);
  // ── END EXISTING LOGIC ────────────────────────────────────────────────────


  // ── Custom date state (same pattern as DataBoxes) ─────────────────────────
  const [anchorEl,    setAnchorEl]    = useState(null);
  const [dateStep,    setDateStep]    = useState("start");
  const [startDate,   setStartDate]   = useState(null);
  const [endDate,     setEndDate]     = useState(null);
  const [customLabel, setCustomLabel] = useState("Custom Date");

  // Custom date range API
  const fetchFilterByDate = async (start, end) => {
    try {
      setLoading(true);
      const response = await orderAPI.filterByDateRange(
        start.format("YYYY-MM-DD"),
        end ? end.format("YYYY-MM-DD") : null
      );
      // note: this endpoint returns data as object (not array[0])
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Order Date Range API Error:", error);
      setLoading(false);
    }
  };

  // ── Handlers (identical logic to DataBoxes) ───────────────────────────────
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
      fetchFilterByDate(startDate, newValue);
    }
  };

  const handleApplySingleDate = () => {
    if (!startDate) return;
    const label = startDate.format("DD MMM YY");
    setCustomLabel(label);
    setAnchorEl(null);
    fetchFilterByDate(startDate, null);
  };


  // ── Styles ────────────────────────────────────────────────────────────────
  const cardStyle = {
    width    : "100%",
    minHeight: { xs: 90, sm: 100, md: 110 },
    p        : { xs: 1.5, sm: 2, md: 2.5 },
    borderRadius: 3,
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
    display      : "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems   : "center",
    textAlign    : "center",
    transition   : "0.3s",
    boxSizing    : "border-box",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
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

  const labelSx = {
    fontSize  : { xs: 12, sm: 13, md: 15 },
    fontWeight: 700,
    lineHeight: 1.3,
  };

  const valueSx = {
    fontSize  : { xs: 22, sm: 24, md: 28 },
    fontWeight: "bold",
    mt        : 0.5,
  };

  // Card definitions — DRY rendering
  // note: custom date range response uses same field names as filter API
  const cards = [
    { bg: "#d9e1eb", label: "Total Order",      value: data.total_order      ?? data.total_orders      ?? 0 },
    { bg: "#f0fdf4", label: "New Order",         value: data.new_orders       ?? 0 },
    { bg: "#fefce8", label: "Complete Order",    value: data.completed_orders ?? 0 },
    { bg: "#fef2f2", label: "Pending Order",     value: data.pending_orders   ?? 0 },
    { bg: "#fafef2", label: "Cancelled Order",   value: data.cancelled_orders ?? 0 },
  ];


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ mb: 5 }}>

        {/* ══════════════════════════════════════════
            FILTER DROPDOWN
        ══════════════════════════════════════════ */}
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

              {/* Custom Date — same as DataBoxes */}
              <MenuItem value="custom" sx={filterstyle} onClick={handleCustomMenuClick}>
                📅 Custom Date
              </MenuItem>
            </Select>
          </FormControl>
        </Box>


        {/* ══════════════════════════════════════════
            CALENDAR DIALOG — identical to DataBoxes
        ══════════════════════════════════════════ */}
        <Dialog
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow   : "0 8px 30px rgba(0,0,0,0.12)",
              p           : 1,
              minWidth    : 0,
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


        {/* ══════════════════════════════════════════
            SUMMARY CARDS GRID
            xs  : 2 columns
            sm  : 3 columns
            md  : 4 columns
            lg+ : 5 columns (all in one row)
        ══════════════════════════════════════════ */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              sm: "1fr 1fr 1fr",
              md: "1fr 1fr 1fr 1fr",
              lg: "1fr 1fr 1fr 1fr 1fr",
            },
            gap: { xs: 1.5, sm: 2, md: 2.5 },
          }}
        >
          {cards.map((card) => (
            <Paper key={card.label} sx={{ ...cardStyle, background: card.bg }}>
              <Typography sx={labelSx}>{card.label}</Typography>
              {loading ? (
                <CircularProgress size={22} sx={{ mt: 0.5 }} />
              ) : (
                <Typography sx={valueSx}>{card.value}</Typography>
              )}
            </Paper>
          ))}
        </Box>

      </Box>
    </LocalizationProvider>
  );
};

export default OrderTiles;