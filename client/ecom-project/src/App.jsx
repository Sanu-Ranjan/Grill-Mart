import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import {
  Home,
  ProductDetails,
  ProductList,
  Wishlist,
  Cart,
  UserProfile,
  Login,
  Signup,
} from "./pages/index";
import { AuthProvider } from "./contexts/AuthContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { CartProvider } from "./contexts/CartContext";
import { AddressProvider } from "./contexts/AddressContext";
import { OrderSummary } from "./pages/OrderSummary";
import { ProtectedRoute } from "./components/ProtectedRoute";

// providers live inside the router so they can use useNavigate
const Root = () => (
  <AuthProvider>
    <AddressProvider>
      <CartProvider>
        <WishlistProvider>
          <Outlet />
        </WishlistProvider>
      </CartProvider>
    </AddressProvider>
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <ProductList /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/wishlist", element: <Wishlist /> },
          { path: "/cart", element: <Cart /> },
          { path: "/profile", element: <UserProfile /> },
          { path: "/ordersummary/:orderId", element: <OrderSummary /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
