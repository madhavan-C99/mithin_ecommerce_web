

import React, { useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Chip,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { styled } from "@mui/material/styles";
import StepConnector from "@mui/material/StepConnector";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import CustomerDetails from "../components/orderview/CustomerDetails";
import ShippingInfo from "../components/orderview/ShippingInfo";
import ProductList from "../components/orderview/ProductList";

import { useReactToPrint } from "react-to-print";

const steps = ["Pending", "Confirmed", "Out For Delivery", "Delivered"];

const OrderViewPage = ({ close, select }) => {

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Order Details",
  });

  const status = select?.data?.order_info?.status || "Pending";

  const statusIndex = {
    Pending: 0,
    Confirmed: 1,
    OutForDelivery: 2,
    Delivered: 3,
  };

  const activeStep = statusIndex[status] ?? 0;

  // ── Connector ──────────────────────────────────────────────────────────
  const CustomConnector = styled(StepConnector)(() => ({
    "& .MuiStepConnector-line": {
      height: 3,
      border: 0,
      backgroundColor: "#E5E7EB",
      borderRadius: 1,
    },
    "&.Mui-active .MuiStepConnector-line": {
      backgroundColor: "#F97316",
    },
    "&.Mui-completed .MuiStepConnector-line": {
      backgroundColor: "#F97316",
    },
  }));

  // ── Step Icon ───────────────────────────────────────────────────────────
  const CustomStepIcon = styled("div")(({ ownerState }) => ({
    backgroundColor:
      ownerState.completed || ownerState.active ? "#F97316" : "#D1D5DB",
    color: "#fff",
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontWeight: 700,
    fontSize: 14,
  }));

  function StepIconComponent(props) {
    const { active, completed, icon } = props;
    return (
      <CustomStepIcon ownerState={{ active, completed }}>
        {completed || active ? (
          <CheckCircleIcon sx={{ fontSize: 18 }} />
        ) : (
          <span style={{ fontSize: 12, fontWeight: 700 }}>{icon}</span>
        )}
      </CustomStepIcon>
    );
  }

  return (
    // ✅ outer bg white — gray bg இல்லை
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        minHeight: "100%",
        overflowY: "auto",
        boxSizing: "border-box",
      }}
    >

      {/* ══════════════════════════════════════════
          HEADER — light orange bg, image-ல் இருக்கிற மாதிரி
      ══════════════════════════════════════════ */}
      <Box
        sx={{
          backgroundColor: "#FFF8F0",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 1.5, sm: 2 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        {/* Left: order number + ref */}
        <Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "6px",
                backgroundColor: "#F97316",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <InventoryIcon sx={{ color: "#fff", fontSize: 15 }} />
            </Box>
            <Typography
              fontWeight="bold"
              sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" } }}
            >
              {select.data.order_info.order_number}
            </Typography>

            <Chip
              label={select.data.order_info.payment_status ? "Paid" : "UnPaid"}
              size="small"
              sx={{
                fontSize: { xs: "10px", sm: "11px" },
                height: 20,
                backgroundColor: select.data.order_info.payment_status
                  ? "#dcfce7"
                  : "#fee2e2",
                color: select.data.order_info.payment_status
                  ? "#16a34a"
                  : "#dc2626",
                fontWeight: 700,
              }}
            />
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            flexWrap="wrap"
            gap={{ xs: 0.3, sm: 2 }}
            mt={{ xs: 0.5, sm: 1 }}
          >
            <Typography
              color="#0e1373"
              sx={{ fontSize: { xs: "10px", sm: "11px", md: "12px" } }}
            >
              Order time : {select.data.order_info.order_date_time}
            </Typography>
            <Typography
              color="#2e7d07"
              sx={{ fontSize: { xs: "10px", sm: "11px", md: "12px" } }}
            >
              Update time : {select.data.order_info.update_date_time}
            </Typography>
          </Box>
        </Box>

        {/* Right: Status chip + Print + Close */}
        <Box display="flex" alignItems="center" gap={1} flexShrink={0}>
          {/* Status badge — image-ல் இருக்கிற மாதிரி orange border */}
          <Chip
            label={status}
            size="small"
            sx={{
              fontSize: { xs: "11px", sm: "12px" },
              height: 26,
              border: "1.5px solid #F97316",
              backgroundColor: "transparent",
              color: "#F97316",
              fontWeight: 700,
            }}
            variant="outlined"
          />
          <IconButton onClick={handlePrint} sx={{ color: "#705dd4", p: 0.8 }}>
            <PrintIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={close} sx={{ color: "#d65d5d", p: 0.8 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

      </Box>

      <Divider sx={{ borderColor: "#F3F4F6" }} />

      {/* ══════════════════════════════════════════
          CONTENT — no extra bg, padding only
      ══════════════════════════════════════════ */}
      <Box
        ref={printRef}
        sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3 } }}
      >

        {/* ── Order Tracker — full width ── */}
        <Box sx={{ mb: 3 }}>
          <Stepper
            activeStep={activeStep}
            orientation="horizontal"
            alternativeLabel
            connector={<CustomConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={StepIconComponent}
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: { xs: "9px", sm: "12px" },
                      fontWeight: 600,
                      color: "#9CA3AF",
                      mt: 0.5,
                    },
                    "& .MuiStepLabel-label.Mui-active": {
                      color: "#F97316 !important",
                    },
                    "& .MuiStepLabel-label.Mui-completed": {
                      color: "#F97316 !important",
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Divider sx={{ borderColor: "#F3F4F6", mb: 3 }} />


        {/* ── Customer + Shipping 50/50 ── */}
<Grid container spacing={{ xs: 2, sm: 3 }} mb={3} gap={5} justifyContent="center">
  <Grid item xs={12} sm={6} md={5}>
    <Box display="flex" alignItems="center" gap={0.8} mb={1}>
      <PersonIcon sx={{ color: "#F97316", fontSize: 17 }} />
      <Typography
        fontWeight={700}
        fontSize={{ xs: "11px", sm: "13px" }}
        color="#374151"
      >
        Customer Details
      </Typography>
    </Box>
    <CustomerDetails customer={select.data.customer_details} />
  </Grid>

  <Grid item xs={12} sm={6} md={5}>
    <Box display="flex" alignItems="center" gap={0.8} mb={1}>
      <LocationOnIcon sx={{ color: "#F97316", fontSize: 17 }} />
      <Typography
        fontWeight={700}
        fontSize={{ xs: "11px", sm: "13px" }}
        color="#374151"
     
      >
        Shipping Info
      </Typography>
    </Box>
    <ShippingInfo shipping={select.data.shipping_address} />
  </Grid>
</Grid>

        <Divider sx={{ borderColor: "#F3F4F6",mt:10, mb: 4 }} />

        {/* ── Order Items — full width ── */}
        <Box>
          <Box display="flex" alignItems="center" gap={0.8} mb={1.5}>
            <InventoryIcon sx={{ color: "#F97316", fontSize: 17 }} />
            <Typography
              fontWeight={700}
              fontSize={{ xs: "11px", sm: "13px" }}
              color="#374151"
            >
              {select.data.product?.length || 0} ITEM
              {select.data.product?.length > 1 ? "S" : ""}
            </Typography>
          </Box>
          <ProductList product={select.data.product} />
        </Box>

      </Box>
    </Box>
  );
};

