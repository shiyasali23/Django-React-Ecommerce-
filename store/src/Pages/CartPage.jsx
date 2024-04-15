import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import BasketCard from "../Components/BasketCard";
import { cartContext } from "../Contexts/CartContext";

const CartPage = () => {
  const { cartArray } = useContext(cartContext);
  const subtotal = cartArray.reduce((total, product) => total + product.subtotal, 0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        {cartArray && cartArray.length > 0 ? (
          <>
            <div className="cart-left">
              {cartArray.map((item) => (
                <BasketCard
                  id={item.product}
                  size={item.size}
                  quantity={item.quantity}
                />
              ))}
            </div>

            <div className="cart-right">
              <div className="cart-right-top">
                <div className="cart-details">
                  <form
                    action=""
                    className="cart-coupon-from"
                    id="cart-coupon-form"
                    onSubmit={handleCouponSubmit}
                  >
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      className="cart-coupon-input"
                    />
                    <button
                      type="submit"
                      className="cart-coupon-submit"
                      form="cart-coupon-form"
                    >
                      Apply
                    </button>
                  </form>

                  <div className="cart-info">
                    <h5 className="cart-info-head">Subtotal</h5>
                    <h6 className="cart-info-value">$ {subtotal}</h6>
                  </div>

                  <div className="cart-info">
                    <h5 className="cart-info-head">Coupon Discount</h5>
                    <h6 className="cart-info-value"> - $ 0 </h6>
                  </div>

                  <div className="cart-info">
                    <h5 className="cart-info-head">Taxprice</h5>
                    <h6 className="cart-info-value">18% GST Included </h6>
                  </div>

                  <div className="cart-info">
                    <h5 className="cart-info-head">Total Price</h5>
                    <h6 className="cart-info-value">$ {subtotal}</h6>
                  </div>
                </div>
              </div>
              <div className="cart-right-bottom">
                <button
                  className="cart-checkout-button"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <h5 style={{ color: "#404838", marginLeft: "40px" }}>
            Your Cart Is Empty. Go To <Link to="/store">Store</Link>
          </h5>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
