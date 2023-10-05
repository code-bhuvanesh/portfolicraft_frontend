const slider = document.querySelector('.slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cardWidth = document.querySelector('.card').offsetWidth;

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
});

// Initial positioning of the slider
moveToIndex(currentIndex);
