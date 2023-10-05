const fadeButton = document.getElementById('fadeButton');
const animatedDiv = document.getElementById('animatedDiv');

fadeButton.addEventListener('click', () => {
  if (animatedDiv.classList.contains('hidden')) {
    animatedDiv.classList.remove('hidden');
    animatedDiv.classList.add('fade-in');
  } else {
    animatedDiv.classList.remove('fade-in');
    animatedDiv.classList.add('fade-out');
    
    // After the fade-out animation completes, hide the div
    animatedDiv.addEventListener('animationend', () => {
      animatedDiv.classList.add('hidden');
    }, { once: true });
  }
});
