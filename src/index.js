document.addEventListener('DOMContentLoaded', function () {
    // Fetch images on page load
    fetch('https://dog.ceo/api/breeds/image/random/4')
      .then(response => response.json())
      .then(data => {
        // Get the array of images from the response
        const images = data.message;
  
        // Get the dog image container element
        const dogImageContainer = document.getElementById('dog-image-container');
  
        // Add image elements to the DOM for each image in the array
        images.forEach(imageUrl => {
          const imgElement = document.createElement('img');
          imgElement.src = imageUrl;
          dogImageContainer.appendChild(imgElement);
        });
      });
  
    // Fetch all dog breeds on page load
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => response.json())
      .then(data => {
        // Get the breeds object from the response
        const breedsObject = data.message;
  
        // Get the dog breeds ul element
        const dogBreedsUl = document.getElementById('dog-breeds');
  
        // Add breeds to the page in the <ul>
        for (const breed in breedsObject) {
          // Create li element for each breed
          const liElement = document.createElement('li');
          liElement.textContent = breed;
  
          // If the breed has sub-breeds, add them as well
          if (breedsObject[breed].length > 0) {
            const subBreedsUl = document.createElement('ul');
            breedsObject[breed].forEach(subBreed => {
              const subLiElement = document.createElement('li');
              subLiElement.textContent = `${subBreed} ${breed}`;
              subBreedsUl.appendChild(subLiElement);
            });
            liElement.appendChild(subBreedsUl);
          }
  
          // Add click event listener to change font color to red
          liElement.addEventListener('click', function () {
            // Reset color for all <li> elements
            const allLiElements = document.querySelectorAll('#dog-breeds li');
            allLiElements.forEach(element => {
              element.style.color = '';
            });
  
            // Change color only for the clicked <li> element
            liElement.style.color = 'red';
          });
  
          // Append the li element to the ul
          dogBreedsUl.appendChild(liElement);
        }
  
        // Add change event listener to the breed dropdown for filtering
        const breedDropdown = document.getElementById('breed-dropdown');
        breedDropdown.addEventListener('change', function () {
          const selectedLetter = breedDropdown.value.toLowerCase();
          filterBreedsByLetter(selectedLetter);
        });
      });
  
    // Function to filter breeds by starting letter
    function filterBreedsByLetter(letter) {
      const allLiElements = document.querySelectorAll('#dog-breeds li');
      allLiElements.forEach(element => {
        const breedName = element.textContent.toLowerCase();
        if (breedName.startsWith(letter)) {
          element.style.display = ''; // Show the matching breed
        } else {
          element.style.display = 'none'; // Hide non-matching breeds
        }
      });
    }
  
    // You can add more functionality here as needed
  });
  