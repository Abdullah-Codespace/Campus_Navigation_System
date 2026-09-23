from flask import Flask, request, jsonify, render_template
from pathFind import Graph

app = Flask(__name__)

g = Graph(7)

# Your existing graph
g.add_edge(1, 2, 4.49, 5)
g.add_edge(1, 3, 4.08, 5)
g.add_edge(3, 2, 3.05, 5)
g.add_edge(3, 2, 3.1, 10)
g.add_edge(1, 5, 5.33, 25)
g.add_edge(1, 6, 8.55, 25)
g.add_edge(5, 6, 4.26, 15)
g.add_edge(5, 4, 5.26, 20)
g.add_edge(6, 4, 3.4, 15)
g.add_edge(4, 7, 1.2, 20)
g.add_edge(4, 3, 2.49, 15)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/route")
def find_route():

    try:
        start = int(request.args.get("start"))
        end = int(request.args.get("end"))
        mode = request.args.get("mode", "time")

        if start not in range(1, 8) or end not in range(1, 8):
            return jsonify({"error": "Invalid location"}), 400

        if mode not in ("time", "accessible"):
            return jsonify({"error": "Invalid mode"}), 400

        use_access = mode == "accessible"

        distances, previous = g.dijkstra(start, use_access)

        path = g.get_path(previous, end)

        return jsonify({
            "path": path,
            "cost": distances[end],
            "unit": "accessibility score" if use_access else "minutes"
        })

    except (ValueError, TypeError):
        return jsonify({"error": "Invalid parameters"}), 400


if __name__ == "__main__":
    app.run(debug=True)