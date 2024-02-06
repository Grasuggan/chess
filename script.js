const scene = document.getElementById("hero");
const layers = scene.querySelectorAll(".layer-1");
const depth = [0.2, 0.4, 0.6, 0.6, 0.8, 1];

let windowHeight = null;
let windowCenterY = null;

let inputY = 0;

let scrollY = window.scrollY;
let offsetY = 0;

updateDimensions();
startAnimation();

function updateDimensions() {
  windowHeight = window.innerHeight;
  windowCenterY = windowHeight / 2;
}

function startAnimation() {
  window.addEventListener("resize", updateDimensions);
  window.addEventListener("scroll", onScroll);
  window.requestAnimationFrame(onAnimationFrame);
}

function onScroll(event) {
  inputY = (window.scrollY / windowCenterY) * 1.5;
}

function onAnimationFrame() {
  const positionY =
    (inputY * windowHeight) / 10 + (window.scrollY / windowCenterY) * 1.5;

  offsetY += (positionY - offsetY) * 0.1;

  for (let index = 0; index < layers.length; index++) {
    const layer = layers[index];
    const layerDepth = depth[index] || 0.2;
    const yOffset = offsetY * layerDepth * -1;

    setPosition(layer, yOffset);
  }

  window.requestAnimationFrame(onAnimationFrame);
}

function setPosition(element, y) {
  element.style.transform = "translateY(" + y.toFixed(1) + "px)";
}

/*=======================================
      #Sliders
  ==================================*/
// Select all slides
const slides = document.querySelectorAll(".slider-block");
const dots = document.querySelector(".dots");

// loop through slides and set each slides translateX property to index * 100%
if (slides.length > -1) {
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
    if (indx > 0) {
      const dot = document.createElement("div");

      dots.appendChild(dot);
      dot.classList.add("dot");
    }
  });
}

// select next slide button
const nextSlide = document.querySelector(".btn-next");
// select prev slide button
const prevSlide = document.querySelector(".btn-prev");

//select all dots
const dot = dots.querySelectorAll(".dot");

// current slide counter
let curSlide = 0;
// maximum number of slides
let maxSlide = slides.length - 1;

// add event listener and navigation functionality
nextSlide.addEventListener("click", function () {
  // check if current slide is the last and reset current slide
  //Make the slide stop disable btn when curSlide === maxSlide
  if (curSlide === maxSlide) {
    return;
  } else if (curSlide === maxSlide - 1) {
    curSlide++;
    nextSlide.classList.add("disabled");
  } else {
    curSlide++;
    prevSlide.classList.remove("disabled");
  }

  dot.forEach((d) => {
    d.classList.remove("active-dot");
  });
  let curDot = dot[curSlide];
  curDot.classList.add("active-dot");
  //   move slide by -100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

// add event listener and navigation functionality
prevSlide.addEventListener("click", function () {
  // check if current slide is the first and reset current slide to last
  if (curSlide === 0) {
    return;
  } else if (curSlide === 1) {
    prevSlide.classList.add("disabled");
    curSlide -= 1;
  } else {
    prevSlide.classList.remove("disabled");
    nextSlide.classList.remove("disabled");
    curSlide -= 1;
  }
  dot.forEach((d) => {
    d.classList.remove("active-dot");
  });
  let curDot = dot[curSlide];
  curDot.classList.add("active-dot");
  //   move slide by 100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});
/*======================================
      #Scroll Animate Observer
    ======================================*/
var scrollSections = document.querySelectorAll(".animate");
var scrollObserverSettings = {
  threshold: 0,
  rootMargin: "-5% 0% -25% 0%",
};
var scrollObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      setTimeout(function () {
        entry.target.classList.remove("animate");
        scrollObserver.unobserve(entry.target);
      }, 1500);
    }
  });
}, scrollObserverSettings);
scrollSections.forEach(function (section) {
  scrollObserver.observe(section);
});

/*======================================
  Card scroll
  ====================================*/
const interval = 3500;

const slider = document.querySelector(".card-slider");
const sliderImgs = slider.querySelectorAll(".card-slide");
const firstBox = slider.querySelectorAll(".first-box");
const secondBox = slider.querySelectorAll(".second-box");

