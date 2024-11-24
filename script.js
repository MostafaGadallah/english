let translations = [];

// Function to retrieve translations from Local Storage
function loadTranslations() {
    const storedTranslations = localStorage.getItem('translations');
    if (storedTranslations) {
        try {
            translations = JSON.parse(storedTranslations);
        } catch (e) {
            console.error("Error parsing translations from Local Storage:", e);
            translations = [];
        }
    }
}

// Load translations when the script runs
loadTranslations();


document.addEventListener(
  "keydown",
  (event) => {
    const keyName = event.key;

    if (keyName === "ArrowRight") {
      // do not alert when only Control key is pressed.
      showRandomCard();
      return;
    }
    if (keyName === "ArrowUp") {
      // do not alert when only Control key is pressed.
      document.querySelector('.card-inner').classList.toggle('flipped');
      return;
    }
        if (keyName === "Enter") {
      // do not alert when only Control key is pressed.
const word = document.getElementById('wordInput').value.trim();
    const translation = document.getElementById('translationInput').value.trim();
    
    // Check if both inputs are filled
    if (word && translation) {
        // Add the translation to the array
        translations.push({ word, translation });
        // Save to Local Storage
        localStorage.setItem('translations', JSON.stringify(translations));
        clearInputs();
        document.getElementById('nextButton').style.display = 'block'; // Show "Next Word" button
    }
      return;
    }
  },
  false,
);


// Add event listener to the "Add Translation" button
document.getElementById('addButton').addEventListener('click', function() {
    const word = document.getElementById('wordInput').value.trim();
    const translation = document.getElementById('translationInput').value.trim();
    
    // Check if both inputs are filled
    if (word && translation) {
        // Add the translation to the array
        translations.push({ word, translation });
        // Save to Local Storage
        localStorage.setItem('translations', JSON.stringify(translations));
        clearInputs();
        document.getElementById('nextButton').style.display = 'block'; // Show "Next Word" button
    } else {
        alert('Please enter both the word and its translation.');
    }
});

// Function to clear the input fields
function clearInputs() {
    document.getElementById('wordInput').value = '';
    document.getElementById('translationInput').value = '';
}

// Function to show a random card
function showRandomCard() {
    if (translations.length > 0) {
        const randomIndex = Math.floor(Math.random() * translations.length);
        const translation = translations[randomIndex];

        const cardContainer = document.getElementById('cardContainer');
        cardContainer.innerHTML = `
            <div class="card" onclick="this.querySelector('.card-inner').classList.toggle('flipped')">
                <div class="card-inner">
                    <div class="card-front">${translation.word}</div>
                    <div class="card-back">${translation.translation}</div>
                </div>
            </div>
        `;
        cardContainer.style.display = 'block'; // Show the card container
    } else {
        alert('No translations available. Please add some.');
    }
}

// Event listener for the "Next Word" button
document.getElementById('nextButton').addEventListener('click', function() {
    showRandomCard();
});

// Initial setup: Hide the "Next Word" button if no translations are loaded
if (translations.length === 0) {
    document.getElementById('nextButton').style.display = 'none';
} else {
    document.getElementById('nextButton').style.display = 'block';
}


// Function to add multiple translations at once
function addBulkTranslations(jsonString) {
    try {
        const newTranslations = JSON.parse(jsonString); // Parse the JSON string
        if (Array.isArray(newTranslations)) {
            // Merge with existing translations
            translations = [...translations, ...newTranslations];
            // Save to Local Storage
            localStorage.setItem('translations', JSON.stringify(translations));
            alert('Bulk translations added successfully!');
        } else {
            alert('Invalid JSON format. Please provide an array of {word, translation} objects.');
        }
    } catch (e) {
        console.error("Error parsing bulk translations JSON:", e);
        alert('Error parsing JSON. Please check the format.');
    }
}
 
document.getElementById('bulkAddButton').addEventListener('click', function() {
    const bulkInput = document.getElementById('bulkInput').value.trim();
    if (bulkInput) {
        document.getElementById("bulkInput").value="";
        addBulkTranslations(bulkInput);
    } else {
        alert('Please enter a JSON string.');
    }
});
