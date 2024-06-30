import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";
const RelatedProduct = ({ category }) => {
  const { products } = useContext(AppContext);
  const [RelatedProduct, setRelatedProduct] = useState([]);
  useEffect(() => {
    if (category && products) {
      setRelatedProduct(
        products.filter(
          (data) => data?.category?.toLowerCase() === category?.toLowerCase()
        )
      );
    }
  }, [category, products]);
   

  return (
    <>
      <div className="container text-center">
        <h1> Related Products</h1>
        <div className="container d-flex justify-content-center align-item-center ">
          <div className="row  container d-flex justify-content-center align-item-center my-5">
            {RelatedProduct?.map((product) => (
              <div
                key={product._id}
                className=" my-3 col-md-4 d-flex justify-content-center align-item-center  "
              >
                <div
                  className="card bg-dark text-light text-center"
                  style={{ width: "14rem" }}
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="d-flex justify-content-center align-item-center p-3"
                  >
                    <img
                      src={product.imgsrc}
                      className="card-img-top"
                      alt="..."
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "10px",
                        border: "2px solid yellow",
                      }}
                    />
                  </Link>

                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <div className="my-3">
                      <button
                        className="btn btn-primary mx-3 btn-sm"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {product.price} {"₹"}
                      </button>
                      <button className="btn btn-warning btn-sm">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedProduct;
