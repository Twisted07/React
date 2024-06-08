import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

function MenuItem({ pizza }) {
  const {id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="py-4 flex gap-4">
      <img className={`h-26 ${soldOut ? 'opacity-70 grayscale' : ""}`} src={imageUrl} alt={name} />
      <div className="flex flex-col w-full">
        <p className="uppercase text-xl font-bold mb-2">{name}</p>
        <p className="capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex justify-between items-center">
          {!soldOut ? <p className="uppercase text-sm text-stone-600">{formatCurrency(unitPrice)}</p> : <p className="uppercase text-sm italic text-stone-500">Sold out</p>}
          <Button type='small'>Add to cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
