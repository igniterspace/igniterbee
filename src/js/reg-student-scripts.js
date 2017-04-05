$(document).ready(function(){

    var API_URL = "https://oxe44imldk.execute-api.us-west-2.amazonaws.com/dev/registerchild";
    $( "#signupForm" ).submit(function( event ) {

        event.preventDefault();
        //make ajax request
        var phoneGuardian = sessionStorage.getItem("phoneNumber");
        //alert(phoneGuardian);

        $.ajax({
                type: 'POST',
                url: API_URL,
                data: JSON.stringify({"phoneNumber": ""+phoneGuardian, "childName": $('#childsname').val(), "childGender": $("input[name='gender']:checked").val(), "childDob": $('#childsbirthday').val(), "city": $('#city').val(), "country": $('#country').val(), "shippingAddress": $('#shippingaddress').val() }),
                contentType: "application/json",
                success: function(data) {
                if("SUCCESS" != data) {
                    $("#dialog-error").dialog('option', 'title', "Registration failed!");
                    $("#dialog-error").dialog('open');
                } else {
                    location.href = "./reg-payment.html";
                }

                }
            });
    });
});



    $('.default-date-picker').datepicker({});

// validate signup form on keyup and submit
/*$("#signupForm").validate({
    rules: {
        parentsname: "required",
        parentsphone: "required",
        parentsemail: {
            required: false,
            email:true
        },
        childsname: "required",
        childsbirthday: "required",
        shippingaddress: "required",
        city: "required",
        country: "required",
        agree: "required"
    },
    messages: {
        parentsname: "Please enter parent's name",
        parentsphone: "Please enter phone number",
        childsname: "Please enter child's name",
        childsbirthday: "Please enter child's birthday",
        shippingaddress: "Please enter shipping address",
        city: "Please enter your city",
        country: "Please select the country",
        agree: "Policy agreement required"
    },
    errorPlacement: function(error, element) {
        error.insertBefore(element);
    }
    
});*/