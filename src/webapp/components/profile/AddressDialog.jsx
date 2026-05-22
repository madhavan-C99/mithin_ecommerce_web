import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Typography,
  IconButton,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";

import { useState, useEffect, useRef } from "react";

import {
  addCustomerAddress,
  getAddressFromCoordinates,
  updateCustomerAddress,
  findCustomerDistance
} from "../../api/AllApi";

import LocationPickerDialog from "../maps/LocationPickerDialog";

import { useDispatch, useSelector } from "react-redux";
import { setDeliveryStatus } from "../../store/DeliverySlice";
import { showNotification } from "../../store/DistanceNotifySlice";


const AddressDialog = ({
  open,
  onClose,
  onAddressAdded,
  onAddressUpdated,
  editAddress
}) => {

  const [mapOpen, setMapOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const [saveAs, setSaveAs] = useState("home");

  const locationSource = useRef(null);

  const delivery = useSelector((state) => state.delivery);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    contactName: "",
    contactNumber: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [errors, setErrors] = useState({});
  const [checkingDistance, setCheckingDistance] = useState(false);

  // ✅ Dialog open ஆகும்போது localStorage-ல் இருந்து load பண்ணு
  useEffect(() => {
    if (!open) return;

    if (editAddress) {
      // Edit mode → existing address load
      setForm({
        contactName:   editAddress.name          || "",
        contactNumber: editAddress.mobile         || "",
        addressLine1:  editAddress.address_line1  || "",
        // addressLine2:  editAddress.address_line2  || "",
        landmark:      editAddress.landmark       || "",
        city:          editAddress.city           || "",
        state:         editAddress.state          || "",
        pincode:       editAddress.pincode        || ""
      });
      setSaveAs(editAddress.category || "home");
      locationSource.current = "manual";
      return;
    }

    // ✅ Add mode → localStorage-ல் "selectedLocation" இருந்தால் form-ல் fill பண்ணு
    const saved = localStorage.getItem("selectedLocation");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // setForm((prev) => ({
        //   ...prev,
        //   addressLine1: parsed.fullAddress || "",
        //   // addressLine2: parsed.area        || "",
        //   city:         parsed.city        || "",
        //   state:        parsed.state       || "",
        //   pincode:      parsed.pincode     || ""
        // }));
            // ✅ fullAddress-லிருந்து city, state, pincode நீக்கி form-ல் போடு
    const cleanAddress = (raw = "", city = "", state = "", pincode = "") => {
      let address = raw;
      if (city)    address = address.replace(new RegExp(`,?\\s*${city}`, "gi"), "");
      if (state)   address = address.replace(new RegExp(`,?\\s*${state}`, "gi"), "");
      if (pincode) address = address.replace(new RegExp(`,?\\s*${pincode}`, "gi"), "");
      address = address.replace(/,?\s*India\s*$/gi, "");
      address = address.replace(/\s*,\s*/g, ", ").trim().replace(/^,|,$/, "").trim();
      return address;
    };

    setForm((prev) => ({
      ...prev,
      addressLine1: cleanAddress(
        parsed.fullAddress || "",
        parsed.city        || "",
        parsed.state       || "",
        parsed.pincode     || ""
      ),
      addressLine2: parsed.area    || "",
      city:         parsed.city    || "",
      state:        parsed.state   || "",
      pincode:      parsed.pincode || "",
    }));

        if (parsed.lat && parsed.lng) {
          setCoords({ lat: parsed.lat, lng: parsed.lng });
        }

        // Map-ல் confirm பண்ணியது → distance already checked
        locationSource.current = "map";

      } catch (e) {
        console.error("Failed to parse selectedLocation:", e);
      }
    }

  }, [open, editAddress]);

  // ─── Validation ──────────────────────────────────────────────────────────────

  const validateField = (name, value) => {
    switch (name) {
      case "contactName":
        return value.trim() ? "" : "Contact name is required";
      case "contactNumber":
        return /^\d{10}$/.test(value.trim())
          ? ""
          : "Enter a valid 10-digit mobile number";
      case "addressLine1":
        return value.trim() ? "" : "Address line 1 is required";
      // case "addressLine2":
      //   return value.trim() ? "" : "Address line 2 is required";
      case "city":
        return value.trim() ? "" : "City is required";
      case "state":
        return value.trim() ? "" : "State is required";
      case "pincode":
        return /^\d{6}$/.test(value.trim())
          ? ""
          : "Enter a valid 6-digit pincode";
      default:
        return "";
    }
  };

  const validateAll = () => {
    const requiredFields = [
      "contactName",
      "contactNumber",
      "addressLine1",
      // "addressLine2",
      "city",
      "state",
      "pincode"
    ];

    const newErrors = {};
    let isValid = true;

    requiredFields.forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // ─── Handlers ────────────────────────────────────────────────────────────────

  const handleSaveAsChange = (event, newValue) => {
    if (newValue !== null) setSaveAs(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    locationSource.current = "manual";

    dispatch(
      setDeliveryStatus({
        lat: null,
        lng: null,
        address: null,
        eligibility: false,
        checked: false,
        source: "profile"
      })
    );

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ✅ Map location confirm → distance check + localStorage save
  const handleLocationConfirm = async ({ lat, lng }) => {
    try {
      setCoords({ lat, lng });

      const addressData = await getAddressFromCoordinates(lat, lng);

      const filledForm = {
        ...form,
        addressLine1: addressData.address_line  || "",
        addressLine2: addressData.area_or_nagar || "",
        city:         addressData.city          || "",
        state:        addressData.state         || "",
        pincode:      addressData.pincode       || ""
      };

      setForm(filledForm);

      // ✅ localStorage-ல் save பண்ணு
      localStorage.setItem(
        "selectedLocation",
        JSON.stringify({
          fullAddress: addressData.address_line  || "",
          area:        addressData.area_or_nagar || "",
          city:        addressData.city          || "",
          state:       addressData.state         || "",
          pincode:     addressData.pincode       || "",
          lat,
          lng
        })
      );


      // Clear address field errors after map fill
      setErrors((prev) => ({
        ...prev,
        addressLine1: "",
        // addressLine2: "",
        city: "",
        state: "",
        pincode: ""
      }));

      const formattedAddress = `${addressData.address_line}, ${addressData.area_or_nagar}, ${addressData.city}, ${addressData.state} ${addressData.pincode}`;

      const distanceResponse = await findCustomerDistance(formattedAddress);
      // const eligibility = Boolean(distanceResponse.eligibility);

   // ✅ Backend "status: error" → message extract பண்ணி notification show பண்ணு
      if (distanceResponse.status === "error") {
        dispatch(
          showNotification({
            message: distanceResponse.message || "Location verification failed. Please try again.",
            severity: "error"
          })
        );
        locationSource.current = "map";
        return;
      }

      const eligibility = Boolean(distanceResponse.eligibility);
  
      if (!eligibility) {
        dispatch(
          showNotification({
            message: "Delivery is available only within 3 km. Please select a nearby address.",
            severity: "error"
          })
        );
        dispatch(
          setDeliveryStatus({
            lat,
            lng,
            address: formattedAddress,
            eligibility: false,
            checked: true,
            source: "profile"
          })
        );
        locationSource.current = "map";
        return;
      }

      dispatch(
        setDeliveryStatus({
          lat,
          lng,
          address: formattedAddress,
          eligibility: true,
          checked: true,
          source: "profile"
        })
      );

      locationSource.current = "map";

    } catch (error) {
      console.error("Location processing failed:", error);
    }
  };

  // ✅ Manual address → distance check
  const checkManualAddressDistance = async () => {
    const { addressLine1, addressLine2, city, state, pincode } = form;

    const formattedAddress = `${addressLine1}, ${addressLine2}, ${city}, ${state} ${pincode}`;

    try {
      const distanceResponse = await findCustomerDistance(formattedAddress);
      const eligibility = Boolean(distanceResponse.eligibility);

      dispatch(
        setDeliveryStatus({
          lat: null,
          lng: null,
          address: formattedAddress,
          eligibility,
          checked: true,
          source: "profile"
        })
      );

      if (!eligibility) {
        dispatch(
          showNotification({
            message: "Sorry, this address is outside our 3 km delivery area.",
            severity: "error"
          })
        );
        return false;



// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   Grid,
//   ToggleButton,
//   ToggleButtonGroup
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
// import HomeIcon from "@mui/icons-material/Home";
// import WorkIcon from "@mui/icons-material/Work";
// import PlaceIcon from "@mui/icons-material/Place";

// import { useState, useEffect, useRef } from "react";

// import {
//   addCustomerAddress,
//   getAddressFromCoordinates,
//   updateCustomerAddress,
//   findCustomerDistance
// } from "../../api/AllApi";

// import LocationPickerDialog from "../maps/LocationPickerDialog";

// import { useDispatch, useSelector } from "react-redux";
// import { setDeliveryStatus } from "../../store/DeliverySlice";
// import { showNotification } from "../../store/DistanceNotifySlice";


// const AddressDialog = ({
//   open,
//   onClose,
//   onAddressAdded,
//   onAddressUpdated,
//   editAddress
// }) => {

//   const [mapOpen, setMapOpen] = useState(false);
//   const [coords, setCoords] = useState(null);
//   const [saveAs, setSaveAs] = useState("home");

//   // ✅ Track whether the user picked location via map or typed manually
//   // "map"     → location was confirmed via map picker (eligibility already checked)
//   // "manual"  → user typed address fields (needs fresh check on save)
//   // null      → nothing done yet
//   const locationSource = useRef(null);

//   const delivery = useSelector((state) => state.delivery);
//   const dispatch = useDispatch();

//   const [form, setForm] = useState({
//     contactName: "",
//     contactNumber: "",
//     addressLine1: "",
//     addressLine2: "",
//     landmark: "",
//     city: "",
//     state: "",
//     pincode: ""
//   });

//   const [errors, setErrors] = useState({});

//   // ✅ Loading state for distance check on save
//   const [checkingDistance, setCheckingDistance] = useState(false);

//   useEffect(() => {
//     if (editAddress) {
//       setForm({
//         contactName: editAddress.name || "",
//         contactNumber: editAddress.mobile || "",
//         addressLine1: editAddress.address_line1 || "",
//         addressLine2: editAddress.address_line2 || "",
//         landmark: editAddress.landmark || "",
//         city: editAddress.city || "",
//         state: editAddress.state || "",
//         pincode: editAddress.pincode || ""
//       });
//       setSaveAs(editAddress.category || "home");

//       // Edit mode → treat existing address as "manual" (must re-check on save)
//       locationSource.current = "manual";
//     }
//   }, [editAddress]);

//   // ─── Validation ──────────────────────────────────────────────────────────────

//   const validateField = (name, value) => {
//     switch (name) {
//       case "contactName":
//         return value.trim() ? "" : "Contact name is required";
//       case "contactNumber":
//         return /^\d{10}$/.test(value.trim())
//           ? ""
//           : "Enter a valid 10-digit mobile number";
//       case "addressLine1":
//         return value.trim() ? "" : "Address line 1 is required";
//       case "addressLine2":
//         return value.trim() ? "" : "Address line 2 is required";
//       case "city":
//         return value.trim() ? "" : "City is required";
//       case "state":
//         return value.trim() ? "" : "State is required";
//       case "pincode":
//         return /^\d{6}$/.test(value.trim())
//           ? ""
//           : "Enter a valid 6-digit pincode";
//       default:
//         return "";
//     }
//   };

//   const validateAll = () => {
//     const requiredFields = [
//       "contactName",
//       "contactNumber",
//       "addressLine1",
//       "addressLine2",
//       "city",
//       "state",
//       "pincode"
//     ];

//     const newErrors = {};
//     let isValid = true;

//     requiredFields.forEach((field) => {
//       const error = validateField(field, form[field]);
//       if (error) {
//         newErrors[field] = error;
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   };

//   // ─── Handlers ────────────────────────────────────────────────────────────────

//   const handleSaveAsChange = (event, newValue) => {
//     if (newValue !== null) setSaveAs(newValue);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));

//     // ✅ Any manual edit → mark source as manual so we re-check distance on save
//     locationSource.current = "manual";

//     // Reset delivery status so old map-confirmed eligibility doesn't linger
//     dispatch(
//       setDeliveryStatus({
//         lat: null,
//         lng: null,
//         address: null,
//         eligibility: false,
//         checked: false,
//         source: "profile"
//       })
//     );

//     // Clear field error as user types
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     const error = validateField(name, value);
//     setErrors((prev) => ({ ...prev, [name]: error }));
//   };

//   // ✅ Map location confirm → check distance immediately (same as before)
//   const handleLocationConfirm = async ({ lat, lng }) => {
//     try {
//       setCoords({ lat, lng });

//       const addressData = await getAddressFromCoordinates(lat, lng);

//       setForm((prev) => ({
//         ...prev,
//         addressLine1: addressData.address_line || "",
//         addressLine2: addressData.area_or_nagar || "",
//         city: addressData.city || "",
//         state: addressData.state || "",
//         pincode: addressData.pincode || ""
//       }));

//       // Clear address field errors after map fill
//       setErrors((prev) => ({
//         ...prev,
//         addressLine1: "",
//         addressLine2: "",
//         city: "",
//         state: "",
//         pincode: ""
//       }));

//       const formattedAddress = `${addressData.address_line}, ${addressData.area_or_nagar}, ${addressData.city}, ${addressData.state} ${addressData.pincode}`;

//       const distanceResponse = await findCustomerDistance(formattedAddress);
//       const eligibility = Boolean(distanceResponse.eligibility);

//       if (!eligibility) {
//         dispatch(
//           showNotification({
//             message: "Delivery is available only within 3 km. Please select a nearby address.",
//             severity: "error"
//           })
//         );
//         dispatch(
//           setDeliveryStatus({
//             lat,
//             lng,
//             address: formattedAddress,
//             eligibility: false,
//             checked: true,
//             source: "profile"
//           })
//         );
//         // Mark as map source even on failure so we don't double-check on save
//         locationSource.current = "map";
//         return;
//       }

//       dispatch(
//         setDeliveryStatus({
//           lat,
//           lng,
//           address: formattedAddress,
//           eligibility: true,
//           checked: true,
//           source: "profile"
//         })
//       );

//       locationSource.current = "map";

//     } catch (error) {
//       console.error("Location processing failed:", error);
//     }
//   };

//   // ✅ Core fix: check distance for manually typed address
//   const checkManualAddressDistance = async () => {
//     const { addressLine1, addressLine2, city, state, pincode } = form;

//     // Build address string from form fields
//     const formattedAddress = `${addressLine1}, ${addressLine2}, ${city}, ${state} ${pincode}`;

//     try {
//       const distanceResponse = await findCustomerDistance(formattedAddress);
//       const eligibility = Boolean(distanceResponse.eligibility);

//       dispatch(
//         setDeliveryStatus({
//           lat: null,
//           lng: null,
//           address: formattedAddress,
//           eligibility,
//           checked: true,
//           source: "profile"
//         })
//       );

//       if (!eligibility) {
//         dispatch(
//           showNotification({
//             message: "Sorry, this address is outside our 3 km delivery area.",
//             severity: "error"
//           })
//         );
//         return false;
      }

      return true;

    } catch (err) {
      console.error("Distance check failed:", err);
      dispatch(
        showNotification({
          message: "Could not verify delivery availability. Please try again.",
          severity: "error"
        })
      );
      return false;
    }
  };

  // ─── Save ─────────────────────────────────────────────────────────────────────

  const handleSaveAddress = async () => {
    // Step 1: Validate form fields
    if (!validateAll()) return;

    setCheckingDistance(true);

    try {
      let canDeliver = false;

      if (locationSource.current === "map" && delivery.checked) {
        // ✅ Map confirmed → use already-checked eligibility
        canDeliver = delivery.eligibility;
      } else {
        // ✅ Manual entry or edit mode → always check distance fresh
        canDeliver = await checkManualAddressDistance();
      }

      if (!canDeliver) {
        setCheckingDistance(false);
        return; // Notification already dispatched inside checkManualAddressDistance
      }

      // Step 3: Save address
      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("User not found");

      const parsedUser = JSON.parse(storedUser);

      const payload = {
        user_id: parsedUser.user_id,
        name: form.contactName,
        mobile: form.contactNumber,
        category: saveAs,
        address_line1: form.addressLine1,
        // address_line2: form.addressLine2,
        landmark: form.landmark,
        city: form.city,
        state: form.state,
        country: "India",
        pincode: form.pincode
      };

      if (editAddress) {
        await updateCustomerAddress({ ...payload, address_id: editAddress.id });
        if (onAddressUpdated) onAddressUpdated();
      } else {
        await addCustomerAddress(payload);
        if (onAddressAdded) onAddressAdded();
      }

      onClose();

    } catch (err) {
      console.error("Address save failed:", err);
    } finally {
      setCheckingDistance(false);
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" scroll="paper">

        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {editAddress ? "Edit Address" : "Add Address"}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>

          {/* Map Location Picker */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <MyLocationIcon sx={{ mr: 1, color: "#4CAF50" }} />
            <Typography
              sx={{ color: "#4CAF50", cursor: "pointer" }}
              onClick={() => setMapOpen(true)}
            >
              Use my Current Location
            </Typography>
          </Box>

          <TextField
            label="Contact name"
            name="contactName"
            value={form.contactName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.contactName)}
            helperText={errors.contactName || ""}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Contact number"
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.contactNumber)}
            helperText={errors.contactNumber || ""}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Address line 1"
            name="addressLine1"
            value={form.addressLine1}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.addressLine1)}
            helperText={errors.addressLine1 || ""}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          {/* <TextField
            label="Address line 2"
            name="addressLine2"
            value={form.addressLine2}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.addressLine2)}
            helperText={errors.addressLine2 || ""}
            fullWidth
            required
            sx={{ mb: 2 }}
          /> */}

          <TextField
            label="Landmark"
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <TextField
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.city)}
                helperText={errors.city || ""}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.state)}
                helperText={errors.state || ""}
                fullWidth
                required
              />
            </Grid>
          </Grid>

          <TextField
            label="Pincode"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.pincode)}
            helperText={errors.pincode || ""}
            fullWidth
            required
            sx={{ mb: 3 }}
          />

          <Typography sx={{ mb: 1, fontWeight: 500 }}>Save as</Typography>

          <ToggleButtonGroup
            value={saveAs}
            exclusive
            onChange={handleSaveAsChange}
            sx={{ mb: 3 }}
          >
            <ToggleButton value="home"><HomeIcon sx={{ mr: 1 }} />Home</ToggleButton>
            <ToggleButton value="work"><WorkIcon sx={{ mr: 1 }} />Work</ToggleButton>
            <ToggleButton value="other"><PlaceIcon sx={{ mr: 1 }} />Other</ToggleButton>
          </ToggleButtonGroup>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSaveAddress}
            disabled={checkingDistance}
            sx={{
              backgroundColor: "#4CAF50",
              height: 48,
              fontWeight: 600,
              "&:hover": { backgroundColor: "#43A047" }
            }}
          >
            {checkingDistance ? "Checking delivery area..." : "Save Address"}
          </Button>

        </DialogContent>
      </Dialog>

      <LocationPickerDialog
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        onConfirm={handleLocationConfirm}
      />
    </>
  );
};

