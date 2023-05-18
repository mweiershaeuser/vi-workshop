import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import { elections2017, elections2021, partyColours } from "./data/data.js";

let dataset;

let w = 800;
let h = 400;

let barPadding = 5;

let svg;
let xScale;

let transitionDuration = 1000;

let bars;
let labels;

init();

function init() {
  dataset = elections2021.sort((a, b) => b.result - a.result);

  svg = d3.select("#chart").append("svg").attr("width", w).attr("height", h);

  xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d.result)])
    .range([0, w]);

  bars = svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i * (h / dataset.length))
    .attr("width", (d) => xScale(d.result))
    .attr("height", h / dataset.length - barPadding)
    .style(
      "fill",
      (d) => partyColours.find((pC) => pC.party === d.party).colour
    );

  labels = svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text((d) => `${d.party}: ${d.result}%`)
    .attr("x", 5)
    .attr("y", (d, i) => (i + 0.5) * (h / dataset.length))
    .style("fill", "white");
}

d3.select("#yearFilter").on("change", (event) => {
  updateYearWithTransition(event.target.value);
});

function updateYear(year) {
  switch (year) {
    case "2021":
      dataset = elections2021.sort((a, b) => b.result - a.result);
      break;

    case "2017":
      dataset = elections2017.sort((a, b) => b.result - a.result);
      break;

    default:
      dataset = elections2021.sort((a, b) => b.result - a.result);
      break;
  }

  xScale.domain([0, d3.max(dataset, (d) => d.result)]);

  svg
    .selectAll("rect")
    .data(dataset)
    .attr("x", 0)
    .attr("y", (d, i) => i * (h / dataset.length))
    .attr("width", (d) => xScale(d.result))
    .attr("height", h / dataset.length - barPadding)
    .style(
      "fill",
      (d) => partyColours.find((pC) => pC.party === d.party).colour
    );

  svg
    .selectAll("text")
    .data(dataset)
    .text((d) => `${d.party}: ${d.result}%`)
    .attr("x", 5)
    .attr("y", (d, i) => (i + 0.5) * (h / dataset.length))
    .style("fill", "white");
}

function updateYearWithTransition(year) {
  switch (year) {
    case "2021":
      dataset = elections2021.sort((a, b) => b.result - a.result);
      break;

    case "2017":
      dataset = elections2017.sort((a, b) => b.result - a.result);
      break;

    default:
      dataset = elections2021.sort((a, b) => b.result - a.result);
      break;
  }

  xScale.domain([0, d3.max(dataset, (d) => d.result)]);

  svg
    .selectAll("rect")
    .data(dataset)
    .transition()
    .duration(transitionDuration)
    .attr("x", 0)
    .attr("y", (d, i) => i * (h / dataset.length))
    .attr("width", (d) => xScale(d.result))
    .attr("height", h / dataset.length - barPadding)
    .style(
      "fill",
      (d) => partyColours.find((pC) => pC.party === d.party).colour
    );

  svg
    .selectAll("text")
    .data(dataset)
    .transition()
    .duration(transitionDuration)
    .text((d) => `${d.party}: ${d.result}%`)
    .attr("x", 5)
    .attr("y", (d, i) => (i + 0.5) * (h / dataset.length))
    .style("fill", "white");
}

function removeParty() {}

function addParty() {}
