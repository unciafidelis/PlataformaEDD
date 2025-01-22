from flask import Blueprint,render_template,request,jsonify,redirect,url_for 

views = Blueprint(__name__, "views")

@views.route("/")
def home():
    return render_template("index.html", clase="Estructura de datos")

@views.route("/tema")
def tema():
    args = request.args
    name = args.get('seccion')
    return render_template("index.html", seccion=name)

@views.route("/json")
def get_json():
    return jsonify({'Arreglos Unidimensionales':'Son divertidos'})

@views.route("/data")
def get_data():
    data = request.json
    return jsonify(data)

@views.route("/go_home")
def go_home():
    return redirect(url_for("views.home"))