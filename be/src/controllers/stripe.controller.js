const SuccessRespone = require("../cores/successResponse");
const {
  createpaymentIntent,
  webhookHandleResponse,
} = require("../services/stripe.service");

class StripeController {
  createPayment = async (req, res) => {
    return new SuccessRespone({
      message: "Tao ga thanh cong!",
      metadata: await createpaymentIntent(req,res),
    })
  };
  listenWebhook = async (req, res) => {
    return new SuccessRespone({
      message: "Tao ga thanh cong!",
      metadata: await webhookHandleResponse(req, res),
    }).send(res);
  };
}

module.exports = new StripeController();
