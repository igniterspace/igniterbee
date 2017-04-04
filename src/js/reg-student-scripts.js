$(document).ready(function(){


            var API_URL = "https://oxe44imldk.execute-api.us-west-2.amazonaws.com/dev/registerchild";
            $( "#signupForm" ).submit(function( event ) {

                //make ajax request
                var phoneGuardian = sessionStorage.getItem("phoneNumber");
                //alert(phoneGuardian);

                $.ajax({
                    type: 'POST',
                    url: API_URL,
                    data: JSON.stringify({"phoneNumber": ""+phoneGuardian, "childName": $('#childsname').val(), "childGender": $("input[name='gender']:checked").val(), "childDob": $('#childsbirthday').val(), "city": $('#city').val(), "country": $('#country').val(), "shippingAddress": $('#shippingaddress').val() }),
                   //data: JSON.stringify({"phoneNumber": "11112", "childName": "apu", "childGender": "D", "childDob": "FF", "city": "R", "country": "FFE", "shippingAddress": "F" }),
                    contentType: "application/json",
                    success: function(data) {
                        if("SUCCESS" != data) {
                    //alert("FAILED");

                    $("#dialog-error").dialog('option', 'title', "Registration failed!");

                    $("#dialog-error").dialog('open');
                    
                } else {
                    

                    location.href = "./payment-options.html" + "?tab=" + tab;
                }

                    }
                });










                //-------
                //alert( "submit data to the backend here"+ getElementById('childsname').value );
                var success = true;
                //if(success) {
                //    location.href = "./payment.html" + "?tab=" + tab;
                //}
                event.preventDefault();
            });
        });




function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}



var tab = 'atonce';
        $(document).ready(function(){
            var temp = null;
            if (temp = getUrlParameter('tab')) {
                tab = temp;
            }
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