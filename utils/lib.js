var APIBuilder = require('@axway/api-builder-runtime');

let debugConsoleLog = true;

module.exports = {
  checkUserWhitelist,
  processSMSMessage
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

function processSMSMessage(msg) {
  consoleLog('processSMSMessage() called');

  consoleLog('SMS Message was '+msg.Body)
}
