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