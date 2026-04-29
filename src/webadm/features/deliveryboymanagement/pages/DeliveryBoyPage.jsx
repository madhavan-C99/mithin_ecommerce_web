// // src/webadm/features/deliveryboy/components/DeliveryBoyPage.jsx

// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Chip,
//   Tooltip,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   InputAdornment,
//   Avatar,
//   useMediaQuery,
//   useTheme,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import PersonAddAltIcon         from "@mui/icons-material/PersonAddAlt";
// import EditIcon                 from "@mui/icons-material/Edit";
// import DeleteIcon               from "@mui/icons-material/Delete";
// import VisibilityOutlinedIcon   from "@mui/icons-material/VisibilityOutlined";
// import SearchIcon               from "@mui/icons-material/Search";
// import TwoWheelerIcon           from "@mui/icons-material/TwoWheeler";
// import CheckCircleOutlineIcon   from "@mui/icons-material/CheckCircleOutline";
// import CancelOutlinedIcon       from "@mui/icons-material/CancelOutlined";
// import SortIcon                 from "@mui/icons-material/Sort";

// import { deliveryBoyAPI } from "../deliveryBoyAPI";
// import AddDeliveryBoy     from "../components/AddDeliveryBoy";
// import EditDeliveryBoy    from "../components/EditDeliveryBoy";
// import ViewDeliveryBoy    from "../components/ViewDeliveryBoy";

// // ─── Avatar color helper ──────────────────────────────────────────────────────
// const getAvatarColor = (name = "") => {
//   const colors = ["#1e3c72", "#2a5298", "#095c90", "#1565C0", "#0277BD"];
//   return colors[name.charCodeAt(0) % colors.length];
// };

// // ─── Reusable compact Select dropdown ────────────────────────────────────────
// const FilterSelect = ({ label, value, onChange, options }) => (
//   <FormControl size="small" sx={{ minWidth: { xs: "calc(50% - 4px)", sm: 150 } }}>
//     <InputLabel
//       sx={{
//         fontSize:     "0.8rem",
//         color:        "#64748b",
//         "&.Mui-focused": { color: "#2a5298" },
//       }}
//     >
//       {label}
//     </InputLabel>
//     <Select
//       value={value}
//       label={label}
//       onChange={(e) => onChange(e.target.value)}
//       sx={{
//         borderRadius:  "10px",
//         fontSize:      "0.82rem",
//         background:    "#fff",
//         "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2e8f0" },
//         "&:hover .MuiOutlinedInput-notchedOutline":  { borderColor: "#2a5298" },
//         "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#2a5298" },
//       }}
//     >
//       {options.map((opt) => (
//         <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: "0.82rem" }}>
//           {opt.label}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>
// );

// // ─── Main component ───────────────────────────────────────────────────────────
// export default function DeliveryBoyPage() {
//   const theme    = useTheme();
//   const isSmall  = useMediaQuery(theme.breakpoints.down("sm")); // < 600px

//   const [deliveryBoys, setDeliveryBoys] = useState([]);
//   const [filtered,     setFiltered]     = useState([]);
//   const [loading,      setLoading]      = useState(false);
//   const [searchText,   setSearchText]   = useState("");

//   // ─── Sort & Order ──────────────────────────────────────────────────────────
//   const [sortBy,  setSortBy]  = useState("normal");     // "normal" | "name"
//   const [orderBy, setOrderBy] = useState("ascending");  // "ascending" | "descending"

//   // ─── Modal states ──────────────────────────────────────────────────────────
//   const [addOpen,      setAddOpen]      = useState(false);
//   const [editOpen,     setEditOpen]     = useState(false);
//   const [editTarget,   setEditTarget]   = useState(null);
//   const [viewOpen,     setViewOpen]     = useState(false);
//   const [viewTargetId, setViewTargetId] = useState(null);

//   // ─── Delete confirm ────────────────────────────────────────────────────────
//   const [deleteOpen,    setDeleteOpen]    = useState(false);
//   const [deleteTarget,  setDeleteTarget]  = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   // ─── Snackbar ──────────────────────────────────────────────────────────────
//   const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

//   // ─── Fetch on mount ────────────────────────────────────────────────────────
//   useEffect(() => { fetchDeliveryBoys(); }, []);

//   // ─── Search filter ─────────────────────────────────────────────────────────
//   useEffect(() => {
//     const q = searchText.toLowerCase();
//     setFiltered(
//       deliveryBoys.filter(
//         (d) =>
//           d.name?.toLowerCase().includes(q) ||
//           d.mobile_number?.toLowerCase().includes(q) ||
//           d.email?.toLowerCase().includes(q)
//       )
//     );
//   }, [searchText, deliveryBoys]);

//   // ─── Sorted data (sort + order applied to filtered) ────────────────────────
//   const sorted = useMemo(() => {
//     let arr = [...filtered];
//     if (sortBy === "name") {
//       arr.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
//     }
//     if (orderBy === "descending") arr.reverse();
//     return arr;
//   }, [filtered, sortBy, orderBy]);

