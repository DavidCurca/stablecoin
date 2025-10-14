import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY_TESTMODE as string
);

export default function Account(props: { className: string }) {
  const amount = 49.99;
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) { return; }
    fetch("/api/user/check", {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
      .then((res) => res.json())
      .then((data) => setUsername(data.username));
  }, []);

  const handleConnectCreation = async () => {
    const token = localStorage.getItem('token');
    if(!username || !token) { return; }
    fetch("/api/stripe/create-stripe-connect-account", {
      method: "POST",
      body: JSON.stringify({ user: username }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = data.accountLink;
      });
  }

  return (
    <div className={`${props.className} flex flex-col gap-4 items-center justify-center`}>
      <h1>Account Information ...</h1>
      <button className="bg-blue-500 text-white p-2 py-3 rounded-md text-bold" onClick={handleConnectCreation}>
        Create Stripe Connect Account
      </button>
      <Elements stripe={stripePromise} options={{
        mode: "payment",
        currency: "ron",
        amount: Math.round(amount * 100),
      }}>
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
}
