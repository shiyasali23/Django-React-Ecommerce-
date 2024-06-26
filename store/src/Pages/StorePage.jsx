import React, { useContext } from "react";
import ProductCard from "../Components/ProductCard.jsx";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { productsContext } from "../Contexts/ProductsContext.js";

const HomeScreen = ({ category }) => {
  const { productsArray } = useContext(productsContext);

  return (
    <div>
      <Header />
      <div className="store-container">
        {productsArray && productsArray.length > 0 ? (
          productsArray
            .filter((items) => !category || items.category === category)
            .map((items) => (
              <ProductCard
                key={items.id}
                id={items.id}
                name={items.name}
                image={items.images.main_image}
                price={items.price}
              />
            ))
        ) : (
          <h4 style={{ color: "#404838" }}>Oops Something Went Wrong...</h4>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;
