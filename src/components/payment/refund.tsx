import React, { useState } from 'react';
import axios from 'axios';

const RefundForm = () => {
  const [paymentId, setPaymentId] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [isPartial, setIsPartial] = useState(false);
  const [message, setMessage] = useState('');

  const handleRefund = async (e: any) => {
    e.preventDefault();

    const endpoint = isPartial ? '/api/partial-refund' : '/api/refund';
    const data = isPartial ? { paymentId, amount, reason } : { paymentId, reason };

    try {
      const response = await axios.post(endpoint, data);
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>{isPartial ? 'Partial Refund' : 'Full Refund'}</h2>
      <form onSubmit={handleRefund}>
        <div>
          <label>Payment ID:</label>
          <input
            type="text"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            required
          />
        </div>
        {isPartial && (
          <div>
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label>Reason:</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isPartial}
              onChange={(e) => setIsPartial(e.target.checked)}
            />
            Partial Refund
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RefundForm;
