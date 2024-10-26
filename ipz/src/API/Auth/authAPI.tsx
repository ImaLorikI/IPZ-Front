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
