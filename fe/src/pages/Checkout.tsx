import React, { useState, useEffect } from 'react';
import { instance } from '@/configs/axios'; // Giả sử bạn đã cấu hình axios trong đường dẫn này
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  // const [clientSecret, setClientSecret] = useState('');
  // const stripe = useStripe();
  // const elements = useElements();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Gọi endpoint để lấy clientSecret từ server
  //   const fetchData = async () => {
  //     try {
  //       const response = await instance.post('/stripe/create-payment-intent', {
  //         amount: 1000,
  //         currency: 'usd' // Thay đổi amount và currency theo nhu cầu
  //       });
  //       setClientSecret(response.data.clientSecret);
  //     } catch (error) {
  //       console.error('Error fetching client secret:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handlePayment = async () => {
  //   if (!stripe || !elements) {
  //     // Stripe.js chưa được tải
  //     return;
  //   }

  //   const cardElement = elements.getElement(CardElement);

  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: 'card',
  //     card: cardElement,
  //   });

  //   if (error) {
  //     console.log('[error]', error);
  //   } else {
  //     console.log('[PaymentMethod]', paymentMethod);

  //     // Thực hiện thanh toán với clientSecret đã nhận được
  //     const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  //       payment_method: paymentMethod.id
  //     });

  //     if (confirmError) {
  //       console.error('Payment confirmation error:', confirmError);
  //     } else {
  //       console.log('Payment succeeded:', paymentIntent);

  //       navigate(`/thankyou?id=${paymentIntent.id}`)


  //       // Xử lý khi thanh toán thành công (chuyển hướng, cập nhật UI, ...)
  //     }
  //   }
  // };
  const cardElementStyle = {
    base: {
      dislay: "flex",
      flexDirection: "column",
      fontSize: '36px',
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#aab7c4'
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };



  return (
    <div>
      <CardElement options={{ style: cardElementStyle }} />
      {/* <button onClick={handlePayment}>Pay Now</button> */}
    </div>
  );
}

export default Checkout;
