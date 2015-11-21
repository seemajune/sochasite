var userlistdata = []; //data to filling in info box

$(document).ready(function() {
    populateTable(); // Populate the user table on initial page load
});

function populateTable() { //fill table on pg load w/ data

    var tableContent = '';     // Empty content string

    $.getJSON( '/usercollection', function(data) {     // jQuery AJAX call for JSON
      // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        $('#userList table tbody').html(tableContent);  // Inject the whole content string into our existing HTML table
    });
};