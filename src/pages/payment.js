import React, { useState } from "react";
import axios from "axios";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51NvaMuBhSobiWFQoVj8R9Je5KKr1T2LTjIRIawSREooAiz6iOj4grdSAoUyBoaAta04m4t83WJyEgd6Muafa2U7S00HkSNz0jJ");

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    amount: "",
    currency: "",
    description: ""
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardElement = elements.getElement(CardElement);

    try {
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        setError(error.message);
      } else {
        console.log("Token created:", token.id);

        const response = await axios.post('http://localhost:3001/api/student/charges', {
          source: token.id,
          amount: formData.amount,
          currency: formData.currency,
          description: formData.description
        });

        setError(null);
        window.open(response.data.message, '_blank');
        alert("Payment successfully");
      }
    } catch (error) {
      console.error("Error adding card:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', padding: '20px', background: '#f9f9f9', border: '1px solid #ddd' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
          Add Card Detail
          </div>
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
      </div>
      <div>
        <label>
          Currency:
          <input
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', fontSize: '16px',marginBottom: '10px',borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
      </div>
      {error && <div style={{ color: 'red', marginTop:'5px', marginBottom: '10px' }}>{error}</div>}
      <button type="submit" style={{ padding: '10px 20px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>Pay Amount</button>
    </form>
  );
}

function Page() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Page;
