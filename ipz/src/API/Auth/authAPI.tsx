import { createInstance } from "../api";

export const loginUser = async (email: string, password: string) => {
  const response = await createInstance.post("/users/login", {
    email,
    password,
  });
  return response.data;
};

export const registrationUser = async (email: string, password: string) => {
  const response = await createInstance.post("/users/register", {
    email,
    password,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await createInstance.post("/users/logout");
  return response.data;
};

export const getUser = async (token: string) => {
  const response = await createInstance.get("/users/current", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getWishlist = async (token: string) => {
  const response = await createInstance.get("/users/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const addToWishlist = async (token: string, bookId: string) => {
  const response = await createInstance.post("/users/wishlist", { bookId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const removeFromWishlist = async (token: string, bookId: string) => {
  const response = await createInstance.delete("/users/wishlist", {
    headers: { Authorization: `Bearer ${token}` },
    data: { bookId }
  });
  return response.data;
};
