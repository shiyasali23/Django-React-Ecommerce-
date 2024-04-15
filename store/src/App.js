import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import StorePage from "./Pages/StorePage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import BlogPage from "./Pages/BlogPage";
import OrdersPage from "./Pages/OrdersPage";
import { ProductsProvider } from "./Contexts/ProductsContext";
import { CartProvider } from "./Contexts/CartContext";
import { OrderProvider } from "./Contexts/OrderContext";

function App() {
  return (
    <div className="App">
      <ProductsProvider>
        <CartProvider>
          <OrderProvider>
            
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/shirts" element={<StorePage category={"Shirt"}/>} />
            <Route path="/t-shirts" element={<StorePage category={"T-Shirt"} />} />
            <Route path="/pants" element={<StorePage category={"Pants"}/>} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </BrowserRouter>
        
        </OrderProvider>
        </CartProvider>
      </ProductsProvider>
    </div>
  );
}

export default App;
