import { createInstance } from "../api";

export const createOrder = async (token: string, bookId: string, deliveryAddress: string, phoneNumber: string, paymentMethod: string) => {
  const response = await createInstance.post("/api/orders", { bookId, deliveryAddress, phoneNumber, paymentMethod }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
