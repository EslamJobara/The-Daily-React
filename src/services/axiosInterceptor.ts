import axios from "axios";
import { supabase } from "../../utils/supabase";

// ---------------------- Axios Instance ----------------------
const api = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------------- Request Interceptor ----------------------
// Attaches the Supabase JWT token to every outgoing request
api.interceptors.request.use(
  async (config) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    // Supabase REST API requires the anon key as apikey header
    config.headers.apikey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ---------------------- Response Interceptor ----------------------
// Handles 401 errors by signing the user out
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await supabase.auth.signOut();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