export default AddressDialog;





// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   Grid,
//   ToggleButton,
//   ToggleButtonGroup
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
// import HomeIcon from "@mui/icons-material/Home";
// import WorkIcon from "@mui/icons-material/Work";
// import PlaceIcon from "@mui/icons-material/Place";

// import { useState, useEffect } from "react";

// import {
//   addCustomerAddress,
//   getAddressFromCoordinates,
//   updateCustomerAddress
// } from "../../api/AllApi";

// import LocationPickerDialog from "../maps/LocationPickerDialog";

// import { useDispatch } from "react-redux";
// import { setDeliveryStatus } from "../../store/DeliverySlice";
// import { findCustomerDistance } from "../../api/AllApi";

// import { useSelector } from "react-redux";

// import { showNotification } from "../../store/DistanceNotifySlice";


// const AddressDialog = ({
//   open,
//   onClose,
//   onAddressAdded,
//   onAddressUpdated,
//   editAddress
// }) => {

//   const [mapOpen, setMapOpen] = useState(false);
//   const [coords, setCoords] = useState(null);
//   const [saveAs, setSaveAs] = useState("home");

//   const delivery = useSelector((state) => state.delivery);
//   const dispatch = useDispatch();

//   const [form, setForm] = useState({
//     contactName: "",
//     contactNumber: "",
//     addressLine1: "",
//     addressLine2: "",
//     landmark: "",
//     city: "",
//     state: "",
//     pincode: ""
//   });

