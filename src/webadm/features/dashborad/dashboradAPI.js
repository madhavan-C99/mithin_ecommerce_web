// import api from "../../services/apiClient";

// export const dashboradAPI={
//     categoryrevenue:(filterType)=>api.post("/adm/category_revenue_chart",{filter_type: filterType,}),

//     topcards:(filterType)=>api.post("/adm/top_revenue_report",{filter_type:filterType}),

    
//     piechart:(filterType)=>api.post("/adm/piechart_subcategory",{filter_type: filterType})

// }









import api from "../../services/apiClient";

export const dashboradAPI = {
  categoryrevenue: (filterType) => api.post("/adm/category_revenue_chart", { filter_type: filterType }),
  topcards: (filterType) => api.post("/adm/top_revenue_report", { filter_type: filterType }),
  piechart: (filterType) => api.post("/adm/piechart_subcategory", { filter_type: filterType }),

  // NEW ↓ — custom date range
  topcardsByDateRange: (startDate, endDate) =>
    api.post("/adm/filter_with_date_range", {
      start_date: startDate,
      ...(endDate && { end_date: endDate }),
    }),

  categoryrevenueByDateRange: (startDate, endDate) =>
  api.post("/adm/filter_cat_with_daterange", {
    start_date: startDate,
    ...(endDate && { end_date: endDate }),
  }),
};