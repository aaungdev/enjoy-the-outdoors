window.onload = function () {
  // Hamburger menu functionality
  const hamburger = document.getElementById('hamburgerMount');
  const navLinks = document.getElementById('navBarMount').getElementsByClassName('navLinks')[0];

  hamburger.onclick = function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
  };

  // Search bar functionality
  const searchIcon = document.getElementById("searchIconMount");
  const searchInput = document.getElementById("searchInputMount");

  searchIcon.onclick = function () {
      searchInput.classList.toggle("visible");
      if (searchInput.classList.contains("visible")) {
          searchInput.focus();
      }
  };

  document.onclick = function (event) {
      if (!searchIcon.contains(event.target) && !searchInput.contains(event.target)) {
          searchInput.classList.remove("visible");
      }
  };

  // Mountain search functionality
  const filterButton = document.getElementById('filterButtonMount');
  const nameDropdown = document.getElementById('locationMount');
  const searchButton = document.getElementById('searchButtonMount');
  const resultsContainer = document.getElementById('resultsContainerMount');
  const clearResultsButton = document.querySelector('.clearResultsButtonMount');
  const viewAllButton = document.querySelector('.viewAllButtonMount');

  // Initially hide dropdowns
  const filterDropdowns = document.querySelectorAll('.filterDropdownMountain');
  filterDropdowns.forEach(dropdown => {
      dropdown.style.display = 'none';
  });

  filterButton.onclick = function () {
      filterDropdowns.forEach(dropdown => {
          dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      });
  };

  // Populate dropdowns with mountain data
  mountainsArray.forEach(mountain => {
      const optionName = document.createElement('option');
      optionName.value = mountain.name;
      optionName.textContent = mountain.name;
      nameDropdown.appendChild(optionName);
  });

  // Search functionality
  searchButton.onclick = function () {
      const selectedName = nameDropdown.value;
      const searchTerm = document.getElementById('searchBarInputMount').value.toLowerCase();

      const filteredMountains = mountainsArray.filter(mountain => {
          const matchesName = selectedName ? mountain.name === selectedName : true;
          const matchesSearchTerm = mountain.name.toLowerCase().includes(searchTerm) ||
              mountain.desc.toLowerCase().includes(searchTerm);
          return matchesName && matchesSearchTerm;
      });

      displayResults(filteredMountains);
  };

  async function getSunsetForMountain(lat, lng) {
      let response = await fetch(
          `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
      );
      let data = await response.json();
      return data;
  }

  async function displayResults(mountains) {
      resultsContainer.innerHTML = ''; // Clear previous results

      if (mountains.length === 0) {
          resultsContainer.innerHTML = '<p>No mountains found.</p>';
          return;
      }

      mountains.forEach(async mountain => {
          const card = document.createElement('div');
          card.classList.add('mountainCard');

          const img = document.createElement('img');
          img.src = `images/${mountain.img}`;
          img.alt = mountain.name;

          const content = document.createElement('div');
          content.classList.add('mountainCardContent');

          const name = document.createElement('h3');
          name.textContent = mountain.name;

          const desc = document.createElement('p');
          desc.textContent = mountain.desc;

          const elevation = document.createElement('p');
          elevation.textContent = `Elevation: ${mountain.elevation} ft`;

          const sunsetInfo = document.createElement('p');
          const sunsetData = await getSunsetForMountain(mountain.coords.lat, mountain.coords.lng);
          sunsetInfo.textContent = `Sunset: ${sunsetData.results.sunset} UTC`;

          content.appendChild(name);
          content.appendChild(desc);
          content.appendChild(elevation);
          content.appendChild(sunsetInfo);

          card.appendChild(img);
          card.appendChild(content);

          resultsContainer.appendChild(card);
      });
  }

  clearResultsButton.onclick = function () {
      resultsContainer.innerHTML = ''; // Clear results
      nameDropdown.value = '';
      searchInput.value = '';
  };

  viewAllButton.onclick = function () {
      displayResults(mountainsArray);
  };
};
