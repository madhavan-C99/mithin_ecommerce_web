// import api from "../../../services/apiClient"

// export const orderAPI={
//   getfilterApi:(filterType)=>api.post("/adm/order_top_tile",
//     {filter_type: filterType} ),

//   getOrderById:(id,order_number)=> api.post("/adm/fetch_one_order",{
//             id
//         }),

//   updatestatusApi:(id,newStatus) => api.post("/adm/order_status_update", {
//       id,
//       order_status: newStatus
//     }),
//   readnotification: (id) => api.post("/adm/read_notification", { id }),

//   filterByDateRange: (startDate, endDate) =>
//   api.post("/adm/filter_order_revenue_daterange", {
//     start_date: startDate,
//     ...(endDate && { end_date: endDate }),
//   }),


// }











import api from "../../../services/apiClient"

export const orderAPI = {

  // ── EXISTING METHODS — UNTOUCHED ─────────────────────────────────────────────

  getfilterApi: (filterType) => api.post("/adm/order_top_tile",
    { filter_type: filterType }),

  getOrderById: (id, order_number) => api.post("/adm/fetch_one_order", {
    id
  }),

  updatestatusApi: (id, newStatus) => api.post("/adm/order_status_update", {
    id,
    order_status: newStatus
  }),

  readnotification: (id) => api.post("/adm/read_notification", { id }),

  filterByDateRange: (startDate, endDate) =>
    api.post("/adm/filter_order_revenue_daterange", {
      start_date: startDate,
      ...(endDate && { end_date: endDate }),
    }),

  // ── NEW METHODS ───────────────────────────────────────────────────────────────

  fetchAllDeliveryBoys: () => api.post("/adm/fetch_all_deliveryboys"),

  assignDeliveryBoy: (order_id, delivery_boy_id) =>
    api.post("/adm/assign_order_for_deliveryboy", { order_id, delivery_boy_id }),

};