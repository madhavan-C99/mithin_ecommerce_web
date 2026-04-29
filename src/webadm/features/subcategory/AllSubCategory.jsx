// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
//   Button,
//   Typography,
//   IconButton,
//   Dialog,
//   Chip,
//   TextField,
//   InputAdornment,
//   Fade
// } from "@mui/material";

// import EditIcon from "@mui/icons-material/Edit";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from "@mui/icons-material/Close";

// import { useEffect, useState, useMemo } from "react";
// import AddSubCategories from "./AddSubCategory";
// import UpdateSubCategory from "./UpdateSubCategory";
// import { subCategoryAPI } from "./subcategoryAPI";
// import { wrap } from "framer-motion";

// import empty_box from '../../../assets/empty_box.gif'

// const pageheading={
//     fontSize: {
//       xs: "16px",
//       sm: "20px",
//       md: "22px",
//       lg: "22px"
//     },
//     fontWeight:"bold",
//     minWidth:7,
//     mb:2
// }

// const tablehead={
//       color: "#4B5563",
//       fontSize: {
//       xs: "12px",
//       sm: "13px",
//       md: "14px",
//       lg: "14px"
//       },
//       fontWeight: 700
// }


// const productname={
      
//        color: "#081b36",
//       fontSize: {
//         xs: "12px",
//         sm: "13px",
//         md: "14px",
//           lg: "15px"
//           },
//         fontWeight:600  
// }

// const tabledata={
//        color: "#84868a",
//       fontSize: {
//         xs: "10px",
//         sm: "12px",
//         md: "13px",
//           lg: "13px"
//           },
//         fontWeight:600  
// }

// const filterstyle={
   
//               minWidth:180,
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "30px",
//                 backgroundColor: "#f3f4f6",
//                 transition: "0.3s"
//               },
//               "& .MuiOutlinedInput-root.Mui-focused": {
//                 backgroundColor: "#ffffff",
//                 boxShadow: "0 4px 15px rgba(99,102,241,0.3)"
//               },
//                  "& input::placeholder": {
//       fontSize: {
//         xs: "9px",
//         sm: "12px",
//         md: "14px",
//         lg: "14px"
//       },
//       opacity: 0.5
//     }
          
// }

// const AllSubCategory = () => {
//   const [allsubcategory, setAllSubcategory] = useState([]);
//   const [openAdd, setOpenAdd] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [selectedsubProduct, setSelectedsubProduct] = useState(null);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   // delete popup open state
//   const [openDelete, setOpenDelete] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   // ================= FETCH =================
//   const fetchAllSubcategory = async () => {
//     try {
//       const result = await subCategoryAPI.fetchAllSubcategory();
//       setAllSubcategory(result.data.data || result.data);
//     } catch (error) {
//       console.log("Fetch Error:", error.response);
//     }
//   };

//   useEffect(() => {
//           const timer = setTimeout(() => {
//       fetchAllSubcategory();
//   }, 2000);

//   return () => clearTimeout(timer);
   
//   }, []);

//   // ================= DEBOUNCE =================
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchTerm);
//     }, 400);

//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   // ================= FILTER =================
//   const filteredCategories = useMemo(() => {
//     if (!debouncedSearch) return allsubcategory;

//     const value = debouncedSearch.toLowerCase();

//     return allsubcategory.filter((item) =>
//       item.name?.toLowerCase().includes(value) ||
//       item.category_name?.toLowerCase().includes(value)
//     );
//   }, [allsubcategory, debouncedSearch]);

//   // ================= EDIT =================
//   const handleEditClick = async (id) => {
//     try {
//       const result = await subCategoryAPI.getSubCategoryById(id);
//       setSelectedsubProduct(result.data);
//       setOpenEdit(true);
//     } catch (error) {
//       console.log("Edit Fetch Error");
//     }
//   };

//   // ================= DELETE =================
//   // const handleDeleteClick = async (id) => {
//   //   try {
//   //     await subCategoryAPI.DeleteSubCategories(id);
//   //     fetchAllSubcategory();
//   //   } catch (error) {
//   //     console.log("Delete Error");
//   //   }
//   // };

//     const handleDeleteClick = (id) => {
//     setDeleteId(id);
//     setOpenDelete(true);
//   };


