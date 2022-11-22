from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.mydb
media = db.media


@app.route("/api/v1.0/titles", methods=["GET"])
def show_all_titles():
    return 0


@app.route("/api/v1.0/titles/<string:id>", methods=["GET"])
def show_one_title(id):
    return 0


@app.route("/api/v1.0/movies", methods=["GET"])
def show_all_movies():
    return 0


@app.route("/api/v1.0/movies/<string:id>", methods=["GET"])
def show_one_movie(id):
    return 0


@app.route("/api/v1.0/series", methods=["GET"])
def show_all_series():
    return 0


@app.route("/api/v1.0/series/<string:id>", methods=["GET"])
def show_one_series(id):
    return 0
