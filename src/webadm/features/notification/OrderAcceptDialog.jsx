import {
  Dialog,
  Box,
  Typography,
  Chip,
  IconButton,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Paper,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import { useEffect, useState } from "react";
import { orderAPI } from "../ordermanagement/components/orderAPI";


// ── Constants ─────────────────────────────────────────────────────────────────

const STATUS_STEPS = ["Pending", "Confirmed", "Out_For_Delivery", "Delivered"];


// ── Reusable sub-components (local only) ──────────────────────────────────────

const SectionCard = ({ children, noPadding = false, dashed = false }) => (
  <Paper
    elevation={0}
    sx={{
      borderRadius: "12px",
      border: dashed
        ? "1.5px dashed rgba(46,125,50,0.45)"
        : "1px solid rgba(0,0,0,0.07)",
      overflow: "hidden",
      bgcolor: dashed ? "#f6fef6" : "#fff",
      ...(noPadding ? {} : { p: { xs: 2, sm: 2.5 } }),
    }}
  >
    {children}
  </Paper>
);

const SectionHeader = ({ icon, label }) => (
  <Box display="flex" alignItems="center" gap={1} mb={1.5}>
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: "7px",
        bgcolor: "#f0f4ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Typography
      fontWeight={700}
      fontSize={{ xs: 12, sm: 13 }}
      color="#1a1a2e"
      letterSpacing={0.2}
    >
      {label}
    </Typography>
  </Box>
);

const DetailRow = ({ label, value }) => (
  <Box display="flex" gap={0.5} mb={0.7} flexWrap="wrap">
    <Typography
      fontSize={{ xs: 11, sm: 12 }}
      color="#6B7280"
      sx={{ minWidth: 110, flexShrink: 0 }}
    >
      {label}
    </Typography>
    <Typography fontSize={{ xs: 11, sm: 12 }} color="#1a1a2e" fontWeight={500}>
      :&nbsp;{value || "—"}
    </Typography>
  </Box>
);


// ── Main Component ─────────────────────────────────────────────────────────────

const OrderAcceptDialog = ({
  open,
  onClose,
  notification,
  onConfirm,
  confirming,
  confirmError,
}) => {

  const [orderData, setOrderData]               = useState(null);
  const [deliveryBoys, setDeliveryBoys]         = useState([]);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState("");
  const [loading, setLoading]                   = useState(false);
  const [fetchError, setFetchError]             = useState("");

  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  // ── Fetch order + delivery boys when dialog opens ─────────────────────────
  useEffect(() => {
    if (!open || !notification) return;

    setSelectedDeliveryBoy("");
    setFetchError("");
    setOrderData(null);
    setLoading(true);

    Promise.all([
      orderAPI.getOrderById(notification.order_id),
      orderAPI.fetchAllDeliveryBoys(),
    ])
      .then(([orderRes, deliveryRes]) => {
        setOrderData(orderRes.data.data);
        setDeliveryBoys(deliveryRes.data.data || []);
      })
      .catch((err) => {
        console.error("OrderAcceptDialog fetch error:", err);
        setFetchError("Failed to load order details. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [open, notification]);


  // ── Derived values ────────────────────────────────────────────────────────
  const activeStep = orderData
    ? STATUS_STEPS.findIndex(
        (s) => s.toLowerCase() === orderData.order_info?.status?.toLowerCase()
      )
    : -1;

  const mapAddress = orderData
    ? [
        orderData.shipping_address?.address_line1,
        orderData.shipping_address?.address_line2,
        orderData.shipping_address?.city,
      ]
        .filter(Boolean)
        .join(", ")
    : "";

  const mapSrc = mapAddress
    ? `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed&zoom=15`
    : "";


  const handleConfirm = () => {
    if (!selectedDeliveryBoy || confirming) return;
    onConfirm(notification, selectedDeliveryBoy);
  };


  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius:  { xs: 0, sm: "16px" },
          maxHeight:     { xs: "100vh", sm: "92vh" },
          m:             { xs: 0, sm: 2 },
          overflow:      "hidden",
          display:       "flex",
          flexDirection: "column",
          boxShadow:     "0 24px 64px rgba(0,0,0,0.15)",
        },
      }}
    >

      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
      <Box sx={{ flexShrink: 0 }}>

        {/* Accent strip */}
        <Box
          sx={{
            height: 4,
            background:
              "linear-gradient(90deg, #1a3c5e 0%, #2e7d32 50%, #1a3c5e 100%)",
          }}
        />

        {/* Header content */}
        <Box
          sx={{
            px:             { xs: 2.5, sm: 3.5 },
            pt:             { xs: 2, sm: 2.5 },
            pb:             2,
            bgcolor:        "#fff",
            display:        "flex",
            alignItems:     "flex-start",
            justifyContent: "space-between",
            gap:            2,
            borderBottom:   "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Box>
            {/* Order number + payment badge */}
            <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
              <Typography
                fontWeight={800}
                fontSize={{ xs: 17, sm: 21 }}
                color="#1a1a2e"
                letterSpacing={-0.3}
              >
                Order&nbsp;#
                {orderData?.order_info?.order_number || (loading ? "…" : "—")}
              </Typography>

              {orderData && (
                <Chip
                  label={
                    orderData.order_info?.payment_status ? "Paid" : "Unpaid"
                  }
                  size="small"
                  sx={{
                    bgcolor: orderData.order_info?.payment_status
                      ? "#dcfce7"
                      : "#fee2e2",
                    color: orderData.order_info?.payment_status
                      ? "#16a34a"
                      : "#dc2626",
                    fontWeight: 700,
                    fontSize:   { xs: 10, sm: 11 },
                    height:     22,
                  }}
                />
              )}
            </Box>

            {/* Timestamps */}
            {orderData && (
              <Box
                display="flex"
                gap={{ xs: 1.5, sm: 3 }}
                flexWrap="wrap"
                mt={0.5}
              >
                <Typography
                  fontSize={{ xs: 10, sm: 11 }}
                  color="#2e7d32"
                  fontWeight={500}
                >
                  Order time:&nbsp;{orderData.order_info?.order_date_time}
                </Typography>
                <Typography
                  fontSize={{ xs: 10, sm: 11 }}
                  color="#f57c00"
                  fontWeight={500}
                >
                  Update time:&nbsp;{orderData.order_info?.update_date_time}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Close button */}
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              bgcolor:    "#f5f5f5",
              borderRadius: "8px",
              flexShrink: 0,
              "&:hover":  { bgcolor: "#ffebee", color: "#d32f2f" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>


      {/* ══════════════════════════════════════════
          SCROLLABLE BODY
      ══════════════════════════════════════════ */}
      <Box
        sx={{
          flex:      1,
          overflowY: "auto",
          px:        { xs: 2, sm: 3 },
          py:        { xs: 2, sm: 2.5 },
          bgcolor:   "#f5f6fa",
          "&::-webkit-scrollbar":        { width: 4 },
          "&::-webkit-scrollbar-track":  { bgcolor: "transparent" },
          "&::-webkit-scrollbar-thumb":  {
            bgcolor:      "rgba(0,0,0,0.15)",
            borderRadius: 2,
          },
        }}
      >

        {/* Loading state */}
        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={280}
          >
            <CircularProgress size={36} sx={{ color: "#1a3c5e" }} />
          </Box>
        )}

        {/* Fetch error */}
        {fetchError && !loading && (
          <Alert severity="error" sx={{ borderRadius: "10px" }}>
            {fetchError}
          </Alert>
        )}

        {/* Confirm error (from parent) */}
        {confirmError && (
          <Alert severity="error" sx={{ borderRadius: "10px", mb: 2 }}>
            {confirmError}
          </Alert>
        )}

        {/* ── Main content ── */}
        {orderData && !loading && (
          <Box display="flex" flexDirection="column" gap={2}>


            {/* ──────────────────────────────────────
                1. Customer Details + Shipping Address
            ────────────────────────────────────── */}
            <Grid container spacing={2}>

              {/* Customer Details */}
              <Grid item xs={12} sm={6}>
                <SectionCard>
                  <SectionHeader
                    icon={
                      <PersonOutlineIcon sx={{ fontSize: 15, color: "#1a3c5e" }} />
                    }
                    label="Customer Details"
                  />
                  <DetailRow
                    label="Customer Name"
                    value={orderData.customer_details?.customer_name}
                  />
                  <DetailRow
                    label="Mobile"
                    value={orderData.customer_details?.mobile}
                  />
                  <DetailRow
                    label="Email"
                    value={orderData.customer_details?.email}
                  />
                </SectionCard>
              </Grid>

              {/* Shipping Address */}
              <Grid item xs={12} sm={6}>
                <SectionCard>
                  <SectionHeader
                    icon={
                      <LocationOnOutlinedIcon
                        sx={{ fontSize: 15, color: "#1a3c5e" }}
                      />
                    }
                    label="Shipping Address"
                  />
                  <DetailRow
                    label="Address Line 1"
                    value={orderData.shipping_address?.address_line1}
                  />
                  <DetailRow
                    label="Address Line 2"
                    value={orderData.shipping_address?.address_line2}
                  />
                  <DetailRow
                    label="Address Type"
                    value={orderData.shipping_address?.address_type}
                  />
                  <DetailRow
                    label="City"
                    value={orderData.shipping_address?.city}
                  />
                  <DetailRow
                    label="Mobile"
                    value={orderData.shipping_address?.mobile}
                  />
                </SectionCard>
              </Grid>
            </Grid>


            {/* ──────────────────────────────────────
                2. Customer Location (Google Maps iframe)
            ────────────────────────────────────── */}
            <SectionCard noPadding>
              <Box sx={{ px: { xs: 2, sm: 2.5 }, pt: 2, pb: 1.5 }}>
                <SectionHeader
                  icon={
                    <LocationOnOutlinedIcon
                      sx={{ fontSize: 15, color: "#1a3c5e" }}
                    />
                  }
                  label="Customer Location"
                />
              </Box>
              <Box sx={{ height: { xs: 180, sm: 220 } }}>
                {mapSrc ? (
                  <iframe
                    title="Customer Location"
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: "none", display: "block" }}
                    loading="lazy"
                    allowFullScreen
                  />
                ) : (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                    bgcolor="#f5f6fa"
                  >
                    <Typography color="text.disabled" fontSize={13}>
                      Location unavailable
                    </Typography>
                  </Box>
                )}
              </Box>
            </SectionCard>


            {/* ──────────────────────────────────────
                3. Order Track Stepper
            ────────────────────────────────────── */}
            <SectionCard>
              <SectionHeader
                icon={
                  <LocalShippingOutlinedIcon
                    sx={{ fontSize: 15, color: "#1a3c5e" }}
                  />
                }
                label="Order Track"
              />

              {isMobile ? (

                /* ── Vertical stepper (mobile) ── */
                <Box>
                  {STATUS_STEPS.map((step, index) => {
                    const isCompleted = index <= activeStep;
                    const isActive    = index === activeStep;
                    return (
                      <Box key={step}>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Box
                            sx={{
                              width:        28,
                              height:       28,
                              borderRadius: "50%",
                              bgcolor:      isCompleted ? "#2e7d32" : "#e0e0e0",
                              display:      "flex",
                              alignItems:   "center",
                              justifyContent: "center",
                              flexShrink:   0,
                              boxShadow:    isActive
                                ? "0 0 0 4px rgba(46,125,50,0.2)"
                                : "none",
                            }}
                          >
                            <Typography
                              fontSize={11}
                              fontWeight={700}
                              color="#fff"
                            >
                              {index + 1}
                            </Typography>
                          </Box>
                          <Typography
                            fontSize={12}
                            fontWeight={isActive ? 700 : 500}
                            color={isCompleted ? "#2e7d32" : "#9e9e9e"}
                          >
                            {step.replace(/_/g, " ")}
                          </Typography>
                        </Box>

                        {/* Vertical connector */}
                        {index < STATUS_STEPS.length - 1 && (
                          <Box
                            sx={{
                              width:   2,
                              height:  20,
                              bgcolor: index < activeStep ? "#2e7d32" : "#e0e0e0",
                              ml:      "13px",
                              my:      "2px",
                            }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>

              ) : (

                /* ── Horizontal stepper (desktop) ── */
                <Box display="flex" alignItems="flex-start">
                  {STATUS_STEPS.map((step, index) => {
                    const isCompleted = index <= activeStep;
                    const isActive    = index === activeStep;
                    return (
                      <Box
                        key={step}
                        display="flex"
                        alignItems="flex-start"
                        sx={{
                          flex: index < STATUS_STEPS.length - 1 ? 1 : "none",
                        }}
                      >
                        {/* Circle + label */}
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          gap={0.6}
                          sx={{ minWidth: 72 }}
                        >
                          <Box
                            sx={{
                              width:        32,
                              height:       32,
                              borderRadius: "50%",
                              bgcolor:      isCompleted ? "#2e7d32" : "#e0e0e0",
                              display:      "flex",
                              alignItems:   "center",
                              justifyContent: "center",
                              boxShadow:    isActive
                                ? "0 0 0 4px rgba(46,125,50,0.2)"
                                : "none",
                              transition:   "all 0.3s",
                            }}
                          >
                            <Typography
                              fontSize={12}
                              fontWeight={700}
                              color="#fff"
                            >
                              {index + 1}
                            </Typography>
                          </Box>
                          <Typography
                            fontSize={10}
                            fontWeight={isActive ? 700 : 500}
                            color={isCompleted ? "#2e7d32" : "#9e9e9e"}
                            sx={{ textAlign: "center", lineHeight: 1.3 }}
                          >
                            {step.replace(/_/g, " ")}
                          </Typography>
                        </Box>

                        {/* Horizontal connector */}
                        {index < STATUS_STEPS.length - 1 && (
                          <Box
                            sx={{
                              flex:       1,
                              height:     2,
                              bgcolor:    index < activeStep ? "#2e7d32" : "#e0e0e0",
                              mt:         "15px",   // vertically centres with 32px circle
                              transition: "background-color 0.3s",
                            }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
              )}
            </SectionCard>


            {/* ──────────────────────────────────────
                4. Order Items Table
            ────────────────────────────────────── */}
            <SectionCard noPadding>
              <Box sx={{ px: { xs: 2, sm: 2.5 }, pt: 2, pb: 1 }}>
                <SectionHeader
                  icon={
                    <ShoppingBagOutlinedIcon
                      sx={{ fontSize: 15, color: "#1a3c5e" }}
                    />
                  }
                  label="Order Items"
                />
              </Box>

              <TableContainer
                sx={{
                  "&::-webkit-scrollbar":        { height: 4 },
                  "&::-webkit-scrollbar-thumb":  {
                    bgcolor:      "rgba(0,0,0,0.15)",
                    borderRadius: 2,
                  },
                }}
              >
                <Table size="small" sx={{ minWidth: 420 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#f8fafc" }}>
                      {[
                        "S.No",
                        "Product Name",
                        "Unit Price (₹)",
                        "Weight",
                        "Qty",
                        "Total (₹)",
                      ].map((h) => (
                        <TableCell
                          key={h}
                          sx={{
                            fontWeight:  700,
                            fontSize:    { xs: 11, sm: 12 },
                            color:       "#4B5563",
                            whiteSpace:  "nowrap",
                            py:          1.2,
                          }}
                        >
                          {h}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {orderData.product?.map((item, idx) => (
                      <TableRow
                        key={item.id}
                        sx={{ "&:hover": { bgcolor: "#f9fafb" } }}
                      >
                        <TableCell
                          sx={{ fontSize: { xs: 11, sm: 12 }, color: "#84868a" }}
                        >
                          {idx + 1}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize:   { xs: 11, sm: 13 },
                            fontWeight: 600,
                            color:      "#1a1a2e",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.name}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: { xs: 11, sm: 12 }, color: "#84868a" }}
                        >
                          ₹&nbsp;{item.unit_price}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: { xs: 11, sm: 12 }, color: "#84868a" }}
                        >
                          {item.weight}&nbsp;kg
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: { xs: 11, sm: 12 }, color: "#84868a" }}
                        >
                          {item.quantity}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize:   { xs: 11, sm: 12 },
                            fontWeight: 700,
                            color:      "#2e7d32",
                          }}
                        >
                          ₹&nbsp;{item.total_price}
                        </TableCell>
                      </TableRow>
                    ))}

                    {/* Total row */}
                    <TableRow sx={{ bgcolor: "#f8fafc" }}>
                      <TableCell
                        colSpan={5}
                        align="right"
                        sx={{
                          fontWeight:  700,
                          fontSize:    { xs: 12, sm: 13 },
                          pt:          1.5,
                          border:      "none",
                          borderTop:   "1px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        Total Amount
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 800,
                          fontSize:   { xs: 13, sm: 15 },
                          color:      "#2e7d32",
                          pt:         1.5,
                          border:     "none",
                          borderTop:  "1px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        ₹&nbsp;
                        {orderData.product?.reduce(
                          (sum, p) => sum + (p.total_price || 0),
                          0
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </SectionCard>


            {/* ──────────────────────────────────────
                5. Assign Delivery Boy
            ────────────────────────────────────── */}
            <SectionCard dashed>
              <SectionHeader
                icon={
                  <TwoWheelerIcon sx={{ fontSize: 15, color: "#2e7d32" }} />
                }
                label="Assign Delivery Boy"
              />

              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: { xs: 12, sm: 13 } }}>
                  Select Delivery Boy
                </InputLabel>
                <Select
                  value={selectedDeliveryBoy}
                  label="Select Delivery Boy"
                  onChange={(e) => setSelectedDeliveryBoy(e.target.value)}
                  sx={{
                    borderRadius: "10px",
                    fontSize:     { xs: 12, sm: 13 },
                    bgcolor:      "#fff",
                  }}
                >
                  {deliveryBoys
                    .filter((db) => db.is_active)
                    .map((db) => (
                      <MenuItem key={db.id} value={db.id}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          width="100%"
                          gap={1}
                        >
                          <Box>
                            <Typography
                              fontSize={{ xs: 12, sm: 13 }}
                              fontWeight={600}
                            >
                              {db.name}
                            </Typography>
                            <Typography
                              fontSize={{ xs: 10, sm: 11 }}
                              color="text.secondary"
                            >
                              {db.mobile_number}
                            </Typography>
                          </Box>
                          <Chip
                            label={db.is_available ? "Available" : "Busy"}
                            size="small"
                            sx={{
                              bgcolor: db.is_available ? "#dcfce7" : "#fff9e6",
                              color:   db.is_available ? "#16a34a" : "#92400e",
                              fontSize: 9,
                              fontWeight: 700,
                              height: 20,
                            }}
                          />
                        </Box>
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              {!selectedDeliveryBoy && (
                <Typography
                  fontSize={{ xs: 10, sm: 11 }}
                  color="#f57c00"
                  mt={1}
                  fontWeight={500}
                >
                  ⚠&nbsp;Please select a delivery boy to enable the Accept
                  button
                </Typography>
              )}
            </SectionCard>


          </Box>
        )}
      </Box>


      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <Box
        sx={{
          flexShrink:     0,
          px:             { xs: 2, sm: 3 },
          py:             { xs: 1.5, sm: 2 },
          bgcolor:        "#fff",
          borderTop:      "1px solid rgba(0,0,0,0.08)",
          display:        "flex",
          justifyContent: "flex-end",
          gap:            1.5,
        }}
      >
        <Button
          onClick={onClose}
          disabled={confirming}
          variant="outlined"
          sx={{
            borderRadius: "10px",
            px:           3,
            fontSize:     { xs: 12, sm: 13 },
            fontWeight:   600,
            borderColor:  "rgba(0,0,0,0.18)",
            color:        "#6B7280",
            "&:hover": {
              borderColor: "#d32f2f",
              color:       "#d32f2f",
              bgcolor:     "#fff3f3",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleConfirm}
          disabled={!selectedDeliveryBoy || confirming}
          variant="contained"
          startIcon={
            confirming ? (
              <CircularProgress size={14} color="inherit" />
            ) : null
          }
          sx={{
            borderRadius: "10px",
            px:           { xs: 3, sm: 4 },
            fontSize:     { xs: 12, sm: 13 },
            fontWeight:   700,
            bgcolor:      "#2e7d32",
            boxShadow:    "0 2px 8px rgba(46,125,50,0.3)",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            "&:hover": {
              bgcolor:   "#1b5e20",
              boxShadow: "0 4px 12px rgba(46,125,50,0.4)",
            },
            "&.Mui-disabled": {
              bgcolor:   "#e0e0e0",
              color:     "#9e9e9e",
              boxShadow: "none",
            },
          }}
        >
          {confirming ? "Processing…" : "✓ Accept & Assign"}
        </Button>
      </Box>

    </Dialog>
  );
};

export default OrderAcceptDialog;