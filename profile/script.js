const urlParams = new URLSearchParams(window.location.search);
const editprofilebtn = document.getElementById("edit-profile-btn")
var username = urlParams.get("username")
console.log(username)

var reqestdata = {}
if(username != null){
  reqestdata["username"] = username;
  editprofilebtn.style.display = "none"
}
else{
  editprofilebtn.style.display = "block"
  reqestdata["isowner"] = true;
}

editprofilebtn.addEventListener("click", ()=>{
  window.location = "../profile_creation"
})


var usernamefield = document.getElementById("username")
var jobrolefield = document.getElementById("jobrole")
var aboutmefield = document.getElementById("aboutmefield")
var skillsfield = document.getElementById("user-skills")
var educationfield = document.getElementById("user-education")

var projectContainer = document.getElementById("project-container")
var blogContainer = document.getElementById("blog-container")


var contactgmail = document.getElementById("contact-gmail")


function projectItem(projectname,imgurl){
    return `<div id="card-container" class="card-container">
    <div class= "card details-container color-container">
    <div class="article-container">
      <img
        src="${imgurl}"
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

function blogItem(blgname,imgurl, blogDesc){
    return `<div id="card-container" class="card-container">
    <div class= "card details-container color-container">
    <div class="article-container">
      <img
        src="${imgurl}"
        alt="Project 3"
        class="project-img"
      />
    </div>
    <h2 class="experience-sub-title project-title">${blgname}</h2>
    <div class="btn-container">
      <p>${blogDesc}</p>
    </div>
  </div>
    </div>`
}


console.log( reqestdata)


sendGetRequest("profile", reqestdata).then(response => {
    console.log("re " + response["jobrole"])
    usernamefield.innerHTML = response["name"]
    jobrolefield.innerHTML = response["jobrole"]
    aboutmefield.innerHTML = response["description"]
    contactgmail.innerHTML = response["email"]
    contactgmail.href = "mailto:" + response["email"]


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
        projectContainer.children[0].innerHTML += projectItem(project.projectname, project.projectimages)
        // projectContainer.innerHTML += projectItem(project.projectname)
    }
    projectsSlider()

    for(i in blogs){
      blogContainer.children[0].innerHTML += blogItem(`blog ${i}`,"https://storage.googleapis.com/gweb-uniblog-publish-prod/images/KeyImage-Static.width-1000.format-webp.webp" , "this is the content of the blog")
      // projectContainer.innerHTML += projectItem(project.projectname)
    }
    blogSlider()

})

var blogs = ["", "", "", "","", "", "", ""]

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

function blogSlider(){
  const blogSection = document.getElementById("blogs")
  const slider = blogSection.querySelector('.slider');
  const prevBtn = document.getElementById('prevBtn-blog');
  const nextBtn = document.getElementById('nextBtn-blog');
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

var websites = {}

function populateSocialLinks(socialLinks) {
  const inputFields = document.querySelectorAll('.link-field');
  const websiteField = document.querySelector('.link-field[placeholder="https://yourwebsite.com/"]');

  socialLinks.forEach((link) => {
    if (link.includes('github')) {
      websites['GitHub'] = link;
    } else if (link.includes('linkedin')) {
      websites['LinkedIn'] = link;
    } else if (link.includes('instagram')) {
      websites['Instagram'] = link;
    } else if (link.includes('twitter')) {
      websites['Twitter'] = link;
    } else {
      // If the link doesn't match any specific social media, add it to the website field
      websites["your"] = link;
    }
  });

}

