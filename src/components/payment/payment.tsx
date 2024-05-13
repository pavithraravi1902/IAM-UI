import { useCallback } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { createPaymentOrder } from "./payment-service";

const PaymentComponent = () => {
  const [Razorpay] = useRazorpay();

  const handlePayment = useCallback(async () => {
    const order = await createPaymentOrder({
      amount: "50000",
      currency: "INR",
      receipt: "order_rec_1",
    });

    const options: RazorpayOptions = {
      key: "rzp_test_bkFrzP8pjtrHDc",
      amount: "50000",
      currency: "INR",
      name: "Auth Nexus",
      description: "Test Transaction",
      order_id: order.id,
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "Pavithra R",
        email: "pavithraravi1902@gmail.com",
        contact: "8056324658",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div className="App">
      <button onClick={handlePayment}>Proceed to pay</button>
    </div>
  );
};

export default PaymentComponent;
