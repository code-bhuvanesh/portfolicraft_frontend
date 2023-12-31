const addBox = document.querySelector(".add-edu-btn");
const popupBox = document.querySelector(".popup-box-education");
const popupTitle = popupBox.querySelector(".title");
const closeIcon = popupBox.querySelector(".popup-close");
var degreeField = popupBox.querySelector(".degree");
var descField = popupBox.querySelector(".desc");
var startyearField = popupBox.querySelector(".startyear");
var endyearField = popupBox.querySelector(".endyear");
var addBtn = popupBox.querySelector(".add-edu");
var educontainer = document.getElementById("education-container");

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

addBox.addEventListener("click", () => {
    popupTitle.innerText = "Add Education";
    addBtn.innerText = "Add";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    degreeField.focus();
});



closeIcon.addEventListener("click", () => {
    console.log("close popup")
    isUpdate = false;
    degreeField.value = descField.value = startyearField.value = endyearField.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

var educations = []

function showEducations() {
    educontainer.innerHTML = ""
    for(e in educations){
     var edu = educations[e]
     var sy = edu["startYear"]
     var ey = edu["endYear"]
     var outyear = ""
     if(sy == 0){
        outyear = "-"
     }
     else if(ey == 0){
        outyear = sy + "-"
     }
     else{
        outyear = sy + "-" + ey
     }
     educontainer.innerHTML += `
     <div class="edu-item">
         <div class="edu-item-details">
             <div class="edu-degree">${edu["degree"]}</div>
             <div class="edu-insti">${edu["institution"]}</div>
             <div class="edu-year">${outyear}</div>
         </div>
         <div class="edu-delete"><img src="../assets/delete_icon.png"></div>
     </div>
      `
    }
}



addBtn.addEventListener("click", async e => {
    e.preventDefault();
    let degree = degreeField.value.trim();
    console.log("degree : " + degree)
    let insti = descField.value.trim();
    let syear = startyearField.value.trim();
    let eyear = endyearField.value.trim();

    if(degree || insti || syear || eyear) {
        var newedu = {
            "institution" : insti,
            "degree" : degree,
            "startyear" : syear,
            "endyear" : eyear
        }
        console.log("newedu")
        console.log(newedu)
        await sendPostRequest("addeducation", { "educations": [newedu]})
        getProfileDataFromServer()
        closeIcon.click();
    }
});

