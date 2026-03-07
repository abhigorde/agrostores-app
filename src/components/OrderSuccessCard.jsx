import "../styles/components/orderCard.css";
import { Link, useLocation } from "react-router-dom";

export const OrderSuccessCard = ({ paymentId }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");

  return (
    <>
      <div className="order-box flex-column">
        <img
          src="https://res.cloudinary.com/dvuh4fz9d/image/upload/v1657615696/check_xyzqdd.png"
          className="success-tick-img"
          alt="success"
        />
        <h2 className="text-center">Your Order Has Been Placed Successfully!</h2>
        {orderId && (
          <h3 className="text-center payment-text">Order ID: {orderId}</h3>
        )}
        <h3 className="text-center payment-text">Payment ID: {paymentId}</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "center", marginTop: "1rem" }}>
          {orderId && (
            <Link
              to={`/orders/${orderId}`}
              className="btn btn-solid btn-continue-shopping"
            >
              View Order Details{" "}
              <i className="material-icons mg-left-xsm">receipt_long</i>
            </Link>
          )}
          <Link to="/orders" className="btn btn-outline btn-continue-shopping">
            My Orders{" "}
            <i className="material-icons mg-left-xsm">list_alt</i>
          </Link>
          <Link to="/products" className="btn btn-outline btn-continue-shopping">
            Continue Shopping{" "}
            <i className="material-icons mg-left-xsm">shopping_basket</i>
          </Link>
        </div>
      </div>
    </>
  );
};
