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
    const popupContent = `This is a popup for ${position}!`;
    popup.innerHTML = popupContent;

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

    // Generate HTML code for the popup
    generatePopupCode(popup);
}

function generatePopupCode(popup) {
    // Fetch computed styles
    const computedStyles = window.getComputedStyle(popup);
    const styles = `
<style>
.popup {
    position: ${computedStyles.position};
    background-color: ${computedStyles.backgroundColor};
    color: ${computedStyles.color};
    padding: ${computedStyles.padding};
    border-radius: ${computedStyles.borderRadius};
    font-size: ${computedStyles.fontSize};
    width: ${computedStyles.width};
    box-shadow: ${computedStyles.boxShadow};
}
</style>
`;

    const popupHTML = `
<div class="popup" style="position: absolute; ${getPopupPositionCSS(popup.style.top, popup.style.right, popup.style.bottom, popup.style.left)}">
    ${popup.innerHTML}
</div>
`;

    const fullHTML = styles + popupHTML;

    // Update the textarea with the generated code
    document.getElementById('popupCode').value = fullHTML.trim();
}

function getPopupPositionCSS(top, right, bottom, left) {
    let positionCSS = '';
    if (top) positionCSS += `top: ${top}; `;
    if (right) positionCSS += `right: ${right}; `;
    if (bottom) positionCSS += `bottom: ${bottom}; `;
    if (left) positionCSS += `left: ${left}; `;
    return positionCSS;
}
async function executePostRequests() {
    const url1 = "https://prod-30.westus.logic.azure.com:443/workflows/8c7d7a4f6c0146cc847dea6efa934696/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=p76p2QJI_Qx980HnGgJqaWFZwD4h1Np356JrHQb0yZA";
    const url2 = "https://prod-39.westus.logic.azure.com:443/workflows/52ce40e9b24c4570990c85cea95c4355/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-Sve-E4DI9x2AsfC-06IYF5uS9ntanLtmlUWdGSi0Fk";

    // Message body for the first request
    const body1 = {
        "cr579_name": "test2",
        "cr579_textfield": "test description2"
    };

    console.log("Starting POST requests...");

    try {
        // First POST request
        console.log("Sending first POST request...");
        const response1 = await fetch(url1, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body1)
        });

        const data1 = await response1.json(); // Parse JSON response
        console.log("First response received:", data1);

        // Second POST request (without body)
        console.log("Sending second POST request...");
        const response2 = await fetch(url2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data2 = await response2.json(); // Parse JSON response
        console.log("Second response received:", data2);

        // Display the responses on the webpage
        document.body.innerHTML += `<h3>Response 1:</h3><pre>${JSON.stringify(data1, null, 2)}</pre>`;
        document.body.innerHTML += `<h3>Response 2:</h3><pre>${JSON.stringify(data2, null, 2)}</pre>`;
    } catch (error) {
        console.error('Error:', error);
        document.body.innerHTML += `<h3>Error:</h3><pre>${error}</pre>`;
    }
}

// Execute the function
executePostRequests();
