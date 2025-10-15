import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import { Info, User } from "lucide-react";
import "./Account.css";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY_TESTMODE as string
);

interface User {
  username: string;
  email: string;
  phone: string;
  country: string;
  firstname: string;
  lastname: string;
  stripe_id: string;
}

export default function Account(props: { className: string }) {
  const [amount, setAmount] = useState<number>(49.99);
  const [username, setUsername] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    fetch("/api/user/check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsername(data.username));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    fetch("/api/user/user-info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  const handleConnectCreation = async () => {
    const token = localStorage.getItem("token");
    if (!username || !token) {
      return;
    }
    fetch("/api/stripe/create-stripe-connect-account", {
      method: "POST",
      body: JSON.stringify({ user: username }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = data.accountLink;
      });
  };

  return (
    <div
      className={`${props.className} flex flex-col gap-4 items-center justify-center pb-16`}
    >
      {user && (
        <>
          <div className="flex felx-row">
            <User className="w-10 h-10" />
            <div className="flex flex-col">
              <p>
                {user.firstname} {user.lastname}
              </p>
              <p className="font-mono text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="w-full text-left">Associated Accounts</p>
            <table>
              <thead
                className="font-bold"
                style={{ fontVariant: "small-caps" }}
              >
                <td>Blockchain</td>
                <td>Address</td>
                <td>
                  <div className="flex flex-row gap-2 items-center">
                    Referecnce Code
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-center w-80">
                          The reference code is used to track the account in
                          the blockchain. This is revelvant information for our support team if you encounter any issues.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </td>
              </thead>
              <tbody>
                <tr>
                  <td>Solana</td>
                  <td className="font-mono">8Rk5mTMvCt1y629QzesCs3ALybQ8SbMssxRwfCjqNhjS</td>
                  <td>jvupBkZxRq</td>
                </tr>
                <tr>
                  <td>Polygon</td>
                  <td className="font-mono">0x25b9fc2ed95bbaa9c030e57c860545a17694f90d</td>
                  <td>CF4t7zHKYf</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className="flex flex-col gap-2 items-center justify-center max-w-[500px] w-[80vw]">
        <button
          className="bg-blue-500 text-white p-2 py-3 rounded-md text-bold"
          onClick={handleConnectCreation}
        >
          Create Stripe Connect Account
        </button>
        <p className="text-sm text-gray-500">To be able to reedem back RON from your RONC holdings, you need to create a Stripe Connect account.</p>
      </div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          currency: "ron",
          amount: Math.round(amount * 100),
        }}
      >
        <CheckoutForm amount={amount} setAmount={setAmount} />
      </Elements>
    </div>
  );
}
