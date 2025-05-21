const text = ["Front End Developer", "UI Designer", "Back End Developer"];
const typingSpeed = 100; // milliseconds per letter
const delayBetweenTitles = 1000; // delay before switching to the next title
const paragraph = document.getElementById("typing-text");
let currentTitle = 0; // Index of the current title

function typeLetter(index = 0) {
  if (index < text[currentTitle].length) {
    paragraph.textContent += text[currentTitle].charAt(index);
    setTimeout(() => typeLetter(index + 1), typingSpeed);
  } else {
    setTimeout(() => {
      paragraph.textContent = ""; // Clear the text
      currentTitle = (currentTitle + 1) % text.length; // Move to the next title
      typeLetter(0); // Restart typing for the next title
    }, delayBetweenTitles);
  }
}
typeLetter();

document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress-bar");

  const fillProgressBar = (bar, targetWidth) => {
    let width = 0;
    const increment = Math.ceil(targetWidth / 100);
    const timer = setInterval(() => {
      width += increment;
      if (width >= targetWidth) {
        bar.style.width = targetWidth + "%";
        clearInterval(timer);
      } else {
        bar.style.width = width + "%";
      }
    }, 20);
  };

  const resetProgressBars = () => {
    progressBars.forEach((bar) => {
      bar.style.width = "0%";
    });
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Reset and animate the progress bars
        progressBars.forEach((bar) => {
          const targetWidth = +bar.getAttribute("data-progress");
          bar.style.width = "0%"; // Reset
          fillProgressBar(bar, targetWidth); // Animate
        });
      } else {
        resetProgressBars(); // Reset when section goes out of view
      }
    });
  };

  const observerOptions = {
    root: null, // Default is the viewport
    threshold: 0.5, // Trigger when 50% of the section is visible
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  const skillsSection = document.querySelector("#skills");
  if (skillsSection) {
    observer.observe(skillsSection);
  }
});

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();

  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.style.color = "green";
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});

document.addEventListener("scroll", function () {
  const borderElement = document.querySelector(".border-all");
  const pseudoElement = document.querySelector(".border-all::before");

  const sectionTop = borderElement.getBoundingClientRect().top;
  const sectionHeight = borderElement.offsetHeight;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
    const visibleHeight = Math.min(windowHeight - sectionTop, sectionHeight);
    borderElement.style.setProperty("--line-height", `${visibleHeight}px`);
  } else {
    borderElement.style.setProperty("--line-height", `0px`);
  }
});

let data = [
  {
    projectTitle: "QLM Company",
    screenSrc: "./assets/projectsScreens/Qlm.png",
    liveUrl: "",
    projectCategorey: "front",
    progectDevTool: "Vanila js ",
    discription:
      "it's a landing page that descripe the company core values and what it is offer",
  },
  {
    projectTitle: "Al Zaheimer Detection",
    screenSrc: "./assets/projectsScreens/AlZ.png",
    liveUrl:
      "https://www.figma.com/design/q6f6FYqRterD5G7gOrH676/ALzDetect?node-id=0-1&p=f&t=tiBO2x3htE8puIMZ-0",
    projectCategorey: "ui",
    progectDevTool: "Figma",
    discription:
      "this is my graduation project a medical application that detect ElZaheimer disease ",
  },
  {
    projectTitle: "CRUD libiray Applicatiion",
    screenSrc: "./assets/projectsScreens/lib.png",
    liveUrl: "https://mariemhawry21.github.io/cuddly-succotash/",
    projectCategorey: "front",
    progectDevTool: "Vanila js",
    discription:
      "Book Management System designed to manage a collection of books efficiently.The system provides features for adding, editing, and deleting book records ",
  },
  {
    projectTitle: "Furniro e-commerce ",
    screenSrc: "./assets/projectsScreens/furniro.png",
    liveUrl: "https://furniture-ecommerce-frontend.vercel.app/home",
    projectCategorey: "Full-Stack",
    progectDevTool: "Angular - MongoDB - Express - Atlas mongoDB",
    discription:
      "Furniro is a complete e-commerce solution for furniture shopping built with performance, scalability, and user experience in mind. ",
  },
  {
    projectTitle: "E-Commerce Dashboard ",
    screenSrc: "./assets/projectsScreens/dashboard.png",
    liveUrl: "https://dokan-dashboard-kappa.vercel.app/",
    projectCategorey: "Full-Stack",
    progectDevTool: "Vue  - Vuetify  - Pinia - Express -Atlas mongoDB",
    discription:
      "A modern admin dashboard built with Vue 3, Vuetify 3, and Vue Router. Featuring role-based authentication,multi-language support, and responsive design. ",
  },
];

let projectContainer = document.querySelector("#project-list");
let lis = document.querySelectorAll("#tabs li");
lis.forEach((el) => {
  let RemoveActive = document.querySelectorAll("#tabs li a");
  el.addEventListener("click", (e) => {
    const clicked = e.target.dataset.category;
    let selectedCategoeryArr = data.filter((el) => {
      return el.projectCategorey === clicked;
    });
    RemoveActive.forEach((r) => {
      r.classList.remove("active");
    });
    el.children[0].classList.add("active");
    if (clicked == "all") {
      showAll(data);
    } else {
      showAll(selectedCategoeryArr);
    }
  });
});

function showAll(data) {
  projectContainer.innerHTML = "";
  data.forEach((el) => {
    projectContainer.innerHTML += `
            <div class="col-10 col-md-6 col-lg-4 mb-3">
                <div class="card" style="width: 100%">
                  <div class="image-container" style="height: 200px">
                    <img
                      src="${el.screenSrc}"
                      class="card-img"
                      alt="img-project"
                    />
                  </div>
                  <div class="card-body mt-2">
                    <h5 class="card-title">${el.projectTitle}</h5>
                    <p class="card-text">
                      ${el.discription}
                    </p>
                    <p class="tools">${el.progectDevTool}</p>
                    <a
                      href="${el.liveUrl}"
                      target="_blank"
                      class="btn bg-main text-white"
                      >See Live Demo</a
                    >
                  </div>
                </div>
              </div>`;
  });
}
showAll(data);

const prevButton = document.querySelector(".carousel-control-prev");
const nextButton = document.querySelector(".carousel-control-next");

function handleHover(direction) {
  const event = new Event("click");
  if (direction === "prev") {
    prevButton.dispatchEvent(event);
  } else {
    nextButton.dispatchEvent(event);
  }
}

prevButton.addEventListener("mouseenter", () => handleHover("prev"));
nextButton.addEventListener("mouseenter", () => handleHover("next"));
