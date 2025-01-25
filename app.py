from flask import Flask, request, jsonify, render_template
import subprocess
from views import views
app = Flask(__name__)

app.register_blueprint(views, url_prefix="/")

@app.route("/run", methods=["POST"])
def run_code():
    code = request.json.get("code")
    if not code:
        return jsonify({"error": "No code provided"}), 400

    try:
        # Execute the Python code safely in a subprocess
        process = subprocess.run(
            ["python3", "-c", code],
            text=True,
            capture_output=True,
            timeout=5  # Limit execution time to 5 seconds
        )
        output = process.stdout or process.stderr
        return jsonify({"output": output})
    except subprocess.TimeoutExpired:
        return jsonify({"output": "Error: Code execution timed out."}), 400
    except Exception as e:
        return jsonify({"output": f"Error: {str(e)}"}), 500

@app.route("/arreglos")
def arreglos():
    return render_template("arreglos/arreglos.html")

if __name__ == "__main__":
    app.run(debug=True)

