


$(document).ready(function(){
    
    var API_URL = "https://oxe44imldk.execute-api.us-west-2.amazonaws.com/dev/verifymobile";

    $( "#verifyForm" ).submit(function( event ) {
            event.preventDefault();
            var phoneGuardian = sessionStorage.getItem("phoneNumber")
            $.ajax({
                type: 'POST',
                url: API_URL,
                data: JSON.stringify({"phoneNumber": phoneGuardian, "validationCode": $('#code').val()}),
                contentType: "application/json",
                success: function(data) {
                    if("SUCCESS" != data) {
                        //alert("FAILED");

                        $("#dialog-error").dialog('option', 'title', "Verification failed!");

                        $("#dialog-error").dialog('open');
                        
                    } else {


                        location.href = "./reg-guardian.html";
                    }
                        
                }

            });
            
        });

});

$(document).ready(function() {
    $("#phone").text(sessionStorage.getItem("phoneNumber"));

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

