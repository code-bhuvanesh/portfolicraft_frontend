var searchbar = document.getElementById("profile-search");
var searchbutton = document.getElementById("search-btn");

searchbar.addEventListener("keydown",searchUser);
searchbutton.addEventListener("onclick", searchUser);


function searchUser(event){
  if(event.key == 'Enter'){
    var username = searchbar.value;
    console.log(username);
    window.location = '/profile/?username=' + username;
  }
}

sendPostRequest()