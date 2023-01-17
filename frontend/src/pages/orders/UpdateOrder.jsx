import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import "../../components/product/productForm/ProductForm.scss";
import {
  getOrderDetail,
  orderUpdate,
} from "../../redux/features/order/orderService";
import { useParams } from "react-router-dom";

import ReactPaginate from "react-paginate";
import Search from "../../components/search/Search";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../redux/features/product/filterSlice";
import { getAllProducts } from "../../redux/features/product/productSlice";
import Loader, { SpinnerImg } from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { clearError } from "../../redux/features/order/orderSlice";

export default function UpdateOrder() {
  const { orderDetail, loading, error, isUpdated } = useSelector(
    (state) => state.orders
  );
  const { products, isLoading } = useSelector((state) => state.product);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setProduct({
      name: orderDetail.name || "",
      product: orderDetail.product || "",
      quantity: orderDetail.quantity || "",
      orderStatus: orderDetail.orderStatus || "",
    });

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      dispatch(getAllProducts());
    }
  }, [orderDetail, id, loading, error, dispatch, isUpdated]);

  useEffect(() => {
    // if (isUpdated) {
    getOrderDetail(dispatch, id);
    // }
  }, [dispatch, id, isUpdated]);
  const saveProduct = (e) => {
    e.preventDefault();

    orderUpdate(dispatch, id, product);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredPoducts);

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <label>Order Name:</label>

          <input
            disabled={
              product?.orderStatus !== "accepted" ||
              orderDetail.orderStatus === "accepted"
                ? true
                : false
            }
            type="text"
            placeholder="Order name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Order Quantity:</label>
          <input
            disabled={
              product?.orderStatus !== "accepted" ||
              orderDetail.orderStatus === "accepted"
                ? true
                : false
            }
            type="number"
            placeholder="Order Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label
            style={{
              border: "1px solid #777777",
              borderRadius: "3px",
              padding: "10px",
              marginBottom: "5px",
            }}
          >
            Order Status:{" "}
            <span
              style={{
                display: "inline",
                fontSize: "17px",
                borderRadius: "10px",
                padding: "5px",
                backgroundColor:
                  orderDetail.orderStatus === "rejected" ||
                  orderDetail.orderStatus === "processing"
                    ? "#fc3838"
                    : "#6ceb79",
                color: "white",
              }}
            >
              {orderDetail.orderStatus}
            </span>
          </label>

          <select
            required
            style={{
              display: `${
                orderDetail.orderStatus === "delivered" ||
                orderDetail.orderStatus === "rejected"
                  ? "none"
                  : "block"
              } `,
            }}
            name="orderStatus"
            value={product?.orderStatus}
            onChange={handleInputChange}
          >
            <option>status options</option>
            {orderDetail.orderStatus === "accepted" ||
            orderDetail.orderStatus === "shipped" ||
            orderDetail.orderStatus === "delivered" ||
            orderDetail.orderStatus === "rejected" ? null : (
              <option value="rejected">rejected</option>
            )}
            {orderDetail.orderStatus === "rejected" ||
            orderDetail.orderStatus === "shipped" ||
            orderDetail.orderStatus === "delivered" ||
            orderDetail.orderStatus === "accepted" ? null : (
              <option value="accepted">accepted</option>
            )}
            {orderDetail.orderStatus === "delivered" ||
            orderDetail.orderStatus === "shipped" ? null : (
              <option value="shipped">shipped</option>
            )}
            <option value="delivered">delivered</option>
          </select>

          <label>Stock Category:</label>
          <input
            required
            disabled={
              product?.orderStatus !== "accepted" ||
              orderDetail.orderStatus === "accepted"
                ? true
                : false
            }
            type="text"
            placeholder="Stock Category"
            name="product"
            value={product?.product}
            onChange={handleInputChange}
          />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Order Approval
            </button>
          </div>
        </form>
      </Card>
      <div className="product-list">
        <hr />
        <div className="table">
          <div className="--flex-between --flex-dir-column">
            <span>
              <h3>Inventory Items</h3>
            </span>
            <span>
              <Search
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </span>
          </div>

          {isLoading && <SpinnerImg />}

          <div className="table">
            {!isLoading && products.length === 0 ? (
              <p>-- No product found, please add a product...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.map((product, index) => {
                    const { _id, name, category, quantity } = product;

                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td
                          style={{
                            cursor: "pointer",
                            // cursor: `url('https://i.stack.imgur.com/ygtZg.png'), auto`,
                          }}
                          onClick={() => {
                            navigator.clipboard.writeText(_id);
                            toast.info(`Id ${_id} is Copied`);
                          }}
                        >
                          {_id}
                        </td>
                        <td>{shortenText(name, 16)}</td>
                        <td>{category}</td>
                        <td>{quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="activePage"
          />
        </div>
      </div>
    </div>
  );
}
