# Updates, Transitions and Motions - Visualisierung Workshop 2023

Willkommen im Repository zum Workshop "Updates, Transitions and Motion" im Kontext der Visualisierung von Daten mit der Library [D3](https://d3js.org/). Das vorliegende Repository enthält alle Materialien, die zur Teilnahme des Workshops notwendig sind.

Der Workshop wurde im Rahmen des Moduls "Visualisierung" des Studiengangs Medieninformatik (Master) im Sommersemester 2023 an der Technischen Hochschule Köln (TH Köln) konzipiert.

**Ansprechpartner:innen**

- [Aileen Jurkosek](https://github.com/aileenjurkosek)
- [Melvin Weiershäuser](https://github.com/mweiershaeuser)

## Getting Started

Ihr könnt für die praktischen Übungen die IDE bzw. den Editor eurer Wahl nutzen. Wir empfehlen euch für einen reibungslosen Ablauf des Workshops [Visual Studio Code](https://code.visualstudio.com/).

Bitte stellt sicher, dass ihr über eine funktionierende Installation von [Node.js](https://nodejs.org/en/) und npm verfügt.

1. Workshop-Repository clonen

```bash
git clone https://github.com/mweiershaeuser/vi-workshop.git
cd vi-workshop
```

2. Dependencies installieren

```bash
npm install
```

## Struktur

```
📂 vi-workshop
|-- 📂 docs                 // Folien und Handout
|-- 📂 solutions            // Musterlösung, äquivalente Struktur zu tasks
|-- 📂 tasks
    |-- 📄 index.js         // Aufgaben
```

## Visualisierung starten

Um die Visualisierung und den Fortschritt der Aufgaben betrachten zu können, müssen die Dateien von einem Web-Server bereitgestellt werden. Für diesen Workshop wurden für einen komfortablen Start npm-Skripte geschrieben, welche die Aufgaben, Lösungen sowie den Gesamtcode über einen lokalen Web-Server mit Live-Reloading bereitstellen. Nutze dafür die angegebenen Skripte.

Alle verfügbaren Skripte können der [package.json](package.json) entnommen werden.

**Aufgaben serven**

```bash
npm run start:tasks
```

**Gesamten Code serven**

```bash
npm run start
```
