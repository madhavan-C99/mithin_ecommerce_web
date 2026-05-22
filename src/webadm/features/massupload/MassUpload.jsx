import { useState, useRef, useCallback } from "react";
import * as XLSX from "xlsx";
import {
  Box, Button, Typography, Paper, Snackbar, Alert, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  Tabs, Tab, IconButton, TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { massuploadAPI } from "../massupload/massuploadAPI";

// ✅ இந்த columns மட்டும் editable — உங்கள் sheet column name-க்கு match பண்ணுங்க
const EDITABLE_COLUMNS = [ "unit price", "Unit Price", "Stock", "stock"];

export default function MassUpload() {
  const [dragOver, setDragOver]         = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading]       = useState(false);
  const [downloading, setDownloading]   = useState(false);
  const [previewOpen, setPreviewOpen]   = useState(false);
  const [sheets, setSheets]             = useState([]);
  const [activeTab, setActiveTab]       = useState(0);
  const [confirmOpen, setConfirmOpen]   = useState(false);

  // ✅ global edit mode — true ஆனா table-ல் stock/price inputs காட்டும்
  const [editMode, setEditMode] = useState(false);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const fileInputRef = useRef(null);

  const showSnack = (msg, sev = "success") => setSnackbar({ open: true, message: msg, severity: sev });

  // ── Parse ALL sheets ─────────────────────────────────────────────────────────
  const parseFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const parsedSheets = workbook.SheetNames.map((name) => {
          const sheet = workbook.Sheets[name];
          const json  = XLSX.utils.sheet_to_json(sheet, { defval: "" });
          return {
            name,
            columns: json.length > 0 ? Object.keys(json[0]) : [],
            rows: json.map((r) => ({ ...r })),
          };
        }).filter((s) => s.rows.length > 0);

        if (parsedSheets.length > 0) {
          setSheets(parsedSheets);
          setActiveTab(0);
          setEditMode(false);
          setPreviewOpen(true);
        } else {
          showSnack("File is empty or unreadable.", "warning");
        }
      } catch {
        showSnack("Could not read file. Please use .xlsx or .csv", "error");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const setFile = (file) => { setSelectedFile(file); parseFile(file); };

  // ── Drag & Drop ──────────────────────────────────────────────────────────────
  const handleDragOver  = useCallback((e) => { e.preventDefault(); setDragOver(true); }, []);
  const handleDragLeave = useCallback(() => setDragOver(false), []);
  const handleDrop      = useCallback((e) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setFile(file);
  }, []);
  const handleBrowse     = () => fileInputRef.current?.click();
  const handleFileChange = (e) => { const f = e.target.files[0]; if (f) setFile(f); };

  // ── Edit / Save toggle ───────────────────────────────────────────────────────
  const handleEditToggle = () => {
    if (editMode) {
      // Save click
      setEditMode(false);
      showSnack("Changes saved!", "success");
    } else {
      // Edit click
      setEditMode(true);
    }
  };

  // ✅ Cell value change
  const handleCellChange = (sheetIdx, rowIdx, col, value) => {
    setSheets((prev) =>
      prev.map((s, si) => {
        if (si !== sheetIdx) return s;
        return {
          ...s,
          rows: s.rows.map((r, ri) =>
            ri !== rowIdx ? r : { ...r, [col]: value }
          ),
        };
      })
    );
  };

  // ✅ இந்த column editable-ஆ என்று check பண்றோம்
  const isEditableCol = (col) =>
    EDITABLE_COLUMNS.some((ec) => ec.toLowerCase() === col.toLowerCase());

  // ── Preview close ────────────────────────────────────────────────────────────
  const handlePreviewClose = () => {
    setPreviewOpen(false); setSheets([]); setSelectedFile(null); setEditMode(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Upload click ─────────────────────────────────────────────────────────────
  const handleUploadClick = () => {
    if (editMode) {
      showSnack("Please save your changes before uploading.", "warning");
      return;
    }
    setPreviewOpen(false);
    setConfirmOpen(true);
  };

  // ── Confirm Cancel ───────────────────────────────────────────────────────────
  const handleCancelConfirm = () => {
    setConfirmOpen(false); setSheets([]); setSelectedFile(null); setEditMode(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Confirm Upload → edited XLSX → API ──────────────────────────────────────
  const handleConfirmUpload = async () => {
    setConfirmOpen(false);
    try {
      setUploading(true);
      const wb = XLSX.utils.book_new();
      sheets.forEach((sheet) => {
        const ws = XLSX.utils.json_to_sheet(sheet.rows);
        XLSX.utils.book_append_sheet(wb, ws, sheet.name);
      });
      const wbOut = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob  = new Blob([wbOut], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const editedFile = new File([blob], selectedFile?.name || "edited.xlsx", { type: blob.type });

      const formData = new FormData();
      formData.append("file", editedFile);
      await massuploadAPI.excel_bulk_update(formData);

      showSnack("File uploaded successfully!", "success");
      setSelectedFile(null); setSheets([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      showSnack("Upload failed. Please try again.", "error");
    } finally {
      setUploading(false);
    }
  };

  // ── Download Template ────────────────────────────────────────────────────────
  const handleDownloadTemplate = async () => {
    try {
      setDownloading(true);
      const response = await massuploadAPI.productexport();
      const rawData  = response.data;
      let blob;
      if (rawData instanceof Blob) {
        blob = rawData;
      } else if (rawData instanceof ArrayBuffer || ArrayBuffer.isView(rawData)) {
        blob = new Blob([rawData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      } else if (typeof rawData === "string") {
        const bytes = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; i++) bytes[i] = rawData.charCodeAt(i);
        blob = new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      } else {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token") || "";
        const baseURL = response.config?.baseURL || "";
        const fetchRes = await fetch(`${baseURL}/adm/export_file`, {
          method: "POST",
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        });
        blob = new Blob([await fetchRes.arrayBuffer()], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      }
      const url  = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href  = url; link.download = "SM product details.xlsx";
      document.body.appendChild(link); link.click(); link.remove();
      window.URL.revokeObjectURL(url);
      showSnack("Template downloaded!", "success");
    } catch {
      showSnack("Download failed.", "error");
    } finally {
      setDownloading(false);
    }
  };

  // ── Reset ────────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setSelectedFile(null); setSheets([]); setPreviewOpen(false); setEditMode(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const currentSheet = sheets[activeTab] || null;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f6fa", display: "flex", flexDirection: "column", alignItems: "center", pt: 6, pb: 6, px: 3, gap: 4 }}>

      {/* ─── Upload Card ─── */}
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 580, borderRadius: 4, p: { xs: 3, sm: 5 }, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
        <Typography variant="h5" fontWeight={600} sx={{ color: "#1a1a2e", textAlign: "center", fontSize: { xs: 16, sm: 23 } }}>
          Daily Values Bulk Upload
        </Typography>

        <Button variant="contained"
          startIcon={downloading ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : <DownloadIcon />}
          onClick={handleDownloadTemplate} disabled={downloading}
          sx={{ backgroundColor: "#7c3aed", borderRadius: 5, px: 4, py: 1.2, fontWeight: 600, fontSize: { xs: 13, sm: 15 }, textTransform: "none", "&:hover": { backgroundColor: "#6d28d9" }, "&.Mui-disabled": { backgroundColor: "#c4b5fd", color: "#fff" } }}>
          {downloading ? "Downloading..." : "Download Template"}
        </Button>

        {/* Drop Zone */}
        <Box onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
          onClick={!selectedFile ? handleBrowse : undefined}
          sx={{ width: "100%", minHeight: 180, border: `2px dashed ${dragOver ? "#7c3aed" : selectedFile ? "#7c3aed" : "#c4b5fd"}`, borderRadius: 3, backgroundColor: dragOver ? "#ede9fe" : selectedFile ? "#f5f3ff" : "#faf9ff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1.5, cursor: selectedFile ? "default" : "pointer", transition: "all 0.2s ease", "&:hover": !selectedFile ? { backgroundColor: "#ede9fe", borderColor: "#7c3aed" } : {} }}>
          {selectedFile ? (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <InsertDriveFileIcon sx={{ fontSize: 52, color: "#7c3aed" }} />
              <Typography fontWeight={700} color="#7c3aed" sx={{ fontSize: { xs: 13, sm: 15 }, textAlign: "center" }}>{selectedFile.name}</Typography>
              <Typography variant="caption" color="text.secondary">{(selectedFile.size / 1024).toFixed(1)} KB</Typography>
              <Chip label="File Ready" size="small" icon={<CheckCircleOutlineIcon sx={{ fontSize: 14 }} />} sx={{ mt: 0.5, backgroundColor: "#ede9fe", color: "#7c3aed", fontWeight: 600, fontSize: 12 }} />
              <Typography variant="caption" onClick={handleBrowse} sx={{ color: "#7c3aed", cursor: "pointer", textDecoration: "underline", mt: 0.5, "&:hover": { color: "#6d28d9" } }}>Change file</Typography>
            </Box>
          ) : (
            <>
              <CloudUploadIcon sx={{ fontSize: 52, color: "#a78bfa" }} />
              <Typography color="text.secondary" sx={{ fontSize: { xs: 12, sm: 14 } }} textAlign="center">
                Drag & drop file here or <span style={{ color: "#7c3aed", fontWeight: 600 }}>browse for file</span>
              </Typography>
              <Typography variant="caption" color="text.disabled">Supported: .xlsx, .xls, .csv</Typography>
            </>
          )}
        </Box>
        <input ref={fileInputRef} type="file" accept=".xlsx,.csv,.xls" style={{ display: "none" }} onChange={handleFileChange} />

        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handleReset}
          sx={{ borderColor: "#7c3aed", color: "#7c3aed", borderRadius: 5, px: 4, py: 1.1, fontWeight: 600, fontSize: 14, textTransform: "none", "&:hover": { backgroundColor: "#ede9fe", borderColor: "#6d28d9" } }}>
          Reset
        </Button>
      </Paper>

      {/* ─── Bulk Files Preview Dialog ─── */}
      <Dialog open={previewOpen} onClose={handlePreviewClose} maxWidth="lg" fullWidth
        PaperProps={{ sx: { borderRadius: 3, maxHeight: "90vh" } }}>

        {/* Title */}
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 0, pt: 2.5, px: 3 }}>
          <Typography fontWeight={700} fontSize={18} color="#1a1a2e">Bulk Files Preview</Typography>
          <IconButton onClick={handlePreviewClose} size="small" sx={{ color: "#6b7280", "&:hover": { backgroundColor: "#f3f0ff" } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        {/* Tabs */}
        <Box sx={{ px: 3, borderBottom: "1px solid #e5e7eb" }}>
          <Tabs value={activeTab} onChange={(_, v) => { setActiveTab(v); setEditMode(false); }}
            variant="scrollable" scrollButtons="auto"
            sx={{ "& .MuiTab-root": { textTransform: "none", fontWeight: 600, fontSize: 14, color: "#6b7280" }, "& .Mui-selected": { color: "#7c3aed !important" }, "& .MuiTabs-indicator": { backgroundColor: "#7c3aed" } }}>
            {sheets.map((sheet, i) => <Tab key={i} label={sheet.name} />)}
          </Tabs>
        </Box>

        {/* Table */}
        <DialogContent sx={{ p: 0 }}>
          {currentSheet && (
            <TableContainer sx={{ maxHeight: "55vh" }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#f3f0ff", fontWeight: 700, color: "#4c1d95", fontSize: 13, whiteSpace: "nowrap", borderBottom: "2px solid #e5e7eb" }}>#</TableCell>
                    {currentSheet.columns.map((col) => (
                      <TableCell key={col} sx={{ backgroundColor: "#f3f0ff", fontWeight: 700, color: "#4c1d95", fontSize: 13, whiteSpace: "nowrap", borderBottom: "2px solid #e5e7eb" }}>
                        {col.replace(/_/g, " ")}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentSheet.rows.map((row, rowIdx) => (
                    <TableRow key={rowIdx}
                      sx={{ "&:nth-of-type(even)": { backgroundColor: "#f9fafb" }, "&:hover": { backgroundColor: "#f3f0ff" }, transition: "background 0.15s" }}>
                      <TableCell sx={{ color: "#9ca3af", fontSize: 13 }}>{rowIdx + 1}</TableCell>
                      {currentSheet.columns.map((col) => (
                        <TableCell key={col} sx={{ fontSize: 13, color: "#374151", py: editMode && isEditableCol(col) ? 0.5 : 1 }}>
                          {editMode && isEditableCol(col) ? (
                            // ✅ Edit mode + editable column → TextField
                            <TextField
                              value={row[col] ?? ""}
                              onChange={(e) => handleCellChange(activeTab, rowIdx, col, e.target.value)}
                              size="small"
                              variant="outlined"
                              sx={{
                                minWidth: 100,
                                "& .MuiOutlinedInput-root": {
                                  fontSize: 13,
                                  borderRadius: 2,
                                  "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
                                },
                              }}
                            />
                          ) : (
                            // ✅ View mode OR non-editable column → plain text
                            <Typography fontSize={13} color="#374151" sx={{ whiteSpace: "nowrap" }}>
                              {row[col] !== null && row[col] !== undefined ? String(row[col]) : ""}
                            </Typography>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>

        {/* Footer */}
        <DialogActions sx={{ px: 3, py: 2, borderTop: "1px solid #e5e7eb", backgroundColor: "#fafafa", justifyContent: "space-between" }}>
          <Chip
            label={`${currentSheet?.rows.length ?? 0} rows · ${sheets.length} sheet${sheets.length > 1 ? "s" : ""}`}
            size="small"
            sx={{ backgroundColor: "#ede9fe", color: "#7c3aed", fontWeight: 600 }}
          />
          <Box sx={{ display: "flex", gap: 1.5 }}>
            {/* ✅ Single Edit / Save toggle button */}
            <Button
              variant={editMode ? "contained" : "outlined"}
              startIcon={editMode ? <SaveIcon /> : <EditIcon />}
              onClick={handleEditToggle}
              sx={editMode
                ? { backgroundColor: "#059669", borderRadius: 5, textTransform: "none", fontWeight: 600, px: 3, color: "#fff", "&:hover": { backgroundColor: "#047857" } }
                : { borderColor: "#7c3aed", color: "#7c3aed", borderRadius: 5, textTransform: "none", fontWeight: 600, px: 3, "&:hover": { backgroundColor: "#ede9fe" } }
              }
            >
              {editMode ? "Save" : "Edit"}
            </Button>

            <Button onClick={handlePreviewClose} variant="outlined"
              sx={{ borderColor: "#7c3aed", color: "#7c3aed", borderRadius: 5, textTransform: "none", fontWeight: 600, px: 3, "&:hover": { backgroundColor: "#ede9fe" } }}>
              Cancel
            </Button>
            <Button onClick={handleUploadClick} variant="contained" startIcon={<FileUploadIcon />}
              sx={{ backgroundColor: "#7c3aed", borderRadius: 5, textTransform: "none", fontWeight: 700, px: 4, "&:hover": { backgroundColor: "#6d28d9" } }}>
              Upload
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {/* ─── Confirm Dialog ─── */}
      <Dialog open={confirmOpen} onClose={handleCancelConfirm}
        PaperProps={{ sx: { borderRadius: 4, px: 1, py: 1, minWidth: 340 } }}>
        <DialogTitle sx={{ fontWeight: 700, color: "#1a1a2e", pb: 0.5 }}>Confirm Upload</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#4b5563", fontSize: 14 }}>
            Are you sure you want to upload{" "}
            <strong style={{ color: "#7c3aed" }}>{selectedFile?.name}</strong>?
            <br />This will update the daily values in the system.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={handleCancelConfirm} variant="outlined"
            sx={{ borderColor: "#7c3aed", color: "#7c3aed", borderRadius: 5, textTransform: "none", fontWeight: 600, px: 3, "&:hover": { backgroundColor: "#ede9fe" } }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmUpload} variant="contained" disabled={uploading}
            startIcon={uploading ? <CircularProgress size={14} sx={{ color: "#fff" }} /> : null}
            sx={{ backgroundColor: "#7c3aed", borderRadius: 5, textTransform: "none", fontWeight: 600, px: 3, "&:hover": { backgroundColor: "#6d28d9" }, "&.Mui-disabled": { backgroundColor: "#e9d5ff" } }}>
            {uploading ? "Uploading..." : "Yes, Upload"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ─── Snackbar ─── */}
      <Snackbar open={snackbar.open} autoHideDuration={3500}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} sx={{ borderRadius: 3 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}



// import { useState, useRef, useCallback } from "react";
// import * as XLSX from "xlsx";
// import {
//   Box, Button, Typography, Paper, Snackbar, Alert, CircularProgress,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Chip, Dialog, DialogTitle, DialogContent, DialogActions,
//   Tabs, Tab, IconButton,
// } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import DownloadIcon from "@mui/icons-material/Download";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import CloseIcon from "@mui/icons-material/Close";
// import { massuploadAPI } from "../massupload/massuploadAPI";

// export default function MassUpload() {
//   const [dragOver, setDragOver]         = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading]       = useState(false);
//   const [downloading, setDownloading]   = useState(false);

//   // Preview Dialog states
//   const [previewOpen, setPreviewOpen]   = useState(false);
//   const [sheets, setSheets]             = useState([]); // [{ name, columns, rows }]
//   const [activeTab, setActiveTab]       = useState(0);

//   // Confirm Dialog state
//   const [confirmOpen, setConfirmOpen]   = useState(false);

//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const fileInputRef = useRef(null);

//   const showSnack = (message, severity = "success") =>
//     setSnackbar({ open: true, message, severity });

//   // ── Parse ALL sheets from Excel ──────────────────────────────────────────────
//   const parseFile = (file) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       try {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: "array" });

//         const parsedSheets = workbook.SheetNames.map((name) => {
//           const sheet = workbook.Sheets[name];
//           const json  = XLSX.utils.sheet_to_json(sheet, { defval: "" });
//           return {
//             name,
//             columns: json.length > 0 ? Object.keys(json[0]) : [],
//             rows: json,
//           };
//         }).filter((s) => s.rows.length > 0); // empty sheets skip

//         if (parsedSheets.length > 0) {
//           setSheets(parsedSheets);
//           setActiveTab(0);
//           setPreviewOpen(true); // ✅ Popup திறக்கும்
//         } else {
//           showSnack("File is empty or unreadable.", "warning");
//         }
//       } catch {
//         showSnack("Could not read file. Please use .xlsx or .csv", "error");
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const setFile = (file) => {
//     setSelectedFile(file);
//     parseFile(file);
//   };

//   // ── Drag & Drop ──────────────────────────────────────────────────────────────
//   const handleDragOver  = useCallback((e) => { e.preventDefault(); setDragOver(true); }, []);
//   const handleDragLeave = useCallback(() => setDragOver(false), []);
//   const handleDrop      = useCallback((e) => {
//     e.preventDefault();
//     setDragOver(false);
//     const file = e.dataTransfer.files[0];
//     if (file) setFile(file);
//   }, []);
//   const handleBrowse     = () => fileInputRef.current?.click();
//   const handleFileChange = (e) => { const f = e.target.files[0]; if (f) setFile(f); };

//   // ── Preview Dialog close (X button) ─────────────────────────────────────────
//   const handlePreviewClose = () => {
//     setPreviewOpen(false);
//     setSheets([]);
//     setSelectedFile(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   // ── Upload button inside preview popup ──────────────────────────────────────
//   const handleUploadClick = () => {
//     setPreviewOpen(false);  // preview popup மூடும்
//     setConfirmOpen(true);   // confirm popup திறக்கும்
//   };

//   // ── Confirm Cancel ───────────────────────────────────────────────────────────
//   const handleCancelConfirm = () => {
//     setConfirmOpen(false);
//     setSheets([]);
//     setSelectedFile(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   // ── Confirm Upload → API ─────────────────────────────────────────────────────
//   const handleConfirmUpload = async () => {
//     setConfirmOpen(false);
//     try {
//       setUploading(true);
//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       await massuploadAPI.excel_bulk_update(formData);
//       showSnack("File uploaded successfully!", "success");
//       setSelectedFile(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     } catch {
//       showSnack("Upload failed. Please try again.", "error");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ── Download Template ────────────────────────────────────────────────────────
//   const handleDownloadTemplate = async () => {
//     try {
//       setDownloading(true);
//       const response = await massuploadAPI.productexport();
//       const rawData  = response.data;
//       let blob;
//       if (rawData instanceof Blob) {
//         blob = rawData;
//       } else if (rawData instanceof ArrayBuffer || ArrayBuffer.isView(rawData)) {
//         blob = new Blob([rawData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//       } else if (typeof rawData === "string") {
//         const bytes = new Uint8Array(rawData.length);
//         for (let i = 0; i < rawData.length; i++) bytes[i] = rawData.charCodeAt(i);
//         blob = new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//       } else {
//         const token = localStorage.getItem("token") || sessionStorage.getItem("token") || "";
//         const baseURL = response.config?.baseURL || "";
//         const fetchRes = await fetch(`${baseURL}/adm/export_file`, {
//           method: "POST",
//           headers: { Authorization: token ? `Bearer ${token}` : undefined },
//         });
//         blob = new Blob([await fetchRes.arrayBuffer()], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//       }
//       const url  = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href  = url;
//       link.download = "SM product details.xlsx";
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//       showSnack("Template downloaded!", "success");
//     } catch {
//       showSnack("Download failed.", "error");
//     } finally {
//       setDownloading(false);
//     }
//   };

//   // ── Reset ────────────────────────────────────────────────────────────────────
//   const handleReset = () => {
//     setSelectedFile(null);
//     setSheets([]);
//     setPreviewOpen(false);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const currentSheet = sheets[activeTab] || null;

//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f6fa", display: "flex", flexDirection: "column", alignItems: "center", pt: 6, pb: 6, px: 3, gap: 4 }}>

//       {/* ─── Upload Card ─── */}
//       <Paper elevation={3} sx={{ width: "100%", maxWidth: 580, borderRadius: 4, p: { xs: 3, sm: 5 }, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>

//         <Typography variant="h5" fontWeight={800} sx={{ color: "#1a1a2e", textAlign: "center", fontSize: { xs: 16, sm: 23 } }}>
//           Daily Values Bulk Upload
//         </Typography>

//         {/* Download Template */}
//         <Button
//           variant="contained"
//           startIcon={downloading ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : <DownloadIcon />}
//           onClick={handleDownloadTemplate}
//           disabled={downloading}
//           sx={{ backgroundColor: "#7c3aed", borderRadius: 5, px: 4, py: 1.2, fontWeight: 600, fontSize: { xs: 13, sm: 15 }, textTransform: "none", "&:hover": { backgroundColor: "#6d28d9" }, "&.Mui-disabled": { backgroundColor: "#c4b5fd", color: "#fff" } }}
//         >
//           {downloading ? "Downloading..." : "Download Template"}
//         </Button>

//         {/* Drop Zone */}
//         <Box
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           onClick={!selectedFile ? handleBrowse : undefined}
//           sx={{
//             width: "100%", minHeight: 180,
//             border: `2px dashed ${dragOver ? "#7c3aed" : selectedFile ? "#7c3aed" : "#c4b5fd"}`,
//             borderRadius: 3,
//             backgroundColor: dragOver ? "#ede9fe" : selectedFile ? "#f5f3ff" : "#faf9ff",
//             display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//             gap: 1.5, cursor: selectedFile ? "default" : "pointer", transition: "all 0.2s ease",
//             "&:hover": !selectedFile ? { backgroundColor: "#ede9fe", borderColor: "#7c3aed" } : {},
//           }}
//         >
//           {selectedFile ? (
//             <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
//               <InsertDriveFileIcon sx={{ fontSize: 52, color: "#7c3aed" }} />
//               <Typography fontWeight={700} color="#7c3aed" sx={{ fontSize: { xs: 13, sm: 15 }, textAlign: "center" }}>
//                 {selectedFile.name}
//               </Typography>
//               <Typography variant="caption" color="text.secondary">
//                 {(selectedFile.size / 1024).toFixed(1)} KB
//               </Typography>
//               <Chip label="File Ready" size="small" icon={<CheckCircleOutlineIcon sx={{ fontSize: 14 }} />}
//                 sx={{ mt: 0.5, backgroundColor: "#ede9fe", color: "#7c3aed", fontWeight: 600, fontSize: 12 }} />
//               <Typography variant="caption" onClick={handleBrowse}
//                 sx={{ color: "#7c3aed", cursor: "pointer", textDecoration: "underline", mt: 0.5, "&:hover": { color: "#6d28d9" } }}>
//                 Change file
//               </Typography>
//             </Box>
//           ) : (
//             <>
//               <CloudUploadIcon sx={{ fontSize: 52, color: "#a78bfa" }} />
//               <Typography color="text.secondary" sx={{ fontSize: { xs: 12, sm: 14 } }} textAlign="center">
//                 Drag & drop file here or{" "}
//                 <span style={{ color: "#7c3aed", fontWeight: 600 }}>browse for file</span>
//               </Typography>
//               <Typography variant="caption" color="text.disabled">Supported: .xlsx, .xls, .csv</Typography>
//             </>
//           )}
//         </Box>

//         <input ref={fileInputRef} type="file" accept=".xlsx,.csv,.xls" style={{ display: "none" }} onChange={handleFileChange} />

//         {/* Reset */}
//         <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handleReset}
//           sx={{ borderColor: "#7c3aed", color: "#7c3aed", borderRadius: 5, px: 4, py: 1.1, fontWeight: 600, fontSize: 14, textTransform: "none", "&:hover": { backgroundColor: "#ede9fe", borderColor: "#6d28d9" } }}>
//           Reset
//         </Button>
//       </Paper>

//       {/* ─── Bulk Files Preview Dialog ─── */}
//       <Dialog
//         open={previewOpen}
//         onClose={handlePreviewClose}
//         maxWidth="lg"
//         fullWidth
//         PaperProps={{ sx: { borderRadius: 3, maxHeight: "85vh" } }}
//       >
//         {/* Dialog Title */}
//         <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 0, pt: 2.5, px: 3 }}>
//           <Typography fontWeight={700} fontSize={18} color="#1a1a2e">
//             Bulk Files Preview
//           </Typography>
//           <IconButton onClick={handlePreviewClose} size="small" sx={{ color: "#6b7280", "&:hover": { backgroundColor: "#f3f0ff" } }}>
//             <CloseIcon fontSize="small" />
//           </IconButton>
//         </DialogTitle>

//         {/* Tabs — one per sheet */}
//         <Box sx={{ px: 3, borderBottom: "1px solid #e5e7eb" }}>
//           <Tabs
//             value={activeTab}
//             onChange={(_, v) => setActiveTab(v)}
//             variant="scrollable"
//             scrollButtons="auto"
//             sx={{
//               "& .MuiTab-root": { textTransform: "none", fontWeight: 600, fontSize: 14, color: "#6b7280" },
//               "& .Mui-selected": { color: "#7c3aed !important" },
//               "& .MuiTabs-indicator": { backgroundColor: "#7c3aed" },
//             }}
//           >
//             {sheets.map((sheet, i) => (
//               <Tab key={i} label={sheet.name} />
//             ))}
//           </Tabs>
//         </Box>

//         {/* Table */}
//         <DialogContent sx={{ p: 0 }}>
//           {currentSheet && (
//             <TableContainer sx={{ maxHeight: "55vh" }}>
//               <Table stickyHeader size="small">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 700, color: "#374151", fontSize: 13, whiteSpace: "nowrap", borderBottom: "2px solid #e5e7eb" }}>
//                       #
//                     </TableCell>
//                     {currentSheet.columns.map((col) => (
//                       <TableCell key={col}
//                         sx={{ backgroundColor: "#f9fafb", fontWeight: 700, color: "#374151", fontSize: 13, whiteSpace: "nowrap", borderBottom: "2px solid #e5e7eb" }}>
//                         {col.replace(/_/g, " ")}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {currentSheet.rows.map((row, idx) => (
//                     <TableRow key={idx}
//                       sx={{ "&:nth-of-type(even)": { backgroundColor: "#f9fafb" }, "&:hover": { backgroundColor: "#f3f0ff" }, transition: "background 0.15s" }}>
//                       <TableCell sx={{ color: "#9ca3af", fontSize: 13 }}>{idx + 1}</TableCell>
//                       {currentSheet.columns.map((col) => (
//                         <TableCell key={col} sx={{ fontSize: 13, whiteSpace: "nowrap", color: "#374151" }}>
//                           {row[col] !== null && row[col] !== undefined ? String(row[col]) : ""}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </DialogContent>

//         {/* Dialog Footer */}
//         <DialogActions sx={{ px: 3, py: 2, borderTop: "1px solid #e5e7eb", backgroundColor: "#fafafa", justifyContent: "space-between" }}>
//           <Chip
//             label={`${currentSheet?.rows.length ?? 0} rows · ${sheets.length} sheet${sheets.length > 1 ? "s" : ""}`}
//             size="small"
//             sx={{ backgroundColor: "#ede9fe", color: "#7c3aed", fontWeight: 600 }}
//           />
//           <Box sx={{ display: "flex", gap: 1.5 }}>
//             <Button onClick={handlePreviewClose} variant="outlined"
//               sx={{ borderColor: "#7c3aed", color: "#7c3aed", borderRadius: 5, textTransform: "none", fontWeight: 600, px: 3, "&:hover": { backgroundColor: "#ede9fe" } }}>
//               Cancel
//             </Button>
//             <Button
//               onClick={handleUploadClick}
//               variant="contained"
//               startIcon={<FileUploadIcon />}
//               sx={{ backgroundColor: "#7c3aed", borderRadius: 5, textTransform: "none", fontWeight: 700, px: 4, "&:hover": { backgroundColor: "#6d28d9" } }}
//             >
//               Upload
//             </Button>
//           </Box>
//         </DialogActions>
//       </Dialog>

//       {/* ─── Confirm Upload Dialog ─── */}
//       <Dialog open={confirmOpen} onClose={handleCancelConfirm}
//         PaperProps={{ sx: { borderRadius: 4, px: 1, py: 1, minWidth: 340 } }}>
//         <DialogTitle sx={{ fontWeight: 700, color: "#1a1a2e", pb: 0.5 }}>Confirm Upload</DialogTitle>
//         <DialogContent>
//           <Typography sx={{ color: "#4b5563", fontSize: 14 }}>
//             Are you sure you want to upload{" "}
//             <strong style={{ color: "#7c3aed" }}>{selectedFile?.name}</strong>?
//             <br />This will update the daily values in the system.
//           </Typography>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
//           <Button onClick={handleCancelConfirm} variant="outlined"
//             sx={{ borderColor: "#7c3aed", color: "#7c3aed", borderRadius: 5, textTransform: "none", fontWeight: 600, px: 3, "&:hover": { backgroundColor: "#ede9fe" } }}>
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmUpload} variant="contained"
//             disabled={uploading}
//             startIcon={uploading ? <CircularProgress size={14} sx={{ color: "#fff" }} /> : null}
//             sx={{ backgroundColor: "#7c3aed", borderRadius: 5, textTransform: "none", fontWeight: 600, px: 3, "&:hover": { backgroundColor: "#6d28d9" }, "&.Mui-disabled": { backgroundColor: "#e9d5ff" } }}>
//             {uploading ? "Uploading..." : "Yes, Upload"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ─── Snackbar ─── */}
//       <Snackbar open={snackbar.open} autoHideDuration={3500}
//         onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
//         <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} sx={{ borderRadius: 3 }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }










// import { useState, useRef, useCallback } from "react";
// import * as XLSX from "xlsx";
// import {
//   Box,
//   Button,
//   Typography,
//   Paper,
//   Snackbar,
//   Alert,
//   CircularProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import DownloadIcon from "@mui/icons-material/Download";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import { massuploadAPI } from "../massupload/massuploadAPI";

// export default function MassUpload() {
//   const [dragOver, setDragOver]         = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading]       = useState(false);
//   const [downloading, setDownloading]   = useState(false);
//   const [previewData, setPreviewData]   = useState(null); // local file preview table
//   const [confirmOpen, setConfirmOpen]   = useState(false);
//   const [snackbar, setSnackbar]         = useState({ open: false, message: "", severity: "success" });
//   const fileInputRef = useRef(null);

//   const showSnack = (message, severity = "success") =>
//     setSnackbar({ open: true, message, severity });

//   // ── Parse Excel/CSV → table data ────────────────────────────────────────────
//   const parseFile = (file) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       try {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: "array" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });
//         if (json.length > 0) {
//           setPreviewData({ columns: Object.keys(json[0]), rows: json });
//         } else {
//           setPreviewData(null);
//           showSnack("File is empty or unreadable.", "warning");
//         }
//       } catch {
//         setPreviewData(null);
//         showSnack("Could not read file. Please use .xlsx or .csv", "error");
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const setFile = (file) => {
//     setSelectedFile(file);
//     setPreviewData(null);
//     parseFile(file);
//   };

//   // ── Drag & Drop ──────────────────────────────────────────────────────────────
//   const handleDragOver  = useCallback((e) => { e.preventDefault(); setDragOver(true); }, []);
//   const handleDragLeave = useCallback(() => setDragOver(false), []);
//   const handleDrop      = useCallback((e) => {
//     e.preventDefault();
//     setDragOver(false);
//     const file = e.dataTransfer.files[0];
//     if (file) setFile(file);
//   }, []);
//   const handleBrowse      = () => fileInputRef.current?.click();
//   const handleFileChange  = (e) => { const f = e.target.files[0]; if (f) setFile(f); };

//   // ── Upload Flow ──────────────────────────────────────────────────────────────
//   const handleUploadClick    = () => setConfirmOpen(true);
//   const handleCancelConfirm  = () => setConfirmOpen(false);

//   const handleConfirmUpload = async () => {
//     setConfirmOpen(false);
//     try {
//       setUploading(true);
//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       await massuploadAPI.excel_bulk_update(formData);
//       showSnack("File uploaded successfully!", "success");
//     } catch {
//       showSnack("Upload failed. Please try again.", "error");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ── Download Template ────────────────────────────────────────────────────────
//   const handleDownloadTemplate = async () => {
//     try {
//       setDownloading(true);
//       const response = await massuploadAPI.productexport();
//       const rawData  = response.data;
//       let blob;
//       if (rawData instanceof Blob) {
//         blob = rawData;
//       } else if (rawData instanceof ArrayBuffer || ArrayBuffer.isView(rawData)) {
//         blob = new Blob([rawData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//       } else if (typeof rawData === "string") {
//         const bytes = new Uint8Array(rawData.length);
//         for (let i = 0; i < rawData.length; i++) bytes[i] = rawData.charCodeAt(i);
//         blob = new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//       } else {
//         const token = localStorage.getItem("token") || sessionStorage.getItem("token") || "";
//         const baseURL = response.config?.baseURL || "";
//         const fetchRes = await fetch(`${baseURL}/adm/export_file`, {
//           method: "POST",
//           headers: { Authorization: token ? `Bearer ${token}` : undefined },
//         });
//         blob = new Blob([await fetchRes.arrayBuffer()], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//       }
//       const url  = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href  = url;
//       link.download = "SM product details.xlsx";
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//       showSnack("Template downloaded!", "success");
//     } catch {
//       showSnack("Download failed.", "error");
//     } finally {
//       setDownloading(false);
//     }
//   };

//   // ── Reset ────────────────────────────────────────────────────────────────────
//   const handleReset = () => {
//     setSelectedFile(null);
//     setPreviewData(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   // ── Render ───────────────────────────────────────────────────────────────────
//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f6fa", display: "flex", flexDirection: "column", alignItems: "center", pt: 6, pb: 6, px: 3, gap: 4 }}>

//       {/* ─── Upload Card ─── */}
//       <Paper elevation={3} sx={{ width: "100%", maxWidth: 580, borderRadius: 4, p: { xs: 3, sm: 5 }, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>

//         <Typography variant="h5" fontWeight={800}  sx={{ color: "#1a1a2e", textAlign: "center" ,fontSize:{xs:16, sm:23 }}}>
//           Daily Values Bulk Upload
//         </Typography>

//         {/* Download Template */}
//         <Button
//           variant="contained"
//           startIcon={downloading ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : <DownloadIcon />}
//           onClick={handleDownloadTemplate}
//           disabled={downloading}
//           sx={{ backgroundColor: "#7c3aed", borderRadius: 5, px: 4, py: 1.2, fontWeight: 600, fontSize:{xs:13, sm:20 }, textTransform: "none", "&:hover": { backgroundColor: "#6d28d9" }, "&.Mui-disabled": { backgroundColor: "#c4b5fd", color: "#fff" } }}
//         >
//           {downloading ? "Downloading..." : "Download Template"}
//         </Button>

//         {/* Drop Zone */}
//         <Box
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           onClick={!selectedFile ? handleBrowse : undefined}
//           sx={{
//             width: "100%",
//             minHeight: 180,
//             border: `2px dashed ${dragOver ? "#7c3aed" : selectedFile ? "#7c3aed" : "#c4b5fd"}`,
//             borderRadius: 3,
//             backgroundColor: dragOver ? "#ede9fe" : selectedFile ? "#f5f3ff" : "#faf9ff",
//             display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//             gap: 1.5, cursor: selectedFile ? "default" : "pointer", transition: "all 0.2s ease",
//             "&:hover": !selectedFile ? { backgroundColor: "#ede9fe", borderColor: "#7c3aed" } : {},
//           }}
//         >
//           {selectedFile ? (
//             <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
//               <InsertDriveFileIcon sx={{ fontSize: 52, color: "#7c3aed" }} />
//               <Typography fontWeight={700} color="#7c3aed" sx={{fontSize:{xs:13, sm:20 },textAlign:"center"}}>{selectedFile.name}</Typography>
//               <Typography variant="caption" color="text.secondary">{(selectedFile.size / 1024).toFixed(1)} KB</Typography>
//               <Chip label="File Ready" size="small" icon={<CheckCircleOutlineIcon sx={{ fontSize: 14 }} />}
//                 sx={{ mt: 0.5, backgroundColor: "#ede9fe", color: "#7c3aed", fontWeight: 600, fontSize: 12 }} />
//               <Typography variant="caption" onClick={handleBrowse}
//                 sx={{ color: "#7c3aed", cursor: "pointer", textDecoration: "underline", mt: 0.5, "&:hover": { color: "#6d28d9" } }}>
//                 Change file
//               </Typography>
//             </Box>
//           ) : (
//             <>
//               <CloudUploadIcon sx={{ fontSize: 52, color: "#a78bfa" }} />
//               <Typography color="text.secondary" sx={{fontSize:{xs:12, sm:20 }}} textAlign="center">
//                 Drag & drop file here or{" "}
//                 <span style={{ color: "#7c3aed", fontWeight: 600 }}>browse for file</span>
//               </Typography>
//               <Typography variant="caption" color="text.disabled">Supported: .xlsx, .xls, .csv</Typography>
//             </>
//           )}
//         </Box>

//         <input ref={fileInputRef} type="file" accept=".xlsx,.csv,.xls" style={{ display: "none" }} onChange={handleFileChange} />

//         {/* Reset */}
//         <Box sx={{ display: "flex", justifyContent: "center" }}>
//           <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handleReset}
//             sx={{ borderColor: "#7c3aed", color: "#7c3aed", borderRadius: 5, px: 4, py: 1.1, fontWeight: 600, fontSize: 14, textTransform: "none", "&:hover": { backgroundColor: "#ede9fe", borderColor: "#6d28d9" } }}>
//             Reset
//           </Button>
//         </Box>
//       </Paper>

//       {/* ─── Preview Table + Upload Button ─── */}
//       {previewData && (
//         <Paper elevation={3} sx={{ width: "100%", maxWidth: "95vw", borderRadius: 4, overflow: "hidden" }}>

//           {/* Table Header */}
//           <Box sx={{ px: 3, py: 2, backgroundColor: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//             <Typography fontWeight={700} color="#fff" sx={{fontSize:{xs:13, sm:20 }}}>File Preview</Typography>
//             <Chip label={`${previewData.rows.length} Rows`} size="small"
//               sx={{ backgroundColor: "#ede9fe", color: "#7c3aed", fontWeight: 700 }} />
//           </Box>

//           {/* Table */}
//           <TableContainer sx={{ maxHeight: 400 }}>
//             <Table stickyHeader size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ backgroundColor: "#f3f0ff", fontWeight: 700, color: "#4c1d95", fontSize: 13, whiteSpace: "nowrap" }}>#</TableCell>
//                   {previewData.columns.map((col) => (
//                     <TableCell key={col} sx={{ backgroundColor: "#f3f0ff", fontWeight: 700, color: "#4c1d95", fontSize: 13, whiteSpace: "nowrap", textTransform: "capitalize" }}>
//                       {col.replace(/_/g, " ")}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {previewData.rows.map((row, idx) => (
//                   <TableRow key={idx} sx={{ "&:nth-of-type(even)": { backgroundColor: "#faf9ff" }, "&:hover": { backgroundColor: "#ede9fe" }, transition: "background 0.15s" }}>
//                     <TableCell sx={{ color: "#6b7280", fontSize: 13 }}>{idx + 1}</TableCell>
//                     {previewData.columns.map((col) => (
//                       <TableCell key={col} sx={{ fontSize: 13, whiteSpace: "nowrap" }}>
//                         {row[col] !== null && row[col] !== undefined ? String(row[col]) : "—"}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Upload Button — bottom of table */}
//           <Box sx={{ px: 3, py: 2.5, display: "flex", justifyContent: "flex-end", borderTop: "1px solid #ede9fe", backgroundColor: "#faf9ff" }}>
//             <Button
//               variant="contained"
//               startIcon={uploading ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : <FileUploadIcon />}
//               onClick={handleUploadClick}
//               disabled={uploading}
//               sx={{ backgroundColor: "#7c3aed", borderRadius: 5, px: 5, py: 1.2, fontWeight: 700, fontSize: 14, textTransform: "none", "&:hover": { backgroundColor: "#6d28d9" }, "&.Mui-disabled": { backgroundColor: "#e9d5ff", color: "#fff" } }}
//             >
//               {uploading ? "Uploading..." : "Upload"}
//             </Button>
//           </Box>
//         </Paper>
//       )}

//       {/* ─── Confirm Dialog ─── */}
//       <Dialog open={confirmOpen} onClose={handleCancelConfirm}
//         PaperProps={{ sx: { borderRadius: 4, px: 1, py: 1, minWidth: 340 } }}>
//         <DialogTitle sx={{ fontWeight: 700, color: "#1a1a2e", pb: 0.5 }}>Confirm Upload</DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ color: "#4b5563", fontSize: 14 }}>
//             Are you sure you want to upload{" "}
//             <strong style={{ color: "#7c3aed" }}>{selectedFile?.name}</strong>?
//             <br />This will update the daily values in the system.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
//           <Button onClick={handleCancelConfirm} variant="outlined"
//             sx={{ borderColor: "#7c3aed", color: "#7c3aed", borderRadius: 5, textTransform: "none", fontWeight: 600, px: 3, "&:hover": { backgroundColor: "#ede9fe" } }}>
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmUpload} variant="contained"
//             sx={{ backgroundColor: "#7c3aed", borderRadius: 5, textTransform: "none", fontWeight: 600, px: 3, "&:hover": { backgroundColor: "#6d28d9" } }}>
//             Yes, Upload
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ─── Snackbar ─── */}
//       <Snackbar open={snackbar.open} autoHideDuration={3500}
//         onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
//         <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} sx={{ borderRadius: 3 }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }