var APIBuilder = require('@axway/api-builder-runtime');

const twilioClient = require('twilio');

const debugConsoleLog = true;

let aclib = require('../utils/aclib');

module.exports = {
  checkUserWhitelist,
  processSMSMessage
}

function sendSMS(from, to, msg) {
  var twilio = new twilioClient(process.env.TWILIO_ACCOUNTSID, process.env.TWILIO_AUTHTOKEN);

  twilio.messages.create({
    from: from,
    to: to,
    body: msg
  }, function(err, result) {
    consoleLog('Mesage sent');
    consoleLog(result.sid);
  });
}

function consoleLog(str) {
  if(debugConsoleLog){console.log(str);}
}

function checkUserWhitelist(mobile, callback) {
  consoleLog('checkUserWhitelist() called');

  var whitelist = APIBuilder.getModel('whitelist');
  whitelist.query({mobile:mobile}, function(error, results) {
    if(error) {
      callback({success: false, results: error});
    } else {
      callback({success: true, results: results});
    }
  })

}

function processSMSMessage(msg, user) {
  consoleLog('processSMSMessage() called');

  // consoleLog(msg);
  // consoleLog(user);

  // Set deault value for Amplify Central Service Account Client Id, Client Secret, and URL (based on my account)
  var acsaclientid = process.env.AC_SA_CLIENTID;
  var acsaclientsecret = process.env.AC_SA_CLIENTSECRET;
  var acbaseurl = process.env.AC_BASEURL;

  // If whitelist user configured their creds, then use them
  if(user.hasCreds) {
    acsaclientid = user.acsaclientid;
    acsaclientsecret = user.acsaclientsecret;
    acbaseurl = user.acbaseurl;
  }

  aclib.init(acsaclientid, acsaclientsecret, acbaseurl, function(e){
    aclib.getEnvironments(function(f){

      var environments = f.data;
      var message='Environments:\n';
      environments.forEach((item, i) => {
        message += item.name+'\n'
      });

      sendSMS(process.env.TWILIO_FROM_NUMBER, msg.From, message);
      
    })
  });

}
