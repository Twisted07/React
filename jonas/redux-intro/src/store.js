import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./Features/accounts/accountSlice";
import customerReducer from "./Features/customers/customerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer,
    }
})

// const combinedReducer = combineReducers({
//     account: accountReducer,
//     customer: customerReducer,
// }
// )
// const store = createStore(combinedReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

