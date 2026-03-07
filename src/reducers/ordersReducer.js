export const ordersInitialState = {
    orders: [],
    loading: false,
};

export const ordersReducer = (state, { type, payload }) => {
    switch (type) {
        case "SET-ORDERS":
            return { ...state, orders: payload, loading: false };
        case "ADD-ORDER":
            return { ...state, orders: [payload, ...state.orders] };
        case "SET-LOADING":
            return { ...state, loading: payload };
        default:
            return state;
    }
};
