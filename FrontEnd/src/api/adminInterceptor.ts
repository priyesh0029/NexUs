import axios from "axios";


const adminBaseURL = axios.create({
  baseURL: process.env.BASE_URL,
});

adminBaseURL.interceptors.request.use(
  (config) => {
    console.log("Entered to interceptor of admin");
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("Error in interceptor");
    return Promise.reject(error);
  }
);

export default adminBaseURL;