export default OrderViewPage;







// import React, { useRef } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Grid,
//   Paper,
//   Chip,
//   Divider
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";
// import PrintIcon from "@mui/icons-material/Print";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// import { styled } from "@mui/material/styles";
// import StepConnector from "@mui/material/StepConnector";

// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";

// import CustomerDetails from "../components/orderview/CustomerDetails";
// import ShippingInfo from "../components/orderview/ShippingInfo";
// import ProductList from "../components/orderview/ProductList";

// import { useReactToPrint } from "react-to-print";

// // ── LOGIC: untouched ──────────────────────────────────────────────────────────
// const steps = [
//   "Pending",
//   "Confirmed",
//   "Out for Delivered",
//   "Delivered"
// ];

// const OrderViewPage = ({ close, select }) => {

//   console.log(select.data[0]);

//   const printRef = useRef();

//   const handlePrint = useReactToPrint({
//     contentRef: printRef,
//     documentTitle: "Order Details"
//   });

//   const status = select?.data?.order_info?.status || "Confirmed";
//   console.log("status",status)

//   const statusIndex = {
//     Pending: 1,
//     Confirmed: 2,
//     OutforDelivered: 3,
//     Delivered: 4
//   };

//   const activeStep = statusIndex[status] ?? 0;

//   const CustomConnector = styled(StepConnector)(({ theme }) => ({
//     "& .MuiStepConnector-line": {
//       height: 20,
//       width: 2,
//       border: 0,
//       backgroundColor: "#e5e7eb",
//       borderRadius: 1
//     },
//     "&.Mui-active .MuiStepConnector-line": {
//       backgroundColor: "#6366f1"
//     },
//     "&.Mui-completed .MuiStepConnector-line": {
//       backgroundColor: "#74b961"
//     }
//   }));

