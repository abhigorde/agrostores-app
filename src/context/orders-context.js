import { createContext, useContext, useReducer } from "react";
import { ordersInitialState, ordersReducer } from "../reducers/ordersReducer";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
    const [ordersState, dispatchOrders] = useReducer(
        ordersReducer,
        ordersInitialState
    );

    return (
        <OrdersContext.Provider value={{ ordersState, dispatchOrders }}>
            {children}
        </OrdersContext.Provider>
    );
};

export const useOrders = () => useContext(OrdersContext);
