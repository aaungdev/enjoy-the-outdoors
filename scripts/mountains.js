"use strict";

window.onload = function () {
  setupHamburgerMenu();
  setupSearchBar();
  setupMountainSearch();
  setupBackgroundMusic();
};

function setupHamburgerMenu() {
  const hamburger = document.getElementById("hamburgerMount");
  const navLinks = document
    .getElementById("navBarMount")
    .getElementsByClassName("navLinks")[0];

  hamburger.onclick = function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  };
}

function setupSearchBar() {
  const searchIcon = document.getElementById("searchIconMount");
  const searchInput = document.getElementById("searchInputMount");

  searchIcon.onclick = function () {
    searchInput.classList.toggle("visible");
    if (searchInput.classList.contains("visible")) {
      searchInput.focus();
    }
  };

  document.onclick = function (event) {
    if (
      !searchIcon.contains(event.target) &&
      !searchInput.contains(event.target)
    ) {
      searchInput.classList.remove("visible");
    }
  };
}

function setupMountainSearch() {
  const filterButton = document.getElementById("filterButtonMount");
  const filterDropdowns = document.querySelectorAll(".filterDropdownMountain");
  const searchButton = document.getElementById("searchButtonMount");
  const viewAllButton = document.querySelector(".viewAllButtonMount");
  const clearResultsButton = document.querySelector(".clearResultsButtonMount");
  const nameDropdown = document.getElementById("locationMount");
  const resultsContainer = document.getElementById("resultsContainerMount");
  const searchInput = document.getElementById("searchBarInputMount");

  // Initially hide dropdowns
  filterDropdowns.forEach((dropdown) => {
    dropdown.style.display = "none";
  });

  filterButton.onclick = function () {
    filterDropdowns.forEach((dropdown) => {
      dropdown.style.display =
        dropdown.style.display === "none" ? "block" : "none";
    });
  };

  // Populate filter dropdowns
  mountainsArray.forEach((mountain) => {
    const option = document.createElement("option");
    option.value = mountain.name;
    option.textContent = mountain.name;
    nameDropdown.appendChild(option);
  });

  // Search functionality
  searchButton.onclick = function () {
    const selectedName = nameDropdown.value;
    const searchTerm = searchInput.value.toLowerCase();

    const filteredMountains = mountainsArray.filter((mountain) => {
      const matchesName = selectedName ? mountain.name === selectedName : true;
      const matchesSearchTerm =
        mountain.name.toLowerCase().includes(searchTerm) ||
        mountain.desc.toLowerCase().includes(searchTerm);
      return matchesName && matchesSearchTerm;
    });

    displayResults(filteredMountains);
  };

  viewAllButton.onclick = function () {
    displayResults(mountainsArray);
  };

  clearResultsButton.onclick = function () {
    resultsContainer.innerHTML =
      "<p>No mountains to display. Use the search functionality to find mountains.</p>"; // Clear results
    nameDropdown.value = "";
    searchInput.value = "";
  };

  // Display no mountains initially
  resultsContainer.innerHTML =
    "<p>No mountains to display. Use the search functionality to find mountains.</p>";
}

async function getSunsetForMountain(lat, lng) {
  const response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
  );
  const data = await response.json();
  return data;
}

async function displayResults(mountains) {
  const resultsContainer = document.getElementById("resultsContainerMount");
  resultsContainer.innerHTML = "";

  if (mountains.length === 0) {
    resultsContainer.innerHTML = "<p>No mountains found.</p>";
    return;
  }

  for (const mountain of mountains) {
    const card = document.createElement("div");
    card.classList.add("mountainCard");

    const img = document.createElement("img");
    img.src = `images/${mountain.img}`;
    img.alt = mountain.name;

    const content = document.createElement("div");
    content.classList.add("mountainCardContent");

    const name = document.createElement("h3");
    name.textContent = mountain.name;

    const desc = document.createElement("p");
    desc.textContent = mountain.desc;

    const elevation = document.createElement("p");
    elevation.textContent = `Elevation: ${mountain.elevation} ft`;

    const effort = document.createElement("p");
    effort.textContent = `Effort: ${mountain.effort}`;

    const sunsetInfo = document.createElement("p");
    const sunsetData = await getSunsetForMountain(
      mountain.coords.lat,
      mountain.coords.lng
    );
    sunsetInfo.textContent = `Sunset: ${sunsetData.results.sunset} UTC`;

    content.appendChild(name);
    content.appendChild(desc);
    content.appendChild(elevation);
    content.appendChild(effort);
    content.appendChild(sunsetInfo);

    card.appendChild(img);
    card.appendChild(content);

    resultsContainer.appendChild(card);
  }
}

function setupBackgroundMusic() {
  const audioElement = document.getElementById("backgroundMusic");

  // Function to play audio
  function playAudio() {
    if (audioElement.paused) {
      audioElement.play();
    }
  }

  // Handle user interaction to play audio
  document.onclick = function () {
    playAudio();
  };
  document.onscroll = function () {
    playAudio();
  };
}
