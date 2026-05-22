import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  IconButton,
  Typography,
  Divider
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Helper: Google address_components array-ல இருந்து
// city, state, pincode மட்டும் extract பண்றது
// ─────────────────────────────────────────────────────────────────────────────
const parseAddressComponents = (components = []) => {
  let city = "";
  let state = "";
  let pincode = "";

  components.forEach((comp) => {
    const types = comp.types || [];

    // City → locality (or sublocality_level_1 as fallback)
    if (types.includes("locality")) {
      city = comp.long_name;
    }

    // State → administrative_area_level_1
    if (types.includes("administrative_area_level_1")) {
      state = comp.long_name;
    }

    // Pincode → postal_code
    if (types.includes("postal_code")) {
      pincode = comp.long_name;
    }
  });

  return { city, state, pincode };
};

const LocationPickerDialog = ({ open, onClose, onConfirm }) => {

  const mapRef    = useRef(null);
  const markerRef = useRef(null);

  const [coords,  setCoords]  = useState(null);
  const [address, setAddress] = useState("");

  // ✅ Store parsed city/state/pincode in state so handleConfirm can use it
  const [parsedLocation, setParsedLocation] = useState({
    city: "",
    state: "",
    pincode: ""
  });

  const geocoderRef = useRef(null);

  // ─── Reverse geocode lat/lng → address + parse components ──────────────────
  const fetchAddress = (lat, lng) => {
    if (!geocoderRef.current) return;

    geocoderRef.current.geocode(
      { location: { lat, lng } },
      (results, status) => {
        if (status === "OK" && results[0]) {
          // Full formatted address for display
          setAddress(results[0].formatted_address);

          // ✅ Parse city, state, pincode from address_components
          const { city, state, pincode } = parseAddressComponents(
            results[0].address_components
          );
          setParsedLocation({ city, state, pincode });

        } else {
          setAddress("Address not found");
          setParsedLocation({ city: "", state: "", pincode: "" });
          alert("Address not found. Please try selecting a different location.");
        }
      }
    );
  };

  useEffect(() => {
    if (!open || !window.google) return;

    geocoderRef.current = new window.google.maps.Geocoder();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const center = { lat, lng };

        const map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom: 17
        });

        const marker = new window.google.maps.Marker({
          position: center,
          map,
          draggable: true
        });

        markerRef.current = marker;
        setCoords(center);
        fetchAddress(lat, lng);

        // Map click
        map.addListener("click", (event) => {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          marker.setPosition(event.latLng);
          setCoords({ lat, lng });
          fetchAddress(lat, lng);
        });

        // Marker drag
        marker.addListener("dragend", (event) => {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          setCoords({ lat, lng });
          fetchAddress(lat, lng);
        });
      },
      () => {
        alert("Location permission denied");
      }
    );
  }, [open]);

  // ─── Confirm ───────────────────────────────────────────────────────────────
  const handleConfirm = () => {
    if (!coords || !address) return;

    // ✅ Save city, state, pincode to localStorage
    // Key: "selectedLocation" → { city, state, pincode, lat, lng, fullAddress }
    const locationData = {
      city:        parsedLocation.city,
      state:       parsedLocation.state,
      pincode:     parsedLocation.pincode,
      lat:         coords.lat,
      lng:         coords.lng,
      fullAddress: address
    };

    localStorage.setItem("selectedLocation", JSON.stringify(locationData));

    // Pass coords + address back to parent (AddressDialog)
    onConfirm({
      lat:     coords.lat,
      lng:     coords.lng,
      address: address
    });

    onClose();
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">

      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        Select Location
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent>

        {/* MAP */}
        <Box
          ref={mapRef}
          sx={{
            width: "100%",
            height: 420,
            borderRadius: 2,
            mb: 2
          }}
        />

        {/* ADDRESS PREVIEW */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            background: "#f5f5f5",
            p: 2,
            borderRadius: 2,
            mb: 2
          }}
        >
          <LocationOnIcon sx={{ color: "#4CAF50", mt: "2px" }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Selected Location
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {address || "Move the marker to select location"}
            </Typography>

            {/* ✅ Show parsed city / state / pincode below address */}
            {(parsedLocation.city || parsedLocation.pincode) && (
              <Typography
                variant="body2"
                sx={{ color: "#4CAF50", fontWeight: 600, mt: 0.5 }}
              >
                {[parsedLocation.city, parsedLocation.state, parsedLocation.pincode]
                  .filter(Boolean)
                  .join(", ")}
              </Typography>
            )}
          </Box>
        </Box>

        {/* CONFIRM BUTTON */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleConfirm}
          sx={{
            height: 48,
            fontWeight: 600,
            backgroundColor: "#4CAF50",
            "&:hover": { backgroundColor: "#43A047" }
          }}
        >
          Confirm Location
        </Button>

      </DialogContent>
    </Dialog>
  );
};