//     const confirmDelete = async () => {
//     if (deleteId) {
//       await subCategoryAPI.DeleteSubCategories(deleteId)
//       fetchAllSubcategory()
//     }
//     setOpenDelete(false);
//     setDeleteId(null);
//   };
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: 3,
//         borderRadius: 3,
//         background: "#ffffff",
//         boxShadow: "0 8px 24px rgba(0,0,0,0.05)"
//       }}
//     >
//       {/* ================= HEADER ================= */}
//       <Box
//         sx={{
//           mb: 3,
//           display: "flex",
//           justifyContent: "space-between",
//           flexWrap:"wrap",
//           alignItems: "center",
//           bgcolor:"#cd414100",
//           position: "sticky",
//           top: 0,
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold" sx={pageheading} minWidth={7} mb={2}>
//           All SubCategory
//         </Typography>
//    <Box
//         sx={{
//           display: "flex",
//           flexWrap:"wrap",
//           justifyContent:"flex-end",
//           gap: 3,
//           mb: 4,
//           p: 2,
//           borderRadius: 3,
//           background: "linear-gradient(135deg,#f8fafc,#eef2ff)",
//           position: "sticky",
//           top: 0,
//           zIndex: 5
//         }}
//       >
//           {/* SEARCH */}
//           <TextField
//             placeholder="Search by name or category..."
//             size="small"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           sx={filterstyle}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//               endAdornment: searchTerm && (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => setSearchTerm("")}>
//                     <CloseIcon fontSize="small" />
//                   </IconButton>
//                 </InputAdornment>
//               )
//             }}
//           />

//           {/* ADD BUTTON */}
//           <Button
//             startIcon={<AddIcon />}
//             variant="contained"
//             onClick={() => setOpenAdd(true)}
//             sx={{ borderRadius: 2, textTransform: "none" ,
//                   fontSize: {
//                     xs: "10px",
//                     sm: "12px",
//                     md: "16px",
//                     lg: "16px"
//                   },
//                   height:40,
//                   minWidth:100,
//                   fontWeight:"bold"
//             }}
//           >
//             Add SubCategory
//           </Button>
//         </Box>
//       </Box>

//       {/* ================= TABLE ================= */}
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow sx={tablehead}>
//               <TableCell  sx={{...tablehead,
//                       position: "sticky",
//                       left: 0,
//                       backgroundColor: "#fff",
//                       zIndex: 10}}>S.No</TableCell>
//               <TableCell sx={tablehead}>Name</TableCell>
//               <TableCell sx={tablehead}>Status</TableCell>
//               <TableCell sx={tablehead}>Category</TableCell>
//               <TableCell align="center" sx={tablehead}>
//                 Actions
//               </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {filteredCategories.length > 0 ? (
//               filteredCategories.map((item) => (
//                 <Fade in timeout={400} key={item.id}>
//                   <TableRow hover>
//                     <TableCell  sx={{
//                             ...tabledata,
//                             position: "sticky",
//                             left: 0,
//                             backgroundColor: "#fff",
//                             zIndex: 9
//                         }}>{item.s_no}</TableCell>

//                     <TableCell>
//                       <Typography sx={tabledata}>
//                         {item.name}
//                       </Typography>
//                     </TableCell>

//                     <TableCell sx={tabledata}>
//                       <Chip
//                         label={item.status ? "Active" : "Inactive"}
//                         size="small"
//                         sx={{
//                           backgroundColor: item.status
//                             ? "#dcfce7"
//                             : "#fee2e2",
//                           color: item.status
//                             ? "#16a34a"
//                             : "#dc2626",
//                           fontWeight: 600
//                         }}
//                       />
//                     </TableCell>

//                     <TableCell sx={tabledata}>{item.category_name}</TableCell>

//                     <TableCell align="center">
//                       <IconButton
//                         onClick={() => handleEditClick(item.id)}
//                       >
//                         <EditIcon />
//                       </IconButton>

//                       <IconButton
//                         onClick={() => handleDeleteClick(item.id)}
//                       >
//                         <DeleteOutlineIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 </Fade>
//               ))
//             ) : (
//                 <TableRow>
//                     <TableCell colSpan={10} align="center">

