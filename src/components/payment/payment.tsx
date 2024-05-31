import { useFormik } from "formik";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { createPaymentOrder, verifyPayment } from "./payment-service";

const userId = localStorage.getItem("userId");

const PaymentComponent = () => {
  const [Razorpay] = useRazorpay();

  const formik = useFormik({
    initialValues: {
      amount: "",
      currency: "INR",
      receipt: "order-receipt",
    },
    onSubmit: async (values) => {
      try {
        const order = await createPaymentOrder({
          amount: values.amount,
          currency: values.currency,
          receipt: values.receipt,
          userId: userId,
        });
        console.log(order, "ORDER");
        if (order?.result?.orderId) {
          const options: RazorpayOptions = {
            key: "rzp_test_bkFrzP8pjtrHDc",
            amount: values.amount,
            currency: values.currency,
            name: "AuthNexus",
            description: "User Safe Sign",
            order_id: order.result.orderId,
            handler: async (res) => {
              try {
                const {
                  razorpay_payment_id,
                  razorpay_order_id,
                  razorpay_signature,
                } = res;
                console.log(
                  razorpay_payment_id,
                  razorpay_order_id,
                  razorpay_signature,
                  "credentials"
                );
                const verificationResponse = await verifyPayment({
                  razorpay_payment_id,
                  razorpay_order_id,
                  razorpay_signature,
                });
                console.log(verificationResponse, "verificationResponse");
                if (verificationResponse.result.success) {
                  console.log(
                    "Payment verified successfully:",
                    verificationResponse.message
                  );
                } else {
                  console.error(
                    "Payment verification failed:",
                    verificationResponse.message
                  );
                }
              } catch (error) {
                console.error("Error verifying payment:", error);
              }
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
        } else {
          console.error("Order ID is undefined");
        }
      } catch (error) {
        console.error("Error initiating payment:", error);
      }
    },
  });

  return (
    <div>
      <h1>Payment Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          name="amount"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.amount}
        />

        <label htmlFor="currency">Currency:</label>
        <select
          id="currency"
          name="currency"
          onChange={formik.handleChange}
          value={formik.values.currency}
        >
          <option value="INR">INR</option>
          {/* Add more currency options as needed */}
        </select>

        <label htmlFor="receipt">Receipt:</label>
        <input
          id="receipt"
          name="receipt"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.receipt}
        />

        <button type="submit">Proceed to pay</button>
      </form>
    </div>
  );
};

export default PaymentComponent;
