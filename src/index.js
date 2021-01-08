import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling
import "tippy.js/themes/light.css";
import "./styles.scss";
import { chartOne, chartTwo } from "./stateCharts.js";

const stateTitle = document.getElementById("state-title");
const stateContent = document.getElementById("state-content");

const getClosest = function (elem, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
  }

  // Get the closest matching element
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;
};

const initMap = () => {
  const states = document.querySelectorAll(".state");
  states.forEach((state) => {
    state.addEventListener("click", (e) => {
      states.forEach((state) => {
        state.classList.remove("active");
      });
      const parentState = getClosest(e.target, ".state");
      parentState.classList.add("active");
      window.location.hash = parentState.id;
    });
  });
};

tippy("[data-state]", {
  content: (reference) => {
    let deaths = reference.dataset.deaths;
    if (deaths.includes(",")) {
      deaths = deaths.replace(",", ".") + " billion";
    } else {
      deaths = deaths + " million";
    }
    let cost = reference.dataset.cost;
    if (cost.includes(",")) {
      cost = cost.replace(",", ".") + " billion";
    } else {
      cost = cost + " million";
    }
    return `
        <div class="tooltip-content">
          <h4>${reference.dataset.state}</h4>
          <small><em>Air Pollution Health Impacts<br>from Stationery Fuel Combustion Source</em></small>
          <span><strong>Deaths:</strong> ${deaths}</span>
          <span><strong>Costs:</strong> $${cost}</span>
          <small>Click the state for detail</small>
        </div>
      `;
  },
  allowHTML: true,
  theme: "light"
});

const handleHashChange = () => {
  const stateID = window.location.hash.replace("#", "", "g"); //KS
  const state = document.getElementById(stateID);
  stateContent.classList.remove("is-visible");
  stateTitle.innerHTML = `<strong>${state.dataset.state}</strong>`;
  stateContent.classList.add("is-visible");
};

if (window.location.hash) {
  const hashValue = window.location.hash.replace("#", "", "g");
  document.getElementById(hashValue).classList.add("active");
  handleHashChange();
} else {
  console.log(`no hash yet, keep cool`);
}
window.onhashchange = handleHashChange;
(() => {
  initMap();
  chartOne();
  chartTwo();
})();