//   const CustomStepIcon = styled("div")(({ ownerState }) => ({
//     backgroundColor: ownerState.completed
//       ? "#1cbb56"
//       : ownerState.active
//       ? "#6366f1"
//       : "#aab6ce",
//     color: "#fff",
//     width: 26,
//     height: 26,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: "50%",
//     fontWeight: 1000,
//   }));

//   function StepIconComponent(props) {
//     const { active, completed, icon } = props;
//     return (
//       <CustomStepIcon ownerState={{ active, completed }}>
//         {icon}
//       </CustomStepIcon>
//     );
//   }
//   // ── END OF LOGIC ─────────────────────────────────────────────────────────────


//   return (
//     <Box
//       sx={{
//         p: { xs: 1.5, sm: 2.5, md: 4 },
//         backgroundColor: "#f4f4f4",
//         minHeight: "100%",
//         overflowY: "auto",
//         boxSizing: "border-box",
//       }}
//     >

//       {/* ══════════════════════════════════════════
//           HEADER
//       ══════════════════════════════════════════ */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="flex-start"
//         mb={3}
//         p={{ xs: 1.5, sm: 2 }}
//         boxShadow={4}
//         borderRadius={2}
//         bgcolor="#ffffff"
//         sx={{ gap: 1 }}
//       >

//         {/* Left: Order number + payment chip + timestamps */}
//         <Box flex={1} minWidth={0}>

//           {/* Row 1: Order # + Paid chip */}
//           <Box
//             display="flex"
//             alignItems="center"
//             flexWrap="wrap"
//             gap={1}
//             mt={{ xs: 0.5, sm: 1 }}
//           >
//             <Typography
//               fontWeight="bold"
//               sx={{
//                 fontSize: { xs: "13px", sm: "15px", md: "17px" },
//                 whiteSpace: "nowrap",
//               }}
//             >
//               Order #{select.data.order_info.order_number}
//             </Typography>

//             <Chip
//               label={select.data.order_info.payment_status ? "Paid" : "UnPaid"}
//               sx={{
//                 fontSize: { xs: "10px", sm: "11px", md: "12px" },
//                 height: 22,
//                 backgroundColor: select.data.order_info.payment_status
//                   ? "#dcfce7"
//                   : "#fee2e2",
//                 color: select.data.order_info.payment_status
//                   ? "#16a34a"
//                   : "#dc2626",
//                 fontWeight: 800,
//               }}
//             />
//           </Box>

