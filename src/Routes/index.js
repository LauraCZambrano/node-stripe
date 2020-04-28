const express = require('express');
const app = express();

//stripe
const stripe = require('stripe')('sk_test_LYj3TvMoUyv2V1mSR5XRAI0m00ue8Nz6CH');

//specifics routes
app.get('/', async (req, res) => {


    //create the id 
    const customer = await stripe.customers.create();

    //make a payment
    //Stripe expects amounts in cents/pence, so if you pass amount as amount = 10
    //This will be considered as 10 pence instead of 10 USD.
    //10 * 100 = 1000
    const intent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: 'USD',
        customer: customer.id,
    });
    console.log(intent);
    console.log('-------------------');
    
    //create a card
    stripe.customers.createSource(
        customer.id,
        {source: 'tok_mastercard'},
        function(err, card) {
            console.log(card);
        }
    );
});


//exports
module.exports = app;