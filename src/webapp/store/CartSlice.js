// // // carslice.js

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   addCartItem,
//   updateCartItemQuantity,
//   deleteCartItem,
//   clearCartApi,
//   fetchCartItems,
// } from "../api/AllApi";

// const generateCartKey = (item) => {
//   return `${item.productId}_${item.weight}_${item.unit || "kg"}`;
// };

// const loadCartFromStorage = () => {
//   try {
//     const cart = localStorage.getItem("cart");
//     return cart ? JSON.parse(cart) : [];
//   } catch {
//     return [];
//   }
// };

// const initialState = {
//   items: loadCartFromStorage(),
//   loading: {
//     items: {},
//     global: false,
//   },
// };

// const saveCartToStorage = (items) => {
//   localStorage.setItem("cart", JSON.stringify(items));
// };


// /*
//  * Thunk: called on login + page refresh
//  * Fetches backend cart → maps to frontend format → loads into Redux + localStorage
//  */
// const fetchCartFromServer = createAsyncThunk(
//   "cart/fetchFromServer",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await fetchCartItems(userId);

//       // matches your exact API response shape:
//       // response.data.items → array of cart items
//       const items = response?.items || [];

//       return items.map((item) => ({
//         productId:    item.product_id,
//         name:         item.product_name,
//         image:        item.image || "",
//         price:        item.unit_price,
//         weight:       item.weight,
//         unit:         item.unit || "kg",
//         quantity:     item.quantity,
//         cart_item_id: item.cart_item_id,
//         cartKey:      `${item.product_id}_${item.weight}_${item.unit || "kg"}`,
//       }));

//     } catch (error) {
//       console.error("fetchCartFromServer failed", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );



// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {

