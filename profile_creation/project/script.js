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

addBtnProject.addEventListener('click', async () => {
  const formData = new FormData();
  if(projImag || projName || projLink || projDesc){

    formData.append('projectimages', imgdata);
    formData.append('projectname', projName.value);
    formData.append('projectdesc', projDesc.value);
    formData.append('projectlinks', projLink.value);

    await sendFormData("addprojects",formData) 
    getProfileDataFromServer()
    showProjects()
    closeIconProject.click()
  }
})

var imgdata = null


function showProjects(){
  var pc = document.getElementById("project-con")
  pc.innerHTML = ""
  console.log("projects " + projects)
  for(var i in projects){
      var porj = projects[i]
      pc.innerHTML += ` <div class="project-card">
      <div class="proj-delete">
        <img src="../assets/delete_icon.png">
      </div>
      <div class="article-container">
        <img
          src="${porj["projectimages"]}"
          class="project-img"
        />
      </div>
      <h2 class="project-title">${porj["projectname"]}</h2>
      <div class="btn-container">
        <button
          class="project-btn"
          onclick="location.href='${porj["projectlinks"]}'"
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


imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    imgdata = file
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

  }
});