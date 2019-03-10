console.log('Loading event');
var doc = require('dynamodb-doc');
var dynamodb = new doc.DynamoDB();

exports.handler = function(event, context) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    var tableName = "Subscriptions";
    
    var timestamp = new Date().getTime();

    var item = {
        "UpdateTime": timestamp,
        "PhoneNumber": event.phoneNumber,
        "ParentName" : event.parentName?event.parentName:null,
        "ParentEmail" : event.parentEmail?event.parentEmail: event.phoneNumber + "@dummy.igniterbee.com",
        "Level" : event.level?event.level:null,
        "ChildName": event.childName?event.childName:null, 
        "ChildGender": event.childGender?event.childGender:null,
        "City": event.city?event.city:null,
        "Country": event.country?event.country:null,
        "ShippingAddress": event.shippingAddress?event.shippingAddress:null
    };
    
    
    
    console.log("Item:\n", item);

    dynamodb.putItem({
            "TableName": tableName,
            "Item": item
        }, function(err, data) {
            if (err) {
                context.fail('ERROR: Dynamo failed: ' + err);
            } else {
                console.log('Dynamo Success: ' + JSON.stringify(data));
                var returnValue = {"status":"SUCCESS", "value": {"timestamp": item.UpdateTime, "phoneNumber": item.PhoneNumber}};
                context.succeed(JSON.stringify(returnValue));
            }
        });
}
