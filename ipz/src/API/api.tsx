import axios from "axios";

export const API_URL = process.env.NEXT_BACKEND_URL || "http://localhost:3000";

export const createInstance = axios.create({
  baseURL: API_URL,
  headers: {  
    "Content-Type": "application/json",
  },
});

