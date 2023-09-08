const paypal = require('../config/paypal');

exports.initiatePayout = async (req, res) => {
    const sender_batch_id = Math.random().toString(36).substring(9);
    const create_payout_json = {
        "sender_batch_header": {
            "sender_batch_id": sender_batch_id,
            "email_subject": "You have a payment"
        },
        "items": [
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": req.body.amount, // Assuming you send the amount in the request
                    "currency": "USD"
                },
                "receiver": req.body.receiverEmail, // Assuming you send the receiver email in the request
                "note": "Thank you.",
                "sender_item_id": "item_" + Math.random().toString(36).substring(9)
            }
        ]
    };

    paypal.payout.create(create_payout_json, function (error, payout) {
        if (error) {
            console.error(error.response);
            return res.status(500).send({ error: error.toString() });
        }
        res.status(200).send({ result: payout });
    });
};
