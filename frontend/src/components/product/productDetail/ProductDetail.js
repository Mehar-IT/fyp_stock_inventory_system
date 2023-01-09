import React, { useEffect, useRef, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetail.scss";
import DOMPurify from "dompurify";
import moment from "moment";
import Invoice from '../../../pages/invoice/Invoice';
import ReactToPrint from 'react-to-print';

const ProductDetail = () => {
  const componentRef = useRef();
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { id } = useParams();


  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );


  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Product Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
            <Card cardClass="group">
              {product?.avatar ? (
                <img src={product.avatar} alt="avatar" />
              ) : (
                <p>No image set for this product</p>
              )}
            </Card>
            <h4>Product Availability: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {"$"}
              {product.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {"$"}
              {product.price * product.quantity}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>

            <hr />

            <div>
              <ReactToPrint
                trigger={() => <button className="invoice">Print Invoice</button>}
                content={() => componentRef.current}
                debug={true}
              />
              <div style={{ display: 'none' }}>
                {product && <Invoice ref={componentRef} product={product} />}
              </div>
            </div>


            <b className="--color-dark">
              {" "}
              Created on: {moment(product.createdAt).fromNow()}
            </b>
            <br />
            <b className="--color-dark">
              Last Updated: {moment(product.updatedAt).fromNow()}
            </b>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
