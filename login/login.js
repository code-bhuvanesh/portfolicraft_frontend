const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


const signinBtn = document.getElementById("signinbtn");
const signupBtn = document.getElementById("signupbtn");
signinBtn.addEventListener('click', () => signin())
signupBtn.addEventListener('click', () => signup())


async function signin(){
    var email = document.getElementById("signin-emailfield").value;
    var password = document.getElementById("signin-passwordfield").value;
    var data = {
        "email" : email,
        "password" : password
    };
    // const data = {
    //     "username": "user123",
    //     "password": "secretpassword"
    //   };
    console.log(JSON.stringify(data));
    sendPostRequest("login", data).then(responsedata => {
        if(responsedata != null){
            console.log("body");
            console.log(responsedata);
            storeAccessToken(responsedata.access);
            storeRefreshToken(responsedata.refresh);
            window,location = "http://127.0.0.1:5501/"
        }
        else{
            console.log("null");
        }
    });
}

async function test(tokenMap){
  sendPostRequest("test", {}, tokenMap["access"]).then(responseData => {
    console.log(responseData);
  })
}


async function signup(){
    var username = document.getElementById("signup-usernamefield").value;
    var email = document.getElementById("signup-emailfield").value;
    var password = document.getElementById("signup-passwordfield").value;
    const data = {
        "email" : email,
        "username": username,
        "password": password
      };
    console.log(JSON.stringify(data));
    SendSignUpRequest("signup", data).then(responsedata => {
        if(responsedata != null){
            console.log("body");
            console.log(responsedata);
            storeAccessToken(responsedata.access);
            storeRefreshToken(responsedata.refresh);
            console.log("acess token")
            console.log(getToken("accesstoken"))
            // window.location = "../profile_creation"

        }
        else{
            console.log("null");
        }
    });
}


