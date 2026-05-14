// import { useEffect, useRef, useState } from "react";
// import { Box, Typography } from "@mui/material";

// const DeliveryMap = ({ destinationAddress }) => {
//   const mapRef = useRef(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!destinationAddress) return;

//     // Google Maps script already loaded-ஆ check பண்ணு
//     const initMap = () => {
//       if (!window.google) {
//         setError("Google Maps load ஆகவில்லை.");
//         return;
//       }

//       const map = new window.google.maps.Map(mapRef.current, {
//         zoom: 14,
//         center: { lat: 13.0827, lng: 80.2707 }, // default center (Chennai)
//       });

//       const geocoder = new google.maps.Geocoder();
//       const directionsService = new google.maps.DirectionsService();
//       const directionsRenderer = new google.maps.DirectionsRenderer();
//       directionsRenderer.setMap(map);

//       // Step 1: Delivery boy-ஓட current location எடு
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const myLocation = {
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           };

//           // Step 2: Customer address-ஐ geocode பண்ணு (address → lat/lng)
//           geocoder.geocode({ address: destinationAddress }, (results, status) => {
//             if (status !== "OK" || !results[0]) {
//               setError("Delivery address find ஆகவில்லை.");
//               return;
//             }

//             const customerLocation = results[0].geometry.location;

//             // Step 3: Route draw பண்ணு
//             directionsService.route(
//               {
//                 origin: myLocation,
//                 destination: customerLocation,
//                 travelMode:google.maps.TravelMode.DRIVING,
//               },
//               (response, status) => {
//                 if (status === "OK") {
//                   directionsRenderer.setDirections(response);
//                 } else {
//                   setError("Route கண்டுபிடிக்க முடியவில்லை: " + status);
//                 }
//               }
//             );
//           });
//         },
//         () => {
//           setError("உங்கள் location access கொடுக்கவில்லை.");
//         }
//       );
//     };

//     // Script already loaded-ஆ இருந்தா directly call பண்ணு
//     // if (window.google && window.google.maps) {
//     //   initMap();
//     // } else {
//     //   // Script இல்லன்னா load பண்ணு
//     //   const existing = document.getElementById("google-maps-script");
//     //   if (!existing) {
//     //     const script = document.createElement("script");
//     //     script.id = "google-maps-script";
//     //     // உங்கள் API key இங்க போடுங்கள்
//     //     script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
//     //     script.async = true;
//     //     script.defer = true;
//     //     script.onload = initMap;
//     //     document.head.appendChild(script);
//     //   } else {
//     //     // Script tag இருக்கு, ஆனா load ஆகல — onload wait பண்ணு
//     //     existing.onload = initMap;
//     //   }
//     // }
//     // Script already loaded-ஆ இருந்தா directly call பண்ணு
// if (window.google && window.google.maps) {
//   initMap();
// } else {

//   const existing = document.getElementById("google-maps-script");

//   if (!existing) {
//     const script = document.createElement("script");

//     script.id = "google-maps-script";

//     script.src =
//       `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;

//     script.async = true;
//     script.defer = true;

//     script.onload = initMap;

//     document.head.appendChild(script);

//   } else {
//     initMap();
//   }
// }
//   }, [destinationAddress]);

//   return (
//     <Box sx={{ height: "100%", position: "relative" }}>
//       {error ? (
//         <Box
//           sx={{
//             height: "100%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#F8FAFC",
//           }}
//         >
//           <Typography sx={{ color: "#EF4444", fontSize: "0.875rem", px: 2, textAlign: "center" }}>
//             {error}
//           </Typography>
//         </Box>
//       ) : (
//         <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
//       )}
//     </Box>
//   );
// };

// export default DeliveryMap;





import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

const DeliveryMap = ({ destinationAddress }) => {
  const mapRef = useRef(null);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!destinationAddress) {
      console.log("❌ destinationAddress empty");
      return;
    }

    console.log("✅ Destination Address:", destinationAddress);

    const initMap = () => {
      console.log("✅ initMap called");

      if (!window.google || !window.google.maps) {
        console.log("❌ Google Maps not loaded");
        setError("Google Maps load ஆகவில்லை.");
        return;
      }

      console.log("✅ Google Maps loaded");

      // MAP CREATE
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 14,
        center: { lat: 13.0827, lng: 80.2707 },
      });

      console.log("✅ Map created");

      const geocoder = new window.google.maps.Geocoder();

      const directionsService =
        new window.google.maps.DirectionsService();

      const directionsRenderer =
        new window.google.maps.DirectionsRenderer();

      directionsRenderer.setMap(map);

      console.log("✅ Directions services created");

      // GET CURRENT LOCATION
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log("✅ Current location fetched");

          const myLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          console.log("📍 My Location:", myLocation);

          // GEOCODE CUSTOMER ADDRESS
          geocoder.geocode(
            {
              address: destinationAddress,
              region: "IN",
            },
            (results, status) => {
              console.log("📌 Geocode Status:", status);

              if (status !== "OK" || !results[0]) {
                console.log("❌ Geocode failed");
                setError("Delivery address find ஆகவில்லை.");
                return;
              }

              console.log("✅ Geocode success");

              const customerLocation =
                results[0].geometry.location;

              console.log("📍 Customer Location:", {
                lat: customerLocation.lat(),
                lng: customerLocation.lng(),
              });

              // ROUTE DRAW
              directionsService.route(
                {
                  origin: myLocation,

                  destination: {
                    lat: customerLocation.lat(),
                    lng: customerLocation.lng(),
                  },

                  travelMode:
                    window.google.maps.TravelMode.DRIVING,
                },

                (response, status) => {
                  console.log("🚗 Route Status:", status);

                  if (status === "OK") {
                    console.log("✅ Route success");

                    directionsRenderer.setDirections(response);
                  } else {
                    console.log("❌ Route failed");

                    setError(
                      "Route கண்டுபிடிக்க முடியவில்லை: " +
                        status
                    );
                  }
                }
              );
            }
          );
        },

        (geoError) => {
          console.log("❌ Location permission denied");
          console.log(geoError);

          setError("உங்கள் location access கொடுக்கவில்லை.");
        }
      );
    };

    // GOOGLE SCRIPT LOAD
    if (window.google && window.google.maps) {
      console.log("✅ Google already loaded");
      initMap();
    } else {
      console.log("⌛ Loading Google script");

      const existing =
        document.getElementById("google-maps-script");

      if (!existing) {
        const script = document.createElement("script");

        script.id = "google-maps-script";

        script.src =
          `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

        script.async = true;
        script.defer = true;

        script.onload = () => {
          console.log("✅ Script loaded");
          initMap();
        };

        script.onerror = () => {
          console.log("❌ Script load failed");
          setError("Google script load failed");
        };

        document.head.appendChild(script);

      } else {
        console.log("✅ Existing script found");
        initMap();
      }
    }
  }, [destinationAddress]);

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      {error ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F8FAFC",
          }}
        >
          <Typography
            sx={{
              color: "#EF4444",
              fontSize: "0.875rem",
              px: 2,
              textAlign: "center",
            }}
          >
            {error}
          </Typography>
        </Box>
      ) : (
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </Box>
  );
};

export default DeliveryMap;