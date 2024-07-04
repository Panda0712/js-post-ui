import axiosClient from "./axiosClient";

// import : default import, named import
// export : default export, named export
// default : can use any name to import --> have one default EXPORT only per file
// named : must use the exact name --> have multiples export
// default cannot be applied tree shaking, but named can be, prior use named

const studentApi = {
  getAll(params) {
    const url = "/students";
    return axiosClient.get(url, { params });
  },

  getById(id) {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = "/students";
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/students/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },
};

export default studentApi;
