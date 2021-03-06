var memberListData = []; //data to filling in info box

$(document).ready(function() {
    $('#btnAddMember').on('click', addMember);  // Add User button click
});

function addMember(e) { // Add User Info

  e.preventDefault();

  var errorCount = 0, // super basic error handling
      errorText = '',
      inputEmail = $('#inputMemberEmail');

    if(inputEmail.val() === '') { 
      errorCount++; // if user didnt put in their name or email, increment errorCount 
      errorText += "\nPlease fill in your email address.";
    }  

    var re = /\S+@\S+\.\S+/;

    if(!re.test(inputEmail.val())) { // if email contains incorrect chars
      errorCount++; 
      errorText += "\nPlease enter a valid email address.";
    }

    if(errorCount === 0) { // Check and make sure errorCount's still at zero

        var newMember = { // If it is, compile all user info into one object
            'email': inputEmail.val().toLowerCase()
        };

        console.log("dmember : ",  newMember);
        $.ajax({ // Use AJAX to post the object to our addmember service
            type: 'POST',
            data: newMember,
            url: '/members/addmember',
            dataType: 'JSON'
        }).done(function(response) {  

            if (response.msg === '') { // Check for successful (blank) response
				inputEmail.val('');
			  // $('#addUser fieldset input').val(''); // Clear the form inputs
                swal({   title: "Hooray!",   text: "We'll email you when Socha is available to download!",   type: "success",   confirmButtonText: "Cool" });
            }
            else {
                swal({   title: "Oops!",   text: response.msg,   type: "error",   confirmButtonText: "Cool" });
            }
        });
    }
    else {
        // If errorCount is more than 0, error out 
        swal({   title: "Oops!",   text: errorText,   type: "error",   confirmButtonText: "Cool" });
        return false;
    }
};
