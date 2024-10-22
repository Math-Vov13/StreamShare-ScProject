// axiosConfig.ts
import axios from "axios";

// Set base URL and credentials globally for all requests
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export default axios;
