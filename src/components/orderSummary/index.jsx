import { useSelector } from "react-redux";

export default function OrderSummary({ billingInfo, onBack, onSubmit }) {
    const {cartItems}=useSelector(state=>state.products);
    console.log(cartItems)
  // calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 49; // example
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <div className="p-6 w-full max-w-lg">
      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      {/* CART ITEMS */}
      <div className="border rounded-lg p-4 mb-6 space-y-4">
        <h3 className="font-semibold text-lg mb-2">Your Items</h3>

        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b pb-3">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="font-semibold">₹{item.price * item.quantity}</div>
          </div>
        ))}

        <div className="flex justify-between mt-4 font-semibold">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (18%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mt-4 text-xl font-bold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* BILLING INFO CARD */}
      <div className="border rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-lg mb-2">Billing Details</h3>

        <p className="text-gray-700">{`${billingInfo?.fname}  ${billingInfo?.lname}` }</p>
        <p className="text-gray-500 text-sm">{billingInfo?.email}</p>

        <p className="text-gray-700 mt-2">{billingInfo?.address}</p>
        <p className="text-gray-500 text-sm">
          {billingInfo?.city}, {billingInfo?.state} {billingInfo?.zip}
        </p>

        <p className="text-gray-700 mt-2">Phone: {billingInfo?.phone}</p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
        >
          Back
        </button>

        <button
          onClick={onSubmit}
          className="px-5 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
