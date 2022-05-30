import axios from "axios";
import qs from "qs";

const axiosInstance = axios.create({
  baseURL: 'https://redesign-exam.sismart.id/devel/apischool/',
  params: {},
  paramsSerializer: function (params) {
        return qs.stringify({
                id: 1
            }, {arrayFormat: 'brackets'})
  },
  validateStatus: function (status) {
    return (status >= 200 && status < 300) || status === 422;
  },
  transformResponse: [
    function (data) {
      // ubah ke json karena "data" berbentuk string
      const JSONResponse = JSON.parse(data);

      if (JSONResponse.auth === "failed") {
        // dispatch action redux
        alert('belum login')
      } else {
        return JSONResponse;
      }
    },
  ],
});
export default axiosInstance;
