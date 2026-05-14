
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
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField
} from "@mui/material";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import empty_box from '../../../../../assets/empty_box.gif';

// ICONS
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import { useState, useMemo } from "react";

// Api
import { orderAPI } from "../orderAPI.JS";
// Pages
import OrderViewPage from "../../pages/OrderViewPage.jsx";
import { useNavigate } from "react-router-dom";


// ── Style constants ───────────────────────────────────────────────────────────
const pageheading = {
  fontSize: { xs: "16px", sm: "20px", md: "22px", lg: "22px" },
  fontWeight: "bold",
  minWidth: 7,
  mb: 2
};

const tablehead = {
  color: "#4B5563",
  fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "14px" },
  fontWeight: 700
};

const productname = {
  color: "#081b36",
  fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "15px" },
  fontWeight: 600
};

const tabledata = {
  color: "#84868a",
  fontSize: { xs: "10px", sm: "12px", md: "13px", lg: "13px" },
  fontWeight: 600
};

const filterstyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    backgroundColor: "#FFFFFF",
    transition: "0.3s"
  },
  "& input::placeholder": {
    fontSize: { xs: "9px", sm: "12px", md: "14px", lg: "14px" },
    opacity: 0.5
  },
  "& .MuiSelect-select": {
    fontSize: { xs: "11px", sm: "12px", md: "13px", lg: "13px" },
    color: "#374151"
  },
  "& .MuiInputLabel-root": {
    fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "14px" },
    color: "#6B7280",
    fontWeight: 500
  },
  color: "#84868a",
  fontSize: { xs: "10px", sm: "12px", md: "13px", lg: "13px" },
  fontWeight: 600
};
// ── End style constants ───────────────────────────────────────────────────────


const OrderTable = () => {

  // ── LOGIC: untouched ────────────────────────────────────────────────────────
  const [allorders, setAllOrders] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [sortField, setSortField] = useState("normal");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("normal");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // const [openDialog, setOpenDialog] = useState(false);
  // const [selectedStatus, setSelectedStatus] = useState("");
// 
  useEffect(() => {
    const socket = new WebSocket(
      `${import.meta.env.VITE_WS_BASE_URL}/ws/fetch_all_order/`
    );
    socket.onopen = () => {
      console.log("Webockt are connected successfully...");
      socket.send(JSON.stringify({ "action": "fetch_all_order" }));
    };
    socket.onmessage = (event) => {
      try {
        const orderData = JSON.parse(event.data);
        console.log("OrderTable Data", orderData);
        setAllOrders(orderData.payload || []);
      } catch (error) {
        console.log("Invalid JSON", error);
      }
    };
    return () => socket.close();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleEditClick = async (id, order_number) => {
    try {
      const result = await orderAPI.getOrderById(Number(id), order_number);
      setSelectedOrder(result.data);
      setOpenEdit(true);
    } catch (error) {
      console.error("API error:", error.response?.data);
    }
  };

  const processedOrders = useMemo(() => {
    let updated = [...(allorders || [])];

    if (debouncedSearch) {
      const searchValue = debouncedSearch.toLowerCase();
      updated = updated.filter((orderuser) =>
        orderuser.name?.toLowerCase().includes(searchValue) ||
        orderuser.order_number?.toString().includes(searchValue) ||
        orderuser.total_amount?.toString().includes(searchValue) ||
        orderuser.s_no?.toString().includes(searchValue)
      );
    }

    if (statusFilter !== "normal") {
      updated = updated.filter(
        (p) => p.status?.toLowerCase() === statusFilter?.toLowerCase()
      );
    }

    if (sortField !== "normal" && sortOrder !== "normal") {
      updated.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortField] - b[sortField];
        } else {
          return b[sortField] - a[sortField];
        }
      });
    }

    return updated;
  }, [allorders, sortField, sortOrder, statusFilter, debouncedSearch]);

  const navigate = useNavigate();


  const statusColors = {
    Pending: "#9e7c49",
    Confirmed: "#61afef",
    OutForDelivery: "#5ac397",
    Delivered: "#2e7d32"
  };



