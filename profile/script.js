const urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get("username")
console.log(username)


var usernamefield = document.getElementById("username")
var jobrolefield = document.getElementById("jobrole")
var aboutmefield = document.getElementById("aboutmefield")
var skillsfield = document.getElementById("user-skills")
var educationfield = document.getElementById("user-education")



sendGetRequest("profile", {"username" : username}).then(response => {
    console.log("re " + response["jobrole"])
    usernamefield.innerHTML = response["name"]
    jobrolefield.innerHTML = response["jobrole"]
    aboutmefield.innerHTML = response["description"]

    console.log(response["skills"][0])
    for(i in response["skills"]){
        skillsfield.innerHTML += `<li class="fade-item1" style=" transition: 2s all ease-in-out; opacity: 0;" >${response["skills"][i]}</li>`
    }
    var items = document.getElementsByClassName("fade-item1");
    for (let i = 0; i < items.length; ++i) {
    fadeIn(items[i], i * 200)
    }

    for(i in response["educations"]){
        education = response["educations"][i]
        educationfield.innerHTML += `<li  class="fade-item2" style=" transition: 2s all ease-in-out; opacity: 0;" >${education["degree"]} 
                                        <div>${education["institution"]}</div>
                                        <div>${education["startYear"]}-${education["endYear"]}</div>
                                    </li>`
    }

    var items = document.getElementsByClassName("fade-item2");
    for (let i = 0; i < items.length; ++i) {
    fadeIn(items[i], i * 200)
    }

})



//animation


function fadeIn (item, delay) {
    setTimeout(() => {
    item.classList.add('fadein')
    }, delay)
}
