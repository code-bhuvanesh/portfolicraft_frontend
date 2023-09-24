const urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get("username")
console.log(username)


var usernamefield = document.getElementById("username")
var jobrolefield = document.getElementById("jobrole")


sendGetRequest("profile", {"username" : username}).then(response => {
    console.log("re " + response["jobrole"])
    usernamefield.innerHTML = response["name"]
    jobrolefield.innerHTML = response["jobrole"]
})

