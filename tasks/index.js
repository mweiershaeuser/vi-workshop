import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import { elections2017, elections2021, partyColours } from "./data/data.js";

let dataset;

const key = (d) => d.party;

let w = 0;
let h = 0;

const barPadding = 0.1;
const textOffsetX = 5;
const textOffsetYFactor = 0.6;

let chart;

let svg;
let xScale;
let yScale;

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

  yScale = d3
    .scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, h])
    .paddingInner(barPadding);

  svg
    .selectAll("rect")
    .data(dataset, key)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => yScale(i))
    .attr("width", (d) => xScale(d.result))
    .attr("height", yScale.bandwidth())
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
    .attr("x", textOffsetX)
    .attr("y", (d, i) => yScale(i) + yScale.bandwidth() * textOffsetYFactor)
    .style("fill", "white");
}

/**
 * AUFGABE 1
 *
 * Gegeben ist ein Balkendiagramm, welches die Wahlergebnisse der deutschen Bundestagswahl aus dem Jahr 2021 visualisiert.
 * Darin werden die Parteien mit ihrer jeweiligen Farbe und der zugehörigen Prozentverteilung angezeigt.
 *
 * 1. Implementiere eine updateYear() Funktion, die es ermöglicht die Wahlergebnisse aus dem Jahr 2017 anzuzeigen.
 * 2. Setze eine Transition um, die einen flüssigen Übergang zwischen den Daten beider Jahren ermöglicht.
 * 3. Beeinflusse die Dauer, die Bewegung und Verzögerung der Transition mit den zugehörigen Methoden.
 * 4. Bonus: implementiere eine on()-Transition, welche die Balken während des Transition-Vorgangs grau färbt.
 */

/**
 * Event Listener hier hinzufügen.
 *
 * Tipps:
 * - ID "yearFilter" selected den Wahl-Switcher.
 * - Das Event "change" liefert das ausgewählte Jahr über "event.target.value".
 * - Jahr in globaler Variable zwischenspeichern!
 */

// Code goes here

function updateYear() {
  /**
   * Datensatz entsprechend des ausgewählten Jahres setzen.
   */

  // Code goes here

  /**
   * xScale anpassen.
   */

  // Code goes here
  yScale.domain(d3.range(dataset.length));

  /**
   * Rechtecke der Visualisierung updaten.
   *
   * Tipps:
   * - Für die Positionierung auf der y-Achse, nutze "(d, i) => yScale(i)".
   * - Um die Höhe der Balken zu ermitteln, nutze "yScale.bandwidth()".
   * - Nutze das Array "partyColours", die Farbe der zum Balken gehörigen Partei zu finden (Array.find nutzen!).
   */

  // Code goes here

  /**
   * Labels der Visualisierung updaten.
   *
   * Tipps:
   * - Nutze den Wert der Variablen "textOffsetX" zur Positionierung auf der x-Achse.
   * - Positioniere das Label mit Versatz zum Balken auf der y-Achse: "(d, i) => yScale(i) + yScale.bandwidth() * textOffsetYFactor".
   */

  // Code goes here
}

/****** ENDE AUFGABE 1 ******/

/**
 * AUFGABE 2
 *
 * Setze eine removeParty() und eine addParty() Funktion um, welche es ermöglichen, Parteien über den gegebenen Filter in der oberen Leiste aus der Visualisierung zu entfernen und wieder hinzuzufügen.
 * Hinweis: Nehme im Zuge der Aufgabe einen Data Join mit der gegebenen Key Function vor.
 */

d3.selectAll(".partyFilter").on("click", (event) => {
  if (event.target.checked) {
    addParty(event.target.value);
  } else {
    removeParty(event.target.value);
  }
});

