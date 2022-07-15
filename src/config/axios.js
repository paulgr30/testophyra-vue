"use strict";
import Vue from "vue";
//import router from "../router";
import axios from "axios";


// configuración de axios
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
// interceptor de solicitud http
axios.interceptors.request.use(
  (config) => {
    config.headers.common["X-Requested-With"] = "XMLHttpRequest";
    config.headers.common["Content-Type"] = "multipart/form-data"; //"application/json";
    config.headers.common["Acept"] = "application/json";
    /*config.headers.common[
      "authorization"
    ] = `Bearer ${Vue.store.state.mAuths.token}`;*/

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


Vue.axios = axios;
Vue.prototype.$axios = axios;
export default axios;
