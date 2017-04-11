
$(document).ready(function(){

    $("#phone").intlTelInput({
      preferredCountries: ['lk'],
      utilsScript: "js/utils.js"
    });

    var API_URL = "https://oxe44imldk.execute-api.us-west-2.amazonaws.com/dev/register";
    $( "#signupForm" ).submit(function( event ) {
        //--
        //make ajax request here
        var phoneGuardian = sessionStorage.getItem("phoneNumber");
        var email = $('#parentsemail').val();
        var name = $('#parentsname').val();

        sessionStorage.setItem("parentEmail", email);
        sessionStorage.setItem("parentName", name);
        
        $.ajax({
            type: 'POST',
            url: API_URL,
            data: JSON.stringify({"phoneNumber": phoneGuardian, "parentEmail": email, "parentName": name}),
            contentType: "application/json",
            success: function(data) {
                if("SUCCESS" != data) {
                    $("#dialog-error").dialog('option', 'title', "Registration failed!");
                    $("#dialog-error").dialog('open');
                } else {
                    location.href = "./reg-student.html";
                }
            }
        });
        event.preventDefault();
    });
});


  $(document).ready(function() {
    $("#dialog-error").dialog({
      autoOpen:false,
      resizable: false,
      height: "auto",
      width: "auto",
      modal: true,
      responsive: true,
      buttons: {
        OK: function() {
          $( this ).dialog( "close" );
        }
      }
    });
  });



  $(document).ready(function() {
    $("#dialog-code").dialog({
      autoOpen:false,
      resizable: false,
      height: "auto",
      width: "auto",
      modal: true,
      responsive: true
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