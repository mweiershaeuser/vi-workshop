import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import { elections2017, elections2021, partyColours } from "./data/data.js";

let dataset;

let w = 0;
let h = 0;

let barPadding = 5;

let chart;

let svg;
let xScale;

let year;

let transitionDuration = 1000;

function init() {
  chart = document.getElementById("chart");
  calculateChartSize();
  initChart();
  resize();

  window.addEventListener("resize", resize, false);
}

function initChart() {
  dataset = elections2021.sort((a, b) => b.result - a.result);

  svg = d3.select("#chart").append("svg").attr("width", w).attr("height", h);

  xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d.result)])
    .range([0, w]);

  svg
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

  svg
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
  year = event.target.value;
  updateYearWithTransition();
});

function updateYear() {
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

function updateYearWithTransition() {
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

function calculateChartSize() {
  w = chart.clientWidth;
  h = (chart.clientWidth / 2) * 1;
}

function resize() {
  calculateChartSize();

  svg.attr("width", w).attr("height", h);

  xScale.range([0, w]);

  svg
    .selectAll("rect")
    .data(dataset)
    .transition()
    .duration(transitionDuration)
    .attr("x", 0)
    .attr("y", (d, i) => i * (h / dataset.length))
    .attr("width", (d) => xScale(d.result))
    .attr("height", h / dataset.length - barPadding);

  svg
    .selectAll("text")
    .data(dataset)
    .transition()
    .duration(transitionDuration)
    .attr("x", 5)
    .attr("y", (d, i) => (i + 0.5) * (h / dataset.length));
}

document.addEventListener("DOMContentLoaded", init, false);
