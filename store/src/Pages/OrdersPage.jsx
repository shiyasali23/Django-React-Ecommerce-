import React, { useContext, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { orderContext } from "../Contexts/OrderContext";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const OrdersPage = () => {
  const { getOrder, createReview, message, setMessage, loading } =
    useContext(orderContext);
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [review, setReview] = useState([]);

  const handleStar = (id, newRating) => {
    const existingIndex = review.findIndex((item) => item.orderProduct === id);
    const updatedReview = [...review];
    if (existingIndex !== -1) {
      updatedReview[existingIndex].rating = newRating;
    } else {
      updatedReview.push({ orderProduct: id, rating: newRating });
    }
    setReview(updatedReview);
  };

  const handleReviewBody = (id, newBody) => {
    const existingIndex = review.findIndex((item) => item.orderProduct === id);
    const updatedReview = [...review];
    if (existingIndex !== -1) {
      updatedReview[existingIndex].body = newBody;
    } else {
      updatedReview.push({ orderProduct: id, body: newBody });
    }
    setReview(updatedReview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { load } = await getOrder(orderId);
    setOrder(load);
  };

  const handleReviewSubmit = async (id) => {
    const reviewdata = review.find((i)=> i.orderProduct === id)
    const { sucess } = await createReview(reviewdata);
    if (sucess) {
      const { load } = await getOrder(orderId);
      setOrder(load);
    }
  };
console.log(review);
  return (
    <div className="orders-page">
      <Header />
      {message && <Message message={message} setMessage={setMessage} />}

      <form className="orders-form" onSubmit={handleSubmit}>
        <input
          required
          className="orders-input"
          type="text"
          placeholder="Enter Order Id"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <input className="orders-submit" type="submit" value="Get" />
      </form>
      <div className="orders-container">
        {order ? (
          <>
            <div className="orders-container-left">
              <p>{order?.customer?.name}</p>
              <p>{order?.customer?.email}</p>
              <p>{order?.customer?.city}</p>
              <h6>Date: {new Date(order?.created).toLocaleDateString()}</h6>
              <h6>Total Price: $ {order?.total_price}</h6>
              <h6>Order Status: {order?.status}</h6>
              <h6>Payment Method: {order?.payment_method}</h6>
            </div>

            <div className="orders-container-right">
              {order &&
                order.order_products &&
                order.order_products.map((item) => (
                  <div className="order-items-wrapper" key={item.id}>
                    <div className="order-card-info">
                      <h6>{item.product_name}</h6>
                      <h6>Size: {item.size}</h6>
                      <h6>Quantity: {item.quantity}</h6>
                    </div>
                    <div className="order-card-review-stars">
                      {Array.from({ length: 5 }, (_, index) => (
                        <i
                          key={index}
                          className="fa-solid fa-star"
                          style={{
                            fontSize: "25px",
                            color: item?.review?.rating
                              ? index < item?.review?.rating
                                ? "yellow"
                                : "black"
                              : review.some(
                                  (i) => i.orderProduct === item.id && i.rating > index
                                )
                              ? "yellow"
                              : "black",
                          }}
                          onClick={() =>
                            !item?.review?.rating &&
                            handleStar(item.id, index + 1)
                          }
                        ></i>
                      ))}
                    </div>
                    {item?.review?.body ? (
                      <p style={{ overflow: "auto" }}>{item.review.body}</p>
                    ) : (
                      <textarea
                        cols="45"
                        rows="4"
                        placeholder="Add your review here"
                        value={
                          review.find((i) => i.orderProduct === item.id)
                            ?.body || ""
                        }
                        style={{ padding: "5px 10px", fontSize: "15px" }}
                        onChange={(e) =>
                          handleReviewBody(item.id, e.target.value)
                        }
                      ></textarea>
                    )}
                    {!item?.review?.body && !item?.review?.rating && (
                      <button
                        className="order-card-review-submit"
                        type="submit"
                        form=""
                        onClick={() => handleReviewSubmit(item.id)}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </>
        ) : loading ? (
          <Loader text={"Fetching order"} />
        ) : (
          <h3>Search Order With Order Id</h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage;
