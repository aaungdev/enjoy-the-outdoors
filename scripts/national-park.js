"use strict";

window.onload = function () {
  const audioElement = document.querySelector("#backgroundMusic");
  const heroSection = document.querySelector("#heroSection");

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

  // Intersection Observer for hero section
  if (heroSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playAudio();
          } else {
            audioElement.pause();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(heroSection);
  }

  // Hamburger menu functionality
  const hamburger = document.querySelector("#hamburger");
  const navLinks = document
    .querySelector("#navBar")
    .getElementsByClassName("navLinks")[0];

  hamburger.onclick = function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  };

  // Filter functionality
  const filterButton = document.querySelector("#filterButtonParks");
  const filterDropdowns = document.querySelectorAll(".filterDropdownParks");
  const searchButton = document.querySelector("#searchButtonParks");
  const clearButton = document.querySelector("#clearResultsButton");
  const viewAllButton = document.querySelector("#viewAllButton");
  const resultsTitle = document.querySelector("#resultsTitle");
  const resultsContainer = document.querySelector("#resultsContainer");
  const locationParks = document.querySelector("#locationParks");
  const typeParks = document.querySelector("#typeParks");
  const searchBarParks = document.querySelector("#searchBarParks");

  // Initially hide dropdowns
  filterDropdowns.forEach((dropdown) => {
    dropdown.style.display = "none";
  });

  filterButton.onclick = function () {
    filterDropdowns.forEach((dropdown) => {
      dropdown.style.display =
        dropdown.style.display == "none" ? "block" : "none";
    });
  };

  // Populate filter dropdowns
  locationsArray.forEach((location) => {
    const option = document.createElement("option");
    option.value = location;
    option.textContent = location;
    locationParks.appendChild(option);
  });

  parkTypesArray.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeParks.appendChild(option);
  });

  // National Parks search functionality
  searchButton.onclick = function () {
    const selectedLocation = locationParks.value;
    const selectedType = typeParks.value;
    const searchTerm = searchBarParks.value.toLowerCase();

    const filteredParks = nationalParksArray.filter((park) => {
      const matchesLocation = selectedLocation
        ? park.State == selectedLocation
        : true;
      const matchesType = selectedType
        ? park.LocationName.toLowerCase().includes(selectedType.toLowerCase())
        : true;
      const matchesSearchTerm =
        park.LocationName.toLowerCase().includes(searchTerm) ||
        park.City.toLowerCase().includes(searchTerm);

      return matchesLocation && matchesType && matchesSearchTerm;
    });

    if (filteredParks.length > 0) {
      displayResults(filteredParks);
    } else {
      displayNoResultsMessage();
    }
  };

  viewAllButton.onclick = function () {
    displayResults(nationalParksArray);
  };

  function displayResults(parks) {
    resultsContainer.innerHTML = ""; // Clear previous results
    resultsTitle.textContent = `${parks.length} Parks Found`;

    const header = document.createElement("div");
    header.classList.add("resultCard", "header");
    header.innerHTML = `
            <div>Location Name</div>
            <div>City</div>
            <div>Address</div>
            <div>State</div>
            <div>Zip Code</div>
            <div>Phone</div>
            <div>Website</div>
        `;
    resultsContainer.appendChild(header);

    parks.forEach((park) => {
      const card = document.createElement("div");
      card.classList.add("resultCard");

      const title = document.createElement("div");
      title.textContent = park.LocationName;
      card.appendChild(title);

      const city = document.createElement("div");
      city.textContent = park.City;
      card.appendChild(city);

      const address = document.createElement("div");
      address.textContent = park.Address;
      card.appendChild(address);

      const state = document.createElement("div");
      state.textContent = park.State;
      card.appendChild(state);

      const zip = document.createElement("div");
      zip.textContent = park.ZipCode;
      card.appendChild(zip);

      const phone = document.createElement("div");
      if (park.Phone === 0) {
        phone.textContent = ' - ';
      } else {
        phone.textContent = park.Phone;
      }
      card.appendChild(phone);

      const link = document.createElement("a");
      link.href = `https://www.google.com/maps/search/?api=1&query=${park.Latitude},${park.Longitude}`;
      link.target = "_blank";
      link.textContent = "Visit Website";
      card.appendChild(link);

      resultsContainer.appendChild(card);
    });
  }

  function displayNoResultsMessage() {
    resultsContainer.innerHTML = "";
    resultsTitle.textContent = "No parks found for the selected criteria.";
  }

  clearButton.onclick = function () {
    resultsContainer.innerHTML = "";
    resultsTitle.textContent = "";
    locationParks.value = "";
    typeParks.value = "";
    searchBarParks.value = "";
  };

  // National Parks page video functionality
  const videos = document.querySelectorAll("#videoContainerParks video");
  const dots = document.querySelectorAll(".dotParks");
  let currentIndex = 0;

  function showVideo(index) {
    videos.forEach((video, i) => {
      if (i == index) {
        video.classList.add("active");
        video.play();
      } else {
        video.classList.remove("active");
        video.pause();
      }
    });
    dots.forEach((dot, i) => {
      if (i == index) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
    currentIndex = index;
  }

  function nextVideo() {
    const nextIndex = (currentIndex + 1) % videos.length;
    showVideo(nextIndex);
  }

  dots.forEach((dot, index) => {
    dot.onclick = () => showVideo(index);
  });

  setInterval(nextVideo, 10000);

  showVideo(currentIndex);

  // Search bar functionality
  const searchIcon = document.querySelector("#searchIcon");
  const searchInput = document.querySelector("#searchInput");

  searchIcon.onclick = function () {
    searchInput.classList.toggle("visible");
    if (searchInput.classList.contains("visible")) {
      searchInput.focus();
    }
  };

  searchInput.onkeypress = function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(searchInput.value);
    }
  };

  function updateSearchParameter(query) {
    if (!query) return;
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("search", query);
    window.location.search = searchParams.toString();
  }

  // Initialize search input with URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search");
  if (searchQuery) {
    searchInput.value = searchQuery;
    filterParks(searchQuery);
  }

  document.onclick = function (event) {
    if (
      !searchIcon.contains(event.target) &&
      !searchInput.contains(event.target)
    ) {
      searchInput.classList.remove("visible");
    }
  };
};

function filterParks(query) {
  const filteredParks = nationalParksArray.filter(
    (park) =>
      park.LocationName.toLowerCase().includes(query.toLowerCase()) ||
      park.City.toLowerCase().includes(query.toLowerCase())
  );
  displayResults(filteredParks);
}