//           {/* Row 2: Timestamps — stacked on mobile, inline on sm+ */}
//           <Box
//             display="flex"
//             flexDirection={{ xs: "column", sm: "row" }}
//             flexWrap="wrap"
//             gap={{ xs: 0.3, sm: 2 }}
//             mt={{ xs: 0.5, sm: 1 }}
//           >
//             <Typography
//               color="#0e1373"
//               sx={{ fontSize: { xs: "10px", sm: "11px", md: "12px" } }}
//             >
//               Order time : {select.data.order_info.order_date_time}
//             </Typography>
//             <Typography
//               color="#2e7d07"
//               sx={{ fontSize: { xs: "10px", sm: "11px", md: "12px" } }}
//             >
//               Update time : {select.data.order_info.update_date_time}
//             </Typography>
//           </Box>

//         </Box>

//         {/* Right: Print + Close buttons */}
//         <Box display="flex" alignItems="center" flexShrink={0} mt={{ xs: 0, sm: 0.5 }}>
//           <IconButton onClick={handlePrint} sx={{ color: "#705dd4" }}>
//             <PrintIcon />
//           </IconButton>
//           <IconButton onClick={close} sx={{ color: "#d65d5d" }}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//       </Box>


//       {/* ══════════════════════════════════════════
//           MAIN CONTENT GRID
//           Desktop : [Left 8col] [Right stepper 4col]
//           Mobile  : [Left full] then [Stepper full] at bottom
//       ══════════════════════════════════════════ */}
//       <Grid container spacing={{ xs: 2, sm: 3 }}>

//         {/* ── LEFT SECTION (printable) ── */}
//         <Grid item xs={12} md={8} ref={printRef}>

//           {/* Customer + Shipping — side by side on md+, stacked on xs/sm */}
//           <Grid container spacing={{ xs: 2, sm: 3 }}>

//             <Grid item xs={12} sm={12} md={6}>
//               <CustomerDetails customer={select.data.customer_details} />
//             </Grid>

//             <Grid item xs={12} sm={12} md={6}>
//               <ShippingInfo shipping={select.data.shipping_address} />
//             </Grid>

//           </Grid>

//           {/* Order Items */}
//           <Box display="flex" alignItems="center" gap={1} mt={{ xs: 2.5, sm: 3 }} mb={1.5}>
//             <InventoryIcon color="primary" />
//             <Typography
//               variant="h6"
//               fontWeight="bold"
//               fontSize={{ xs: 15, sm: 17 }}
//             >
//               Order Items
//             </Typography>
//           </Box>

//           <ProductList product={select.data.product} />

//         </Grid>


//         {/* ── RIGHT SECTION: Order Tracker ──
//             On mobile (xs/sm): xs=12 → sits naturally BELOW left section (DOM order)
//             On desktop (md+): md=4 → right column beside left section
//         ── */}
//         <Grid item xs={12} md={4}>
//           <Box
//             sx={{
//               bgcolor: "#ffffff",
//               borderRadius: 3,
//               p: { xs: 2, sm: 2.5 },
//               boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
//               // On desktop: stay near top of right column
//               position: { md: "sticky" },
//               top: { md: 16 },
//             }}
//           >
//             <Typography
//               variant="subtitle1"
//               fontWeight="bold"
//               fontSize={{ xs: 13, sm: 14 }}
//               mb={2}
//             >
//               Order Track
//             </Typography>

//             <Box
//               display="flex"
//               justifyContent={{ xs: "flex-start", sm: "center", md: "flex-start" }}
//               pl={{ xs: 1, sm: 0 }}
//             >
//               <Stepper
//                 activeStep={activeStep}
//                 orientation="vertical"
//                 connector={<CustomConnector />}
//               >
//                 {steps.map((label) => (
//                   <Step key={label}>
//                     <StepLabel
//                       StepIconComponent={StepIconComponent}
//                       sx={{ fontSize: 13 }}
//                     >
//                       {label}
//                     </StepLabel>
//                   </Step>
//                 ))}
//               </Stepper>
//             </Box>
//           </Box>
//         </Grid>

//       </Grid>

//     </Box>
//   );
// };

// export default OrderViewPage;