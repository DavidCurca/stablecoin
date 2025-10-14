import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CheckoutForm(props: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({ 
        amount: Math.round(props.amount * 100),
        reference_code: Math.random().toString(36).substring(2, 15),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [props.amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      toast.error(submitError.message);
      setLoading(false);
      return ;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret!,
      confirmParams: {
        return_url: `${window.location.origin}/account`,
      },
    });
    if (confirmError) {
      toast.error(confirmError.message);
    }
  };
  
  if(!clientSecret || !stripe || !elements) {
    return <div className="text-bold">Loading checkout form...</div>;
  }

  return (
    <form className="w-[90vw] max-w-[600px] flex flex-col gap-4 bg-gray-100 p-4 rounded-md" onSubmit={handleSubmit}>
      <p>Convert <span className="font-bold">{props.amount}</span> RON to RONC</p>
      {clientSecret && <PaymentElement />}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 py-3 rounded-md text-bold">
        {loading ? "Processing..." : "Pay now"}
      </button>
    </form>
  );
}