function removeParty(party) {
  /**
   * Daten der ausgewählten Partei finden und aus dem Datensatz entfernen.
   *
   * Tipps:
   * - Ermittle den Index der Partei-Daten mit Array.findIndex.
   * - Entferne die Daten mit Array.splice.
   */

  // Code goes here

  xScale.domain([0, d3.max(dataset, (d) => d.result)]);
  yScale.domain(d3.range(dataset.length));

  /**
   * Balken der Partei aus der Visualisierung entfernen.
   *
   * Tipps:
   * - Denke daran, die definierte Funktion "key" zu nutzen, um einen Data Join vorzunehmen.
   */

  // Code goes here

  /**
   * Label der Partei aus der Visualisierung entfernen.
   */

  // Code goes here

  // Die übrigen Balken werden geupdated.
  svg
    .selectAll("rect")
    .data(dataset, key)
    .transition()
    .delay(transitionDuration)
    .duration(transitionDuration)
    .on("start", function () {
      d3.select(this).style("fill", "grey");
    })
    .attr("x", 0)
    .attr("y", (d, i) => yScale(i))
    .attr("width", (d) => xScale(d.result))
    .attr("height", yScale.bandwidth())
    .style(
      "fill",
      (d) => partyColours.find((pC) => pC.party === d.party).colour
    );

  // Die übrigen Labels werden geupdated.
  svg
    .selectAll("text")
    .data(dataset, key)
    .transition()
    .delay(transitionDuration)
    .duration(transitionDuration)
    .text((d) => `${d.party}: ${d.result}%`)
    .attr("x", textOffsetX)
    .attr("y", (d, i) => yScale(i) + yScale.bandwidth() * textOffsetYFactor)
    .style("fill", "white");
}

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
  yScale.domain(d3.range(dataset.length));

  // Die Selections der bisherigen Balken und Labels werden zwischengespeichert.
  const bars = svg.selectAll("rect").data(dataset, key);
  const labels = svg.selectAll("text").data(dataset, key);

  /**
   * Balken der Partei zur Visualisierung hinzufügen.
   *
   * Tipps:
   * - Für die Positionierung auf der y-Achse, nutze "(d, i) => yScale(i)".
   * - Um die Höhe der Balken zu ermitteln, nutze "yScale.bandwidth()".
   */

  // Code goes here

  /**
   * Merge den hinzugefügten Balken mit den Balken der bestehenden Visualisierung.
   * Nutze die zwischengespeicherten "bars".
   */

  // Code goes here

  /* Nutze den folgenden Code, um die richtigen Attribute beim Merge zu aktualisieren.
  .attr("x", 0)
  .attr("y", (d, i) => yScale(i))
  .attr("width", (d) => xScale(d.result))
  .attr("height", yScale.bandwidth())
  .style(
    "fill",
    (d) => partyColours.find((pC) => pC.party === d.party).colour
  );
  */

  /**
   * Label der Partei zur Visualisierung hinzufügen.
   *
   * Tipps:
   * - Nutze den Wert der Variablen "textOffsetX" zur Positionierung auf der x-Achse.
   * - Positioniere das Label mit Versatz zum Balken auf der y-Achse: "(d, i) => yScale(i) + yScale.bandwidth() * textOffsetYFactor".
   */

  // Code goes here

  /**
   * Merge das hinzugefügte Label mit den Labels der bestehenden Visualisierung.
   * Nutze die zwischengespeicherten "labels".
   */

  // Code goes here

  /* Nutze den folgenden Code, um die richtigen Attribute beim Merge zu aktualisieren.
    .duration(transitionDuration)
    .text((d) => `${d.party}: ${d.result}%`)
    .attr("x", textOffsetX)
    .attr("y", (d, i) => yScale(i) + yScale.bandwidth() * textOffsetYFactor)
    .style("fill", "white");
    */
}

/****** ENDE AUFGABE 2 ******/

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
  yScale.rangeRound([0, h]);

  svg
    .selectAll("rect")
    .data(dataset, key)
    .transition()
    .duration(transitionDuration)
    .attr("x", 0)
    .attr("y", (d, i) => yScale(i))
    .attr("width", (d) => xScale(d.result))
    .attr("height", yScale.bandwidth());

  svg
    .selectAll("text")
    .data(dataset, key)
    .transition()
    .duration(transitionDuration)
    .attr("x", textOffsetX)
    .attr("y", (d, i) => yScale(i) + yScale.bandwidth() * textOffsetYFactor);
}

document.addEventListener("DOMContentLoaded", init, false);