const formatStatus = (status) => {
  if (!status) return "";
  return status
    .replace(/_/g, " ")                      // underscore → space
    .replace(/([A-Z])/g, " $1")              
    .trim()   
    .replace(/\b\w/g, (char) => char.toUpperCase());                               
};
  // ── END LOGIC ────────────────────────────────────────────────────────────────


  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
          background: "#ffffff",
          boxShadow: "0 8px 30px rgba(0,0,0,0.05)"
        }}
      >

        {/* ══════════════════════════════════════════
            HEADER
        ══════════════════════════════════════════ */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography variant="h5" sx={pageheading}>
            Orders
          </Typography>
        </Box>


        {/* ══════════════════════════════════════════
            FILTER BAR
            Mobile  : 2×2 grid (Sort|OrderBy / Status|Search)
            Desktop : single row, all 4 side by side
        ══════════════════════════════════════════ */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",              // 2 columns on mobile
              md: "1fr 1fr 1fr 1.5fr",    // 4 columns on desktop
            },
            gap: { xs: 1.5, sm: 2, md: 2.5 },
            mb: 4,
            p: { xs: 2, sm: 2.5, md: 3 },
            borderRadius: 3,
            background: "linear-gradient(135deg,#f8fafc,#eef2ff)",
            position: "sticky",
            top: 0,
            zIndex: 5,
          }}
        >
          {/* Sort By */}
          <TextField
            select
            label="Sort By"
            size="small"
            fullWidth
            value={sortField}
            sx={filterstyle}
            onChange={(e) => setSortField(e.target.value)}
          >
            <MenuItem value="normal" sx={filterstyle}>ALL</MenuItem>
            <MenuItem value="total_amount" sx={filterstyle}>Amount</MenuItem>
            <MenuItem value="order_number" sx={filterstyle}>Order ID</MenuItem>
            <MenuItem value="name" sx={filterstyle}>Name</MenuItem>
          </TextField>

          {/* Order By */}
          <TextField
            select
            label="Order By"
            size="small"
            fullWidth
            value={sortOrder}
            sx={filterstyle}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="asc" sx={filterstyle}>Ascending</MenuItem>
            <MenuItem value="desc" sx={filterstyle}>Descending</MenuItem>
          </TextField>

          {/* Status */}
          <TextField
            select
            label="Status"
            size="small"
            fullWidth
            value={statusFilter}
            sx={filterstyle}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="normal" sx={filterstyle}>ALL</MenuItem>
            <MenuItem value="Pending" sx={filterstyle}>PENDING</MenuItem>
            <MenuItem value="Confirmed" sx={filterstyle}>CONFIRMED</MenuItem>
            <MenuItem value="OutForDelivery" sx={filterstyle}>OUT FOR DELIVERY</MenuItem>
            <MenuItem value="Delivered" sx={filterstyle}>DELIVERED</MenuItem>
          </TextField>

          {/* Search — spans full width on mobile row 2 col 2 */}
          <TextField
            fullWidth
            placeholder="Search Orders..."
            size="small"
            value={searchTerm}
            sx={filterstyle}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchTerm("")} size="small">
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>


        {/* ══════════════════════════════════════════
            TABLE — horizontal scroll on mobile
        ══════════════════════════════════════════ */}
        <TableContainer
          sx={{
            maxHeight: "60vh",
            overflowX: "auto",           // horizontal scroll on mobile
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            mt:4
          }}
        >
          <Table stickyHeader sx={{ minWidth: 600 }}>  {/* minWidth forces scroll before columns crush */}

            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    ...tablehead,
                    position: "sticky",
                    left: 0,
                    backgroundColor: "#fff",
                    zIndex: 10,
                    whiteSpace: "nowrap",
                  }}
                >
                  S.No
                </TableCell>
                <TableCell sx={{ ...tablehead, whiteSpace: "nowrap" }}>Order ID</TableCell>
                <TableCell sx={{ ...tablehead, whiteSpace: "nowrap" }}>Customer Name</TableCell>
                <TableCell sx={{ ...tablehead, whiteSpace: "nowrap" }}>Amount</TableCell>
                <TableCell sx={{ ...tablehead, whiteSpace: "nowrap" }}>Status</TableCell>
                <TableCell sx={{ ...tablehead, whiteSpace: "nowrap" }}>Payment</TableCell>
                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <AnimatePresence>
                {processedOrders.length > 0 ? (

                  processedOrders.map((orderuser) => (
                    <motion.tr
                      key={orderuser.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <TableCell
                        sx={{
                          ...tabledata,
                          position: "sticky",
                          left: 0,
                          backgroundColor: "#fff",
                          zIndex: 9,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {orderuser.s_no}
                      </TableCell>

                      <TableCell>
                        <Typography sx={{ ...tabledata, whiteSpace: "nowrap" }}>
                          {orderuser.order_number}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ ...tabledata, whiteSpace: "nowrap" }}>
                        {orderuser.name || "-"}
                      </TableCell>

                      <TableCell sx={{ ...tabledata, whiteSpace: "nowrap" }}>
                        {orderuser.total_amount}
                      </TableCell>

                      <TableCell>
                          <Chip
    label={formatStatus(orderuser.status)}
    size="small"
    sx={{
      ...tabledata,
      backgroundColor: statusColors[orderuser.status] || "#94A3B8",
      color: "#fff",
      whiteSpace: "nowrap",
    }}
  />
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={orderuser.payment_status ? "Paid" : "Unpaid"}
                          size="small"
                          sx={{
                            ...tabledata,
                            backgroundColor: orderuser.payment_status
                              ? "#dcfce7"
                              : "#fee2e2",
                            color: orderuser.payment_status
                              ? "#16a34a"
                              : "#dc2626",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleEditClick(orderuser.id, orderuser.order_number)}
                          size="small"
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          <VisibilityIcon fontSize="small" />
                          <Typography sx={{ ...tabledata, ml: 0.5 }}>View</Typography>
                        </IconButton>
                      </TableCell>

                    </motion.tr>
                  ))

                ) : (

                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        py={6}
                        sx={{ opacity: 0.7, mx: "auto" }}
                      >
                        <img
                          src={empty_box}
                          alt="orders not found"
                          style={{
                            width: "clamp(80px, 15vw, 180px)",
                            height: "auto",
                            animation: "float 2s ease-in-out infinite"
                          }}
                        />
                        <Typography mt={2} color="text.secondary" fontSize={{ xs: 13, sm: 15 }}>
                          Orders Not Found
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>

                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </TableContainer>


        {/* ── View Order Dialog ── */}
        <Dialog
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedOrder && (
            <OrderViewPage
              select={selectedOrder}
              close={() => setOpenEdit(false)}
            />
          )}
        </Dialog>

        {/* ── Confirm Status Change Dialog ── */}
        {/* <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirm Status Change</DialogTitle>
          <DialogContent>
            Are you sure you want to change status to {selectedStatus}?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={confirmStatusChange}>Confirm</Button>
          </DialogActions>
        </Dialog> */}

      </Paper>
    </>
  );
};

export default OrderTable;