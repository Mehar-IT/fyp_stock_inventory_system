import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { SpinnerImg } from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { useSelector } from "react-redux";
import { getOrderDetail } from "../../redux/features/order/orderService";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import OrderInvoice from "../../pages/invoice/OrderInvoice";

export default function OrderDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const componentRef = useRef();

  const { orderDetail, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    getOrderDetail(dispatch, id);
  }, [dispatch, id]);

  return (
    <div className="profile --my2">
      {loading && <SpinnerImg />}
      <>
        {!loading && orderDetail === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-data">
              <p>
                <b>Name : </b> {orderDetail?.name}
              </p>
              <p>
                <b>Quantity : </b> {orderDetail?.quantity}
              </p>
              <p>
                <b>Description : </b> {orderDetail?.description}
              </p>
              <p>
                <b>Status : </b> {orderDetail?.orderStatus}
              </p>
              <p>
                <b>Product : </b> {orderDetail?.product}
              </p>
              <p>
                <b>OrderedAt : </b>{" "}
                {String(orderDetail?.orderedAt).substring(0, 10)}
              </p>
              <p>
                <b>updatedAt : </b>{" "}
                {String(orderDetail?.updatedAt).substring(0, 10)}
              </p>
              <p>
                <b>CreatedBy : </b> {orderDetail?.user?.name}
              </p>
              <p>
                <b>email : </b> {orderDetail?.user?.email}
              </p>
              <p>
                <b>Department : </b> {orderDetail?.user?.dept}
              </p>
              <div>
                <ReactToPrint
                  trigger={() => (
                    <button className="invoice">Print Invoice</button>
                  )}
                  content={() => componentRef.current}
                  debug={true}
                />
                <div style={{ display: "none" }}>
                  {orderDetail && (
                    <OrderInvoice ref={componentRef} order={orderDetail} />
                  )}
                </div>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
}
