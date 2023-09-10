const paypal = require('@paypal/payouts-sdk');

// Initialize PayPal SDK
const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

exports.handlePayout = async (req, res) => {
    const { email, amount } = req.body;

    const requestBody = {
        sender_batch_header: {
            recipient_type: "EMAIL",
            email_message: "You have received a payout!"
        },
        items: [{
            recipient_type: "EMAIL",
            receiver: email,
            amount: {
                value: amount,
                currency: "USD"
            }
        }]
    };

    const request = new paypal.payouts.PayoutsPostRequest();
    request.requestBody(requestBody);

    try {
        const response = await client.execute(request);
        if (response.statusCode === 201) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
};

// exports.handlePayout = async (req, res) => {
//      const { sender, receiverEmail, amount } = req.body;
 
//      // Check if the sender has enough balance or if the payment was confirmed.
//      // This logic depends on your app's structure and requirements.
 
//      const requestBody = {
//          sender_batch_header: {
//              recipient_type: "EMAIL",
//              email_message: "You have received a payout!"
//          },
//          items: [{
//              recipient_type: "EMAIL",
//              receiver: receiverEmail,
//              amount: {
//                  value: amount,
//                  currency: "USD"
//              }
//          }]
//      };
 
//      const request = new paypal.payouts.PayoutsPostRequest();
//      request.requestBody(requestBody);
 
//      try {
//          const response = await client.execute(request);
//          if (response.statusCode === 201) {
 
//              // Update the database to record this transaction
//              await Transaction.create({
//                  sender: sender,
//                  receiver: receiverEmail,
//                  amount: amount,
//                  status: 'successful'
//              });
 
//              res.json({ success: true });
//          } else {
//              res.json({ success: false });
//          }
//      } catch (error) {
//          console.error(error);
//          res.status(500).json({ success: false });
//      }
//  };
 