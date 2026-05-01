// // 📁 src/App.jsx

// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Outlet } from "react-router-dom";

// import ShippingPolicy from "./webapp/pages/ShippingPolicyPage";
// import RefundPolicy from "./webapp/pages/RefundPolicyPage";
// import TermsPage from "./webapp/pages/TermsPage";
// import MainLayout from "./webapp/components/layout/MainLayout";
// import HomePage from "./webapp/pages/HomePage";
// import ProductsPage from "./webapp/pages/ProductsPage";
// import CategoryProductsPage from "./webapp/pages/CategoryProductsPage";
// import ProductDetailsPage from "./webapp/pages/ProductDetailsPage";
// import AboutPage from "./webapp/pages/AboutPage";
// import ProtectedRoute from "./webapp/routes/ProtectedRoute";
// import AccountLayout from "./webapp/components/layout/AccountLayout";
// import ProfilePage from "./webapp/pages/account_pages/ProfilePage";
// import OrdersPage from "./webapp/pages/account_pages/OrderPage";
// import WishlistPage from "./webapp/pages/account_pages/WishListPage";
// import CheckoutPage from "./webapp/pages/CheckOutPage";
// import OrderTrackingPage from "./webapp/pages/OrderTrackingPage";
// import OrderConfirmationPage from "./webapp/pages/OrderConfirmationPage";
// import { AdminAuthProvider, NotificationProvider } from "./webadm/context/AuthContext";
// import DashboardLayout from "./webadm/components/layout/DashboardLayout";
// import AdminSignIn from "./webadm/components/AdminSignIn";
// import AuthModal from "./webapp/components/auth/AuthModal";
// import CartDrawer from "./webapp/components/cart/CartDrawer";
// import DeliveryInfoDialog from "./webapp/components/popup/DeliveryInfoDialog";
// import DistanceGlobalNotify from "./webapp/components/distancenotify/DistanceGlobalNotify";
// import { loadDeliveryFromStorage } from "./webapp/store/DeliverySlice";
// import ScrollToTop from "./webapp/components/scrolltotop/ScrollToTop";
// import { FlyToCartProvider } from "./webapp/components/flytocart/FlyToCartContext";

// // ✅ DELIVERY — Auth context + Routes
// import { DeliveryAuthProvider } from "./webdelivery/context/DeliveryAuthContext";
// import DeliveryRoutes from "./webdelivery/routes/DeliveryRoutes";


// /* 🔥 Separate component for routing logic */

// function AppRoutes() {
//   const location = useLocation();
//   const state = location.state;
//   const backgroundLocation = state?.background;
//   const isAdminRoute = location.pathname.startsWith(`/${import.meta.env.VITE_ADMIN_PATH}`);
//   const isDeliveryRoute = location.pathname.startsWith("/delivery"); // ✅ skip popup for delivery pages
//   const adminPath = import.meta.env.VITE_ADMIN_PATH;

//   const [openPopup, setOpenPopup] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(loadDeliveryFromStorage());
//   }, []);

//   useEffect(() => {
//     if (isAdminRoute || isDeliveryRoute) return; // ✅ skip popup on admin + delivery pages

//     const popupShown = sessionStorage.getItem("deliveryPopupShown");
//     if (popupShown) return;

//     const timer = setTimeout(() => {
//       setOpenPopup(true);
//       sessionStorage.setItem("deliveryPopupShown", "true");
//     }, 8000);

//     return () => clearTimeout(timer);
//   }, [isAdminRoute, isDeliveryRoute]);

//   return (
//     <>
//       <ScrollToTop />
//       <Routes location={isAdminRoute ? location : (backgroundLocation || location)}>

//         <Route path="/terms" element={<TermsPage />} />
//         <Route path="/shipping-policy" element={<ShippingPolicy />} />
//         <Route path="/refund-policy" element={<RefundPolicy />} />

//         {/* MAIN */}
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/products" element={<ProductsPage />} />
//           <Route path="/products/category/:id" element={<CategoryProductsPage />} />
//           <Route path="/products/:productId" element={<ProductDetailsPage />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/cart" element={null} />
//         </Route>