//                     <Box
//                       display="flex"
//                       flexDirection="column"
//                       alignItems="center"
//                       justifyContent="center"
//                       height={200}
//                       width={200}
//                       marginLeft={50}
//                       padding={3}
//                       sx={{
//                         opacity: 0.7
//                       }}
//                     >
//                       {/* Animation */}
//                       <img
//                         src={empty_box}
//                         alt="Products Not Found"
//                         width={"100%"}
//                         height={"100%"}
//                         style={{
//                           animation: "float 2s ease-in-out infinite"
//                         }}
//                       />

//                       <Typography mt={2} color="text.secondary">
//                        Subcategorys  Not Found
//                       </Typography>

//                     </Box>
//                       </TableCell>
//                    </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* ================= ADD DIALOG ================= */}
//       <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
//         <AddSubCategories
//           close={() => setOpenAdd(false)}
//           refersh={fetchAllSubcategory}
//         />
//       </Dialog>

//       {/* ================= EDIT DIALOG ================= */}
//       <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
//         {selectedsubProduct && (
//           <UpdateSubCategory
//             subcategory={selectedsubProduct}
//             close={() => setOpenEdit(false)}
//             refresh={fetchAllSubcategory}
//           />
//         )}
//       </Dialog>


//             {/* -----delete popup */}

//           <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
//             <Box sx={{ p: 4, width: 350 }}>

//               <Typography variant="h6" mb={2}>
//                 Confirm Delete
//               </Typography>

//               <Typography mb={3}>
//                 Are you sure you want to delete this {} Subcategory?
//               </Typography>

//               <Box display="flex" justifyContent="flex-end" gap={2}>
//                 <Button
//                   variant="outlined"
//                   onClick={() => setOpenDelete(false)}
//                 >
//                   Cancel
//                 </Button>

//                 <Button
//                   variant="contained"
//                   color="error"
//                   onClick={confirmDelete}
//                 >
//                   Delete
//                 </Button>
//               </Box>

//             </Box>
//         </Dialog>
//     </Paper>
//   );
// };

// export default AllSubCategory;











import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Typography,
  IconButton,
  Dialog,
  Chip,
  TextField,
  InputAdornment,
  Fade,
  Divider
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState, useMemo } from "react";
import AddSubCategories from "./AddSubCategory";
import UpdateSubCategory from "./UpdateSubCategory";
import { subCategoryAPI } from "./subcategoryAPI";

import empty_box from '../../../assets/empty_box.gif';

// ─── Styles ────────────────────────────────────────────────────────────────────
const pageheading = {
  fontSize: { xs: "16px", sm: "18px", md: "20px", lg: "22px" },
  fontWeight: "bold",
  color: "#1F2937",
  whiteSpace: "nowrap",
};

const tablehead = {
  color: "#4B5563",
  fontSize: { xs: "11px", sm: "12px", md: "13px", lg: "14px" },
  fontWeight: 700,
  whiteSpace: "nowrap",
  py: { xs: 1, sm: 1.5 },
  px: { xs: 1, sm: 1.5, md: 2 },
};

const tabledata = {
  color: "#84868a",
  fontSize: { xs: "11px", sm: "12px", md: "13px" },
  fontWeight: 600,
  py: { xs: 1, sm: 1.5 },
  px: { xs: 1, sm: 1.5, md: 2 },
  whiteSpace: "nowrap",
};

const filterstyle = {
  width: { xs: "100%", sm: 180, md: 260 },
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    backgroundColor: "#f3f4f6",
    transition: "0.3s",
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 15px rgba(99,102,241,0.3)",
  },
  "& input::placeholder": {
    fontSize: { xs: "11px", sm: "12px", md: "13px" },
    opacity: 0.6,
  },
};
// ───────────────────────────────────────────────────────────────────────────────

