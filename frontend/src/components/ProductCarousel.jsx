import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
 
const ProductCarousel = ({ products }) => {
  return (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image}></Image>
            <Carousel.Caption>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
 
export default ProductCarousel;