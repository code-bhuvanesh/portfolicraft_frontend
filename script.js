var searchbar = document.getElementById("profile-search");
var searchbutton = document.getElementById("search-btn");

var profileImg = document.getElementById("profile-img")
var loginLink = document.getElementById("login-link")

var hiddenDiv = document.getElementById("hidden-div");

searchbar.addEventListener("keydown",searchUser);
searchbutton.addEventListener("onclick", searchUser);

var hiddenDivVisible = false;


function checkUserLogedin(){
  if(getToken("accesstoken") == null){
    console.log("user loged in  : " + getToken("acesstoken"))
    loginLink.style.display = "block"
    profileImg.style.display = "none"
  }
  else{
    console.log("user not logged in")
    loginLink.style.display = "none"
    profileImg.style.display = "block"

  }
}

checkUserLogedin()

profileImg.addEventListener("click", ()=>{
  console.log(1)
  if (hiddenDiv.classList.contains('hidden')) {
    console.log(2)
    hiddenDiv.classList.remove('hidden');
    hiddenDiv.classList.add('fade-in');
    hiddenDiv.addEventListener('animationend', () => {
      hiddenDiv.classList.remove('hidden');
    });
  } else {
    console.log(3)
    hiddenDiv.classList.remove('fade-in');
    hiddenDiv.classList.add('fade-out');
    // After the fade-out animation completes, hide the div
    hiddenDiv.addEventListener('animationend', () => {
      console.log("asdskadjksajdkljkj")
      hiddenDiv.classList.remove('fade-out');
      hiddenDiv.classList.add('hidden');
    });
  }
})

function searchUser(event){
  if(event.key == 'Enter'){
    var username = searchbar.value;
    console.log(username);
    window.location = '/profile/?username=' + username;
  }
}



var profilebtn = document.getElementById("profile-btn")
var editprofilebtn = document.getElementById("edit-profile-btn")
var logoutbtn = document.getElementById("logout-btn")


logoutbtn.addEventListener("click", ()=>{

  logoutUser()
  window.location = "/login"

})

profilebtn.addEventListener("click", ()=>{
  window.location = "/profile"
})

editprofilebtn.addEventListener("click", ()=>{
  window.location = "/profile_creation"
})

