import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { productsContext } from "../Contexts/ProductsContext";
import { cartContext } from "../Contexts/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const { productsArray } = useContext(productsContext);
  const { cartArray, setCartArray } = useContext(cartContext);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const selectedProduct = productsArray.find((product) => product.id === id);

  const imgArray = useMemo(() => {
    return selectedProduct
      ? [
          selectedProduct?.images?.main_image,
          selectedProduct?.images?.sub_image_1,
          selectedProduct?.images?.sub_image_2,
          selectedProduct?.images?.sub_image_3,
        ]
      : [];
  }, [selectedProduct]);

  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    setMainImage(imgArray[0]);
  }, [setMainImage, imgArray]);



  const stocksObj = useMemo(() => {
    return selectedProduct
      ? {
          S: selectedProduct.stock.stock_S,
          M: selectedProduct.stock.stock_M,
          L: selectedProduct.stock.stock_L,
          XL: selectedProduct.stock.stock_XL,

        }
      : {};
  }, [selectedProduct]);


  const handleSizeClick = (size) => {
    const isSelected = selectedSizes.includes(size);
    if (isSelected) {
      setSelectedSizes(selectedSizes.filter((selected) => selected !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const addToCart = () => {
    selectedSizes.forEach((size) => {
      setCartArray((prevArray) => {
        const existingProductIndex = prevArray.findIndex(
          (product) => product.product === selectedProduct.id && product.size === size
        );
  
        if (existingProductIndex !== -1) {
          const updatedArray = [...prevArray];
          updatedArray[existingProductIndex].quantity += 1;
          updatedArray[existingProductIndex].subtotal = 1 * selectedProduct.price;
          return updatedArray;
        }
  
        return [
          ...prevArray,
          {
            product: selectedProduct.id,
            size: size,
            quantity: 1,
            subtotal: 1 * selectedProduct.price
          },
        ];
      });
    });
  
    setSelectedSizes([]);
  };


  const changeImage = (index) => {
    setMainImage(imgArray[index]);
  };

  return (
    <div className="product-page">
      <Header />

      <div className="display-container">
        <div className="display-left">
          <div className="display-left-top">
            <div className="display-main-img">
              <img src={mainImage} alt="" />
            </div>
          </div>
          <div className="display-left-bottom">
            {imgArray.map((item, index) => (
              <div className="sub-img-container" key={index}>
                <img
                  className="sub-img"
                  src={item}
                  alt=""
                  onClick={() => changeImage(index)}
                />
              </div>
            ))}
          </div>
        </div>
        {/* ------------------Right--------------- */}
        <div className="display-right">
          <div className="display-right-top">
            <p className="display-product-name">{selectedProduct?.name}</p>

            <p className="display-product-price">${selectedProduct?.price}</p>

            <div className="display-sizes-container">
              {Object.keys(stocksObj).map(
                (size) =>
                  stocksObj[size] > 0 && (
                    <button
                      key={size}
                      className="display-size-button"
                      onClick={() => handleSizeClick(size)}
                      style={{
                        background: selectedSizes.includes(size)
                          ? "black"
                          : "transparent",
                        color: selectedSizes.includes(size) ? "white" : "black",
                      }}
                    >
                      {size}
                    </button>
                  )
              )}
            </div>
            <button className="display-cart-button" onClick={addToCart}>
              Add Cart
            </button>
          </div>

          <div className="display-right-bottom">
            <p className="display-product-description">
              {selectedProduct?.description}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