//         {/* ACCOUNT */}
//         <Route element={<ProtectedRoute />}>
//           <Route element={<AccountLayout />}>
//             <Route path="/account/profile" element={<ProfilePage />} />
//             <Route path="/account/orders" element={<OrdersPage />} />
//             <Route path="/account/wishlist" element={<WishlistPage />} />
//           </Route>
//         </Route>

//         {/* CHECKOUT */}
//         <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
//         <Route path="/order-tracking" element={<ProtectedRoute><OrderTrackingPage /></ProtectedRoute>} />
//         <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} />

//         {/* ADMIN */}
//         <Route
//           path={`/${adminPath}`}
//           element={
//             <AdminAuthProvider>
//               <NotificationProvider>
//                 <Outlet />
//               </NotificationProvider>
//             </AdminAuthProvider>
//           }
//         >
//           <Route path="signin" element={<AdminSignIn />} />
//           <Route path="dashboard" element={<DashboardLayout />} />
//         </Route>

//         {/* AUTH */}
//         <Route path="/login" element={<AuthModal type="login" />} />
//         <Route path="/verify-otp" element={<AuthModal type="otp" />} />
//         <Route path="/signup" element={<AuthModal type="signup" />} />

//       </Routes>

//       {/* MODAL OVERLAY */}
//       {backgroundLocation && (
//         <Routes>
//           <Route path="/login" element={<AuthModal type="login" />} />
//           <Route path="/verify-otp" element={<AuthModal type="otp" />} />
//           <Route path="/signup" element={<AuthModal type="signup" />} />
//         </Routes>
//       )}

//       {/* ✅ DELIVERY — isolated inside its own auth context */}
//       <DeliveryAuthProvider>
//         <DeliveryRoutes />
//       </DeliveryAuthProvider>

//       {/* Popup — skip on admin + delivery pages */}
//       {!isAdminRoute && !isDeliveryRoute && (
//         <DeliveryInfoDialog
//           open={openPopup}
//           onClose={() => setOpenPopup(false)}
//         />
//       )}
//     </>
//   );
// }

// /* 🔥 ROOT */
// function App() {
//   return (
//     <BrowserRouter>
//       <FlyToCartProvider>
//         <AppRoutes />
//         <CartDrawer />
//         <DistanceGlobalNotify />
//       </FlyToCartProvider>
//     </BrowserRouter>
//   );
// }

// export default App;











// 📁 src/App.jsx

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import ShippingPolicy from "./webapp/pages/ShippingPolicyPage";
import RefundPolicy from "./webapp/pages/RefundPolicyPage";
import TermsPage from "./webapp/pages/TermsPage";
import MainLayout from "./webapp/components/layout/MainLayout";
import HomePage from "./webapp/pages/HomePage";
import ProductsPage from "./webapp/pages/ProductsPage";
import CategoryProductsPage from "./webapp/pages/CategoryProductsPage";
import ProductDetailsPage from "./webapp/pages/ProductDetailsPage";
import AboutPage from "./webapp/pages/AboutPage";
import ProtectedRoute from "./webapp/routes/ProtectedRoute";
import AccountLayout from "./webapp/components/layout/AccountLayout";
import ProfilePage from "./webapp/pages/account_pages/ProfilePage";
import OrdersPage from "./webapp/pages/account_pages/OrderPage";
import WishlistPage from "./webapp/pages/account_pages/WishListPage";
import CheckoutPage from "./webapp/pages/CheckOutPage";
import OrderTrackingPage from "./webapp/pages/OrderTrackingPage";
import OrderConfirmationPage from "./webapp/pages/OrderConfirmationPage";
import { AdminAuthProvider, NotificationProvider } from "./webadm/context/AuthContext";
import DashboardLayout from "./webadm/components/layout/DashboardLayout";
import AdminSignIn from "./webadm/components/AdminSignIn";
import AuthModal from "./webapp/components/auth/AuthModal";
import CartDrawer from "./webapp/components/cart/CartDrawer";
import DeliveryInfoDialog from "./webapp/components/popup/DeliveryInfoDialog";
import DistanceGlobalNotify from "./webapp/components/distancenotify/DistanceGlobalNotify";
import { loadDeliveryFromStorage } from "./webapp/store/DeliverySlice";
import ScrollToTop from "./webapp/components/scrolltotop/ScrollToTop";
import { FlyToCartProvider } from "./webapp/components/flytocart/FlyToCartContext";

