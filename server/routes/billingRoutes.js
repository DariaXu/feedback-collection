const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
    // handle charge creation, will run require login whenever this route got called
    // express can take arbitary arguments, but only one will return the respond
    app.post('/api/stripe', requireLogin, async (req, res) => {

        const charge = await stripe.charges.create({
            amount: 1000,
            currency: 'usd',
            description: '$10 for 10 credits',
            source: req.body.id
        });
        
        // if (!charge) {
        //     throw new Error("charge unsuccessful");
        // }

        // setup initially by passport
        req.user.credits += 10;
        const user = await req.user.save();
        res.send(user);
    });
}