var APIBuilder = require('@axway/api-builder-runtime');
const twilioClient = require('twilio');
const lib = require('../utils/lib');

const debugConsoleLog = true;
const validateTwilioWebhook = true;
const apiPath = '/api/webhook';

const MessagingResponse = require('twilio').twiml.MessagingResponse;

function consoleLog(str) {
  if(debugConsoleLog){console.log(str)}
}

var webhook = APIBuilder.API.extend({
	group: 'Metrics',
	path: apiPath,
	method: 'POST',
	description: 'Twilio SMS Webhook',
	parameters: {
		ToCountry: { description: 'ToCountry', type: 'body', require: false },
		ToState: { description: 'ToState', type: 'body', require: false },
		SmsMessageSid: { description: 'SmsMessageSid', type: 'body', require: false },
		NumMedia: { description: 'NumMedia', type: 'body', require: false },
		ToCity: { description: 'ToCity', type: 'body', require: false },
		FromZip: { description: 'FromZip', type: 'body', require: false },
		SmsSid: { description: 'SmsSid', type: 'body', require: false },
		FromState: { description: 'FromState', type: 'body', require: false },
		SmsStatus: { description: 'SmsStatus', type: 'body', require: false },
		FromCity: { description: 'FromCity', type: 'body', require: false },
		Body: { description: 'Body', type: 'body', require: false },
		FromCountry: { description: 'FromCountry', type: 'body', require: false },
		To: { description: 'To', type: 'body', require: false },
		ToZip: { description: 'ToZip', type: 'body', require: false },
		NumSegments: { description: 'NumSegments', type: 'body', require: false },
		MessageSid: { description: 'MessageSid', type: 'body', require: false },
		AccountSid: { description: 'AccountSid', type: 'body', require: false },
		From: { description: 'From', type: 'body', require: false },
		ApiVersion: { description: 'ApiVersion', type: 'body', require: false }
	},
	action: function (req, resp, next) {

		consoleLog('webhook called');
    // consoleLog(req.body.From);
    // consoleLog(req.headers);

    // Validate request is from Twilio
    // https://www.twilio.com/docs/usage/security
    if(validateTwilioWebhook) {
      let webhookURL = 'https://'+req.headers.host+apiPath;
      if(!twilioClient.validateRequest(process.env.TWILIO_AUTHTOKEN, req.headers['x-twilio-signature'], webhookURL, req.body)) {
        consoleLog('Invalid Twilio Signature!!!');
        resp.response.status(500);
    		next();
        return;
      }
    }

    // Respond to Twilio Webhook Request and let user know that a response is pending
    // https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-node-js
    const twiml = new MessagingResponse();
    twiml.message('Hang tight, we are working on your request ...');
    resp.setHeader('Content-Type', 'text/xml');
		resp.response.status(200);
    resp.response.send(twiml.toString())
		next();

    // Check that SMS comes from a whitelisted user
		lib.checkUserWhitelist(req.body.From, function(e) {
			if(e.success) {
				if(e.results.length == 1) {
					consoleLog('User found in Whitelist DB');
					// consoleLog(e.results);
          // Process message
					lib.processSMSMessage(req.body);
				} else {
					consoleLog('Whitelist DB error, either user not whitelisted or duplicate users with same mobile phone number found');
				}
			} else {
				consoleLog('Whitelist DB error = '+e.results);
			}
		});

	}
});

module.exports = webhook;