let currImg = 0;
let prevImg = sliderImgs.length - 1;
let intrvl;
let timeout;
let startCount = 3;

const slidescontainer = document.querySelector(".slides");
const sum = document.createElement("span");
const currentSlide = document.createElement("span");
sum.classList.add("slides-sum");
currentSlide.classList.add("slides-current");

sum.innerHTML = " / " + sliderImgs.length;
currentSlide.innerHTML = 1;
slidescontainer.appendChild(sum);
slidescontainer.insertBefore(currentSlide, sum);

const prevBtn = document.querySelector(".card-slider-nav .btn-prev");
const nextBtn = document.querySelector(".card-slider-nav .btn-next");

animateSlider();
intrvl = setInterval(animateSlider, interval);

/**
 * Animates images
 * @param {number} [nextImg] - index of next image to show
 */

prevBtn.addEventListener("click", function () {
  const currSlide = document.querySelector(".current-slide");
  nextImg = parseInt(currSlide.getAttribute("data-slide"));

  currImg = nextImg - 1 >= 0 ? nextImg - 1 : sliderImgs.length - 1;
  animateSlider(nextImg);
});
nextBtn.addEventListener("click", function () {
  const currSlide = document.querySelector(".current-slide");
  let curr = parseInt(currSlide.getAttribute("data-slide"));

  currImg = curr < sliderImgs.length - 1 ? curr + 1 : 0;

  nextImg = currImg + 1 <= sliderImgs.length - 1 ? currImg + 1 : 0;
  animateSlider(nextImg);
});
function animateSlider(nextImg) {
  nextImg;
  if (!nextImg) {
    nextImg = currImg + 1 < sliderImgs.length ? currImg + 2 : 1;
  }

  --nextImg;
  sliderImgs.forEach((slide) => slide.classList.remove("current-slide"));
  sliderImgs[currImg].classList.add("current-slide");

  const currSlide = document.querySelector(".current-slide");
  if (window.innerWidth > 992) {
    if (currImg + 3 <= sliderImgs.length) {
      currentSlide.innerHTML = currImg + 3;
    } else if (currImg + 3 > sliderImgs.length) {
      currentSlide.innerHTML = currImg - 3;
    }
  } else {
    currentSlide.innerHTML = currImg + 1;
  }

  let firstTrans = 0;
  let secondTrans = 0;

  let total = sliderImgs.length;
  if (currImg == 0) {
    firstTrans = 0;
    secondTrans = firstTrans;
  } else if (currImg < 3) {
    firstTrans = "-" + currImg * 100;
    secondTrans = firstTrans;
  } else {
    firstTrans = (total - currImg) * 100;
    secondTrans = "-" + currImg * 100;
  }

  firstBox.forEach((box) => {
    box.style.transform = "translateX(" + firstTrans + "%)";
  });
  secondBox.forEach((box) => {
    box.style.transform = "translateX(" + secondTrans + "%)";
  });

  sliderImgs.forEach((slider) => {
    slider.style.opacity = 0;
  });
  let secondImg = currImg + 1 <= sliderImgs.length - 1 ? currImg + 1 : 0;
  let thirdImg = secondImg + 1 <= sliderImgs.length - 1 ? secondImg + 1 : 0;

  if (window.innerWidth > 992) {
    sliderImgs[currImg].style.opacity = 1;
    sliderImgs[secondImg].style.opacity = 1;
    sliderImgs[thirdImg].style.opacity = 1;
  } else {
    sliderImgs[currImg].style.opacity = 1;
  }

  prevImg = currImg;
  currImg = nextImg;
}
/*======================================
    #Scroll navigation
    ======================================*/
var navBtns = document.querySelectorAll("a.button");
navBtns.forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    var target = item.getAttribute("href");
    var targetElm = document.querySelector(target);
    scrollIt(targetElm);
  });
});
//Scroll To
function scrollIt(element) {
  var headerHeight = 0;
  window.scrollTo({
    behavior: "smooth",
    left: 0,
    top: element.offsetTop - headerHeight,
  });
}
