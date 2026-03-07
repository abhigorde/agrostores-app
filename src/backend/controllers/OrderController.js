import { Response } from "miragejs";
import { requiresAuth, formatDate } from "../utils/authUtils";

/**
 * All the routes related to Orders are present here.
 * These are private routes.
 */

/**
 * Place a new order for the user.
 * POST /api/user/orders
 * body: { order: { items, totalAmount, deliveryAddress, paymentId } }
 */
export const placeOrderHandler = function (schema, request) {
    const userId = requiresAuth.call(this, request);
    try {
        if (!userId) {
            return new Response(
                401,
                {},
                { errors: ["Unauthorized access error."] }
            );
        }
        const user = schema.users.findBy({ _id: userId });
        const userOrders = user.orders || [];
        const { order } = JSON.parse(request.requestBody);

        const newOrder = {
            ...order,
            orderId: "OD" + Math.floor(Math.random() * 9000000000 + 1000000000),
            status: "Processing",
            placedAt: formatDate(),
            updatedAt: formatDate(),
            trackingSteps: [
                { label: "Order Placed", done: true, date: formatDate() },
                { label: "Processing", done: true, date: formatDate() },
                { label: "Shipped", done: false, date: null },
                { label: "Out for Delivery", done: false, date: null },
                { label: "Delivered", done: false, date: null },
            ],
        };

        userOrders.push(newOrder);
        this.db.users.update({ _id: userId }, { orders: userOrders });
        return new Response(201, {}, { order: newOrder });
    } catch (error) {
        return new Response(500, {}, { error });
    }
};

/**
 * Get all orders for the user.
 * GET /api/user/orders
 */
export const getOrdersHandler = function (schema, request) {
    const userId = requiresAuth.call(this, request);
    try {
        if (!userId) {
            return new Response(
                401,
                {},
                { errors: ["Unauthorized access error."] }
            );
        }
        const user = schema.users.findBy({ _id: userId });
        const userOrders = user.orders || [];
        return new Response(200, {}, { orders: userOrders });
    } catch (error) {
        return new Response(500, {}, { error });
    }
};
