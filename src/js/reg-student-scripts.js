$(document).ready(function(){

    $('.default-date-picker').datepicker({});

    var API_URL = "https://oxe44imldk.execute-api.us-west-2.amazonaws.com/dev/registerchild";
    $( "#signupForm" ).submit(function( event ) {

        event.preventDefault();
        //make ajax request
        var phoneGuardian = sessionStorage.getItem("phoneNumber");
        var emailGuardian = sessionStorage.getItem("parentEmail");
        var nameGuardian = sessionStorage.getItem("parentName");
        var record = {
            "parentName": nameGuardian,
            "parentEmail": emailGuardian,
            "phoneNumber": "" + phoneGuardian, 
            "childName": $('#childsname').val(), 
            "childGender": $("input[name='gender']:checked").val(), 
            "childDob": $('#childsbirthday').val(), 
            "city": $('#city').val(), 
            "country": $('#country').val(), 
            "shippingAddress": $('#shippingaddress').val() 
        };
        

        $.ajax({
                type: 'POST',
                url: API_URL,
                data: JSON.stringify(record),
                contentType: "application/json",
                success: function(data) {
                    var result = JSON.parse(data);
                    if("SUCCESS" != result.status) {
                        $("#dialog-error").dialog('option', 'title', "Registration failed!");
                        $("#dialog-error").dialog('open');
                    } else {
                        sessionStorage.setItem("timestamp", result.value.timestamp);
                        location.href = "./reg-payment.html";
                    }

                }
            });
    });
});



    
