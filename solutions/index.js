import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import { elections2021, partyColours } from "./data/data.js";

let dataset = elections2021.sort((a, b) => b.result - a.result);

const w = 800;
const h = 400;

const barPadding = 5;

const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, (d) => d.result)])
  .range([0, w]);

const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

const bars = svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", 0)
  .attr("y", (d, i) => i * (h / dataset.length))
  .attr("width", (d) => xScale(d.result))
  .attr("height", h / dataset.length - barPadding)
  .style("fill", (d) => partyColours.find((pC) => pC.party === d.party).colour);

const labels = svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text((d) => `${d.party}: ${d.result}%`)
  .attr("x", 5)
  .attr("y", (d, i) => (i + 0.5) * (h / dataset.length))
  .style("fill", "white");
