from flask import Flask
from config.config import DATABASE_CONNECTION_URI
from flask_cors import CORS
from models.db import db


app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"]= DATABASE_CONNECTION_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

@app.route('/')
def home():
    return 'Hello World!!!'

if __name__ == '__main__':
    app.run(debug=True)