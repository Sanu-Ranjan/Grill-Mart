export const API_BASE_URL = import.meta.env.VITE_BACKEND;
export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id) => `/products/${id}`,
  WISHLIST: "/wishlist",
  CART: "/cart",
  PROFILE: "/profile",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ORDER_SUMMARY: (orderId) => `/ordersummary/${orderId}`,
};

export const API_ROUTES = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
    me: "/auth/me",
  },

  products: {
    getAll: "/products",
    getById: (id) => `/products/${id}`,
    add: "/products",
  },

  category: {
    getAll: "/categories",
    getFeatured: "/categories/featured",
    getById: (id) => `/categories/${id}`,
    add: "/categories",
  },

  cart: {
    get: "/cart",
    update: "/cart",
  },

  wishlist: {
    get: "/wishlist",
    addItem: "/wishlist/item",
    deleteItem: "/wishlist",
  },

  address: {
    getAll: "/address",
    getById: (id) => `/address/id/${id}`,
    add: "/address",
    update: (id) => `/address/${id}`,
    delete: (id) => `/address/${id}`,
  },

  orders: {
    getAll: "/orders",
    getById: (id) => `/orders/id/${id}`,
    add: "/orders",
    delete: "/orders",
  },

  ai: {
    search: "/ai/search",
  },
};
