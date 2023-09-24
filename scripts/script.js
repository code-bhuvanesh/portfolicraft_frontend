const testbtn = document.getElementById("test");
testbtn.addEventListener('click', ()=>{
  console.log("test pressed")
  sendPostRequest("test");
});