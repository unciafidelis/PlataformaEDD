from flask import Blueprint,render_template, request

views = Blueprint(__name__, "views")

@views.route("/")
def home():
    return render_template("index.html", clase="Estructura de datos")

@views.route("/tema")

def tema():
    args = request.args
    name = args.get('Sección?')
    return render_template("index.html", seccion=name)
