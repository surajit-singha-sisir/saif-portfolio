function toggleNavbar(hamb) {
  const items = hamb.parentElement.querySelector(".nav-items");
  const bgDark = document.getElementById("bg-dark");

  if (items.classList.contains("navAnimation")) {
    // Close navbar
    items.classList.remove("navAnimation");
    items.classList.add("navExitAnimation");
    bgDark.classList.remove("bgDarkAnimation");
    bgDark.classList.add("bgDarkExitAnimation");
  } else {
    items.classList.remove("navExitAnimation");
    items.classList.add("navAnimation");
    bgDark.classList.remove("bgDarkExitAnimation");
    bgDark.classList.add("bgDarkAnimation");

    const handleOutsideClick = (event) => {
      if (!items.contains(event.target) && !hamb.contains(event.target)) {
        // Close the navbar if the click is outside
        items.classList.remove("navAnimation");
        items.classList.add("navExitAnimation");
        bgDark.classList.remove("bgDarkAnimation");
        bgDark.classList.add("bgDarkExitAnimation");

        document.removeEventListener("click", handleOutsideClick);
      }
    };

    document.addEventListener("click", handleOutsideClick);
  }
}

window.onload = function () {
  // TOGGLE TO TOP
  const scrollToTopButton = document.querySelector("#scrollToTop");

  window.addEventListener("scroll", () => {
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    const scrolled = document.documentElement.getBoundingClientRect().top * -1;
    const scrollPercentage =
      (scrolled / (documentHeight - viewportHeight)) * 100;

    if (scrollPercentage > 20) {
      scrollToTopButton.classList.add("show");
      scrollToTopButton.classList.remove("hide");
    } else {
      scrollToTopButton.classList.add("hide");
      scrollToTopButton.classList.remove("show");
    }
  });

  // Scroll to top on button click
  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  galleryContainer();
};

function galleryContainer() {
  const galleryContainer = document.querySelectorAll("aside.gallery-container");
  galleryContainer.forEach((container) => {
    const galleryMain = document.querySelector(".gallery-main");
    const showcase = galleryMain.querySelector(".showcase");
    const photoItems = galleryMain.querySelectorAll(".photo-item");

    let currentIndex = 0;

    function toggleActiveClass() {
      currentIndex = (currentIndex + 1) % photoItems.length;
      const leftPosition = -(currentIndex * 100);
      showcase.style.left = `${leftPosition}%`;
    }

    if (showcase) {
      const totalIndex = showcase.childElementCount;
      showcase.style = `width: ${totalIndex * 100}%;`;
      setInterval(toggleActiveClass, 5000);
    }
  });
}