const AllSubCategory = () => {
  const [allsubcategory, setAllSubcategory] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedsubProduct, setSelectedsubProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ── FETCH ──────────────────────────────────────────────────────────────────
  const fetchAllSubcategory = async () => {
    try {
      const result = await subCategoryAPI.fetchAllSubcategory();
      setAllSubcategory(result.data.data || result.data);
    } catch (error) {
      console.log("Fetch Error:", error.response);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => { fetchAllSubcategory(); }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // ── DEBOUNCE ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => { setDebouncedSearch(searchTerm); }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // ── FILTER ─────────────────────────────────────────────────────────────────
  const filteredCategories = useMemo(() => {
    if (!debouncedSearch) return allsubcategory;
    const value = debouncedSearch.toLowerCase();
    return allsubcategory.filter(
      (item) =>
        item.name?.toLowerCase().includes(value) ||
        item.category_name?.toLowerCase().includes(value)
    );
  }, [allsubcategory, debouncedSearch]);

  // ── EDIT ───────────────────────────────────────────────────────────────────
  const handleEditClick = async (id) => {
    try {
      const result = await subCategoryAPI.getSubCategoryById(id);
      setSelectedsubProduct(result.data);
      setOpenEdit(true);
    } catch (error) {
      console.log("Edit Fetch Error");
    }
  };

  // ── DELETE ─────────────────────────────────────────────────────────────────
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await subCategoryAPI.DeleteSubCategories(deleteId);
      fetchAllSubcategory();
    }
    setOpenDelete(false);
    setDeleteId(null);
  };

  // ── EMPTY STATE ────────────────────────────────────────────────────────────
  const EmptyState = () => (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={6}
    >
      <Box sx={{ width: { xs: 100, sm: 140, md: 180 }, height: { xs: 100, sm: 140, md: 180 } }}>
        <img
          src={empty_box}
          alt="Not Found"
          style={{ width: "100%", height: "100%", animation: "float 2s ease-in-out infinite" }}
        />
      </Box>
      <Typography mt={2} color="text.secondary" fontSize={{ xs: "12px", sm: "13px", md: "14px" }}>
        Subcategories Not Found
      </Typography>
    </Box>
  );

  return (
    <Paper
      elevation={0}
      sx={{

        height: "calc(100vh - 100px)", // adjust based on your layout
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",

        p: { xs: 1.5, sm: 2, md: 3 },
        borderRadius: 3,
        background: "#ffffff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
      }}
    >
      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <Box
        sx={{
          mb: { xs: 1.5, sm: 2, md: 3 },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          flexWrap: "wrap", 
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: { xs: 1.5, sm: 2 },
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "#fff",
          pb: 1,
        }}
      >
        {/* Title */}
        <Typography variant="h5" sx={pageheading}>
          All SubCategory
        </Typography>

        {/* Controls */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: "wrap",   
            gap: { xs: 1.5, sm: 2 },
            alignItems: { xs: "stretch", sm: "center" },
            p: { xs: 1.5, sm: 2 },
            borderRadius: 3,
            background: "linear-gradient(135deg,#f8fafc,#eef2ff)",
          }}
        >
          {/* Search */}
          <TextField
            placeholder="Search by name or category..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={filterstyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchTerm("")} size="small">
                    <CloseIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Add Button */}
          <Button
            startIcon={<AddIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
            variant="contained"
            onClick={() => setOpenAdd(true)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: { xs: "12px", sm: "13px", md: "14px" },
              height: { xs: 38, sm: 40 },
              fontWeight: "bold",
              whiteSpace: "nowrap",
              alignSelf: { xs: "flex-start", sm: "auto" },
            }}
          >
            Add SubCategory
          </Button>
        </Box>
      </Box>

      {/* ── TABLE ───────────────────────────────────────────────────────────── */}
      <TableContainer
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "auto",
          borderRadius: 2,
          border: "1px solid #f0f0f0",
          "&::-webkit-scrollbar": { height: "6px" },
          "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1", borderRadius: "10px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#c5c5c5", borderRadius: "10px" },
        }}
      >
        <Table sx={{ minWidth: 480 }}>
          <TableHead sx={{ backgroundColor: "#f9fafb" }}>
            <TableRow>
              <TableCell
                sx={{
                  ...tablehead,
                  position: "sticky",
                  left: 0,
                  backgroundColor: "#f9fafb",
                  zIndex: 10,
                  borderRight: "1px solid #f0f0f0",
                }}
              >
                S.No
              </TableCell>
              <TableCell sx={tablehead}>Name</TableCell>
              <TableCell sx={tablehead}>Status</TableCell>
              <TableCell sx={tablehead}>Category</TableCell>
              <TableCell align="center" sx={tablehead}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((item) => (
                <Fade in timeout={400} key={item.id}>
                  <TableRow
                    hover
                    sx={{ "&:last-child td": { borderBottom: 0 } }}
                  >
                    <TableCell
                      sx={{
                        ...tabledata,
                        position: "sticky",
                        left: 0,
                        backgroundColor: "#fff",
                        zIndex: 9,
                        borderRight: "1px solid #f0f0f0",
                      }}
                    >
                      {item.s_no}
                    </TableCell>

                    <TableCell sx={tabledata}>{item.name}</TableCell>

                    <TableCell sx={{ ...tabledata, py: { xs: 0.75, sm: 1.5 } }}>
                      <Chip
                        label={item.status ? "Active" : "Inactive"}
                        size="small"
                        sx={{
                          backgroundColor: item.status ? "#dcfce7" : "#fee2e2",
                          color: item.status ? "#16a34a" : "#dc2626",
                          fontWeight: 600,
                          fontSize: { xs: "10px", sm: "11px", md: "12px" },
                          height: { xs: 20, sm: 24 },
                        }}
                      />
                    </TableCell>

                    <TableCell sx={tabledata}>{item.category_name}</TableCell>

                    <TableCell align="center" sx={{ py: { xs: 0.5, sm: 1 }, px: { xs: 0.5, sm: 1 } }}>
                      <IconButton
                        onClick={() => handleEditClick(item.id)}
                        size="small"
                        sx={{ p: { xs: 0.5, sm: 1 } }}
                      >
                        <EditIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(item.id)}
                        size="small"
                        sx={{ p: { xs: 0.5, sm: 1 } }}
                      >
                        <DeleteOutlineIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </Fade>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ border: 0 }}>
                  <EmptyState />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ── ADD DIALOG ──────────────────────────────────────────────────────── */}
      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        fullScreen={false}
        PaperProps={{
          sx: {
            borderRadius: { xs: 2, sm: 3 },
            m: { xs: 2, sm: 3 },
            width: { xs: "calc(100% - 32px)", sm: 380, md: 420 },
            maxWidth: "100%",
          },
        }}
      >
        <AddSubCategories close={() => setOpenAdd(false)} refersh={fetchAllSubcategory} />
      </Dialog>

      {/* ── EDIT DIALOG ─────────────────────────────────────────────────────── */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullScreen={false}
        PaperProps={{
          sx: {
            borderRadius: { xs: 2, sm: 3 },
            m: { xs: 2, sm: 3 },
            width: { xs: "calc(100% - 32px)", sm: 380, md: 420 },
            maxWidth: "100%",
          },
        }}
      >
        {selectedsubProduct && (
          <UpdateSubCategory
            subcategory={selectedsubProduct}
            close={() => setOpenEdit(false)}
            refresh={fetchAllSubcategory}
          />
        )}
      </Dialog>

      {/* ── DELETE CONFIRM ───────────────────────────────────────────────────── */}
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            m: { xs: 2, sm: 3 },
            width: { xs: "calc(100% - 32px)", sm: 360 },
            maxWidth: "100%",
          },
        }}
      >
        <Box sx={{ p: { xs: 2.5, sm: 3.5 } }}>
          <Typography
            variant="h6"
            mb={1.5}
            fontSize={{ xs: "15px", sm: "16px", md: "18px" }}
            fontWeight={700}
            color="#1F2937"
          >
            Confirm Delete
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography
            mb={3}
            fontSize={{ xs: "12px", sm: "13px", md: "14px" }}
            color="text.secondary"
          >
            Are you sure you want to delete this Subcategory?
          </Typography>
          <Box display="flex" justifyContent="flex-end" gap={1.5}>
            <Button
              variant="outlined"
              onClick={() => setOpenDelete(false)}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontSize: { xs: "12px", sm: "13px", md: "14px" },
                height: { xs: 34, sm: 38 },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={confirmDelete}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontSize: { xs: "12px", sm: "13px", md: "14px" },
                height: { xs: 34, sm: 38 },
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Paper>
  );
};

export default AllSubCategory;