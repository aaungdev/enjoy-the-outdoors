"use strict";

window.onload = function () {
  // Hamburger menu toggle
  const hamburger = document.querySelector("#hamburger");
  const navLinks = document.querySelector("#navBar .navLinks");

  hamburger.onclick = function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  };

  // Video container animation toggle
  const videoContainer = document.querySelector("#videoContainer");
  const videoCards = document.querySelectorAll(".videoCard");

  const numberOfClones = Math.ceil(10 / videoCards.length);
  for (let i = 0; i < numberOfClones; i++) {
    videoCards.forEach((card) => {
      const clone = card.cloneNode(true);
      videoContainer.appendChild(clone);
    });
  }

  videoContainer.onmouseover = () =>
    (videoContainer.style.animationPlayState = "paused");
  videoContainer.onmouseout = () =>
    (videoContainer.style.animationPlayState = "running");

  // Search bar functionality
  const searchIcon = document.querySelector("#searchIcon");
  const searchInput = document.querySelector("#searchInput");

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

  // Pop-up animation for section titles and subtitles
  const popUpElements = document.querySelectorAll(".sectionTitle, .subtitle");
  const observerOptions = { threshold: 0.1 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("popUpAnimation");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  popUpElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.3}s`;
    observer.observe(element);
  });

  // Control audio playback based on visibility using Intersection Observer
  const audioElement = document.querySelector("#backgroundMusic");
  const main = document.querySelector("main");

  const observerAudio = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      });
    },
    { threshold: 0.5 }
  );

  observerAudio.observe(main);
};
