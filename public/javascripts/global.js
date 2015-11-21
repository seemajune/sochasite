var userListData = []; //data to filling in info box

$(document).ready(function() {
    populateTable(); // Populate the user table on initial page load
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo); // username link Click
    $('#btnAddUser').on('click', addUser);  // Add User button click
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser); // Delete User link click
});

function populateTable() { //fill table on pg load w/ data

    var tableContent = '';     // Empty content string

    $.getJSON( '/usercollection', function(data) {     // jQuery AJAX call for JSON

      userListData = data; // puts db data into global var

        $.each(data, function(){ // For each item in our JSON, add a table row and cells to the content string
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        $('#userList table tbody').html(tableContent);  // Inject the whole content string into our existing HTML table
    });
};

function showUserInfo(e) { // Show User Info

    e.preventDefault();

    var thisUserName = $(this).attr('rel'); // Retrieve username from link rel attribute

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    var thisUserObject = userListData[arrayPosition]; // Get our User Object

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.username);
    $('#userInfoEmail').text(thisUserObject.email);
};

function addUser(e) { // Add User Info

  e.preventDefault();

  var errorCount = 0; // super basic error handling

    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; } // if user didnt put in their name or email, increment errorCount 
    });

    if(errorCount === 0) { // Check and make sure errorCount's still at zero

        var newUser = { // If it is, compile all user info into one object
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val()
        }

        $.ajax({ // Use AJAX to post the object to our adduser service
            type: 'POST',
            data: newUser,
            url: '/usercollection/adduser',
            dataType: 'JSON'
        }).done(function(response) {  

            if (response.msg === '') { // Check for successful (blank) response
              // ADD SUCCESS MODAL HERE 
              $('#addUser fieldset input').val(''); // Clear the form inputs

              populateTable();  // Update the table
            }
            else {
                alert('Error: ' + response.msg); 
                // ADD ERROR MODAL HERE
            }
        });
    }
    else {
        alert('Please fill in all fields'); // If errorCount is more than 0, error out 
        // ADD ERROR MODAL HERE
        return false;
    }
};

function deleteUser(e) {
  e.preventDefault();

  var confirmation = confirm('Are you sure you want to delete this user?');
  
  if (confirmation === true) {
    $.ajax({
      type: 'DELETE',
      url: '/usercollection/deleteuser/' + $(this).attr('rel')
    }).done(function(response){
        if (response.msg === '') { 
        // Check for successful (blank) response
        }
        else {
          alert('Error: ' + response.msg);
          //ADD ERROR MODAL HERE
        }
        populateTable();
      });
  }
  else {
    return false; //if they said no to the confirmation box
  }
};

