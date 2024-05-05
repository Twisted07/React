import { combineReducers, createStore } from "redux";
import accountReducer from "./Features/accounts/accountSlice";
import customerReducer from "./Features/customers/customerSlice";


const combinedReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
}
)

const store = createStore(combinedReducer);

export default store;

