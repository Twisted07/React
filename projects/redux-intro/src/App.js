import CreateCustomer from "./Features/customers/CreateCustomer";
import Customer from "./Features/customers/Customer";
import AccountOperations from "./Features/accounts/AccountOperations";
import BalanceDisplay from "./Features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";

function App() {
  const customer = useSelector(store => store.customer.fullName);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {
        !customer ? 
        <CreateCustomer /> :
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      }
    </div>
  );
}

export default App;