//     addToCart: (state, action) => {
//       const item = action.payload;
//       const cartKey = generateCartKey(item);
//       const existingItem = state.items.find((p) => p.cartKey === cartKey);

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({
//           ...item,
//           unit: item.unit || "kg",
//           quantity: 1,
//           cartKey,
//         });
//       }
//       console.log("Add to cart output", item);
//        saveCartToStorage(state.items); 
//     },

//     increaseQuantity: (state, action) => {
//       const item = state.items.find((p) => p.cartKey === action.payload);
//       if (!item) return;

//       item.quantity += 1;

//       try {
//         const userData = JSON.parse(localStorage.getItem("user"));
//         const userId = userData?.user_id;
//         if (!userId) return;

//         const payload = {
//           user_id: userId,
//           product_id: item.productId,
//           cart_item_id: item.cart_item_id,
//           quantity: item.quantity,
//           total_price: item.price * item.weight * item.quantity,
//         };
//         console.log("UPDATE CART ITEM INCREMENT BUTTON", payload);
//       } catch (error) {
//         console.error("Update quantity API failed", error);
//       }
//        saveCartToStorage(state.items); 
//     },

//     decreaseQuantity: (state, action) => {
//       const item = state.items.find((p) => p.cartKey === action.payload);
//       if (!item) return;

//       if (item.quantity > 1) {
//         item.quantity -= 1;

//         try {
//           const userData = JSON.parse(localStorage.getItem("user"));
//           const userId = userData?.user_id;
//           if (!userId) return;

//           if (!item.cart_item_id) {
//             console.warn("Missing cart_item_id → skipping update");
//             return;
//           }

//           const payload = {
//             user_id: userId,
//             product_id: item.productId,
//             cart_item_id: item.cart_item_id,
//             quantity: item.quantity,
//             total_price: item.price * item.weight * item.quantity,
//           };
//           console.log("UPDATE CART ITEM DECREMENT BUTTON", payload);
//         } catch (error) {
//           console.error("Update quantity API failed", error);
//         }

//       } else {
//         const cartItemId = item.cart_item_id;
//         state.items = state.items.filter((p) => p.cartKey !== action.payload);

//         try {
//           const userData = JSON.parse(localStorage.getItem("user"));
//           const userId = userData?.user_id;
//           if (!userId) return;

//           if (!cartItemId) {
//             console.warn("Missing cart_item_id → delete skipped");
//             return;
//           }

//           const payload = { user_id: userId, cart_item_id: cartItemId };
//           // deleteCartItem(payload);
//         } catch (error) {
//           console.error("Delete cart item API failed", error);
//         }
//       }
//        saveCartToStorage(state.items); 
//     },

//     removeFromCart: (state, action) => {
//       const cartKey = action.payload;
//       const item = state.items.find((p) => p.cartKey === cartKey);
//       if (!item) return;

//       const cartItemId = item.cart_item_id;
//       state.items = state.items.filter((p) => p.cartKey !== cartKey);

//       try {
//         const userData = JSON.parse(localStorage.getItem("user"));
//         const userId = userData?.user_id;
//         if (!userId) return;
//         if (!cartItemId) return;

//         const payload = { user_id: userId, cart_item_id: cartItemId };
//         // deleteCartItem(payload);
//       } catch (error) {
//         console.error("Delete cart item API failed", error);
//       }
//        saveCartToStorage(state.items); 
//     },

//     updateItemWeight: (state, action) => {
//       const { cartKey, newWeight, unit } = action.payload;
//       const item = state.items.find((p) => p.cartKey === cartKey);
//       if (!item) return;

//       item.weight = newWeight;
//       item.unit = unit || item.unit;
//       item.cartKey = generateCartKey(item);
//     },

//     clearCart: (state) => {
//       state.items = [];
//       localStorage.removeItem("cart");
//     },

//     setCartItemId: (state, action) => {
//       const { cartKey, cart_item_id } = action.payload;
//       const item = state.items.find((p) => p.cartKey === cartKey);
//       if (!item) return;

//       item.cart_item_id = cart_item_id;
//     },

//     setItemLoading: (state, action) => {
//       const { cartKey, type, value } = action.payload;
//       if (!state.loading.items[cartKey]) {
//         state.loading.items[cartKey] = {};
//       }
//       state.loading.items[cartKey][type] = value;
//     },

//     // Phase 2: wire this up in login() once GET /cart is ready
//     loadCartItems: (state, action) => {
//       state.items = action.payload;
//     },

//   },


//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCartFromServer.pending, (state) => {
//         state.loading.global = true;
//       })
//       .addCase(fetchCartFromServer.fulfilled, (state, action) => {
//         state.loading.global = false;
//         state.items = action.payload;                              // replace frontend with backend truth
//         localStorage.setItem("cart", JSON.stringify(state.items)); // sync localStorage
//       })
//       .addCase(fetchCartFromServer.rejected, (state) => {
//         state.loading.global = false;
//         // silently fail — existing localStorage cart stays as-is
//       });
//   },
// });

// export const {
//   addToCart,
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
//   updateItemWeight,
//   clearCart,
//   setCartItemId,
//   setItemLoading,
//   loadCartItems,
// } = cartSlice.actions;

// export { fetchCartFromServer };
// export default cartSlice.reducer;










// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   addCartItem,
//   updateCartItemQuantity,
//   deleteCartItem,
//   clearCartApi,
//   fetchCartItems,
// } from "../api/AllApi";

// const generateCartKey = (item) => {
//   return `${item.productId}_${item.weight}_${item.unit || "kg"}`;
// };

// const loadCartFromStorage = () => {
//   try {
//     const cart = localStorage.getItem("cart");
//     return cart ? JSON.parse(cart) : [];
//   } catch {
//     return [];
//   }
// };

// // ─── CHANGE 1: added delivery_charge, grand_total, min_order_amount ───
// const initialState = {
//   items: loadCartFromStorage(),
//   loading: {
//     items: {},
//     global: false,
//   },
//   delivery_charge: 0,
//   grand_total: 0,
//   delivery_charge_amount: 50,   // ← fixed config: how much to charge
//   min_order_amount: 200,        // ← fixed config: threshold
// };

// const saveCartToStorage = (items) => {
//   localStorage.setItem("cart", JSON.stringify(items));
// };


// // ─── CHANGE 2: return object instead of just array ───
// const fetchCartFromServer = createAsyncThunk(
//   "cart/fetchFromServer",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await fetchCartItems(userId);

//       const data = response?.data || response;
//       const items = data?.items || [];

//       return {
//         items: items.map((item) => ({
//           productId:    item.product_id,
//           name:         item.product_name,
//           title:        item.product_name,
//           image:        item.image || "",
//           price:        item.unit_price,
//           weight:       item.weight,
//           unit:         item.unit || "kg",
//           quantity:     item.quantity,
//           cart_item_id: item.cart_item_id,
//           cartKey:      `${item.product_id}_${item.weight}_${item.unit || "kg"}`,
//         })),
//         grand_total:      data?.grand_total      ?? 0,
//         delivery_charge_amount: data?.delivery_charge_amount ?? 50,  // from API if available, else 50
//         min_order_amount: data?.min_order_amount ?? 200, // from API if available, else 200
//       };

//     } catch (error) {
//       console.error("fetchCartFromServer failed", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );


// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {

//     addToCart: (state, action) => {
//       const item = action.payload;
//       const cartKey = generateCartKey(item);
//       const existingItem = state.items.find((p) => p.cartKey === cartKey);

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({
//           ...item,
//           unit: item.unit || "kg",
//           quantity: 1,
//           cartKey,
//         });
//       }
//       console.log("Add to cart output", item);
//       saveCartToStorage(state.items);
//     },

//     increaseQuantity: (state, action) => {
//       const item = state.items.find((p) => p.cartKey === action.payload);
//       if (!item) return;

//       item.quantity += 1;

//       try {
//         const userData = JSON.parse(localStorage.getItem("user"));
//         const userId = userData?.user_id;
//         if (!userId) return;

//         const payload = {
//           user_id: userId,
//           product_id: item.productId,
//           cart_item_id: item.cart_item_id,
//           quantity: item.quantity,
//           total_price: item.price * item.weight * item.quantity,
//         };
//         console.log("UPDATE CART ITEM INCREMENT BUTTON", payload);
//       } catch (error) {
//         console.error("Update quantity API failed", error);
//       }
//       saveCartToStorage(state.items);
//     },

//     decreaseQuantity: (state, action) => {
//       const item = state.items.find((p) => p.cartKey === action.payload);
//       if (!item) return;

//       if (item.quantity > 1) {
//         item.quantity -= 1;

//         try {
//           const userData = JSON.parse(localStorage.getItem("user"));
//           const userId = userData?.user_id;
//           if (!userId) return;

//           if (!item.cart_item_id) {
//             console.warn("Missing cart_item_id → skipping update");
//             return;
//           }

//           const payload = {
//             user_id: userId,
//             product_id: item.productId,
//             cart_item_id: item.cart_item_id,
//             quantity: item.quantity,
//             total_price: item.price * item.weight * item.quantity,
//           };
//           console.log("UPDATE CART ITEM DECREMENT BUTTON", payload);
//         } catch (error) {
//           console.error("Update quantity API failed", error);
//         }

//       } else {
//         const cartItemId = item.cart_item_id;
//         state.items = state.items.filter((p) => p.cartKey !== action.payload);

//         try {
//           const userData = JSON.parse(localStorage.getItem("user"));
//           const userId = userData?.user_id;
//           if (!userId) return;

//           if (!cartItemId) {
//             console.warn("Missing cart_item_id → delete skipped");
//             return;
//           }

//           const payload = { user_id: userId, cart_item_id: cartItemId };
//           // deleteCartItem(payload);
//         } catch (error) {
//           console.error("Delete cart item API failed", error);
//         }
//       }
//       saveCartToStorage(state.items);
//     },

//     removeFromCart: (state, action) => {
//       const cartKey = action.payload;
//       const item = state.items.find((p) => p.cartKey === cartKey);
//       if (!item) return;

//       const cartItemId = item.cart_item_id;
//       state.items = state.items.filter((p) => p.cartKey !== cartKey);

//       try {
//         const userData = JSON.parse(localStorage.getItem("user"));
//         const userId = userData?.user_id;
//         if (!userId) return;
//         if (!cartItemId) return;

//         const payload = { user_id: userId, cart_item_id: cartItemId };
//         // deleteCartItem(payload);
//       } catch (error) {
//         console.error("Delete cart item API failed", error);
//       }
//       saveCartToStorage(state.items);
//     },

//     updateItemWeight: (state, action) => {
//       const { cartKey, newWeight, unit } = action.payload;
//       const item = state.items.find((p) => p.cartKey === cartKey);
//       if (!item) return;

//       item.weight = newWeight;
//       item.unit = unit || item.unit;
//       item.cartKey = generateCartKey(item);
//     },

//     clearCart: (state) => {
//       state.items = [];
//       localStorage.removeItem("cart");
//     },

//     setCartItemId: (state, action) => {
//       const { cartKey, cart_item_id } = action.payload;
//       const item = state.items.find((p) => p.cartKey === cartKey);
//       if (!item) return;

//       item.cart_item_id = cart_item_id;
//     },

//     setItemLoading: (state, action) => {
//       const { cartKey, type, value } = action.payload;
//       if (!state.loading.items[cartKey]) {
//         state.loading.items[cartKey] = {};
//       }
//       state.loading.items[cartKey][type] = value;
//     },

//     loadCartItems: (state, action) => {
//       state.items = action.payload;
//     },

//   },


//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCartFromServer.pending, (state) => {
//         state.loading.global = true;
//       })
//       // ─── CHANGE 3: store delivery_charge, grand_total, min_order_amount ───
//       .addCase(fetchCartFromServer.fulfilled, (state, action) => {
//         state.loading.global = false;
//         state.items          = action.payload.items;
//         state.delivery_charge_amount  = action.payload.delivery_charge_amount;
//         state.grand_total      = action.payload.grand_total;
//         state.min_order_amount = action.payload.min_order_amount;
//         localStorage.setItem("cart", JSON.stringify(state.items));
//       })
//       .addCase(fetchCartFromServer.rejected, (state) => {
//         state.loading.global = false;
//       });
//   },
// });

// export const {
//   addToCart,
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
//   updateItemWeight,
//   clearCart,
//   setCartItemId,
//   setItemLoading,
//   loadCartItems,
// } = cartSlice.actions;

// export { fetchCartFromServer };
// export default cartSlice.reducer;











import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCartItem,
  updateCartItemQuantity,
  deleteCartItem,
  clearCartApi,
  fetchCartItems,
} from "../api/AllApi";

const generateCartKey = (item) => {
  return `${item.productId}_${item.weight}_${item.unit || "kg"}`;
};

const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

const initialState = {
  items: loadCartFromStorage(),
  loading: {
    items: {},
    global: false,
  },
  // ── CHANGE 1: removed stale delivery_charge: 0
  // only keeping delivery_charge_amount and min_order_amount as config
  grand_total:            0,
  delivery_charge_amount: 50,   // fixed config: charge amount (₹)
  min_order_amount:       200,  // fixed config: free delivery threshold (₹)
};

const saveCartToStorage = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};


const fetchCartFromServer = createAsyncThunk(
  "cart/fetchFromServer",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetchCartItems(userId);

      // ── CHANGE 2: Axios interceptor already unwraps response
      // So response IS the data object directly — no need for response?.data
      // But we keep the fallback for safety
      const data = response?.data || response;
      const items = data?.items || [];

      console.log("fetchCartFromServer raw data:", data);
      console.log("delivery_charge_amount from API:", data?.delivery_charge_amount);
      console.log("min_order_amount from API:", data?.min_order_amount);

      return {
        items: items.map((item) => ({
          productId:    item.product_id,
          name:         item.product_name,
          title:        item.product_name,
          image:        item.image || "",
          price:        item.unit_price,
          weight:       item.weight,
          unit:         item.unit || "kg",
          quantity:     item.quantity,
          cart_item_id: item.cart_item_id,
          cartKey:      `${item.product_id}_${item.weight}_${item.unit || "kg"}`,
        })),
        // ── read exact field names from API response
        grand_total:            Number(data?.grand_total)            || 0,
        delivery_charge_amount: Number(data?.delivery_charge_amount) || 50,
        min_order_amount:       Number(data?.min_order_amount)       || 200,
      };

    } catch (error) {
      console.error("fetchCartFromServer failed", error);
      return rejectWithValue(error.message);
    }
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const item = action.payload;
      const cartKey = generateCartKey(item);
      const existingItem = state.items.find((p) => p.cartKey === cartKey);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...item,
          unit: item.unit || "kg",
          quantity: 1,
          cartKey,
        });
      }
      console.log("Add to cart output", item);
      saveCartToStorage(state.items);
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((p) => p.cartKey === action.payload);
      if (!item) return;

      item.quantity += 1;

      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const userId = userData?.user_id;
        if (!userId) return;

        const payload = {
          user_id: userId,
          product_id: item.productId,
          cart_item_id: item.cart_item_id,
          quantity: item.quantity,
          total_price: item.price * item.weight * item.quantity,
        };
        console.log("UPDATE CART ITEM INCREMENT BUTTON", payload);
      } catch (error) {
        console.error("Update quantity API failed", error);
      }
      saveCartToStorage(state.items);
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((p) => p.cartKey === action.payload);
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;

        try {
          const userData = JSON.parse(localStorage.getItem("user"));
          const userId = userData?.user_id;
          if (!userId) return;

          if (!item.cart_item_id) {
            console.warn("Missing cart_item_id → skipping update");
            return;
          }

          const payload = {
            user_id: userId,
            product_id: item.productId,
            cart_item_id: item.cart_item_id,
            quantity: item.quantity,
            total_price: item.price * item.weight * item.quantity,
          };
          console.log("UPDATE CART ITEM DECREMENT BUTTON", payload);
        } catch (error) {
          console.error("Update quantity API failed", error);
        }

      } else {
        const cartItemId = item.cart_item_id;
        state.items = state.items.filter((p) => p.cartKey !== action.payload);

        try {
          const userData = JSON.parse(localStorage.getItem("user"));
          const userId = userData?.user_id;
          if (!userId) return;

          if (!cartItemId) {
            console.warn("Missing cart_item_id → delete skipped");
            return;
          }

          const payload = { user_id: userId, cart_item_id: cartItemId };
          // deleteCartItem(payload);
        } catch (error) {
          console.error("Delete cart item API failed", error);
        }
      }
      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action) => {
      const cartKey = action.payload;
      const item = state.items.find((p) => p.cartKey === cartKey);
      if (!item) return;

      const cartItemId = item.cart_item_id;
      state.items = state.items.filter((p) => p.cartKey !== cartKey);

      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const userId = userData?.user_id;
        if (!userId) return;
        if (!cartItemId) return;

        const payload = { user_id: userId, cart_item_id: cartItemId };
        // deleteCartItem(payload);
      } catch (error) {
        console.error("Delete cart item API failed", error);
      }
      saveCartToStorage(state.items);
    },

    updateItemWeight: (state, action) => {
      const { cartKey, newWeight, unit } = action.payload;
      const item = state.items.find((p) => p.cartKey === cartKey);
      if (!item) return;

      item.weight = newWeight;
      item.unit = unit || item.unit;
      item.cartKey = generateCartKey(item);
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },

    setCartItemId: (state, action) => {
      const { cartKey, cart_item_id } = action.payload;
      const item = state.items.find((p) => p.cartKey === cartKey);
      if (!item) return;

      item.cart_item_id = cart_item_id;
    },

    setItemLoading: (state, action) => {
      const { cartKey, type, value } = action.payload;
      if (!state.loading.items[cartKey]) {
        state.loading.items[cartKey] = {};
      }
      state.loading.items[cartKey][type] = value;
    },

    loadCartItems: (state, action) => {
      state.items = action.payload;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartFromServer.pending, (state) => {
        state.loading.global = true;
      })
      .addCase(fetchCartFromServer.fulfilled, (state, action) => {
        state.loading.global            = false;
        state.items                     = action.payload.items;
        state.grand_total               = action.payload.grand_total;
        state.delivery_charge_amount    = action.payload.delivery_charge_amount;
        state.min_order_amount          = action.payload.min_order_amount;
        localStorage.setItem("cart", JSON.stringify(state.items));

        // ── debug log to confirm values stored in Redux
        console.log("Redux cart updated:", {
          delivery_charge_amount: action.payload.delivery_charge_amount,
          min_order_amount:       action.payload.min_order_amount,
          grand_total:            action.payload.grand_total,
        });
      })
      .addCase(fetchCartFromServer.rejected, (state) => {
        state.loading.global = false;
      });
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  updateItemWeight,
  clearCart,
  setCartItemId,
  setItemLoading,
  loadCartItems,
} = cartSlice.actions;

export { fetchCartFromServer };
export default cartSlice.reducer;