//   // ─── API: fetch all ────────────────────────────────────────────────────────
//   const fetchDeliveryBoys = async () => {
//     setLoading(true);
//     try {
//       const res  = await deliveryBoyAPI.fetchAllDeliveryBoys();
//       const data = res?.data?.data || [];
//       setDeliveryBoys(data);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       showSnack("Failed to load delivery boys.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─── API: delete ───────────────────────────────────────────────────────────
//   const handleDeleteConfirm = async () => {
//     setDeleteLoading(true);
//     try {
//       await deliveryBoyAPI.deleteDeliveryBoy({ id: deleteTarget.id });
//       showSnack(`"${deleteTarget.name}" removed successfully.`);
//       fetchDeliveryBoys();
//     } catch (err) {
//       console.error("Delete Error:", err);
//       showSnack("Failed to delete. Please try again.", "error");
//     } finally {
//       setDeleteLoading(false);
//       setDeleteOpen(false);
//       setDeleteTarget(null);
//     }
//   };

//   // ─── Helpers ───────────────────────────────────────────────────────────────
//   const showSnack = (message, severity = "success") =>
//     setSnack({ open: true, message, severity });

//   const handleSuccess = (message) => {
//     showSnack(message);
//     fetchDeliveryBoys();
//   };

//   const openEdit   = (boy) => { setEditTarget(boy);   setEditOpen(true); };
//   const openDelete = (boy) => { setDeleteTarget(boy); setDeleteOpen(true); };
//   const openView   = (boy) => { setViewTargetId(boy.id); setViewOpen(true); };

//   return (
//     <Box sx={{ minWidth: 0 }}>

//       {/* ═══════════════════════════════════
//           PAGE HEADER
//       ═══════════════════════════════════ */}
//       <Box
//         sx={{
//           display:        "flex",
//           alignItems:     { xs: "flex-start", sm: "center" },
//           flexDirection:  { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           gap:            2,
//           mb:             3,
//         }}
//       >
//         {/* Title block */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <Box
//             sx={{
//               width:          { xs: 40, sm: 46 },
//               height:         { xs: 40, sm: 46 },
//               borderRadius:   "13px",
//               background:     "linear-gradient(135deg, #1e3c72, #2a5298)",
//               display:        "flex",
//               alignItems:     "center",
//               justifyContent: "center",
//               boxShadow:      "0 4px 14px rgba(30,60,114,0.30)",
//               flexShrink:     0,
//             }}
//           >
//             <TwoWheelerIcon sx={{ color: "#fff", fontSize: { xs: 20, sm: 24 } }} />
//           </Box>
//           <Box>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: 700,
//                 color:      "#1e293b",
//                 lineHeight: 1.2,
//                 fontSize:   { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
//               }}
//             >
//               Delivery Boy Management
//             </Typography>
//             <Typography variant="caption" sx={{ color: "#64748b", fontSize: { xs: "0.72rem", sm: "0.78rem" } }}>
//               {deliveryBoys.length} delivery {deliveryBoys.length === 1 ? "boy" : "boys"} registered
//             </Typography>
//           </Box>
//         </Box>

//         {/* Add button */}
//         <Button
//           variant="contained"
//           startIcon={<PersonAddAltIcon />}
//           onClick={() => setAddOpen(true)}
//           sx={{
//             borderRadius:  "10px",
//             textTransform: "none",
//             fontWeight:    600,
//             px:            { xs: 2, sm: 2.5 },
//             py:            1,
//             fontSize:      { xs: "0.82rem", sm: "0.875rem" },
//             background:    "linear-gradient(110deg, #1e3c72, #2a5298)",
//             boxShadow:     "0 4px 14px rgba(30,60,114,0.30)",
//             width:         { xs: "100%", sm: "auto" },
//             "&:hover":     {
//               background: "linear-gradient(110deg, #16305e, #1e3f7a)",
//               boxShadow:  "0 6px 18px rgba(30,60,114,0.40)",
//             },
//           }}
//         >
//           Add Delivery Boy
//         </Button>
//       </Box>

//       {/* ═══════════════════════════════════
//           FILTERS ROW  (Sort By + Order By + Search)
//       ═══════════════════════════════════ */}
//       <Box
//         sx={{
//           display:        "flex",
//           alignItems:     "center",
//           flexWrap:       "wrap",
//           gap:            1.5,
//           mb:             2.5,
//           p:              { xs: 1.75, sm: 2 },
//           borderRadius:   "14px",
//           background:     "#f8fafc",
//           border:         "1px solid #e2e8f0",
//         }}
//       >
//         {/* Sort By */}
//         <FilterSelect
//           label="Sort By"
//           value={sortBy}
//           onChange={setSortBy}
//           options={[
//             { value: "normal", label: "Normal" },
//             { value: "name",   label: "Name"   },
//           ]}
//         />

