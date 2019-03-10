console.log('Loading event');
var doc = require('dynamodb-doc');
var dynamodb = new doc.DynamoDB();
var AWS = require("aws-sdk");

exports.handler = function(event, context) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));
    
    var email = (event.parentEmail)? event.parentEmail : null;
    var name = (event.parentName)? event.parentName : null;
    var phone = (event.phoneNumber)? event.phoneNumber: null;
    
    // let's update name and email only when they are provided. We use conditional update here
    var updateExp = "set UpdateTime=:timestamp";
    var expValues = {":timestamp": (new Date()).getTime()};
    
    if (email) {
        updateExp = updateExp + ", ParentEmail=:email";
        expValues[":email"] = email;
    }
    if (name) {
        updateExp = updateExp + ", ParentName=:name";
        expValues[":name"] = name;
    }
    
    //send the welcome SMS
    var sns = new AWS.SNS();
    var smsparams = {
      Message: 'Thank you for registering at www.creatokits.com; Call us on +94774223902 or email to hello@igniterbee.com for more details on our Innovation Home Delivery Subscription for Children.',
      PhoneNumber: event.phoneNumber
    };
    console.log("Sending message:\n", smsparams);
    sns.publish(smsparams, function(err, data) {
      if (err)  {
        console.log(err, err.stack);
        context.fail('Sending the SMS failed: ' + err);
      } 
    });
    
    //Save record in the database
    var dbparams = {
        TableName: "Registrations",
        Key:{
            "PhoneNumber": phone
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
            console.log("Database updated:\n", dbparams);
        }
     });
    
}