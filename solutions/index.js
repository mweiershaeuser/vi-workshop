import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import { elections2017, elections2021, partyColours } from "./data/data.js";

let dataset;

const key = (d) => d.party;

let w = 0;
let h = 0;

const barPadding = 5;
const textOffset = 5;

let chart;

let svg;
let xScale;

let year;

const transitionDuration = 1000;

function init() {
  resetCheckboxes();

  chart = document.getElementById("chart");
  calculateChartSize();
  initChart();
  resize();

  window.addEventListener("resize", resize, false);
}

function initChart() {
  dataset = [...elections2021.sort((a, b) => b.result - a.result)];

  svg = d3.select("#chart").append("svg").attr("width", w).attr("height", h);

  xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d.result)])
    .range([0, w]);

  svg
    .selectAll("rect")
    .data(dataset, key)
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
    .data(dataset, key)
    .enter()
    .append("text")
    .text((d) => `${d.party}: ${d.result}%`)
    .attr("x", textOffset)
    .attr("y", (d, i) => (i + 0.5) * (h / dataset.length))
    .style("fill", "white");
}

d3.select("#yearFilter").on("change", (event) => {
  year = event.target.value;
  updateYearWithTransition();
});

function updateYear() {
  resetPartyFilter();

  switch (year) {
    case "2021":
      dataset = [...elections2021.sort((a, b) => b.result - a.result)];
      break;

    case "2017":
      dataset = [...elections2017.sort((a, b) => b.result - a.result)];
      break;

    default:
      dataset = [...elections2021.sort((a, b) => b.result - a.result)];
      break;
  }

  xScale.domain([0, d3.max(dataset, (d) => d.result)]);

  svg
    .selectAll("rect")
    .data(dataset, key)
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
    .data(dataset, key)
    .text((d) => `${d.party}: ${d.result}%`)
    .attr("x", textOffset)
    .attr("y", (d, i) => (i + 0.5) * (h / dataset.length))
    .style("fill", "white");
}

function updateYearWithTransition() {
  resetPartyFilter();

  switch (year) {
    case "2021":
      dataset = [...elections2021.sort((a, b) => b.result - a.result)];
      break;

    case "2017":
      dataset = [...elections2017.sort((a, b) => b.result - a.result)];
      break;

    default:
      dataset = [...elections2021.sort((a, b) => b.result - a.result)];
      break;
  }

  xScale.domain([0, d3.max(dataset, (d) => d.result)]);

  svg
    .selectAll("rect")
    .data(dataset, key)
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
    .data(dataset, key)
    .transition()
    .duration(transitionDuration)
    .text((d) => `${d.party}: ${d.result}%`)
    .attr("x", textOffset)
    .attr("y", (d, i) => (i + 0.5) * (h / dataset.length))
    .style("fill", "white");
}

d3.selectAll(".partyFilter").on("click", (event) => {
  if (event.target.checked) {
    addParty(event.target.value);
  } else {
    removeParty(event.target.value);
  }
});

function addParty(party) {
  let partyResultToAdd;
  switch (year) {
    case "2021":
      partyResultToAdd = elections2021.find((r) => r.party === party);
      break;

    case "2017":
      partyResultToAdd = elections2017.find((r) => r.party === party);
      break;

    default:
      partyResultToAdd = elections2021.find((r) => r.party === party);
      break;
  }
  dataset.push(partyResultToAdd);
  dataset = dataset.sort((a, b) => b.result - a.result);

  xScale.domain([0, d3.max(dataset, (d) => d.result)]);

  const bars = svg.selectAll("rect").data(dataset, key);
  const labels = svg.selectAll("text").data(dataset, key);

  svg
    .selectAll("rect")
    .data(dataset, key)
    .enter()
    .append("rect")
    .attr("x", (d) => -xScale(d.result))
    .attr("y", (d, i) => i * (h / dataset.length))
    .attr("width", (d) => xScale(d.result))
    .attr("height", h / dataset.length - barPadding)
    .style(
      "fill",
      (d) => partyColours.find((pC) => pC.party === d.party).colour
    )
    .merge(bars)
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
    .data(dataset, key)
    .enter()
    .append("text")
    .text((d) => `${d.party}: ${d.result}%`)
    .attr("x", (d) => -xScale(d.result) + textOffset)
    .attr("y", (d, i) => (i + 0.5) * (h / dataset.length))
    .style("fill", "white")
    .merge(labels)
    .transition()
    .duration(transitionDuration)
    .text((d) => `${d.party}: ${d.result}%`)
    .attr("x", textOffset)
    .attr("y", (d, i) => (i + 0.5) * (h / dataset.length))
    .style("fill", "white");
}

function removeParty(party) {
  const partyIndex = dataset.findIndex((p) => p.party === party);
  if (partyIndex > -1) {
    dataset.splice(partyIndex, 1);
  }

  xScale.domain([0, d3.max(dataset, (d) => d.result)]);

  svg
    .selectAll("rect")
    .data(dataset, key)
    .exit()
    .transition()
    .duration(transitionDuration)
    .attr("x", (d) => -xScale(d.result))
    .remove();

  svg
    .selectAll("text")
    .data(dataset, key)
    .exit()
    .transition()
    .duration(transitionDuration)
    .attr("x", (d) => -xScale(d.result))
    .remove();

  svg
    .selectAll("rect")
    .data(dataset, key)
    .transition()
    .delay(transitionDuration)
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
    .data(dataset, key)
    .transition()
    .delay(transitionDuration)
    .duration(transitionDuration)
    .text((d) => `${d.party}: ${d.result}%`)
    .attr("x", textOffset)
    .attr("y", (d, i) => (i + 0.5) * (h / dataset.length))
    .style("fill", "white");
}

d3.select("#partyFilterResetBtn").on("click", () => {
  resetPartyFilter();
});

function resetPartyFilter() {
  let currentRawResults;
  switch (year) {
    case "2021":
      currentRawResults = [...elections2021];
      break;

    case "2017":
      currentRawResults = [...elections2017];
      break;

    default:
      currentRawResults = [...elections2021];
      break;
  }

  const missingResults = currentRawResults.filter(
    (r) => !dataset.some((d) => d.party === r.party)
  );
  missingResults.forEach((mR) => {
    addParty(mR.party);
  });

  resetCheckboxes();
}

function resetCheckboxes() {
  const checkboxes = document.getElementsByClassName("partyFilter");
  for (const key in checkboxes) {
    if (Object.hasOwnProperty.call(checkboxes, key)) {
      checkboxes[key].checked = true;
    }
  }
}

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
    .data(dataset, key)
    .transition()
    .duration(transitionDuration)
    .attr("x", 0)
    .attr("y", (d, i) => i * (h / dataset.length))
    .attr("width", (d) => xScale(d.result))
    .attr("height", h / dataset.length - barPadding);

  svg
    .selectAll("text")
    .data(dataset, key)
    .transition()
    .duration(transitionDuration)
    .attr("x", textOffset)
    .attr("y", (d, i) => (i + 0.5) * (h / dataset.length));
}

document.addEventListener("DOMContentLoaded", init, false);
