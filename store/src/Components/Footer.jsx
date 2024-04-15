import React, { useState } from "react";
import axios from "axios";
import Message from "./Message";

const Footer = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const data = {
      name: name,
      phone_number: phoneNumber,
    };
    setMessage(null);
    setLoading(null);
    try {
      const response = await axios.post("/api/store/subscriber/create/", data, {
        headers: {
          "Content-type": "application/json",
        },
      });

      return { load: response.data };
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="footer">
      {message && <Message message={message} setMessage={setMessage} />}

      <div className="footer-container">
        <div className="footer-left">
          <h1>SKYDOT</h1>
          <div className="social-icons">
            <i className="fa-brands fa-pinterest"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-regular fa-envelope"></i>
            <i className="fa-brands fa-whatsapp"></i>
          </div>
        </div>

        <div className="footer-right">
          <form className="footer-form" onSubmit={handleSubmit}>
            <input
              className="footer-input"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="footer-input"
              type="number"
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              className="connect-button"
              form="footer-form"
              type="submit"
              value="Subscribe"
            >
              {loading ? "Registering..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
