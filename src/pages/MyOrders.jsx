import { Navbar, Footer } from "../components/allComponents";
import { useOrders } from "../context/orders-context";
import { fetchOrders } from "../services/orderServices";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/orders.css";

export const MyOrders = () => {
    const { ordersState, dispatchOrders } = useOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchOrders({ dispatchOrders });
    }, []);

    return (
        <>
            <Navbar />
            <div className="orders-page">
                <h2 className="text-center orders-heading">My Orders</h2>
                {ordersState.loading && (
                    <p className="text-center">Loading orders...</p>
                )}
                {!ordersState.loading && ordersState.orders.length === 0 && (
                    <div className="orders-empty flex-column-center">
                        <i className="material-icons orders-empty-icon">inventory_2</i>
                        <h3>No Orders Yet</h3>
                        <p>Looks like you haven&apos;t placed any orders yet.</p>
                        <Link to="/products" className="btn btn-solid">
                            Start Shopping
                        </Link>
                    </div>
                )}
                <div className="orders-list">
                    {[...ordersState.orders].reverse().map((order) => (
                        <div key={order.orderId} className="order-card">
                            <div className="order-card-header">
                                <div>
                                    <p className="order-id fw-bold">Order ID: {order.orderId}</p>
                                    <p className="order-date fs-sm">
                                        Placed on:{" "}
                                        {new Date(order.placedAt).toLocaleDateString("en-IN", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                                <span className="order-status-badge">{order.status}</span>
                            </div>
                            <div className="order-items-preview">
                                {order.items.slice(0, 2).map((item) => (
                                    <div key={item._id} className="order-item-preview-row">
                                        <img src={item.imgUrl} alt={item.title} className="order-item-thumb" />
                                        <div>
                                            <p className="fw-bold fs-sm order-item-title">{item.title}</p>
                                            <p className="fs-sm">
                                                Qty: {item.quantity || item.qty} &nbsp;|&nbsp; ₹{item.price}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {order.items.length > 2 && (
                                    <p className="fs-sm order-more-items">
                                        +{order.items.length - 2} more item(s)
                                    </p>
                                )}
                            </div>
                            <div className="order-card-footer">
                                <p className="fw-bold">Total: ₹{order.totalAmount}</p>
                                <Link
                                    to={`/orders/${order.orderId}`}
                                    className="btn btn-solid-icon btn-view-order"
                                >
                                    View Details{" "}
                                    <i className="material-icons">chevron_right</i>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};