//         {/* Order By */}
//         <FilterSelect
//           label="Order By"
//           value={orderBy}
//           onChange={setOrderBy}
//           options={[
//             { value: "ascending",  label: "Ascending"  },
//             { value: "descending", label: "Descending" },
//           ]}
//         />

//         {/* Search */}
//         <TextField
//           size="small"
//           placeholder="Search by name, mobile or email..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon sx={{ color: "#94a3b8", fontSize: 18 }} />
//               </InputAdornment>
//             ),
//           }}
//           sx={{
//             flex:     { xs: "1 1 100%", sm: 1 },
//             minWidth: { sm: 200 },
//             "& .MuiOutlinedInput-root": {
//               borderRadius: "10px",
//               background:   "#fff",
//               fontSize:     "0.82rem",
//               "&:hover fieldset":       { borderColor: "#2a5298" },
//               "&.Mui-focused fieldset": { borderColor: "#2a5298" },
//             },
//           }}
//         />
//       </Box>

//       {/* ═══════════════════════════════════
//           TABLE  (always table, horizontal scroll on small screens)
//       ═══════════════════════════════════ */}
//       <Box
//         sx={{
//           borderRadius:                    "16px",
//           border:                          "1px solid #e2e8f0",
//           overflow:                        "hidden",
//           overflowX:                       "auto",
//           WebkitOverflowScrolling:         "touch",
//           /* subtle scrollbar styling */
//           "&::-webkit-scrollbar":          { height: "5px" },
//           "&::-webkit-scrollbar-track":    { background: "#f1f5f9" },
//           "&::-webkit-scrollbar-thumb":    { background: "#cbd5e1", borderRadius: "4px" },
//         }}
//       >
//         <Table
//           size="small"
//           sx={{ minWidth: 620 }} /* table never shrinks below this → triggers scroll */
//         >
//           {/* ── Head ── */}
//           <TableHead>
//             <TableRow sx={{ background: "linear-gradient(110deg, #1e3c72, #2a5298)" }}>
//               {["S.No", "Delivery Boy", "Mobile", "Email", "Address", "Status", "Actions"].map((col) => (
//                 <TableCell
//                   key={col}
//                   sx={{
//                     color:      "#fff",
//                     fontWeight: 600,
//                     fontSize:   "0.8rem",
//                     whiteSpace: "nowrap",
//                     py:         1.75,
//                     px:         2,
//                   }}
//                 >
//                   {col}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           {/* ── Body ── */}
//           <TableBody>

//             {/* Loading */}
//             {loading && (
//               <TableRow>
//                 <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
//                   <CircularProgress size={30} sx={{ color: "#2a5298" }} />
//                   <Typography sx={{ mt: 1.5, color: "#64748b", fontSize: "0.82rem" }}>
//                     Loading delivery boys...
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             )}

//             {/* Empty */}
//             {!loading && sorted.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={7} align="center" sx={{ py: 7 }}>
//                   <TwoWheelerIcon sx={{ fontSize: 46, color: "#cbd5e1", mb: 1 }} />
//                   <Typography sx={{ color: "#94a3b8", fontSize: "0.88rem" }}>
//                     {searchText ? "No results found for your search." : "No delivery boys registered yet."}
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             )}

//             {/* Data rows */}
//             {!loading && sorted.map((boy, index) => (
//               <TableRow
//                 key={boy.id}
//                 sx={{
//                   "&:nth-of-type(even)": { background: "#f8fafc" },
//                   "&:hover":             { background: "#eef4ff" },
//                   transition:            "background 0.15s ease",
//                 }}
//               >
//                 {/* S.No */}
//                 <TableCell sx={{ px: 2, color: "#64748b", fontSize: "0.82rem", whiteSpace: "nowrap" }}>
//                   {index + 1}
//                 </TableCell>

//                 {/* Name + avatar */}
//                 <TableCell sx={{ px: 2 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
//                     <Avatar
//                       sx={{
//                         width:      32,
//                         height:     32,
//                         bgcolor:    getAvatarColor(boy.name),
//                         fontSize:   "0.82rem",
//                         fontWeight: 700,
//                         flexShrink: 0,
//                       }}
//                     >
//                       {boy.name?.charAt(0).toUpperCase()}
//                     </Avatar>
//                     <Typography sx={{ fontWeight: 600, fontSize: "0.85rem", color: "#1e293b", whiteSpace: "nowrap" }}>
//                       {boy.name}
//                     </Typography>
//                   </Box>
//                 </TableCell>

//                 {/* Mobile */}
//                 <TableCell sx={{ px: 2, fontSize: "0.83rem", color: "#334155", whiteSpace: "nowrap" }}>
//                   {boy.mobile_number}
//                 </TableCell>

