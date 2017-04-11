
$(document).ready(function(){
    
    //countrycode input setup
    $("#phone").intlTelInput({
      preferredCountries: ['lk'],
      utilsScript: "js/utils.js"
    });

    
    var API_URL = "https://oxe44imldk.execute-api.us-west-2.amazonaws.com/dev/register";
    $( "#phoneForm" ).submit(function( event ) {
         event.preventDefault();
        //--
        //make ajax request here
        var phoneNumber = $("#phone").intlTelInput("getNumber")
        sessionStorage.setItem("phoneNumber", phoneNumber);
        $.ajax({
            type: 'POST',
            url: API_URL,
            data: JSON.stringify({"phoneNumber": phoneNumber, "sendCode":true}),
            contentType: "application/json",
            success: function(data) {
                if("SUCCESS" != data) {
                    $("#dialog-error").dialog('option', 'title', "Registration failed!");
                    $("#dialog-error").dialog('open');
                } else {
                    location.href = "./reg-verify.html";
                }
            }
        });
       
    });
});





var tab = 'atonce';
$(document).ready(function(){
    var temp = null;
    if (temp = getUrlParameter('tab')) {
        tab = temp;
    }
    sessionStorage.setItem("tab", tab)
});





//---------------



//---------------






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