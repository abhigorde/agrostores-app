import { Navbar, Footer } from "../components/allComponents";
import { useOrders } from "../context/orders-context";
import { fetchOrders } from "../services/orderServices";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/pages/orders.css";

export const OrderDetailsPage = () => {
    const { orderId } = useParams();
    const { ordersState, dispatchOrders } = useOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (ordersState.orders.length === 0) {
            fetchOrders({ dispatchOrders });
        }
    }, [dispatchOrders, ordersState.orders.length]);

    const order = ordersState.orders.find((o) => o.orderId === orderId);

    if (!order) {
        return (
            <>
                <Navbar />
                <div className="orders-page orders-empty flex-column-center">
                    <i className="material-icons orders-empty-icon">search_off</i>
                    <h3>Order Not Found</h3>
                    <Link to="/orders" className="btn btn-solid">
                        Back to My Orders
                    </Link>
                </div>
                <Footer />
            </>
        );
    }

    const trackingSteps = order.trackingSteps || [
        { label: "Order Placed", done: true },
        { label: "Processing", done: true },
        { label: "Shipped", done: false },
        { label: "Out for Delivery", done: false },
        { label: "Delivered", done: false },
    ];

    const lastDoneIndex = trackingSteps.reduce(
        (acc, step, i) => (step.done ? i : acc),
        -1
    );

    return (
        <>
            <Navbar />
            <div className="orders-page">
                <div className="order-details-container">
                    {/* Header */}
                    <div className="order-details-header">
                        <Link to="/orders" className="btn-back-link">
                            <i className="material-icons">arrow_back</i> My Orders
                        </Link>
                        <h2>Order Details</h2>
                        <span className="order-status-badge">{order.status}</span>
                    </div>

                    {/* Order Meta */}
                    <div className="order-meta-grid">
                        <div className="order-meta-item">
                            <span className="meta-label">Order ID</span>
                            <span className="meta-value fw-bold">{order.orderId}</span>
                        </div>
                        <div className="order-meta-item">
                            <span className="meta-label">Payment ID</span>
                            <span className="meta-value">{order.paymentId}</span>
                        </div>
                        <div className="order-meta-item">
                            <span className="meta-label">Order Date</span>
                            <span className="meta-value">
                                {new Date(order.placedAt).toLocaleDateString("en-IN", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                        <div className="order-meta-item">
                            <span className="meta-label">Total Amount</span>
                            <span className="meta-value fw-bold primary-color">
                                ₹{order.totalAmount}
                            </span>
                        </div>
                    </div>

                    {/* Tracking Timeline */}
                    <div className="tracking-section">
                        <h3>Track Your Order</h3>
                        <div className="tracking-timeline">
                            {trackingSteps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`tracking-step ${step.done ? "done" : ""} ${index === lastDoneIndex ? "active" : ""
                                        }`}
                                >
                                    <div className="tracking-dot">
                                        {step.done ? (
                                            <i className="material-icons">check_circle</i>
                                        ) : (
                                            <i className="material-icons">radio_button_unchecked</i>
                                        )}
                                    </div>
                                    {index < trackingSteps.length - 1 && (
                                        <div
                                            className={`tracking-line ${step.done ? "done" : ""}`}
                                        />
                                    )}
                                    <p className="tracking-label">{step.label}</p>
                                    {step.date && (
                                        <p className="tracking-date fs-sm">
                                            {new Date(step.date).toLocaleDateString("en-IN", {
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Items Ordered */}
                    <div className="order-items-section">
                        <h3>Items Ordered ({order.items.length})</h3>
                        {order.items.map((item) => (
                            <div key={item._id} className="order-detail-item">
                                <img
                                    src={item.imgUrl}
                                    alt={item.title}
                                    className="order-detail-img"
                                />
                                <div className="order-detail-info">
                                    <p className="fw-bold">{item.title}</p>
                                    <p className="fs-sm">
                                        Quantity: {item.quantity || item.qty}
                                    </p>
                                    <p className="fs-sm">
                                        Price: ₹{item.price} × {item.quantity || item.qty} ={" "}
                                        <span className="fw-bold">
                                            ₹{item.price * (item.quantity || item.qty)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="order-price-breakdown">
                        <h3>Price Breakdown</h3>
                        <div className="price-row">
                            <span>Subtotal</span>
                            <span>₹{order.totalAmount - (order.deliveryCharge || 0)}</span>
                        </div>
                        <div className="price-row">
                            <span>Delivery Charge</span>
                            <span>
                                {order.deliveryCharge === 0
                                    ? "FREE"
                                    : `₹${order.deliveryCharge}`}
                            </span>
                        </div>
                        <div className="price-row total-row">
                            <span className="fw-bold">Total Paid</span>
                            <span className="fw-bold primary-color">₹{order.totalAmount}</span>
                        </div>
                    </div>

                    {/* Delivery Address */}
                    {order.deliveryAddress && (
                        <div className="order-address-section">
                            <h3>Delivery Address</h3>
                            <div className="order-address-box">
                                <p className="fw-bold">{order.deliveryAddress.name}</p>
                                <p>{order.deliveryAddress.flatName}</p>
                                <p>{order.deliveryAddress.area}</p>
                                <p>
                                    {order.deliveryAddress.city}, {order.deliveryAddress.state},{" "}
                                    {order.deliveryAddress.pincode}
                                </p>
                                <p>{order.deliveryAddress.country}</p>
                                <p>Contact: {order.deliveryAddress.contact}</p>
                            </div>
                        </div>
                    )}

                    <div className="order-details-actions">
                        <Link to="/orders" className="btn btn-outline">
                            <i className="material-icons">list</i> All Orders
                        </Link>
                        <Link to="/products" className="btn btn-solid">
                            <i className="material-icons">shopping_basket</i> Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
