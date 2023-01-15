import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import { submitOrder } from "../../redux/features/order/orderService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../redux/features/order/orderSlice";
import { useNavigate } from "react-router-dom";

export default function CreateOrder() {
  const initialState = {
    name: "",
    quantity: "",
    description: "",
  };
  const [product, setProduct] = useState(initialState);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.orders);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);
  const saveProduct = (e) => {
    e.preventDefault();
    submitOrder(dispatch, product);
    navigate("/orders");
    toast.success("order is submitted");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <label>Product Name:</label>

          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Product Quantity:</label>
          <input
            type="number"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />
          <label>Product Description:</label>
          <textarea
            style={{
              resize: "vertical",
              padding: "10px",
              fontSize: "15px",
              outline: "none",
              width: "100%",
            }}
            placeholder="Product Description"
            name="description"
            rows="20"
            value={product?.description}
            onChange={handleInputChange}
          />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Submit Order
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
