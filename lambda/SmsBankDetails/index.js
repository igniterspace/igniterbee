console.log('Loading event');
var doc = require('dynamodb-doc');
var dynamodb = new doc.DynamoDB();
var AWS = require("aws-sdk");

exports.handler = function(event, context) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));
    
    var phone = (event.phoneNumber)? event.phoneNumber: null;
    var timestamp = (event.timestamp)? event.timestamp: null;
    var payMethod = (event.payMethod)? event.payMethod: "ToBank";
    
    var message = "Congratulations, You are now a member of IgniterBee innovation community. We will ship your first innovation pack shortly!";
    if("ToBank" === payMethod) {
        message = 'IgniterBee Bank Account Details: \n Country: Sri Lanka \n Bank: Sampath \n Bank Branch: Gangodawila \n Account No: 013510002975 \n Account Name: KidsIgnite (private) Ltd \n Amount: Rs. 19,200/- \n\n Please send a photo of the deposit slip emailed to payments@igniterbee.com or WhatsApp to +94774223902 ';
    } 
    
    
    //send the bank account details via SMS
    var sns = new AWS.SNS();
    var smsparams = {
      Message: message,
      PhoneNumber: phone
    };
    console.log("Sending message:\n", smsparams);
    sns.publish(smsparams, function(err, data) {
      if (err)  {
        console.log(err, err.stack);
        context.fail('Sending the SMS failed: ' + err);
      } 
    });
    
    
    
    // let's update name and email only when they are provided. We use conditional update here
    var updateExp = "set PaymentMethod=:pay";
    var expValues = {":pay": payMethod};
    
    //Save record in the database
    var dbparams = {
        TableName: "Subscriptions",
        Key:{
            "PhoneNumber": phone,
            "UpdateTime": parseInt(timestamp)
        },
        UpdateExpression: updateExp,
        ExpressionAttributeValues: expValues,
        ReturnValues:"UPDATED_NEW"
    };
    
    dynamodb.updateItem(dbparams, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            context.fail('Saving data to database failed: ' + err);
        } else {
            context.succeed('SUCCESS');
        }
     });
    
}