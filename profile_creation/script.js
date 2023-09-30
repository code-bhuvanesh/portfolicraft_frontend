function toggleReadMore() {
    var hiddenContent = document.querySelector('.hidden-content');
    var readMoreButton = document.getElementById('read-more-button');

    if (hiddenContent.style.display === 'none') {
        hiddenContent.style.display = 'block';
        readMoreButton.textContent = 'Add Less';
    } else {
        hiddenContent.style.display = 'none';
        readMoreButton.textContent = 'Add More';
    }
}

