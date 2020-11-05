import "./styles.scss";
import { mapGraphic } from "./map.js";
import stateData from "./stateData.js";

const map = document.querySelector(".map");

const shrinkMap = (map) => {
  map.addEventListener("click", function () {
    this.classList.add("is-active");
  });
};

const getZone = (year) => {
  if (year <= 10) {
    return 1;
  } else if (year > 10 && year <= 20) {
    return 2;
  } else if (year > 20 && year <= 30) {
    return 3;
  } else if (year > 30 && year <= 40) {
    return 4;
  } else if (year > 40 && year <= 50) {
    return 5;
  } else {
    return 0;
  }
};

const yearOptions = document.getElementsByClassName("year-option");
const updateData = (year = "2017") => {
  for (var i = 0; i < yearOptions.length; i++) {
    if (yearOptions[i].checked) {
      year = yearOptions[i].value;
    }
  }
  stateData.forEach((state) => {
    let path = document.getElementById(state.ID);
    path.setAttribute("data-year", state[year]);
    path.setAttribute("data-zone", getZone(state[year]));
  });
};

for (var i = 0; i < yearOptions.length; i++) {
  yearOptions[i].addEventListener("change", () => {
    updateData();
  });
}

map.innerHTML = mapGraphic;

shrinkMap(map);

updateData();