// ✅ DELIVERY
import { DeliveryAuthProvider } from "./webdelivery/context/DeliveryAuthContext";
import DeliveryRoutes from "./webdelivery/routes/DeliveryRoutes";

/* ─── AppRoutes ─────────────────────────────────────────── */
function AppRoutes() {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.background;
  const isAdminRoute = location.pathname.startsWith(`/${import.meta.env.VITE_ADMIN_PATH}`);
  const isDeliveryRoute = location.pathname.startsWith("/delivery");
  const adminPath = import.meta.env.VITE_ADMIN_PATH;

  const [openPopup, setOpenPopup] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDeliveryFromStorage());
  }, []);

  useEffect(() => {
    if (isAdminRoute || isDeliveryRoute) return;

    const popupShown = sessionStorage.getItem("deliveryPopupShown");
    if (popupShown) return;

    const timer = setTimeout(() => {
      setOpenPopup(true);
      sessionStorage.setItem("deliveryPopupShown", "true");
    }, 8000);

    return () => clearTimeout(timer);
  }, [isAdminRoute, isDeliveryRoute]);

  return (
    <>
      <ScrollToTop />

      {/*
       * ✅ FIX: DeliveryRoutes is now a proper wildcard route INSIDE the main
       * Routes block, wrapped in its own DeliveryAuthProvider via the Outlet
       * pattern. Previously it was a floating sibling rendered unconditionally
       * alongside every other page — causing double renders and layout conflicts
       * on all /delivery/* paths.
       */}
      <Routes location={isAdminRoute ? location : (backgroundLocation || location)}>

        {/* ── DELIVERY (catch-all for /delivery/*) ── */}
        <Route
          path="/delivery/*"
          element={
            <DeliveryAuthProvider>
              <DeliveryRoutes />
            </DeliveryAuthProvider>
          }
        />

        {/* ── STATIC PAGES ── */}
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />

        {/* ── MAIN ── */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/category/:id" element={<CategoryProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={null} />
        </Route>

        {/* ── ACCOUNT ── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AccountLayout />}>
            <Route path="/account/profile" element={<ProfilePage />} />
            <Route path="/account/orders" element={<OrdersPage />} />
            <Route path="/account/wishlist" element={<WishlistPage />} />
          </Route>
        </Route>

        {/* ── CHECKOUT ── */}
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/order-tracking" element={<ProtectedRoute><OrderTrackingPage /></ProtectedRoute>} />
        <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} />

        {/* ── ADMIN ── */}
        <Route
          path={`/${adminPath}`}
          element={
            <AdminAuthProvider>
              <NotificationProvider>
                <Outlet />
              </NotificationProvider>
            </AdminAuthProvider>
          }
        >
          <Route path="signin" element={<AdminSignIn />} />
          <Route path="dashboard" element={<DashboardLayout />} />
        </Route>

        {/* ── AUTH ── */}
        <Route path="/login" element={<AuthModal type="login" />} />
        <Route path="/verify-otp" element={<AuthModal type="otp" />} />
        <Route path="/signup" element={<AuthModal type="signup" />} />

      </Routes>

      {/* Modal overlay for background routes */}
      {backgroundLocation && (
        <Routes>
          <Route path="/login" element={<AuthModal type="login" />} />
          <Route path="/verify-otp" element={<AuthModal type="otp" />} />
          <Route path="/signup" element={<AuthModal type="signup" />} />
        </Routes>
      )}

      {/* Popup — skip on admin + delivery pages */}
      {!isAdminRoute && !isDeliveryRoute && (
        <DeliveryInfoDialog
          open={openPopup}
          onClose={() => setOpenPopup(false)}
        />
      )}
    </>
  );
}

/* ─── ROOT ──────────────────────────────────────────────── */
function App() {
  return (
    <BrowserRouter>
      <FlyToCartProvider>
        <AppRoutes />
        <CartDrawer />
        <DistanceGlobalNotify />
      </FlyToCartProvider>
    </BrowserRouter>
  );
}

export default App;