//   // ✅ NEW: errors state
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (editAddress) {
//       setForm({
//         contactName: editAddress.name || "",
//         contactNumber: editAddress.mobile || "",
//         addressLine1: editAddress.address_line1 || "",
//         addressLine2: editAddress.address_line2 || "",
//         landmark: editAddress.landmark || "",
//         city: editAddress.city || "",
//         state: editAddress.state || "",
//         pincode: editAddress.pincode || ""
//       });
//       setSaveAs(editAddress.category || "home");
//     }
//   }, [editAddress]);

//   // ✅ NEW: validate a single field or all fields
//   const validateField = (name, value) => {
//     switch (name) {
//       case "contactName":
//         return value.trim() ? "" : "Contact name is required";
//       case "contactNumber":
//         return /^\d{10}$/.test(value.trim())
//           ? ""
//           : "Enter a valid 10-digit mobile number";
//       case "addressLine1":
//         return value.trim() ? "" : "Address line 1 is required";
//       case "addressLine2":
//         return value.trim() ? "" : "Address line 2 is required";
//       case "city":
//         return value.trim() ? "" : "City is required";
//       case "state":
//         return value.trim() ? "" : "State is required";
//       case "pincode":
//         return /^\d{6}$/.test(value.trim())
//           ? ""
//           : "Enter a valid 6-digit pincode";
//       default:
//         return "";
//     }
//   };

//   // ✅ NEW: validate all required fields, returns true if form is valid
//   const validateAll = () => {
//     const requiredFields = [
//       "contactName",
//       "contactNumber",
//       "addressLine1",
//       "addressLine2",
//       "city",
//       "state",
//       "pincode"
//     ];

//     const newErrors = {};
//     let isValid = true;

//     requiredFields.forEach((field) => {
//       const error = validateField(field, form[field]);
//       if (error) {
//         newErrors[field] = error;
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSaveAsChange = (event, newValue) => {
//     if (newValue !== null) {
//       setSaveAs(newValue);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));

//     // ✅ NEW: clear error as user starts typing again
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   // ✅ NEW: validate on blur
//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     const error = validateField(name, value);
//     setErrors((prev) => ({ ...prev, [name]: error }));
//   };

//   const handleLocationConfirm = async ({ lat, lng }) => {
//   try {
//     setCoords({ lat, lng });

//     const addressData = await getAddressFromCoordinates(lat, lng);

//     setForm((prev) => ({
//       ...prev,
//       addressLine1: addressData.address_line || "",
//       addressLine2: addressData.area_or_nagar || "",
//       city: addressData.city || "",
//       state: addressData.state || "",
//       pincode: addressData.pincode || ""
//     }));


//     setErrors((prev) => ({
//       ...prev,
//       addressLine1: "",
//       addressLine2: "",
//       city: "",
//       state: "",
//       pincode: ""
//     }));

//     const formattedAddress = `${addressData.address_line}, ${addressData.area_or_nagar}, ${addressData.city}, ${addressData.state} ${addressData.pincode}`;

//     const distanceResponse = await findCustomerDistance(formattedAddress);
//     const eligibility = Boolean(distanceResponse.eligibility);

//     if (!eligibility) {
//       dispatch(
//         showNotification({
//           message: "Delivery is available only within 3 km. Please select a nearby address.",
//           severity: "error"
//         })
//       );

//       // ✅ FIX: reset delivery state so Save is blocked even if user had a previously valid location
//       dispatch(
//         setDeliveryStatus({
//           lat,
//           lng,
//           address: formattedAddress,
//           eligibility: false,   // explicitly false
//           source: "profile"
//         })
//       );

//       return;
//     }

//     dispatch(
//       setDeliveryStatus({
//         lat,
//         lng,
//         address: formattedAddress,
//         eligibility: true,
//         source: "profile"
//       })
//     );

//     console.log("Delivery eligibility:", eligibility);

//   } catch (error) {
//     console.error("Location processing failed:", error);
//   }
// };




//   const handleSaveAddress = async () => {
//     // ✅ NEW: run full validation before proceeding
//     if (!validateAll()) return;

//     try {
//       if (!delivery.checked) {
//         dispatch(
//           showNotification({
//             message: "Sorry, this address is outside our 3 km delivery area.",
//             severity: "error"
//           })
//         );
//         return;
//       }

//       if (!delivery.eligibility) {
//         dispatch(
//           showNotification({
//             message: "Sorry, this address is outside our 3 km delivery area.",
//             severity: "error"
//           })
//         );
//         return;
//       }

//       const storedUser = localStorage.getItem("user");
//       if (!storedUser) throw new Error("User not found");

//       const parsedUser = JSON.parse(storedUser);

//       const payload = {
//         user_id: parsedUser.user_id,
//         name: form.contactName,
//         mobile: form.contactNumber,
//         category: saveAs,
//         address_line1: form.addressLine1,
//         address_line2: form.addressLine2,
//         landmark: form.landmark,
//         city: form.city,
//         state: form.state,
//         country: "India",
//         pincode: form.pincode
//       };

//       if (editAddress) {
//         await updateCustomerAddress({ ...payload, address_id: editAddress.id });
//         if (onAddressUpdated) onAddressUpdated();
//       } else {
//         await addCustomerAddress(payload);
//         if (onAddressAdded) onAddressAdded();
//       }

//       onClose();

//     } catch (err) {
//       console.error("Address save failed:", err);
//     }
//   };


//   return (
//     <>
//       <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" scroll="paper">

//         <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           {editAddress ? "Edit Address" : "Add Address"}
//           <IconButton onClick={onClose}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent dividers>

//           {/* Map Location */}
//           <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//             <MyLocationIcon sx={{ mr: 1, color: "#4CAF50" }} />
//             <Typography
//               sx={{ color: "#4CAF50", cursor: "pointer" }}
//               onClick={() => setMapOpen(true)}
//             >
//               Use my Current Location
//             </Typography>
//           </Box>

//           <TextField
//             label="Contact name"
//             name="contactName"
//             value={form.contactName}
//             onChange={handleChange}
//             onBlur={handleBlur}                          // ✅
//             error={Boolean(errors.contactName)}          // ✅
//             helperText={errors.contactName || ""}        // ✅
//             fullWidth
//             required
//             sx={{ mb: 2 }}
//           />

//           <TextField
//             label="Contact number"
//             name="contactNumber"
//             value={form.contactNumber}
//             onChange={handleChange}
//             onBlur={handleBlur}                          // ✅
//             error={Boolean(errors.contactNumber)}        // ✅
//             helperText={errors.contactNumber || ""}      // ✅
//             fullWidth
//             required
//             sx={{ mb: 2 }}
//           />

//           <TextField
//             label="Address line 1"
//             name="addressLine1"
//             value={form.addressLine1}
//             onChange={handleChange}
//             onBlur={handleBlur}                          // ✅
//             error={Boolean(errors.addressLine1)}         // ✅
//             helperText={errors.addressLine1 || ""}       // ✅
//             fullWidth
//             required
//             sx={{ mb: 2 }}
//           />

//           <TextField
//             label="Address line 2"
//             name="addressLine2"
//             value={form.addressLine2}
//             onChange={handleChange}
//             onBlur={handleBlur}                          // ✅
//             error={Boolean(errors.addressLine2)}         // ✅
//             helperText={errors.addressLine2 || ""}       // ✅
//             fullWidth
//             required
//             sx={{ mb: 2 }}
//           />

//           <TextField
//             label="Landmark"
//             name="landmark"
//             value={form.landmark}
//             onChange={handleChange}
//             fullWidth
//             sx={{ mb: 2 }}
//           />

//           <Grid container spacing={2} sx={{ mb: 2 }}>
//             <Grid item xs={6}>
//               <TextField
//                 label="City"
//                 name="city"
//                 value={form.city}
//                 onChange={handleChange}
//                 onBlur={handleBlur}                      // ✅
//                 error={Boolean(errors.city)}             // ✅
//                 helperText={errors.city || ""}           // ✅
//                 fullWidth
//                 required
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <TextField
//                 label="State"
//                 name="state"
//                 value={form.state}
//                 onChange={handleChange}
//                 onBlur={handleBlur}                      // ✅
//                 error={Boolean(errors.state)}            // ✅
//                 helperText={errors.state || ""}          // ✅
//                 fullWidth
//                 required
//               />
//             </Grid>
//           </Grid>

//           <TextField
//             label="Pincode"
//             name="pincode"
//             value={form.pincode}
//             onChange={handleChange}
//             onBlur={handleBlur}                          // ✅
//             error={Boolean(errors.pincode)}              // ✅
//             helperText={errors.pincode || ""}            // ✅
//             fullWidth
//             required
//             sx={{ mb: 3 }}
//           />

//           <Typography sx={{ mb: 1, fontWeight: 500 }}>Save as</Typography>

//           <ToggleButtonGroup
//             value={saveAs}
//             exclusive
//             onChange={handleSaveAsChange}
//             sx={{ mb: 3 }}
//           >
//             <ToggleButton value="home"><HomeIcon sx={{ mr: 1 }} />Home</ToggleButton>
//             <ToggleButton value="work"><WorkIcon sx={{ mr: 1 }} />Work</ToggleButton>
//             <ToggleButton value="other"><PlaceIcon sx={{ mr: 1 }} />Other</ToggleButton>
//           </ToggleButtonGroup>

//           <Button
//             fullWidth
//             variant="contained"
//             onClick={handleSaveAddress}
//             sx={{
//               backgroundColor: "#4CAF50",
//               height: 48,
//               fontWeight: 600,
//               "&:hover": { backgroundColor: "#43A047" }
//             }}
//           >
//             Save Address
//           </Button>

//         </DialogContent>
//       </Dialog>

//       <LocationPickerDialog
//         open={mapOpen}
//         onClose={() => setMapOpen(false)}
//         onConfirm={handleLocationConfirm}
//       />
//     </>
//   );
// };

// export default AddressDialog;