//                 {/* Email */}
//                 <TableCell sx={{ px: 2, fontSize: "0.83rem", color: "#334155", whiteSpace: "nowrap" }}>
//                   {boy.email}
//                 </TableCell>

//                 {/* Address */}
//                 <TableCell sx={{ px: 2, maxWidth: 180 }}>
//                   <Typography sx={{ fontSize: "0.81rem", color: "#475569", lineHeight: 1.4 }}>
//                     {boy.address_line1}
//                   </Typography>
//                   {boy.address_line2 && (
//                     <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>
//                       {boy.address_line2}
//                     </Typography>
//                   )}
//                 </TableCell>

//                 {/* Status */}
//                 <TableCell sx={{ px: 2 }}>
//                   <Chip
//                     icon={
//                       boy.is_active
//                         ? <CheckCircleOutlineIcon sx={{ fontSize: "13px !important" }} />
//                         : <CancelOutlinedIcon    sx={{ fontSize: "13px !important" }} />
//                     }
//                     label={boy.is_active ? "Active" : "Inactive"}
//                     size="small"
//                     sx={{
//                       fontSize:   "0.72rem",
//                       fontWeight: 600,
//                       background: boy.is_active ? "#dcfce7" : "#fee2e2",
//                       color:      boy.is_active ? "#15803d" : "#dc2626",
//                       border:     `1px solid ${boy.is_active ? "#bbf7d0" : "#fecaca"}`,
//                       whiteSpace: "nowrap",
//                       "& .MuiChip-icon": { color: boy.is_active ? "#15803d" : "#dc2626" },
//                     }}
//                   />
//                 </TableCell>

//                 {/* Actions */}
//                 <TableCell sx={{ px: 2 }}>
//                   <Box sx={{ display: "flex", gap: 0.75 }}>
//                     <Tooltip title="View" arrow>
//                       <IconButton
//                         size="small"
//                         onClick={() => openView(boy)}
//                         sx={{ color: "#0891b2", background: "#ecfeff", borderRadius: "8px", "&:hover": { background: "#cffafe" } }}
//                       >
//                         <VisibilityOutlinedIcon sx={{ fontSize: 15 }} />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Edit" arrow>
//                       <IconButton
//                         size="small"
//                         onClick={() => openEdit(boy)}
//                         sx={{ color: "#2a5298", background: "#eef4ff", borderRadius: "8px", "&:hover": { background: "#dde8ff" } }}
//                       >
//                         <EditIcon sx={{ fontSize: 15 }} />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete" arrow>
//                       <IconButton
//                         size="small"
//                         onClick={() => openDelete(boy)}
//                         sx={{ color: "#dc2626", background: "#fff0f0", borderRadius: "8px", "&:hover": { background: "#ffd5d5" } }}
//                       >
//                         <DeleteIcon sx={{ fontSize: 15 }} />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Box>

//       {/* ═══════════════════════════════════
//           ADD MODAL
//       ═══════════════════════════════════ */}
//       <AddDeliveryBoy
//         open={addOpen}
//         onClose={() => setAddOpen(false)}
//         onSuccess={handleSuccess}
//       />

//       {/* ═══════════════════════════════════
//           EDIT MODAL
//       ═══════════════════════════════════ */}
//       <EditDeliveryBoy
//         open={editOpen}
//         onClose={() => { setEditOpen(false); setEditTarget(null); }}
//         onSuccess={handleSuccess}
//         deliveryBoy={editTarget}
//       />

//       {/* ═══════════════════════════════════
//           VIEW MODAL
//       ═══════════════════════════════════ */}
//       <ViewDeliveryBoy
//         open={viewOpen}
//         onClose={() => { setViewOpen(false); setViewTargetId(null); }}
//         deliveryBoyId={viewTargetId}
//       />

//       {/* ═══════════════════════════════════
//           DELETE CONFIRM DIALOG
//       ═══════════════════════════════════ */}
//       <Dialog
//         open={deleteOpen}
//         onClose={() => setDeleteOpen(false)}
//         maxWidth="xs"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: "14px",
//             mx:           { xs: 2, sm: "auto" },
//             boxShadow:    "0 16px 48px rgba(0,0,0,0.18)",
//           },
//         }}
//       >
//         <DialogTitle sx={{ pb: 1 }}>
//           <Typography sx={{ fontWeight: 700, fontSize: "0.98rem", color: "#1e293b" }}>
//             Confirm Delete
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           <Typography sx={{ fontSize: "0.875rem", color: "#475569" }}>
//             Are you sure you want to remove{" "}
//             <strong style={{ color: "#1e293b" }}>{deleteTarget?.name}</strong>?{" "}
//             This action cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions sx={{ px: 2.5, pb: 2.5, gap: 1 }}>
//           <Button
//             onClick={() => setDeleteOpen(false)}
//             sx={{
//               borderRadius:  "9px",
//               textTransform: "none",
//               fontSize:      "0.875rem",
//               color:         "#64748b",
//               border:        "1px solid #e2e8f0",
//               "&:hover":     { borderColor: "#2a5298", color: "#2a5298" },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleDeleteConfirm}
//             disabled={deleteLoading}
//             startIcon={deleteLoading ? <CircularProgress size={14} color="inherit" /> : null}
//             sx={{
//               borderRadius: "9px",
//               textTransform: "none",
//               fontWeight:    600,
//               fontSize:      "0.875rem",
//               background:    "#dc2626",
//               "&:hover":     { background: "#b91c1c" },
//               "&:disabled":  { background: "#cbd5e1" },
//             }}
//           >
//             {deleteLoading ? "Deleting..." : "Yes, Delete"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ═══════════════════════════════════
//           SNACKBAR
//       ═══════════════════════════════════ */}
//       <Snackbar
//         open={snack.open}
//         autoHideDuration={3000}
//         onClose={() => setSnack((p) => ({ ...p, open: false }))}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         sx={{ bottom: { xs: 16, sm: 24 } }}
//       >
//         <Alert
//           severity={snack.severity}
//           variant="filled"
//           onClose={() => setSnack((p) => ({ ...p, open: false }))}
//           sx={{ borderRadius: "10px", fontSize: "0.85rem" }}
//         >
//           {snack.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }










// src/webadm/features/deliveryboy/components/DeliveryBoyPage.jsx

import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Avatar,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import PersonAddAltIcon         from "@mui/icons-material/PersonAddAlt";
import EditIcon                 from "@mui/icons-material/Edit";
import DeleteIcon               from "@mui/icons-material/Delete";
import VisibilityOutlinedIcon   from "@mui/icons-material/VisibilityOutlined";
import SearchIcon               from "@mui/icons-material/Search";
import TwoWheelerIcon           from "@mui/icons-material/TwoWheeler";
import CheckCircleOutlineIcon   from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon       from "@mui/icons-material/CancelOutlined";

import { deliveryBoyAPI } from "../deliveryBoyAPI";
import AddDeliveryBoy     from "../components/AddDeliveryBoy";
import EditDeliveryBoy    from "../components/EditDeliveryBoy";
import ViewDeliveryBoy    from "../components/ViewDeliveryBoy";

// ─── Avatar color helper ──────────────────────────────────────────────────────
const getAvatarColor = (name = "") => {
  const colors = ["#1e3c72", "#2a5298", "#095c90", "#1565C0", "#0277BD"];
  return colors[name.charCodeAt(0) % colors.length];
};

