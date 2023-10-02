const urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get("username")
console.log(username)


var usernamefield = document.getElementById("username")
var jobrolefield = document.getElementById("jobrole")
var aboutmefield = document.getElementById("aboutmefield")
var skillsfield = document.getElementById("user-skills")
var educationfield = document.getElementById("user-education")

var projectContainer = document.getElementById("project-container")


function projectItem(projectname,){
    return `<div id="card-container" class="card-container">
    <div class= "card details-container color-container">
    <div class="article-container">
      <img
        src="./assets/project-3.png"
        alt="Project 3"
        class="project-img"
      />
    </div>
    <h2 class="experience-sub-title project-title">${projectname}</h2>
    <div class="btn-container">
      <button
        class="btn btn-color-2 project-btn"
        onclick="location.href='https://github.com/'"
      >
        Github
      </button>
      <button
        class="btn btn-color-2 project-btn"
        onclick="location.href='https://github.com/'"
      >
        Live Demo
      </button>
    </div>
  </div>
    </div>`
}



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

    console.log("pro : " + response["projects"])

    for(i in response["projects"]){
        var project = response["projects"][i]
        console.log(project)
        console.log(projectContainer.children[0].className)
        projectContainer.children[0].innerHTML += projectItem(project.projectname)
        // projectContainer.innerHTML += projectItem(project.projectname)
    }
    projectsSlider()

})



//animation


function fadeIn (item, delay) {
    setTimeout(() => {
    item.classList.add('fadein')
    }, delay)
}


function projectsSlider(){

  const slider = document.querySelector('.slider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const cardWidth = document.querySelector('.card-container').offsetWidth / 1.0//left and right margin
  console.log("offset : " + cardWidth)
  
  let currentIndex = 0;
  
  // Function to move the slider to the specified index
  function moveToIndex(index) {
      if (index < 0) {
          index = 0;
      } else if (index >= slider.children.length - 2) {
          index = slider.children.length - 3;
      }
      currentIndex = index;
      const translateX = -index * cardWidth;
      slider.style.transform = `translateX(${translateX}px)`;
  }
  
  // Event listener for the "Next" button
  nextBtn.addEventListener('click', () => {
      moveToIndex(currentIndex + 1);
      console.log("next btn pressed" );
    });
    
    // Event listener for the "Previous" button
    prevBtn.addEventListener('click', () => {
      moveToIndex(currentIndex - 1);
      console.log("prev btn pressed" );
  });
  
  // Initial positioning of the slider
  moveToIndex(currentIndex);
  
}
