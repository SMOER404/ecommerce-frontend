export const BRAND_ROUTES = {
  list: '/brands',
  details: (id: string) => `/brands/${id}`,
} as const; 