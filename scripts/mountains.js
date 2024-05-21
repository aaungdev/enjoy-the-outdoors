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
  const elevationDropdown = document.getElementById('typeMount');
  const searchButton = document.getElementById('searchButtonMount');
  const resultsContainer = document.getElementById('resultsContainerMount');
  const resultsTitle = document.createElement('div');
  resultsTitle.className = 'resultsTitleMount';
  resultsContainer.appendChild(resultsTitle);

  const clearResultsButton = document.createElement('button');
  clearResultsButton.className = 'clearResultsButtonMount';
  clearResultsButton.textContent = 'Clear Results';
  resultsTitle.appendChild(clearResultsButton);

  const viewAllButton = document.createElement('button');
  viewAllButton.className = 'viewAllButtonMount';
  viewAllButton.textContent = 'View All';
  resultsTitle.appendChild(viewAllButton);

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

      const optionElevation = document.createElement('option');
      optionElevation.value = mountain.elevation;
      optionElevation.textContent = `${mountain.elevation} ft`;
      elevationDropdown.appendChild(optionElevation);
  });

  // Search functionality
  searchButton.onclick = function () {
      const selectedName = nameDropdown.value;
      const selectedElevation = elevationDropdown.value;
      const searchTerm = document.getElementById('searchBarInputMount').value.toLowerCase();

      const filteredMountains = mountainsArray.filter(mountain => {
          const matchesName = selectedName ? mountain.name === selectedName : true;
          const matchesElevation = selectedElevation ? mountain.elevation.toString() === selectedElevation : true;
          const matchesSearchTerm = mountain.name.toLowerCase().includes(searchTerm) ||
              mountain.desc.toLowerCase().includes(searchTerm);
          return matchesName && matchesElevation && matchesSearchTerm;
      });

      displayResults(filteredMountains);
  };

  function displayResults(mountains) {
      resultsContainer.innerHTML = ''; // Clear previous results

      if (mountains.length === 0) {
          resultsContainer.innerHTML = '<p>No mountains found.</p>';
          return;
      }

      const header = document.createElement('div');
      header.classList.add('resultHeaderMount');
      header.innerHTML = `<div>${mountains.length} Mountains Found</div>`;
      resultsContainer.appendChild(header);
      resultsContainer.appendChild(resultsTitle); // Append the results title (clear and view all buttons)

      mountains.forEach(mountain => {
          const card = document.createElement('div');
          card.classList.add('mountainCard');

          const img = document.createElement('img');
          img.src = `images-custom/${mountain.img}`;
          img.alt = mountain.name;

          const name = document.createElement('h3');
          name.textContent = mountain.name;

          const desc = document.createElement('p');
          desc.textContent = mountain.desc;

          const elevation = document.createElement('p');
          elevation.textContent = `Elevation: ${mountain.elevation} ft`;

          card.appendChild(img);
          card.appendChild(name);
          card.appendChild(desc);
          card.appendChild(elevation);

          resultsContainer.appendChild(card);
      });
  }

  clearResultsButton.onclick = function () {
      resultsContainer.innerHTML = ''; // Clear results
      nameDropdown.value = '';
      elevationDropdown.value = '';
      searchInput.value = '';
  };

  viewAllButton.onclick = function () {
      displayResults(mountainsArray); // Display all mountains
  };
};
