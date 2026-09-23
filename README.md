# Campus Navigation System

A web based campus navigation system that computes optimal routes between university locations based on travel time and accessibility requirements.

## Overview

This project models a university campus as a graph and uses Dijkstra's Algorithm to determine optimal paths between locations. Users can choose between shortest time routing and accessibility based routing depending on their needs.

The pathfinding logic is implemented in Python, while Flask is used as the API layer between the Python backend and the HTML/JavaScript frontend. The calculated routes are displayed on an interactive campus map using Leaflet and OpenStreetMap.

## Features

- Compute shortest paths between campus locations
- Accessibility aware route selection
- Graph based representation of campus locations
- Dijkstra's Algorithm for route optimization
- Interactive university map
- Display calculated routes directly on the map
- Web-based interface for selecting start and destination locations
- Flask API connecting the frontend with the Python pathfinding logic

## Technologies Used

- Python
- Flask
- JavaScript
- HTML/CSS
- Leaflet
- OpenStreetMap
- Data Structures (Graphs)
- Dijkstra's Algorithm
- REST API

## How It Works

1. The user selects a starting location and destination from the web interface.
2. JavaScript sends an API request to the Flask backend.
3. Flask passes the request to the Python pathfinding logic.
4. Dijkstra's Algorithm calculates the optimal route based on the selected preference.
5. Flask returns the calculated route to the frontend as JSON.
6. JavaScript processes the response and Leaflet displays the route on the OpenStreetMap campus map.

## Project Structure

```text
├── static/
│   └── script.js
│
├── templates/
│   └── index.html
│
├── app.py
├── pathFind.py
└── requirements.txt
