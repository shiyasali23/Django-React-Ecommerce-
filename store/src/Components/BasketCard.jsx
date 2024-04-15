import React, {useContext } from "react";
import { cartContext } from "../Contexts/CartContext";
import { productsContext } from "../Contexts/ProductsContext";

const BasketContainer = ({ id, size }) => {
  const { cartArray, setCartArray } = useContext(cartContext);
  const { productsArray } = useContext(productsContext);
  const selectedProduct = productsArray.find((product) => product.id === id);

  const handleQuantityChange = (event) => {
    setCartArray((prevArray) => {
      const existingProductIndex = prevArray.findIndex(
        (product) =>
          product.product === selectedProduct.id && product.size === size
      );
      if (existingProductIndex !== -1) {
        const updatedArray = [...prevArray];
        updatedArray[existingProductIndex].quantity = event.target.value;
        updatedArray[existingProductIndex].subtotal = selectedProduct.price * event.target.value;
        return updatedArray;
      }
    });
  };

  const deleteBasket = () => {
    setCartArray((prevArray) => {
      return prevArray.filter(
        (product) =>
          !(product.product === selectedProduct.id && product.size === size)
      );
    });
  };

  return (
    <div className="basket-container">
      <div className="basket-left">
        <div className="basket-image">
          <img
            src={selectedProduct?.images?.main_image}
            alt={selectedProduct?.name}
          />
        </div>
        <p className="basket-name">{selectedProduct?.name}</p>
      </div>

      <div className="basket-right">
        <p className="basket-size">Size: {size}</p>

        <select
          className="basket-quantity"
          value={
            cartArray.find(
              (product) =>
                product.product === selectedProduct.id && product.size === size
            )?.quantity || ""
          }
          onChange={(e) => handleQuantityChange(e)}
        >
          {selectedProduct &&
            selectedProduct.stock[`stock_${size}`] &&
            Array.from(
              { length: selectedProduct.stock[`stock_${size}`] },
              (_, index) => index + 1
            ).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
        </select>

        <p className="basket-subtotal">
          ${" "}
          {selectedProduct &&
          cartArray.find(
            (product) =>
              product.product === selectedProduct.id && product.size === size
          )
            ? selectedProduct.price *
              cartArray.find(
                (product) =>
                  product.product === selectedProduct.id &&
                  product.size === size
              ).quantity
            : 0}
        </p>
        <i
          className="fa-solid fa-trash basket-delete"
          onClick={deleteBasket}
        ></i>
      </div>
    </div>
  );
};

export default BasketContainer;
