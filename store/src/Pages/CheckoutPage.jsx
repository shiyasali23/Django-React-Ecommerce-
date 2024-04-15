import React, { useContext, useEffect, useState } from "react";
import Footer from "../Components/Footer";
import { orderContext } from "../Contexts/OrderContext";

import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../Contexts/CartContext";
import { productsContext } from "../Contexts/ProductsContext";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const CheckoutPage = () => {
  const { createOrder, loading, message, setMessage } =
    useContext(orderContext);
  const [orderStatus, setOrderStatus] = useState(null);
  const { productsArray } = useContext(productsContext);
  const { cartArray } = useContext(cartContext);
  const [customer, setCustomer] = useState({});
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    tracking_id: Math.floor(100000 + Math.random() * 900000).toString(),
    isWhatsapp: false,
    shipping_price: 40,
    total_price: cartArray.reduce(
      (total, product) => total + product.subtotal,
      0
    ),
    tax_price:
      cartArray.reduce((total, product) => total + product.subtotal, 0) * 0.18,
    payment_method: "UPI",
  });

  useEffect(() => {
    // if (!cartArray.length) {
    //   navigate("/cart");
    // }
  }, [cartArray, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedOrder = {
      ...order,
      customer: customer,
      order_products: cartArray,
    };
    const { orderId } = await createOrder(updatedOrder);

    if (orderId) {
      setOrderStatus(orderId);
    }
  };

  return (
    <div className="checkout-page">
      <Link to="/store" style={{ textDecoration: "none",  }}>
        <h1 className="checkout-header">SKYDOT</h1>
      </Link>

      {message && <Message message={message} setMessage={setMessage} />}


      <form
        className="checkout-form"
        id="checkout-form"
        onSubmit={handleSubmit}
      >
        {loading ? (
          <Loader text={"Placing Order "} />
        ) : orderStatus ? (
          <h3 style={{ color: "#404838" }}> Order Placed Sucessfully!  <Link to="/store">Store</Link>
           <br /> Track order with: {orderStatus} 
          </h3>
        ) : (
          <>
            <div className="checkout-form-left">
              <input
                required
                name="name"
                type="text"
                placeholder="Name"
                className="checkout-input"
                value={customer?.name}
                onChange={(e) =>
                  setCustomer((prevCustomer) => ({
                    ...prevCustomer,
                    name: e.target.value,
                  }))
                }
              />

              <input
                required
                name="email"
                type="email"
                placeholder="Email"
                className="checkout-input"
                value={customer?.email}
                onChange={(e) =>
                  setCustomer((prevCustomer) => ({
                    ...prevCustomer,
                    email: e.target.value,
                  }))
                }
              />

              <input
                required
                name="phonenumber"
                type="number"
                placeholder="Phone number"
                className="checkout-input"
                value={customer?.phonenumber}
                onChange={(e) =>
                  setCustomer((prevCustomer) => ({
                    ...prevCustomer,
                    phone_number: e.target.value,
                  }))
                }
              />

              <input
                name="city"
                type="text"
                placeholder="City"
                className="checkout-input"
                value={customer?.city}
                onChange={(e) =>
                  setCustomer((prevCustomer) => ({
                    ...prevCustomer,
                    city: e.target.value,
                  }))
                }
              />

              <input
                required
                name="pincode"
                type="number"
                placeholder="Pincode"
                className="checkout-input"
                value={customer?.pincode}
                onChange={(e) =>
                  setCustomer((prevCustomer) => ({
                    ...prevCustomer,
                    pincode: e.target.value,
                  }))
                }
              />

              <input
                required
                name="address"
                type="text"
                placeholder="Address"
                className="checkout-input checkout-input-address"
                value={customer?.address}
                onChange={(e) =>
                  setCustomer((prevCustomer) => ({
                    ...prevCustomer,
                    address: e.target.value,
                  }))
                }
              />

              <div className="checkout-input-whatsapp">
                <h5 className="checkout-details-head">
                  Get updates on WhatsApp
                </h5>
                <input
                  name="whatsappUpdates"
                  type="checkbox"
                  checked={order.isWhatsapp}
                  onChange={(e) =>
                    setOrder((prevOrder) => ({
                      ...prevOrder,
                      isWhatsapp: e.target.checked,
                    }))
                  }
                />
              </div>
            </div>

            <div className="checkout-form-right">
              <div className="checkout-products-container">
                {cartArray.map((item, i) => (
                  <div key={i} className="checkout-product-wrapper">
                    <h5 className="product-info-value">
                      {
                        productsArray.find(
                          (product) => product.id === item.product
                        )?.name
                      }
                    </h5>

                    <h6 className="product-info-value">{item.size}</h6>
                    <h6 className="product-info-value">{item.quantity}</h6>
                  </div>
                ))}
              </div>

              <div className="checkout-info-container">
                <div className="checkout-details-wrapper">
                  <h5 className="checkout-details-head">Coupon Discount</h5>
                  <h6 className="checkout-details-value">- $0</h6>
                </div>

                <div className="checkout-details-wrapper">
                  <h5 className="checkout-details-head">Shipping price</h5>
                  <h6 className="checkout-details-value">$0</h6>
                </div>
                <div className="checkout-details-wrapper">
                  <h5 className="checkout-details-head">Total Price</h5>
                  <h6 className="checkout-details-value">$</h6>
                </div>
              </div>

              <div className="checkout-right-bottom">
                <button
                  type="submit"
                  className="checkout-buy-button"
                  form="checkout-form"
                >
                  Buy
                </button>
              </div>
            </div>
          </>
        )}
      </form>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
