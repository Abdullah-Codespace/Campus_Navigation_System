// Memorial University, St. John's campus
const map = L.map("map").setView([47.5720, -52.7320], 16);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19
    }
).addTo(map);

const locations = {
    1: [47.572755, -52.738198], // Parking Garage
    2: [47.574582, -52.735452], // Engineering
    3: [47.573072, -52.735005], // University Centre
    4: [47.571747, -52.734741], // Library
    5: [47.571365, -52.735901], // Education
    6: [47.570186, -52.735043], // Field House
    7: [47.571545, -52.733019]  // Bruno Centre
};
const buildingNames = {
    1: "Parking Garage",
    2: "Engineering",
    3: "University Centre",
    4: "Library",
    5: "Education",
    6: "Field House",
    7: "Bruno Centre"
};
for (const [id, coordinates] of Object.entries(locations)) {
    L.marker(coordinates)
        .addTo(map)
        .bindPopup(buildingNames[id]);
}

let routeLine = null;

// Find route using Python API
async function findRoute() {

    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const mode = document.getElementById("mode").value;

    const result = document.getElementById("result");

    try {

        const response = await fetch(
            `/api/route?start=${start}&end=${end}&mode=${mode}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Route not found");
        }

        result.innerText =
            `Route: ${data.path.map(id => buildingNames[id]).join(" → ")}
             | Cost: ${data.cost} ${data.unit}`;

        // Convert Python graph nodes to map coordinates
        const coordinates = data.path.map(
            node => locations[node]
        );

        // Remove previous route
        if (routeLine) {
            map.removeLayer(routeLine);
        }

        // Draw new route
        routeLine = L.polyline(coordinates, {
            color: "blue",
            weight: 5
        }).addTo(map);

        // Zoom into the calculated route
        if (coordinates.length > 1) {
            map.fitBounds(routeLine.getBounds(), {
                padding: [30, 30]
            });
        } else {
            map.setView(coordinates[0], 17);
        }

    } catch (error) {
        result.innerText = error.message;
    }
}