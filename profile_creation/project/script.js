const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
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


var pc = document.getElementById("project-con")


for(var i =0; i < 10; i++){
    console.log(pc)
    pc.innerHTML += ` <div class="card">
    <div class="article-container">
      <img
        src="../assets/project-2.png"
        alt="Project 2"
        class="project-img"
      />
    </div>
    <h2 class="project-title">Project ${i+1}</h2>
    <div class="btn-container">
      <button
        class="project-btn"
        onclick="location.href='https://github.com/'"
      ><img src="../assets/giticon.png" alt="Github" class="icon-image">
        GitHub
      </button>
      <button
        class="btn btn-color-2 project-btn"
        onclick="location.href='https://github.com/'"
      >  <i class="fas fa-search button-icon"></i>
        Live Demo
      </button>
      <div class="description">
        This is a long description that will be truncated if it overflows the container.
    </div>
    </div>
</div>`
}