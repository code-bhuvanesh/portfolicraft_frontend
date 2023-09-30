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