function onsaveChanges(){
    username_field = document.getElementById("username-field")
    name_field = document.getElementById("name-field")
    email_field = document.getElementById("email-field")
    description_field = document.getElementById("description-field")
    jobrole_field = document.getElementById("jobrole_field")
    skills_field = document.getElementById("skills-field")

    skills = []

    s_index = 0
    e_index = 0
    for(s in skills_field.value){
        e_index++
        if(skills_field.value[s] == ","){
            skills.push((skills_field.value.substring(s_index,e_index)).trim())
            s_index = e_index
        }
    }
    skills.push(skills_field.value.substring(s_index).trim())

    links = []

    for(linkfield in document.getElementsByClassName("link-field")){
        links.push(linkfield.value)
    }

    //check if not null
    checkFieldErrors()

    var out = {}

    out["username"] = username_field.value;
    out["name"] = name_field.value;
    out["email"] = email_field.value;
    out["description"] = description_field.value;
    out["jobrole"] = jobrole_field.value;
    out["skills"] = skills;
    // out["educations"] = educations;
    // out["projects"] = projects;
    // out["username"] = usernamefield.value;
    // out["username"] = usernamefield.value;
    // out["username"] = usernamefield.value;

    console.log("out : ")
    console.log(out)
    uploadToServer(out)
}
function checkFieldErrors() {
  
    createErrorMsg("!enter a username", username_field)
    createErrorMsg("!enter your name", name_field)
    createErrorMsg("!enter a valid email", email_field)
    createErrorMsg("!enter some description about you", description_field)
    createErrorMsg("!enter your date of birth", jobrole_field)
    createErrorMsg("!enter atleast one skill", skills_field)
    
    
}

function createErrorMsg(msg, inputfield) {
    var fieldParent = inputfield.parentElement
    if (inputfield.value == "") {
        if (!fieldParent.querySelector('.error-text')) {
            var newele = document.createElement("div")
            var errormsg = document.createElement("label")
            errormsg.className = "error-text"
            errormsg.textContent = msg
            newele.appendChild(errormsg)
        
            fieldParent.insertBefore(newele, inputfield)
        }
    }
}
   

function uploadToServer(body){
    var url = "createprofile"
    sendPostRequest(url, body);
}