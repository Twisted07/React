import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";


function CartItem({ item }) {
  const { name, quantity, totalPrice } = item;

  return (
    <li className="pt-2 my-2 sm:flex sm:justify-between sm:items-center">
      <p className="text-lg">
        {quantity}&times; {name}
      </p>

      <div className="flex justify-between items-center sm:gap-6">
        <p>{formatCurrency(totalPrice)}</p>
        <Button type='small'>Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
