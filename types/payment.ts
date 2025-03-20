export interface PaymentMethod {
  id: string
  name: string
}

export interface Payment {
  id: string
  status: string
  amount: {
    value: string
    currency: string
  }
  confirmation?: {
    type: string
    confirmation_url: string
  }
}

