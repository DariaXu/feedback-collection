const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose =require('mongoose');
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) =>{
        const surveys = await Survey.find({_user: req.user.id}).select( {recipients: false});

        res.send(surveys);
    });

    // recipient will be direct to this url after click
    app.get('/api/surveys/:surveyId/:choice', (req, res) =>{
        res.send("Thank you for your feedback!");
    });

    // sendgrid call this post after click
    app.post('/api/surveys/webhooks', (req, res) =>{
        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
            .map(({email, url}) => {
                const match = p.test(new URL(url).pathname);
                if (match){
                    return { email, surveyId: match.surveyId, choice: match.choice};
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice}) => {
                // execute inside the mongo
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: {email:email, responded: false}
                    }
                }, {
                    $inc: {[choice] : 1 }, // increment the choice ('yes' or 'no') to 1
                    $set: { 'recipients.$.responded': true }, // $match with the $elemMatch
                    lastResponded: Date.now(),
                }).exec();
            })
            .value();     

        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            // email => { return {email: email}}
            recipients: recipients.split(',').map(email => ({email : email.trim()})),
            _user: req.user.id,
            dataSent: Date.now()
        });

        // send the emails
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();

            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        }catch (err) {
            res.status(422).send(err);
        }
        
    });
};