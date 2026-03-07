import axios from "axios";

const getOrdersKey = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData ? `orders_${userData.email}` : null;
};

const loadOrdersFromStorage = () => {
    const key = getOrdersKey();
    if (!key) return [];
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
};

const saveOrdersToStorage = (orders) => {
    const key = getOrdersKey();
    if (key) localStorage.setItem(key, JSON.stringify(orders));
};

/**
 * Place a new order after payment success.
 */
export const placeOrder = async ({ auth, orderData, dispatchOrders }) => {
    try {
        const response = await axios.post(
            "/api/user/orders",
            { order: orderData },
            { headers: { authorization: auth.token } }
        );
        const newOrder = response.data.order;

        // Persist to localStorage so orders survive page refreshes
        const existing = loadOrdersFromStorage();
        saveOrdersToStorage([newOrder, ...existing]);

        dispatchOrders({ type: "ADD-ORDER", payload: newOrder });
        return newOrder;
    } catch (error) {
        console.error("Place Order Error", error);
        return null;
    }
};

/**
 * Fetch all orders for the logged-in user from localStorage.
 * localStorage is used as the source of truth since MirageJS resets on refresh.
 */
export const fetchOrders = ({ dispatchOrders }) => {
    const orders = loadOrdersFromStorage();
    dispatchOrders({ type: "SET-ORDERS", payload: orders });
};
