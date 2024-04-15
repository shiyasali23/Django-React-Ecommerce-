import React, { createContext, useState } from "react";
import axios from "axios";

export const orderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const createOrder = async (order) => {
    setMessage(null);
    setLoading(null);
    try {
      const response = await axios.post("/api/store/order/create/", order, {
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.status === 201) {
        return { orderId: response.data.id };
      }
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong");
      return { orderId: false };
    } finally {
      setLoading(false);
    }
  };

  const getOrder = async (orderId) => {
    setMessage(null);
    setLoading(true);
    try {
      const response = await axios.get(`/api/store/order/${orderId}`, {
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.status === 200) {
        return { load: response.data };
      }
    } catch (error) {
      setMessage("Something went wrong! Please try again");
      return { load: false };
    } finally {
      setLoading(false);
    }
  };
  
  const createReview = async (reviewData) => {
    console.log(reviewData);
    setMessage(null);
    setLoading(true);
    try {
      const response = await axios.post(`/api/store/review/create/`,reviewData, {
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.status === 201) {
        return { sucess: true };
      }
    } catch (error) {
      setMessage("Something went wrong! Please try again");
      return { sucess: false };
    } finally {
      setLoading(false);
    }
  };

  return (
    <orderContext.Provider
      value={{
        createOrder,
        setMessage,
        getOrder,
        createReview,
        message,
        loading,
      }}
    >
      {children}
    </orderContext.Provider>
  );
};
