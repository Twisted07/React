import { Link, useNavigate } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem2';
import { useSelector } from 'react-redux';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];



function Cart() {
  const cart = fakeCart;
  const username = useSelector(state => state.user.username);
  const navigate = useNavigate();
  // console.log(cart);

  if (!username) navigate('/');

  return (
    <div className='mt-4'>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className='mt-10 mb-4 font-bold text-md uppercase'>Your cart, %NAME%</h2>
      <ul className='divide-y divide-stone-300'>
        {cart.map(item => <CartItem item={item} key={item.pizzaId} />)}
        
        <div>
          <div className='mt-6 space-x-4'>
            <Button type='primary' to="/order/new">Order pizzas</Button>
            <Button type='transparent' >Clear cart</Button>
          </div>
        </div>
      </ul>

    </div>
  );
}

export default Cart;
