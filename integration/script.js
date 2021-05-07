// CARROUSSEL //

const slider = document.querySelector(".gallery");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", (_) => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", (_) => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const SCROLL_SPEED = 3;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;
});

// CALCULATRICE //

var show = document.getElementById("show");
document.getElementById("result").addEventListener("click", function () {
  try {
    show.value = eval(show.value);
  } catch (e) {
    alert(e);
  }
});

var last;
window.onkeyup = function (e) {
  if (e.key == "Backspace") {
    var len = show.value.length;
    if (len > 0) {
      len--;
      last = show.value;
      var back = last.charAt(len);
      last = last.replace(back, "");
      show.value = last;
    }
  } else if (e.key == "Enter") {
    var enter_result = eval(show.value);
    if (enter_result == undefined) {
      show.value = "";
    } else {
      show.value = eval(show.value);
    }
  } else {
    show.value += e.key;
  }
};

show.oninput = function () {
  var len_input = show.value.length;
  len_input--;
  var lastVal = show.value;
  lastVal = lastVal.replace(lastVal.charAt(len_input), "");
  show.value = lastVal;
};
