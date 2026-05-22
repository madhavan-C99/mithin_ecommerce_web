import api from "../../services/apiClient"

export const massuploadAPI={
    //   productexport: () => api.post("/adm/export_file"),
      productexport: () =>
    api.post("/adm/export_file", {}, { responseType: "arraybuffer" }),
     excel_bulk_update: (formData) =>
    api.post("/adm/excel_bulk_update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

}