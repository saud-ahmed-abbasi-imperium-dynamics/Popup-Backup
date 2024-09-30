function showPopup(position) {
    // Remove any existing popups
    const existingPopup = document.querySelector('.popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Create a new popup
    const popup = document.createElement('div');
    popup.classList.add('popup');
    
    // Set the content of the popup
    popup.innerHTML = `This is a popup for ${position}!`;

    // Append the popup to the boundary box
    const boundaryBox = document.querySelector('.boundary-box');
    boundaryBox.appendChild(popup);

    // Position the popup based on the selected option
    switch (position) {
        case 'top-right':
            popup.style.top = '10px';
            popup.style.right = '10px';
            break;
        case 'middle':
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            break;
        case 'bottom-left':
            popup.style.bottom = '10px';
            popup.style.left = '10px';
            break;
    }
    
    // Show the popup
    popup.style.display = 'block';
}