// ─── Reusable compact Select dropdown ────────────────────────────────────────
const FilterSelect = ({ label, value, onChange, options }) => (
  <FormControl size="small" sx={{ minWidth: 130, flex: "0 0 auto" }}>
    <InputLabel
      sx={{
        fontSize: "0.8rem",
        color: "#64748b",
        "&.Mui-focused": { color: "#2a5298" },
      }}
    >
      {label}
    </InputLabel>
    <Select
      value={value}
      label={label}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        borderRadius: "10px",
        fontSize: "0.82rem",
        background: "#fff",
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2e8f0" },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#2a5298" },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#2a5298" },
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: "0.82rem" }}>
          {opt.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

// ─── Main component ───────────────────────────────────────────────────────────
export default function DeliveryBoyPage() {
  const theme   = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [filtered,     setFiltered]     = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [searchText,   setSearchText]   = useState("");

  const [sortBy,  setSortBy]  = useState("normal");
  const [orderBy, setOrderBy] = useState("ascending");

  const [addOpen,      setAddOpen]      = useState(false);
  const [editOpen,     setEditOpen]     = useState(false);
  const [editTarget,   setEditTarget]   = useState(null);
  const [viewOpen,     setViewOpen]     = useState(false);
  const [viewTargetId, setViewTargetId] = useState(null);

  const [deleteOpen,    setDeleteOpen]    = useState(false);
  const [deleteTarget,  setDeleteTarget]  = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => { fetchDeliveryBoys(); }, []);

  useEffect(() => {
    const q = searchText.toLowerCase();
    setFiltered(
      deliveryBoys.filter(
        (d) =>
          d.name?.toLowerCase().includes(q) ||
          d.mobile_number?.toLowerCase().includes(q) ||
          d.email?.toLowerCase().includes(q)
      )
    );
  }, [searchText, deliveryBoys]);

  const sorted = useMemo(() => {
    let arr = [...filtered];
    if (sortBy === "name") {
      arr.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }
    if (orderBy === "descending") arr.reverse();
    return arr;
  }, [filtered, sortBy, orderBy]);

  const fetchDeliveryBoys = async () => {
    setLoading(true);
    try {
      const res  = await deliveryBoyAPI.fetchAllDeliveryBoys();
      const data = res?.data?.data || [];
      setDeliveryBoys(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      showSnack("Failed to load delivery boys.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await deliveryBoyAPI.deleteDeliveryBoy({ id: deleteTarget.id });
      showSnack(`"${deleteTarget.name}" removed successfully.`);
      fetchDeliveryBoys();
    } catch (err) {
      console.error("Delete Error:", err);
      showSnack("Failed to delete. Please try again.", "error");
    } finally {
      setDeleteLoading(false);
      setDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  const showSnack = (message, severity = "success") =>
    setSnack({ open: true, message, severity });

  const handleSuccess = (message) => {
    showSnack(message);
    fetchDeliveryBoys();
  };

  const openEdit   = (boy) => { setEditTarget(boy);      setEditOpen(true);  };
  const openDelete = (boy) => { setDeleteTarget(boy);    setDeleteOpen(true); };
  const openView   = (boy) => { setViewTargetId(boy.id); setViewOpen(true);  };

  return (
    <Box sx={{ minWidth: 0 }}>

      {/* ═══════════════════════════════════
          PAGE HEADER
      ═══════════════════════════════════ */}
      <Box
        sx={{
          display:        "flex",
          alignItems:     { xs: "flex-start", sm: "center" },
          flexDirection:  { xs: "column", sm: "row" },
          justifyContent: "space-between",
          gap:            2,
          mb:             3,
        }}
      >
        {/* Title block */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width:          { xs: 40, sm: 46 },
              height:         { xs: 40, sm: 46 },
              borderRadius:   "13px",
              background:     "linear-gradient(135deg, #1e3c72, #2a5298)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              boxShadow:      "0 4px 14px rgba(30,60,114,0.30)",
              flexShrink:     0,
            }}
          >
            <TwoWheelerIcon sx={{ color: "#fff", fontSize: { xs: 20, sm: 24 } }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color:      "#1e293b",
                lineHeight: 1.2,
                fontSize:   { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
              }}
            >
              Delivery Boy Management
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#64748b", fontSize: { xs: "0.72rem", sm: "0.78rem" } }}
            >
              {deliveryBoys.length} delivery {deliveryBoys.length === 1 ? "boy" : "boys"} registered
            </Typography>
          </Box>
        </Box>

        {/* Add button */}
        <Button
          variant="contained"
          startIcon={<PersonAddAltIcon />}
          onClick={() => setAddOpen(true)}
          sx={{
            borderRadius:  "10px",
            textTransform: "none",
            fontWeight:    600,
            px:            { xs: 2, sm: 2.5 },
            py:            1,
            fontSize:      { xs: "0.82rem", sm: "0.875rem" },
            background:    "linear-gradient(110deg, #1e3c72, #2a5298)",
            boxShadow:     "0 4px 14px rgba(30,60,114,0.30)",
            width:         { xs: "100%", sm: "auto" },
            "&:hover": {
              background: "linear-gradient(110deg, #16305e, #1e3f7a)",
              boxShadow:  "0 6px 18px rgba(30,60,114,0.40)",
            },
          }}
        >
          Add Delivery Boy
        </Button>
      </Box>

      {/* ═══════════════════════════════════
          FILTERS ROW
      ═══════════════════════════════════ */}
      <Box
        sx={{
          display:      "flex",
          alignItems:   "center",
          flexWrap:     "wrap",
          gap:          1.5,
          mb:           2.5,
          p:            { xs: 1.5, sm: 2 },
          borderRadius: "14px",
          background:   "#f8fafc",
          border:       "1px solid #e2e8f0",
        }}
      >
        {/* Sort By + Order By — always side by side */}
        <Box sx={{ display: "flex", gap: 1.5, flex: "0 0 auto" }}>
          <FilterSelect
            label="Sort By"
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: "normal", label: "Normal" },
              { value: "name",   label: "Name"   },
            ]}
          />
          <FilterSelect
            label="Order By"
            value={orderBy}
            onChange={setOrderBy}
            options={[
              { value: "ascending",  label: "Ascending"  },
              { value: "descending", label: "Descending" },
            ]}
          />
        </Box>

        {/* Search — grows to fill remaining space */}
        <TextField
          size="small"
          placeholder="Search by name, mobile or email..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#94a3b8", fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex:     "1 1 160px",
            minWidth: 0,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              background:   "#fff",
              fontSize:     "0.82rem",
              "&:hover fieldset":       { borderColor: "#2a5298" },
              "&.Mui-focused fieldset": { borderColor: "#2a5298" },
            },
          }}
        />
      </Box>

      {/* ═══════════════════════════════════
          TABLE — always table, horizontal scroll on small screens
      ═══════════════════════════════════ */}
      <Box
        sx={{
          borderRadius:             "16px",
          border:                   "1px solid #e2e8f0",
          overflow:                 "hidden",
          overflowX:                "auto",
          WebkitOverflowScrolling:  "touch",
          "&::-webkit-scrollbar":       { height: "5px" },
          "&::-webkit-scrollbar-track": { background: "#f1f5f9" },
          "&::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "4px" },
        }}
      >
        <Table
          size="small"
          sx={{ minWidth: 680 }}
        >
          {/* ── Head ── */}
          {/* <TableHead>
            <TableRow sx={{ background: "linear-gradient(110deg, #1e3c72, #2a5298)" }}>
              {["S.No", "Delivery Boy", "Mobile", "Email", "Address", "Status", "Actions"].map((col) => (
                <TableCell
                  key={col}
                  sx={{
                    color:      "#fff",
                    fontWeight: 600,
                    fontSize:   "0.8rem",
                    whiteSpace: "nowrap",
                    py:         1.75,
                    px:         2,
                    // ADD THESE:
                    position: "sticky",
                    left: 0,
                    zIndex: 3,
                    background: "inherit", 
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead> */}

          <TableHead>
  <TableRow sx={{ background: "linear-gradient(110deg, #1e3c72, #2a5298)" }}>
    {/* S.No — sticky */}
    <TableCell
      sx={{
        color:       "#fff",
        fontWeight:  600,
        fontSize:    "0.8rem",
        whiteSpace:  "nowrap",
        py:          1.75,
        px:          2,
        position:    "sticky",
        left:        0,
        zIndex:      3,
        background:  "#1e3c72",   // explicit — gradient can't be inherited
      }}
    >
      S.No
    </TableCell>

    {/* All other columns — not sticky */}
    {["Delivery Boy", "Mobile", "Email", "Address", "Status", "Actions"].map((col) => (
      <TableCell
        key={col}
        sx={{
          color:      "#fff",
          fontWeight: 600,
          fontSize:   "0.8rem",
          whiteSpace: "nowrap",
          py:         1.75,
          px:         2,
        }}
      >
        {col}
      </TableCell>
    ))}
  </TableRow>
