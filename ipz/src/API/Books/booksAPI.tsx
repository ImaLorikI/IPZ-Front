import { createInstance } from "../api";

export const getAllBooks = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('User is not authenticated');
  }

  const response = await createInstance.get("/api/books", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return response.data;
};


export const getBookbyFilter = async (filters: Record<string, string>) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('User is not authenticated');
  }
  const response = await createInstance.get(`/api/books/search`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: filters
  });
  return response.data;
};


