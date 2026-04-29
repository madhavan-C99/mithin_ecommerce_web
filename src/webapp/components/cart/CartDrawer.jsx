// // cartdrawer.jsx

// import {
//   Drawer,
//   Box,
//   Typography,
//   IconButton,
//   Stack,
//   Button,
//   Divider,
//   Avatar,
//   LinearProgress,
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
// import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
// import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

// import { useSelector, useDispatch } from "react-redux";
// import { openCartDrawer, closeCartDrawer } from "../../store/UiSlice";

// import { Slide } from "@mui/material";

// import {
//   incrementCartItem,
//   decrementCartItem,
//   removeCartItem,
//   clearCartAsync,
// } from "../../store/CartActions";

// import { useLocation, useNavigate } from "react-router-dom";

// import { showNotification } from "../../store/DistanceNotifySlice";
// import { useEffect } from "react";

// const CartDrawer = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const open        = useSelector((state) => state.ui.cartDrawerOpen);
//   const items       = useSelector((state) => state.cart.items);
//   const delivery    = useSelector((state) => state.delivery);
//   const loadingMap  = useSelector((state) => state.cart.loading.items);

//   // ── Delivery config from Redux
//   // These are fixed config values (₹50 charge, ₹200 threshold)
//   // fetched from server on login/refresh via fetchCartFromServer
//   // If admin changes them in backend → reflects on next login/refresh ✅
//   const deliveryChargeAmount = useSelector((state) => state.cart.delivery_charge_amount ?? 50);
//   const minOrderAmount       = useSelector((state) => state.cart.min_order_amount ?? 200);

//   // Config is valid only when minOrderAmount is a positive number
//   // Prevents incorrect "FREE delivery" flash before server responds
//   const isDeliveryConfigLoaded = minOrderAmount > 0;

//   // ── Subtotal — calculated in real time from Redux cart items
//   const subtotal = items.reduce((acc, item) => {
//     const weightPrice = Number(item.price) * Number(item.weight);
//     return acc + weightPrice * item.quantity;
//   }, 0);

//   // ── Final delivery charge — calculated in real time using live subtotal
//   // This is what makes the progress bar + delivery row always accurate
//   // even when user adds/removes items without refreshing
//   const finalDeliveryCharge =
//     isDeliveryConfigLoaded && subtotal > 0 && subtotal < minOrderAmount
//       ? deliveryChargeAmount   // ← fixed config value e.g. ₹50
//       : 0;                     // ← free delivery

//   const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

//   useEffect(() => {
//     if (location.pathname === "/cart") {
//       dispatch(openCartDrawer());
//     } else {
//       dispatch(closeCartDrawer());
//     }
//   }, [location.pathname, dispatch]);

//   const handleCheckout = () => {
//     if (!delivery.checked) {
//       dispatch(
//         showNotification({
//           message: "Please select your delivery location before checkout.",
//           severity: "error",
//         })
//       );
//       return;
//     }

//     if (!delivery.eligibility) {
//       dispatch(
//         showNotification({
//           message: "Sorry, we currently deliver only within a 3 km radius.",
//           severity: "error",
//         })
//       );
//       return;
//     }

//     dispatch(closeCartDrawer());
//     navigate("/checkout");
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={() => { navigate(-1); }}
//       transitionDuration={300}
//       PaperProps={{
//         sx: {
//           width: 380,
//           display: "flex",
//           flexDirection: "column",
//         },
//       }}
//     >
//       {/* HEADER */}
//       <Box p={2}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6" fontWeight={600}>
//             Cart ({totalItems})
//           </Typography>

//           <Stack direction="row" spacing={1}>
//             {items.length > 0 && (
//               <IconButton
//                 size="small"
//                 color="error"
//                 onClick={() => dispatch(clearCartAsync())}
//               >
//                 <DeleteSweepIcon />
//               </IconButton>
//             )}
//             <IconButton onClick={() => navigate(-1)}>
//               <CloseIcon />
//             </IconButton>
//           </Stack>
//         </Stack>
//       </Box>

//       <Divider />

//       {/* CART ITEMS */}
//       <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
//         {items.length === 0 ? (
//           <Box
//             sx={{
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               textAlign: "center",
//               color: "#9e9e9e",
//             }}
//           >
//             <ShoppingCartCheckoutIcon sx={{ fontSize: 80, mb: 2, opacity: 0.3 }} />

//             <Typography variant="h6" fontWeight={600}>
//               Your cart is empty
//             </Typography>

//             <Typography variant="body2" sx={{ mt: 1, mb: 3 }}>
//               Looks like you haven't added anything yet.
//             </Typography>

//             <Button
//               variant="outlined"
//               sx={{
//                 borderColor: "#4CAF50",
//                 color: "#4CAF50",
//                 "&:hover": {
//                   borderColor: "#43A047",
//                   backgroundColor: "#f1f8f4",
//                 },
//               }}
//               onClick={() => navigate("/")}
//             >
//               Continue Shopping
//             </Button>
//           </Box>
//         ) : (
//           items.map((item) => {
//             const incrementLoading = loadingMap[item.cartKey]?.increment || false;
//             const decrementLoading = loadingMap[item.cartKey]?.decrement || false;
//             const unit             = item.unit || "kg";
//             const weightPrice      = Number(item.price) * Number(item.weight);
//             const itemTotal        = weightPrice * item.quantity;

//             return (
//               <Slide key={item.cartKey} direction="left" in={true} mountOnEnter timeout={300}>
//                 <Box
//                   mb={2}
//                   p={2}
//                   sx={{
//                     border: "1px solid #eeeeee",
//                     borderRadius: 3,
//                     display: "flex",
//                     gap: 2,
//                     alignItems: "center",
//                   }}
//                 >
//                   {/* PRODUCT IMAGE */}
//                   <Avatar
//                     src={item.image}
//                     variant="rounded"
//                     sx={{ width: 64, height: 64 }}
//                   />

//                   {/* DETAILS */}
//                   <Box sx={{ flex: 1 }}>
//                     <Typography fontWeight={600} fontSize={14}>
//                       {item.title}
//                     </Typography>

//                     <Typography variant="body2" color="text.secondary">
//                       {item.weight} {unit}
//                     </Typography>

//                     <Typography variant="body2" color="text.secondary">
//                       ₹ {weightPrice.toFixed(2)} × {item.quantity}
//                     </Typography>

//                     {/* Quantity Controls */}
//                     <Stack direction="row" spacing={1} alignItems="center" mt={1}>
//                       <Button
//                         disabled={decrementLoading}
//                         size="small"
//                         sx={{ minWidth: 28 }}
//                         onClick={() => dispatch(decrementCartItem(item.cartKey))}
//                       >
//                         {decrementLoading ? "..." : "-"}
//                       </Button>

//                       <Typography fontSize={14}>{item.quantity}</Typography>

//                       <Button
//                         disabled={incrementLoading}
//                         size="small"
//                         sx={{ minWidth: 28 }}
//                         onClick={() => dispatch(incrementCartItem(item.cartKey))}
//                       >
//                         {incrementLoading ? "..." : "+"}
//                       </Button>
//                     </Stack>
//                   </Box>

//                   {/* REMOVE */}
//                   <IconButton
//                     size="small"
//                     color="error"
//                     onClick={() => dispatch(removeCartItem(item.cartKey))}
//                   >
//                     <DeleteOutlineIcon />
//                   </IconButton>

//                   {/* ITEM TOTAL */}
//                   <Typography fontWeight={600} fontSize={14}>
//                     ₹ {itemTotal.toFixed(2)}
//                   </Typography>
//                 </Box>
//               </Slide>
//             );
//           })
//         )}
//       </Box>

//       <Divider />

//       {/* FOOTER */}
//       <Box p={2}>
//         <Stack spacing={2}>

//           {/* FREE DELIVERY PROGRESS BAR
//               — only renders when cart has items AND config is loaded from server
//               — uses real-time subtotal vs minOrderAmount for accurate display */}
//           {items.length > 0 && isDeliveryConfigLoaded && (
//             <Box
//               sx={{
//                 backgroundColor: "#f4faf4",
//                 border: "1px solid #d8eed8",
//                 borderRadius: "12px",
//                 px: 2,
//                 py: 1.5,
//               }}
//             >
//               {finalDeliveryCharge > 0 ? (
//                 // subtotal < minOrderAmount → show warning + orange bar
//                 <>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1 }}>
//                     <LocalShippingOutlinedIcon sx={{ fontSize: 15, color: "#e65100" }} />
//                     <Typography fontSize={12.5} fontWeight={600} color="#e65100">
//                       Add ₹{(minOrderAmount - subtotal).toFixed(0)} more for FREE delivery
//                     </Typography>
//                   </Box>
//                   <LinearProgress
//                     variant="determinate"
//                     value={Math.min((subtotal / minOrderAmount) * 100, 100)}
//                     sx={{
//                       height: 6,
//                       borderRadius: 3,
//                       backgroundColor: "#ffe0cc",
//                       "& .MuiLinearProgress-bar": {
//                         backgroundColor: "#e65100",
//                         borderRadius: 3,
//                       },
//                     }}
//                   />
//                 </>
//               ) : (
//                 // subtotal >= minOrderAmount → free delivery unlocked
//                 <>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1 }}>
//                     <LocalShippingOutlinedIcon sx={{ fontSize: 15, color: "#2e7d32" }} />
//                     <Typography fontSize={12.5} fontWeight={600} color="#2e7d32">
//                       🎉 You've unlocked FREE delivery!
//                     </Typography>
//                   </Box>
//                   <LinearProgress
//                     variant="determinate"
//                     value={100}
//                     sx={{
//                       height: 6,
//                       borderRadius: 3,
//                       backgroundColor: "#c8e6c9",
//                       "& .MuiLinearProgress-bar": {
//                         backgroundColor: "#2e7d32",
//                         borderRadius: 3,
//                       },
//                     }}
//                   />
//                 </>
//               )}
//             </Box>
//           )}

//           {/* SUBTOTAL ROW */}
//           <Stack direction="row" justifyContent="space-between">
//             <Typography fontWeight={600}>Subtotal</Typography>
//             <Typography fontWeight={600}>₹ {subtotal.toFixed(2)}</Typography>
//           </Stack>

//           {/* DELIVERY ROW
//               — only shows when cart has items AND config is loaded
//               — uses finalDeliveryCharge (real-time) for condition
//               — uses deliveryChargeAmount (fixed config) for display amount */}
//           {items.length > 0 && isDeliveryConfigLoaded && (
//             <Stack direction="row" justifyContent="space-between" alignItems="center">
//               <Typography fontSize={13} color="text.secondary">
//                 Delivery
//               </Typography>
//               {finalDeliveryCharge > 0 ? (
//                 <Typography fontSize={13} fontWeight={600} color="#e65100">
//                   ₹ {deliveryChargeAmount.toFixed(2)}
//                 </Typography>
//               ) : (
//                 <Typography fontSize={13} fontWeight={700} color="#2e7d32">
//                   FREE
//                 </Typography>
//               )}
//             </Stack>
//           )}

//           {/* CHECKOUT BUTTON */}
//           <Button
//             variant="contained"
//             fullWidth
//             startIcon={<ShoppingCartCheckoutIcon />}
//             disabled={items.length === 0}
//             sx={{
//               backgroundColor: "#4CAF50",
//               "&:hover": { backgroundColor: "#43A047" },
//             }}
//             onClick={handleCheckout}
//           >
//             Checkout
//           </Button>

//         </Stack>
//       </Box>
//     </Drawer>
//   );
// };

// export default CartDrawer;











// cartdrawer.jsx

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  Button,
  Divider,
  Avatar,
  LinearProgress,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import { useSelector, useDispatch } from "react-redux";
import { openCartDrawer, closeCartDrawer } from "../../store/UiSlice";

import { Slide } from "@mui/material";

import { fetchCartFromServer } from "../../store/CartSlice";

import {
  incrementCartItem,
  decrementCartItem,
  removeCartItem,
  clearCartAsync,
} from "../../store/CartActions";

import { useLocation, useNavigate } from "react-router-dom";

import { showNotification } from "../../store/DistanceNotifySlice";
import { useEffect } from "react";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const open        = useSelector((state) => state.ui.cartDrawerOpen);
  const items       = useSelector((state) => state.cart.items);
  const delivery    = useSelector((state) => state.delivery);
  const loadingMap  = useSelector((state) => state.cart.loading.items);

  // ── Delivery config from Redux
  // These are fixed config values (₹50 charge, ₹200 threshold)
  // fetched from server on login/refresh via fetchCartFromServer
  // If admin changes them in backend → reflects on next login/refresh ✅
  const deliveryChargeAmount = useSelector((state) => state.cart.delivery_charge_amount ?? 50);
  const minOrderAmount       = useSelector((state) => state.cart.min_order_amount ?? 200);

  // Config is valid only when minOrderAmount is a positive number
  // Prevents incorrect "FREE delivery" flash before server responds
  const isDeliveryConfigLoaded = minOrderAmount > 0;

  // ── Subtotal — calculated in real time from Redux cart items
  const subtotal = items.reduce((acc, item) => {
    const weightPrice = Number(item.price) * Number(item.weight);
    return acc + weightPrice * item.quantity;
  }, 0);

  // ── Final delivery charge — calculated in real time using live subtotal
  // This is what makes the progress bar + delivery row always accurate
  // even when user adds/removes items without refreshing
  const finalDeliveryCharge =
    isDeliveryConfigLoaded && subtotal > 0 && subtotal < minOrderAmount
      ? deliveryChargeAmount   // ← fixed config value e.g. ₹50
      : 0;                     // ← free delivery

  // ── Grand total — live derived (subtotal + finalDeliveryCharge)
  // More accurate than state.cart.grand_total (server snapshot)
  // because it reflects every quantity change the user makes in real time
  const grandTotal = subtotal + finalDeliveryCharge;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  // useEffect(() => {
  //   if (location.pathname === "/cart") {
  //     dispatch(openCartDrawer());
  //   } else {
  //     dispatch(closeCartDrawer());
  //   }
  // }, [location.pathname, dispatch]);




  // ── ADD: import fetchCartFromServer at the top of the file
// (add this with your other CartSlice/CartActions imports)
// import { fetchCartFromServer } from "../../store/CartSlice";

useEffect(() => {
  if (location.pathname === "/cart") {
    dispatch(openCartDrawer());

    // ── Fetch fresh delivery config every time cart opens
    // This ensures admin changes to delivery_charge_amount
    // and min_order_amount reflect in real time for the user
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId   = userData?.user_id;
    if (userId) {
      dispatch(fetchCartFromServer(userId));
    }

  } else {
    dispatch(closeCartDrawer());
  }
}, [location.pathname, dispatch]);




  const handleCheckout = () => {
    if (!delivery.checked) {
      dispatch(
        showNotification({
          message: "Please select your delivery location before checkout.",
          severity: "error",
        })
      );
      return;
    }

    if (!delivery.eligibility) {
      dispatch(
        showNotification({
          message: "Sorry, we currently deliver only within a 3 km radius.",
          severity: "error",
        })
      );
      return;
    }

    dispatch(closeCartDrawer());
    navigate("/checkout");
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => { navigate(-1); }}
      transitionDuration={300}
      PaperProps={{
        sx: {
          width: 380,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* HEADER */}
      <Box p={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Cart ({totalItems})
          </Typography>

          <Stack direction="row" spacing={1}>
            {items.length > 0 && (
              <IconButton
                size="small"
                color="error"
                onClick={() => dispatch(clearCartAsync())}
              >
                <DeleteSweepIcon />
              </IconButton>
            )}
            <IconButton onClick={() => navigate(-1)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      {/* CART ITEMS */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {items.length === 0 ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "#9e9e9e",
            }}
          >
            <ShoppingCartCheckoutIcon sx={{ fontSize: 80, mb: 2, opacity: 0.3 }} />

            <Typography variant="h6" fontWeight={600}>
              Your cart is empty
            </Typography>

            <Typography variant="body2" sx={{ mt: 1, mb: 3 }}>
              Looks like you haven't added anything yet.
            </Typography>

            <Button
              variant="outlined"
              sx={{
                borderColor: "#4CAF50",
                color: "#4CAF50",
                "&:hover": {
                  borderColor: "#43A047",
                  backgroundColor: "#f1f8f4",
                },
              }}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          items.map((item) => {
            const incrementLoading = loadingMap[item.cartKey]?.increment || false;
            const decrementLoading = loadingMap[item.cartKey]?.decrement || false;
            const unit             = item.unit || "kg";
            const weightPrice      = Number(item.price) * Number(item.weight);
            const itemTotal        = weightPrice * item.quantity;

            return (
              <Slide key={item.cartKey} direction="left" in={true} mountOnEnter timeout={300}>
                <Box
                  mb={2}
                  p={2}
                  sx={{
                    border: "1px solid #eeeeee",
                    borderRadius: 3,
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  {/* PRODUCT IMAGE */}
                  <Avatar
                    src={item.image}
                    variant="rounded"
                    sx={{ width: 64, height: 64 }}
                  />

                  {/* DETAILS */}
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={600} fontSize={14}>
                      {item.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.weight} {unit}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      ₹ {weightPrice.toFixed(2)} × {item.quantity}
                    </Typography>

                    {/* Quantity Controls */}
                    <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                      <Button
                        disabled={decrementLoading}
                        size="small"
                        sx={{ minWidth: 28 }}
                        onClick={() => dispatch(decrementCartItem(item.cartKey))}
                      >
                        {decrementLoading ? "..." : "-"}
                      </Button>

                      <Typography fontSize={14}>{item.quantity}</Typography>

                      <Button
                        disabled={incrementLoading}
                        size="small"
                        sx={{ minWidth: 28 }}
                        onClick={() => dispatch(incrementCartItem(item.cartKey))}
                      >
                        {incrementLoading ? "..." : "+"}
                      </Button>
                    </Stack>
                  </Box>

                  {/* REMOVE */}
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => dispatch(removeCartItem(item.cartKey))}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>

                  {/* ITEM TOTAL */}
                  <Typography fontWeight={600} fontSize={14}>
                    ₹ {itemTotal.toFixed(2)}
                  </Typography>
                </Box>
              </Slide>
            );
          })
        )}
      </Box>

      <Divider />

      {/* FOOTER */}
      <Box p={2}>
        <Stack spacing={2}>

          {/* FREE DELIVERY PROGRESS BAR
              — only renders when cart has items AND config is loaded from server
              — uses real-time subtotal vs minOrderAmount for accurate display */}
          {items.length > 0 && isDeliveryConfigLoaded && (
            <Box
              sx={{
                backgroundColor: "#f4faf4",
                border: "1px solid #d8eed8",
                borderRadius: "12px",
                px: 2,
                py: 1.5,
              }}
            >
              {finalDeliveryCharge > 0 ? (
                // subtotal < minOrderAmount → show warning + orange bar
                <>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1 }}>
                    <LocalShippingOutlinedIcon sx={{ fontSize: 15, color: "#e65100" }} />
                    <Typography fontSize={12.5} fontWeight={600} color="#e65100">
                      Add ₹{(minOrderAmount - subtotal).toFixed(0)} more for FREE delivery
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min((subtotal / minOrderAmount) * 100, 100)}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#ffe0cc",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#e65100",
                        borderRadius: 3,
                      },
                    }}
                  />
                </>
              ) : (
                // subtotal >= minOrderAmount → free delivery unlocked
                <>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1 }}>
                    <LocalShippingOutlinedIcon sx={{ fontSize: 15, color: "#2e7d32" }} />
                    <Typography fontSize={12.5} fontWeight={600} color="#2e7d32">
                      🎉 You've unlocked FREE delivery!
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#c8e6c9",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#2e7d32",
                        borderRadius: 3,
                      },
                    }}
                  />
                </>
              )}
            </Box>
          )}

          {/* SUBTOTAL ROW */}
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight={600}>Subtotal</Typography>
            <Typography fontWeight={600}>₹ {subtotal.toFixed(2)}</Typography>
          </Stack>

          {/* DELIVERY ROW
              — only shows when cart has items AND config is loaded
              — uses finalDeliveryCharge (real-time) for condition
              — uses deliveryChargeAmount (fixed config) for display amount */}
          {items.length > 0 && isDeliveryConfigLoaded && (
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography fontSize={13} color="text.secondary">
                Delivery
              </Typography>
              {finalDeliveryCharge > 0 ? (
                <Typography fontSize={13} fontWeight={600} color="#e65100">
                  ₹ {deliveryChargeAmount.toFixed(2)}
                </Typography>
              ) : (
                <Typography fontSize={13} fontWeight={700} color="#2e7d32">
                  FREE
                </Typography>
              )}
            </Stack>
          )}

          {/* ── GRAND TOTAL ROW
              — only shows when cart has items AND delivery config is loaded
              — live derived: subtotal + finalDeliveryCharge
              — styled distinctly so user can clearly see the payable amount */}
          {items.length > 0 && isDeliveryConfigLoaded && (
            <>
              <Divider sx={{ borderStyle: "dashed", borderColor: "#e0e0e0" }} />
              <Box
                sx={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e8f5e9",
                  borderRadius: "10px",
                  px: 2,
                  py: 1.5,
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography fontSize={13} fontWeight={600} color="text.secondary">
                      Grand Total
                    </Typography>
                    <Typography fontSize={11} color="text.disabled" sx={{ mt: 0.2 }}>
                      Incl. delivery charges
                    </Typography>
                  </Box>
                  <Typography
                    fontSize={20}
                    fontWeight={800}
                    color="#1b5e20"
                    sx={{ letterSpacing: "-0.5px" }}
                  >
                    ₹ {grandTotal.toFixed(2)}
                  </Typography>
                </Stack>
              </Box>
            </>
          )}

          {/* CHECKOUT BUTTON */}
          <Button
            variant="contained"
            fullWidth
            startIcon={<ShoppingCartCheckoutIcon />}
            disabled={items.length === 0}
            sx={{
              backgroundColor: "#4CAF50",
              "&:hover": { backgroundColor: "#43A047" },
            }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>

        </Stack>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;