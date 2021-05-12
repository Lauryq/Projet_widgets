//________________________________ CARROUSSEL________________________________ //

const slider = document.querySelector(".gallery");
let isDown = false;
let startX;
let scrollLeft;

if (slider) {

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
  const SCROLL_SPEED = 1;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;
});

}

//________________________________ CALCULATRICE________________________________ //

document.getElementById("result").addEventListener("click", function () {
  try {
    show.value = eval(show.value);
  } catch (e) {
    alert(e);
  }
});

show.oninput = function () {
  var len_input = show.value.length;
  len_input--;
  var lastVal = show.value;
  lastVal = lastVal.replace(lastVal.charAt(len_input), "");
  show.value = lastVal;
};

//________________________________ METEO ________________________________//

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "de461ddd1ab4d5c4be42d22f6690790b";

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;



  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name}">
          <span>${name}</span>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    
    .catch(() => {
      msg.textContent = "Nous n'avons pas compris la ville, veuillez réessayez";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});

//________________________________ FETE DU JOUR _________________________________//

var now = new Date ();

var mois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
var jour = now.getDate ();


document.getElementById("mois").innerHTML = (mois[now.getMonth()]);
document.getElementById("jour").innerHTML = jour;

//_____________________________ CONVERTISSEUR __________________________________//

var property = new Array();
var unit = new Array();
var factor = new Array();


property[0] = "Longueurs";
unit[0] = new Array( "Kilomètres (km)","Hectomètres (hm)","Décamètres (dam)","Mètres (m)", "Décimètres (dm)", "Centimètres (cm)", "Millimeter (mm)");
factor[0] = new Array(1000, 100, 10, 1, .1, .01, .001);

property[1] = "Temps";
unit[1] = new Array("Secondes", "Jours", "Heures", "Minutes");
factor[1] = new Array(1, 86164.09, 3590.17, 60);

// ===========
//  Functions
// ===========

function UpdateUnitMenu(propMenu, unitMenu) {
  // Updates the units displayed in the unitMenu according to the selection of property in the propMenu.
  var i;
  i = propMenu.selectedIndex;
  FillMenuWithArray(unitMenu, unit[i]);
}

function FillMenuWithArray(myMenu, myArray) {
  // Fills the options of myMenu with the elements of myArray.
  // !CAUTION!: It replaces the elements, so old ones will be deleted.
  var i;
  myMenu.length = myArray.length;
  for (i = 0; i < myArray.length; i++) {
    myMenu.options[i].text = myArray[i];
  }
}

function CalculateUnit(sourceForm, targetForm) {
  // A simple wrapper function to validate input before making the conversion
  var sourceValue = sourceForm.unit_input.value;

  // First check if the user has given numbers or anything that can be made to one...
  sourceValue = parseFloat(sourceValue);
  if (!isNaN(sourceValue) || sourceValue == 0) {
    // If we can make a valid floating-point number, put it in the text box and convert!
    sourceForm.unit_input.value = sourceValue;
    ConvertFromTo(sourceForm, targetForm);
  }
}

function ConvertFromTo(sourceForm, targetForm) {
  // Converts the contents of the sourceForm input box to the units specified in the targetForm unit menu and puts the result in the targetForm input box.In other words, this is the heart of the whole script...
  var propIndex;
  var sourceIndex;
  var sourceFactor;
  var targetIndex;
  var targetFactor;
  var result;

  // Start by checking which property we are working in...
  propIndex = document.property_form.the_menu.selectedIndex;

  // Let's determine what unit are we converting FROM (i.e. source) and the factor needed to convert that unit to the base unit.
  sourceIndex = sourceForm.unit_menu.selectedIndex;
  sourceFactor = factor[propIndex][sourceIndex];

  // Cool! Let's do the same thing for the target unit - the units we are converting TO:
  targetIndex = targetForm.unit_menu.selectedIndex;
  targetFactor = factor[propIndex][targetIndex];

  // Simple, huh? let's do the math: a) convert the source TO the base unit: (The input has been checked by the CalculateUnit function).

  result = sourceForm.unit_input.value;
  // Handle Temperature increments!
  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) + tempIncrement[sourceIndex];
  }
  result = result * sourceFactor;

  // not done yet... now, b) use the targetFactor to convert FROM the base unit
  // to the target unit...
  result = result / targetFactor;
  // Again, handle Temperature increments!
  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) - tempIncrement[targetIndex];
  }

  // Ta-da! All that's left is to update the target input box:
  targetForm.unit_input.value = result;
}

// This fragment initializes the property dropdown menu using the data defined above in the 'Data Definitions' section
window.onload = function(e) {
  FillMenuWithArray(document.property_form.the_menu, property);
  UpdateUnitMenu(document.property_form.the_menu, document.form_A.unit_menu);
  UpdateUnitMenu(document.property_form.the_menu, document.form_B.unit_menu)
}

