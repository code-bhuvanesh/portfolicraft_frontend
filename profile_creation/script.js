username_field = document.getElementById("username-field")
name_field = document.getElementById("name-field")
email_field = document.getElementById("email-field")
description_field = document.getElementById("description-field")
jobrole_field = document.getElementById("jobrole_field")
skills_field = document.getElementById("skills-field")

next_btn = document.getElementById("next-btn")
prev_btn = document.getElementById("prev-btn")

const tabs = document.querySelectorAll('.list-group-item[data-toggle="list"]');



var currentTab = getCurrentTab()
var currentTabIndex = 0
prev_btn.style.display = "none"

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (event) {
        currentTab = tabs[i].innerText
        switch(currentTab.toLowerCase()){
            case "general":
                console.log("tab is genral")
                prev_btn.style.display = "none"
                break
            case "education":
                showEducations()
                console.log("tab is education")
                prev_btn.style.display = "inline-block"
                break
            case "social links":
                console.log("tab is social links")
                prev_btn.style.display = "inline-block"
                break
            case "projects":
                showProjects()
                console.log("tab is social projects")
                prev_btn.style.display = "inline-block"
                break
            case "customization":
                console.log("tab is customization")
                prev_btn.style.display = "inline-block"
                break
        }
       
    });
}


function getCurrentTab() {
    
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].classList.contains('active')) {
        return tabs[i].innerText;
      }
    }
    return null; // No active tab found
}
console.log(next_btn)
next_btn.addEventListener("click", ()=>{
    console.log("next btn " + getCurrentTab())
    next_btn.innerText = "Next"
    switch(getCurrentTab().toLowerCase()){
        case "general":
            saveUserInfo()
            break
        case "education":
            console.log("tab is education")
            break
        case "social links":
            console.log("tab is social links")
            saveSocialLinks()
            break
        case "projects":
            console.log("tab is social projects")
            next_btn.innerText = "Save"
            break
        case "customization":
            console.log("tab is customization")
            break
    }
    nextTab()
})

function nextTab(){
    if(currentTabIndex < tabs.length -1){
        getProfileDataFromServer()
        currentTabIndex++;
        tabs[currentTabIndex].click()
    }
}

function prevTab(){
    next_btn.innerText = "Next"
    if(currentTabIndex > 0){
        getProfileDataFromServer()
        currentTabIndex--;
        currentTab = getCurrentTab();
        tabs[currentTabIndex].click()
    }
}

  

function onsaveChanges(){

    links = []

    for(linkfield in document.getElementsByClassName("link-field")){
        links.push(linkfield.value)
    }

}

function saveUserInfo(){
    skills = []

    s_index = 0
    e_index = 0
    for(s in skills_field.value){
        e_index++
        if(skills_field.value[s] == ","){
            skills.push((skills_field.value.substring(s_index,e_index-1)).trim())
            s_index = e_index
        }
    }
    skills.push(skills_field.value.substring(s_index).trim())

    //check if not null
    checkFieldErrors()

    var out = {}

    out["username"] = username_field.value;
    out["name"] = name_field.value;
    out["email"] = email_field.value;
    out["description"] = description_field.value;
    out["jobrole"] = jobrole_field.value;
    out["skills"] = skills;

    console.log("out : ")
    console.log(out)
    uploadToServer(out)
}


function saveSocialLinks(){
    var links = []
    var links_input = document.getElementsByClassName("link-field")
    for(link_field in links_input){
        if(links_input[link_field].value != null && links_input[link_field].value != "" ){
            links.push(links_input[link_field].value)
        }
    }
    console.log("socail links .....")
    console.log(links)

    sendPostRequest("addsociallinks", {"socialmedia" : links})
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

function listTOString(lists){
    out = ""
    for(i in lists){
        out += lists[i]
    }

    return out
}
   

function uploadToServer(body){
    var url = "createprofile"
    sendPostRequest(url, body);
}


var userdata  = {}
async function getProfileDataFromServer(){
    userdata = await sendGetRequest("profile", {"isowner" : true});
    setOldData()
}

function setOldData(){
    console.log(userdata)
    username_field.value = userdata["username"]
    name_field.value = userdata["name"]
    email_field.value = userdata["email"]
    jobrole_field.value = userdata["jobrole"]
    description_field.value = userdata["description"]
    skills_field.value = userdata["skills"]
    educations = userdata["educations"]
    projects = userdata["projects"]
    populateSocialLinks( userdata["socialmedia"]);
    
    
    showEducations();
    showProjects();

}

getProfileDataFromServer()



function populateSocialLinks(socialLinks) {
    const inputFields = document.querySelectorAll('.link-field');
    const websiteField = document.querySelector('.link-field[placeholder="https://yourwebsite.com/"]');
  
    socialLinks.forEach((link) => {
      if (link.includes('github')) {
        setInputValue('GitHub', link);
      } else if (link.includes('linkedin')) {
        setInputValue('LinkedIn', link);
      } else if (link.includes('instagram')) {
        setInputValue('Instagram', link);
      } else if (link.includes('twitter')) {
        setInputValue('Twitter', link);
      } else {
        // If the link doesn't match any specific social media, add it to the website field
        websiteField.value = link;
      }
    });
  
    function setInputValue(label, link) {
      inputFields.forEach((input) => {
        if (input.previousElementSibling && input.previousElementSibling.classList.contains('social-link-label')) {
          const inputLabel = input.previousElementSibling.textContent.toLowerCase();
          if (inputLabel.includes(label.toLowerCase())) {
            input.value = link;
          }
        }
      });
    }
  }
  