export default LocationPickerDialog;




// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Button,
//   Box,
//   IconButton,
//   Typography,
//   Divider
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

// import { useEffect, useRef, useState } from "react";

// const LocationPickerDialog = ({ open, onClose, onConfirm }) => {

//   const mapRef = useRef(null);
//   const markerRef = useRef(null);

//   const [coords, setCoords] = useState(null);
//   const [address, setAddress] = useState("");

//   const geocoderRef = useRef(null);

//   /*
//   Reverse geocode lat/lng → readable address
//   */
//   const fetchAddress = (lat, lng) => {

//     if (!geocoderRef.current) return;

//     geocoderRef.current.geocode(
//       { location: { lat, lng } },
//       (results, status) => {

//         if (status === "OK" && results[0]) {
//           setAddress(results[0].formatted_address);
//         } else {
//           setAddress("Address not found");
//         }

//       }
//     );
//   };

//   useEffect(() => {

//     if (!open || !window.google) return;

//     geocoderRef.current = new window.google.maps.Geocoder();

//     navigator.geolocation.getCurrentPosition(

//       (position) => {

//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         const center = { lat, lng };

//         const map = new window.google.maps.Map(mapRef.current, {
//           center,
//           zoom: 17
//         });

//         const marker = new window.google.maps.Marker({
//           position: center,
//           map,
//           draggable: true
//         });

//         markerRef.current = marker;

//         setCoords(center);

//         fetchAddress(lat, lng);

//         /*
//         Map click
//         */
//         map.addListener("click", (event) => {

//           const lat = event.latLng.lat();
//           const lng = event.latLng.lng();

//           marker.setPosition(event.latLng);

//           setCoords({ lat, lng });

//           fetchAddress(lat, lng);

//         });

//         /*
//         Marker drag
//         */
//         marker.addListener("dragend", (event) => {

//           const lat = event.latLng.lat();
//           const lng = event.latLng.lng();

//           setCoords({ lat, lng });

//           fetchAddress(lat, lng);

//         });

//       },

//       () => {
//         alert("Location permission denied");
//       }

//     );

//   }, [open]);

//   // const handleConfirm = () => {

//   //   if (!coords) return;

//   //   onConfirm(coords);
//   //   onClose();

//   // };



//   const handleConfirm = () => {

//   if (!coords || !address) return;

//   onConfirm({
//     lat: coords.lat,
//     lng: coords.lng,
//     address: address
//   });

//   onClose();

// };

//   return (

//     <Dialog open={open} fullWidth maxWidth="md">

//       <DialogTitle
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center"
//         }}
//       >

//         Select Location

//         <IconButton onClick={onClose}>
//           <CloseIcon />
//         </IconButton>

//       </DialogTitle>

//       <Divider />

//       <DialogContent>

//         {/* MAP */}

//         <Box
//           ref={mapRef}
//           sx={{
//             width: "100%",
//             height: 420,
//             borderRadius: 2,
//             mb: 2
//           }}
//         />

//         {/* ADDRESS PREVIEW */}

//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "flex-start",
//             gap: 1,
//             background: "#f5f5f5",
//             p: 2,
//             borderRadius: 2,
//             mb: 2
//           }}
//         >

//           <LocationOnIcon sx={{ color: "#4CAF50", mt: "2px" }} />

//           <Box>

//             <Typography
//               variant="body2"
//               sx={{ fontWeight: 600 }}
//             >
//               Selected Location
//             </Typography>

//             <Typography
//               variant="body2"
//               sx={{ color: "text.secondary" }}
//             >
//               {address || "Move the marker to select location"}
//             </Typography>

//           </Box>

//         </Box>

//         {/* CONFIRM BUTTON */}

//         <Button
//           variant="contained"
//           fullWidth
//           onClick={handleConfirm}
//           sx={{
//             height: 48,
//             fontWeight: 600,
//             backgroundColor: "#4CAF50",
//             "&:hover": {
//               backgroundColor: "#43A047"
//             }
//           }}
//         >
//           Confirm Location
//         </Button>

//       </DialogContent>

//     </Dialog>

//   );

// };

// export default LocationPickerDialog;