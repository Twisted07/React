// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useState } from "react";


// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const cart = fakeCart;
  const errorData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="mt-6 mx-10">
      <h2 className="text-xl font-semibold mb-4">Ready to order? Let&apos; s go!</h2>

      <Form method="POST">
        <div>
          <label className="font-semibold">First Name</label>
          <input className="input mb-4" type="text" name="customer" required />
        </div>

        <div>
          <label className="font-semibold">Phone number</label>
          <div>
            <input className="input mb-4" type="tel" name="phone" required />
          </div>
          {errorData?.phone && <p>{errorData.phone}</p>}
        </div>

        <div>
          <label className="font-semibold">Address</label>
          <div>
            <input type="text" name="address" placeholder="Delivery address..." required
              className="input mb-6"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <input
            className="
              h-5 w-5
              accent-yellow-500
              focus:outline-none
              focus:ring
              focus:ring-yellow-500
              focus:ring-offset-2
            "
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="text-sm">Want to give your order priority?</label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        <div className="mb-10">
          <Button type='primary'>
            {isSubmitting ? 'Placing Order...' : 'ORDER NOW'}
            {/* ORDER NOW */}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}) {
  // setIsSubmitting(true);
  const requestData = await request.formData();
  const data = Object.fromEntries(requestData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  }

  // ? All errors need to be taken care of before a new order is created, so no one messes with the order database and for orders to be handled with the correct data. If any error occurs, it should be caught in the form action data. 
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Please insert your correct phone number. We might need it to contact you regarding your order."
  }


  // * Ensure error object is only returned whenever it's valid
  if(Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  // setIsSubmitting(false);


  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
