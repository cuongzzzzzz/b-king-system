const stripe = require('stripe')('sk_test_51P2V9N2L099IelWr3eXRB8Iqitu7RQ8YuDGXLw2Q3GGvZA5v74n7OtUBW7dg7XHcRsRBDwlecUuTJkfXR7sWwBbZ00VBZpKu19')
// const createpaymentIntent = async ({ currency, totalAmount }) => {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: totalAmount,
//     currency,
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   return {
//     clientSecret: paymentIntent.client_secret,
//   };
// };

// const webhookHandleResponse = async (req, res) => {
//   const signature = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       signature,
//       "sk_test_51P2V9N2L099IelWr3eXRB8Iqitu7RQ8YuDGXLw2Q3GGvZA5v74n7OtUBW7dg7XHcRsRBDwlecUuTJkfXR7sWwBbZ00VBZpKu19" // Your webhook secret
//     );
//   } catch (err) {
//     console.error(err);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   switch (event.type) {
//     case "payment_intent.succeeded":
//       const paymentIntent = event.data.object;
//       console.log(paymentIntent);
//       return { m: `PaymentIntent for ${paymentIntent.amount} was successful!` };
//       // Cập nhật trạng thái đơn hàng tại đây
//       break;
//     case "payment_method.attached":
//       const paymentMethod = event.data.object;
//       console.log(paymentMethod);

//       return {
//         m: `PaymentMethod ${paymentMethod.id} was attached to customer ${paymentMethod.customer}`,
//       };

//       break;
//     // Xử lý các sự kiện khác
//     default:
//       return { received: true };
//   }
// };

const createpaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Tạo Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Trả về clientSecret để client-side có thể sử dụng để hoàn tất thanh toán
    res.status(200).json({clientSecret:paymentIntent.client_secret});
  } catch (error) {
    console.error('Error creating Payment Intent:', error.message);
    res.status(500).json({ error: 'Unable to create Payment Intent' });
  }
}
const webhookHandleResponse = (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'sk_test_51P2V9N2L099IelWr3eXRB8Iqitu7RQ8YuDGXLw2Q3GGvZA5v74n7OtUBW7dg7XHcRsRBDwlecUuTJkfXR7sWwBbZ00VBZpKu19'); // Thay bằng Stripe webhook secret của bạn
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Xử lý các sự kiện từ Stripe
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful:', paymentIntent);
      // Cập nhật trạng thái đơn hàng hoặc thực hiện các hành động cần thiết
      break;
    case 'payment_intent.payment_failed':
      const failedPaymentIntent = event.data.object;
      console.error('PaymentIntent failed:', failedPaymentIntent);
      // Xử lý khi thanh toán thất bại
      break;
    // Xử lý các sự kiện khác từ Stripe (tùy theo yêu cầu của ứng dụng)
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  // Trả lại 200 OK để xác nhận nhận được webhook thành công
  res.json({ received: true });
}
module.exports = { createpaymentIntent, webhookHandleResponse };
