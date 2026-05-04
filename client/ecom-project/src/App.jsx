import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  ProductDetails,
  ProductList,
  Wishlist,
  Cart,
  UserProfile,
} from "./pages/index";
import { SearchProvider } from "./contexts/SearchContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { CartProvider } from "./contexts/CartContext";
import { AddressProvider } from "./contexts/AddressContext";
import { OrderSummary } from "./pages/OrderSummary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/products/:id",
    element: <ProductDetails />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/ordersummary/:orderId",
    element: <OrderSummary />,
  },
]);

function App() {
  return (
    <AddressProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            <RouterProvider router={router} />
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
    </AddressProvider>
  );
}

export default App;
