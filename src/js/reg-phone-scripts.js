
$(document).ready(function(){
    
    //countrycode input setup
    $("#phone").intlTelInput({
      // allowDropdown: false,
      // autoHideDialCode: false,
      // autoPlaceholder: "off",
      // dropdownContainer: "body",
      // excludeCountries: ["us"],
      // formatOnDisplay: false,
      // geoIpLookup: function(callback) {
      //   $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
      //     var countryCode = (resp && resp.country) ? resp.country : "";
      //     callback(countryCode);
      //   });
      // },
      // initialCountry: "auto",
      // nationalMode: false,
      // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
      // placeholderNumberType: "MOBILE",
      // preferredCountries: ['cn', 'jp'],
      // separateDialCode: true,
      utilsScript: "js/utils.js"
    });

    
    var API_URL = "https://oxe44imldk.execute-api.us-west-2.amazonaws.com/dev/register";
    $( "#phoneForm" ).submit(function( event ) {
        //--
        //make ajax request here
        $.ajax({
            type: 'POST',
            url: API_URL,
            data: JSON.stringify({"phoneNumber": $('#parentsphone').val()}),
            contentType: "application/json",
            success: function(data) {
                if("SUCCESS" != data) {
                    //alert("FAILED");

                    $("#dialog-error").dialog('option', 'title', "Registration failed!");

                    $("#dialog-error").dialog('open');
                    
                } else {
                    $("#dialog-code").dialog('option', 'title', "Enter mobile code");
                    $("#dialog-code").dialog('open');

                   // location.href = "./reg-student.html"+"?phone="+$('#parentsphone').val()+"&tab=" + tab;
                }
                    
            }

        });
        event.preventDefault();
    });
});



$(document).ready(function(){
    var API_URL = "https://oxe44imldk.execute-api.us-west-2.amazonaws.com/dev/register";

    $( "#verifyForm" ).submit(function( event ) {
            //--
            //make ajax request here
            $.ajax({
                type: 'POST',
                url: API_URL,
                data: JSON.stringify({"phoneNumber": $('#parentsphone').val()}),
                contentType: "application/json",
                success: function(data) {
                    if("SUCCESS" != data) {
                        //alert("FAILED");

                        $("#dialog-error").dialog('option', 'title', "Registration failed!");

                        $("#dialog-error").dialog('open');
                        
                    } else {
                        $("#dialog-code").dialog('option', 'title', "Enter mobile code");
                        $("#dialog-code").dialog('open');

                        location.href = "./reg-guardian.html"+"?phone="+$('#parentsphone').val()+"&tab=" + tab;
                    }
                        
                }

            });
            event.preventDefault();
        });

});




var tab = 'atonce';
$(document).ready(function(){
    var temp = null;
    if (temp = getUrlParameter('tab')) {
        tab = temp;
    }
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