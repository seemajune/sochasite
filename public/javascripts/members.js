$(document).ready(function() {
    showMembers();  // Add Member List
});

function showMembers() { // Add User Info

  $.ajax({ // Use AJAX to post the object to our addmember service
            type: 'GET',
            url: '/memberslist',
            dataType: 'JSON'
        }).done(function(response) {  
          makeList(response);
        });
};

function makeList(res){
  console.log("response", res);
}