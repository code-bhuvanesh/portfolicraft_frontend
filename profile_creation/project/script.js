const addproject = document.getElementById("add-project-btn");
const popupBoxProject = document.querySelector(".popup-box-project");
const popupTitleProject = popupBoxProject.querySelector(".title");
const closeIconProject = popupBoxProject.querySelector(".popup-close");
var addBtnProject = popupBoxProject.querySelector(".add-proj");
var projImag = popupBoxProject.querySelector(".proj-image");
var projName = popupBoxProject.querySelector(".proj-name");
var projLink = popupBoxProject.querySelector(".proj-github");
var projDesc = popupBoxProject.querySelector(".proj-desc");

addproject.addEventListener("click", () => {
  console.log("add project btn pressed")
  popupBoxProject.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
});

closeIconProject.addEventListener("click", () => {
    console.log("close popup")
    isUpdate = false;
    // degreeField.value = descField.value = startyearField.value = endyearField.value = "";
    popupBoxProject.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

var projects = [
  // {
  //   "projectname": "Expense Tracker",
  //   "projectimages": ["../assets/project-3.png"],
  //   "projectdesc": "A mobile app for tracking daily expenses effortlessly.",
  //   "projectlinks": ["github.com/user/expensetracker", "example.com/expensetrackerdemo"]
  // },
  // {
  //   "projectname": "Expense Tracker",
  //   "projectimages": ["../assets/project_placeholder.jpg"],
  //   "projectdesc": "A mobile app for tracking daily expenses effortlessly.",
  //   "projectlinks": ["github.com/user/expensetracker", "example.com/expensetrackerdemo"]
  // },
  // {
  //   "projectname": "Expense Tracker",
  //   "projectimages": ["../assets/project_placeholder.jpg"],
  //   "projectdesc": "A mobile app for tracking daily expenses effortlessly.",
  //   "projectlinks": ["github.com/user/expensetracker", "example.com/expensetrackerdemo"]
  // },
  // {
  //   "projectname": "Expense Tracker",
  //   "projectimages": ["../assets/project_placeholder.jpg"],
  //   "projectdesc": "A mobile app for tracking daily expenses effortlessly.",
  //   "projectlinks": ["github.com/user/expensetracker", "example.com/expensetrackerdemo"]
  // },
  // {
  //   "projectname": "Expense Tracker",
  //   "projectimages": ["../assets/project_placeholder.jpg"],
  //   "projectdesc": "A mobile app for tracking daily expenses effortlessly.",
  //   "projectlinks": ["github.com/user/expensetracker", "example.com/expensetrackerdemo"]
  // },
  // {
  //   "projectname": "Expense Tracker",
  //   "projectimages": ["../assets/project_placeholder.jpg"],
  //   "projectdesc": "A mobile app for tracking daily expenses effortlessly.",
  //   "projectlinks": ["github.com/user/expensetracker", "example.com/expensetrackerdemo"]
  // },
  // {
  //   "projectname": "Expense Tracker",
  //   "projectimages": ["../assets/project_placeholder.jpg"],
  //   "projectdesc": "A mobile app for tracking daily expenses effortlessly.",
  //   "projectlinks": ["github.com/user/expensetracker", "example.com/expensetrackerdemo"]
  // },
]

showProjects()

addBtnProject.addEventListener('click', () => {
  console.log(projImag)
  if(projImag || projName || projLink || projDesc){
    var newProj = {}
    newProj["projectname"] = [projName.value]
    newProj["projectimages"] = [`${currImgId}`]
    newProj["projectdesc"] = projDesc.value
    newProj["projectlinks"] = [projLink.value]
    projects.push(newProj)
    showProjects()
    // closeIconProject.click()
  }
})

var imgdata = {}


function showProjects(){
  var pc = document.getElementById("project-con")
  pc.innerHTML = ""
  for(var i in projects){
      var porj = projects[i]
      pc.innerHTML += ` <div class="project-card">
      <div class="proj-delete">
        <img src="../assets/delete_icon.png">
      </div>
      <div class="article-container">
        <img
          src="${imgdata[porj["projectimages"][0]]}"
          class="project-img"
        />
      </div>
      <h2 class="project-title">${porj["projectname"]}</h2>
      <div class="btn-container">
        <button
          class="project-btn"
          onclick="location.href='${porj["projectlinks"][0]}'"
        ><img src="../assets/github.png" class="icon-image">
          GitHub
        </button>
        <div class="description">
        ${porj["projectdesc"]}
      </div>
      </div>
      </div>`
  }

}


const imageInput = document.getElementById("imageInput");
const selectedImage = document.getElementById("selectedImage");

var currImgId = 0;

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
          selectedImage.src = img.src;
          selectedImage.style.display = "block";
          document.getElementById("img-label").style.display = "none";
      };
    };

    reader.readAsDataURL(file);

    //saving it to upload for django server
    const formdata = new FormData()
    formdata.append(`${currImgId}`, file)
    imgdata[`${currImgId}`] = file
  }
});