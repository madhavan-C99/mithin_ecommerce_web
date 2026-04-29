// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
//   Typography,
//   IconButton,
//   FormControl,
//   Select,
// //   OrderTable,
//   Dialog,
//   Chip,
// //   Orders,
//   MenuItem,
//   TextField
// } from "@mui/material";
// import { red } from "@mui/material/colors";

// const OrderInfo = ({order_info}) => {
    
//     const statusColors = {
// //   Success: "#4caf50",        // green
//   Pending: "#9e7c49",        // orange
//   Confirmed: "#61afef",      // blue
//   Cancelled: "#ee594e",      // red
//   Processing: "#c772d5",     // purple
//   Packed: "#5566c7",
//   Shipped: "#6fcdda",
//   Out_For_Delivery: "#5ac397",
//   Delivered: "#2e7d32"
// };

// const statusFlow = {
//   Pending: ["Confirmed", "Cancelled"],
//   Confirmed: ["Processing", "Cancelled"],
//   Processing: ["Packed", "Cancelled"],
//   Packed: ["Shipped"],
//   Shipped: ["Out_For_Delivery"],
//   Out_For_Delivery: ["Delivered"],
//   Delivered: [],
//   Cancelled: []
// };
//     return(
//         <>
//         <Box width={"100%"}>
//             <Paper
//             elevation={4}
//             sx={{
//                 p: 2,
        
//                 // borderRadius: 3,
//                 // background: "linear-gradient(135deg, #b7cae6, #444c56)"
//             }}
//             >
           
//            <Box  display="flex"  gap={5} marginBottom={2} >
//                 {/* ORDER NUMBER */}
//                 <Box display="flex" justifyContent="space-between">
//                     <Typography sx={{ fontWeight: 600, marginTop:0.5}}>
//                         Order Number :
//                     </Typography>
//                     <Typography  bgcolor={"#7ff190"} padding={0.5} fontSize={1} borderRadius={2} marginLeft={2} fontWeight={1000}>
//                         {order_info?.order_number.toUpperCase() || " - "}
//                     </Typography>
//                 </Box>

//                 {/* ORDER STATUS */}
//                 <Box display="flex" justifyContent="space-between">
//                     <Typography sx={{ fontWeight: 600 ,marginTop:0.5}}>
//                         Order Status :
//                     </Typography>
//                     <Typography  bgcolor={"#c2c4c3"} padding={0.5} fontSize={19} borderRadius={2} marginLeft={2} fontWeight={1000} >
//                         {order_info?.status || "-"}
                       
//                     </Typography>
//                 </Box>

//            </Box>

//             <Box display="flex"  gap={2} textAlign={"center"}>
                
//                 {/* ORDER DATE TIME  */}
//                 <Box display="flex" justifyContent="space-between">
//                 <Typography sx={{ fontWeight: 600 }}>
//                     Order Date Time :
//                 </Typography>
//                 <Typography  marginLeft={2}>
//                     {order_info?.order_date_time || " - "}
//                 </Typography>
//                 </Box>

//                 {/* UPDATE DATE TIME */}
//                 <Box display="flex" justifyContent="space-between">
//                 <Typography sx={{ fontWeight: 600 }}>
//                     Update Time : 
//                 </Typography >
//                   <Typography  marginLeft={2}>
//                     {order_info?.update_date_time || " - "}
//                 </Typography>
//                 </Box>

//             </Box>
//             </Paper>
//         </Box>

//         </>
//     )
// }
// export default OrderInfo











import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  IconButton,
  FormControl,
  Select,
  Dialog,
  Chip,
  MenuItem,
  TextField
} from "@mui/material";
import { red } from "@mui/material/colors";

const OrderInfo = ({ order_info }) => {

  // ── LOGIC: untouched ────────────────────────────────────────────────────────
  const statusColors = {
    Pending:          "#9e7c49",
    Confirmed:        "#61afef",
    Cancelled:        "#ee594e",
    Processing:       "#c772d5",
    Packed:           "#5566c7",
    Shipped:          "#6fcdda",
    Out_For_Delivery: "#5ac397",
    Delivered:        "#2e7d32"
  };

  const statusFlow = {
    Pending:          ["Confirmed", "Cancelled"],
    Confirmed:        ["Processing", "Cancelled"],
    Processing:       ["Packed", "Cancelled"],
    Packed:           ["Shipped"],
    Shipped:          ["Out_For_Delivery"],
    Out_For_Delivery: ["Delivered"],
    Delivered:        [],
    Cancelled:        []
  };
  // ── END LOGIC ────────────────────────────────────────────────────────────────


  return (
    <Box width="100%">
      <Paper
        elevation={4}
        sx={{ p: { xs: 1.5, sm: 2 } }}
      >

        {/* ── Row 1: Order Number + Order Status ── */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}   // stack on mobile
          gap={{ xs: 1, sm: 3, md: 5 }}
          mb={1.5}
          flexWrap="wrap"
        >

          {/* ORDER NUMBER */}
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "11px", sm: "12px", md: "13px" },
                whiteSpace: "nowrap",
              }}
            >
              Order Number :
            </Typography>
            <Typography
              sx={{
                bgcolor: "#7ff190",
                px: 1,
                py: 0.3,
                borderRadius: 2,
                fontWeight: 800,
                fontSize: { xs: "11px", sm: "12px", md: "13px" },  // was fontSize={1} (bug)
                whiteSpace: "nowrap",
              }}
            >
              {order_info?.order_number?.toUpperCase() || " - "}
            </Typography>
          </Box>

          {/* ORDER STATUS */}
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "11px", sm: "12px", md: "13px" },
                whiteSpace: "nowrap",
              }}
            >
              Order Status :
            </Typography>
            <Typography
              sx={{
                bgcolor: "#c2c4c3",
                px: 1,
                py: 0.3,
                borderRadius: 2,
                fontWeight: 800,
                fontSize: { xs: "11px", sm: "12px", md: "14px" },  // was hardcoded fontSize={19} (bug)
                whiteSpace: "nowrap",
              }}
            >
              {order_info?.status || "-"}
            </Typography>
          </Box>

        </Box>

        {/* ── Row 2: Order Date + Update Date ── */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}   // stack on mobile
          gap={{ xs: 0.8, sm: 2, md: 3 }}
          flexWrap="wrap"
        >

          {/* ORDER DATE TIME */}
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "10px", sm: "11px", md: "12px" },
                whiteSpace: "nowrap",
              }}
            >
              Order Date Time :
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "11px", md: "12px" },
                color: "text.secondary",
              }}
            >
              {order_info?.order_date_time || " - "}
            </Typography>
          </Box>

          {/* UPDATE DATE TIME */}
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "10px", sm: "11px", md: "12px" },
                whiteSpace: "nowrap",
              }}
            >
              Update Time :
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "11px", md: "12px" },
                color: "text.secondary",
              }}
            >
              {order_info?.update_date_time || " - "}
            </Typography>
          </Box>

        </Box>

      </Paper>
    </Box>
  );
};

export default OrderInfo;