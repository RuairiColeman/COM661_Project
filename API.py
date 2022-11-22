from flask import Flask, request, jsonify, make_response
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.mydb
media = db.media


@app.route("/api/v1.0/titles", methods=["GET"])
def show_all_titles():
    page_num, page_size = 1, 10
    if request.args.get('pn'):
        page_num = int(request.args.get('pn'))
    if request.args.get('ps'):
        page_size = int(request.args.get('ps'))
    page_start = (page_size * (page_num - 1))

    data_to_return = []
    pipeline = [
        {"$project": {"title": 1, "_id": 0}},
        {"$skip": page_start},
        {"$limit": page_size}
    ]

    for title in media.aggregate(pipeline):
        data_to_return.append(title)

    return make_response(jsonify(data_to_return), 200)


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


if __name__ == "__main__":
    app.run(debug=True)