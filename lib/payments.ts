import api from "./api"
import type { PaymentMethod, Payment } from "@/types/payment"

export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const response = await api.get("/payments/methods")
  return response.data
}

export const getPayment = async (id: string): Promise<Payment> => {
  const response = await api.get(`/payments/${id}`)
  return response.data
}

