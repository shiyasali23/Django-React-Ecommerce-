import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./bootstrap.min.css";

import LoginPage from "./Pages/LoginPage";
import OrdersPage from "./Pages/OrdersPage";
import UpdateOrderPage from "./Pages/UpdateOrderPage.jsx";
import AnalyticsPage from "./Pages/AnalyticsPage";
import CreateProductPage from "./Pages/CreateProductPage.jsx";
import UpdateProductPage from "./Pages/UpdateProductPage.jsx";
import ProductsPage from "./Pages/ProductsPage.jsx";
import NotificationPage from "./Pages/NotificationPage.jsx";

import { ProductsProvider } from "./Contexts/ProductsContext";
import { OrdersProvider } from "./Contexts/OrdersContext.js";
import { NotificationProvider } from "./Contexts/NotificationContext.js";
import { AnalyticsProvider } from "./Contexts/AnalyticsContext.js";

function App() {
  return (
    <div className="App">
      <ProductsProvider>
        <OrdersProvider>
          <NotificationProvider>
            <AnalyticsProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route
                    path="/update-orders/:id"
                    element={<UpdateOrderPage />}
                  />

                  <Route path="/products" element={<ProductsPage />} />
                  <Route
                    path="/update-product/:id"
                    element={<UpdateProductPage />}
                  />
                  
                  <Route path="/create-product" element={<CreateProductPage />} />

                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/notification" element={<NotificationPage />} />
                </Routes>
              </BrowserRouter>
            </AnalyticsProvider>
          </NotificationProvider>
        </OrdersProvider>
      </ProductsProvider>
    </div>
  );
}

export default App;