</TableHead>




          {/* ── Body ── */}
          <TableBody>

            {/* Loading */}
            {loading && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <CircularProgress size={30} sx={{ color: "#2a5298" }} />
                  <Typography sx={{ mt: 1.5, color: "#64748b", fontSize: "0.82rem" }}>
                    Loading delivery boys...
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}
            {!loading && sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 7 }}>
                  <TwoWheelerIcon sx={{ fontSize: 46, color: "#cbd5e1", mb: 1 }} />
                  <Typography sx={{ color: "#94a3b8", fontSize: "0.88rem" }}>
                    {searchText ? "No results found for your search." : "No delivery boys registered yet."}
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {/* Data rows */}
            {!loading && sorted.map((boy, index) => (
              <TableRow
                key={boy.id}
                sx={{
                  "&:nth-of-type(even)": { background: "#f8fafc" },
                  "&:hover":             { background: "#eef4ff" },
                  transition:            "background 0.15s ease",
                }}
              >
                {/* S.No */}
                {/* <TableCell sx={{ 
                  px: 2, py: 1.5, 
                  color: "#64748b", 
                  fontSize: "0.82rem", 
                  whiteSpace: "nowrap",
                  // ADD THESE:
                  position: "sticky",
                  left: 0,
                  zIndex: 2000,
                  // background: "inherit",   // inherits the even/odd row background automatically
                  borderRight: "1px solid #e2e8f0",  // visual separator from scrolling columns

                  }}>
                  {index + 1}
                </TableCell> */}

                {/* S.No */}
<TableCell sx={{ 
  px: 2, py: 1.5, 
  color: "#64748b", 
  fontSize: "0.82rem", 
  whiteSpace: "nowrap",
  position: "sticky",
  left: 0,
  zIndex: 2,
  background: "#fff",                      // default (odd rows)
  "tr:nth-of-type(even) &": {
    background: "#f8fafc",                 // even row bg
  },
  "tr:hover &": {
    background: "#eef4ff",                 // hover bg
  },
  borderRight: "1px solid #e2e8f0",
}}>
  {index + 1}
</TableCell>



                {/* Name + avatar */}
                <TableCell sx={{ px: 2, py: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                    <Avatar
                      sx={{
                        width:      32,
                        height:     32,
                        bgcolor:    getAvatarColor(boy.name),
                        fontSize:   "0.82rem",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {boy.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography
                      sx={{ fontWeight: 600, fontSize: "0.85rem", color: "#1e293b", whiteSpace: "nowrap" }}
                    >
                      {boy.name}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Mobile */}
                <TableCell sx={{ px: 2, py: 1.5, fontSize: "0.83rem", color: "#334155", whiteSpace: "nowrap" }}>
                  {boy.mobile_number}
                </TableCell>

                {/* Email */}
                <TableCell sx={{ px: 2, py: 1.5, fontSize: "0.83rem", color: "#334155", whiteSpace: "nowrap" }}>
                  {boy.email}
                </TableCell>

                {/* Address */}
                <TableCell sx={{ px: 2, py: 1.5, minWidth: 140, maxWidth: 200 }}>
                  <Typography sx={{ fontSize: "0.81rem", color: "#475569", lineHeight: 1.4, whiteSpace: "nowrap" }}>
                    {boy.address_line1}
                  </Typography>
                  {boy.address_line2 && (
                    <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8", whiteSpace: "nowrap" }}>
                      {boy.address_line2}
                    </Typography>
                  )}
                </TableCell>

                {/* Status */}
                <TableCell sx={{ px: 2, py: 1.5 }}>
                  <Chip
                    icon={
                      boy.is_active
                        ? <CheckCircleOutlineIcon sx={{ fontSize: "13px !important" }} />
                        : <CancelOutlinedIcon    sx={{ fontSize: "13px !important" }} />
                    }
                    label={boy.is_active ? "Active" : "Inactive"}
                    size="small"
                    sx={{
                      fontSize:   "0.72rem",
                      fontWeight: 600,
                      background: boy.is_active ? "#dcfce7" : "#fee2e2",
                      color:      boy.is_active ? "#15803d" : "#dc2626",
                      border:     `1px solid ${boy.is_active ? "#bbf7d0" : "#fecaca"}`,
                      whiteSpace: "nowrap",
                      "& .MuiChip-icon": { color: boy.is_active ? "#15803d" : "#dc2626" },
                    }}
                  />
                </TableCell>

                {/* Actions */}
                <TableCell sx={{ px: 2, py: 1.5 }}>
                  <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
                    <Tooltip title="View" arrow>
                      <IconButton
                        size="small"
                        onClick={() => openView(boy)}
                        sx={{
                          color:      "#0891b2",
                          background: "#ecfeff",
                          borderRadius: "8px",
                          p: "5px",
                          "&:hover":  { background: "#cffafe" },
                        }}
                      >
                        <VisibilityOutlinedIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        size="small"
                        onClick={() => openEdit(boy)}
                        sx={{
                          color:      "#2a5298",
                          background: "#eef4ff",
                          borderRadius: "8px",
                          p: "5px",
                          "&:hover":  { background: "#dde8ff" },
                        }}
                      >
                        <EditIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        size="small"
                        onClick={() => openDelete(boy)}
                        sx={{
                          color:      "#dc2626",
                          background: "#fff0f0",
                          borderRadius: "8px",
                          p: "5px",
                          "&:hover":  { background: "#ffd5d5" },
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* ═══════════════════════════════════
          ADD MODAL
      ═══════════════════════════════════ */}
      <AddDeliveryBoy
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={handleSuccess}
      />

      {/* ═══════════════════════════════════
          EDIT MODAL
      ═══════════════════════════════════ */}
      <EditDeliveryBoy
        open={editOpen}
        onClose={() => { setEditOpen(false); setEditTarget(null); }}
        onSuccess={handleSuccess}
        deliveryBoy={editTarget}
      />

      {/* ═══════════════════════════════════
          VIEW MODAL
      ═══════════════════════════════════ */}
      <ViewDeliveryBoy
        open={viewOpen}
        onClose={() => { setViewOpen(false); setViewTargetId(null); }}
        deliveryBoyId={viewTargetId}
      />

      {/* ═══════════════════════════════════
          DELETE CONFIRM DIALOG
      ═══════════════════════════════════ */}
      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "14px",
            mx:           { xs: 2, sm: "auto" },
            boxShadow:    "0 16px 48px rgba(0,0,0,0.18)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: "0.98rem", color: "#1e293b" }}>
            Confirm Delete
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: "0.875rem", color: "#475569" }}>
            Are you sure you want to remove{" "}
            <strong style={{ color: "#1e293b" }}>{deleteTarget?.name}</strong>?{" "}
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 2.5, pb: 2.5, gap: 1 }}>
          <Button
            onClick={() => setDeleteOpen(false)}
            sx={{
              borderRadius:  "9px",
              textTransform: "none",
              fontSize:      "0.875rem",
              color:         "#64748b",
              border:        "1px solid #e2e8f0",
              "&:hover":     { borderColor: "#2a5298", color: "#2a5298" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            disabled={deleteLoading}
            startIcon={deleteLoading ? <CircularProgress size={14} color="inherit" /> : null}
            sx={{
              borderRadius:  "9px",
              textTransform: "none",
              fontWeight:    600,
              fontSize:      "0.875rem",
              background:    "#dc2626",
              "&:hover":     { background: "#b91c1c" },
              "&.Mui-disabled": { background: "#cbd5e1" },
            }}
          >
            {deleteLoading ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ═══════════════════════════════════
          SNACKBAR
      ═══════════════════════════════════ */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ bottom: { xs: 16, sm: 24 } }}
      >
        <Alert
          severity={snack.severity}
          variant="filled"
          onClose={() => setSnack((p) => ({ ...p, open: false }))}
          sx={{ borderRadius: "10px", fontSize: "0.85rem" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}